import React from 'react'
import PropTypes from 'prop-types'
import { StyledOrderedList } from './OrderedList.styles'

export default function OrderedList({ className, children, ...rest }) {
  return (
    <StyledOrderedList className={className} {...rest}>
      {children}
    </StyledOrderedList>
  )
}

OrderedList.displayName = 'OrderedList'

OrderedList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}
