import React from 'react'
import { Theme } from '../System'

import Button, { BUTTON_KINDS, BUTTON_SIZES } from './Button/Button'
import ButtonSet from './ButtonSet'
import ChatButton from './ChatButton'
import ComboButton from './ComboButton'
import CopyButton from './CopyButton'
import DangerButton from './DangerButton'
import IconButton from './IconButton'
import MenuButton from './MenuButton'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

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

function DotsGlyph() {
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
      <circle cx="3.2" cy="8" r="1.2" fill="currentColor" />
      <circle cx="8" cy="8" r="1.2" fill="currentColor" />
      <circle cx="12.8" cy="8" r="1.2" fill="currentColor" />
    </svg>
  )
}

function Section({ title, children }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      {children}
    </section>
  )
}

function Row({ children }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      {children}
    </div>
  )
}

// Helper component used ONLY as configuration for ComboButton menu items.
// ComboButton reads the props and builds its own menu UI.
function ComboItem() {
  return null
}

const ButtonsPreview = () => {
  return (
    <Theme>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <h2 style={{ margin: 0 }}>Buttons preview</h2>

        <Section title="Base Button (kinds)">
          <Row>
            {BUTTON_KINDS.map(kind => (
              <Button key={kind} kind={kind} onClick={() => {}}>
                {kind}
              </Button>
            ))}
          </Row>
        </Section>

        <Section title="Base Button (sizes)">
          <Row>
            {BUTTON_SIZES.map(size => (
              <Button key={size} size={size} onClick={() => {}}>
                {size}
              </Button>
            ))}
          </Row>
        </Section>

        <Section title="Wrappers">
          <Row>
            <PrimaryButton onClick={() => {}}>PrimaryButton</PrimaryButton>
            <SecondaryButton onClick={() => {}}>SecondaryButton</SecondaryButton>
            <DangerButton onClick={() => {}}>DangerButton</DangerButton>
          </Row>
        </Section>

        <Section title="Icon-only">
          <Row>
            <IconButton label="Add" renderIcon={PlusGlyph} onClick={() => {}} />
            <MenuButton label="Menu" renderIcon={DotsGlyph} onClick={() => {}} />
            <Button hasIconOnly iconDescription="Add" renderIcon={PlusGlyph} onClick={() => {}} />
          </Row>
        </Section>

        <Section title="ButtonSet">
          <ButtonSet>
            <Button kind="ghost" onClick={() => {}}>
              Ghost
            </Button>
            <Button kind="secondary" onClick={() => {}}>
              Secondary
            </Button>
            <Button kind="primary" onClick={() => {}}>
              Primary
            </Button>
          </ButtonSet>
        </Section>

        <Section title="CopyButton">
          <Row>
            <CopyButton onClick={() => {}} />
          </Row>
        </Section>

        <Section title="ChatButton">
          <Row>
            <ChatButton onClick={() => {}}>Chat</ChatButton>
            <ChatButton isQuickAction onClick={() => {}}>
              Quick
            </ChatButton>
            <ChatButton isSelected onClick={() => {}}>
              Selected
            </ChatButton>
          </Row>
        </Section>

        <Section title="ComboButton">
          <Row>
            <ComboButton label="Run" onClick={() => {}}>
              <ComboItem label="Action 1" onClick={() => {}} />
              <ComboItem label="Action 2" onClick={() => {}} />
              <ComboItem label="Divider" kind="divider" />
              <ComboItem label="Disabled" disabled onClick={() => {}} />
            </ComboButton>
          </Row>
        </Section>
      </div>
    </Theme>
  )
}

export default { ButtonsPreview }