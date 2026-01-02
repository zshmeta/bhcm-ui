import React from 'react'
import PropTypes from 'prop-types'
import { StyledListBox } from './ListBox.styles'

export default function ListBox({ className, children, ...rest }) {
  return (
    <StyledListBox className={className} role="listbox" {...rest}>
      {children}
    </StyledListBox>
  )
}

ListBox.displayName = 'ListBox'

ListBox.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}
