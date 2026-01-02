import styled, { css } from 'styled-components'

export const StyledWrapper = styled.div`
  display: grid;
  gap: 6px;

  ${props =>
    props.$readOnly &&
    css`
      opacity: 0.85;
    `}
`

export const StyledRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
`

export const StyledInput = styled.input`
  width: 14px;
  height: 14px;
  margin: 3px 0 0;
  flex: 0 0 auto;

  accent-color: ${props => props.theme.colors.action.primary};

  &[disabled] {
    opacity: 0.6;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
    border-radius: 3px;
  }
`

export const StyledLabel = styled.label`
  min-width: 0;
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
`

export const StyledLabelText = styled.span`
  display: inline;
  font-size: 12px;
  line-height: 1.25;
  color: ${props => props.theme.colors.text.primary};
  font-weight: 600;

  ${props =>
    props.$hide &&
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
`

export const StyledDecoratorSlot = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
`

export const StyledDecoratorWrap = styled.span`
  display: inline-flex;
  align-items: center;
`

export const StyledValidation = styled.div`
  display: grid;
  gap: 6px;
`

export const StyledValidationRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  min-width: 0;

  color: ${props => (props.$variant === 'invalid' ? props.theme.colors.status.error : props.theme.colors.text.secondary)};
`

export const StyledIcon = styled.span`
  width: 14px;
  height: 14px;
  margin-top: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`

export const StyledMessage = styled.div`
  font-size: 11px;
  line-height: 1.25;
  color: inherit;
`

export const StyledHelper = styled.div`
  font-size: 11px;
  line-height: 1.25;
  color: ${props => props.theme.colors.text.secondary};
`
