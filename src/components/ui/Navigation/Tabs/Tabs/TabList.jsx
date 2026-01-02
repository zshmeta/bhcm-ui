import { useCallback } from 'react'
import { StyledTabList } from './Tabs.styles'

export default function TabList({ children, className, ...props }) {
  const onKeyDown = useCallback(event => {
    const currentTarget = event.currentTarget
    const tabs = Array.from(currentTarget.querySelectorAll('[role="tab"]'))
    if (tabs.length === 0) return

    const active = document.activeElement
    const idx = Math.max(0, tabs.findIndex(t => t === active))

    const focusAt = nextIndex => {
      const el = tabs[nextIndex]
      if (el && el instanceof HTMLElement) el.focus()
      el?.click?.()
    }

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        focusAt((idx - 1 + tabs.length) % tabs.length)
        break
      case 'ArrowRight':
        event.preventDefault()
        focusAt((idx + 1) % tabs.length)
        break
      case 'Home':
        event.preventDefault()
        focusAt(0)
        break
      case 'End':
        event.preventDefault()
        focusAt(tabs.length - 1)
        break
      default:
        break
    }
  }, [])

  return (
    <StyledTabList
      role="tablist"
      className={className}
      onKeyDown={event => {
        props.onKeyDown?.(event)
        onKeyDown(event)
      }}
      {...props}
    >
      {children}
    </StyledTabList>
  )
}
