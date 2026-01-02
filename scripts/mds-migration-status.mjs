import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const MDS_DIR = path.join(ROOT, 'src/components/mds')
const UI_DIR = path.join(ROOT, 'src/components/ui')

const OUT = path.join(ROOT, 'mds-migration-tracker.json')

function stripExt(name) {
  return name.replace(/\.md$/i, '')
}

// Some MDS entries are subcomponents that are implemented inside a parent
// gold-standard folder in this repo.
const COVERS = {
  AccordionItem: 'Accordion',
}

async function walkDirs(dir) {
  const out = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const ent of entries) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      out.push(full)
      out.push(...(await walkDirs(full)))
    }
  }
  return out
}

function mdsHasStyles(mdsText, folderName) {
  // Detect embedded legacy style sources in the markdown.
  // We treat presence of .scss/.sass/.css as “styling exists in original code”.
  const re = new RegExp(`^File:\\s+${folderName}\\/.*\\.(scss|sass|css)\\s*$`, 'mi')
  return re.test(mdsText)
}

function mdsHasSkeleton(mdsText, folderName) {
  // Detect embedded skeleton sources in the markdown.
  // Carbon commonly uses <Component>Skeleton.tsx, etc.
  const re = new RegExp(
    `^File:\\s+${folderName}\\/.*Skeleton.*\\.(js|jsx|ts|tsx)\\s*$|^File:\\s+${folderName}\\/.*\\.Skeleton\\.(js|jsx|ts|tsx)\\s*$`,
    'mi'
  )
  return re.test(mdsText)
}

async function hasGoldStandardFiles(componentDir, componentName, { requireStyles, requireSkeleton }) {
  const isUiShellException = componentName === 'UIShell'
  const required = isUiShellException ? ['index.js'] : ['index.js', `${componentName}.jsx`]

  if (requireStyles) required.push(`${componentName}.styles.js`)
  if (requireSkeleton) required.push(`${componentName}.Skeleton.jsx`)

  try {
    const entries = await fs.readdir(componentDir)
    const set = new Set(entries)
    return required.every(f => set.has(f))
  } catch {
    return false
  }
}

async function main() {
  const mds = (await fs.readdir(MDS_DIR))
    .filter(f => f.endsWith('.md'))
    .sort()
    .map(f => ({ file: f, name: stripExt(f) }))

  const uiDirs = await walkDirs(UI_DIR)

  // Index: component folder name -> candidate directories (could be multiple).
  const candidatesByName = new Map()
  for (const d of uiDirs) {
    const name = path.basename(d)
    if (!candidatesByName.has(name)) candidatesByName.set(name, [])
    candidatesByName.get(name).push(d)
  }

  const now = new Date().toISOString()

  const items = []
  for (const m of mds) {
    const coveredBy = COVERS[m.name]
    const nameToCheck = coveredBy || m.name

    // Read the markdown once so we can infer which legacy artifacts existed.
    const mdsText = await fs.readFile(path.join(MDS_DIR, `${m.name}.md`), 'utf8')
    const requireStyles = mdsHasStyles(mdsText, nameToCheck)
    const requireSkeleton = mdsHasSkeleton(mdsText, nameToCheck)

    const candidates = candidatesByName.get(nameToCheck) || []
    const hasAnyFolder = candidates.length > 0
    let gold = false

    for (const d of candidates) {
      // Gold standard means the folder matches the required 4-file structure.
      // This intentionally distinguishes legacy/non-standard `ui` folders.
      if (await hasGoldStandardFiles(d, nameToCheck, { requireStyles, requireSkeleton })) {
        gold = true
        break
      }
    }

    let status = 'missing'
    if (gold) status = 'gold-standard'
    else if (hasAnyFolder) status = 'legacy'

    items.push({
      mdsFile: `src/components/mds/${m.file}`,
      component: m.name,
      coveredBy: coveredBy || null,
      status,
    })
  }

  const tracker = {
    generatedAt: now,
    notes:
      'Tracks migration status for each src/components/mds/*.md file. Status values: missing | legacy | gold-standard. `coveredBy` indicates the implementation lives in another component folder.',
    items,
  }

  await fs.writeFile(OUT, JSON.stringify(tracker, null, 2), 'utf8')

  const counts = items.reduce((acc, it) => {
    acc[it.status] = (acc[it.status] || 0) + 1
    return acc
  }, {})

  console.log('Wrote:', path.relative(ROOT, OUT))
  console.log('Counts:', counts)
  console.log('First 20 missing:')
  for (const it of items.filter(i => i.status === 'missing').slice(0, 20)) {
    console.log('-', it.component)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
