import React from 'react'
import AISkeleton from './AISkeleton'

export default {
  title: 'Feedback/AISkeleton',
  component: AISkeleton,
}

export function Default() {
  return <AISkeleton />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <AISkeleton
  size="sm" />
      <AISkeleton
  size="md" />
      <AISkeleton
  size="lg" />
    </div>
  )
}
