import React from 'react'
import PropTypes from 'prop-types'
import ProgressBar from './ProgressBar'

export default function ProgressBarSkeleton(props) {
  return <ProgressBar aria-hidden="true" {...props} />
}

ProgressBarSkeleton.propTypes = {
  className: PropTypes.string,
  helperText: PropTypes.string,
  hideLabel: PropTypes.bool,
  label: PropTypes.string,
  max: PropTypes.number,
  size: PropTypes.oneOf(['small', 'big']),
  status: PropTypes.oneOf(['active', 'finished', 'error']),
  type: PropTypes.oneOf(['default', 'inline', 'indented']),
  value: PropTypes.number,
}
