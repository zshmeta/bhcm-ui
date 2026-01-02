import React from 'react'
import Switch from './Switch'

export default {
  title: 'Inputs/Controls/Switch',
  component: Switch,
}

export function Default() {
  return <Switch
  children="Switch" />
}

export function Disabled() {
  return <Switch
  children="Switch"
  disabled />
}
