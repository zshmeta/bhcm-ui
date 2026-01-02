import React, { forwardRef } from 'react'
import { StyledFormLabel } from './FormLabel.styles'

const FormLabel = forwardRef(function FormLabel(
  { children, className, id, ...rest },
  ref
) {
  return (
    <StyledFormLabel ref={ref} className={className} htmlFor={id} {...rest}>
      {children}
    </StyledFormLabel>
  )
})

FormLabel.displayName = 'FormLabel'

export default FormLabel
