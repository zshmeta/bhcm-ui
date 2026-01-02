import { createContext } from 'react'

export const ErrorBoundaryContext = createContext({
  // eslint-disable-next-line no-console
  log(error, info) {
    // Match Carbon behavior: log component stack by default
    // eslint-disable-next-line no-console
    console.log(info?.componentStack)
  },
})
