import styled from 'styled-components'

export const StyledWrap = styled.div`
  display: inline-flex;
`

export const StyledSelect = styled.select`
  height: 40px;
  border-radius: 6px;
  padding: 0 ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surface};
  color: ${props => props.theme.colors.text.primary};

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
  }
`
