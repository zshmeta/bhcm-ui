import React from 'react'
import FormGroup from './FormGroup'

export default {
  title: 'Inputs/FormWrapper/FormGroup',
  component: FormGroup,
}

export function Default() {
  return <FormGroup
  id="formgroup-demo"
  children="FormGroup" />
}

export function Disabled() {
  return <FormGroup
  id="formgroup-demo"
  children="FormGroup"
  disabled />
}

export function Invalid() {
  return (
    <FormGroup
  id="formgroup-demo"
  children="FormGroup"
  invalid
  invalidText="Invalid" />
  )
}
