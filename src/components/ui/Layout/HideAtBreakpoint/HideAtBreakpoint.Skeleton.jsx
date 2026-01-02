import React from 'react'
import PropTypes from 'prop-types'
import HideAtBreakpoint from './HideAtBreakpoint'

function HideAtBreakpointSkeleton({ children, breakpoint = 'md', ...props }) {
  return (
    <HideAtBreakpoint aria-hidden="true" breakpoint={breakpoint} {...props}>
      {children}
    </HideAtBreakpoint>
  )
}

HideAtBreakpointSkeleton.propTypes = {
  children: PropTypes.node,
  breakpoint: PropTypes.oneOf(['sm', 'md', 'lg', 'xlg', 'max']),
}

export default HideAtBreakpointSkeleton
