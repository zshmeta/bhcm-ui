import React from 'react'
import ContainedList from './ContainedList'

export default {
  title: 'DataDisplay/List/ContainedList',
  component: ContainedList,
}

export function Default() {
  return <ContainedList
  id="containedlist-demo"
  children="ContainedList" />
}

export function Disabled() {
  return <ContainedList
  id="containedlist-demo"
  children="ContainedList"
  disabled />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <ContainedList
  id="containedlist-demo"
  children="ContainedList"
  size="sm" />
      <ContainedList
  id="containedlist-demo"
  children="ContainedList"
  size="md" />
      <ContainedList
  id="containedlist-demo"
  children="ContainedList"
  size="lg" />
    </div>
  )
}
