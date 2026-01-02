import { useContext } from 'react'
import { TabsContext } from '../Tabs/Tabs'
import { StyledTabPanel } from '../Tabs/Tabs.styles'

export default function TabContent({ when, children, className, ...props }) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('TabContent must be used within <Tabs>.')

  if (ctx.value !== when) return null

  return (
    <StyledTabPanel role="tabpanel" className={className} {...props}>
      {children}
    </StyledTabPanel>
  )
}

