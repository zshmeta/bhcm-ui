import styled, { css } from 'styled-components'

export const StyledTile = styled.div`
  width: 100%;
  text-align: left;
  padding: ${props => props.theme.spacing.md};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surface};
  color: ${props => props.theme.colors.text.primary};

  ${props =>
    props.$clickable &&
    css`
      cursor: pointer;

      &:hover {
        background: ${props.theme.colors.bg.surfaceRaised};
      }

      &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px ${props.theme.colors.bg.canvas}, 0 0 0 4px ${props.theme.colors.action.focus};
      }
    `}
`
