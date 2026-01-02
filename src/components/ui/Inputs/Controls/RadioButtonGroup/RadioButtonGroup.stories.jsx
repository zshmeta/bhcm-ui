import React from 'react'
import RadioButtonGroup from './RadioButtonGroup'

export default {
  title: 'Inputs/Controls/RadioButtonGroup',
  component: RadioButtonGroup,
}

export function Default() {
  return <RadioButtonGroup
  id="radiobuttongroup-demo"
  onClick={() => {}}
  children="RadioButtonGroup" />
}

export function Disabled() {
  return <RadioButtonGroup
  id="radiobuttongroup-demo"
  onClick={() => {}}
  children="RadioButtonGroup"
  disabled />
}

export function Invalid() {
  return (
    <RadioButtonGroup
  id="radiobuttongroup-demo"
  onClick={() => {}}
  children="RadioButtonGroup"
  invalid
  invalidText="Invalid" />
  )
}

export function Warn() {
  return (
    <RadioButtonGroup
  id="radiobuttongroup-demo"
  onClick={() => {}}
  children="RadioButtonGroup"
  warn
  warnText="Warning" />
  )
}
