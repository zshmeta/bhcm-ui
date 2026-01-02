import React from 'react'
import PaginationNav from './PaginationNav'

export default {
  title: 'Navigation/PaginationNav',
  component: PaginationNav,
}

export function Default() {
  return <PaginationNav />
}

export function Disabled() {
  return <PaginationNav
  disabled />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <PaginationNav
  size="sm" />
      <PaginationNav
  size="md" />
      <PaginationNav
  size="lg" />
    </div>
  )
}
