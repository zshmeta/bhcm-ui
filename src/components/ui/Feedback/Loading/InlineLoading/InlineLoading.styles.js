import styled, { css } from 'styled-components'

export const InlineLoadingRoot = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text.primary};
`

export const InlineLoadingAnimation = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const InlineLoadingText = styled.div`
  display: inline-flex;
  align-items: center;
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

export const InactiveStatus = styled.span`
  display: inline-flex;
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
