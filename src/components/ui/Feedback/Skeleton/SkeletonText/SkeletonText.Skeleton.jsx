import React from 'react'
import PropTypes from 'prop-types'
import SkeletonText from './SkeletonText'

export default function SkeletonTextSkeleton(props) {
  return <SkeletonText aria-hidden="true" {...props} />
}

SkeletonTextSkeleton.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.bool,
  lineCount: PropTypes.number,
  paragraph: PropTypes.bool,
  width: PropTypes.string,
}
