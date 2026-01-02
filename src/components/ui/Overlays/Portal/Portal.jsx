import React, { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Portal
 *
 * Enterprise behaviors:
 * - Defaults to rendering into document.body
 * - Allows overriding the container via a ref or HTMLElement
 * - Avoids SSR crashes by rendering null when document is unavailable
 */
export default function Portal({ children, container, ...rest }) {
  const isBrowser = typeof document !== 'undefined'
  const [mountNode, setMountNode] = useState(null)

  const containerEl = useMemo(() => {
    if (!container) return null
    if (container && typeof container === 'object' && 'current' in container) {
      return container.current || null
    }
    return container
  }, [container])

  useEffect(() => {
    if (!isBrowser) return
    setMountNode(containerEl || document.body)
  }, [containerEl, isBrowser])

  if (!isBrowser || !mountNode) return null
  return createPortal(children, mountNode)
}

Portal.displayName = 'Portal'
