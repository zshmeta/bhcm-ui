import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { StyledSelect, StyledWrap } from './TimePickerSelect.styles'

const TimePickerSelect = forwardRef(function TimePickerSelect(
  {
    ['aria-label']: ariaLabel = 'open list of options',
    children,
    id,
    disabled = false,
    className,
    ...rest
  },
  ref
) {
  return (
    <StyledWrap className={className}>
      <StyledSelect aria-label={ariaLabel} disabled={disabled} id={id} ref={ref} {...rest}>
        {children}
      </StyledSelect>
    </StyledWrap>
  )
})

TimePickerSelect.displayName = 'TimePickerSelect'

TimePickerSelect.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
}

export default TimePickerSelect
