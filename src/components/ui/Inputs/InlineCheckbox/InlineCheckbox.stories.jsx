import React from 'react'
import InlineCheckbox from './InlineCheckbox'

export default {
  title: 'Inputs/InlineCheckbox',
  component: InlineCheckbox,
}

export function Default() {
  return <InlineCheckbox
  id="inlinecheckbox-demo" />
}

export function Disabled() {
  return <InlineCheckbox
  id="inlinecheckbox-demo"
  disabled />
}
