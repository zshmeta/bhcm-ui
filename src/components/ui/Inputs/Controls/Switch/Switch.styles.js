import styled from 'styled-components'

export const VisuallyHidden = styled.span`
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

export const StyledSwitchButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  padding: 0 ${props => props.theme.spacing.md};
  height: 40px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => (props.$selected ? props.theme.colors.action.primary : 'transparent')};
  color: ${props => (props.$selected ? props.theme.colors.text.inverse : props.theme.colors.text.primary)};
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

export const StyledSwitchText = styled.span`
  font-size: 14px;
  font-weight: 600;
`
