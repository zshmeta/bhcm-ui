import React from 'react'
import { StyledField, StyledLabel, StyledSelect } from './FluidTimePickerSelect.styles'

export default function FluidTimePickerSelect({
  children,
  className,
  id,
  labelText,
  ...rest
}) {
  return (
    <StyledField className={className}>
      {labelText ? <StyledLabel htmlFor={id}>{labelText}</StyledLabel> : null}
      <StyledSelect id={id} {...rest}>
        {children}
      </StyledSelect>
    </StyledField>
  )
}

FluidTimePickerSelect.displayName = 'FluidTimePickerSelect'
