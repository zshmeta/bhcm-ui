
import Icon from './Icon'

function SquareGlyph({ size = 16 }) {
  const s = Number(size) || 16
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="10" height="10" rx="2" fill="currentColor" />
    </svg>
  )
}

export default {
  title: 'System/Icon',
  component: Icon,
}

export function WithRenderIcon() {
  return <Icon renderIcon={SquareGlyph} />
}

export function WithChildren() {
  return (
    <Icon>
      <SquareGlyph />
    </Icon>
  )
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Icon size={16} renderIcon={SquareGlyph} />
      <Icon size={20} renderIcon={SquareGlyph} />
      <Icon size={24} renderIcon={SquareGlyph} />
      <Icon size={32} renderIcon={SquareGlyph} />
    </div>
  )
}
import React from 'react'
