import styled from 'styled-components'

export const StyledFieldset = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`

export const StyledLegend = styled.legend`
  font-size: 12px;
  line-height: 1.2;
  font-weight: 700;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.xs};
`

export const StyledHelp = styled.div`
  font-size: 12px;
  line-height: 1.3;
  color: ${props => {
    if (props.$variant === 'invalid') return props.theme.colors.text.danger
    if (props.$variant === 'warn') return props.theme.colors.text.warning
    return props.theme.colors.text.secondary
  }};
`
