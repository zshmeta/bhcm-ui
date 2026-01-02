import React from 'react'
import Text from './Text'

export default {
  title: 'DataDisplay/Text',
  component: Text,
}

export function Default() {
  return <Text
  children="Text" />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <Text
  children="Text"
  size="sm" />
      <Text
  children="Text"
  size="md" />
      <Text
  children="Text"
  size="lg" />
    </div>
  )
}
