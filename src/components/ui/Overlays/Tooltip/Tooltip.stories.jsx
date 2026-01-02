import React from 'react'
import Tooltip from './Tooltip'

export default {
  title: 'Overlays/Tooltip',
  component: Tooltip,
}

export function Default() {
  return <Tooltip
  id="tooltip-demo"
  children="Tooltip" />
}
