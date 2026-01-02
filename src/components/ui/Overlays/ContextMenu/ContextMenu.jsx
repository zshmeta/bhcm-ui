import { useEffect, useMemo, useState } from 'react'

function isBrowserEventTarget(node) {
  if (!node) return false
  if (typeof window !== 'undefined' && node === window) return true
  if (typeof document !== 'undefined' && node === document) return true
  if (typeof Element !== 'undefined' && node instanceof Element) return true
  return false
}

/**
 * useContextMenu
 *
 * Preserved Carbon behavior:
 * - Listens for the `contextmenu` event and prevents the browser menu.
 * - Returns `{ open, x, y, onClose }` intended to be spread into a Menu component.
 * - By default attaches to `document` when available.
 *
 * @param {Element|Document|Window|{ current: Element|null }|undefined} [trigger]
 */
export function useContextMenu(trigger) {
  const defaultTrigger = useMemo(() => {
    if (typeof document === 'undefined') return undefined
    return document
  }, [])

  const resolvedTrigger = trigger ?? defaultTrigger

  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState([0, 0])

  useEffect(() => {
    const el = isBrowserEventTarget(resolvedTrigger)
      ? resolvedTrigger
      : resolvedTrigger && typeof resolvedTrigger === 'object'
        ? resolvedTrigger.current
        : undefined

    if (!el || !el.addEventListener) return

    const onContextMenu = e => {
      // Only handle MouseEvent-like events
      if (!e || typeof e !== 'object') return
      if (!('preventDefault' in e)) return

      e.preventDefault()

      const x = 'clientX' in e ? e.clientX : 0
      const y = 'clientY' in e ? e.clientY : 0

      setPosition([x, y])
      setOpen(true)
    }

    el.addEventListener('contextmenu', onContextMenu)
    return () => {
      el.removeEventListener('contextmenu', onContextMenu)
    }
  }, [resolvedTrigger])

  const onClose = () => setOpen(false)

  return {
    open,
    x: position[0],
    y: position[1],
    onClose,
  }
}

export default useContextMenu

export function ContextMenuSkeleton() {
  return null
}

ContextMenuSkeleton.displayName = 'ContextMenuSkeleton'
