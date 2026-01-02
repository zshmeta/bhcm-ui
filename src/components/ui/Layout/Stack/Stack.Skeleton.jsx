import React from 'react'
import PropTypes from 'prop-types'
import Stack from './Stack'

function StackSkeleton({ children, ...props }) {
  return (
    <Stack aria-hidden="true" {...props}>
      {children}
    </Stack>
  )
}

StackSkeleton.propTypes = {
  children: PropTypes.node,
}

export default StackSkeleton
