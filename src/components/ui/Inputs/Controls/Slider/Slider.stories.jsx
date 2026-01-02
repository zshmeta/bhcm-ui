import React from 'react'
import Slider from './Slider'

export default {
  title: 'Inputs/Controls/Slider',
  component: Slider,
}

export function Default() {
  return <Slider
  id="slider-demo"
  labelText="Slider" />
}

export function Disabled() {
  return <Slider
  id="slider-demo"
  labelText="Slider"
  disabled />
}

export function Invalid() {
  return (
    <Slider
  id="slider-demo"
  labelText="Slider"
  invalid
  invalidText="Invalid" />
  )
}

export function Warn() {
  return (
    <Slider
  id="slider-demo"
  labelText="Slider"
  warn
  warnText="Warning" />
  )
}
