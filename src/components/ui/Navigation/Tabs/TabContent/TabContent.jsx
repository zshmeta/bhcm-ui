import { useContext, useEffect } from 'react'
import { TabsContext } from '../Tabs/Tabs'
import { ensureTabsStyles } from '../Tabs/Tabs.styles'

export default function TabContent({ when, children, className, ...props }) {
  useEffect(() => {
    ensureTabsStyles()
  }, [])

  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('TabContent must be used within <Tabs>.')

  if (ctx.value !== when) return null

  return (
    <div role="tabpanel" className={className ?? 'bhcm-tabpanel'} {...props}>
      {children}
    </div>
  )
}
