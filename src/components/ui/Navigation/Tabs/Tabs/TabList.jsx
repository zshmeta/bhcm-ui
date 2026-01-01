import { useEffect } from 'react'
import { ensureTabsStyles } from './Tabs.styles'

export default function TabList({ children, className, ...props }) {
  useEffect(() => {
    ensureTabsStyles()
  }, [])

  return (
    <div role="tablist" className={className ?? 'bhcm-tablist'} {...props}>
      {children}
    </div>
  )
}
