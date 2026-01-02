import React, { forwardRef } from 'react'
import { StyledForm } from './Form.styles'

const Form = forwardRef(function Form({ children, className, ...rest }, ref) {
  return (
    <StyledForm ref={ref} className={className} {...rest}>
      {children}
    </StyledForm>
  )
})

Form.displayName = 'Form'

export default Form
