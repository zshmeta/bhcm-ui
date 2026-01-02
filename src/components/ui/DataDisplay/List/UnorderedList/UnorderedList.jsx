import React from 'react'
import PropTypes from 'prop-types'
import { StyledUnorderedList } from './UnorderedList.styles'

export default function UnorderedList({ className, children, ...rest }) {
  return (
    <StyledUnorderedList className={className} {...rest}>
      {children}
    </StyledUnorderedList>
  )
}

UnorderedList.displayName = 'UnorderedList'

UnorderedList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}
