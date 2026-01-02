const fs = require('fs')
const path = require('path')

const ROOT_DIR = path.resolve(__dirname)
const tracker = JSON.parse(
  fs.readFileSync(path.join(ROOT_DIR, 'mds-migration-tracker.json'), 'utf8')
)
const UI_DIR = path.join(ROOT_DIR, 'src/components/ui')

function walkDirs(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      out.push(full)
      walkDirs(full, out)
    }
  }
  return out
}

function hasGoldStandardFiles(componentDir, componentName) {
  const required = [
    'index.js',
    `${componentName}.jsx`,
    `${componentName}.styles.js`,
    `${componentName}.Skeleton.jsx`,
  ]

  try {
    const entries = fs.readdirSync(componentDir)
    const set = new Set(entries)
    return required.every(f => set.has(f))
  } catch {
    return false
  }
}

const uiDirs = walkDirs(UI_DIR)
const candidatesByName = new Map()
for (const d of uiDirs) {
  const name = path.basename(d)
  if (!candidatesByName.has(name)) candidatesByName.set(name, [])
  candidatesByName.get(name).push(d)
}

const legacy = tracker.items.filter(x => x.status === 'legacy')
const nowGold = []
const stillLegacy = []

for (const it of legacy) {
  const nameToCheck = it.coveredBy || it.component
  const candidates = candidatesByName.get(nameToCheck) || []

  const gold = candidates.some(d => hasGoldStandardFiles(d, nameToCheck))
  if (gold) nowGold.push(it.component)
  else stillLegacy.push(it.component)
}

console.log(JSON.stringify({ legacyInTracker: legacy.length, alreadyGoldOnDisk: nowGold.length, stillLegacyOnDisk: stillLegacy.length }, null, 2))
if (stillLegacy.length) {
  console.log('\nStill legacy on disk:')
  for (const name of stillLegacy) console.log('-', name)
}
