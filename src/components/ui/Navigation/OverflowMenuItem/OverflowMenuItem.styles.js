import styled, { css } from 'styled-components'

export const StyledItem = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
  ${props =>
    props.$hasDivider &&
    css`
      border-top: 1px solid ${props.theme.colors.border.subtle};
      margin-top: 6px;
      padding-top: 6px;
    `}
`

export const StyledAction = styled.button`
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
  color: ${props => (props.$danger ? props.theme.colors.status.error : props.theme.colors.text.primary)};
  text-align: left;
  cursor: pointer;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`

export const StyledLink = styled.a`
  display: block;
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
  color: ${props => (props.$danger ? props.theme.colors.status.error : props.theme.colors.text.primary)};
  text-decoration: none;

  &[aria-disabled='true'] {
    pointer-events: none;
    opacity: 0.55;
  }
`
