import React from 'react'
import CopyButton from './CopyButton'

export default {
  title: 'Buttons/CopyButton',
  component: CopyButton,
}

export function Default() {
  return <CopyButton
  onClick={() => {}}
  iconDescription="CopyButton"
  children="CopyButton" />
}
