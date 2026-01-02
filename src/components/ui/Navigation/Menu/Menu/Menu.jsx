import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Portal from '../../../Overlays/Portal'
import { useClassPrefix } from '../../../System/ClassPrefix'
import { MenuList } from './Menu.styles'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

function getMenuFocusableItems(menuEl) {
  if (!menuEl) return []
  const nodes = Array.from(
    menuEl.querySelectorAll(
      'button[role="menuitem"]:not([disabled]), a[role="menuitem"]:not([aria-disabled="true"])'
    )
  )
  return nodes.filter(n => n instanceof HTMLElement)
}

function normalizeAxisValue(v) {
  if (Array.isArray(v)) {
    const filtered = v.filter(x => x != null)
    if (filtered.length === 2) {
      // Prefer the first anchor for root menus.
      return Number(filtered[0])
    }
    return Number(filtered[0] ?? 0)
  }
  return Number(v ?? 0)
}

const Menu = forwardRef(function Menu(
  {
    backgroundToken = 'layer',
    border = false,
    children,
    className,
    containerRef,
    label,
    menuAlignment,
    onClose,
    onOpen,
    open,
    size = 'sm',
    legacyAutoalign = true,
    target,
    x = 0,
    y = 0,
    ...rest
  },
  forwardedRef
) {
  const prefix = useClassPrefix()

  const menuRef = useRef(null)
  const focusReturnRef = useRef(null)

  const [isOpen, setIsOpen] = useState(Boolean(open))

  // Controlled support
  useEffect(() => {
    if (open === undefined) return
    setIsOpen(Boolean(open))
  }, [open])

  const mergedRef = useCallback(
    node => {
      menuRef.current = node
      if (!forwardedRef) return
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else forwardedRef.current = node
    },
    [forwardedRef]
  )

  const portalTarget = useMemo(() => {
    if (target) return target
    if (typeof document === 'undefined') return undefined
    return document.body
  }, [target])

  const pos = useMemo(() => {
    const left = normalizeAxisValue(x)
    const top = normalizeAxisValue(y)
    return { left, top }
  }, [x, y])

  const close = useCallback(
    () => {
      if (open === undefined) {
        setIsOpen(false)
      }
      onClose?.()
      focusReturnRef.current?.focus?.()
    },
    [onClose, open]
  )

  useEffect(() => {
    if (!isOpen) return
    focusReturnRef.current = document.activeElement

    // focus menu container
    requestAnimationFrame(() => {
      menuRef.current?.focus?.()
    })

    onOpen?.()
  }, [isOpen, onOpen])

  const handleKeyDown = e => {
    e.stopPropagation()

    if (e.key === 'Escape') {
      e.preventDefault()
      close()
      return
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const items = getMenuFocusableItems(menuRef.current)
      if (items.length === 0) return

      const active = document.activeElement
      const currentIndex = items.findIndex(item => item === active)
      let nextIndex = currentIndex

      if (currentIndex === -1) {
        nextIndex = 0
      } else {
        nextIndex = e.key === 'ArrowUp' ? currentIndex - 1 : currentIndex + 1
      }

      if (nextIndex < 0) nextIndex = items.length - 1
      if (nextIndex >= items.length) nextIndex = 0

      items[nextIndex].focus()
      e.preventDefault()
    }
  }

  const handleBlur = e => {
    if (!isOpen) return
    if (!onClose) return
    if (!e.relatedTarget) return

    const next = e.relatedTarget
    if (menuRef.current && next instanceof Node && !menuRef.current.contains(next)) {
      close()
    }
  }

  if (!isOpen) return null

  return (
    <Portal container={portalTarget}>
      <MenuList
        {...rest}
        ref={mergedRef}
        role="menu"
        tabIndex={-1}
        aria-label={label}
        className={cx(`${prefix}--menu`, className, `${prefix}--menu--${size}`)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        $border={border}
        style={{ position: 'fixed', left: pos.left, top: pos.top, zIndex: 9999 }}
        data-background-token={backgroundToken}
        data-menu-alignment={menuAlignment}
        data-legacy-autoalign={legacyAutoalign}
        data-action-button-width={containerRef?.current ? containerRef.current.getBoundingClientRect().width : undefined}
      >
        {children}
      </MenuList>
    </Portal>
  )
})

Menu.displayName = 'Menu'

Menu.propTypes = {
  backgroundToken: PropTypes.string,
  border: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  containerRef: PropTypes.any,
  label: PropTypes.string,
  menuAlignment: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  legacyAutoalign: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  target: PropTypes.any,
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
}

export default Menu
