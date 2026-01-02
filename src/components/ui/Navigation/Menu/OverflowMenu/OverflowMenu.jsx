import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import Portal from '../../../Overlays/Portal'
import IconButton from '../../../Buttons/IconButton'
import { useClassPrefix } from '../../../System/ClassPrefix'
import { OverflowMenuOptions, OverflowMenuWrapper } from './OverflowMenu.styles'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

function getFocusableElements(container) {
  if (!container) return []

  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(',')

  const nodes = Array.from(container.querySelectorAll(selector))
  return nodes.filter(node => {
    if (!(node instanceof HTMLElement)) return false
    const style = window.getComputedStyle(node)
    return style.visibility !== 'hidden' && style.display !== 'none'
  })
}

function OverflowMenuVerticalIcon({ className, title = 'Options' }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <title>{title}</title>
      <circle cx="8" cy="3" r="1.25" fill="currentColor" />
      <circle cx="8" cy="8" r="1.25" fill="currentColor" />
      <circle cx="8" cy="13" r="1.25" fill="currentColor" />
    </svg>
  )
}

function getTargetFromTrigger(triggerEl) {
  if (typeof document === 'undefined') return undefined
  if (triggerEl instanceof Element) {
    return triggerEl.closest('[data-floating-menu-container]') || document.body
  }
  return document.body
}

function computeMenuPosition({ triggerEl, direction, flipped }) {
  if (!triggerEl || typeof window === 'undefined') return { top: 0, left: 0 }

  const rect = triggerEl.getBoundingClientRect()
  const scrollX = window.scrollX || window.pageXOffset || 0
  const scrollY = window.scrollY || window.pageYOffset || 0

  const baseDirection = direction || 'bottom'
  const effectiveDirection = flipped
    ? baseDirection === 'bottom'
      ? 'top'
      : baseDirection === 'top'
        ? 'bottom'
        : baseDirection
    : baseDirection

  const offset = 6

  if (effectiveDirection === 'top') {
    return { top: rect.top + scrollY - offset, left: rect.left + scrollX }
  }

  if (effectiveDirection === 'left') {
    return { top: rect.top + scrollY, left: rect.left + scrollX - offset }
  }

  if (effectiveDirection === 'right') {
    return { top: rect.top + scrollY, left: rect.right + scrollX + offset }
  }

  // bottom
  return { top: rect.bottom + scrollY + offset, left: rect.left + scrollX }
}

