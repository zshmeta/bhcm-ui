import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../../System/ClassPrefix'
import { MenuItemButton, MenuItemLabel, MenuItemLi, MenuItemShortcut } from './Menu.styles'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

export const MenuItem = forwardRef(function MenuItem(
  {
    children,
    className,
    disabled = false,
    kind = 'default',
    label,
    onClick,
    renderIcon: Icon,
    shortcut,
    ...rest
  },
  ref
) {
  const prefix = useClassPrefix()
  const hasChildren = Boolean(children)

  const isDisabled = disabled && !hasChildren
  const isDanger = kind === 'danger' && !hasChildren

  return (
    <MenuItemLi role="none" ref={ref} {...rest} className={cx(className, `${prefix}--menu-item`)}>
      <MenuItemButton
        type="button"
        role="menuitem"
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        onClick={e => {
          if (isDisabled) return
          onClick?.(e)
        }}
        $danger={isDanger}
        tabIndex={-1}
      >
        {Icon ? (
          <span className={`${prefix}--menu-item__icon`} aria-hidden="true">
            <Icon />
          </span>
        ) : null}
        <MenuItemLabel className={`${prefix}--menu-item__label`}>{label}</MenuItemLabel>
        {shortcut ? (
          <MenuItemShortcut className={`${prefix}--menu-item__shortcut`}>{shortcut}</MenuItemShortcut>
        ) : null}
      </MenuItemButton>
    </MenuItemLi>
  )
})

MenuItem.displayName = 'MenuItem'

MenuItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  kind: PropTypes.oneOf(['default', 'danger']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
  shortcut: PropTypes.string,
}

export default MenuItem
