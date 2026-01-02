import React from 'react'
import FluidTimePicker from './FluidTimePicker'

export default {
  title: 'Inputs/Fluid/FluidTimePicker',
  component: FluidTimePicker,
}

export function Default() {
  return <FluidTimePicker
  id="fluidtimepicker-demo"
  labelText="FluidTimePicker"
  placeholder="Type here"
  children="FluidTimePicker" />
}

export function Disabled() {
  return <FluidTimePicker
  id="fluidtimepicker-demo"
  labelText="FluidTimePicker"
  placeholder="Type here"
  children="FluidTimePicker"
  disabled />
}

export function Invalid() {
  return (
    <FluidTimePicker
  id="fluidtimepicker-demo"
  labelText="FluidTimePicker"
  placeholder="Type here"
  children="FluidTimePicker"
  invalid
  invalidText="Invalid" />
  )
}

export function Warn() {
  return (
    <FluidTimePicker
  id="fluidtimepicker-demo"
  labelText="FluidTimePicker"
  placeholder="Type here"
  children="FluidTimePicker"
  warn
  warnText="Warning" />
  )
}
