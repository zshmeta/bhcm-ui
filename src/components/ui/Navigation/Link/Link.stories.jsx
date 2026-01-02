import React from 'react'
import Link from './Link'

export default {
  title: 'Navigation/Link',
  component: Link,
}

export function Default() {
  return <Link
  href="#"
  children="Link" />
}

export function Disabled() {
  return <Link
  href="#"
  children="Link"
  disabled />
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <Link
  href="#"
  children="Link"
  size="sm" />
      <Link
  href="#"
  children="Link"
  size="md" />
      <Link
  href="#"
  children="Link"
  size="lg" />
    </div>
  )
}
