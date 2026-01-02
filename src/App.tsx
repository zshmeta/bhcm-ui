import './App.css'

import { Component, type ReactNode, useMemo } from 'react'

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

function isProbablyReactComponentExport(
  exportName: string,
  value: unknown,
): value is unknown {
  if (!/^[A-Z]/.test(exportName)) return false
  if (exportName === 'default') return false
  if (exportName.endsWith('Props')) return false
  if (value == null) return false

  const valueType = typeof value
  if (valueType === 'function') return true

  if (valueType === 'object') {
    // Covers React.memo / forwardRef component types.
    return '$$typeof' in (value as Record<string, unknown>)
  }

  return false
}

function buildDemoProps(id: string, label: string): Record<string, unknown> {
  // A “best effort” common prop set. Many components will ignore extras.
  // Components that require specific props will be caught by the error boundary.
  return {
    id,
    label,
    title: label,
    name: label,
    href: '#',
    children: label,
    onClick: () => {},
    onChange: () => {},
    onClose: () => {},
    onOpen: () => {},
  }
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
  )
}

export default App
