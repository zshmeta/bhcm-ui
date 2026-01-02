import React, { forwardRef } from 'react'
import TextInput from '../../Text/TextInput/TextInput'
import { FormContext } from '../../FormWrapper/FormContext'

const FluidTextInput = forwardRef(function FluidTextInput(
  { className, isPassword = false, type, ...rest },
  ref
) {
  const resolvedType = isPassword ? 'password' : type
  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <TextInput ref={ref} className={className} type={resolvedType} {...rest} />
    </FormContext.Provider>
  )
})

FluidTextInput.displayName = 'FluidTextInput'

export default FluidTextInput
