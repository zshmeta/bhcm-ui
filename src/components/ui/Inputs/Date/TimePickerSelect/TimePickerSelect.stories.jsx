import React from 'react'
import TimePickerSelect from './TimePickerSelect'

export default {
  title: 'Inputs/Date/TimePickerSelect',
  component: TimePickerSelect,
}

export function Default() {
  return <TimePickerSelect
  id="timepickerselect-demo" />
}

export function Disabled() {
  return <TimePickerSelect
  id="timepickerselect-demo"
  disabled />
}
