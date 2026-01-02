import styled, { css } from 'styled-components'

export const StyledFieldset = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;

  display: grid;
  gap: 8px;

  ${props =>
    props.$readOnly &&
    css`
      opacity: 0.9;
    `}
`

export const StyledLegend = styled.legend`
  padding: 0;
  margin: 0;

  font-size: 12px;
  line-height: 1.2;
  font-weight: 700;
  color: ${props => props.theme.colors.text.secondary};

  display: inline-flex;
  align-items: center;
  gap: 8px;
`

export const StyledLegendDecorator = styled.span`
  display: inline-flex;
  align-items: center;
`

export const StyledChildren = styled.div`
  display: grid;
  gap: 8px;

  ${props =>
    props.$orientation === 'horizontal' &&
    css`
      grid-auto-flow: column;
      grid-auto-columns: max-content;
      justify-content: start;
      align-items: start;
      overflow-x: auto;
      padding-bottom: 2px;

      /* fallback for large sets: allow wrapping when there is space */
      @supports (flex-wrap: wrap) {
        display: flex;
        flex-wrap: wrap;
        gap: 12px 16px;
      }
    `}
`

export const StyledValidation = styled.div`
  display: grid;
  gap: 6px;
`

export const StyledValidationRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;

  color: ${props => (props.$variant === 'invalid' ? props.theme.colors.status.error : props.theme.colors.text.secondary)};
`

export const StyledIcon = styled.span`
  width: 14px;
  height: 14px;
  margin-top: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`

export const StyledMessage = styled.div`
  font-size: 11px;
  line-height: 1.25;
  color: inherit;
`

export const StyledHelper = styled.div`
  font-size: 11px;
  line-height: 1.25;
  color: ${props => props.theme.colors.text.secondary};
`
