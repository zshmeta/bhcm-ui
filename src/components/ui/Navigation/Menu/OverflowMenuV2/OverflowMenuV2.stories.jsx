import React from 'react'
import OverflowMenuV2 from './OverflowMenuV2'

export default {
  title: 'Navigation/Menu/OverflowMenuV2',
  component: OverflowMenuV2,
}

export function Default() {
  return <OverflowMenuV2 />
}

export function Warn() {
  return (
    <OverflowMenuV2
  warn
  warnText="Warning" />
  )
}
