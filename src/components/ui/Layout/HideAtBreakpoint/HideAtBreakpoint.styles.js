import styled, { css } from 'styled-components'

const bp = {
  md: 672,
  lg: 1056,
  xlg: 1312,
  max: 1584,
}

const hideOnlyAt = breakpoint => {
  switch (breakpoint) {
    case 'sm':
      return css`
        @media (max-width: ${bp.md - 1}px) {
          display: none !important;
        }
      `
    case 'md':
      return css`
        @media (min-width: ${bp.md}px) and (max-width: ${bp.lg - 1}px) {
          display: none !important;
        }
      `
    case 'lg':
      return css`
        @media (min-width: ${bp.lg}px) and (max-width: ${bp.xlg - 1}px) {
          display: none !important;
        }
      `
    case 'xlg':
      return css`
        @media (min-width: ${bp.xlg}px) and (max-width: ${bp.max - 1}px) {
          display: none !important;
        }
      `
    case 'max':
      return css`
        @media (min-width: ${bp.max}px) {
          display: none !important;
        }
      `
    default:
      return null
  }
}

export const HideAtBreakpointRoot = styled.div`
  ${props => hideOnlyAt(props.$breakpoint)}
`
