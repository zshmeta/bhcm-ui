import styled, { css } from 'styled-components'

export const StyledBreadcrumbItem = styled.li`
  display: inline-flex;
  align-items: center;
  min-width: 0;

  ${props =>
    props.$isCurrent &&
    css`
      font-weight: 600;
      color: ${props.theme.colors.text.primary};
    `}
`

export const StyledBreadcrumbLink = styled.a`
  color: ${props => props.theme.colors.action.primary};
  text-decoration: none;
  min-width: 0;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
    border-radius: 3px;
  }
`

export const StyledBreadcrumbText = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  min-width: 0;
`
