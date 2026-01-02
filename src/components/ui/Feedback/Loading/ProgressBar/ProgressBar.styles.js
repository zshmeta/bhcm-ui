import styled, { css, keyframes } from 'styled-components'

const indeterminate = keyframes`
  0% { transform: translateX(-100%); }
  50% { transform: translateX(-10%); }
  100% { transform: translateX(100%); }
`

export const ProgressBarRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};

  &[data-type='inline'] {
    flex-direction: row;
    align-items: center;
  }

  &[data-type='inline'] > [data-part='label'] {
    margin-right: ${props => props.theme.spacing.sm};
  }

  &[data-type='indented'] {
    padding-left: ${props => props.theme.spacing.md};
  }

  &[data-size='small'] [data-part='track'] {
    height: 4px;
  }

  &[data-size='big'] [data-part='track'] {
    height: 8px;
  }
`

export const LabelRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`

export const LabelText = styled.span``

export const Track = styled.div`
  position: relative;
  width: 100%;
  border-radius: 999px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
  overflow: hidden;
`

export const Bar = styled.div`
  position: absolute;
  inset: 0;
  transform-origin: left center;
  background: ${props => props.theme.colors.action.primary};

  ${props =>
    props.$indeterminate &&
    css`
      width: 40%;
      transform: translateX(-100%);
      animation: ${indeterminate} 1.3s ease-in-out infinite;
    `}
`

export const HelperText = styled.div`
  color: ${props => props.theme.colors.text.secondary};
`

export const VisuallyHidden = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`

export const StatusIcon = styled.svg`
  width: 16px;
  height: 16px;
  flex: 0 0 auto;

  ${props =>
    props.$kind === 'error' &&
    css`
      color: ${props => props.theme.colors.status.error};
    `}
`
