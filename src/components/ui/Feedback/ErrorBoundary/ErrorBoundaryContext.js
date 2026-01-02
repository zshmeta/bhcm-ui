import { createContext } from 'react'

export const ErrorBoundaryContext = createContext({
  log(error, info) {
    // Match Carbon behavior: log component stack by default
    console.log(info?.componentStack)
  },
})
