import React, { forwardRef } from 'react'
import { StyledFormItem } from './FormItem.styles'

const FormItem = forwardRef(function FormItem({ children, className, ...rest }, ref) {
  return (
    <StyledFormItem ref={ref} className={className} {...rest}>
      {children}
    </StyledFormItem>
  )
})

FormItem.displayName = 'FormItem'

export default FormItem
