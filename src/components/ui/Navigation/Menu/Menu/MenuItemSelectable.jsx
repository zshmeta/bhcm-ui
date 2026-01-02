import React, { forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../../System/ClassPrefix'
import { MenuCheck } from './Menu.styles'
import MenuItem from './MenuItem'

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M13 22.2 6.8 16l-1.4 1.4L13 25 27 11l-1.4-1.4z"
      />
    </svg>
  )
}

export const MenuItemSelectable = forwardRef(function MenuItemSelectable(
  {
    defaultSelected = false,
    selected: selectedProp,
    onChange,
    ...rest
  },
  ref
) {
  const prefix = useClassPrefix()
  const [selected, setSelected] = useState(Boolean(selectedProp ?? defaultSelected))

  useEffect(() => {
    if (selectedProp === undefined) return
    setSelected(Boolean(selectedProp))
  }, [selectedProp])

  return (
    <MenuItem
      {...rest}
      ref={ref}
      className={`${prefix}--menu-item-selectable`}
      onClick={e => {
        const next = !selected
        if (selectedProp === undefined) {
          setSelected(next)
        }
        onChange?.(next, e)
        rest.onClick?.(e)
      }}
      renderIcon={rest.renderIcon}
      label={rest.label}
      shortcut={rest.shortcut}
    >
      {rest.children}
      <MenuCheck className={`${prefix}--menu-item-selectable__check`}>
        {selected ? <CheckIcon /> : null}
      </MenuCheck>
    </MenuItem>
  )
})

MenuItemSelectable.displayName = 'MenuItemSelectable'

MenuItemSelectable.propTypes = {
  defaultSelected: PropTypes.bool,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
}

export default MenuItemSelectable
