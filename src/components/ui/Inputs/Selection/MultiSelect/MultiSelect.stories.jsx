import React from 'react'
import MultiSelect from './MultiSelect'

export default {
  title: 'Inputs/Selection/MultiSelect',
  component: MultiSelect,
}

export function Default() {
  return <MultiSelect
  id="multiselect-demo"
  labelText="MultiSelect"
  helperText="Helper text" />
}

export function Invalid() {
  return (
    <MultiSelect
  id="multiselect-demo"
  labelText="MultiSelect"
  helperText="Helper text"
  invalid
  invalidText="Invalid" />
  )
}

export function Warn() {
  return (
    <MultiSelect
  id="multiselect-demo"
  labelText="MultiSelect"
  helperText="Helper text"
  warn
  warnText="Warning" />
  )
}
