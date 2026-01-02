import React from 'react'
import PropTypes from 'prop-types'
import InlineLoading from './InlineLoading'

export default function InlineLoadingSkeleton(props) {
  return <InlineLoading aria-hidden="true" {...props} />
}

InlineLoadingSkeleton.propTypes = {
  className: PropTypes.string,
  description: PropTypes.node,
  iconDescription: PropTypes.string,
  onSuccess: PropTypes.func,
  status: PropTypes.oneOf(['inactive', 'active', 'finished', 'error']),
  successDelay: PropTypes.number,
}
