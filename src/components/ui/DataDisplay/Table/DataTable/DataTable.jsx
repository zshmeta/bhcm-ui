import React, { useEffect, useMemo, useState } from 'react'

const sortStates = {
  NONE: 'NONE',
  ASC: 'ASC',
  DESC: 'DESC',
}

const defaultTranslations = {
  'carbon.table.all.expand': 'Expand all rows',
  'carbon.table.all.collapse': 'Collapse all rows',
  'carbon.table.row.expand': 'Expand current row',
  'carbon.table.row.collapse': 'Collapse current row',
  'carbon.table.all.select': 'Select all rows',
  'carbon.table.all.unselect': 'Unselect all rows',
  'carbon.table.row.select': 'Select row',
  'carbon.table.row.unselect': 'Unselect row',
}

const defaultTranslateWithId = messageId => defaultTranslations[messageId] || messageId

let instanceCounter = 0
const getInstanceId = () => {
  instanceCounter += 1
  return instanceCounter
}

const getCellId = (rowId, headerKey) => `${rowId}:${headerKey}`

const defaultFilterRows = ({ cellsById, headers, inputValue, rowIds }) => {
  const query = String(inputValue || '').trim().toLowerCase()
  if (!query) return rowIds

  return rowIds.filter(rowId => {
    return headers.some(header => {
      const cell = cellsById[getCellId(rowId, header.key)]
      const value = cell?.value
      if (value === null || value === undefined) return false
      return String(value).toLowerCase().includes(query)
    })
  })
}

const defaultSortRow = (cellA, cellB, { sortDirection, locale }) => {
  const direction = sortDirection === sortStates.DESC ? -1 : 1

  // Normalize values
  const a = cellA ?? ''
  const b = cellB ?? ''

  // Numeric sort if both look like numbers
  const aNum = typeof a === 'number' ? a : Number(a)
  const bNum = typeof b === 'number' ? b : Number(b)
  const aIsNum = Number.isFinite(aNum)
  const bIsNum = Number.isFinite(bNum)

  if (aIsNum && bIsNum) {
    if (aNum === bNum) return 0
    return aNum > bNum ? direction : -direction
  }

  const aStr = String(a)
  const bStr = String(b)
  return aStr.localeCompare(bStr, locale || undefined, { numeric: true, sensitivity: 'base' }) * direction
}

const denormalize = (rowIds, rowsById, cellsById, headers) => {
  return rowIds.map(id => {
    const row = rowsById[id]
    const cells = headers.map(header => {
      const cellId = getCellId(id, header.key)
      return cellsById[cellId]
    })

    return {
      ...row,
      cells,
    }
  })
}

const getNextSortState = (prev, headerKey) => {
  if (prev.sortHeaderKey !== headerKey) {
    return { sortHeaderKey: headerKey, sortDirection: sortStates.ASC }
  }

  const current = prev.sortDirection || sortStates.NONE
  const next =
    current === sortStates.NONE
      ? sortStates.ASC
      : current === sortStates.ASC
        ? sortStates.DESC
        : sortStates.NONE

  return {
    sortHeaderKey: next === sortStates.NONE ? null : headerKey,
    sortDirection: next,
  }
}

const buildStateFromProps = (props, prevState = {}) => {
  const { headers = [], rows = [] } = props
  const prevRowsById = prevState.rowsById || {}

  const rowIds = rows.map(r => r.id)
  const initialRowOrder = Array.isArray(prevState.initialRowOrder) && prevState.initialRowOrder.length ? prevState.initialRowOrder : rowIds

  const rowsById = rows.reduce((acc, row) => {
    const prevRow = prevRowsById[row.id]
    const isSelected =
      typeof row.isSelected === 'boolean' ? row.isSelected : typeof prevRow?.isSelected === 'boolean' ? prevRow.isSelected : false
    const isExpanded =
      typeof row.isExpanded === 'boolean' ? row.isExpanded : typeof prevRow?.isExpanded === 'boolean' ? prevRow.isExpanded : false

    acc[row.id] = {
      ...row,
      isSelected,
      isExpanded,
    }
    return acc
  }, {})

  const cellsById = rows.reduce((acc, row) => {
    headers.forEach(header => {
      const id = getCellId(row.id, header.key)

      // Allow callers to pass a prebuilt `cells` array/object (best-effort)
      let prebuilt
      if (row && row.cells) {
        if (Array.isArray(row.cells)) {
          prebuilt = row.cells.find(c => c?.info?.header === header.key)
        } else {
          prebuilt = Object.values(row.cells).find(c => c?.info?.header === header.key)
        }
      }

      const value = prebuilt?.value !== undefined ? prebuilt.value : row?.[header.key]

      acc[id] = {
        id,
        value,
        isEditable: false,
        isEditing: false,
        isValid: true,
        errors: null,
        info: { header: header.key },
        hasAILabelHeader: prebuilt?.hasAILabelHeader,
      }
    })

    return acc
  }, {})

  const selectedRowIds = rowIds.filter(id => rowsById[id]?.isSelected && !rowsById[id]?.disabled)
  const shouldShowBatchActions = Boolean(prevState.shouldShowBatchActions) && selectedRowIds.length > 0

  return {
    cellsById,
    filterInputValue: prevState.filterInputValue ?? null,
    initialRowOrder,
    isExpandedAll: Boolean(prevState.isExpandedAll),
    rowIds,
    rowsById,
    shouldShowBatchActions,
    sortDirection: prevState.sortDirection ?? sortStates.NONE,
    sortHeaderKey: prevState.sortHeaderKey ?? null,
  }
}

