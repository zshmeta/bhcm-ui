import React from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'

export default function LoadingSkeleton(props) {
  return <Loading aria-hidden="true" {...props} />
}

LoadingSkeleton.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  small: PropTypes.bool,
  withOverlay: PropTypes.bool,
}
