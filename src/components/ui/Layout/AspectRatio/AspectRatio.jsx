import React, { forwardRef } from 'react'
import { StyledAspectRatio } from './AspectRatio.styles'

/**
 * AspectRatio
 *
 * Preserved Carbon behaviors:
 * - Supports polymorphic `as`
 * - `ratio` selects a fixed aspect ratio for the container
 *
 * @param {object} props
 * @param {React.ElementType} [props.as='div']
 * @param {'1x1'|'2x3'|'3x2'|'3x4'|'4x3'|'1x2'|'2x1'|'9x16'|'16x9'} [props.ratio='1x1']
 */
const AspectRatio = forwardRef(function AspectRatio(
  { as = 'div', children, className, ratio = '1x1', ...rest },
  ref
) {
  return (
    <StyledAspectRatio
      as={as}
      ref={ref}
      className={className}
      $ratio={ratio}
      {...rest}
    >
      {children}
    </StyledAspectRatio>
  )
})

AspectRatio.displayName = 'AspectRatio'

export default AspectRatio
