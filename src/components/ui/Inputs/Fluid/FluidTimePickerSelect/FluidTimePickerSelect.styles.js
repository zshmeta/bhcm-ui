import styled from 'styled-components'

export const StyledField = styled.div`
  display: grid;
  gap: 6px;
`

export const StyledLabel = styled.label`
  font-size: 11px;
  line-height: 1.2;
  color: ${props => props.theme.colors.text.secondary};
`

export const StyledSelect = styled.select`
  height: 34px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
  color: ${props => props.theme.colors.text.primary};
`
