import React from 'react'
import FluidDatePicker from './FluidDatePicker'

export default {
  title: 'Inputs/Fluid/FluidDatePicker',
  component: FluidDatePicker,
}

export function Default() {
  return <FluidDatePicker
  id="fluiddatepicker-demo"
  children="FluidDatePicker" />
}

export function Invalid() {
  return (
    <FluidDatePicker
  id="fluiddatepicker-demo"
  children="FluidDatePicker"
  invalid
  invalidText="Invalid" />
  )
}

export function Warn() {
  return (
    <FluidDatePicker
  id="fluiddatepicker-demo"
  children="FluidDatePicker"
  warn
  warnText="Warning" />
  )
}
