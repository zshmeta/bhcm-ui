import React from 'react'
import Pagination from './Pagination'

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
}

export function Default() {
  return <Pagination
  id="pagination-demo"
  labelText="Pagination" />
}

export function Disabled() {
  return <Pagination
  id="pagination-demo"
  labelText="Pagination"
  disabled />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <Pagination
  id="pagination-demo"
  labelText="Pagination"
  size="sm" />
      <Pagination
  id="pagination-demo"
  labelText="Pagination"
  size="md" />
      <Pagination
  id="pagination-demo"
  labelText="Pagination"
  size="lg" />
    </div>
  )
}
