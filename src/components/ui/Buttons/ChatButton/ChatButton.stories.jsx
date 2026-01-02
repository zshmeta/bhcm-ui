import React from 'react'
import ChatButton from './ChatButton'

export default {
  title: 'Buttons/ChatButton',
  component: ChatButton,
}

export function Default() {
  return <ChatButton
  onClick={() => {}}
  children="ChatButton" />
}

export function Disabled() {
  return <ChatButton
  onClick={() => {}}
  children="ChatButton"
  disabled />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <ChatButton
  onClick={() => {}}
  children="ChatButton"
  size="sm" />
      <ChatButton
  onClick={() => {}}
  children="ChatButton"
  size="md" />
      <ChatButton
  onClick={() => {}}
  children="ChatButton"
  size="lg" />
    </div>
  )
}
