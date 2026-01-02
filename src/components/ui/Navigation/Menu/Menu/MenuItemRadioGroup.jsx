import React, { forwardRef, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../../System/ClassPrefix'
import MenuItem from './MenuItem'

function RadioIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8" cy="8" r="3" fill="currentColor" />
    </svg>
  )
}

export const MenuItemRadioGroup = forwardRef(function MenuItemRadioGroup(
  { label, items = [], defaultSelectedItem, selectedItem: selectedItemProp, onChange, ...rest },
  ref
) {
  const prefix = useClassPrefix()

  const initial = useMemo(() => {
    if (selectedItemProp !== undefined) return selectedItemProp
    if (defaultSelectedItem !== undefined) return defaultSelectedItem
    return items?.[0]
  }, [defaultSelectedItem, items, selectedItemProp])

  const [selectedItem, setSelectedItem] = useState(initial)

  useEffect(() => {
    if (selectedItemProp === undefined) return
    setSelectedItem(selectedItemProp)
  }, [selectedItemProp])

  return (
    <li role="group" aria-label={label} ref={ref} className={`${prefix}--menu-item-radio-group`} {...rest}>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {items.map(item => {
          const isSelected = item === selectedItem
          return (
            <MenuItem
              key={String(item)}
              label={String(item)}
              renderIcon={isSelected ? RadioIcon : undefined}
              onClick={e => {
                if (selectedItemProp === undefined) {
                  setSelectedItem(item)
                }
                onChange?.(item, e)
              }}
            />
          )
        })}
      </ul>
    </li>
  )
})

MenuItemRadioGroup.displayName = 'MenuItemRadioGroup'

MenuItemRadioGroup.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.any),
  defaultSelectedItem: PropTypes.any,
  selectedItem: PropTypes.any,
  onChange: PropTypes.func,
}

export default MenuItemRadioGroup
