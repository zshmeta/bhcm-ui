import React from 'react'
import ComboButton from './ComboButton'

export default {
  title: 'Buttons/ComboButton',
  component: ComboButton,
}

export function Default() {
  return <ComboButton
  onClick={() => {}}
  iconDescription="ComboButton"
  children="ComboButton" />
}

export function Disabled() {
  return <ComboButton
  onClick={() => {}}
  iconDescription="ComboButton"
  children="ComboButton"
  disabled />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <ComboButton
  onClick={() => {}}
  iconDescription="ComboButton"
  children="ComboButton"
  size="sm" />
      <ComboButton
  onClick={() => {}}
  iconDescription="ComboButton"
  children="ComboButton"
  size="md" />
      <ComboButton
  onClick={() => {}}
  iconDescription="ComboButton"
  children="ComboButton"
  size="lg" />
    </div>
  )
}
