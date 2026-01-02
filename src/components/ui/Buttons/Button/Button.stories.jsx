import Button, { BUTTON_KINDS, BUTTON_SIZES } from './Button'

function PlusGlyph() {
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
        d="M8 3.5V12.5M3.5 8H12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default {
  title: 'Buttons/Button',
  component: Button,
}

export function Kinds() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {BUTTON_KINDS.map(kind => (
        <Button key={kind} kind={kind} onClick={() => {}}>
          {kind}
        </Button>
      ))}
    </div>
  )
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      {BUTTON_SIZES.map(size => (
        <Button key={size} size={size} onClick={() => {}}>
          {size}
        </Button>
      ))}
    </div>
  )
}

export function Disabled() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button disabled onClick={() => {}}>
        Disabled
      </Button>
      <Button kind="secondary" disabled onClick={() => {}}>
        Disabled
      </Button>
      <Button kind="danger" disabled onClick={() => {}}>
        Disabled
      </Button>
    </div>
  )
}

export function WithIcon() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button renderIcon={PlusGlyph} onClick={() => {}}>
        Add item
      </Button>
      <Button kind="secondary" renderIcon={PlusGlyph} onClick={() => {}}>
        Add item
      </Button>
    </div>
  )
}

export function IconOnly() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Button
        hasIconOnly
        iconDescription="Add"
        renderIcon={PlusGlyph}
        onClick={() => {}}
      />
      <Button
        kind="secondary"
        hasIconOnly
        iconDescription="Add"
        renderIcon={PlusGlyph}
        onClick={() => {}}
      />
      <Button
        kind="danger"
        hasIconOnly
        iconDescription="Add"
        renderIcon={PlusGlyph}
        onClick={() => {}}
      />
    </div>
  )
}
