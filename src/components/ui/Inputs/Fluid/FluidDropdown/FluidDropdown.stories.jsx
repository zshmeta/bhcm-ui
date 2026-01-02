import React from 'react'
import FluidDropdown from './FluidDropdown'

export default {
  title: 'Inputs/Fluid/FluidDropdown',
  component: FluidDropdown,
}

export function Default() {
  return <FluidDropdown
  id="fluiddropdown-demo" />
}

export function Disabled() {
  return <FluidDropdown
  id="fluiddropdown-demo"
  disabled />
}

export function Invalid() {
  return (
    <FluidDropdown
  id="fluiddropdown-demo"
  invalid
  invalidText="Invalid" />
  )
}

export function Warn() {
  return (
    <FluidDropdown
  id="fluiddropdown-demo"
  warn
  warnText="Warning" />
  )
}
