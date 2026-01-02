import styled, { css } from 'styled-components'

const sizeCss = size => {
  switch (size) {
    case 'sm':
      return css`
        font-size: 12px;
      `
    case 'lg':
      return css`
        font-size: 16px;
      `
    default:
      return css`
        font-size: 14px;
      `
  }
}

export const StyledText = styled.span`
  color: ${props => props.theme.colors.text.primary};
  ${props => sizeCss(props.$size)}
`
