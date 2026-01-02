import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from './Layout'

function LayoutSkeleton({ children, ...props }) {
  return (
    <Layout aria-hidden="true" {...props}>
      {children}
    </Layout>
  )
}

LayoutSkeleton.propTypes = {
  children: PropTypes.node,
}

export default LayoutSkeleton
