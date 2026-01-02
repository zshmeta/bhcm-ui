import styled from 'styled-components'

export const StyledIconRoot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;

  & > svg {
    width: ${props => (typeof props.$size === 'number' ? `${props.$size}px` : props.$size)};
    height: ${props => (typeof props.$size === 'number' ? `${props.$size}px` : props.$size)};
    min-width: ${props => (typeof props.$size === 'number' ? `${props.$size}px` : props.$size)};
    min-height: ${props => (typeof props.$size === 'number' ? `${props.$size}px` : props.$size)};
  }
`
