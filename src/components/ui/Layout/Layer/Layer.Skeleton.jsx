import React from 'react'
import PropTypes from 'prop-types'
import { Layer } from './Layer'

function LayerSkeleton({ children, ...props }) {
  return (
    <Layer aria-hidden="true" {...props}>
      {children}
    </Layer>
  )
}

LayerSkeleton.propTypes = {
  children: PropTypes.node,
}

export default LayerSkeleton
