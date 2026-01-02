import React from 'react'
import DatePicker from './DatePicker'

export default {
  title: 'Inputs/Date/DatePicker',
  component: DatePicker,
}

export function Default() {
  return <DatePicker
  children="DatePicker" />
}

export function Invalid() {
  return (
    <DatePicker
  children="DatePicker"
  invalid
  invalidText="Invalid" />
  )
}

export function Warn() {
  return (
    <DatePicker
  children="DatePicker"
  warn
  warnText="Warning" />
  )
}
