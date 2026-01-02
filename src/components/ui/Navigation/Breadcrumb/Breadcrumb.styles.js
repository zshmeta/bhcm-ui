import styled, { css } from 'styled-components'

const sizeStyles = {
  sm: css`
    font-size: 12px;
  `,
  md: css`
    font-size: 13px;
  `,
}

export const StyledNav = styled.nav`
  display: block;
`

export const StyledList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;

  ${props => (props.$size ? sizeStyles[props.$size] : null)}

  & > li::after {
    content: '/';
    display: inline-block;
    margin: 0 ${props => props.theme.spacing.xs};
    color: ${props => props.theme.colors.text.muted};
  }

  ${props =>
    props.$noTrailingSlash &&
    css`
      & > li:last-child::after {
        content: '';
        margin: 0;
      }
    `}
`
