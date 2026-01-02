import React from 'react'
import ContentSwitcher from './ContentSwitcher'

export default {
  title: 'Inputs/Selection/ContentSwitcher',
  component: ContentSwitcher,
}

export function Default() {
  return <ContentSwitcher
  children="ContentSwitcher" />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <ContentSwitcher
  children="ContentSwitcher"
  size="sm" />
      <ContentSwitcher
  children="ContentSwitcher"
  size="md" />
      <ContentSwitcher
  children="ContentSwitcher"
  size="lg" />
    </div>
  )
}
