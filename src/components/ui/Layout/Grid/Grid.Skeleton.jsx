import React from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'

function GridSkeleton({ children, ...props }) {
  return (
    <Grid aria-hidden="true" {...props}>
      {children}
    </Grid>
  )
}

GridSkeleton.propTypes = {
  children: PropTypes.node,
}

export default GridSkeleton
