import styled, { css } from 'styled-components'

export const StyledListItem = styled.li`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px ${props => props.theme.colors.action.focus};
  }

  ${props =>
    props.$selected &&
    css`
      background: ${props.theme.colors.bg.surfaceRaised};
    `}

  ${props =>
    props.$disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
    `}
`
