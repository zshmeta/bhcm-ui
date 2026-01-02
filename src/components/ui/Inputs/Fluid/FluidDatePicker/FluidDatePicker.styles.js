import styled from 'styled-components'

export const StyledWrap = styled.div`
  display: grid;
  gap: 6px;
  width: 100%;
`

export const StyledHelp = styled.div`
  font-size: 11px;
  line-height: 1.2;
  color: ${props => (props.$variant === 'invalid' ? props.theme.colors.status.error : props.theme.colors.text.secondary)};
`
