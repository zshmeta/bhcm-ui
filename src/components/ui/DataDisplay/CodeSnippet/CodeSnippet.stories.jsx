import React from 'react'
import CodeSnippet from './CodeSnippet'

export default {
  title: 'DataDisplay/CodeSnippet',
  component: CodeSnippet,
}

export function Default() {
  return <CodeSnippet
  id="codesnippet-demo"
  children="CodeSnippet" />
}

export function Disabled() {
  return <CodeSnippet
  id="codesnippet-demo"
  children="CodeSnippet"
  disabled />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <CodeSnippet
  id="codesnippet-demo"
  children="CodeSnippet"
  size="sm" />
      <CodeSnippet
  id="codesnippet-demo"
  children="CodeSnippet"
  size="md" />
      <CodeSnippet
  id="codesnippet-demo"
  children="CodeSnippet"
  size="lg" />
    </div>
  )
}
