import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { MenuDivider } from './Menu.styles'

export const MenuItemDivider = forwardRef(function MenuItemDivider(props, ref) {
  return <MenuDivider ref={ref} role="separator" {...props} />
})

MenuItemDivider.displayName = 'MenuItemDivider'

MenuItemDivider.propTypes = {
  className: PropTypes.string,
}

export default MenuItemDivider
