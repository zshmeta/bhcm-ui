import React, { forwardRef } from 'react'
import NumberInput from '../../Text/NumberInput/NumberInput'
import { FormContext } from '../../FormWrapper/FormContext'

const FluidNumberInput = forwardRef(function FluidNumberInput({ className, ...rest }, ref) {
  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <NumberInput ref={ref} className={className} {...rest} />
    </FormContext.Provider>
  )
})

FluidNumberInput.displayName = 'FluidNumberInput'

export default FluidNumberInput
