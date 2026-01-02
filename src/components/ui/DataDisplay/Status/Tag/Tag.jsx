import React from 'react'
import PropTypes from 'prop-types'
import { StyledTag } from './Tag.styles'

export default function Tag({ className, children, kind = 'neutral', ...rest }) {
  return (
    <StyledTag className={className} $kind={kind} {...rest}>
      {children}
    </StyledTag>
  )
}

Tag.displayName = 'Tag'

Tag.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  kind: PropTypes.oneOf(['neutral', 'info', 'success', 'warning', 'error']),
}
