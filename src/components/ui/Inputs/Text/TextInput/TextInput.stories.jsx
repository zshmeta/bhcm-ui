import React, { useState } from 'react'

import TextInput from './TextInput'
import { FormContext } from '../../FormWrapper/FormContext'

export default {
  title: 'Inputs/Text/TextInput',
  component: TextInput,
  decorators: [
    Story => (
      <FormContext.Provider value={{ isFluid: false }}>
        <div style={{ maxWidth: 420 }}>
          <Story />
        </div>
      </FormContext.Provider>
    ),
  ],
}

export function Uncontrolled() {
  return (
    <TextInput
      id="textinput-uncontrolled"
      labelText="Label"
      helperText="Helper text"
      placeholder="Type here"
      defaultValue=""
    />
  )
}

export function Controlled() {
  const [value, setValue] = useState('')
  return (
    <TextInput
      id="textinput-controlled"
      labelText="Label"
      value={value}
      onChange={evt => setValue(evt.target.value)}
      placeholder="Type here"
      enableCounter
      maxCount={32}
    />
  )
}

export function Invalid() {
  return (
    <TextInput
      id="textinput-invalid"
      labelText="Label"
      invalid
      invalidText="This field is required"
      defaultValue=""
    />
  )
}


export function Fluid() {
  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <TextInput
        id="textinput-fluid"
        labelText="Label"
        helperText="Fluid variant"
        placeholder="Type here"
        defaultValue=""
      />
    </FormContext.Provider>
  )
}

export function Warn() {
  return (
    <TextInput
      id="textinput-warn"
      labelText="Label"
      warn
      warnText="This looks unusual"
      defaultValue=""
    />
  )
}
