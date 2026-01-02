import React from 'react'
import { StyledField, StyledInput, StyledLabel } from './FluidDatePickerInput.styles'

export default function FluidDatePickerInput({
  id,
  labelText,
  type = 'date',
  className,
  ...rest
}) {
  return (
    <StyledField className={className}>
      {labelText ? <StyledLabel htmlFor={id}>{labelText}</StyledLabel> : null}
      <StyledInput id={id} type={type} {...rest} />
    </StyledField>
  )
}

FluidDatePickerInput.displayName = 'FluidDatePickerInput'
