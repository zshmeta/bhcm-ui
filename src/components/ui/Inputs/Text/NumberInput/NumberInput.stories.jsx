import React, { useState } from 'react'

import NumberInput from './NumberInput'
import { FormContext } from '../../FormWrapper/FormContext'

export default {
  title: 'Inputs/Text/NumberInput',
  component: NumberInput,
  decorators: [
    Story => (
      <FormContext.Provider value={{ isFluid: false }}>
        <div style={{ maxWidth: 320 }}>
          <Story />
        </div>
      </FormContext.Provider>
    ),
  ],
}

export function Uncontrolled() {
  return (
    <NumberInput
      id="numberinput-uncontrolled"
      labelText="Quantity"
      helperText="Use the stepper buttons"
      min={0}
      max={10}
      step={1}
      defaultValue={2}
    />
  )
}

export function Controlled() {
  const [value, setValue] = useState(3)
  return (
    <NumberInput
      id="numberinput-controlled"
      labelText="Quantity"
      min={0}
      max={10}
      value={value}
      onChange={(_evt, data) => {
        if (typeof data?.value === 'number') setValue(data.value)
      }}
    />
  )
}

export function AllowEmpty() {
  return (
    <NumberInput
      id="numberinput-empty"
      labelText="Optional"
      helperText="Can be cleared"
      allowEmpty
      defaultValue={''}
    />
  )
}

export function Invalid() {
  return (
    <NumberInput
      id="numberinput-invalid"
      labelText="Quantity"
      invalid
      invalidText="Out of range"
      min={0}
      max={10}
      defaultValue={100}
    />
  )
}

export function Disabled() {
  return (
    <NumberInput
      id="numberinput-disabled"
      labelText="Quantity"
      disabled
      defaultValue={2}
    />
  )
}

export function Fluid() {
  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <NumberInput
        id="numberinput-fluid"
        labelText="Quantity"
        helperText="Fluid variant"
        min={0}
        max={10}
        defaultValue={2}
      />
    </FormContext.Provider>
  )
}
