import { createContext, useMemo, useState } from 'react'
import { StyledTabsRoot } from './Tabs.styles'

export const TabsContext = createContext(null)

export default function Tabs({ value, defaultValue, onValueChange, children, className }) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const isControlled = value !== undefined
  const activeValue = isControlled ? value : uncontrolledValue

  const api = useMemo(() => {
    return {
      value: activeValue,
      setValue: (next) => {
        if (!isControlled) setUncontrolledValue(next)
        onValueChange?.(next)
      },
    }
  }, [activeValue, isControlled, onValueChange])

  return (
    <StyledTabsRoot className={className}>
      <TabsContext.Provider value={api}>{children}</TabsContext.Provider>
    </StyledTabsRoot>
  )
}
