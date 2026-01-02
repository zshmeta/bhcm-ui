import styled from 'styled-components'

export const StyledListBox = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 8px;
  background: ${props => props.theme.colors.bg.surface};
`
