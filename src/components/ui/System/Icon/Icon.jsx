import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { StyledIconRoot } from './Icon.styles'

const Icon = forwardRef(function Icon(
  { className, size = 16, children, renderIcon: RenderIcon, ...rest },
  ref
) {
  const resolvedSize = size

  return (
    <StyledIconRoot ref={ref} className={className} $size={resolvedSize} {...rest}>
      {RenderIcon ? <RenderIcon size={resolvedSize} /> : children}
    </StyledIconRoot>
  )
})

Icon.displayName = 'Icon'

Icon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
}

export default Icon
