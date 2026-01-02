import React from 'react'
import MenuButton from './MenuButton'

export default {
  title: 'Buttons/MenuButton',
  component: MenuButton,
}

export function Default() {
  return <MenuButton
  onClick={() => {}}
  iconDescription="MenuButton"
  children="MenuButton" />
}

export function Disabled() {
  return <MenuButton
  onClick={() => {}}
  iconDescription="MenuButton"
  children="MenuButton"
  disabled />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <MenuButton
  onClick={() => {}}
  iconDescription="MenuButton"
  children="MenuButton"
  size="sm" />
      <MenuButton
  onClick={() => {}}
  iconDescription="MenuButton"
  children="MenuButton"
  size="md" />
      <MenuButton
  onClick={() => {}}
  iconDescription="MenuButton"
  children="MenuButton"
  size="lg" />
    </div>
  )
}
