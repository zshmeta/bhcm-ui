import React from 'react'
import {
  Cell,
  Container,
  HeaderBlock,
  HeaderDesc,
  HeaderTitle,
  Table,
  Td,
  Th,
  Toolbar,
  ToolbarButton,
} from './DataTableSkeleton.styles'

/**
 * DataTableSkeleton
 */
export default function DataTableSkeleton({
  headers,
  rowCount = 5,
  columnCount = 5,
  zebra = false,
  compact = false,
  className,
  showHeader = true,
  showToolbar = true,
  ...rest
}) {
  const cols = headers?.length ? headers.length : columnCount
  const rows = Array.from({ length: rowCount }, (_, i) => i)
  const columns = Array.from({ length: cols }, (_, i) => i)

  return (
    <Container className={className}>
      {showHeader ? (
        <HeaderBlock>
          <HeaderTitle />
          <HeaderDesc />
        </HeaderBlock>
      ) : null}

      {showToolbar ? (
        <Toolbar aria-label="data table toolbar">
          <ToolbarButton />
        </Toolbar>
      ) : null}

      <Table $compact={compact} $zebra={zebra} {...rest}>
        <thead>
          <tr>
            {columns.map(i => (
              <Th key={i} $compact={compact}>
                {headers ? <div>{headers[i]?.header}</div> : <Cell $w="64px" />}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(i => (
            <tr key={i}>
              {columns.map(j => (
                <Td key={j} $compact={compact}>
                  <Cell />
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

DataTableSkeleton.displayName = 'DataTableSkeleton'
