import React from 'react'
import TimePicker from './TimePicker'

export default {
  title: 'Inputs/Date/TimePicker',
  component: TimePicker,
}

export function Default() {
  return <TimePicker
  id="timepicker-demo"
  labelText="TimePicker"
  children="TimePicker" />
}

export function Disabled() {
  return <TimePicker
  id="timepicker-demo"
  labelText="TimePicker"
  children="TimePicker"
  disabled />
}

export function Invalid() {
  return (
    <TimePicker
  id="timepicker-demo"
  labelText="TimePicker"
  children="TimePicker"
  invalid
  invalidText="Invalid" />
  )
}

export function Warn() {
  return (
    <TimePicker
  id="timepicker-demo"
  labelText="TimePicker"
  children="TimePicker"
  warn
  warnText="Warning" />
  )
}
