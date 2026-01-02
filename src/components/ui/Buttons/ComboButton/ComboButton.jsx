import React, { forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Portal } from '../../Overlays'
import {
  Container,
  MenuItemButton,
  MenuItemIconSlot,
  MenuItemLabel,
  MenuItemShell,
  MenuPanel,
  PrimaryAction,
  TriggerAction,
} from './ComboButton.styles'

const translationIds = {
  'carbon.combo-button.additional-actions': 'carbon.combo-button.additional-actions',
}

const defaultTranslations = {
  [translationIds['carbon.combo-button.additional-actions']]: 'Additional actions',
}

const defaultTranslateWithId = messageId => defaultTranslations[messageId] || String(messageId)

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function getFocusableMenuItems(menuEl) {
  if (!menuEl) return []
  return Array.from(menuEl.querySelectorAll('[role="menuitem"]')).filter(el => !el.hasAttribute('aria-disabled'))
}

export default forwardRef(function ComboButton(
  {
    children,
    className,
    disabled,
    label,
    onClick,
    size = 'lg',
    menuAlignment = 'bottom',
    tooltipAlignment, // accepted for API parity; used as title fallback
    translateWithId = defaultTranslateWithId,
    ...rest
  },
  ref
) {
  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  const [open, setOpen] = useState(false)
  const [menuStyle, setMenuStyle] = useState({})

  const menuLabel = translateWithId(translationIds['carbon.combo-button.additional-actions'])

  const mergedRef = node => {
    containerRef.current = node
    if (!ref) return
    if (typeof ref === 'function') ref(node)
    else ref.current = node
  }

  const computeMenuPosition = () => {
    const anchor = triggerRef.current || containerRef.current
    const menuEl = menuRef.current
    if (!anchor || !menuEl) return

    const rect = anchor.getBoundingClientRect()
    const viewportW = window.innerWidth
    const viewportH = window.innerHeight

    const menuRect = menuEl.getBoundingClientRect()
    const offset = 6

    const widthLock = menuAlignment === 'bottom' || menuAlignment === 'top'

    let top = rect.bottom + offset
    let left = rect.left

    if (menuAlignment.startsWith('top')) {
      top = rect.top - menuRect.height - offset
    }

    if (menuAlignment.endsWith('-end')) {
      left = rect.right - menuRect.width
    }

    // keep inside viewport
    top = clamp(top, 6, viewportH - menuRect.height - 6)
    left = clamp(left, 6, viewportW - menuRect.width - 6)

    setMenuStyle({
      top,
      left,
      minWidth: widthLock ? rect.width : undefined,
    })
  }

  useLayoutEffect(() => {
    if (!open) return
    computeMenuPosition()
  }, [open, menuAlignment])

  useEffect(() => {
    if (!open) return

    const onResize = () => computeMenuPosition()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onResize, true)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onResize, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, menuAlignment])

  useEffect(() => {
    function onDocMouseDown(e) {
      if (!open) return
      const target = e.target
      if (containerRef.current?.contains(target)) return
      if (menuRef.current?.contains(target)) return
      setOpen(false)
    }

    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const items = getFocusableMenuItems(menuRef.current)
    items[0]?.focus()
  }, [open])

  const renderedChildren = useMemo(() => {
    const out = []

    React.Children.forEach(children, child => {
      if (child == null) return

      // Divider heuristic
      if (React.isValidElement(child) && (child.type?.displayName?.toLowerCase?.().includes('divider') || child.props?.kind === 'divider')) {
        out.push(<MenuItemShell key={out.length} $divider role="separator" />)
        return
      }

      if (React.isValidElement(child) && typeof child.props?.label === 'string') {
        const { label: childLabel, disabled: childDisabled, onClick: childOnClick, renderIcon: RenderIcon } = child.props
        out.push(
          <MenuItemShell key={out.length} role="none">
            <MenuItemButton
              type="button"
              role="menuitem"
              aria-disabled={childDisabled ? 'true' : undefined}
              disabled={childDisabled}
              onClick={evt => {
                if (childDisabled) return
                childOnClick?.(evt)
                setOpen(false)
                triggerRef.current?.focus()
              }}
            >
              <MenuItemLabel title={childLabel}>{childLabel}</MenuItemLabel>
              {RenderIcon ? (
                <MenuItemIconSlot aria-hidden="true">
                  <RenderIcon />
                </MenuItemIconSlot>
              ) : null}
            </MenuItemButton>
          </MenuItemShell>
        )
        return
      }

      // Fallback: wrap arbitrary content
      out.push(
        <MenuItemShell key={out.length} role="none">
          {React.isValidElement(child)
            ? React.cloneElement(child, {
                role: child.props.role || 'menuitem',
                tabIndex: child.props.tabIndex ?? -1,
                onClick: evt => {
                  child.props.onClick?.(evt)
                  setOpen(false)
                  triggerRef.current?.focus()
                },
              })
            : child}
        </MenuItemShell>
      )
    })

    return out
  }, [children])

  return (
    <div className={className} ref={mergedRef} {...rest}>
      <Container>
        <PrimaryAction
          title={label}
          size={size}
          disabled={disabled}
          onClick={e => {
            if (disabled) return
            onClick?.(e)
          }}
        >
          {label}
        </PrimaryAction>

        <TriggerAction
          $size={size}
          size={size}
          kind="primary"
          disabled={disabled}
          hasIconOnly
          renderIcon={ChevronDownIcon}
          iconDescription={menuLabel}
          aria-haspopup="menu"
          aria-expanded={open}
          title={tooltipAlignment ? menuLabel : menuLabel}
          ref={triggerRef}
          onClick={() => {
            if (disabled) return
            setOpen(v => !v)
          }}
          onKeyDown={evt => {
            if (disabled) return

            if (evt.key === 'ArrowDown' || evt.key === 'Enter' || evt.key === ' ') {
              evt.preventDefault()
              setOpen(true)
            }

            if (evt.key === 'Escape') {
              if (open) {
                evt.preventDefault()
                setOpen(false)
              }
            }
          }}
        />
      </Container>

      {open ? (
        <Portal>
          <MenuPanel
            ref={menuRef}
            role="menu"
            aria-label={menuLabel}
            style={menuStyle}
            $minWidth={menuStyle.minWidth}
            onKeyDown={evt => {
              const items = getFocusableMenuItems(menuRef.current)
              const currentIndex = items.indexOf(document.activeElement)

              if (evt.key === 'Escape') {
                evt.preventDefault()
                setOpen(false)
                triggerRef.current?.focus()
              }

              if (evt.key === 'ArrowDown') {
                evt.preventDefault()
                items[(currentIndex + 1 + items.length) % items.length]?.focus()
              }

              if (evt.key === 'ArrowUp') {
                evt.preventDefault()
                items[(currentIndex - 1 + items.length) % items.length]?.focus()
              }

              if (evt.key === 'Home') {
                evt.preventDefault()
                items[0]?.focus()
              }

              if (evt.key === 'End') {
                evt.preventDefault()
                items[items.length - 1]?.focus()
              }

              if (evt.key === 'Tab') {
                setOpen(false)
              }
            }}
          >
            {renderedChildren}
          </MenuPanel>
        </Portal>
      ) : null}
    </div>
  )
})

ComboButton.displayName = 'ComboButton'

ComboButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  menuAlignment: PropTypes.oneOf(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end']),
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  tooltipAlignment: PropTypes.string,
  translateWithId: PropTypes.func,
}
