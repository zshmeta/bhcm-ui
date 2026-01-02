import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const MDS_DIR = path.join(ROOT, 'src/components/mds')
const OUT_JSON = path.join(ROOT, 'mds-feature-report.json')

const RULES = [
  {
    key: 'aria',
    label: 'ARIA attributes',
    re: /\baria-[a-z-]+\b/gi,
  },
  {
    key: 'keyboardHandlers',
    label: 'Keyboard handlers',
    re: /\bonKey(Down|Up|Press)\b/g,
  },
  {
    key: 'keys',
    label: 'Key handling (Escape/Arrows/Home/End)',
    re: /\b(Escape|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Home|End|PageUp|PageDown|Enter|Space)\b/g,
  },
  {
    key: 'focus',
    label: 'Focus management',
    re: /\b(focus\(|focusTrap|FocusTrap|focus-visible|focusVisible|tabIndex|aria-activedescendant)\b/g,
  },
  {
    key: 'context',
    label: 'React context usage',
    re: /\b(createContext|useContext|Context\.Provider)\b/g,
  },
  {
    key: 'id',
    label: 'ID/label linkage',
    re: /\b(useId|id=|aria-controls|aria-labelledby)\b/g,
  },
  {
    key: 'observers',
    label: 'Observers',
    re: /\b(ResizeObserver|IntersectionObserver|MutationObserver)\b/g,
  },
  {
    key: 'portals',
    label: 'Portals/layers',
    re: /\b(createPortal|Portal)\b/g,
  },
]

function countMatches(text, re) {
  const matches = text.match(re)
  return matches ? matches.length : 0
}

async function main() {
  const entries = await fs.readdir(MDS_DIR)
  const mdFiles = entries.filter(name => name.endsWith('.md')).sort()

  const report = []

  for (const fileName of mdFiles) {
    const filePath = path.join(MDS_DIR, fileName)
    const content = await fs.readFile(filePath, 'utf8')

    const counts = Object.fromEntries(RULES.map(r => [r.key, countMatches(content, r.re)]))

    report.push({
      file: fileName,
      ...counts,
    })
  }

  await fs.writeFile(OUT_JSON, JSON.stringify({ generatedAt: new Date().toISOString(), report }, null, 2), 'utf8')

  // Print a quick top list for prioritization.
  const sorted = [...report].sort((a, b) => {
    const scoreA = RULES.reduce((sum, r) => sum + a[r.key], 0)
    const scoreB = RULES.reduce((sum, r) => sum + b[r.key], 0)
    return scoreB - scoreA
  })

  console.log('Wrote:', path.relative(ROOT, OUT_JSON))
  console.log('\nTop 15 most "feature-dense" MDS files:')
  for (const row of sorted.slice(0, 15)) {
    const score = RULES.reduce((sum, r) => sum + row[r.key], 0)
    console.log(`- ${row.file} (score: ${score})`)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
