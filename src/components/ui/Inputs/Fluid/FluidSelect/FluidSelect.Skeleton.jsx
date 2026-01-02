import React from 'react'
import SelectSkeleton from '../../Selection/Select/Select.Skeleton'
import { FormContext } from '../../FormWrapper/FormContext'

export default function FluidSelectSkeleton(props) {
  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <SelectSkeleton {...props} />
    </FormContext.Provider>
  )
}

FluidSelectSkeleton.displayName = 'FluidSelectSkeleton'
