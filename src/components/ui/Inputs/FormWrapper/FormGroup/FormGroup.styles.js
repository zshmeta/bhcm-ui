import styled, { css } from 'styled-components'

export const StyledFieldset = styled.fieldset`
  border: 0;
  padding: 0;
  margin: 0;
  min-width: 0;
  width: 100%;
  display: grid;
  gap: ${props => props.theme.spacing.sm};

  ${props =>
    props['data-invalid'] !== undefined &&
    css`
      & > legend {
        color: ${props.theme.colors.text.danger};
      }
    `}
`

export const StyledLegend = styled.legend`
  padding: 0;
  margin: 0;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 700;
  color: ${props => props.theme.colors.text.secondary};
`

export const StyledMessage = styled.div`
  font-size: 12px;
  line-height: 1.3;
  color: ${props => props.theme.colors.text.secondary};
`
