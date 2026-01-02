import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../../System/ClassPrefix'
import { MenuGroupLabel, MenuItemLi } from './Menu.styles'

export const MenuItemGroup = forwardRef(function MenuItemGroup(
  { label, children, className, ...rest },
  ref
) {
  const prefix = useClassPrefix()

  return (
    <MenuItemLi
      {...rest}
      ref={ref}
      role="group"
      aria-label={label}
      className={className}
    >
      {label ? (
        <MenuGroupLabel className={`${prefix}--menu-item-group__label`}>{label}</MenuGroupLabel>
      ) : null}
      <ul className={`${prefix}--menu-item-group__items`} style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {children}
      </ul>
    </MenuItemLi>
  )
})

MenuItemGroup.displayName = 'MenuItemGroup'

MenuItemGroup.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
}

export default MenuItemGroup
