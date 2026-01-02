import React from 'react'

import PasswordInput from './PasswordInput'
import { FormContext } from '../../FormWrapper/FormContext'

export default {
  title: 'Inputs/Text/PasswordInput',
  component: PasswordInput,
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

export function Default() {
  return (
    <PasswordInput
      id="password-default"
      labelText="Password"
      helperText="Use at least 12 characters"
      placeholder="••••••••"
    />
  )
}

export function DefaultShowPassword() {
  return (
    <PasswordInput
      id="password-show"
      labelText="Password"
      defaultShowPassword
      helperText="Starts in visible mode"
      placeholder="••••••••"
    />
  )
}

export function Invalid() {
  return (
    <PasswordInput
      id="password-invalid"
      labelText="Password"
      invalid
      invalidText="Password is required"
      placeholder="••••••••"
    />
  )
}

export function Warn() {
  return (
    <PasswordInput
      id="password-warn"
      labelText="Password"
      warn
      warnText="This password may be weak"
      placeholder="••••••••"
    />
  )
}

export function Fluid() {
  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <PasswordInput
        id="password-fluid"
        labelText="Password"
        helperText="Fluid variant"
        placeholder="••••••••"
      />
    </FormContext.Provider>
  )
}
