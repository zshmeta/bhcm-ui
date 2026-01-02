import React from 'react'
import Menu from './Menu'

export default {
  title: 'Navigation/Menu/Menu',
  component: Menu,
}

export function Default() {
  return <Menu
  children="Menu" />
}

export function Disabled() {
  return <Menu
  children="Menu"
  disabled />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <Menu
  children="Menu"
  size="sm" />
      <Menu
  children="Menu"
  size="md" />
      <Menu
  children="Menu"
  size="lg" />
    </div>
  )
}
