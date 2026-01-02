import React, {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import Portal from '../Portal'
import {
  StyledPopoverContent,
  StyledPopoverRoot,
} from './Popover.styles'

function useIsomorphicLayoutEffect(fn, deps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const useEff = typeof window === 'undefined' ? useEffect : useLayoutEffect
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEff(fn, deps)
}

function computePosition(triggerRect, contentRect, align) {
  const gap = 8
  const vw = typeof window !== 'undefined' ? window.innerWidth : 0
  const vh = typeof window !== 'undefined' ? window.innerHeight : 0

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

  const base = align || 'bottom'

  // Defaults
  let top = triggerRect.bottom + gap
  let left = triggerRect.left

  if (base.startsWith('top')) {
    top = triggerRect.top - contentRect.height - gap
  }
  if (base.startsWith('bottom')) {
    top = triggerRect.bottom + gap
  }
  if (base.startsWith('left')) {
    left = triggerRect.left - contentRect.width - gap
    top = triggerRect.top
  }
  if (base.startsWith('right')) {
    left = triggerRect.right + gap
    top = triggerRect.top
  }

  // Start/end alignment for top/bottom
  if (base.endsWith('start')) {
    left = triggerRect.left
  } else if (base.endsWith('end')) {
    left = triggerRect.right - contentRect.width
  } else if (base === 'top' || base === 'bottom') {
    left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
  }

  // Start/end for left/right
  if (base.startsWith('left') || base.startsWith('right')) {
    if (base.endsWith('start')) {
      top = triggerRect.top
    } else if (base.endsWith('end')) {
      top = triggerRect.bottom - contentRect.height
    } else {
      top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
    }
  }

  // Keep within viewport
  top = clamp(top, 8, Math.max(8, vh - contentRect.height - 8))
  left = clamp(left, 8, Math.max(8, vw - contentRect.width - 8))

  return { top, left }
}

export function PopoverContent({ children, className, role = 'dialog', ...rest }) {
  return (
    <StyledPopoverContent className={className} role={role} {...rest}>
      {children}
    </StyledPopoverContent>
  )
}

PopoverContent.displayName = 'PopoverContent'

/**
 * Popover
 *
 * Primitive overlay that renders content in a portal and positions it relative
 * to a trigger.
 */
export default function Popover({
  children,
  open,
  defaultOpen = false,
  onRequestClose,
  align = 'bottom',
  ...rest
}) {
  const isControlled = typeof open === 'boolean'
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isOpen = isControlled ? open : uncontrolledOpen

  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const contentRef = useRef(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  const [triggerEl, contentEl] = useMemo(() => {
    const items = Children.toArray(children)
    return [items[0], items[1]]
  }, [children])

  const requestClose = useCallback(
    evt => {
      onRequestClose?.(evt)
      if (!isControlled) setUncontrolledOpen(false)
    },
    [isControlled, onRequestClose]
  )

  const toggleOpen = useCallback(
    evt => {
      if (isControlled) return
      setUncontrolledOpen(v => !v)
    },
    [isControlled]
  )

  const updatePosition = useCallback(() => {
    if (!isOpen) return
    const t = triggerRef.current
    const c = contentRef.current
    if (!t || !c) return
    const triggerRect = t.getBoundingClientRect()
    const contentRect = c.getBoundingClientRect()
    setPos(computePosition(triggerRect, contentRect, align))
  }, [align, isOpen])

  useIsomorphicLayoutEffect(() => {
    updatePosition()
  }, [updatePosition])

  useEffect(() => {
    if (!isOpen) return undefined

    const onKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        requestClose(event)
      }
    }

    const onMouseDown = event => {
      const target = event.target
      if (!(target instanceof Node)) return
      const root = rootRef.current
      if (!root) return
      if (root.contains(target)) return
      requestClose(event)
    }

    const onScroll = () => updatePosition()
    const onResize = () => updatePosition()

    document.addEventListener('keydown', onKeyDown, true)
    document.addEventListener('mousedown', onMouseDown, true)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onResize)

    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      document.removeEventListener('mousedown', onMouseDown, true)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onResize)
    }
  }, [isOpen, requestClose, updatePosition])

  const triggerNode = isValidElement(triggerEl)
    ? cloneElement(triggerEl, {
        ref: node => {
          triggerRef.current = node
          const originalRef = triggerEl.ref
          if (typeof originalRef === 'function') originalRef(node)
          else if (originalRef && typeof originalRef === 'object') {
            originalRef.current = node
          }
        },
        'aria-expanded': Boolean(isOpen),
        'aria-haspopup': 'dialog',
        onClick: evt => {
          triggerEl.props?.onClick?.(evt)
          toggleOpen(evt)
        },
      })
    : triggerEl

  const contentNode = isValidElement(contentEl)
    ? cloneElement(contentEl, {
        ref: node => {
          contentRef.current = node
          const originalRef = contentEl.ref
          if (typeof originalRef === 'function') originalRef(node)
          else if (originalRef && typeof originalRef === 'object') {
            originalRef.current = node
          }
        },
        style: {
          ...(contentEl.props?.style || {}),
          position: 'fixed',
          top: `${pos.top}px`,
          left: `${pos.left}px`,
        },
      })
    : contentEl

  return (
    <StyledPopoverRoot ref={rootRef} {...rest}>
      {triggerNode}
      {isOpen ? (
        <Portal>
          {contentNode}
        </Portal>
      ) : null}
    </StyledPopoverRoot>
  )
}

Popover.displayName = 'Popover'

Popover.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  align: PropTypes.string,
}
