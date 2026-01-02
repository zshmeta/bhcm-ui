import { createContext, useContext } from 'react'

export const FormContext = createContext({ isFluid: false })

export function useFormContext() {
  return useContext(FormContext)
}
