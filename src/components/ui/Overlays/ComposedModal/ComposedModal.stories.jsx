import React from 'react'
import ComposedModal from './ComposedModal'

export default {
  title: 'Overlays/ComposedModal',
  component: ComposedModal,
}

export function Default() {
  return <ComposedModal
  children="ComposedModal" />
}

export function Disabled() {
  return <ComposedModal
  children="ComposedModal"
  disabled />
}

export function Warn() {
  return (
    <ComposedModal
  children="ComposedModal"
  warn
  warnText="Warning" />
  )
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <ComposedModal
  children="ComposedModal"
  size="sm" />
      <ComposedModal
  children="ComposedModal"
  size="md" />
      <ComposedModal
  children="ComposedModal"
  size="lg" />
    </div>
  )
}
