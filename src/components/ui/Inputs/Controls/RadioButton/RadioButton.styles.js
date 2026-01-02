import styled, { css } from 'styled-components'

const visuallyHidden = css`
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`

export const StyledRadio = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  flex-direction: ${props => (props.$labelPosition === 'left' ? 'row-reverse' : 'row')};
`

export const StyledInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${props => props.theme.colors.action.primary};

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
    border-radius: 999px;
  }
`

export const StyledLabelText = styled.span`
  font-size: 14px;
  color: ${props => props.theme.colors.text.primary};
  ${props => (props.$hidden ? visuallyHidden : '')}
`

export const StyledHelp = styled.div`
  font-size: 12px;
  line-height: 1.3;
  color: ${props => {
    if (props.$variant === 'invalid') return props.theme.colors.text.danger
    if (props.$variant === 'warn') return props.theme.colors.text.warning
    return props.theme.colors.text.secondary
  }};
`
