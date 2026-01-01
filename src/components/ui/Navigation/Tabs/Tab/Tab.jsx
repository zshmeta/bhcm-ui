import { useContext, useEffect } from 'react'
import { TabsContext } from '../Tabs/Tabs'
import { ensureTabsStyles } from '../Tabs/Tabs.styles'

export default function Tab({ value, children, className, ...props }) {
  useEffect(() => {
    ensureTabsStyles()
  }, [])

  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tab must be used within <Tabs>.')

  const isActive = ctx.value === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-active={isActive ? 'true' : 'false'}
      className={className ?? 'bhcm-tab'}
      onClick={() => ctx.setValue(value)}
      {...props}
    >
      {children}
    </button>
  )
}
