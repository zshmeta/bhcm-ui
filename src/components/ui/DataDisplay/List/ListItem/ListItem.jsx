import React from 'react'
import PropTypes from 'prop-types'
import { StyledListItem } from './ListItem.styles'

export default function ListItem({
  className,
  children,
  selected = false,
  disabled = false,
  ...rest
}) {
  return (
    <StyledListItem
      className={className}
      role={rest.role || 'option'}
      aria-selected={selected || undefined}
      aria-disabled={disabled || undefined}
      $selected={selected}
      $disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      {...rest}
    >
      {children}
    </StyledListItem>
  )
}

ListItem.displayName = 'ListItem'

ListItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
}
