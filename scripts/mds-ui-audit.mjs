import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const MDS_DIR = path.join(ROOT, 'src/components/mds')
const UI_DIR = path.join(ROOT, 'src/components/ui')

const TRACKER = path.join(ROOT, 'mds-migration-tracker.json')
const OUT = path.join(ROOT, 'mds-ui-audit.json')

function stripExt(name) {
  return name.replace(/\.md$/i, '')
}

async function fileExists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function readText(p) {
  return fs.readFile(p, 'utf8')
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

function parseMdsIndexExports(mdsText, componentName) {
  // Find a "File: X/index.ts(x|)" block and extract `export ...` lines until the next "File:".
  const fileHeaderRe = new RegExp(`^File:\\s+${componentName}\\/index\\.(ts|tsx|js|jsx)\\s*$`, 'm')
  const startMatch = mdsText.match(fileHeaderRe)
  if (!startMatch) return { found: false, exports: [], raw: null }

  const startIdx = startMatch.index
  const after = mdsText.slice(startIdx)
  const nextHeaderIdx = after.slice(1).search(/^File:\s+/m)
  const block = nextHeaderIdx === -1 ? after : after.slice(0, nextHeaderIdx + 1)

  const exports = new Set()

  // Export forms we care about:
  // - export { A, B as C } from '...'
  // - export { A, B }
  // - export * from '...'
  // - export const Foo
  // - export function Bar
  const lines = block.split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith('export *')) {
      exports.add('*')
      continue
    }

    const m1 = trimmed.match(/^export\s+(?:const|function|class)\s+([A-Za-z0-9_]+)/)
    if (m1) {
      exports.add(m1[1])
      continue
    }

    const m2 = trimmed.match(/^export\s*\{([^}]+)\}/)
    if (m2) {
      const parts = m2[1]
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)

      for (const p of parts) {
        // handle `Foo as Bar`
        const asMatch = p.match(/^([A-Za-z0-9_]+)\s+as\s+([A-Za-z0-9_]+)$/)
        if (asMatch) exports.add(asMatch[2])
        else exports.add(p.replace(/^type\s+/, ''))
      }
    }
  }

  // Ignore purely type exports — we can’t (and shouldn’t) mirror TS types in JS.
  const filtered = [...exports].filter(x => x !== '*' && x !== 'default' && x !== 'type')

  return { found: true, exports: filtered.sort(), raw: block }
}

async function main() {
  const tracker = JSON.parse(await readText(TRACKER))
  const items = tracker.items

  const uiDirs = await walkDirs(UI_DIR)
  const candidatesByName = new Map()
  for (const d of uiDirs) {
    const name = path.basename(d)
    if (!candidatesByName.has(name)) candidatesByName.set(name, [])
    candidatesByName.get(name).push(d)
  }

  const results = []

  for (const it of items) {
    const component = it.component
    const coveredBy = it.coveredBy
    const folderName = coveredBy || component
    const candidates = candidatesByName.get(folderName) || []

    const mdsPath = path.join(ROOT, it.mdsFile)
    const mdsText = await readText(mdsPath)
    const mdsIndex = parseMdsIndexExports(mdsText, folderName)

    const candidateReports = []
    for (const dir of candidates) {
      const indexPath = path.join(dir, 'index.js')
      const componentPath = path.join(dir, `${folderName}.jsx`)
      const stylesPath = path.join(dir, `${folderName}.styles.js`)
      const skeletonPath = path.join(dir, `${folderName}.Skeleton.jsx`)

      const exists = {
        index: await fileExists(indexPath),
        component: await fileExists(componentPath),
        styles: await fileExists(stylesPath),
        skeleton: await fileExists(skeletonPath),
      }

      let indexText = null
      let indexExportsMissing = []
      if (exists.index && mdsIndex.found && mdsIndex.exports.length > 0) {
        indexText = await readText(indexPath)
        indexExportsMissing = mdsIndex.exports.filter(name => !indexText.includes(name))
      }

      candidateReports.push({
        dir: path.relative(ROOT, dir),
        goldFiles: exists,
        mdsIndexFound: mdsIndex.found,
        mdsIndexExports: mdsIndex.exports,
        missingExportsInUiIndex: indexExportsMissing,
      })
    }

    results.push({
      component,
      coveredBy,
      status: it.status,
      mdsFile: it.mdsFile,
      candidates: candidateReports,
    })
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    totals: {
      items: results.length,
      goldStandard: results.filter(r => r.status === 'gold-standard').length,
      legacy: results.filter(r => r.status === 'legacy').length,
      missing: results.filter(r => r.status === 'missing').length,
    },
    issues: {
      missingGoldFiles: 0,
      exportMismatches: 0,
    },
  }

  for (const r of results) {
    for (const c of r.candidates) {
      const goldOk = c.goldFiles.index && c.goldFiles.component && c.goldFiles.styles && c.goldFiles.skeleton
      if (!goldOk) summary.issues.missingGoldFiles++
      if (c.missingExportsInUiIndex && c.missingExportsInUiIndex.length > 0) summary.issues.exportMismatches++
    }
  }

  const out = { summary, results }
  await fs.writeFile(OUT, JSON.stringify(out, null, 2), 'utf8')

  console.log('Wrote:', path.relative(ROOT, OUT))
  console.log('Summary:', summary)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
