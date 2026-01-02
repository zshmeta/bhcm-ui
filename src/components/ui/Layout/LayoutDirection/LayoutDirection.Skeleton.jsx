import React from 'react'
import PropTypes from 'prop-types'
import { LayoutDirection } from './LayoutDirection'

function LayoutDirectionSkeleton({ children, dir = 'ltr', ...props }) {
  return (
    <LayoutDirection aria-hidden="true" dir={dir} {...props}>
      {children}
    </LayoutDirection>
  )
}

LayoutDirectionSkeleton.propTypes = {
  children: PropTypes.node,
  dir: PropTypes.oneOf(['ltr', 'rtl']),
}

export default LayoutDirectionSkeleton
