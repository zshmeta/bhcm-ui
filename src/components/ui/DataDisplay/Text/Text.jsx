import React from 'react'
import PropTypes from 'prop-types'
import { StyledText } from './Text.styles'

export default function Text({ as = 'span', className, size = 'md', children, ...rest }) {
  return (
    <StyledText as={as} className={className} $size={size} {...rest}>
      {children}
    </StyledText>
  )
}

Text.displayName = 'Text'

Text.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  children: PropTypes.node,
}
