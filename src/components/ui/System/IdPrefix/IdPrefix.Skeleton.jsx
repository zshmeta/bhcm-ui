import React from 'react'
import PropTypes from 'prop-types'

export default function IdPrefixSkeleton({ children }) {
  return <>{children}</>
}

IdPrefixSkeleton.displayName = 'IdPrefixSkeleton'

IdPrefixSkeleton.propTypes = {
  children: PropTypes.node,
}
