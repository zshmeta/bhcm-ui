import styled, { css } from 'styled-components'

export const StyledRoot = styled.div`
  width: 100%;
  color: ${props => props.theme.colors.text.primary};
`

export const StyledInputsRow = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;

  ${props =>
    props.$isRange &&
    css`
      grid-template-columns: 1fr 1fr;

      @media (max-width: 560px) {
        grid-template-columns: 1fr;
      }
    `}
`
