import React from 'react'
import PropTypes from 'prop-types'
import { StyledIconIndicatorDot, StyledIconIndicatorRoot } from './IconIndicator.styles'

export default function IconIndicator({
  className,
  label,
  status = 'info',
  size = 10,
  ...rest
}) {
  return (
    <StyledIconIndicatorRoot className={className} {...rest}>
      <StyledIconIndicatorDot $status={status} $size={size} aria-hidden="true" />
      {label ? <span>{label}</span> : null}
    </StyledIconIndicatorRoot>
  )
}

IconIndicator.displayName = 'IconIndicator'

IconIndicator.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node,
  status: PropTypes.oneOf(['info', 'success', 'warning', 'error', 'neutral']),
  size: PropTypes.number,
}
