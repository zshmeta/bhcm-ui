import React from 'react'
import ToggleSmall from './ToggleSmall'

export default {
  title: 'Inputs/Controls/ToggleSmall',
  component: ToggleSmall,
}

export function Default() {
  return <ToggleSmall />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <ToggleSmall
  size="sm" />
      <ToggleSmall
  size="md" />
      <ToggleSmall
  size="lg" />
    </div>
  )
}
