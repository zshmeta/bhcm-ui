import React from 'react'
import Checkbox from './Checkbox'

export default {
  title: 'Inputs/Controls/Checkbox',
  component: Checkbox,
}

export function Default() {
  return <Checkbox
  id="checkbox-demo"
  labelText="Checkbox"
  helperText="Helper text" />
}

export function Disabled() {
  return <Checkbox
  id="checkbox-demo"
  labelText="Checkbox"
  helperText="Helper text"
  disabled />
}

export function Invalid() {
  return (
    <Checkbox
  id="checkbox-demo"
  labelText="Checkbox"
  helperText="Helper text"
  invalid
  invalidText="Invalid" />
  )
}

export function Warn() {
  return (
    <Checkbox
  id="checkbox-demo"
  labelText="Checkbox"
  helperText="Helper text"
  warn
  warnText="Warning" />
  )
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <Checkbox
  id="checkbox-demo"
  labelText="Checkbox"
  helperText="Helper text"
  size="sm" />
      <Checkbox
  id="checkbox-demo"
  labelText="Checkbox"
  helperText="Helper text"
  size="md" />
      <Checkbox
  id="checkbox-demo"
  labelText="Checkbox"
  helperText="Helper text"
  size="lg" />
    </div>
  )
}
