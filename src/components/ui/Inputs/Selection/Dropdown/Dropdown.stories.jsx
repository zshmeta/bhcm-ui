import React from 'react'
import Dropdown from './Dropdown'

export default {
  title: 'Inputs/Selection/Dropdown',
  component: Dropdown,
}

export function Default() {
  return <Dropdown
  id="dropdown-demo"
  helperText="Helper text" />
}

export function Disabled() {
  return <Dropdown
  id="dropdown-demo"
  helperText="Helper text"
  disabled />
}

export function Invalid() {
  return (
    <Dropdown
  id="dropdown-demo"
  helperText="Helper text"
  invalid
  invalidText="Invalid" />
  )
}

export function Warn() {
  return (
    <Dropdown
  id="dropdown-demo"
  helperText="Helper text"
  warn
  warnText="Warning" />
  )
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <Dropdown
  id="dropdown-demo"
  helperText="Helper text"
  size="sm" />
      <Dropdown
  id="dropdown-demo"
  helperText="Helper text"
  size="md" />
      <Dropdown
  id="dropdown-demo"
  helperText="Helper text"
  size="lg" />
    </div>
  )
}
