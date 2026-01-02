import React from 'react'
import PropTypes from 'prop-types'

export default function ClassPrefixSkeleton({ children }) {
  return <>{children}</>
}

ClassPrefixSkeleton.displayName = 'ClassPrefixSkeleton'

ClassPrefixSkeleton.propTypes = {
  children: PropTypes.node,
}
