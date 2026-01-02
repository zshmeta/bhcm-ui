import React, { forwardRef } from 'react'
import Search from '../../Text/Search/Search'
import { FormContext } from '../../FormWrapper/FormContext'

const FluidSearch = forwardRef(function FluidSearch({ className, ...rest }, ref) {
  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <Search ref={ref} className={className} {...rest} />
    </FormContext.Provider>
  )
})

FluidSearch.displayName = 'FluidSearch'

export default FluidSearch
