import React, { useState } from 'react'

import TextArea from './TextArea'
import { FormContext } from '../../FormWrapper/FormContext'

export default {
  title: 'Inputs/Text/TextArea',
  component: TextArea,
  decorators: [
    Story => (
      <FormContext.Provider value={{ isFluid: false }}>
        <div style={{ maxWidth: 520 }}>
          <Story />
        </div>
      </FormContext.Provider>
    ),
  ],
}

export function Uncontrolled() {
  return (
    <TextArea
      id="textarea-uncontrolled"
      labelText="Description"
      helperText="Helper text"
      placeholder="Type here"
      defaultValue=""
    />
  )
}

export function ControlledWithCounter() {
  const [value, setValue] = useState('')
  return (
    <TextArea
      id="textarea-controlled"
      labelText="Description"
      value={value}
      onChange={evt => setValue(evt.target.value)}
      enableCounter
      maxCount={200}
      placeholder="Type here"
    />
  )
}

export function Invalid() {
  return (
    <TextArea
      id="textarea-invalid"
      labelText="Description"
      invalid
      invalidText="Please add a description"
      defaultValue=""
    />
  )
}

export function Warn() {
  return (
    <TextArea
      id="textarea-warn"
      labelText="Description"
      warn
      warnText="This looks unusually long"
      defaultValue=""
    />
  )
}

export function Fluid() {
  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <TextArea
        id="textarea-fluid"
        labelText="Description"
        helperText="Fluid variant"
        placeholder="Type here"
        defaultValue=""
      />
    </FormContext.Provider>
  )
}
