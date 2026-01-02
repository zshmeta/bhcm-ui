import React from 'react'
import CheckboxGroup from './CheckboxGroup'

export default {
  title: 'Inputs/Controls/CheckboxGroup',
  component: CheckboxGroup,
}

export function Default() {
  return <CheckboxGroup
  id="checkboxgroup-demo"
  helperText="Helper text"
  children="CheckboxGroup" />
}

export function Invalid() {
  return (
    <CheckboxGroup
  id="checkboxgroup-demo"
  helperText="Helper text"
  children="CheckboxGroup"
  invalid
  invalidText="Invalid" />
  )
}

export function Warn() {
  return (
    <CheckboxGroup
  id="checkboxgroup-demo"
  helperText="Helper text"
  children="CheckboxGroup"
  warn
  warnText="Warning" />
  )
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <CheckboxGroup
  id="checkboxgroup-demo"
  helperText="Helper text"
  children="CheckboxGroup"
  size="sm" />
      <CheckboxGroup
  id="checkboxgroup-demo"
  helperText="Helper text"
  children="CheckboxGroup"
  size="md" />
      <CheckboxGroup
  id="checkboxgroup-demo"
  helperText="Helper text"
  children="CheckboxGroup"
  size="lg" />
    </div>
  )
}
