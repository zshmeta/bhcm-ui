import React from 'react'
import ProgressIndicator from './ProgressIndicator'

export default {
  title: 'Navigation/ProgressIndicator',
  component: ProgressIndicator,
}

export function Default() {
  return <ProgressIndicator
  children="ProgressIndicator" />
}

export function Disabled() {
  return <ProgressIndicator
  children="ProgressIndicator"
  disabled />
}

export function Invalid() {
  return (
    <ProgressIndicator
  children="ProgressIndicator"
  invalid
  invalidText="Invalid" />
  )
}
