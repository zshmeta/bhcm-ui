import React, { forwardRef } from 'react'
import Select from '../../Selection/Select/Select'
import { FormContext } from '../../FormWrapper/FormContext'

const FluidSelect = forwardRef(function FluidSelect({ className, children, ...rest }, ref) {
  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <Select ref={ref} className={className} {...rest}>
        {children}
      </Select>
    </FormContext.Provider>
  )
})

FluidSelect.displayName = 'FluidSelect'

export default FluidSelect
