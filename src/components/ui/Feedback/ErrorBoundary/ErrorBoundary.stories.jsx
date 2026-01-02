import React from 'react'
import ErrorBoundary from './ErrorBoundary'

export default {
  title: 'Feedback/ErrorBoundary',
  component: ErrorBoundary,
}

export function Default() {
  return <ErrorBoundary
  children="ErrorBoundary" />
}
