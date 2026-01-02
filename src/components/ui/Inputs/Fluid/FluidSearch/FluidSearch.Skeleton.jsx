import React from 'react'
import SearchSkeleton from '../../Text/Search/Search.Skeleton'
import { FormContext } from '../../FormWrapper/FormContext'

export default function FluidSearchSkeleton(props) {
  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <SearchSkeleton {...props} />
    </FormContext.Provider>
  )
}

FluidSearchSkeleton.displayName = 'FluidSearchSkeleton'
