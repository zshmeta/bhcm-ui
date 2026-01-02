import React from 'react'
import PropTypes from 'prop-types'
import SkeletonPlaceholder from './SkeletonPlaceholder'

export default function SkeletonPlaceholderSkeleton(props) {
  return <SkeletonPlaceholder aria-hidden="true" {...props} />
}

SkeletonPlaceholderSkeleton.propTypes = {
  className: PropTypes.string,
}
