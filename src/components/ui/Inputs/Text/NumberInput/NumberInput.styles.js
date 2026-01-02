import styled, { css } from 'styled-components'

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
`

export const StyledButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: ${props => props.theme.spacing.xs};
  align-items: center;
`

export const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 6px;
  padding: 0 ${props => props.theme.spacing.md};

  border: 1px solid
    ${props =>
      props.$invalid || props.$warn
        ? props.theme.colors.border.strong
        : props.theme.colors.border.subtle};

  background: ${props =>
    props.$fluid ? props.theme.colors.bg.surfaceRaised : props.theme.colors.bg.surface};
  color: ${props => props.theme.colors.text.primary};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
  }
`

export const StyledStepButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surface};
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

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
