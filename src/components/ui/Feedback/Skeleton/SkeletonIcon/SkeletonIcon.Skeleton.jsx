import React from 'react'
import PropTypes from 'prop-types'
import SkeletonIcon from './SkeletonIcon'

export default function SkeletonIconSkeleton(props) {
  return <SkeletonIcon aria-hidden="true" {...props} />
}

SkeletonIconSkeleton.propTypes = {
  className: PropTypes.string,
}
