import { createContext, useEffect, useMemo, useState } from 'react'
import { ensureTabsStyles } from './Tabs.styles'

export const TabsContext = createContext(null)

export default function Tabs({ value, defaultValue, onValueChange, children, className }) {
  useEffect(() => {
    ensureTabsStyles()
  }, [])

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
    <div className={className ?? 'bhcm-tabs'}>
      <TabsContext.Provider value={api}>{children}</TabsContext.Provider>
    </div>
  )
}
