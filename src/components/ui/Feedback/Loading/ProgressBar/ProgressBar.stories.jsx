import React from 'react'
import ProgressBar from './ProgressBar'

export default {
  title: 'Feedback/Loading/ProgressBar',
  component: ProgressBar,
}

export function Default() {
  return <ProgressBar
  id="progressbar-demo"
  helperText="Helper text" />
}

export function Invalid() {
  return (
    <ProgressBar
  id="progressbar-demo"
  helperText="Helper text"
  invalid
  invalidText="Invalid" />
  )
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <ProgressBar
  id="progressbar-demo"
  helperText="Helper text"
  size="sm" />
      <ProgressBar
  id="progressbar-demo"
  helperText="Helper text"
  size="md" />
      <ProgressBar
  id="progressbar-demo"
  helperText="Helper text"
  size="lg" />
    </div>
  )
}
