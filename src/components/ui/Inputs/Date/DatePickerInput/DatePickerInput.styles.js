import styled, { css } from 'styled-components'

const sizeStyles = {
  sm: css`
    height: 32px;
    border-radius: 6px;
    padding: 0 10px;
    font-size: 13px;
  `,
  md: css`
    height: 40px;
    border-radius: 8px;
    padding: 0 12px;
    font-size: 14px;
  `,
  lg: css`
    height: 48px;
    border-radius: 10px;
    padding: 0 14px;
    font-size: 15px;
  `,
}

export const StyledField = styled.div`
  display: grid;
  gap: 6px;
  width: 100%;
  min-width: 0;
`

export const StyledLabel = styled.label`
  font-size: 11px;
  line-height: 1.2;
  font-weight: 600;
  color: ${props => props.theme.colors.text.secondary};

  ${props =>
    props.$hidden &&
    css`
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `}

  ${props =>
    props.$disabled &&
    css`
      opacity: 0.65;
    `}
`

export const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 8px;

  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surface};

  ${props => (props.$size ? sizeStyles[props.$size] : sizeStyles.md)}

  ${props =>
    props.$invalid &&
    css`
      border-color: ${props.theme.colors.status.error};
    `}

  ${props =>
    props.$warn &&
    !props.$invalid &&
    css`
      border-color: ${props.theme.colors.border.strong};
    `}

  ${props =>
    props.$disabled &&
    css`
      opacity: 0.65;
      background: ${props.theme.colors.bg.surfaceRaised};
    `}

  &:focus-within {
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
  }
`

export const StyledInput = styled.input`
  width: 100%;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: ${props => props.theme.colors.text.primary};

  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
  }

  &[disabled] {
    cursor: not-allowed;
  }
`

export const StyledHelp = styled.div`
  font-size: 11px;
  line-height: 1.2;
  color: ${props => props.theme.colors.text.secondary};

  ${props =>
    props.$disabled &&
    css`
      opacity: 0.65;
    `}
`

export const StyledMessage = styled.div`
  font-size: 11px;
  line-height: 1.2;
  color: ${props =>
    props.$variant === 'invalid' ? props.theme.colors.status.error : props.theme.colors.text.secondary};
`
