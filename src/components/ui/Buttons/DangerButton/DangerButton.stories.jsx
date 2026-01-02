import React from 'react'
import DangerButton from './DangerButton'

export default {
  title: 'Buttons/DangerButton',
  component: DangerButton,
}

export function Default() {
  return <DangerButton
  onClick={() => {}}
  iconDescription="DangerButton"
  children="DangerButton" />
}

export function Disabled() {
  return <DangerButton
  onClick={() => {}}
  iconDescription="DangerButton"
  children="DangerButton"
  disabled />
}
