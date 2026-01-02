import styled, { css } from 'styled-components'

export const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

  ${props =>
    props.$isStacked &&
    css`
      flex-direction: column;
      align-items: stretch;
    `}
`

export const FluidInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;

  flex-wrap: wrap;

  ${props =>
    !props.$isStacked &&
    css`
      & > * {
        flex: 1 1 0;
        min-width: 0;
      }
    `}

  ${props =>
    props.$isStacked &&
    css`
      flex-direction: column;
      align-items: stretch;
      flex-wrap: nowrap;

      & > * {
        width: 100%;
      }
    `}
`
