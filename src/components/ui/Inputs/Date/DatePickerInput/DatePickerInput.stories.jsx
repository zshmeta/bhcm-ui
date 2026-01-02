import React from 'react'
import DatePickerInput from './DatePickerInput'

export default {
  title: 'Inputs/Date/DatePickerInput',
  component: DatePickerInput,
}

export function Default() {
  return <DatePickerInput
  id="datepickerinput-demo"
  labelText="DatePickerInput"
  helperText="Helper text"
  placeholder="Type here" />
}

export function Disabled() {
  return <DatePickerInput
  id="datepickerinput-demo"
  labelText="DatePickerInput"
  helperText="Helper text"
  placeholder="Type here"
  disabled />
}

export function Invalid() {
  return (
    <DatePickerInput
  id="datepickerinput-demo"
  labelText="DatePickerInput"
  helperText="Helper text"
  placeholder="Type here"
  invalid
  invalidText="Invalid" />
  )
}

export function Warn() {
  return (
    <DatePickerInput
  id="datepickerinput-demo"
  labelText="DatePickerInput"
  helperText="Helper text"
  placeholder="Type here"
  warn
  warnText="Warning" />
  )
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <DatePickerInput
  id="datepickerinput-demo"
  labelText="DatePickerInput"
  helperText="Helper text"
  placeholder="Type here"
  size="sm" />
      <DatePickerInput
  id="datepickerinput-demo"
  labelText="DatePickerInput"
  helperText="Helper text"
  placeholder="Type here"
  size="md" />
      <DatePickerInput
  id="datepickerinput-demo"
  labelText="DatePickerInput"
  helperText="Helper text"
  placeholder="Type here"
  size="lg" />
    </div>
  )
}
