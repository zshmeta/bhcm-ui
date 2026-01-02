import React from 'react'
import FluidMultiSelect from './FluidMultiSelect'

export default {
  title: 'Inputs/Fluid/FluidMultiSelect',
  component: FluidMultiSelect,
}

export function Default() {
  return <FluidMultiSelect
  id="fluidmultiselect-demo" />
}

export function Disabled() {
  return <FluidMultiSelect
  id="fluidmultiselect-demo"
  disabled />
}

export function Invalid() {
  return (
    <FluidMultiSelect
  id="fluidmultiselect-demo"
  invalid
  invalidText="Invalid" />
  )
}

export function Warn() {
  return (
    <FluidMultiSelect
  id="fluidmultiselect-demo"
  warn
  warnText="Warning" />
  )
}
