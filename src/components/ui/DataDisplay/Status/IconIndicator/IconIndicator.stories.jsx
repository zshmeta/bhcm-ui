import React from 'react'
import IconIndicator from './IconIndicator'

export default {
  title: 'DataDisplay/Status/IconIndicator',
  component: IconIndicator,
}

export function Default() {
  return <IconIndicator />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <IconIndicator
  size="sm" />
      <IconIndicator
  size="md" />
      <IconIndicator
  size="lg" />
    </div>
  )
}
