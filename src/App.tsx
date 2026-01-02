import './App.css'

import { Component, type ReactNode, useMemo } from 'react'
import { GlobalTheme } from './components/ui/System'

type AnyRecord = Record<string, unknown>

type ComponentEntry = {
  exportName: string
  component: unknown
  key: string
}

type GroupEntry = {
  groupName: string
  modulePath: string
  components: ComponentEntry[]
}

const uiIndexModules = import.meta.glob('./components/ui/**/index.js', {
  eager: true,
}) as Record<string, AnyRecord>

const SKIP_EXPORTS = new Set([
  // Tabs API requires context; rendering these alone always throws.
  'Tab',
  'TabContent',
  'TabList',
  'TabPanel',
  'TabsContext',
])

function isProbablyReactComponentExport(
  exportName: string,
  value: unknown,
): value is unknown {
  if (!/^[A-Z]/.test(exportName)) return false
  if (exportName === 'default') return false
  if (SKIP_EXPORTS.has(exportName)) return false
  if (exportName.endsWith('Props')) return false
  if (value == null) return false

  const valueType = typeof value
  if (valueType === 'function') {
    // Skip styled-components primitives (they tend to forward unknown props to DOM)
    // which creates a lot of noisy warnings in an auto-prop demo gallery.
    const maybeStyled = value as unknown as Record<string, unknown>
    if (
      'styledComponentId' in maybeStyled ||
      'componentStyle' in maybeStyled ||
      'attrs' in maybeStyled
    ) {
      return false
    }

    return true
  }

  if (valueType === 'object') {
    // Avoid accidentally treating Context objects / providers as renderable components.
    // Rendering `<SomeContext.Provider />` without a `value` will throw, and these exports
    // are common in barrel files.
    const maybeType = (value as Record<string, unknown>).$$typeof
    if (
      maybeType === Symbol.for('react.context') ||
      maybeType === Symbol.for('react.provider') ||
      maybeType === Symbol.for('react.consumer')
    ) {
      return false
    }

    // Covers React.memo / forwardRef component types.
    return '$$typeof' in (value as Record<string, unknown>)
  }

  return false
}

function buildDemoProps(id: string, label: string): Record<string, unknown> {
  const exportName = label
  const lower = exportName.toLowerCase()

  const props: Record<string, unknown> = {
    id,
    onClick: () => {},
    onChange: () => {},
  }

  const isInputLike =
    lower.includes('input') ||
    lower.includes('textarea') ||
    lower.includes('select') ||
    lower.includes('combobox') ||
    lower.includes('multiselect')

  // Buttons: avoid the icon-only a11y warning by always providing children + iconDescription.
  if (lower.includes('button')) {
    props.children = exportName
    props.iconDescription = exportName
    props['aria-label'] = exportName
  }

  // Links: ensure an href + visible text.
  if (lower === 'link' || lower.endsWith('link')) {
    props.href = '#'
    props.children = exportName
  }

  // Tooltip requires a single element child.
  if (lower === 'tooltip') {
    props.label = exportName
    props.children = (
      <button type="button" onClick={() => {}}>
        {exportName}
      </button>
    )
  }

  // Toggletip is flexible, but needs a trigger + content.
  if (lower === 'toggletip') {
    props.children = [
      <button key="trigger" type="button" onClick={() => {}} aria-label={exportName}>
        {exportName}
      </button>,
      <div key="content">{exportName}</div>,
    ]
  }

  // ToggletipButton requires a single element child + label string.
  if (lower === 'toggletipbutton') {
    props.label = exportName
    props.children = (
      <button type="button" onClick={() => {}}>
        {exportName}
      </button>
    )
  }

  // ComboBox requires items and either titleText or aria-label.
  if (lower === 'combobox') {
    props.items = [
      { id: '1', text: 'One' },
      { id: '2', text: 'Two' },
      { id: '3', text: 'Three', disabled: true },
    ]
    props.titleText = exportName
    props['aria-label'] = exportName
  }

  // Generic label-ish fields (when present) for form controls.
  if (!('label' in props) && !isInputLike) {
    props.label = exportName
    props.title = exportName
    props.name = exportName
  }

  // Provide default children for non-input-like components to keep them from rendering empty.
  if (!isInputLike && !('children' in props)) {
    props.children = exportName
  }

  return props
}

class RenderBoundary extends Component<
  { name: string; children: ReactNode },
  { error: unknown }
> {
  state = { error: null as unknown }

  static getDerivedStateFromError(error: unknown) {
    return { error }
  }

  render() {
    if (this.state.error) {
      const message =
        this.state.error instanceof Error
          ? this.state.error.message
          : String(this.state.error)

      return (
        <div className="componentError" role="note">
          <div className="componentErrorTitle">Render failed</div>
          <div className="componentErrorMessage">{message}</div>
        </div>
      )
    }

    return this.props.children
  }
}

function App() {
  const groups = useMemo<GroupEntry[]>(() => {
    const collected: GroupEntry[] = []

    for (const [modulePath, moduleExports] of Object.entries(uiIndexModules)) {
      let groupName = modulePath.replace('./components/ui/', '')
      groupName = groupName.replace(/\/?index\.js$/, '')
      groupName = groupName.replace(/\/$/, '')

      // Skip top-level barrels like `ui/index.js`, `ui/System/index.js`, etc.
      // Leaf component folders always have at least one slash: `System/Icon`, `Inputs/Text/TextInput`, ...
      if (!groupName.includes('/')) continue

      const components: ComponentEntry[] = Object.entries(moduleExports)
        .filter(([exportName, value]) =>
          isProbablyReactComponentExport(exportName, value),
        )
        .map(([exportName, component]) => {
          const key = `${groupName}::${exportName}`
          return { exportName, component, key }
        })
        .sort((a, b) => a.exportName.localeCompare(b.exportName))

      if (components.length > 0) {
        collected.push({ groupName, modulePath, components })
      }
    }

    collected.sort((a, b) => a.groupName.localeCompare(b.groupName))
    return collected
  }, [])

  const totalComponents = groups.reduce(
    (sum, group) => sum + group.components.length,
    0,
  )

  return (
    <GlobalTheme theme="white">
      <div className="galleryRoot">
        <header className="galleryHeader">
          <h1 className="galleryTitle">BHCM UI Component Gallery</h1>
          <div className="galleryMeta">
            <span>{groups.length} folders</span>
            <span aria-hidden="true">•</span>
            <span>{totalComponents} exports</span>
          </div>
        </header>

        <main className="galleryMain">
          {groups.map((group) => (
            <section key={group.modulePath} className="groupSection">
              <h2 className="groupTitle">{group.groupName}</h2>
              <div className="componentGrid">
                {group.components.map(({ exportName, component, key }) => {
                  const ComponentType = component as unknown as (
                    props: Record<string, unknown>,
                  ) => ReactNode
                  const demoId = `demo-${key.replace(/[^a-zA-Z0-9_-]/g, '-')}`
                  const demoLabel = exportName

                  return (
                    <div key={key} className="componentCard">
                      <div className="componentCardHeader">
                        <div className="componentName">{exportName}</div>
                      </div>
                      <div className="componentPreview">
                        <RenderBoundary name={exportName}>
                          <ComponentType {...buildDemoProps(demoId, demoLabel)} />
                        </RenderBoundary>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </main>
      </div>
    </GlobalTheme>
  )
}

export default App
