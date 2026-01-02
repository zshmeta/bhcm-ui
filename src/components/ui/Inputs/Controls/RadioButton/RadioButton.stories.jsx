import React from 'react'
import RadioButton from './RadioButton'

export default {
  title: 'Inputs/Controls/RadioButton',
  component: RadioButton,
}

export function Default() {
  return <RadioButton
  id="radiobutton-demo"
  onClick={() => {}}
  children="RadioButton"
  labelText="RadioButton" />
}

export function Disabled() {
  return <RadioButton
  id="radiobutton-demo"
  onClick={() => {}}
  children="RadioButton"
  labelText="RadioButton"
  disabled />
}

export function Invalid() {
  return (
    <RadioButton
  id="radiobutton-demo"
  onClick={() => {}}
  children="RadioButton"
  labelText="RadioButton"
  invalid
  invalidText="Invalid" />
  )
}

export function Warn() {
  return (
    <RadioButton
  id="radiobutton-demo"
  onClick={() => {}}
  children="RadioButton"
  labelText="RadioButton"
  warn
  warnText="Warning" />
  )
}
