import React from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(
    in srgb,
    ${props => props.theme.colors.text.primary} 32%,
    transparent
  );
`

const Dialog = styled.div`
  width: 680px;
  max-width: calc(100vw - 2 * ${props => props.theme.spacing.md});
  background: ${props => props.theme.colors.bg.surface};
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
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
  width: ${props => props.$width || '100%'};
`

const Footer = styled.div`
  height: 52px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

/**
 * ComposedModalSkeleton
 */
export default function ComposedModalSkeleton({ ...rest }) {
  if (typeof document === 'undefined') {
    return (
      <Overlay {...rest}>
        <Dialog>
          <Bar />
          <Body>
            <Line $width="90%" />
            <div style={{ height: 8 }} />
            <Line $width="78%" />
            <div style={{ height: 8 }} />
            <Line $width="95%" />
          </Body>
          <Footer />
        </Dialog>
      </Overlay>
    )
  }

  return (
    <Overlay {...rest}>
      <Dialog>
        <Bar />
        <Body>
          <Line $width="90%" />
          <div style={{ height: 8 }} />
          <Line $width="78%" />
          <div style={{ height: 8 }} />
          <Line $width="95%" />
        </Body>
        <Footer />
      </Dialog>
    </Overlay>
  )
}

ComposedModalSkeleton.displayName = 'ComposedModalSkeleton'
