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

export const StyledToggleRoot = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  opacity: ${props => (props.$disabled ? 0.6 : 1)};
`

export const StyledLabel = styled.label`
  font-size: 12px;
  line-height: 1.2;
  font-weight: 700;
  color: ${props => props.theme.colors.text.secondary};
`

export const StyledToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surface};
  padding: 0 ${props => props.theme.spacing.sm};
  height: ${props => (props.$size === 'sm' ? '32px' : '40px')};
  border-radius: 999px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
  }
`

export const StyledToggleSwitch = styled.span`
  width: ${props => (props.$size === 'sm' ? '28px' : '34px')};
  height: ${props => (props.$size === 'sm' ? '16px' : '18px')};
  background: ${props => (props.$checked ? props.theme.colors.action.primary : props.theme.colors.border.subtle)};
  border-radius: 999px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => (props.$checked ? 'calc(100% - 14px)' : '2px')};
    width: 12px;
    height: 12px;
    border-radius: 999px;
    background: ${props => props.theme.colors.bg.canvas};
  }
`

export const StyledSideLabel = styled.span`
  font-size: 12px;
  color: ${props => props.theme.colors.text.secondary};
  ${props => (props.$hidden ? visuallyHidden : '')}
`
