import React from 'react'
import DataTable from './DataTable'

export default {
  title: 'DataDisplay/Table/DataTable',
  component: DataTable,
}

export function Default() {
  return <DataTable
  id="datatable-demo"
  children="DataTable" />
}

export function Disabled() {
  return <DataTable
  id="datatable-demo"
  children="DataTable"
  disabled />
}

export function ExpandableCollapsed() {
  return <DataTable
  id="datatable-demo"
  children="DataTable"
  isExpanded={false}
  onExpand={() => {}} />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <DataTable
  id="datatable-demo"
  children="DataTable"
  size="sm" />
      <DataTable
  id="datatable-demo"
  children="DataTable"
  size="md" />
      <DataTable
  id="datatable-demo"
  children="DataTable"
  size="lg" />
    </div>
  )
}
