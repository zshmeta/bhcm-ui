import React from 'react'
import ComboBox from './ComboBox'

export default {
  title: 'Inputs/Controls/ComboBox',
  component: ComboBox,
}

export function Default() {
  return <ComboBox
  id="combobox-demo"
  helperText="Helper text"
  placeholder="Type here" />
}

export function Disabled() {
  return <ComboBox
  id="combobox-demo"
  helperText="Helper text"
  placeholder="Type here"
  disabled />
}

export function Invalid() {
  return (
    <ComboBox
  id="combobox-demo"
  helperText="Helper text"
  placeholder="Type here"
  invalid
  invalidText="Invalid" />
  )
}

export function Warn() {
  return (
    <ComboBox
  id="combobox-demo"
  helperText="Helper text"
  placeholder="Type here"
  warn
  warnText="Warning" />
  )
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <ComboBox
  id="combobox-demo"
  helperText="Helper text"
  placeholder="Type here"
  size="sm" />
      <ComboBox
  id="combobox-demo"
  helperText="Helper text"
  placeholder="Type here"
  size="md" />
      <ComboBox
  id="combobox-demo"
  helperText="Helper text"
  placeholder="Type here"
  size="lg" />
    </div>
  )
}
