import React from 'react'
import Breadcrumb from './Breadcrumb'

export default {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
}

export function Default() {
  return <Breadcrumb
  children="Breadcrumb" />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <Breadcrumb
  children="Breadcrumb"
  size="sm" />
      <Breadcrumb
  children="Breadcrumb"
  size="md" />
      <Breadcrumb
  children="Breadcrumb"
  size="lg" />
    </div>
  )
}
