import React from 'react'
import Theme from './Theme'

export default {
  title: 'System/Theme',
  component: Theme,
}

export function Default() {
  return <Theme
  children="Theme" />
}

export function Disabled() {
  return <Theme
  children="Theme"
  disabled />
}