/**
 * DataTable
 *
 * Render-props data normalization layer (Carbon-compatible shape).
 */
export default function DataTable(props) {
  const {
    children,
    filterRows = defaultFilterRows,
    headers = [],
    render,
    translateWithId: t = defaultTranslateWithId,
    size,
    isSortable: isSortableProp,
    useZebraStyles,
    useStaticWidth,
    stickyHeader,
    overflowMenuOnHover,
    experimentalAutoAlign,
    radio,
    rows = [],
    sortRow,
    locale,
  } = props

  const instanceId = useMemo(() => getInstanceId(), [])
  const tablePrefix = useMemo(() => `data-table-${instanceId}`, [instanceId])

  const [state, setState] = useState(() => ({
    ...buildStateFromProps({ headers, rows }, {}),
    isExpandedAll: false,
  }))

  useEffect(() => {
    setState(prev => buildStateFromProps({ headers, rows }, prev))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headers, rows])

  const selectedRowIds = state.rowIds.filter(id => {
    const row = state.rowsById[id]
    return row?.isSelected && !row?.disabled
  })

  const filteredRowIds =
    typeof state.filterInputValue === 'string'
      ? filterRows({
          cellsById: state.cellsById,
          getCellId,
          headers,
          inputValue: state.filterInputValue,
          rowIds: state.rowIds,
        })
      : state.rowIds

  const getHeaderProps = ({ header, onClick, isSortable = isSortableProp, ...rest }) => {
    const { sortDirection, sortHeaderKey } = state
    const { key, slug, decorator } = header
    const isSortHeader = sortHeaderKey === key

    return {
      ...rest,
      key,
      slug,
      decorator,
      isSortable,
      isSortHeader,
      sortDirection: isSortHeader ? sortDirection : sortStates.NONE,
      onClick: event => {
        const nextSortState = getNextSortState(state, key)
        setState(prev => {
          const next = { ...prev, ...nextSortState }

          if (nextSortState.sortDirection === sortStates.NONE || !nextSortState.sortHeaderKey) {
            return {
              ...next,
              rowIds: prev.initialRowOrder || prev.rowIds,
            }
          }

          const headerKey = nextSortState.sortHeaderKey
          const direction = nextSortState.sortDirection
          const sortFn = sortRow || ((a, b, params) => defaultSortRow(a, b, params))
          const resolvedLocale = locale || (typeof navigator !== 'undefined' ? navigator.language : undefined)

          const sorted = [...prev.rowIds].sort((rowA, rowB) => {
            const cellA = prev.cellsById[getCellId(rowA, headerKey)]
            const cellB = prev.cellsById[getCellId(rowB, headerKey)]
            return sortFn(cellA?.value, cellB?.value, {
              sortDirection: direction,
              sortStates,
              locale: resolvedLocale,
            })
          })

          return {
            ...next,
            rowIds: sorted,
          }
        })

        if (onClick) {
          const nextSort = getNextSortState(state, key)
          onClick(event, { sortHeaderKey: key, sortDirection: nextSort.sortDirection })
        }
      },
    }
  }

  const getExpandHeaderProps = ({ onClick, onExpand, ...rest } = {}) => {
    const isExpanded =
      Boolean(state.isExpandedAll) || state.rowIds.every(id => Boolean(state.rowsById[id]?.isExpanded))

    const translationKey = isExpanded ? 'carbon.table.all.collapse' : 'carbon.table.all.expand'

    const handleExpandAll = event => {
      setState(prev => {
        const nextExpanded = !isExpanded
        const nextRowsById = prev.rowIds.reduce((acc, id) => {
          acc[id] = {
            ...prev.rowsById[id],
            isExpanded: nextExpanded,
          }
          return acc
        }, {})

        return {
          ...prev,
          isExpandedAll: nextExpanded,
          rowsById: nextRowsById,
        }
      })

      if (onExpand) onExpand(event)
      if (onClick) onClick(event, { isExpanded })
    }

    return {
      ...rest,
      'aria-label': t(translationKey),
      'aria-controls': state.rowIds.map(id => `${tablePrefix}-expanded-row-${id}`).join(' '),
      isExpanded,
      onExpand: handleExpandAll,
      id: `${tablePrefix}-expand`,
    }
  }

  const getRowProps = ({ row, onClick, ...rest }) => {
    const translationKey = row.isExpanded ? 'carbon.table.row.collapse' : 'carbon.table.row.expand'

    const handleExpandRow = event => {
      setState(prev => {
        const nextRow = prev.rowsById[row.id]
        const nextExpanded = !nextRow.isExpanded
        return {
          ...prev,
          isExpandedAll: nextExpanded ? prev.isExpandedAll : false,
          rowsById: {
            ...prev.rowsById,
            [row.id]: {
              ...nextRow,
              isExpanded: nextExpanded,
            },
          },
        }
      })

      if (onClick) onClick(event)
    }

    return {
      ...rest,
      key: row.id,
      onClick,
      onExpand: handleExpandRow,
      isExpanded: row.isExpanded,
      'aria-label': t(translationKey),
      'aria-controls': `${tablePrefix}-expanded-row-${row.id}`,
      isSelected: row.isSelected,
      disabled: row.disabled,
      expandHeader: `${tablePrefix}-expand`,
    }
  }

  const getExpandedRowProps = ({ row, ...rest }) => {
    return {
      ...rest,
      id: `${tablePrefix}-expanded-row-${row.id}`,
    }
  }

  const getSelectionProps = ({ onClick, row, ...rest } = {}) => {
    if (row) {
      const translationKey = row.isSelected ? 'carbon.table.row.unselect' : 'carbon.table.row.select'

      return {
        ...rest,
        checked: row.isSelected,
        onSelect: event => {
          setState(prev => {
            const current = prev.rowsById[row.id]
            if (!current || current.disabled) return prev

            if (radio) {
              const cleared = Object.entries(prev.rowsById).reduce((acc, [id, r]) => {
                acc[id] = { ...r, isSelected: false }
                return acc
              }, {})

              return {
                ...prev,
                shouldShowBatchActions: false,
                rowsById: {
                  ...cleared,
                  [row.id]: {
                    ...cleared[row.id],
                    isSelected: !cleared[row.id].isSelected,
                  },
                },
              }
            }

            const selectedCount = prev.rowIds.filter(id => prev.rowsById[id]?.isSelected).length
            const nextSelectedCount = current.isSelected ? selectedCount - 1 : selectedCount + 1

            return {
              ...prev,
              shouldShowBatchActions: !current.isSelected || nextSelectedCount > 0,
              rowsById: {
                ...prev.rowsById,
                [row.id]: {
                  ...current,
                  isSelected: !current.isSelected,
                },
              },
            }
          })

          if (onClick) onClick(event)
        },
        id: `${tablePrefix}__select-row-${row.id}`,
        name: `select-row-${instanceId}`,
        'aria-label': t(translationKey),
        disabled: row.disabled,
        radio,
      }
    }

    const rowCount = state.rowIds.length
    const selectedCount = selectedRowIds.length
    const checked = rowCount > 0 && selectedCount === rowCount
    const indeterminate = rowCount > 0 && selectedCount > 0 && selectedCount !== rowCount
    const translationKey = checked || indeterminate ? 'carbon.table.all.unselect' : 'carbon.table.all.select'

    return {
      ...rest,
      'aria-label': t(translationKey),
      checked,
      id: `${tablePrefix}__select-all`,
      indeterminate,
      name: `select-all-${instanceId}`,
      onSelect: event => {
        setState(prev => {
          const anySelected = Object.values(prev.rowsById).some(r => r.isSelected && !r.disabled)
          const nextSelected = !anySelected

          if (radio) {
            // No select-all in radio mode
            return { ...prev, shouldShowBatchActions: false }
          }

          const nextRowsById = Object.entries(prev.rowsById).reduce((acc, [id, r]) => {
            acc[id] = r.disabled ? { ...r, isSelected: false } : { ...r, isSelected: nextSelected }
            return acc
          }, {})

          return {
            ...prev,
            shouldShowBatchActions: nextSelected,
            rowsById: nextRowsById,
          }
        })

        if (onClick) onClick(event)
      },
    }
  }

  const getToolbarProps = (options = {}) => {
    const isSmall = size === 'xs' || size === 'sm'
    return {
      ...options,
      size: isSmall ? 'sm' : undefined,
    }
  }

  const getBatchActionProps = (options = {}) => {
    const totalSelected = selectedRowIds.length

    return {
      onSelectAll: undefined,
      totalCount: state.rowIds.length,
      ...options,
      shouldShowBatchActions: Boolean(state.shouldShowBatchActions) && totalSelected > 0,
      totalSelected,
      onCancel: () => {
        setState(prev => {
          const nextRowsById = Object.entries(prev.rowsById).reduce((acc, [id, r]) => {
            acc[id] = { ...r, isSelected: false }
            return acc
          }, {})
          return {
            ...prev,
            shouldShowBatchActions: false,
            rowsById: nextRowsById,
          }
        })
      },
    }
  }

  const getTableProps = () => {
    return {
      useZebraStyles,
      size: size ?? 'lg',
      isSortable: isSortableProp,
      useStaticWidth,
      stickyHeader,
      overflowMenuOnHover: overflowMenuOnHover ?? false,
      experimentalAutoAlign,
    }
  }

  const getTableContainerProps = () => {
    return {
      stickyHeader,
      useStaticWidth,
    }
  }

  const getCellProps = ({ cell, ...rest }) => {
    return {
      ...rest,
      hasAILabelHeader: cell?.hasAILabelHeader,
      key: cell?.id,
    }
  }

  const onInputChange = (event, defaultValue) => {
    const value = defaultValue || event?.target?.value
    setState(prev => ({ ...prev, filterInputValue: value }))
  }

  const sortBy = headerKey => {
    setState(prev => {
      const nextSort = getNextSortState(prev, headerKey)
      const next = { ...prev, ...nextSort }

      if (nextSort.sortDirection === sortStates.NONE || !nextSort.sortHeaderKey) {
        return { ...next, rowIds: prev.initialRowOrder || prev.rowIds }
      }

      const direction = nextSort.sortDirection
      const sortFn = sortRow || ((a, b, params) => defaultSortRow(a, b, params))
      const resolvedLocale = locale || (typeof navigator !== 'undefined' ? navigator.language : undefined)

      const sorted = [...prev.rowIds].sort((rowA, rowB) => {
        const cellA = prev.cellsById[getCellId(rowA, headerKey)]
        const cellB = prev.cellsById[getCellId(rowB, headerKey)]
        return sortFn(cellA?.value, cellB?.value, {
          sortDirection: direction,
          sortStates,
          locale: resolvedLocale,
        })
      })

      return { ...next, rowIds: sorted }
    })
  }

  const selectAll = () => {
    getSelectionProps().onSelect({})
  }

  const selectRow = rowId => {
    getSelectionProps({ row: state.rowsById[rowId] }).onSelect({})
  }

  const expandRow = rowId => {
    getRowProps({ row: state.rowsById[rowId] }).onExpand({})
  }

  const expandAll = () => {
    getExpandHeaderProps().onExpand({})
  }

  const renderProps = {
    headers,
    rows: denormalize(filteredRowIds, state.rowsById, state.cellsById, headers),
    selectedRows: denormalize(selectedRowIds, state.rowsById, state.cellsById, headers),
    getHeaderProps,
    getExpandHeaderProps,
    getRowProps,
    getExpandedRowProps,
    getSelectionProps,
    getToolbarProps,
    getBatchActionProps,
    getTableProps,
    getTableContainerProps,
    getCellProps,
    onInputChange,
    sortBy,
    selectAll,
    selectRow,
    expandRow,
    expandAll,
    radio,
  }

  if (typeof children === 'function') {
    return children(renderProps)
  }

  if (typeof render === 'function') {
    return render(renderProps)
  }

  return null
}

DataTable.displayName = 'DataTable'
