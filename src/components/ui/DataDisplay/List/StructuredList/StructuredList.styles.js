import styled from 'styled-components'

export const StyledStructuredList = styled.div`
  width: 100%;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 8px;
  overflow: hidden;
`

export const StyledStructuredListHead = styled.div`
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export const StyledStructuredListBody = styled.div``

export const StyledStructuredListRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  border-top: 1px solid ${props => props.theme.colors.border.subtle};
`

export const StyledStructuredListCell = styled.div`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.primary};
`
