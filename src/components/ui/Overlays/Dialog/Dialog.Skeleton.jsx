import React from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, ${props => props.theme.colors.text.primary} 32%, transparent);
`

const DialogShell = styled.div`
  width: 680px;
  max-width: calc(100vw - 2 * ${props => props.theme.spacing.md});
  background: ${props => props.theme.colors.bg.surface};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 6px;
  overflow: hidden;
`

const Bar = styled.div`
  height: 44px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

const Body = styled.div`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
`

const Line = styled.div`
  height: 10px;
  border-radius: 6px;
  background: ${props => props.theme.colors.bg.surfaceRaised};

  & + & {
    margin-top: ${props => props.theme.spacing.sm};
  }
`

const Footer = styled.div`
  height: 52px;
  background: ${props => props.theme.colors.bg.surface};
  border-top: 1px solid ${props => props.theme.colors.border.subtle};
`

export default function DialogSkeleton({ lines = 4, ...rest }) {
  return (
    <Overlay {...rest}>
      <DialogShell>
        <Bar />
        <Body>
          {Array.from({ length: lines }, (_, i) => (
            <Line key={i} style={{ width: i === 0 ? '70%' : '100%' }} />
          ))}
        </Body>
        <Footer />
      </DialogShell>
    </Overlay>
  )
}

DialogSkeleton.displayName = 'DialogSkeleton'
