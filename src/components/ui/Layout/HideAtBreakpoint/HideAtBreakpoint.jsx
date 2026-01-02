import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { HideAtBreakpointRoot } from './HideAtBreakpoint.styles'

const HideAtBreakpoint = forwardRef(function HideAtBreakpoint(
  { as: As = 'div', breakpoint, className, children, ...rest },
  ref
) {
  return (
    <HideAtBreakpointRoot
      as={As}
      ref={ref}
      className={className}
      $breakpoint={breakpoint}
      {...rest}
    >
      {children}
    </HideAtBreakpointRoot>
  )
})

HideAtBreakpoint.displayName = 'HideAtBreakpoint'

HideAtBreakpoint.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  breakpoint: PropTypes.oneOf(['sm', 'md', 'lg', 'xlg', 'max']).isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
}

export default HideAtBreakpoint
