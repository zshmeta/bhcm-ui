import React from 'react'
import PropTypes from 'prop-types'
import { Heading } from './Heading'

function HeadingSkeleton({ children, ...props }) {
  return (
    <Heading aria-hidden="true" {...props}>
      {children}
    </Heading>
  )
}

HeadingSkeleton.propTypes = {
  children: PropTypes.node,
}

export default HeadingSkeleton
