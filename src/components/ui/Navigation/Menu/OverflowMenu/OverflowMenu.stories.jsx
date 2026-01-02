import React from 'react'
import OverflowMenu from './OverflowMenu'

export default {
  title: 'Navigation/Menu/OverflowMenu',
  component: OverflowMenu,
}

export function Default() {
  return <OverflowMenu
  id="overflowmenu-demo"
  children="OverflowMenu" />
}

export function Disabled() {
  return <OverflowMenu
  id="overflowmenu-demo"
  children="OverflowMenu"
  disabled />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <OverflowMenu
  id="overflowmenu-demo"
  children="OverflowMenu"
  size="sm" />
      <OverflowMenu
  id="overflowmenu-demo"
  children="OverflowMenu"
  size="md" />
      <OverflowMenu
  id="overflowmenu-demo"
  children="OverflowMenu"
  size="lg" />
    </div>
  )
}
