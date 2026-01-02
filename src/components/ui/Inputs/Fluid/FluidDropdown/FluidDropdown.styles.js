import styled from 'styled-components'

export const StyledWrap = styled.div`
  display: grid;
  gap: 6px;
  width: 100%;
`

export const StyledLabel = styled.label`
  font-size: 11px;
  line-height: 1.2;
  color: ${props => props.theme.colors.text.secondary};
`

export const StyledSelect = styled.select`
  width: 100%;
  height: 34px;
  padding: 0 10px;
  border-radius: 8px;

  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
  color: ${props => props.theme.colors.text.primary};
`

export const StyledHelp = styled.div`
  font-size: 11px;
  line-height: 1.2;
  color: ${props => (props.$variant === 'invalid' ? props.theme.colors.status.error : props.theme.colors.text.secondary)};
`
