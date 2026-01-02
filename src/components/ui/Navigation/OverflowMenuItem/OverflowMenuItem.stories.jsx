import React from 'react'
import OverflowMenuItem from './OverflowMenuItem'

export default {
  title: 'Navigation/OverflowMenuItem',
  component: OverflowMenuItem,
}

export function Default() {
  return <OverflowMenuItem />
}

export function Disabled() {
  return <OverflowMenuItem
  disabled />
}
