import React from 'react'
import { ErrorBoundaryContext } from './ErrorBoundaryContext'

/**
 * ErrorBoundary
 *
 * Minimal Carbon-style error boundary with an overridable logging context.
 * - When an error is caught, renders `fallback`.
 * - Resets error state when `children` changes.
 */
export default class ErrorBoundary extends React.Component {
  static contextType = ErrorBoundaryContext

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  state = { hasError: false }

  componentDidCatch(error, info) {
    this.context?.log?.(error, info)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      // Reset error state when subtree changes
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }
    return this.props.children ?? null
  }
}

ErrorBoundary.displayName = 'ErrorBoundary'
