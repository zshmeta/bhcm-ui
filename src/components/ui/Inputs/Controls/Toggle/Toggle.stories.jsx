import React from 'react'
import Toggle from './Toggle'

export default {
  title: 'Inputs/Controls/Toggle',
  component: Toggle,
}

export function Default() {
  return <Toggle
  id="toggle-demo"
  labelText="Toggle" />
}

export function Disabled() {
  return <Toggle
  id="toggle-demo"
  labelText="Toggle"
  disabled />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <Toggle
  id="toggle-demo"
  labelText="Toggle"
  size="sm" />
      <Toggle
  id="toggle-demo"
  labelText="Toggle"
  size="md" />
      <Toggle
  id="toggle-demo"
  labelText="Toggle"
  size="lg" />
    </div>
  )
}