export const OverflowMenu = forwardRef(function OverflowMenu(
  {
    align,
    'aria-label': ariaLabel = null,
    ariaLabel: deprecatedAriaLabel,
    children,
    className,
    direction = 'bottom',
    flipped = false,
    focusTrap = true,
    iconClass,
    iconDescription = 'Options',
    id,
    light,
    menuOptionsClass,
    onClick = () => {},
    onClose = () => {},
    onOpen = () => {},
    open: openProp,
    renderIcon: IconElement = OverflowMenuVerticalIcon,
    selectorPrimaryFocus = '[data-floating-menu-primary-focus]',
    size = 'md',
    innerRef,
    ...other
  },
  ref
) {
  const prefix = useClassPrefix()
  const [open, setOpen] = useState(openProp ?? false)
  const prevOpenRef = useRef(open)

  const triggerRef = useRef(null)
  const wrapperRef = useRef(null)
  const menuBodyRef = useRef(null)
  const menuItemRefs = useRef({})

  const [position, setPosition] = useState({ top: 0, left: 0 })

  // Sync controlled open.
  useEffect(() => {
    if (openProp === undefined) return
    setOpen(Boolean(openProp))
  }, [openProp])

  // Fire transition callbacks.
  useEffect(() => {
    if (open && !prevOpenRef.current) onOpen()
    if (!open && prevOpenRef.current) onClose()
    prevOpenRef.current = open
  }, [open, onClose, onOpen])

  const focusTrigger = useCallback(() => {
    triggerRef.current?.focus?.()
  }, [])

  const closeMenu = useCallback(
    ({ focus = true } = {}) => {
      setOpen(false)
      if (focus) {
        // focus after state update
        setTimeout(() => focusTrigger(), 0)
      }
    },
    [focusTrigger]
  )

  const handleDocMouseDown = useCallback(
    event => {
      if (!open) return
      const target = event.target
      const wrapper = wrapperRef.current
      const menu = menuBodyRef.current

      if (wrapper && target instanceof Node && wrapper.contains(target)) return
      if (menu && target instanceof Node && menu.contains(target)) return

      closeMenu({ focus: false })
    },
    [closeMenu, open]
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('mousedown', handleDocMouseDown, true)
    return () => document.removeEventListener('mousedown', handleDocMouseDown, true)
  }, [handleDocMouseDown, open])

  // Position calculation
  const updatePosition = useCallback(() => {
    const next = computeMenuPosition({
      triggerEl: triggerRef.current,
      direction,
      flipped,
    })
    setPosition(next)
  }, [direction, flipped])

  useEffect(() => {
    if (!open) return
    updatePosition()

    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open, updatePosition])

  // Focus primary element on open.
  useEffect(() => {
    if (!open) return

    const menu = menuBodyRef.current
    if (!menu) return

    const primary = menu.querySelector(selectorPrimaryFocus)
    if (primary instanceof HTMLElement) {
      primary.focus()
      return
    }

    const focusables = getFocusableElements(menu)
    if (focusables.length > 0) {
      focusables[0].focus()
    }
  }, [open, selectorPrimaryFocus])

  const handleClick = evt => {
    if (menuBodyRef.current && menuBodyRef.current.contains(evt.target)) {
      return
    }

    setOpen(prev => !prev)
    onClick(evt)
  }

  const handleKeyDown = evt => {
    if (open && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(evt.key)) {
      evt.preventDefault()
    }

    if (evt.key === 'Escape') {
      evt.preventDefault()
      evt.stopPropagation()
      closeMenu({ focus: true })
    }

    if (focusTrap && evt.key === 'Tab' && menuBodyRef.current) {
      const focusables = getFocusableElements(menuBodyRef.current)
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement

      if (evt.shiftKey) {
        if (active === first || !menuBodyRef.current.contains(active)) {
          evt.preventDefault()
          last.focus()
        }
      } else {
        if (active === last) {
          evt.preventDefault()
          first.focus()
        }
      }
    }
  }

  const handleOverflowMenuItemFocus = useCallback(
    ({ currentIndex = 0, direction: dir }) => {
      const enabledIndices = Children.toArray(children).reduce((acc, curr, i) => {
        if (isValidElement(curr) && !curr.props.disabled) {
          acc.push(i)
        }
        return acc
      }, [])

      const nextValidIndex = (() => {
        const nextIndex = enabledIndices.indexOf(currentIndex) + dir
        switch (nextIndex) {
          case -1:
            return enabledIndices.length - 1
          case enabledIndices.length:
            return 0
          default:
            return nextIndex
        }
      })()

      const el = menuItemRefs.current[enabledIndices[nextValidIndex]]
      el?.focus?.()
    },
    [children]
  )

  const overflowMenuClasses = cx(
    className,
    `${prefix}--overflow-menu`,
    open && `${prefix}--overflow-menu--open`,
    light && `${prefix}--overflow-menu--light`,
    size && `${prefix}--overflow-menu--${size}`
  )

  const overflowMenuOptionsClasses = cx(
    menuOptionsClass,
    `${prefix}--overflow-menu-options`,
    flipped && `${prefix}--overflow-menu--flip`,
    open && `${prefix}--overflow-menu-options--open`,
    light && `${prefix}--overflow-menu-options--light`,
    size && `${prefix}--overflow-menu-options--${size}`,
    menuOptionsClass
  )

  const overflowMenuIconClasses = cx(`${prefix}--overflow-menu__icon`, iconClass)

  const childrenWithProps = Children.toArray(children).map((child, index) => {
    if (!isValidElement(child)) return null

    return cloneElement(child, {
      closeMenu: child.props.closeMenu || (() => closeMenu({ focus: true })),
      handleOverflowMenuItemFocus,
      ref: el => {
        menuItemRefs.current[index] = el
      },
      index,
    })
  })

  const menuBodyId = `${id || `overflow-menu-${Math.random().toString(16).slice(2)}`}__menu-body`

  const portalTarget = getTargetFromTrigger(triggerRef.current)

  const menuBody = open ? (
    <Portal container={portalTarget}>
      <OverflowMenuOptions
        className={cx(overflowMenuOptionsClasses, menuOptionsClass)}
        tabIndex={-1}
        role="menu"
        aria-label={ariaLabel || deprecatedAriaLabel || iconDescription}
        onKeyDown={handleKeyDown}
        id={menuBodyId}
        ref={menuBodyRef}
        style={{ position: 'absolute', top: position.top, left: position.left, zIndex: 9999 }}
      >
        {childrenWithProps}
      </OverflowMenuOptions>
    </Portal>
  ) : null

  const combinedRef = node => {
    triggerRef.current = node

    if (innerRef) {
      if (typeof innerRef === 'function') innerRef(node)
      else innerRef.current = node
    }

    if (!ref) return
    if (typeof ref === 'function') ref(node)
    else ref.current = node
  }

  return (
    <OverflowMenuWrapper
      className={`${prefix}--overflow-menu__wrapper`}
      aria-owns={open ? menuBodyId : undefined}
      ref={wrapperRef}
    >
      <IconButton
        {...other}
        type="button"
        aria-haspopup
        aria-expanded={open}
        aria-controls={open ? menuBodyId : undefined}
        className={overflowMenuClasses}
        onClick={handleClick}
        id={id}
        ref={combinedRef}
        size={size}
        label={iconDescription}
        kind="ghost"
      >
        <IconElement className={overflowMenuIconClasses} aria-label={iconDescription} />
      </IconButton>

      {menuBody}
    </OverflowMenuWrapper>
  )
})

OverflowMenu.displayName = 'OverflowMenu'

OverflowMenu.propTypes = {
  align: PropTypes.any,
  ['aria-label']: PropTypes.string,
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  direction: PropTypes.string,
  flipped: PropTypes.bool,
  focusTrap: PropTypes.bool,
  iconClass: PropTypes.string,
  iconDescription: PropTypes.string,
  id: PropTypes.string,
  light: PropTypes.bool,
  menuOptionsClass: PropTypes.string,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
  selectorPrimaryFocus: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  innerRef: PropTypes.any,
}

export default OverflowMenu
