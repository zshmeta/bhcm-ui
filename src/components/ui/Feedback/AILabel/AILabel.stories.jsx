import React from 'react'
import AILabel from './AILabel'

export default {
  title: 'Feedback/AILabel',
  component: AILabel,
}

export function Default() {
  return <AILabel
  id="ailabel-demo"
  children="AILabel" />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <AILabel
  id="ailabel-demo"
  children="AILabel"
  size="sm" />
      <AILabel
  id="ailabel-demo"
  children="AILabel"
  size="md" />
      <AILabel
  id="ailabel-demo"
  children="AILabel"
  size="lg" />
    </div>
  )
}
