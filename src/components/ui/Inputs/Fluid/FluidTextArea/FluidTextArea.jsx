import React, { forwardRef } from 'react'
import TextArea from '../../Text/TextArea/TextArea'
import { FormContext } from '../../FormWrapper/FormContext'

const FluidTextArea = forwardRef(function FluidTextArea({ className, ...rest }, ref) {
  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <TextArea ref={ref} className={className} {...rest} />
    </FormContext.Provider>
  )
})

FluidTextArea.displayName = 'FluidTextArea'

export default FluidTextArea
