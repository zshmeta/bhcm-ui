import React from 'react'

import IconButton from './IconButton'

function GearGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 10.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M13 8a5 5 0 0 0-.06-.78l1.24-.97-1.5-2.6-1.5.6a5.2 5.2 0 0 0-1.35-.78L9.5 1h-3L6.17 3.47c-.48.2-.93.46-1.35.78l-1.5-.6-1.5 2.6 1.24.97A5 5 0 0 0 3 8c0 .27.02.53.06.78l-1.24.97 1.5 2.6 1.5-.6c.42.32.87.58 1.35.78L6.5 15h3l.33-2.47c.48-.2.93-.46 1.35-.78l1.5.6 1.5-2.6-1.24-.97c.04-.25.06-.51.06-.78Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default {
  title: 'Buttons/IconButton',
  component: IconButton,
}

export function Kinds() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <IconButton label="Settings" kind="primary">
        <GearGlyph />
      </IconButton>
      <IconButton label="Settings" kind="secondary">
        <GearGlyph />
      </IconButton>
      <IconButton label="Settings" kind="danger">
        <GearGlyph />
      </IconButton>
    </div>
  )
}

export function Disabled() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <IconButton label="Settings" disabled>
        <GearGlyph />
      </IconButton>
      <IconButton label="Settings" kind="secondary" disabled>
        <GearGlyph />
      </IconButton>
    </div>
  )
}
