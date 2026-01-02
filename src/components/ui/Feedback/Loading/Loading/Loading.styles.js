import styled, { keyframes, css } from 'styled-components'

const rotate = keyframes`
  100% { transform: rotate(360deg); }
`

const dash = keyframes`
  0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 89, 200; stroke-dashoffset: -35; }
  100% { stroke-dasharray: 89, 200; stroke-dashoffset: -124; }
`

export const LoadingOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bhcm-loading-overlay-bg, transparent);

  ${props =>
    !props.$active &&
    css`
      pointer-events: none;
    `}
`

export const LoadingRoot = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &.bhcm-loading--stop svg {
    animation: none;
  }
`

export const LoadingSvg = styled.svg`
  width: ${props => (props.$small ? '1.5rem' : '2rem')};
  height: ${props => (props.$small ? '1.5rem' : '2rem')};
  animation: ${rotate} 1.4s linear infinite;
`

export const LoadingCircle = styled.circle`
  stroke: ${props => props.theme.colors.action.primary};
  stroke-linecap: round;
  animation: ${dash} 1.4s ease-in-out infinite;
  fill: none;
  stroke-width: 8;
`

export const LoadingCircleBg = styled.circle`
  stroke: ${props => props.theme.colors.bg.surfaceRaised};
  fill: none;
  stroke-width: 8;
`
