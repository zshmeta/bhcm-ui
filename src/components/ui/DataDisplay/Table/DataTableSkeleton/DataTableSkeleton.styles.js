import styled, { css } from 'styled-components'

export const Container = styled.div`
  background: ${props => props.theme.colors.bg.surface};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 6px;
  overflow: hidden;
`

export const HeaderBlock = styled.div`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export const HeaderTitle = styled.div`
  height: 12px;
  width: 140px;
  border-radius: 6px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export const HeaderDesc = styled.div`
  margin-top: ${props => props.theme.spacing.xs};
  height: 10px;
  width: 220px;
  border-radius: 6px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export const Toolbar = styled.section`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surface};
`

export const ToolbarButton = styled.div`
  height: 24px;
  width: 88px;
  border-radius: 999px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

const compactCell = css`
  padding-top: ${props => props.theme.spacing.xs};
  padding-bottom: ${props => props.theme.spacing.xs};
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${props => props.theme.colors.text.primary};

  ${props =>
    props.$zebra &&
    css`
      tbody tr:nth-child(even) {
        background: ${props.theme.colors.bg.surfaceRaised};
      }
    `}
`

export const Th = styled.th`
  text-align: left;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};

  ${props => (props.$compact ? compactCell : null)}
`

export const Td = styled.td`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border.subtle};

  ${props => (props.$compact ? compactCell : null)}
`

export const Cell = styled.span`
  display: block;
  height: 10px;
  width: ${props => props.$w || '100%'};
  max-width: 200px;
  border-radius: 6px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`
