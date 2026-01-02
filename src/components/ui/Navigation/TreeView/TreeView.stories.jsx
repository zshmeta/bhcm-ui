import React from 'react'
import TreeView from './TreeView'

export default {
  title: 'Navigation/TreeView',
  component: TreeView,
}

export function Default() {
  return <TreeView
  id="treeview-demo"
  children="TreeView" />
}

export function Disabled() {
  return <TreeView
  id="treeview-demo"
  children="TreeView"
  disabled />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <TreeView
  id="treeview-demo"
  children="TreeView"
  size="sm" />
      <TreeView
  id="treeview-demo"
  children="TreeView"
  size="md" />
      <TreeView
  id="treeview-demo"
  children="TreeView"
  size="lg" />
    </div>
  )
}
