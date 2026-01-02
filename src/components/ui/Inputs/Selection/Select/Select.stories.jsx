import React from 'react'
import Select from './Select'

export default {
  title: 'Inputs/Selection/Select',
  component: Select,
}

export function Default() {
  return <Select
  id="select-demo"
  labelText="Select"
  helperText="Helper text" />
}

export function Invalid() {
  return (
    <Select
  id="select-demo"
  labelText="Select"
  helperText="Helper text"
  invalid
  invalidText="Invalid" />
  )
}

export function Warn() {
  return (
    <Select
  id="select-demo"
  labelText="Select"
  helperText="Helper text"
  warn
  warnText="Warning" />
  )
}
