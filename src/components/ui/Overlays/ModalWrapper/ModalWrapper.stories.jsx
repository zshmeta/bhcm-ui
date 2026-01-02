import React from 'react'
import ModalWrapper from './ModalWrapper'

export default {
  title: 'Overlays/ModalWrapper',
  component: ModalWrapper,
}

export function Default() {
  return <ModalWrapper />
}

export function Disabled() {
  return <ModalWrapper
  disabled />
}
