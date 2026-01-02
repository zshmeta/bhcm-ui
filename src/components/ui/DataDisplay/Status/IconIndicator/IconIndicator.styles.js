import styled from 'styled-components'

export const StyledIconIndicatorRoot = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text.primary};
`

const statusColor = (status, theme) => {
  switch (status) {
    case 'success':
      return theme.colors.status.success || theme.colors.text.primary
    case 'warning':
      return theme.colors.status.warning || theme.colors.text.primary
    case 'error':
      return theme.colors.status.error || theme.colors.text.primary
    case 'info':
      return theme.colors.action.primary || theme.colors.text.primary
    default:
      return theme.colors.border.strong || theme.colors.text.primary
  }
}

export const StyledIconIndicatorDot = styled.span`
  width: ${props => `${props.$size}px`};
  height: ${props => `${props.$size}px`};
  border-radius: 999px;
  background: ${props => statusColor(props.$status, props.theme)};
`
