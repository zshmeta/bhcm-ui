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

export const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  width: 100%;
`

export const StyledLabel = styled.label`
  font-size: 12px;
  line-height: 1.2;
  font-weight: 700;
  color: ${props => props.theme.colors.text.secondary};
  ${props => (props.$hidden ? visuallyHidden : '')}
`

export const StyledSelect = styled.select`
  width: 100%;
  min-height: 120px;
  border-radius: 6px;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid
    ${props =>
      props.$invalid || props.$warn
        ? props.theme.colors.border.strong
        : props.theme.colors.border.subtle};
  background: ${props =>
    props.$fluid ? props.theme.colors.bg.surfaceRaised : props.theme.colors.bg.surface};
  color: ${props => props.theme.colors.text.primary};

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
  }
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
