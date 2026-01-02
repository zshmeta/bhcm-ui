import styled, { css } from 'styled-components'

const kindStyles = (kind, theme) => {
  switch (kind) {
    case 'success':
      return css`
        border-color: ${theme.colors.status.success || theme.colors.border.strong};
        color: ${theme.colors.text.primary};
      `
    case 'warning':
      return css`
        border-color: ${theme.colors.status.warning || theme.colors.border.strong};
        color: ${theme.colors.text.primary};
      `
    case 'error':
      return css`
        border-color: ${theme.colors.status.error || theme.colors.border.strong};
        color: ${theme.colors.text.primary};
      `
    case 'info':
      return css`
        border-color: ${theme.colors.action.primary || theme.colors.border.strong};
        color: ${theme.colors.text.primary};
      `
    default:
      return css`
        border-color: ${theme.colors.border.subtle};
        color: ${theme.colors.text.primary};
      `
  }
}

export const StyledTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px ${props => props.theme.spacing.sm};
  border-radius: 999px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
  font-size: 12px;
  line-height: 1.4;
  ${props => kindStyles(props.$kind, props.theme)}
`
