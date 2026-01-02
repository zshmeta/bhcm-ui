import styled from 'styled-components'

export const OverflowMenuWrapper = styled.span`
  display: inline-flex;
  position: relative;
`

export const OverflowMenuOptions = styled.ul`
  margin: 0;
  padding: 6px;
  list-style: none;
  min-width: 180px;

  background: ${props => props.theme.colors.bg.surfaceRaised};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 10px;
  box-shadow: ${props => props.theme.shadows.popover};

  &:focus {
    outline: none;
  }
`
