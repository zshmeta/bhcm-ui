import { useContext } from 'react'
import { TabsContext } from '../Tabs/Tabs'
import { StyledTabButton } from '../Tabs/Tabs.styles'

export default function Tab({ value, children, className, ...props }) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tab must be used within <Tabs>.')

  const isActive = ctx.value === value

  return (
    <StyledTabButton
      type="button"
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      $active={isActive}
      className={className}
      onClick={() => ctx.setValue(value)}
      {...props}
    >
      {children}
    </StyledTabButton>
  )
}
