File: DataTable/TableRow.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Children, forwardRef, type HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import TableSlugRow from './TableSlugRow';
import TableDecoratorRow from './TableDecoratorRow';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';
import type { TableRowExpandInteropProps } from './TableExpandRow';

export interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement>,
    TableRowExpandInteropProps {
  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;
}

const frFn = forwardRef<HTMLTableRowElement, TableRowProps>;

const TableRow = frFn((props, ref) => {
  // Remove unnecessary props if provided to this component, these are
  // only useful in `TableExpandRow`
  const {
    ariaLabel, // eslint-disable-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    'aria-label': ariaLabelAlt, // eslint-disable-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    'aria-controls': ariaControls, // eslint-disable-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    onExpand, // eslint-disable-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    isExpanded, // eslint-disable-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    isSelected,
    expandHeader, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...cleanProps
  } = props;

  const prefix = usePrefix();

  const rowHasAILabel = Children.toArray(props.children).some((child) => {
    if (isComponentElement(child, TableSlugRow)) {
      return !!child.props.slug;
    }

    return (
      isComponentElement(child, TableDecoratorRow) &&
      isComponentElement(child.props.decorator, AILabel)
    );
  });

  const className = cx(props.className, {
    [`${prefix}--data-table--selected`]: isSelected,
    [`${prefix}--data-table--slug-row ${prefix}--data-table--ai-label-row`]:
      rowHasAILabel,
  });

  if (className) {
    cleanProps.className = className;
  }

  return <tr ref={ref} {...cleanProps} />;
});

TableRow.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,
  /**
   * Specify if the row is selected
   */
  isSelected: PropTypes.bool,
  /**
   * Non-standard alias for `aria-label`.
   */
  ariaLabel: PropTypes.string,
  /**
   * Accessible label for the row element.
   */
  'aria-label': PropTypes.string,
  /**
   * Associates this row with the id of the corresponding expanded row content.
   */
  'aria-controls': PropTypes.string,
  /**
   * Handler called when the row’s expand toggle is clicked.
   */
  onExpand: PropTypes.func,
  /**
   * Flag indicating whether the row is currently expanded.
   */
  isExpanded: PropTypes.bool,
};

export default TableRow;



File: DataTable/TableBatchAction.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { AddFilled as iconAddSolid } from '@carbon/icons-react';
import Button from '../Button';

export interface TableBatchActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specify if the button is an icon-only button
   */
  hasIconOnly?: boolean;

  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can
   * be read by screen readers
   */
  iconDescription?: string;

  /**
   * A component used to render an icon.
   */
  renderIcon?: React.ElementType;
}

const TableBatchAction = ({
  renderIcon = iconAddSolid,
  iconDescription = 'Add',
  ...props
}: TableBatchActionProps) => (
  <Button
    renderIcon={renderIcon}
    iconDescription={iconDescription}
    {...props}
  />
);

TableBatchAction.propTypes = {
  /**
   * Specify if the button is an icon-only button
   */
  hasIconOnly: PropTypes.bool,

  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can
   * be read by screen readers
   */
  iconDescription: (props) => {
    if (props.renderIcon && !props.children && !props.iconDescription) {
      return new Error(
        'renderIcon property specified without also providing an iconDescription property.'
      );
    }
    return undefined;
  },

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default TableBatchAction;



File: DataTable/TableSelectAll.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import InlineCheckbox from '../InlineCheckbox';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';

export interface TableSelectAllProps {
  /**
   * Specify the aria label for the underlying input control
   * node
   */
  ['aria-label']?: string;

  /**
   * @deprecated please use `aria-label` instead.
   * Specify the aria label for the underlying input control
   */
  ariaLabel?: string;

  /**
   * Specify whether all items are selected, or not
   */
  checked?: boolean;

  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className?: string;

  /**
   * Specify whether the checkbox input should be disabled
   */
  disabled?: boolean;

  /**
   * Provide an `id` for the underlying input control
   */
  id: string;

  /**
   * Specify whether the selection only has a subset of all items
   */
  indeterminate?: boolean;

  /**
   * Provide a `name` for the underlying input control
   */
  name: string;

  /**
   * Provide a handler to listen to when a user initiates a selection request
   */
  onSelect: React.MouseEventHandler<HTMLInputElement>;
}

const TableSelectAll = ({
  ariaLabel: deprecatedAriaLabel = 'Select all rows in the table',
  ['aria-label']: ariaLabel,
  checked,
  id,
  indeterminate,
  name,
  onSelect,
  disabled,
  className,
}: TableSelectAllProps) => {
  const prefix = usePrefix();
  return (
    <th
      aria-live="off"
      scope="col"
      className={cx(`${prefix}--table-column-checkbox`, className)}>
      <InlineCheckbox
        aria-label={ariaLabel || deprecatedAriaLabel}
        checked={checked}
        id={id}
        indeterminate={indeterminate}
        name={name}
        onClick={onSelect}
        disabled={disabled}
      />
    </th>
  );
};

TableSelectAll.propTypes = {
  /**
   * Specify the aria label for the underlying input control
   */
  ['aria-label']: PropTypes.string,
  /**
   * Deprecated, please use `aria-label` instead.
   * Specify the aria label for the underlying input control
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'This prop syntax has been deprecated. Please use the new `aria-label`.'
  ),
  /**
   * Specify whether all items are selected, or not
   */
  checked: PropTypes.bool,

  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className: PropTypes.string,

  /**
   * Specify whether the checkbox input should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide an `id` for the underlying input control
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether the selection only has a subset of all items
   */
  indeterminate: PropTypes.bool,

  /**
   * Provide a `name` for the underlying input control
   */
  name: PropTypes.string.isRequired,

  /**
   * Provide a handler to listen to when a user initiates a selection request
   */
  onSelect: PropTypes.func.isRequired,
};

export default TableSelectAll;



File: DataTable/TableToolbar.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';

export interface TableToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify a label to be read by screen readers on the container node
   * 'aria-label' of the TableToolbar component.
   */
  ['aria-label']?: string;

  /**
   * @deprecated please use `aria-label` instead.
   * 'aria-label' of the TableToolbar component.
   */
  ariaLabel?: string;

  /**
   * Pass in the children that will be rendered inside the TableToolbar
   */
  children: React.ReactNode;

  /**
   * `lg` Change the row height of table
   */
  size?: 'sm' | 'lg';
}

const TableToolbar: React.FC<TableToolbarProps> = ({
  ['aria-label']: ariaLabel = 'data table toolbar',
  ariaLabel: deprecatedAriaLabel,
  children,
  size,
  ...rest
}) => {
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--table-toolbar`]: true,
    [`${prefix}--table-toolbar--${size}`]: size,
  });
  return (
    <section
      role="group"
      aria-label={deprecatedAriaLabel || ariaLabel}
      {...rest}
      className={className}>
      {children}
    </section>
  );
};

TableToolbar.propTypes = {
  /**
   * 'aria-label' of the TableToolbar component.
   * Specify a label to be read by screen readers on the container node
   */
  ['aria-label']: PropTypes.string,

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify a label to be read by screen readers on the container node.
   * 'aria-label' of the TableToolbar component.
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'This prop syntax has been deprecated. Please use the new `aria-label`.'
  ),

  /**
   * Pass in the children that will be rendered inside the TableToolbar
   */
  children: PropTypes.node,

  /**
   * `lg` Change the row height of table
   */
  size: PropTypes.oneOf(['sm', 'lg']),
};

export default TableToolbar;



File: DataTable/DataTable.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { // eslint-disable-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import isEqual from 'react-fast-compare';
import getDerivedStateFromProps from './state/getDerivedStateFromProps';
import { getNextSortState, type SortRowFn } from './state/sorting';
import type { DataTableSortState } from './state/sortStates';
import { getCellId } from './tools/cells';
import denormalize from './tools/denormalize';
import { composeEventHandlers } from '../../tools/events';
import { defaultFilterRows } from './tools/filter';
import { setupGetInstanceId } from '../../tools/setupGetInstanceId';
import Table from './Table';
import TableActionList from './TableActionList';
import TableBatchAction from './TableBatchAction';
import TableBatchActions from './TableBatchActions';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableContainer from './TableContainer';
import TableDecoratorRow from './TableDecoratorRow';
import TableExpandHeader from './TableExpandHeader';
import TableExpandRow from './TableExpandRow';
import TableExpandedRow from './TableExpandedRow';
import TableHead from './TableHead';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableSelectAll from './TableSelectAll';
import TableSelectRow from './TableSelectRow';
import TableSlugRow from './TableSlugRow';
import TableToolbar from './TableToolbar';
import TableToolbarAction from './TableToolbarAction';
import TableToolbarContent from './TableToolbarContent';
import TableToolbarSearch from './TableToolbarSearch';
import TableToolbarMenu from './TableToolbarMenu';
import type { TranslateWithId, TFunc } from '../../types/common';
import { deprecate } from '../../prop-types/deprecate';

const getInstanceId = setupGetInstanceId();

const translationIds = {
  'carbon.table.row.expand': 'carbon.table.row.expand',
  'carbon.table.row.collapse': 'carbon.table.row.collapse',
  'carbon.table.all.expand': 'carbon.table.all.expand',
  'carbon.table.all.collapse': 'carbon.table.all.collapse',
  'carbon.table.all.select': 'carbon.table.all.select',
  'carbon.table.all.unselect': 'carbon.table.all.unselect',
  'carbon.table.row.select': 'carbon.table.row.select',
  'carbon.table.row.unselect': 'carbon.table.row.unselect',
} as const;

/**
 * Message IDs that will be passed to translateWithId().
 */
type TranslationKey = keyof typeof translationIds;

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['carbon.table.all.expand']]: 'Expand all rows',
  [translationIds['carbon.table.all.collapse']]: 'Collapse all rows',
  [translationIds['carbon.table.row.expand']]: 'Expand current row',
  [translationIds['carbon.table.row.collapse']]: 'Collapse current row',
  [translationIds['carbon.table.all.select']]: 'Select all rows',
  [translationIds['carbon.table.all.unselect']]: 'Unselect all rows',
  [translationIds['carbon.table.row.select']]: 'Select row',
  [translationIds['carbon.table.row.unselect']]: 'Unselect row',
};

const defaultTranslateWithId: TFunc<TranslationKey> = (messageId) => {
  return defaultTranslations[messageId];
};

export type DataTableSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface DataTableCell<T> {
  id: string;
  value: T;
  isEditable: boolean;
  isEditing: boolean;
  isValid: boolean;
  errors: null | Error[];
  info: {
    header: string;
  };
  hasAILabelHeader?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
type DataTableCells<T extends any[]> = { [K in keyof T]: DataTableCell<T[K]> };
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
export interface DataTableRow<ColTypes extends any[]> {
  id: string;
  cells: DataTableCells<ColTypes>;
  disabled?: boolean;
  isExpanded?: boolean;
  isSelected?: boolean;
}

export interface DataTableHeader {
  key: string;
  header: ReactNode;
  slug?: ReactElement;
  decorator?: ReactElement;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
export interface DataTableRenderProps<RowType, ColTypes extends any[]> {
  /**
   * The headers for the table.
   */
  headers: DataTableHeader[];

  /**
   * The rows for the table.
   */
  rows: (DataTableRow<ColTypes> & RowType)[];

  /**
   * The rows that are currently selected.
   */
  selectedRows: (DataTableRow<ColTypes> & RowType)[];

  getHeaderProps: (options: {
    header: DataTableHeader;
    isSortable?: boolean;
    onClick?: (
      event: MouseEvent<HTMLButtonElement>,
      sortState: { sortHeaderKey: string; sortDirection: DataTableSortState }
    ) => void;
    [key: string]: unknown;
  }) => {
    isSortable: boolean | undefined;
    isSortHeader: boolean;
    key: string;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    sortDirection: DataTableSortState;
    [key: string]: unknown;
  };

  getExpandHeaderProps: (options?: {
    onClick?: (
      event: MouseEvent<HTMLButtonElement>,
      expandState: { isExpanded?: boolean }
    ) => void;
    onExpand?: (event: MouseEvent<HTMLButtonElement>) => void;
    [key: string]: unknown;
  }) => {
    ['aria-label']: string;
    isExpanded: boolean;
    onExpand: (event: MouseEvent<HTMLButtonElement>) => void;
    [key: string]: unknown;
    id: string;
  };

  getRowProps: (options: {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    row: DataTableRow<ColTypes>;
    [key: string]: unknown;
  }) => {
    ['aria-label']: string;
    disabled: boolean | undefined;
    isExpanded?: boolean;
    isSelected?: boolean;
    key: string;
    onExpand: (event: MouseEvent<HTMLButtonElement>) => void;
    [key: string]: unknown;
    expandHeader: string;
  };

  getExpandedRowProps: (options: {
    row: DataTableRow<ColTypes>;
    [key: string]: unknown;
  }) => {
    ['id']: string;
    [key: string]: unknown;
  };

  getSelectionProps: (options?: {
    onClick?: (
      event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
    ) => void;
    row?: DataTableRow<ColTypes>;
    [key: string]: unknown;
  }) => {
    'aria-label': string;
    checked?: boolean | undefined;
    disabled?: boolean | undefined;
    id: string;
    indeterminate?: boolean;
    name: string;
    onSelect: (event: MouseEvent<HTMLInputElement>) => void;
    radio?: boolean | undefined;
    [key: string]: unknown;
  };

  getToolbarProps: (options?: { [key: string]: unknown }) => {
    size: 'sm' | undefined;
    [key: string]: unknown;
  };

  getBatchActionProps: (options?: { [key: string]: unknown }) => {
    onCancel: () => void;
    // eslint-disable-next-line   @typescript-eslint/no-invalid-void-type -- https://github.com/carbon-design-system/carbon/issues/20452
    onSelectAll?: () => void | undefined;
    shouldShowBatchActions: boolean;
    totalCount: number;
    totalSelected: number;
    [key: string]: unknown;
  };

  getTableProps: () => {
    experimentalAutoAlign?: boolean;
    isSortable?: boolean;
    overflowMenuOnHover: boolean;
    size: DataTableSize;
    stickyHeader?: boolean;
    useStaticWidth?: boolean;
    useZebraStyles?: boolean;
  };

  getTableContainerProps: () => {
    stickyHeader?: boolean;
    useStaticWidth?: boolean;
  };

  getCellProps: (options: { cell: DataTableCell<ColTypes> }) => {
    [key: string]: unknown;
    hasAILabelHeader?: boolean;
    key: string;
  };

  /**
   * Handles input value changes.
   */
  onInputChange: (
    event: ChangeEvent<HTMLInputElement>,
    defaultValue?: string
  ) => void;

  /**
   * Sorts the table by a specific header.
   */
  sortBy: (headerKey: string) => void;

  /**
   * Selects all rows.
   */
  selectAll: () => void;

  /**
   * Selects or deselects a specific row.
   */
  selectRow: (rowId: string) => void;

  /**
   * Expands or collapses a specific row.
   */
  expandRow: (rowId: string) => void;

  /**
   * Expands or collapses all rows.
   */
  expandAll: () => void;

  /**
   * Whether the table is using radio buttons for selection instead of
   * checkboxes.
   */
  radio: boolean | undefined;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
export interface DataTableProps<RowType, ColTypes extends any[]>
  extends TranslateWithId<TranslationKey> {
  children?: (
    renderProps: DataTableRenderProps<RowType, ColTypes>
  ) => ReactElement;
  experimentalAutoAlign?: boolean;
  filterRows?: (options: {
    cellsById: Record<string, DataTableCell<ColTypes>>;
    getCellId: (rowId: string, header: string) => string;
    headers: DataTableHeader[];
    inputValue: string;
    rowIds: string[];
  }) => string[];
  headers: DataTableHeader[];
  isSortable?: boolean;
  locale?: string;
  overflowMenuOnHover?: boolean;
  radio?: boolean;
  /**
   * @deprecated Use `children` instead. This prop will be removed in
   * the next major version.
   *
   * https://www.patterns.dev/react/render-props-pattern/#children-as-a-function
   */
  render?: (
    renderProps: DataTableRenderProps<RowType, ColTypes>
  ) => ReactElement;
  rows: Omit<DataTableRow<ColTypes>, 'cells'>[];
  size?: DataTableSize;
  sortRow?: SortRowFn;
  stickyHeader?: boolean;
  useStaticWidth?: boolean;
  useZebraStyles?: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
interface DataTableState<ColTypes extends any[]> {
  cellsById: Record<string, DataTableCell<ColTypes>>;
  filterInputValue: string | null;
  initialRowOrder: string[];
  isExpandedAll: boolean;
  rowIds: string[];
  rowsById: Record<string, DataTableRow<ColTypes>>;
  shouldShowBatchActions: boolean;
  sortDirection: DataTableSortState;
  sortHeaderKey: string | null;
}

/**
 * DataTable components are used to represent a collection of resources,
 * displaying a subset of their fields in columns, or headers. We prioritize
 * direct updates to the state of what we're rendering, so internally we
 * normalize the given data and then denormalize it at render time. Each part of
 * the DataTable is accessible through look-up by ID, and updating the state of
 * a single entity cascades updates to the consumer.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
export const DataTable = <RowType, ColTypes extends any[]>(
  props: DataTableProps<RowType, ColTypes>
) => {
  type RenderProps = DataTableRenderProps<RowType, ColTypes>;
  const {
    children,
    filterRows = defaultFilterRows,
    headers,
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
    rows,
  } = props;

  const instanceId = useMemo(() => getInstanceId(), []);

  const [state, setState] = useState<DataTableState<ColTypes>>(() => ({
    ...getDerivedStateFromProps(props, {}),
    // Initialize to collapsed. A value of `undefined` is treated as neutral.
    isExpandedAll: false,
  }));

  useEffect(() => {
    const nextRowIds = rows.map((row) => row.id);
    const nextHeaders = headers.map((header) => header.key);
    const hasRowIdsChanged = !isEqual(nextRowIds, state.rowIds);
    const currentHeaders = Array.from(
      new Set(Object.keys(state.cellsById).map((id) => id.split(':')[1]))
    );
    const hasHeadersChanged = !isEqual(nextHeaders, currentHeaders);
    const currentRows = state.rowIds.map((id) => {
      const row = state.rowsById[id];
      return {
        id: row.id,
        disabled: row.disabled,
        isExpanded: row.isExpanded,
        isSelected: row.isSelected,
      };
    });
    const hasRowsChanged = !isEqual(rows, currentRows);

    if (hasRowIdsChanged || hasHeadersChanged || hasRowsChanged) {
      setState((prev) => getDerivedStateFromProps(props, prev));
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [headers, rows]);

  const getHeaderProps: RenderProps['getHeaderProps'] = ({
    header,
    onClick,
    isSortable = isSortableProp,
    ...rest
  }) => {
    const { sortDirection, sortHeaderKey } = state;
    const { key, slug, decorator } = header;

    return {
      ...rest,
      key,
      sortDirection,
      isSortable,
      isSortHeader: sortHeaderKey === key,
      slug,
      decorator,
      onClick: (event) => {
        const nextSortState = getNextSortState(props, state, {
          key,
        });

        setState((prev) => ({ ...prev, ...nextSortState }));

        if (onClick) {
          handleOnHeaderClick(onClick, {
            sortHeaderKey: key,
            sortDirection: nextSortState.sortDirection,
          })(event);
        }
      },
    };
  };

  const getExpandHeaderProps: RenderProps['getExpandHeaderProps'] = ({
    onClick,
    onExpand,
    ...rest
  } = {}) => {
    const { isExpandedAll, rowIds, rowsById } = state;
    const isExpanded =
      isExpandedAll || rowIds.every((id) => rowsById[id].isExpanded);
    const translationKey = isExpanded
      ? translationIds['carbon.table.all.collapse']
      : translationIds['carbon.table.all.expand'];
    const handlers = [handleOnExpandAll, onExpand];

    if (onClick) {
      handlers.push(handleOnExpandHeaderClick(onClick, { isExpanded }));
    }

    return {
      ...rest,
      'aria-label': t(translationKey),
      // Provide a string of all expanded row IDs, separated by a space.
      'aria-controls': rowIds
        .map((id) => `${getTablePrefix()}-expanded-row-${id}`)
        .join(' '),
      isExpanded,
      onExpand: composeEventHandlers(handlers),
      id: `${getTablePrefix()}-expand`,
    };
  };

  /**
   * Wraps the consumer's `onClick` with sorting metadata.
   */
  const handleOnHeaderClick = (
    onClick: (
      event: MouseEvent<HTMLButtonElement>,
      sortParams: { sortHeaderKey: string; sortDirection: DataTableSortState }
    ) => void,
    sortParams: { sortHeaderKey: string; sortDirection: DataTableSortState }
  ) => {
    return (event: MouseEvent<HTMLButtonElement>) => onClick(event, sortParams);
  };

  /**
   * Wraps the consumer's `onClick` with sorting metadata.
   */
  const handleOnExpandHeaderClick = (
    onClick: (
      event: MouseEvent<HTMLButtonElement>,
      expandParams: { isExpanded: boolean }
    ) => void,
    expandParams: { isExpanded: boolean }
  ) => {
    return (event: MouseEvent<HTMLButtonElement>) =>
      onClick(event, expandParams);
  };

  const getRowProps: RenderProps['getRowProps'] = ({
    row,
    onClick,
    ...rest
  }) => {
    const translationKey = row.isExpanded
      ? translationIds['carbon.table.row.collapse']
      : translationIds['carbon.table.row.expand'];
    return {
      ...rest,
      key: row.id,
      onClick,
      // Compose the event handlers so we don't overwrite a consumer's `onClick`
      // handler
      onExpand: composeEventHandlers([handleOnExpandRow(row.id), onClick]),
      isExpanded: row.isExpanded,
      'aria-label': t(translationKey),
      'aria-controls': `${getTablePrefix()}-expanded-row-${row.id}`,
      isSelected: row.isSelected,
      disabled: row.disabled,
      expandHeader: `${getTablePrefix()}-expand`,
    };
  };

  const getExpandedRowProps: RenderProps['getExpandedRowProps'] = ({
    row,
    ...rest
  }) => {
    return {
      ...rest,
      id: `${getTablePrefix()}-expanded-row-${row.id}`,
    };
  };

  /**
   * Gets the props associated with selection for a header or a row.
   */
  const getSelectionProps: RenderProps['getSelectionProps'] = ({
    onClick,
    row,
    ...rest
  } = {}) => {
    // If we're given a row, return the selection state values for that row
    if (row) {
      const translationKey = row.isSelected
        ? translationIds['carbon.table.row.unselect']
        : translationIds['carbon.table.row.select'];
      return {
        ...rest,
        checked: row.isSelected,
        onSelect: composeEventHandlers([handleOnSelectRow(row.id), onClick]),
        id: `${getTablePrefix()}__select-row-${row.id}`,
        name: `select-row-${instanceId}`,
        'aria-label': t(translationKey),
        disabled: row.disabled,
        radio,
      };
    }

    // Otherwise, we're working on `TableSelectAll` which handles toggling the
    // selection state of all rows.
    const rowCount = state.rowIds.length;
    const selectedRowCount = selectedRows.length;
    const checked = rowCount > 0 && selectedRowCount === rowCount;
    const indeterminate =
      rowCount > 0 && selectedRowCount > 0 && selectedRowCount !== rowCount;
    const translationKey =
      checked || indeterminate
        ? translationIds['carbon.table.all.unselect']
        : translationIds['carbon.table.all.select'];

    return {
      ...rest,
      'aria-label': t(translationKey),
      checked,
      id: `${getTablePrefix()}__select-all`,
      indeterminate,
      name: `select-all-${instanceId}`,
      onSelect: composeEventHandlers([handleSelectAll, onClick]),
    };
  };

  const getToolbarProps: RenderProps['getToolbarProps'] = (props) => {
    const isSmall = size === 'xs' || size === 'sm';
    return {
      ...props,
      size: isSmall ? 'sm' : undefined,
    };
  };

  const getBatchActionProps: RenderProps['getBatchActionProps'] = (props) => {
    const { shouldShowBatchActions } = state;
    const selectedRowCount = selectedRows.length;

    return {
      onSelectAll: undefined,
      totalCount: state.rowIds.length,
      ...props,
      shouldShowBatchActions: shouldShowBatchActions && selectedRowCount > 0,
      totalSelected: selectedRowCount,
      onCancel: handleOnCancel,
    };
  };

  const getTableProps: RenderProps['getTableProps'] = () => {
    return {
      useZebraStyles,
      size: size ?? 'lg',
      isSortable: isSortableProp,
      useStaticWidth,
      stickyHeader,
      overflowMenuOnHover: overflowMenuOnHover ?? false,
      experimentalAutoAlign,
    };
  };

  const getTableContainerProps: RenderProps['getTableContainerProps'] = () => {
    return {
      stickyHeader,
      useStaticWidth,
    };
  };

  const getCellProps: RenderProps['getCellProps'] = ({
    cell: { hasAILabelHeader, id },
    ...rest
  }) => {
    return {
      ...rest,
      hasAILabelHeader,
      key: id,
    };
  };

  /**
   * Selected row IDs, excluding disabled rows.
   */
  const selectedRows = state.rowIds.filter((id) => {
    const row = state.rowsById[id];

    return row.isSelected && !row.disabled;
  });

  const filteredRowIds =
    typeof state.filterInputValue === 'string'
      ? filterRows({
          cellsById: state.cellsById,
          getCellId,
          headers,
          inputValue: state.filterInputValue,
          rowIds: state.rowIds,
        })
      : state.rowIds;

  /**
   * Generates a prefix for table related IDs.
   */
  const getTablePrefix = () => `data-table-${instanceId}`;

  /**
   * Generates a new `rowsById` object with updated selection state.
   */
  const getUpdatedSelectionState = (
    initialState: DataTableState<ColTypes>,
    isSelected: boolean
  ): Pick<DataTableState<ColTypes>, 'rowsById'> => {
    const { rowIds } = initialState;
    const isFiltered = rowIds.length !== filteredRowIds.length;

    return {
      rowsById: rowIds.reduce<DataTableState<ColTypes>['rowsById']>(
        (acc, id) => {
          const row = { ...initialState.rowsById[id] };

          if (!row.disabled && (!isFiltered || filteredRowIds.includes(id))) {
            row.isSelected = isSelected;
          }

          // Local mutation for performance with large tables
          acc[id] = row;

          return acc;
        },
        {}
      ),
    };
  };

  /**
   * Handler for `onCancel` to hide the batch action toolbar and deselect all
   * rows.
   */
  const handleOnCancel = () => {
    setState((prev) => {
      return {
        ...prev,
        shouldShowBatchActions: false,
        ...getUpdatedSelectionState(prev, false),
      };
    });
  };

  /**
   * Handler for toggling the selection state of all rows.
   */
  const handleSelectAll = () => {
    setState((prev) => {
      const { rowsById } = prev;
      const isSelected = !Object.values(rowsById).filter(
        (row) => row.isSelected && !row.disabled
      ).length;

      return {
        ...prev,
        shouldShowBatchActions: isSelected,
        ...getUpdatedSelectionState(prev, isSelected),
      };
    });
  };

  /**
   * Handler for toggling selection state of a given row.
   */
  const handleOnSelectRow = (rowId: string) => () => {
    setState((prev) => {
      const row = prev.rowsById[rowId];

      if (radio) {
        // Deselect all radio buttons, then toggle the target row
        const rowsById = Object.entries(prev.rowsById).reduce<
          DataTableState<ColTypes>['rowsById']
        >((acc, [id, row]) => {
          acc[id] = { ...row, isSelected: false };

          return acc;
        }, {});

        return {
          ...prev,
          shouldShowBatchActions: false,
          rowsById: {
            ...rowsById,
            [rowId]: {
              ...rowsById[rowId],
              isSelected: !rowsById[rowId].isSelected,
            },
          },
        };
      }

      const selectedRows = prev.rowIds.filter(
        (id) => prev.rowsById[id].isSelected
      ).length;
      // Predict the length of the selected rows after this change occurs
      const selectedRowsCount = !row.isSelected
        ? selectedRows + 1
        : selectedRows - 1;

      return {
        ...prev,
        // Show batch action toolbar if selecting, or if there are other
        // selected rows remaining.
        shouldShowBatchActions: !row.isSelected || selectedRowsCount > 0,
        rowsById: {
          ...prev.rowsById,
          [rowId]: {
            ...row,
            isSelected: !row.isSelected,
          },
        },
      };
    });
  };

  const handleOnExpandRow = (rowId: string) => () => {
    setState((prev) => {
      const row = prev.rowsById[rowId];
      const { isExpandedAll } = prev;
      return {
        ...prev,
        isExpandedAll: row.isExpanded ? false : isExpandedAll,
        rowsById: {
          ...prev.rowsById,
          [rowId]: {
            ...row,
            isExpanded: !row.isExpanded,
          },
        },
      };
    });
  };

  const handleOnExpandAll = () => {
    setState((prev) => {
      const { rowIds, isExpandedAll } = prev;
      return {
        ...prev,
        isExpandedAll: !isExpandedAll,
        rowsById: rowIds.reduce<DataTableState<ColTypes>['rowsById']>(
          (acc, id) => {
            acc[id] = {
              ...prev.rowsById[id],
              isExpanded: !isExpandedAll,
            };

            return acc;
          },
          {}
        ),
      };
    });
  };

  /**
   * Transitions to the next sort state of the table.
   */
  const handleSortBy = (headerKey: string) => () => {
    setState((prev) => {
      const sortState = getNextSortState(props, prev, { key: headerKey });
      return {
        ...prev, // Preserve ALL existing state
        ...sortState, // Then apply only the sorting changes
      };
    });
  };

  /**
   * Event handler for table filter input changes.
   */
  const handleOnInputValueChange = (
    event: ChangeEvent<HTMLInputElement>,
    defaultValue?: string
  ) => {
    const value = defaultValue || event.target?.value;

    setState((prev) => ({ ...prev, filterInputValue: value }));
  };

  const renderProps: RenderProps = {
    // Data derived from state
    rows: denormalize(filteredRowIds, state.rowsById, state.cellsById),
    headers: headers,
    selectedRows: denormalize(selectedRows, state.rowsById, state.cellsById),

    // Prop accessors/getters
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

    // Custom event handlers
    onInputChange: handleOnInputValueChange,

    // Expose internal state change actions
    sortBy: (headerKey) => handleSortBy(headerKey)(),
    selectAll: handleSelectAll,
    selectRow: (rowId) => handleOnSelectRow(rowId)(),
    expandRow: (rowId) => handleOnExpandRow(rowId)(),
    expandAll: handleOnExpandAll,
    radio: radio,
  };

  if (typeof render !== 'undefined') {
    return render(renderProps);
  }

  if (typeof children !== 'undefined') {
    return children(renderProps);
  }

  return null;
};

DataTable.Table = Table;
DataTable.TableActionList = TableActionList;
DataTable.TableBatchAction = TableBatchAction;
DataTable.TableBatchActions = TableBatchActions;
DataTable.TableBody = TableBody;
DataTable.TableCell = TableCell;
DataTable.TableContainer = TableContainer;
DataTable.TableDecoratorRow = TableDecoratorRow;
DataTable.TableExpandHeader = TableExpandHeader;
DataTable.TableExpandRow = TableExpandRow;
DataTable.TableExpandedRow = TableExpandedRow;
DataTable.TableHead = TableHead;
DataTable.TableHeader = TableHeader;
DataTable.TableRow = TableRow;
DataTable.TableSelectAll = TableSelectAll;
DataTable.TableSelectRow = TableSelectRow;
DataTable.TableSlugRow = TableSlugRow;
DataTable.TableToolbar = TableToolbar;
DataTable.TableToolbarAction = TableToolbarAction;
DataTable.TableToolbarContent = TableToolbarContent;
DataTable.TableToolbarSearch = TableToolbarSearch;
DataTable.TableToolbarMenu = TableToolbarMenu;

DataTable.propTypes = {
  /**
   * Pass in the children that will be rendered within the Table
   */
  children: PropTypes.node,

  /**
   * Experimental property. Allows table to align cell contents to the top if there is text wrapping in the content. Might have performance issues, intended for smaller tables
   */
  experimentalAutoAlign: PropTypes.bool,

  /**
   * Optional hook to manually control filtering of the rows from the
   * TableToolbarSearch component
   */
  filterRows: PropTypes.func,

  /**
   * The `headers` prop represents the order in which the headers should
   * appear in the table. We expect an array of objects to be passed in, where
   * `key` is the name of the key in a row object, and `header` is the name of
   * the header.
   */
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.node.isRequired,
    })
  ).isRequired,

  /**
   * Specify whether the table should be able to be sorted by its headers
   */
  isSortable: PropTypes.bool,

  /**
   * Provide a string for the current locale
   */
  locale: PropTypes.string,

  /**
   * Specify whether the overflow menu (if it exists) should be shown always, or only on hover
   */
  overflowMenuOnHover: PropTypes.bool,

  /**
   * Specify whether the control should be a radio button or inline checkbox
   */
  radio: PropTypes.bool,

  /**
   * @deprecated Use `children` instead. This prop will be removed in
   * the next major version.
   *
   * https://www.patterns.dev/react/render-props-pattern/#children-as-a-function
   */
  render: deprecate(PropTypes.func),

  /**
   * The `rows` prop is where you provide us with a list of all the rows that
   * you want to render in the table. The only hard requirement is that this
   * is an array of objects, and that each object has a unique `id` field
   * available on it.
   */
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      isSelected: PropTypes.bool,
      isExpanded: PropTypes.bool,
    })
  ).isRequired,

  /**
   *  Change the row height of table. Currently supports `xs`, `sm`, `md`, `lg`, and `xl`.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),

  /**
   * Optional hook to manually control sorting of the rows.
   */
  sortRow: PropTypes.func,

  /**
   * Specify whether the header should be sticky.
   * Still experimental: may not work with every combination of table props
   */
  stickyHeader: PropTypes.bool,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,

  /**
   * If `true`, sets the table width to `auto` instead of `100%`.
   */
  useStaticWidth: PropTypes.bool,

  /**
   * `true` to add useZebraStyles striping.
   */
  useZebraStyles: PropTypes.bool,
};



File: DataTable/TableSlugRow.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ReactNode, useEffect } from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { deprecateComponent } from '../../prop-types/deprecateComponent';

export interface TableSlugRowProps {
  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className?: string;

  /**
   * Provide a `Slug` component to be rendered inside the `TableSlugRow` component
   */
  slug?: ReactNode;
}

const TableSlugRow = ({ className, slug }: TableSlugRowProps) => {
  useEffect(() => {
    deprecateComponent(
      'TableSlugRow',
      'The `TableSlugRow` component has been deprecated and will be removed in the next major version. Use the TableDecoratorRow component instead.'
    );
  }, []);

  const prefix = usePrefix();
  const TableSlugRowClasses = classNames({
    ...(className && { [className]: true }),
    [`${prefix}--table-column-slug`]: true,
    [`${prefix}--table-column-slug--active`]: slug,
  });

  // Slug is always size `mini`
  let normalizedSlug;
  if (slug) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
      size: 'mini',
    });
  }

  return <td className={TableSlugRowClasses}>{normalizedSlug}</td>;
};

TableSlugRow.displayName = 'TableSlugRow';
TableSlugRow.propTypes = {
  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className: PropTypes.string,

  /**
   * Provide a `Slug` component to be rendered inside the `TableSlugRow` component
   */
  slug: PropTypes.node,
};

export default TableSlugRow;



File: DataTable/DataTable.mdx


import { ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from '../DataTable';

<Meta isTemplate />

# DataTable

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/DataTable)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/data-table/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/data-table/accessibility)

<Canvas id="components-datatable-basic--default" />

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Getting started](#getting-started)
- [Sorting](#sorting)
  - [Programmatic sorting](#programmatic-sorting)
  - [Custom sorting](#custom-sorting)
- [Expansion](#expansion)
  - [Programmatic expansion](#programmatic-expansion)
- [Selection](#selection)
  - [Programmatic selection](#programmatic-selection)
- [Filtering](#filtering)
  - [Multiple filters with batch updates](#multiple-filters-with-batch-updates)
- [Batch actions](#batch-actions)
- [Toolbar](#toolbar)
  - [Overflow Menu](#overflow-menu)
- [Text Wrapping Alignment](#text-wrapping-alignment)
  - [Table with `experimentalAutoAlign = true`](#table-with-experimentalautoalign--true)
  - [Table with `experimentalAutoAlign = false`](#table-with-experimentalautoalign--false)
- [Accessibility Considerations](#accessibility-considerations)
  - [Accessible Name](#accessible-name)
- [Props](#props)
  - [Render function](#render-function)
    - [Prop getters](#prop-getters)
    - [Actions](#actions)
    - [State](#state)
    - [Example](#example)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Getting started

You can implement a data table in your project by importing the `DataTable`
component and using it along with any additional table components that you need.

```js
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
```

The `DataTable` component needs two props to be provided: `rows` and `headers`.
The `rows` prop is the data you would like to display in the rows of your table,
whereas `headers` specifies which table column headings should be displayed.

Each row in the `rows` prop should provide a unique `id`, but everything else
can be configured according to your data. For example:

```js
const rows = [
  {
    id: 'a',
    name: 'Load balancer 1',
    status: 'Disabled',
  },
  {
    id: 'b',
    name: 'Load balancer 2',
    status: 'Starting',
  },
  {
    id: 'c',
    name: 'Load balancer 3',
    status: 'Active',
  },
];
```

The `headers` will specify the column headers in your table. The `header`
property for each item will describe what the user sees in the table column
header. The `key` property is used to relate what value a row has for the given
column.

```js
const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'status',
    header: 'Status',
  },
];
```

You can use the `rows` and `headers` props above to render a `DataTable` by
writing:

```jsx
<DataTable rows={rows} headers={headers}>
  {({
    rows,
    headers,
    getTableProps,
    getHeaderProps,
    getRowProps,
    getCellProps,
  }) => (
    <Table {...getTableProps()}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeader {...getHeaderProps({ header })}>
              {header.header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow {...getRowProps({ row })}>
            {row.cells.map((cell) => (
              <TableCell {...getCellProps({ cell })}>{cell.value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )}
</DataTable>
```

After rendering a `DataTable` component using the code snippet above, you can
optionally add any number of features including sorting, row expansion,
filtering, row selection, batch actions.

For more information, see each usage section below for the functionality that
you're interested in. If you want to see a full list of the arguments passed
into your render prop, visit the [render props](#render-props) section.

## Sorting

In order to sort the rows in your data table, you will need to pass in the
`isSortable` prop to the `DataTable` component.

<Canvas id="components-datatable-sorting--default" />

Optionally, you can pass in `isSortable` to each `TableHeader` that you want to
be sorted, or not sorted. This is useful if you only want to enable sorting on
some table column headers, but not all.

```jsx
<TableHeader {...getHeaderProps({ header, isSortable: false })}>
  {header.header}
</TableHeader>
```

### Programmatic sorting

In addition to the prop getter specified in the previous section, you can also
change the sort status of the table by using the `sortBy` action made available
in your `children` prop. This `sortBy` utility takes in the `key` of the header
you want to sort by as an argument. After invoking this method with the given
`key`, the table should be sorted by the header that you've specified.

### Custom sorting

If the default sorting logic doesn't match your use-case, you can provide a
custom sort method as a `sortRow` prop to `DataTable`.

`sortRow` is a method that takes in the values of two cells, in addition to some
info, and should return -1, 0, or 1 as a result (mirroring the native sort
behavior in JavaScript).

The two cells that are passed in are derived by accessing the value of the sort
header in each row that we're comparing. For example, if we're sorting on the
`Foo` header, with the `foo` key available in each row, then for row `a` and row
`b` we would get the `a.foo` and `b.foo` field values.

As a result, a custom `sortRow` function would take on the following shape:

```js
function customSortRow(cellA, cellB, { sortDirection, sortStates, locale }) {
  if (sortDirection === sortStates.DESC) {
    return compare(cellB, cellA, locale);
  }

  return compare(cellA, cellB, locale);
}
```

## Expansion

The `DataTable` component supports row-level expansion when combined with the
`TableExpandHeader`, `TableExpandRow`, and `TableExpandedRow` components.

<Canvas id="components-datatable-expansion--default" />

_Note: press "Show code" above to view a code snippet of this example_

The `TableExpandHeader` is placed before all the other headers as a placeholder
column. In each row that you would like to be expanded, you will use
`TableExpandRow`. It's important that `getRowProps` is applied to
`TableExpandRow` so that it has the necessary props. `TableExpandedRow` is used
for the content that will be displayed only when the row is expanded. It's
important that `getExpandedRowProps` is applied to `TableExpandedRow` so that it
has the necessary props.

### Programmatic expansion

You can use the `expandRow` action made available through your `children` prop
function to toggle the expansion state of a given row. This method takes in the
row id as a single argument.

## Selection

The `DataTable` component supports row selection when used with the
`TableSelectAll` and `TableSelectRow` components.

<Canvas id="components-datatable-selection--default" />

_Note: press "Show code" above to view a code snippet of this example_

In the example above, `TableSelectAll` is placed before all other headers. You
should use `getSelectionProps` on `TableSelectAll` to enable selecting all rows
in the table.

`TableSelectRow` is also used in this example, and is placed before all the
cells in a row. It also uses `getSelectionProps` props, but also takes in the
current `row` in order to retrieve selection state about the given row.

You can access all the selected rows through the `selectedRows` property passed
into your `children` prop function.

### Programmatic selection

You can use either of the following actions from your `children` prop function
to update the selection status of a row:

- `selectAll`: invoking this will toggle the selection of all rows, either by
  making all selected or de-selecting all rows
- `selectRow`: invoking this will toggle the selection of a specific row. Takes
  in a valid row id as an argument

## Filtering

Filtering in a `DataTable` is provided through usage of the `TableToolbar` and
the `TableToolbarSearch` component. By default, filtering is handled by a
built-in `filterRows` implementation. You can customize filtering behavior by
passing your own `filterRows` function as a prop.

By default `filterRows` is provided through our default implementation. However,
you can provide your own method if needed.

<Canvas id="components-datatable-filtering--default" />

In order to integrate filtering into your data table, you will need to provide
the `onInputChange` function provided to you from `DataTable`'s `children` prop
and pass it to the `onChange` prop of `TableToolbarSearch` in your
`TableToolbar` component.

### Multiple filters with batch updates

The filtering story shows an example of how to implement the
[batch filtering](https://carbondesignsystem.com/patterns/filtering/#multiple-filters-with-batch-updates)
pattern.

To implement this in your own project you should copy the
[TableToolbarFilter](https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/DataTable/stories/examples/TableToolbarFilter.tsx)
example component into your code. Then import and use it inside
`TableToolbarContent`:

```jsx
<TableToolbarFilter
  onApplyFilter={handleTableFilter}
  onResetFilter={handleOnResetFilter}
/>
```

You can write the code to handle the filters in the same file where you have
your DataTable with your data. Use the code below as a template and then
customize it as needed. Make sure to replace "YOUR_DATA" with the initial data
you want to pass into the DataTable.

```jsx
const [renderedRows, setRenderedRows] = useState(YOUR_DATA);

const handleTableFilter = (selectedCheckboxes) => {
  setRenderedRows([]);

  for (let i = 0; i < selectedCheckboxes.length; i++) {
    // Filter the items inside the rows list
    const filteredRows = YOUR_DATA.filter((row) => {
      return Object.values(row).some((value) =>
        String(value)
          .toLowerCase()
          .includes(selectedCheckboxes[i].toLowerCase())
      );
    });

    setRenderedRows((prevData) => {
      // Filter out duplicate rows
      const uniqueRows = filteredRows.filter((row) => {
        return !prevData.some((prevRow) => {
          return Object.keys(row).every((key) => {
            return row[key] === prevRow[key];
          });
        });
      });
      return [...prevData, ...uniqueRows];
    });
  }
};

const handleOnResetFilter = () => {
  setRenderedRows(rows);
};
```

Finally, pass the array of rows from the `useState` into the DataTable.

```jsx
<DataTable rows={renderedRows} headers={headers}>
  // ...
</DataTable>
```

## Batch actions

You can combine batch actions with the `DataTable` component to allow the user
to perform a single action on multiple selected rows. To do this, you can use
the following components:

- `TableToolbar`
- `TableToolbarAction`
- `TableToolbarSearch`
- `TableBatchActions`
- `TableBatchAction`
- `TableSelectAll`
- `TableSelectRow`

  <Canvas id="components-datatable-batch-actions--default" />

_Note: press "Show code" above to view a code snippet of this example_

## Toolbar

<Canvas id="components-datatable-toolbar--default" />

### Overflow Menu

An overflow menu can be added to the toolbar table. To add an overflow menu,
simply add a `TableCell` with the class `cds--table-column-menu` (replace the
prefix if you have added a custom prefix). Then add the overflow menu into the
cell.

```jsx
<TableBody>
  {rows.map((row) => (
    <TableRow {...getRowProps({ row })}>
      {row.cells.map((cell) => (
        <TableCell {...getCellProps({ cell })}>{cell.value}</TableCell>
      ))}
      <TableCell className="cds--table-column-menu">
        <OverflowMenu size="sm" flipped>
          <OverflowMenuItem>Action 1</OverflowMenuItem>
          <OverflowMenuItem>Action 2</OverflowMenuItem>
          <OverflowMenuItem>Action 3</OverflowMenuItem>
        </OverflowMenu>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
```

## Text Wrapping Alignment

DataTable provides an experimental `experimentalAutoAlign` prop that you may opt
into to have the table automatically align contents to the top when at least one
table cell content is being wrapped on the table. Keep in mind this feature is
experimental and might not be performant in tables with large datasets.

### Table with `experimentalAutoAlign = true`

<div style={{ width: '300px' }}>
  <Table experimentalAutoAlign>
    <TableHead>
      <TableRow>
        <TableHeader>Header1</TableHeader>
        <TableHeader>Header2</TableHeader>
        <TableHeader>Header3</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Wrapping content</TableCell>
        <TableCell>content</TableCell>
        <TableCell>content</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>

```jsx
<div style={{ width: '300px' }}>
  <Table experimentalAutoAlign>
    <TableHead>
      <TableRow>
        <TableHeader>Header1</TableHeader>
        <TableHeader>Header2</TableHeader>
        <TableHeader>Header3</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Wrapping content</TableCell>
        <TableCell>content</TableCell>
        <TableCell>content</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

### Table with `experimentalAutoAlign = false`

<div style={{ width: '300px' }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableHeader>Header1</TableHeader>
        <TableHeader>Header2</TableHeader>
        <TableHeader>Header3</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Wrapping content</TableCell>
        <TableCell>content</TableCell>
        <TableCell>content</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>

```jsx
<div style={{ width: '300px' }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableHeader>Header1</TableHeader>
        <TableHeader>Header2</TableHeader>
        <TableHeader>Header3</TableHeader>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Wrapping content</TableCell>
        <TableCell>content</TableCell>
        <TableCell>content</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

## Accessibility Considerations

### Accessible Name

To comply with accessibility requirements, make sure to supply the component
with an accessible name by providing either the `aria-label`, `aria-labelledby`
or `title` attribute to the `Table` component. Read more on the accessible
naming rule
[here](https://able.ibm.com/rules/archives/latest/doc/en-US/aria_accessiblename_exists.html).

## Props

<ArgTypes />

### Render function

The `DataTable` component uses a render function passed via the `children` prop
to give you full control over how your table is rendered, while Carbon manages
internal state like sorting, filtering, selection, and expansion.

The function you provide to the `children` prop receives a render props object
with access to:

- [Prop getters](#prop-getters)
- [Actions](#actions)
- [State](#state)

#### Prop getters

These functions must be applied to the corresponding components to enable
built-in functionality like sorting, selection, and expansion.

| Getter                   | Description                                                       |
| ------------------------ | ----------------------------------------------------------------- |
| `getBatchActionProps`    | Returns props for the batch action toolbar.                       |
| `getCellProps`           | Returns props for a cell.                                         |
| `getExpandedRowProps`    | Returns props for an expanded row.                                |
| `getExpandHeaderProps`   | Returns props for the expand-all header cell.                     |
| `getHeaderProps`         | Returns props for a header.                                       |
| `getRowProps`            | Returns props for a row.                                          |
| `getSelectionProps`      | Returns props for row-level or header-level selection checkboxes. |
| `getTableContainerProps` | Returns props for the table container.                            |
| `getTableProps`          | Returns props for the table.                                      |
| `getToolbarProps`        | Returns props for the toolbar.                                    |

For full details on the arguments and returned values of these getters, refer to
the `DataTableRenderProps` type in the
[source code](https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/DataTable/DataTable.tsx).

#### Actions

These functions allow you to programmatically update the table's internal state.

| Action          | Description                               |
| --------------- | ----------------------------------------- |
| `expandAll`     | Toggles expansion for all rows.           |
| `expandRow`     | Toggles expansion for a row.              |
| `onInputChange` | Updates the table's filter/search string. |
| `selectAll`     | Selects or deselects all rows.            |
| `selectRow`     | Toggles selection for a row.              |
| `sortBy`        | Sorts the table by a header key.          |

#### State

These values represent the internal table state, useful for custom logic or
conditional rendering.

| Property       | Description                                            |
| -------------- | ------------------------------------------------------ |
| `headers`      | Headers to render.                                     |
| `radio`        | Whether the table is in single-selection (radio) mode. |
| `rows`         | Rows to render (after filtering and sorting).          |
| `selectedRows` | Selected rows.                                         |

#### Example

```jsx
<DataTable headers={headers} isSortable rows={rows}>
  {({
    getCellProps,
    getHeaderProps,
    getRowProps,
    getSelectionProps,
    getTableProps,
    headers,
    rows,
  }) => (
    <Table {...getTableProps()}>
      <TableHead>
        <TableRow>
          <TableSelectAll {...getSelectionProps()} />
          {headers.map((header) => (
            <TableHeader {...getHeaderProps({ header })}>
              {header.header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow {...getRowProps({ row })}>
            <TableSelectRow {...getSelectionProps({ row })} />
            {row.cells.map((cell) => (
              <TableCell {...getCellProps({ cell })}>{cell.value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )}
</DataTable>
```

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/DataTable/DataTable.mdx).



File: DataTable/tools/sorting.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getCellId } from './cells';
import { sortStates, type DataTableSortState } from '../state/sortStates';

/**
 * Compare two values to determine their order. If both values have the same
 * type, the default sort algorithm will be used for those types. Otherwise, the
 * values will be converted to strings for comparison.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
export const compare = (a: any, b: any, locale = 'en') => {
  // prevent multiple null values in one column (sorting breaks)
  if (a === null) a = '';
  if (b === null) b = '';

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  if (typeof a === 'string' && typeof b === 'string') {
    return compareStrings(a, b, locale);
  }

  const aChild = a?.props?.children;
  const bChild = b?.props?.children;

  if (typeof aChild === 'string' && typeof bChild === 'string') {
    return compareStrings(aChild, bChild, locale);
  }

  return compareStrings(String(a), String(b), locale);
};

/**
 * Compares two strings using `localeCompare`.
 *
 * Note: Uses numeric comparison if strings are numeric.
 */
const compareStrings = (a: string, b: string, locale = 'en') => {
  const isNumeric = !isNaN(parseFloat(a)) && !isNaN(parseFloat(b));

  return a.localeCompare(b, locale, { numeric: isNumeric });
};

interface Cell {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  value: any;
}

// TODO: Should `SortRowParams` in
// packages/react/src/components/DataTable/state/sorting.ts be used here?
interface SortRowParams {
  key: string;
  sortDirection: DataTableSortState;
  sortStates: Record<DataTableSortState, DataTableSortState>;
  locale: string;
  compare: typeof compare;
  rowIds: string[];
}

interface SortRowsConfig {
  rowIds: string[];
  cellsById: Record<string, Cell>;
  key: string;
  sortDirection: DataTableSortState;
  locale?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  sortRow?: (cellA: any, cellB: any, params: SortRowParams) => number;
}

/**
 * Sorts table rows based on the provided column key and direction.
 */
export const sortRows = ({
  rowIds,
  cellsById,
  sortDirection,
  key,
  locale = 'en',
  sortRow = defaultSortRow,
}: SortRowsConfig) =>
  rowIds.slice().sort((a, b) => {
    const cellA = cellsById[getCellId(a, key)];
    const cellB = cellsById[getCellId(b, key)];
    return sortRow(cellA?.value, cellB?.value, {
      key,
      sortDirection,
      sortStates,
      locale,
      compare,
      rowIds: [a, b],
    });
  });

/**
 * Sorts table rows based on the sort direction.
 */
export const defaultSortRow = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  cellA: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  cellB: any,
  {
    sortDirection,
    sortStates,
    locale,
  }: Pick<SortRowParams, 'locale' | 'sortDirection' | 'sortStates'>
) => {
  if (sortDirection === sortStates.ASC) {
    return compare(cellA, cellB, locale);
  }

  return compare(cellB, cellA, locale);
};



File: DataTable/tools/__tests__/cells-test.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getCellId } from '../cells';

describe('getCellId', () => {
  it('should return a string for the given rowId and header', () => {
    expect(getCellId('a', 'header')).toBe('a:header');
  });

  it('should handle empty strings for both `rowId` and `header`', () => {
    expect(getCellId('', '')).toBe(':');
  });

  it('should handle special characters in `rowId` and `header`', () => {
    expect(getCellId('row@1', 'head#2')).toBe('row@1:head#2');
  });

  it('should handle numeric strings', () => {
    expect(getCellId('123', '456')).toBe('123:456');
  });

  it('should handle long strings', () => {
    const longRowId = 'ö'.repeat(1000000);
    const longHeader = 'ŵ'.repeat(1000000);

    expect(getCellId(longRowId, longHeader)).toBe(`${longRowId}:${longHeader}`);
  });
});



File: DataTable/tools/__tests__/filter-test.js


/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defaultFilterRows } from '../filter';

describe('defaultFilterRows', () => {
  const getCellId = (rowId, key) => `${rowId}-${key}`;

  const headers = [{ key: 'name' }, { key: 'age' }, { key: 'active' }];
  const cellsById = {
    '1-name': { value: 'Alice' },
    '1-age': { value: 30 },
    '1-active': { value: true },
    '2-name': { value: 'Bob' },
    '2-age': { value: 40 },
    '2-active': { value: false },
    '3-name': { value: 'Charlie' },
    '3-age': { value: 25 },
    '3-active': { value: true },
  };
  const rowIds = ['1', '2', '3'];
  const defaultOptions = {
    rowIds,
    headers,
    cellsById,
    inputValue: '',
    getCellId,
  };

  it('should filter rows by name', () => {
    const result = defaultFilterRows({
      ...defaultOptions,
      inputValue: 'ali',
    });

    expect(result).toEqual(['1']);
  });

  it('should filter rows by number (coerced to string)', () => {
    const result = defaultFilterRows({
      ...defaultOptions,
      inputValue: '40',
    });

    expect(result).toEqual(['2']);
  });

  it('should ignore boolean fields', () => {
    const result = defaultFilterRows({
      ...defaultOptions,
      inputValue: 'true',
    });

    expect(result).toEqual([]);
  });

  it('should perform a case-insensitive search', () => {
    const result = defaultFilterRows({
      ...defaultOptions,
      inputValue: 'CHARLIE',
    });

    expect(result).toEqual(['3']);
  });

  it('should return an empty array when nothing matches', () => {
    const result = defaultFilterRows({
      ...defaultOptions,
      inputValue: 'xyz',
    });

    expect(result).toEqual([]);
  });

  it('should handle an empty `rowIds` array', () => {
    const result = defaultFilterRows({
      ...defaultOptions,
      rowIds: [],
      inputValue: 'alice',
    });

    expect(result).toEqual([]);
  });

  it('should handle a missing cell gracefully', () => {
    const incompleteCellsById = { '1-name': { value: 'Alice' } };

    const result = defaultFilterRows({
      ...defaultOptions,
      rowIds: ['1'],
      cellsById: incompleteCellsById,
      inputValue: 'alice',
    });

    expect(result).toEqual(['1']);
  });

  it('should return all rows if `inputValue` is empty or only whitespace', () => {
    const emptyResult = defaultFilterRows(defaultOptions);
    const whitespaceResult = defaultFilterRows({
      ...defaultOptions,
      inputValue: '   ',
    });

    expect(defaultOptions.inputValue).toEqual('');
    expect(emptyResult).toEqual(rowIds);
    expect(whitespaceResult).toEqual(rowIds);
  });
});



File: DataTable/tools/__tests__/__snapshots__/normalize-test.js.snap


// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`normalize should return a normalized map of cells by id 1`] = `
{
  "a:fieldA": {
    "errors": null,
    "hasAILabelHeader": false,
    "id": "a:fieldA",
    "info": {
      "header": "fieldA",
    },
    "isEditable": false,
    "isEditing": false,
    "isValid": true,
    "value": "fieldA",
  },
  "a:fieldB": {
    "errors": null,
    "hasAILabelHeader": false,
    "id": "a:fieldB",
    "info": {
      "header": "fieldB",
    },
    "isEditable": false,
    "isEditing": false,
    "isValid": true,
    "value": "fieldB",
  },
  "a:fieldC": {
    "errors": null,
    "hasAILabelHeader": false,
    "id": "a:fieldC",
    "info": {
      "header": "fieldC",
    },
    "isEditable": false,
    "isEditing": false,
    "isValid": true,
    "value": "fieldC",
  },
  "b:fieldA": {
    "errors": null,
    "hasAILabelHeader": false,
    "id": "b:fieldA",
    "info": {
      "header": "fieldA",
    },
    "isEditable": false,
    "isEditing": false,
    "isValid": true,
    "value": "fieldA",
  },
  "b:fieldB": {
    "errors": null,
    "hasAILabelHeader": false,
    "id": "b:fieldB",
    "info": {
      "header": "fieldB",
    },
    "isEditable": false,
    "isEditing": false,
    "isValid": true,
    "value": "fieldB",
  },
  "b:fieldC": {
    "errors": null,
    "hasAILabelHeader": false,
    "id": "b:fieldC",
    "info": {
      "header": "fieldC",
    },
    "isEditable": false,
    "isEditing": false,
    "isValid": true,
    "value": "fieldC",
  },
  "c:fieldA": {
    "errors": null,
    "hasAILabelHeader": false,
    "id": "c:fieldA",
    "info": {
      "header": "fieldA",
    },
    "isEditable": false,
    "isEditing": false,
    "isValid": true,
    "value": "fieldA",
  },
  "c:fieldB": {
    "errors": null,
    "hasAILabelHeader": false,
    "id": "c:fieldB",
    "info": {
      "header": "fieldB",
    },
    "isEditable": false,
    "isEditing": false,
    "isValid": true,
    "value": "fieldB",
  },
  "c:fieldC": {
    "errors": null,
    "hasAILabelHeader": false,
    "id": "c:fieldC",
    "info": {
      "header": "fieldC",
    },
    "isEditable": false,
    "isEditing": false,
    "isValid": true,
    "value": "fieldC",
  },
}
`;

exports[`normalize should return a normalized map of rows by id 1`] = `
{
  "a": {
    "cells": [
      "a:fieldA",
      "a:fieldB",
      "a:fieldC",
    ],
    "disabled": false,
    "id": "a",
    "isExpanded": false,
    "isSelected": false,
  },
  "b": {
    "cells": [
      "b:fieldA",
      "b:fieldB",
      "b:fieldC",
    ],
    "disabled": false,
    "id": "b",
    "isExpanded": false,
    "isSelected": false,
  },
  "c": {
    "cells": [
      "c:fieldA",
      "c:fieldB",
      "c:fieldC",
    ],
    "disabled": false,
    "id": "c",
    "isExpanded": false,
    "isSelected": false,
  },
}
`;

exports[`normalize should return an array of the row ids 1`] = `
[
  "a",
  "b",
  "c",
]
`;



File: DataTable/tools/__tests__/sorting-test.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { compare, defaultSortRow, sortRows } from '../sorting';
import { sortStates } from '../../state/sortStates';

describe('sortRows', () => {
  const rowIds = ['row2', 'row1'];
  const cellsById = {
    'row1:header1': { value: 'cell11' },
    'row2:header1': { value: 'cell21' },
  };

  it('should sort data in ascending order', () => {
    expect(
      sortRows({
        rowIds,
        cellsById,
        sortDirection: sortStates.ASC,
        key: 'header1',
        locale: 'en',
        sortRow: defaultSortRow,
      })
    ).toEqual(['row1', 'row2']);
  });

  it('should sort data in descending order', () => {
    expect(
      sortRows({
        rowIds,
        cellsById,
        sortDirection: sortStates.DESC,
        key: 'header1',
        locale: 'en',
        sortRow: defaultSortRow,
      })
    ).toEqual(['row2', 'row1']);
  });

  it('should return unsorted data if cells not found', () => {
    expect(
      sortRows({
        rowIds,
        cellsById,
        sortDirection: sortStates.ASC,
        key: 'header2',
        locale: 'en',
        sortRow: defaultSortRow,
      })
    ).toEqual(['row2', 'row1']);
  });

  it('should sort React elements correctly', () => {
    const reactCells1 = {
      'row1:header1': { value: { props: { children: 'Apple' } } },
      'row2:header1': { value: { props: { children: 'Banana' } } },
    };
    const reactCells2 = {
      'row1:header1': { value: { props: { children: 1000 } } },
      'row2:header1': { value: { props: { children: 'hmm' } } },
    };

    expect(
      sortRows({
        rowIds,
        cellsById: reactCells1,
        sortDirection: sortStates.ASC,
        key: 'header1',
        locale: 'en',
        sortRow: defaultSortRow,
      })
    ).toEqual(['row1', 'row2']);
    expect(
      sortRows({
        rowIds,
        cellsById: reactCells2,
        sortDirection: sortStates.ASC,
        key: 'header1',
        locale: 'en',
        sortRow: defaultSortRow,
      })
    ).toEqual(['row2', 'row1']);
  });

  it('should sort numeric strings as numbers', () => {
    const cells = {
      'row1:header1': { value: '10' },
      'row2:header1': { value: '2' },
    };

    expect(
      sortRows({
        rowIds,
        cellsById: cells,
        sortDirection: sortStates.ASC,
        key: 'header1',
        locale: 'en',
      })
    ).toEqual(['row2', 'row1']);
  });

  it('should handle a custom `sortRow` function', () => {
    const customSortRow = (a, b) => a.length - b.length;

    const customCells = {
      'row1:header1': { value: 'short' },
      'row2:header1': { value: 'longerstring' },
    };

    expect(
      sortRows({
        rowIds,
        cellsById: customCells,
        sortDirection: sortStates.ASC,
        key: 'header1',
        sortRow: customSortRow,
      })
    ).toEqual(['row1', 'row2']);
  });

  it('should maintain order for equal values', () => {
    const cells = {
      'row1:header1': { value: 'same' },
      'row2:header1': { value: 'same' },
    };

    expect(rowIds).toEqual(['row2', 'row1']);
    expect(
      sortRows({
        rowIds,
        cellsById: cells,
        sortDirection: sortStates.ASC,
        key: 'header1',
      })
    ).toEqual(['row2', 'row1']);
  });
});

describe('defaultSortRow', () => {
  it('should sort data in ascending order', () => {
    const sortProps = {
      sortDirection: sortStates.ASC,
      sortStates: sortStates,
      locale: 'en',
    };
    expect(defaultSortRow('a', 'b', sortProps)).toBeLessThan(0);
    expect(defaultSortRow('1', '2', sortProps)).toBeLessThan(0);
  });

  it('should sort data in descending order', () => {
    const sortProps = {
      sortDirection: sortStates.DESC,
      sortStates: sortStates,
      locale: 'en',
    };
    expect(defaultSortRow('a', 'b', sortProps)).toBeGreaterThan(0);
    expect(defaultSortRow('1', '2', sortProps)).toBeGreaterThan(0);
  });
});

describe('compare', () => {
  it('should treat null as empty string', () => {
    expect(compare(null, 'abc')).toEqual(-1);
    expect(compare(null, null)).toEqual(0);
    expect(compare('abc', null)).toEqual(1);
  });

  it('should compare numbers correctly', () => {
    expect(compare(10, 5)).toEqual(5);
    expect(compare(3, 3)).toEqual(0);
    expect(compare(1, 10)).toEqual(-9);
  });

  it('should compare mixed strings and numbers as strings', () => {
    expect(compare('5', 10)).toEqual(-1);
    expect(compare(20, '10')).toEqual(1);
  });

  it('should compare React elements whose `props.children` are strings', () => {
    const a = { props: { children: 'Apple' } };
    const b = { props: { children: 'Banana' } };

    expect(compare(a, b)).toEqual(-1);
  });

  it('should fallback to string comparison when `props.children` is not a string', () => {
    const a = { props: { children: 123 } };
    const b = { props: { children: 'banana' } };

    expect(compare(a, b)).toEqual(0);
  });

  it('should fallback to string comparison for non-matching types', () => {
    expect(compare({}, 1)).toEqual(-1);
    expect(compare(true, 'false')).toEqual(1);
  });

  it('should treat `undefined` as a string when comparing', () => {
    expect(compare(undefined, 'abc')).toEqual(1);
    expect(compare(undefined, undefined)).toEqual(0);
    expect(compare('abc', undefined)).toEqual(-1);
  });

  it('should use locale for string comparison', () => {
    expect(compare('ä', 'z', 'sv-SE')).toEqual(1);
    expect(compare('z', 'ä', 'sv-SE')).toEqual(-1);
    expect(compare('ä', 'z', 'en-US')).toEqual(-1);
    expect(compare('z', 'ä', 'en-US')).toEqual(1);
    expect(compare('ä', 'z', 'de-DE')).toEqual(-1);
    expect(compare('z', 'ä', 'de-DE')).toEqual(1);
  });

  it('should compare falsy values correctly', () => {
    expect(compare(false, true)).toEqual(-1);
    expect(compare(true, false)).toEqual(1);
    expect(compare(0, false)).toEqual(-1);
    expect(compare(false, 0)).toEqual(1);
    expect(compare(null, undefined)).toEqual(-1);
    expect(compare(undefined, null)).toEqual(1);
  });
});



File: DataTable/tools/__tests__/normalize-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import normalize from '../normalize';

describe('normalize', () => {
  let mockRows;
  let mockHeaders;

  beforeEach(() => {
    mockRows = [
      {
        id: 'a',
        fieldA: 'fieldA',
        fieldB: 'fieldB',
        fieldC: 'fieldC',
      },
      {
        id: 'b',
        fieldA: 'fieldA',
        fieldB: 'fieldB',
        fieldC: 'fieldC',
      },
      {
        id: 'c',
        fieldA: 'fieldA',
        fieldB: 'fieldB',
        fieldC: 'fieldC',
      },
    ];
    mockHeaders = [
      {
        key: 'fieldA',
        header: 'Field A',
      },
      {
        key: 'fieldB',
        header: 'Field B',
      },
      {
        key: 'fieldC',
        header: 'Field C',
      },
    ];
  });

  it('should return an object with normalized fields', () => {
    const result = normalize(mockRows, mockHeaders);
    expect(result.rowIds).toBeDefined();
    expect(result.rowsById).toBeDefined();
    expect(result.cellsById).toBeDefined();
  });

  it('should return an array of the row ids', () => {
    const { rowIds } = normalize(mockRows, mockHeaders);
    expect(rowIds).toMatchSnapshot();
  });

  it('should return a normalized map of rows by id', () => {
    const { rowsById } = normalize(mockRows, mockHeaders);
    expect(rowsById).toMatchSnapshot();
  });

  it('should return a normalized map of cells by id', () => {
    const { cellsById } = normalize(mockRows, mockHeaders);
    expect(cellsById).toMatchSnapshot();
  });
});



File: DataTable/tools/denormalize.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Counterpart to `normalize` for a collection of rows. This method unravels the
 * normalization step that we use to build the given parameters in order to
 * return a natural interface to working with rows for a consumer.
 *
 * The default heuristic here is to map through all the row ids and return the
 * value of the row for the given id, in addition to adding a `cells` key that
 * contains the results of mapping over the rows cells and getting individual
 * cell info.
 *
 * @param {Array<string>} rowIds array of row ids in the table
 * @param {object} rowsById object containing lookups for rows by id
 * @param {object} cellsById object containing lookups for cells by id
 */
const denormalize = (rowIds, rowsById, cellsById) => {
  return rowIds.map((id) => ({
    ...rowsById[id],
    cells: rowsById[id].cells.map((cellId) => cellsById[cellId]),
  }));
};

export default denormalize;



File: DataTable/tools/cells.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Generates a unique cell ID by combining the row ID and header.
 *
 * Generic helper used to consolidate all call sites for getting a cell ID into
 * one method.
 */
export const getCellId = (rowId: string, header: string) =>
  `${rowId}:${header}`;



File: DataTable/tools/filter.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Filters row IDs based on whether any of the cell values in the row include
 * the input value as a substring. Boolean cell values are ignored.
 */
export const defaultFilterRows = ({
  rowIds,
  headers,
  cellsById,
  inputValue,
  getCellId,
}: {
  /** Table row IDs. */
  rowIds: string[];
  /** Table headers. */
  headers: { key: string }[];
  /** Mapping of cell IDs to their corresponding cells. */
  cellsById: Record<string, { value: unknown }>;
  /** Input value to search for. */
  inputValue: string;
  /** Function that returns a cell ID given a row ID and a header. */
  getCellId: (rowId: string, header: string) => string;
}): string[] => {
  const normalizedInput = inputValue.trim().toLowerCase();

  if (!normalizedInput) return rowIds;

  return rowIds.filter((rowId) =>
    headers.some(({ key }) => {
      const cellId = getCellId(rowId, key);
      const cell = cellsById[cellId];

      if (typeof cell.value === 'boolean') return false;

      return String(cell.value).toLowerCase().includes(normalizedInput);
    })
  );
};



File: DataTable/tools/normalize.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AILabel } from '../../AILabel';
import { getCellId } from './cells';

/**
 * Normalize a collection of rows with the given headers.
 *
 * @param {Array<object>} rows
 * @param {Array<object>} headers
 * @returns {object}
 */
const normalize = (rows, headers, prevState = {}) => {
  const { rowsById: prevRowsByIds } = prevState;
  const rowIds = new Array(rows.length);
  const rowsById = {};
  const cellsById = {};

  rows.forEach((row, i) => {
    rowIds[i] = row.id;
    // Initialize the row info and state values, namely for selection and
    // expansion
    const {
      id,
      isSelected = false,
      isExpanded = false,
      disabled = false,
    } = row;
    rowsById[id] = {
      id,
      isSelected,
      isExpanded,
      disabled,
      cells: new Array(headers.length),
    };

    // If we have a previous state, and the row existed in that previous state,
    // then we'll set the state values of the row to the previous state values.
    if (prevRowsByIds && prevRowsByIds[row.id] !== undefined) {
      rowsById[row.id].isSelected = prevRowsByIds[row.id].isSelected;
      rowsById[row.id].isExpanded = prevRowsByIds[row.id].isExpanded;
    }

    headers.forEach(({ key, slug, decorator }, i) => {
      const id = getCellId(row.id, key);
      // Initialize the cell info and state values, namely for editing
      cellsById[id] = {
        id,
        value: row[key],
        isEditable: false,
        isEditing: false,
        isValid: true,
        errors: null,
        hasAILabelHeader: !!(slug || decorator?.type === AILabel),
        info: {
          header: key,
        },
      };

      // TODO: When working on inline edits, we'll need to derive the state
      // values similarly to rows above.

      rowsById[row.id].cells[i] = id;
    });
  });

  return {
    rowIds,
    rowsById,
    cellsById,
  };
};

export default normalize;



File: DataTable/TableToolbarContent.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import wrapComponent from '../../tools/wrapComponent';

const TableToolbarContent = wrapComponent({
  name: 'TableToolbarContent',
  type: 'div',
  className: (prefix) => `${prefix}--toolbar-content`,
});

export default TableToolbarContent;



File: DataTable/TableToolbarSearch.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  ChangeEvent,
  useRef,
  useState,
  useEffect,
  FocusEvent,
  ReactNode,
  RefObject,
} from 'react';
import Search, { SearchProps } from '../Search';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { noopFn } from '../../internal/noopFn';
import type { TFunc, TranslateWithId } from '../../types/common';

const translationIds = {
  'carbon.table.toolbar.search.label': 'carbon.table.toolbar.search.label',
  'carbon.table.toolbar.search.placeholder':
    'carbon.table.toolbar.search.placeholder',
} as const;

type TranslationKey = keyof typeof translationIds;

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['carbon.table.toolbar.search.label']]: 'Filter table',
  [translationIds['carbon.table.toolbar.search.placeholder']]: 'Filter table',
};

const defaultTranslateWithId: TFunc<TranslationKey> = (messageId) => {
  return defaultTranslations[messageId];
};

type ExcludedInheritedProps =
  | 'defaultValue'
  | 'labelText'
  | 'onBlur'
  | 'onChange'
  | 'onExpand'
  | 'onFocus'
  | 'tabIndex';

export type TableToolbarSearchHandleExpand = (
  event: FocusEvent<HTMLInputElement>,
  newValue?: boolean
) => void;

export interface TableToolbarSearchProps
  extends Omit<SearchProps, ExcludedInheritedProps>,
    TranslateWithId<TranslationKey> {
  /**
   * Specifies if the search should initially render in an expanded state
   */
  defaultExpanded?: boolean;

  /**
   * Provide an optional default value for the Search component
   */
  defaultValue?: string;

  /**
   * Specifies if the search should expand
   */
  expanded?: boolean;

  /**
   * Provide an optional label text for the Search component icon
   */
  labelText?: ReactNode;

  /**
   * Provide an optional function to be called when the search input loses focus, this will be
   * passed the event as the first parameter and a function to handle the expanding of the search
   * input as the second
   */
  onBlur?(
    event: FocusEvent<HTMLInputElement>,
    handleExpand: TableToolbarSearchHandleExpand
  ): void;

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange?: (
    event: '' | ChangeEvent<HTMLInputElement>,
    value?: string
  ) => void;

  /**
   * Provide an optional hook that is called each time the input is expanded
   */
  onExpand?(event: FocusEvent<HTMLInputElement>, newExpand: boolean): void;

  /**
   * Provide an optional function to be called when the search input gains focus, this will be
   * passed the event as the first parameter and a function to handle the expanding of the search
   * input as the second.
   */
  onFocus?(
    event: FocusEvent<HTMLInputElement>,
    handleExpand: TableToolbarSearchHandleExpand
  ): void;

  /**
   * Whether the search should be allowed to expand.
   */
  persistent?: boolean;

  /**
   * Provide an optional className for the overall container of the Search
   */
  searchContainerClass?: string;

  tabIndex?: number | string;
}

const TableToolbarSearch = ({
  className,
  searchContainerClass,
  onChange: onChangeProp,
  onClear = noopFn,
  translateWithId: t = defaultTranslateWithId,
  placeholder,
  labelText,
  expanded: expandedProp,
  defaultExpanded,
  defaultValue,
  disabled,
  onExpand,
  persistent = false,
  id,
  onBlur,
  onFocus,
  size = 'lg',
  tabIndex = '0',
  ...rest
}: TableToolbarSearchProps) => {
  const { current: controlled } = useRef(expandedProp !== undefined);

  const [expandedState, setExpandedState] = useState<boolean>(
    Boolean(defaultExpanded || defaultValue)
  );

  const expanded = controlled ? expandedProp : expandedState;
  const [value, setValue] = useState(defaultValue || '');
  const uniqueId = useId('table-toolbar-search');
  const [focusTarget, setFocusTarget] =
    useState<RefObject<HTMLElement | null> | null>(null);
  const prefix = usePrefix();

  useEffect(() => {
    if (focusTarget) {
      focusTarget.current?.querySelector?.('input')?.focus();
      setFocusTarget(null);
    }
  }, [focusTarget]);

  useEffect(
    () => {
      if (defaultValue) {
        onChangeProp?.('', defaultValue);
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const searchClasses = cx(className, {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    [searchContainerClass!]: searchContainerClass,
    [`${prefix}--toolbar-search-container-active`]: expanded,
    [`${prefix}--toolbar-search-container-disabled`]: disabled,
    [`${prefix}--toolbar-search-container-expandable`]: !persistent,
    [`${prefix}--toolbar-search-container-persistent`]: persistent,
  });

  const handleExpand = (
    event: FocusEvent<HTMLInputElement>,
    value = !expanded
  ) => {
    if (!disabled) {
      if (!controlled && !persistent) {
        setExpandedState(value);
      }
      if (onExpand) {
        onExpand(event, value);
      }
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
    if (onChangeProp) {
      onChangeProp(e, e.target.value);
    }
  };

  const handleOnFocus = (event: FocusEvent<HTMLInputElement>) =>
    handleExpand(event, true);
  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) =>
    !value && handleExpand(event, false);

  return (
    <Search
      disabled={disabled}
      className={searchClasses}
      value={value}
      id={typeof id !== 'undefined' ? id : uniqueId}
      labelText={labelText || t('carbon.table.toolbar.search.label')}
      placeholder={placeholder || t('carbon.table.toolbar.search.placeholder')}
      onChange={onChange}
      onClear={onClear}
      onFocus={
        onFocus ? (event) => onFocus(event, handleExpand) : handleOnFocus
      }
      onBlur={onBlur ? (event) => onBlur(event, handleExpand) : handleOnBlur}
      size={size}
      // HTMLAttributes defines tabIndex as number | undefined but in reality it
      // also accepts a string, so we cast here to convince Typescript this is okay.
      tabIndex={tabIndex as number | undefined}
      {...rest}
    />
  );
};

TableToolbarSearch.propTypes = {
  children: PropTypes.node,

  /**
   * Provide an optional class name for the search container
   */
  className: PropTypes.string,

  /**
   * Specifies if the search should initially render in an expanded state
   */
  defaultExpanded: PropTypes.bool,

  /**
   * Provide an optional default value for the Search component
   */
  defaultValue: PropTypes.string,

  /**
   * Specifies if the search should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specifies if the search should expand
   */
  expanded: PropTypes.bool,

  /**
   * Provide an optional id for the search container
   */
  id: PropTypes.string,

  /**
   * Provide an optional label text for the Search component icon
   */
  labelText: PropTypes.string,

  /**
   * Provide an optional function to be called when the search input loses focus, this will be
   * passed the event as the first parameter and a function to handle the expanding of the search
   * input as the second
   */
  onBlur: PropTypes.func,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func,

  /**
   * Optional callback called when the search value is cleared.
   */
  onClear: PropTypes.func,

  /**
   * Provide an optional hook that is called each time the input is expanded
   */
  onExpand: PropTypes.func,

  /**
   * Provide an optional function to be called when the search input gains focus, this will be
   * passed the event as the first parameter and a function to handle the expanding of the search
   * input as the second.
   */
  onFocus: PropTypes.func,

  /**
   * Whether the search should be allowed to expand
   */
  persistent: PropTypes.bool,

  /**
   * Provide an optional placeholder text for the Search component
   */
  placeholder: PropTypes.string,

  /**
   * Provide an optional className for the overall container of the Search
   */
  searchContainerClass: PropTypes.string,

  /**
   * Specify the size of the Search
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Optional prop to specify the tabIndex of the <Search> (in expanded state) or the container (in collapsed state)
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,
};

export default TableToolbarSearch;



File: DataTable/TableToolbarMenu.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Settings } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';
import OverflowMenu, { OverflowMenuProps } from '../OverflowMenu';

const defaultIconDescription = 'Settings';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- https://github.com/carbon-design-system/carbon/issues/20452
export interface TableToolbarMenuProps extends OverflowMenuProps {}

const TableToolbarMenu: React.FC<TableToolbarMenuProps> = ({
  className,
  renderIcon = Settings,
  iconDescription = defaultIconDescription,
  children,
  menuOptionsClass,
  ...rest
}) => {
  const prefix = usePrefix();
  const toolbarActionClasses = cx(
    className,
    `${prefix}--toolbar-action ${prefix}--overflow-menu`
  );
  const menuOptionsClasses = cx(
    menuOptionsClass,
    `${prefix}--toolbar-action__menu`
  );
  return (
    <OverflowMenu
      renderIcon={renderIcon}
      className={toolbarActionClasses}
      title={iconDescription}
      iconDescription={iconDescription}
      menuOptionsClass={menuOptionsClasses}
      flipped
      {...rest}>
      {children}
    </OverflowMenu>
  );
};

TableToolbarMenu.propTypes = {
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class name for the toolbar menu
   */
  className: PropTypes.string,

  /**
   * The description of the menu icon.
   */
  iconDescription: PropTypes.string,

  /**
   * Provide an optional class name for the toolbar menu
   */
  menuOptionsClass: PropTypes.string,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default TableToolbarMenu;



File: DataTable/TableExpandHeader.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChevronRight } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { type HTMLAttributes } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';
import { requiredIfGivenPropIsTruthy } from '../../prop-types/requiredIfGivenPropIsTruthy';

export type TableExpandHeaderPropsBase = {
  /**
   * Space separated list of one or more ID values referencing the TableExpandedRow(s) being controlled by the TableExpandHeader
   */
  ['aria-controls']?: string;

  /**
   * @deprecated This prop has been deprecated and will be
   * removed in the next major release of Carbon. Use the
   * `aria-label` prop instead.
   */
  ariaLabel?: string;

  /**
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  ['aria-label']?: string;

  /**
   * @deprecated The enableExpando prop is being replaced by `enableToggle`
   */
  enableExpando?: false | undefined;
  /**
   * Specify whether an expand all button should be displayed
   */
  enableToggle?: false | undefined;
  /**
   * The description of the chevron right icon, to be put in its SVG `<title>` element.
   */
  expandIconDescription?: string;
  /**
   * Specify whether this row is expanded or not. This helps coordinate data
   * attributes so that `TableExpandRow` and `TableExpandedRow` work together
   */
  isExpanded?: boolean;
  /**
   * Hook for when a listener initiates a request to expand the given row
   */
  onExpand?(event: React.MouseEvent<HTMLButtonElement>): void;
} & HTMLAttributes<HTMLTableCellElement>;

export type TableExpandHeaderPropsWithToggle = Omit<
  TableExpandHeaderPropsBase,
  'aria-label' | 'enableToggle' | 'onExpand'
> & {
  enableToggle: true;
  ['aria-label']: string;
  onExpand(event: React.MouseEvent<HTMLButtonElement>): void;
};

export type TableExpandHeaderPropsWithExpando = Omit<
  TableExpandHeaderPropsBase,
  'aria-label' | 'enableExpando' | 'onExpand'
> & {
  /**
   * @deprecated The enableExpando prop is being replaced by `enableToggle`
   */
  enableExpando: true;
  ['aria-label']: string;
  onExpand(event: React.MouseEvent<HTMLButtonElement>): void;
};

export type TableExpandHeaderProps =
  | TableExpandHeaderPropsWithToggle
  | TableExpandHeaderPropsWithExpando
  | TableExpandHeaderPropsBase;

const TableExpandHeader = ({
  ['aria-controls']: ariaControls,
  ['aria-label']: ariaLabel,
  ariaLabel: deprecatedAriaLabel,
  className: headerClassName,
  enableExpando,
  enableToggle,
  id = 'expand',
  isExpanded,
  onExpand,
  expandIconDescription,
  children,
  ...rest
}: TableExpandHeaderProps) => {
  const prefix = usePrefix();
  const className = cx(`${prefix}--table-expand`, headerClassName);
  const previousValue = isExpanded ? 'collapsed' : undefined;

  return (
    <th
      scope="col"
      className={className}
      data-previous-value={previousValue}
      id={id}
      {...rest}>
      {enableExpando || enableToggle ? (
        <button
          type="button"
          className={`${prefix}--table-expand__button`}
          onClick={onExpand}
          title={expandIconDescription}
          aria-label={deprecatedAriaLabel || ariaLabel}
          aria-expanded={isExpanded}
          aria-controls={ariaControls}>
          <ChevronRight
            className={`${prefix}--table-expand__svg`}
            aria-label={expandIconDescription}
          />
        </button>
      ) : null}
      {children}
    </th>
  );
};

TableExpandHeader.propTypes = {
  /**
   * Space separated list of one or more ID values referencing the TableExpandedRow(s) being controlled by the TableExpandHeader
   */
  ['aria-controls']: PropTypes.string,

  /**
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  ['aria-label']: PropTypes.string,

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  ariaLabel: PropTypes.string,

  children: PropTypes.node,

  className: PropTypes.string,

  /**
   * The enableExpando prop is being replaced by TableExpandHeader
   */
  enableExpando: deprecate(
    PropTypes.bool,
    'The `enableExpando` prop has been deprecated in favor of `enableToggle`. This prop will be removed in the next major release.'
  ),

  /**
   * Specify whether an expand all button should be displayed
   */
  enableToggle: PropTypes.bool,

  /**
   * The description of the chevron right icon, to be put in its SVG `<title>` element.
   */
  expandIconDescription: PropTypes.string,

  /**
   * Supply an id to the th element.
   */
  id: PropTypes.string,

  /**
   * Specify whether this row is expanded or not. This helps coordinate data
   * attributes so that `TableExpandRow` and `TableExpandedRow` work together
   */
  isExpanded: requiredIfGivenPropIsTruthy('enableToggle', PropTypes.bool),

  /**
   * Hook for when a listener initiates a request to expand the given row
   */
  onExpand: PropTypes.oneOfType([
    requiredIfGivenPropIsTruthy(
      'enableExpando',
      PropTypes.func
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    ) as PropTypes.Validator<any>,
    requiredIfGivenPropIsTruthy(
      'enableToggle',
      PropTypes.func
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    ) as PropTypes.Validator<any>,
  ]),
};

export default TableExpandHeader;



File: DataTable/TableSelectRow.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import InlineCheckbox from '../InlineCheckbox';
import RadioButton from '../RadioButton';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';

export interface TableSelectRowProps {
  /**
   * Specify a label to be read by screen readers on the containing textbox
   * node
   */
  ['aria-label']?: string;

  /**
   * @deprecated please use `aria-label` instead.
   * Specify a label to be read by screen readers on the containing textbox
   * node
   */
  ariaLabel?: string;

  /**
   * Specify whether this row is selected, or not
   */
  checked?: boolean;

  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className?: string;

  /**
   * Specify whether the control is disabled
   */
  disabled?: boolean;

  /**
   * Provide an `id` for the underlying input control
   */
  id: string;

  /**
   * Provide a `name` for the underlying input control
   */
  name: string;

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange?: (
    value: boolean,
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  /**
   * Provide a handler to listen to when a user initiates a selection request
   */
  onSelect: React.MouseEventHandler<HTMLInputElement>;

  /**
   * Specify whether the control should be a radio button or inline checkbox
   */
  radio?: boolean;
}

const TableSelectRow = ({
  ariaLabel: deprecatedAriaLabel,
  ['aria-label']: ariaLabel,
  checked,
  id,
  name,
  onSelect,
  onChange,
  disabled,
  radio,
  className,
}: TableSelectRowProps) => {
  const prefix = usePrefix();
  const uniqueNameId = useId();

  const handleRadioChange = onChange
    ? (
        value: string | number | undefined,
        name: string | undefined,
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        // Convert the radio value to boolean for consistency
        onChange(!!value, name || '', event);
      }
    : undefined;

  const handleCheckboxChange = onChange
    ? (
        checked: boolean,
        name: string,
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        onChange(checked, name, event);
      }
    : undefined;

  const selectionInputProps = {
    id,
    name: name ? name : uniqueNameId,
    onClick: onSelect,
    checked,
    disabled,
  };

  const labelValue = ariaLabel || deprecatedAriaLabel || '';
  const tableSelectRowClasses = classNames(`${prefix}--table-column-checkbox`, {
    ...(className && { [className]: true }),
    [`${prefix}--table-column-radio`]: radio,
  });
  return (
    <td className={tableSelectRowClasses} aria-live="off">
      {radio ? (
        <RadioButton
          {...selectionInputProps}
          labelText={labelValue}
          onChange={handleRadioChange}
          hideLabel={true}
        />
      ) : (
        <InlineCheckbox
          {...selectionInputProps}
          aria-label={labelValue}
          onChange={handleCheckboxChange}
        />
      )}
    </td>
  );
};
TableSelectRow.propTypes = {
  /**
   * Specify the aria label for the underlying input control
   */
  ['aria-label']: PropTypes.string,
  /**
   * Deprecated, please use `aria-label` instead.
   * Specify the aria label for the underlying input control
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'This prop syntax has been deprecated. Please use the new `aria-label`.'
  ),
  /**
   * Specify whether this row is selected, or not
   */
  checked: PropTypes.bool,

  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className: PropTypes.string,

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide an `id` for the underlying input control
   */
  id: PropTypes.string.isRequired,

  /**
   * Provide a `name` for the underlying input control
   */
  name: PropTypes.string.isRequired,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func,

  /**
   * Provide a handler to listen to when a user initiates a selection request
   */
  onSelect: PropTypes.func.isRequired,

  /**
   * Specify whether the control should be a radio button or inline checkbox
   */
  radio: PropTypes.bool,
};

export default TableSelectRow;



File: DataTable/TableExpandRow.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  Children,
  isValidElement,
  type HTMLAttributes,
  type MouseEventHandler,
  type PropsWithChildren,
} from 'react';
import { ChevronRight } from '@carbon/icons-react';
import TableCell from './TableCell';
import { usePrefix } from '../../internal/usePrefix';
import TableSlugRow from './TableSlugRow';
import TableDecoratorRow from './TableDecoratorRow';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';

/** Props shared between `TableRow` and `TableExpandRow`. */
export interface TableRowExpandInteropProps {
  /**
   * @deprecated Use `aria-label` instead.
   */
  ariaLabel?: string;
  /**
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  'aria-label'?: string;
  /**
   * Space separated list of one or more ID values referencing the TableExpandedRow(s) being controlled by the TableExpandRow
   */
  'aria-controls'?: string;
  /**
   * Specify whether this row is expanded or not. This helps coordinate data
   * attributes so that `TableExpandRow` and `TableExpandedRow` work together
   */
  isExpanded?: boolean;
  /**
   * Hook for when a listener initiates a request to expand the given row
   */
  onExpand?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Specify if the row is selected.
   */
  isSelected?: boolean;
  /**
   * The id of the matching th node in the table head. Addresses a11y concerns outlined here: https://www.ibm.com/able/guidelines/ci162/info_and_relationships.html and https://www.w3.org/TR/WCAG20-TECHS/H43
   */
  expandHeader?: string;
}

export interface TableExpandRowProps
  extends PropsWithChildren<
      Omit<HTMLAttributes<HTMLTableRowElement>, 'onClick'>
    >,
    Omit<TableRowExpandInteropProps, 'aria-label' | 'onExpand'> {
  /**
   * Space separated list of one or more ID values referencing the TableExpandedRow(s) being controlled by the TableExpandRow
   */
  'aria-controls'?: string;

  /**
   * @deprecated This prop has been deprecated and will be
   * removed in the next major release of Carbon. Use the
   * `aria-label` prop instead.
   */
  ariaLabel?: string;

  /**
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  'aria-label': string;

  /**
   * The id of the matching th node in the table head. Addresses a11y concerns outlined here: https://www.ibm.com/able/guidelines/ci162/info_and_relationships.html and https://www.w3.org/TR/WCAG20-TECHS/H43
   */
  expandHeader?: string;

  /**
   * The description of the chevron right icon, to be put in its SVG `<title>` element.
   */
  expandIconDescription?: string;

  /**
   * Specify whether this row is expanded or not. This helps coordinate data
   * attributes so that `TableExpandRow` and `TableExpandedRow` work together
   */
  isExpanded?: boolean;

  /**
   * Hook for when a listener initiates a request to expand the given row
   */
  onExpand: MouseEventHandler<HTMLButtonElement>;
}

const TableExpandRow = React.forwardRef(
  (
    {
      ['aria-controls']: ariaControls,
      ['aria-label']: ariaLabel,
      ariaLabel: deprecatedAriaLabel,
      className: rowClassName,
      children,
      isExpanded,
      onExpand,
      expandIconDescription,
      isSelected,
      expandHeader = 'expand',
      ...rest
    }: TableExpandRowProps,
    ref: React.Ref<HTMLTableCellElement>
  ) => {
    const prefix = usePrefix();

    // We need to put the AILabel and Decorator before the expansion arrow and all other table cells after the arrow.
    let rowHasAILabel;
    const decorator = Children.toArray(children).map((child) => {
      if (isComponentElement(child, TableSlugRow)) {
        if (child.props.slug) {
          rowHasAILabel = true;
        }

        return child;
      } else if (isComponentElement(child, TableDecoratorRow)) {
        if (isComponentElement(child.props.decorator, AILabel)) {
          rowHasAILabel = true;
        }

        return child;
      }
    });

    const normalizedChildren = Children.toArray(children).map((child) => {
      if (
        isValidElement(child) &&
        child.type !== TableSlugRow &&
        child.type !== TableDecoratorRow
      ) {
        return child;
      }
    });

    const className = cx(
      {
        [`${prefix}--parent-row`]: true,
        [`${prefix}--expandable-row`]: isExpanded,
        [`${prefix}--data-table--selected`]: isSelected,
        [`${prefix}--data-table--slug-row ${prefix}--data-table--ai-label-row`]:
          rowHasAILabel,
      },
      rowClassName
    );
    const previousValue = isExpanded ? 'collapsed' : undefined;

    return (
      <tr {...rest} ref={ref as never} className={className} data-parent-row>
        {decorator}
        <TableCell
          className={`${prefix}--table-expand`}
          data-previous-value={previousValue}
          headers={expandHeader}>
          <button
            type="button"
            className={`${prefix}--table-expand__button`}
            onClick={onExpand}
            title={expandIconDescription}
            aria-label={deprecatedAriaLabel || ariaLabel}
            aria-expanded={isExpanded}
            aria-controls={ariaControls}>
            <ChevronRight
              className={`${prefix}--table-expand__svg`}
              aria-label={expandIconDescription}
            />
          </button>
        </TableCell>
        {normalizedChildren}
      </tr>
    );
  }
);

TableExpandRow.propTypes = {
  /**
   * Space separated list of one or more ID values referencing the TableExpandedRow(s) being controlled by the TableExpandRow
   * TODO: make this required in v12
   */
  'aria-controls': PropTypes.string,

  /**
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  /**@ts-ignore*/
  'aria-label': PropTypes.string,

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  ariaLabel: PropTypes.string,

  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * The id of the matching th node in the table head. Addresses a11y concerns outlined here: https://www.ibm.com/able/guidelines/ci162/info_and_relationships.html and https://www.w3.org/TR/WCAG20-TECHS/H43
   */
  expandHeader: PropTypes.string,

  /**
   * The description of the chevron right icon, to be put in its SVG `<title>` element.
   */
  expandIconDescription: PropTypes.string,

  /**
   * Specify whether this row is expanded or not. This helps coordinate data
   * attributes so that `TableExpandRow` and `TableExpandedRow` work together
   */
  isExpanded: PropTypes.bool,

  /**
   * Specify if the row is selected
   */
  isSelected: PropTypes.bool,

  /**
   * Hook for when a listener initiates a request to expand the given row
   */
  onExpand: PropTypes.func.isRequired,
};

TableExpandRow.displayName = 'TableExpandRow';
export default TableExpandRow;



File: DataTable/TableToolbarAction.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import OverflowMenuItem from '../OverflowMenuItem';

export interface TableToolbarActionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * Pass in the children that will be rendered inside the TableToolbarAction
   */
  children?: React.ReactNode;

  /**
   * onClick handler for the TableToolbarAction
   */
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const frFn = forwardRef<HTMLDivElement, TableToolbarActionProps>;

const TableToolbarAction = frFn((props, ref) => {
  const { children, ...rest } = props;

  return <OverflowMenuItem ref={ref} itemText={children} {...rest} />;
});

TableToolbarAction.displayName = 'TableToolbarAction';
TableToolbarAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default TableToolbarAction;



File: DataTable/TableDecoratorRow.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { cloneElement, type ReactNode } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';

export interface TableDecoratorRowProps {
  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className?: string;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `TableDecoratorRow` component
   */
  decorator?: ReactNode;
}

const TableDecoratorRow = ({
  className,
  decorator,
}: TableDecoratorRowProps) => {
  const prefix = usePrefix();
  const TableDecoratorRowClasses = classNames({
    ...(className && { [className]: true }),
    [`${prefix}--table-column-decorator`]: true,
    [`${prefix}--table-column-decorator--active`]: decorator,
  });

  const decoratorIsAILabel = isComponentElement(decorator, AILabel);
  const normalizedDecorator = decoratorIsAILabel
    ? cloneElement(decorator, { size: 'mini' })
    : null;

  return <td className={TableDecoratorRowClasses}>{normalizedDecorator}</td>;
};

TableDecoratorRow.displayName = 'TableDecoratorRow';
TableDecoratorRow.propTypes = {
  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className: PropTypes.string,

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `TableDecoratorRow` component
   */
  decorator: PropTypes.node,
};

export default TableDecoratorRow;



File: DataTable/Table.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useContext,
  PropsWithChildren,
  useRef,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { debounce } from 'es-toolkit/compat';
import { usePrefix } from '../../internal/usePrefix';
import { TableContext } from './TableContext';
import { useWindowEvent } from '../../internal/useEvent';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';

export interface TableProps {
  experimentalAutoAlign?: boolean;

  className?: string;

  /**
   * `false` If true, will apply sorting styles
   */
  isSortable?: boolean;

  /**
   * Specify whether the overflow menu (if it exists) should be shown always, or only on hover
   */
  overflowMenuOnHover?: boolean;

  /**
   *  Change the row height of table. Currently supports `xs`, `sm`, `md`, `lg`, and `xl`.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * `false` If true, will keep the header sticky (only data rows will scroll)
   */
  stickyHeader?: boolean;

  /**
   * If `true`, sets the table width to `auto` instead of `100%`.
   */
  useStaticWidth?: boolean;

  /**
   * `true` to add useZebraStyles striping.
   */
  useZebraStyles?: boolean;

  /**
   * Specify the table tabIndex
   */
  tabIndex?: number;
}

const isElementWrappingContent = (
  element: HTMLElement,
  context: CanvasRenderingContext2D
) => {
  if (element.children.length > 0) {
    return false;
  }
  const computedStyles = window.getComputedStyle(element);
  context.font = computedStyles.font
    ? computedStyles.font
    : `${computedStyles.fontSize}" "${computedStyles.fontFamily}`;

  const measuredText = context?.measureText(element.textContent ?? '');

  let textWidth = measuredText.width ?? 0;
  // account for letter spacing
  const letterSpacing = computedStyles.letterSpacing?.split('px');
  if (
    letterSpacing &&
    letterSpacing.length &&
    !isNaN(Number(letterSpacing[0]))
  ) {
    textWidth += Number(letterSpacing[0]) * (element.textContent?.length ?? 0);
  }
  // account for padding
  const paddingLeft = computedStyles.paddingLeft?.split('px');
  if (paddingLeft && paddingLeft.length && !isNaN(Number(paddingLeft[0]))) {
    textWidth += Number(paddingLeft[0]);
  }

  const paddingRight = computedStyles.paddingLeft?.split('px');
  if (paddingRight && paddingRight.length && !isNaN(Number(paddingRight[0]))) {
    textWidth += Number(paddingRight[0]);
  }
  // if measured textWidth is larger than the cell's width, then the content is being wrapped
  if (textWidth > element.getBoundingClientRect().width) {
    return true;
  }

  return false;
};

export const Table = ({
  className,
  children,
  useZebraStyles,
  size = 'lg',
  isSortable = false,
  useStaticWidth,
  stickyHeader,
  overflowMenuOnHover = true,
  experimentalAutoAlign = false,
  ...other
}: PropsWithChildren<TableProps>) => {
  const { titleId, descriptionId } = useContext(TableContext);
  const prefix = usePrefix();
  const tableRef = useRef<HTMLTableElement>(null);
  const componentClass = cx(`${prefix}--data-table`, className, {
    [`${prefix}--data-table--${size}`]: size,
    [`${prefix}--data-table--sort`]: isSortable,
    [`${prefix}--data-table--zebra`]: useZebraStyles,
    [`${prefix}--data-table--static`]: useStaticWidth,
    [`${prefix}--data-table--sticky-header`]: stickyHeader,
    [`${prefix}--data-table--visible-overflow-menu`]: !overflowMenuOnHover,
  });

  const toggleTableBodyAlignmentClass = useCallback(
    (alignTop = false) => {
      // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
      alignTop
        ? tableRef.current?.classList.add(
            `${prefix}--data-table--top-aligned-body`
          )
        : tableRef.current?.classList.remove(
            `${prefix}--data-table--top-aligned-body`
          );
    },
    [prefix]
  );

  const toggleTableHeaderAlignmentClass = useCallback(
    (alignTop = false) => {
      // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
      alignTop
        ? tableRef.current?.classList.add(
            `${prefix}--data-table--top-aligned-header`
          )
        : tableRef.current?.classList.remove(
            `${prefix}--data-table--top-aligned-header`
          );
    },
    [prefix]
  );

  const setTableAlignment = useCallback(() => {
    if (experimentalAutoAlign) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (tableRef.current && context) {
        const isBodyMultiline = Array.from(
          tableRef.current.querySelectorAll('td')
        ).some((td) => isElementWrappingContent(td, context));

        const isHeaderMultiline = Array.from(
          tableRef.current.querySelectorAll('th')
        ).some((th) => {
          const label = th.querySelector(`.${prefix}--table-header-label`);

          return (
            label && isElementWrappingContent(label as HTMLElement, context)
          );
        });

        toggleTableBodyAlignmentClass(isBodyMultiline);
        toggleTableHeaderAlignmentClass(isHeaderMultiline);
      }
    } else {
      toggleTableBodyAlignmentClass(false);
      toggleTableHeaderAlignmentClass(false);
    }
  }, [
    experimentalAutoAlign,
    toggleTableBodyAlignmentClass,
    toggleTableHeaderAlignmentClass,
    prefix,
  ]);

  const debouncedSetTableAlignment = debounce(setTableAlignment, 100);

  useWindowEvent('resize', debouncedSetTableAlignment);

  // recalculate table alignment once fonts have loaded
  if (
    typeof document !== 'undefined' &&
    document?.fonts?.status &&
    document.fonts.status !== 'loaded'
  ) {
    document.fonts.ready.then(() => {
      setTableAlignment();
    });
  }

  useIsomorphicEffect(() => {
    setTableAlignment();
  }, [setTableAlignment, size]);

  const table = (
    <div className={`${prefix}--data-table-content`}>
      <table
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        {...other}
        className={componentClass}
        ref={tableRef}>
        {children}
      </table>
    </div>
  );
  return stickyHeader ? (
    <section className={`${prefix}--data-table_inner-container`}>
      {table}
    </section>
  ) : (
    table
  );
};

Table.propTypes = {
  /**
   * Pass in the children that will be rendered within the Table
   */
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Experimental property. Allows table to align cell contents to the top if there is text wrapping in the content. Might have performance issues, intended for smaller tables
   */
  experimentalAutoAlign: PropTypes.bool,

  /**
   * `false` If true, will apply sorting styles
   */
  isSortable: PropTypes.bool,

  /**
   * Specify whether the overflow menu (if it exists) should be shown always, or only on hover
   */
  overflowMenuOnHover: PropTypes.bool,

  /**
   *  Change the row height of table. Currently supports `xs`, `sm`, `md`, `lg`, and `xl`.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),

  /**
   * `false` If true, will keep the header sticky (only data rows will scroll)
   */
  stickyHeader: PropTypes.bool,

  /**
   * If `true`, sets the table width to `auto` instead of `100%`.
   */
  useStaticWidth: PropTypes.bool,

  /**
   * `true` to add useZebraStyles striping.
   */
  useZebraStyles: PropTypes.bool,

  /**
   * Specify the table tabIndex
   */
  tabIndex: PropTypes.number,
};

export default Table;



File: DataTable/TableBatchActions.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { type MouseEventHandler } from 'react';
import Button from '../Button';
import TableActionList from './TableActionList';
import { Text } from '../Text';
import { usePrefix } from '../../internal/usePrefix';
import type { TFunc, TranslateWithId } from '../../types/common';

const translationIds = {
  'carbon.table.batch.cancel': 'carbon.table.batch.cancel',
  'carbon.table.batch.items.selected': 'carbon.table.batch.items.selected',
  'carbon.table.batch.item.selected': 'carbon.table.batch.item.selected',
  'carbon.table.batch.selectAll': 'carbon.table.batch.selectAll',
} as const;

type TranslationKey = keyof typeof translationIds;

export type TableBatchActionsTranslationArgs = {
  totalSelected?: number;
  totalCount?: number;
};

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['carbon.table.batch.cancel']]: 'Cancel',
  [translationIds['carbon.table.batch.items.selected']]: 'items selected',
  [translationIds['carbon.table.batch.item.selected']]: 'item selected',
  [translationIds['carbon.table.batch.selectAll']]: 'Select all',
};

const defaultTranslateWithId: TFunc<
  TranslationKey,
  TableBatchActionsTranslationArgs
> = (messageId, args = { totalSelected: 0, totalCount: 0 }) => {
  const { totalSelected, totalCount } = args;

  switch (messageId) {
    case translationIds['carbon.table.batch.cancel']:
      return defaultTranslations[messageId];
    case translationIds['carbon.table.batch.selectAll']:
      return `${defaultTranslations[messageId]} (${totalCount})`;
    case translationIds['carbon.table.batch.items.selected']:
    case translationIds['carbon.table.batch.item.selected']:
      return `${totalSelected} ${defaultTranslations[messageId]}`;
  }
};

export interface TableBatchActionsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    TranslateWithId<TranslationKey, TableBatchActionsTranslationArgs> {
  /**
   * Provide elements to be rendered inside of the component.
   */
  children?: React.ReactNode;

  /**
   * Hook required to listen for when the user initiates a cancel request
   * through this component.
   */
  onCancel: MouseEventHandler<HTMLButtonElement>;

  /**
   * Hook to listen for when the user initiates a select all
   * request through this component. This _only_ controls the rendering
   * of the `Select All` button and does not include built in functionality
   */
  onSelectAll?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Boolean specifier for whether or not the batch action bar should be
   * displayed.
   */
  shouldShowBatchActions?: boolean;

  /**
   * Numeric representation of the total number of items selected in a table.
   * This number is used to derive the selection message.
   */
  totalSelected: number;

  /**
   * Numeric representation of the total number of items in a table.
   * This number is used in the select all button text
   */
  totalCount?: number;
}

const TableBatchActions = ({
  className,
  children,
  shouldShowBatchActions,
  totalSelected,
  totalCount,
  onCancel,
  onSelectAll,
  translateWithId: t = defaultTranslateWithId,
  ...rest
}: TableBatchActionsProps) => {
  const [isScrolling, setIsScrolling] = React.useState(false);
  const prefix = usePrefix();
  const batchActionsClasses = cx(
    {
      [`${prefix}--batch-actions`]: true,
      [`${prefix}--batch-actions--active`]: shouldShowBatchActions,
    },
    className
  );

  const batchSummaryClasses = cx(`${prefix}--batch-summary`, {
    [`${prefix}--batch-summary__scroll`]: isScrolling,
  });

  return (
    <div
      onScroll={() => {
        setIsScrolling(!isScrolling);
      }}
      aria-hidden={!shouldShowBatchActions}
      className={batchActionsClasses}
      {...rest}>
      <div className={batchSummaryClasses}>
        <p className={`${prefix}--batch-summary__para`}>
          <Text>
            {totalSelected > 1 || totalSelected === 0
              ? t('carbon.table.batch.items.selected', { totalSelected })
              : t('carbon.table.batch.item.selected', { totalSelected })}
          </Text>
        </p>
        {onSelectAll && (
          <>
            <span className={`${prefix}--batch-summary__divider`}>&#x7c;</span>
            <Button
              onClick={onSelectAll}
              tabIndex={shouldShowBatchActions ? 0 : -1}>
              {t('carbon.table.batch.selectAll', { totalCount })}
            </Button>
          </>
        )}
      </div>
      <TableActionList>
        {children}
        <Button
          className={`${prefix}--batch-summary__cancel`}
          tabIndex={shouldShowBatchActions ? 0 : -1}
          onClick={onCancel}>
          {t('carbon.table.batch.cancel')}
        </Button>
      </TableActionList>
    </div>
  );
};

TableBatchActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Hook required to listen for when the user initiates a cancel request
   * through this component
   */
  onCancel: PropTypes.func.isRequired,

  /**
   * Hook to listen for when the user initiates a select all
   * request through this component. This _only_ controls the rendering
   * of the `Select All` button and does not include built in functionality
   */
  onSelectAll: PropTypes.func,

  /**
   * Boolean specifier for whether or not the batch action bar should be
   * displayed
   */
  shouldShowBatchActions: PropTypes.bool,

  /**
   * Numeric representation of the total number of items in a table.
   * This number is used in the select all button text
   */
  totalCount: PropTypes.number,

  /**
   * Numeric representation of the total number of items selected in a table.
   * This number is used to derive the selection message
   */
  totalSelected: PropTypes.number.isRequired,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,
};

export default TableBatchActions;



File: DataTable/index.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  DataTable,
  type DataTableCell,
  type DataTableHeader,
  type DataTableProps,
  type DataTableRenderProps,
  type DataTableRow,
  type DataTableSize,
} from './DataTable';
import Table from './Table';
import TableActionList from './TableActionList';
import TableBatchAction from './TableBatchAction';
import TableBatchActions from './TableBatchActions';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableContainer from './TableContainer';
import TableExpandHeader from './TableExpandHeader';
import TableDecoratorRow from './TableDecoratorRow';
import TableExpandRow from './TableExpandRow';
import TableExpandedRow from './TableExpandedRow';
import TableHead from './TableHead';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableSelectAll from './TableSelectAll';
import TableSelectRow from './TableSelectRow';
import TableSlugRow from './TableSlugRow';
import TableToolbar from './TableToolbar';
import TableToolbarAction from './TableToolbarAction';
import TableToolbarContent from './TableToolbarContent';
import TableToolbarSearch from './TableToolbarSearch';
import TableToolbarMenu from './TableToolbarMenu';
import type { DataTableSortState } from './state/sortStates';

export {
  DataTable,
  type DataTableCell,
  type DataTableHeader,
  type DataTableProps,
  type DataTableRenderProps,
  type DataTableSortState,
  type DataTableRow,
  type DataTableSize,
  Table,
  TableActionList,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableDecoratorRow,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableSlugRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
};

export default DataTable;



File: DataTable/state/sorting.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { sortStates, type DataTableSortState } from './sortStates';
import { sortRows } from '../tools/sorting';
import type { DataTableCell } from '../DataTable';

export interface SortRowParams {
  key: string;
  sortDirection: DataTableSortState;
  sortStates: Record<DataTableSortState, DataTableSortState>;
  locale: string;
  compare: (a: string | number, b: string | number, locale?: string) => number;
}

export type SortRowFn = (
  cellA: any, // eslint-disable-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  cellB: any, // eslint-disable-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  options: SortRowParams
) => number;

interface Props {
  locale?: string;
  sortRow?: SortRowFn;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
interface State<ColTypes extends any[]> {
  rowIds: string[];
  cellsById: Record<string, DataTableCell<ColTypes[number]>>;
  initialRowOrder: string[];
  sortHeaderKey: string | null;
  sortDirection: DataTableSortState;
}

export const initialSortState = sortStates.NONE;

/**
 * Gets the next sort direction for a header.
 *
 * @param prevHeader - Key of the previously sorted header.
 * @param currentHeader - Key of the currently selected header.
 * @param prevState - Previous sort direction.
 */
export const getNextSortDirection = (
  prevHeader: string,
  currentHeader: string,
  prevState: DataTableSortState
): DataTableSortState => {
  // Cycle for sorting the same header: NONE -> ASC -> DESC -> NONE.
  if (prevHeader === currentHeader) {
    switch (prevState) {
      case sortStates.NONE:
        return sortStates.ASC;
      case sortStates.ASC:
        return sortStates.DESC;
      case sortStates.DESC:
        return sortStates.NONE;
    }
  }

  // Sorting a new header starts at ascending order.
  return sortStates.ASC;
};

/**
 * Gets the next sort state.
 *
 * @param props - Component props.
 * @param state - Current table state.
 * @param key - Header key to sort by.
 */
export const getNextSortState = <ColTypes extends any[]>( // eslint-disable-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  props: Props,
  state: State<ColTypes>,
  { key }: { key: string }
): Pick<State<ColTypes>, 'sortHeaderKey' | 'sortDirection' | 'rowIds'> => {
  const { sortDirection, sortHeaderKey } = state;

  const nextSortDirection = getNextSortDirection(
    key,
    sortHeaderKey ?? '',
    sortDirection
  );

  return getSortedState(props, state, key, nextSortDirection);
};

/**
 * Gets a sort state update.
 *
 * @param props - Component props.
 * @param state - Current state of the table.
 * @param key - Header key to sort by.
 * @param sortDirection - Sort direction to apply.
 */
export const getSortedState = <ColTypes extends any[]>( // eslint-disable-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  { locale, sortRow }: Props,
  { rowIds, cellsById, initialRowOrder }: State<ColTypes>,
  key: string,
  sortDirection: DataTableSortState
): Pick<State<ColTypes>, 'rowIds' | 'sortDirection' | 'sortHeaderKey'> => {
  const nextRowIds =
    sortDirection !== sortStates.NONE
      ? sortRows({
          rowIds,
          cellsById,
          sortDirection,
          key,
          locale,
          sortRow,
        })
      : initialRowOrder;

  return {
    sortHeaderKey: key,
    sortDirection,
    rowIds: nextRowIds,
  };
};



File: DataTable/state/__tests__/__snapshots__/sorting-test.js.snap


// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`sorting state sortStates should describe the available sort states 1`] = `
{
  "ASC": "ASC",
  "DESC": "DESC",
  "NONE": "NONE",
}
`;



File: DataTable/state/__tests__/sorting-test.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { sortStates } from '../sortStates';

describe('sorting state', () => {
  let sorting;
  let initialSortState;
  let getNextSortDirection;
  let getNextSortState;

  beforeEach(() => {
    jest.mock('../../tools/sorting', () => ({
      sortRows: jest.fn(() => ['b', 'a', 'c']),
    }));

    sorting = require('../sorting');
    initialSortState = sorting.initialSortState;
    getNextSortDirection = sorting.getNextSortDirection;
    getNextSortState = sorting.getNextSortState;
  });

  describe('sortStates', () => {
    it('should describe the available sort states', () => {
      expect(sortStates).toMatchSnapshot();
    });
  });

  describe('initialSortState', () => {
    it('should set the initial sort state to NONE', () => {
      expect(initialSortState).toBe(sortStates.NONE);
    });
  });

  describe('getNextSortDirection', () => {
    let mockHeaderA;
    let mockHeaderB;
    let mockPrevState;

    beforeEach(() => {
      mockHeaderA = 'a';
      mockHeaderB = 'b';
      mockPrevState = sortStates.NONE;
    });

    it('should default to ASC', () => {
      expect(
        getNextSortDirection(mockHeaderA, mockHeaderA, mockPrevState)
      ).toBe(sortStates.ASC);
    });

    it('should transition from ASC -> DESC -> NONE', () => {
      const nextState1 = getNextSortDirection(
        mockHeaderA,
        mockHeaderA,
        mockPrevState
      );
      const nextState2 = getNextSortDirection(
        mockHeaderA,
        mockHeaderA,
        nextState1
      );
      const nextState3 = getNextSortDirection(
        mockHeaderA,
        mockHeaderA,
        nextState2
      );
      const nextState4 = getNextSortDirection(
        mockHeaderA,
        mockHeaderA,
        nextState3
      );
      expect(nextState1).toBe(sortStates.ASC);
      expect(nextState2).toBe(sortStates.DESC);
      expect(nextState3).toBe(sortStates.NONE);
      expect(nextState4).toBe(sortStates.ASC);
    });

    it('should reset to ASC if the header changes', () => {
      const nextState1 = getNextSortDirection(
        mockHeaderA,
        mockHeaderA,
        mockPrevState
      );
      const nextState2 = getNextSortDirection(
        mockHeaderA,
        mockHeaderA,
        nextState1
      );
      const nextState3 = getNextSortDirection(
        mockHeaderA,
        mockHeaderB,
        nextState2
      );
      expect(nextState1).toBe(sortStates.ASC);
      expect(nextState2).toBe(sortStates.DESC);
      expect(nextState3).toBe(sortStates.ASC);
    });
  });

  describe('getNextSortState', () => {
    let mockProps;
    let mockState;

    beforeEach(() => {
      mockProps = {
        locale: 'en',
        sortRow: jest.fn(),
      };
      mockState = {
        rowIds: ['b', 'a', 'c'],
        initialRowOrder: ['a', 'b', 'c'],
        cellsById: {
          'a:a': {
            value: 'row-a:header-a',
          },
          'a:b': {
            value: 'row-a:header-b',
          },
          'a:c': {
            value: 'row-a:header-c',
          },
          'b:a': {
            value: 'row-b:header-a',
          },
          'b:b': {
            value: 'row-b:header-b',
          },
          'b:c': {
            value: 'row-b:header-c',
          },
        },
      };
    });

    it('should initialize in ASC order for the first header called', () => {
      const sortHeaderKey = 'a';
      expect(
        getNextSortState(mockProps, mockState, { key: sortHeaderKey })
      ).toEqual({
        sortHeaderKey,
        sortDirection: sortStates.ASC,
        rowIds: ['b', 'a', 'c'],
      });
    });

    it('should iterate through the sort order for the same header key', () => {
      const sortHeaderKey = 'a';
      const nextState1 = getNextSortState(mockProps, mockState, {
        key: sortHeaderKey,
      });
      const nextState2 = getNextSortState(
        mockProps,
        {
          ...mockState,
          ...nextState1,
        },
        {
          key: sortHeaderKey,
        }
      );
      const nextState3 = getNextSortState(
        mockProps,
        {
          ...mockState,
          ...nextState2,
        },
        {
          key: sortHeaderKey,
        }
      );
      expect(nextState1).toEqual({
        sortHeaderKey,
        sortDirection: sortStates.ASC,
        rowIds: ['b', 'a', 'c'],
      });
      expect(nextState2).toEqual({
        sortHeaderKey,
        sortDirection: sortStates.DESC,
        rowIds: ['b', 'a', 'c'],
      });
      expect(nextState3).toEqual({
        sortHeaderKey,
        sortDirection: sortStates.NONE,
        // Initial row order
        rowIds: ['a', 'b', 'c'],
      });
    });

    it('should sort without `sortRow` being provided', () => {
      const state = getNextSortState({ locale: 'en' }, mockState, { key: 'a' });

      expect(state.rowIds).toEqual(['b', 'a', 'c']);
    });

    it('should reset sort direction when a different header is sorted', () => {
      const state1 = getNextSortState(mockProps, mockState, { key: 'a' });
      const state2 = getNextSortState(
        mockProps,
        { ...mockState, ...state1 },
        { key: 'b' }
      );

      expect(state2.sortDirection).toBe(sortStates.ASC);
    });

    it('should handle empty `cellsById`', () => {
      const emptyState = { ...mockState, cellsById: {} };
      const state = getNextSortState(mockProps, emptyState, { key: 'a' });

      expect(state.rowIds).toEqual(['b', 'a', 'c']);
    });
  });
});



File: DataTable/state/__tests__/getDerivedStateFromProps-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import getDerivedStateFromProps from '../getDerivedStateFromProps';
import { defaultSortRow } from '../../tools/sorting';

describe('getDerivedStateFromProps', () => {
  it('uses prevState if available', () => {
    const prevState = { sortDirection: 'DESC', sortHeaderKey: 'mockKey' };
    const props = {
      rows: [],
      headers: [],
    };
    expect(getDerivedStateFromProps(props, prevState)).toEqual(
      expect.objectContaining(prevState)
    );
  });

  it('has default values if prevState is not available', () => {
    const props = {
      rows: [],
      headers: [],
    };
    expect(getDerivedStateFromProps(props, {})).toEqual(
      expect.objectContaining({
        sortDirection: 'NONE',
        sortHeaderKey: null,
      })
    );
  });

  describe('with previous state', () => {
    let mockProps;

    beforeEach(() => {
      mockProps = {
        rows: [
          {
            id: '1',
            sortField: 'b',
          },
          {
            id: '2',
            sortField: 'c',
          },
          {
            id: '0',
            sortField: 'a',
          },
        ],
        headers: [
          {
            key: 'sortField',
            header: 'Sort field',
          },
        ],
        sortRow: defaultSortRow,
        locale: 'en',
      };
    });

    it('should preserve the previous sort state', () => {
      const initialState = getDerivedStateFromProps(mockProps, {});
      expect(initialState.rowIds).toEqual(['1', '2', '0']);
      const prevState = {
        sortHeaderKey: 'sortField',
        sortDirection: 'ASC',
      };
      const nextState = getDerivedStateFromProps(mockProps, prevState);
      expect(nextState.rowIds).toEqual(['0', '1', '2']);
    });

    it('should preserve the previous filter state', () => {
      const initialState = getDerivedStateFromProps(mockProps, {});
      expect(initialState.filterInputValue).toBe(null);
      const prevState = {
        filterInputValue: 'a',
      };
      const nextState = getDerivedStateFromProps(mockProps, prevState);
      expect(nextState.filterInputValue).toBe('a');
    });

    it('should preserve the previous batch action state', () => {
      const initialState = getDerivedStateFromProps(mockProps, {});
      expect(initialState.shouldShowBatchActions).toBe(false);
      const prevState = {
        shouldShowBatchActions: true,
      };
      const nextState = getDerivedStateFromProps(mockProps, prevState);
      expect(nextState.shouldShowBatchActions).toBe(true);
    });
  });
});



File: DataTable/state/getDerivedStateFromProps.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { initialSortState, getSortedState } from './sorting';
import normalize from '../tools/normalize';

/**
 * Helper to derive the next state from the given props and the
 * prevState. Potential future-facing API hook for React v17.
 *
 * Currently, it's being used as a way to normalize the incoming data that we
 * are receiving for rows
 */
const getDerivedStateFromProps = (props, prevState) => {
  const { rowIds, rowsById, cellsById } = normalize(
    props.rows,
    props.headers,
    prevState
  );
  const state = {
    rowIds,
    rowsById,
    cellsById,
    sortDirection: prevState.sortDirection || initialSortState,
    sortHeaderKey: prevState.sortHeaderKey || null,
    // Copy over rowIds so the reference doesn't mutate the stored
    // `initialRowOrder`
    initialRowOrder: rowIds.slice(),
    filterInputValue: prevState.filterInputValue || null,

    // Optional state field to indicate whether a consumer should show a
    // batch actions menu
    shouldShowBatchActions: prevState.shouldShowBatchActions || false,
    // TODO: Investigate deleting this property when this util is ported to
    // TypeScript. The only reason it was added was to address a type error in
    // packages/react/src/components/DataTable/DataTable.tsx
    isExpandedAll: false,
  };

  if (prevState.sortDirection && prevState.sortHeaderKey) {
    const { rowIds } = getSortedState(
      props,
      state,
      prevState.sortHeaderKey,
      prevState.sortDirection
    );
    state.rowIds = rowIds;
  }

  state.isExpandedAll = state.rowIds.every((id) => {
    return state.rowsById[id].isExpanded === true;
  });

  return state;
};

export default getDerivedStateFromProps;



File: DataTable/state/sortStates.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type DataTableSortState = 'NONE' | 'DESC' | 'ASC';

/**
 * We currently support the following sorting states for DataTable headers,
 * namely: `NONE` for no sorting being applied, and then `DESC` and `ASC` for
 * the corresponding direction of the sorting order.
 */
export const sortStates: Record<DataTableSortState, DataTableSortState> = {
  NONE: 'NONE',
  DESC: 'DESC',
  ASC: 'ASC',
};



File: DataTable/TableContext.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from 'react';

interface TableContextType {
  titleId?: string;
  descriptionId?: string;
}

export const TableContext = createContext({
  titleId: undefined,
  descriptionId: undefined,
} as TableContextType);



File: DataTable/TableActionList.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import wrapComponent from '../../tools/wrapComponent';

const TableActionList = wrapComponent({
  name: 'TableActionList',
  type: 'div',
  className: (prefix) => `${prefix}--action-list`,
});

export default TableActionList;



File: DataTable/TableExpandedRow.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef, type HTMLAttributes } from 'react';
import TableCell from './TableCell';
import { usePrefix } from '../../internal/usePrefix';

export interface TableExpandedRowProps
  extends HTMLAttributes<HTMLTableRowElement> {
  /**
   * The width of the expanded row's internal cell
   */
  colSpan: number;
}

const TableExpandedRow = ({
  className: customClassName,
  children,
  colSpan,
  ...rest
}: TableExpandedRowProps) => {
  const rowRef = useRef<HTMLTableRowElement>(null);
  const prefix = usePrefix();
  const className = cx(`${prefix}--expandable-row`, customClassName);

  const toggleParentHoverClass = (eventType: 'enter' | 'leave') => {
    if (rowRef && rowRef.current && rowRef.current.previousElementSibling) {
      const parentNode = rowRef.current.previousElementSibling;
      if (eventType === 'enter') {
        parentNode.classList.add(`${prefix}--expandable-row--hover`);
      } else {
        parentNode.classList.remove(`${prefix}--expandable-row--hover`);
      }
    }
  };

  return (
    <tr
      ref={rowRef}
      onMouseEnter={() => toggleParentHoverClass('enter')}
      onMouseLeave={() => toggleParentHoverClass('leave')}
      {...rest}
      className={className}
      data-child-row>
      <TableCell colSpan={colSpan}>
        <div className={`${prefix}--child-row-inner-container`}>{children}</div>
      </TableCell>
    </tr>
  );
};

TableExpandedRow.propTypes = {
  /**
   * Pass in the contents for your TableExpandedRow
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * The width of the expanded row's internal cell
   */
  colSpan: PropTypes.number.isRequired,
};

export default TableExpandedRow;



File: DataTable/TableContainer.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { ReactNode, useMemo, type HTMLAttributes } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import { TableContext } from './TableContext';
import { Heading, Section } from '../Heading';

export interface TableContainerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Specify if the entire table has AI generated contents
   */
  aiEnabled?: boolean;
  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `TableContainer` component
   */
  decorator?: ReactNode;
  /**
   * Optional description text for the Table
   */
  description?: React.ReactNode;
  /**
   * Specify whether the table should have a sticky header
   */
  stickyHeader?: boolean;
  /**
   * If true, will use a width of 'fit-content' to match the inner table width
   */
  useStaticWidth?: boolean;
  /**
   * Provide a title for the Table
   */
  title?: React.ReactNode;
}

const TableContainer = ({
  aiEnabled,
  className,
  children,
  decorator,
  title,
  description,
  stickyHeader,
  useStaticWidth,
  ...rest
}: TableContainerProps) => {
  const baseId = useId('tc');
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;
  const prefix = usePrefix();
  const tableContainerClasses = cx(
    className,
    `${prefix}--data-table-container`,
    {
      [`${prefix}--data-table--max-width`]: stickyHeader,
      [`${prefix}--data-table-container--static`]: useStaticWidth,
      [`${prefix}--data-table-container--ai-enabled`]: aiEnabled,
    }
  );
  const value = useMemo(() => {
    return {
      titleId: title ? titleId : undefined,
      descriptionId: description ? descriptionId : undefined,
    };
  }, [title, description, titleId, descriptionId]);

  return (
    <TableContext.Provider value={value}>
      <Section {...rest} className={tableContainerClasses}>
        {(title || description || decorator) && (
          <div
            className={cx(`${prefix}--data-table-header`, {
              [`${prefix}--data-table-header__with-decorator`]: decorator,
              [`${prefix}--data-table-header__with-decorator--standalone`]:
                decorator && !title && !description,
            })}>
            {(title || description) && (
              <div className={`${prefix}--data-table-header__content`}>
                {title && (
                  <Heading
                    className={`${prefix}--data-table-header__title`}
                    id={titleId}>
                    {title}
                  </Heading>
                )}
                {description && (
                  <p
                    className={`${prefix}--data-table-header__description`}
                    id={descriptionId}>
                    {description}
                  </p>
                )}
              </div>
            )}
            {decorator && (
              <div className={`${prefix}--data-table-header__decorator`}>
                {decorator}
              </div>
            )}
          </div>
        )}
        {children}
      </Section>
    </TableContext.Provider>
  );
};

TableContainer.propTypes = {
  /**
   * Specify if the entire table has AI generated contents
   */
  aiEnabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `TableContainer` component
   */
  decorator: PropTypes.node,
  /**
   * Optional description text for the Table
   */
  description: PropTypes.node,

  /**
   * Specify whether the table should have a sticky header
   */
  stickyHeader: PropTypes.bool,

  /**
   * Provide a title for the Table
   */
  title: PropTypes.node,

  /**
   * If true, will use a width of 'fit-content' to match the inner table width
   */
  useStaticWidth: PropTypes.bool,
};

export default TableContainer;



File: DataTable/stories/DataTable-filtering.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from 'storybook/actions';
import React, { useState } from 'react';
import Button from '../../Button';
import DataTable, {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  TableBatchActions,
  TableBatchAction,
  TableSelectAll,
  TableSelectRow,
} from '..';
import { rows, headers } from './shared';
import mdx from '../DataTable.mdx';
import TableToolbarFilter from './examples/TableToolbarFilter';
import './datatable-story.scss';
import { Add, Download, Save, TrashCan } from '@carbon/icons-react';

export default {
  title: 'Components/DataTable/Filtering',
  component: DataTable,
  subcomponents: {
    TableToolbar,
    TableToolbarContent,
    TableToolbarSearch,
    TableToolbarMenu,
    TableToolbarAction,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
  },
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    useZebraStyles: {
      control: { type: 'boolean' },
    },
  },
  args: {
    size: 'lg',
    useZebraStyles: false,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  const [renderedRows, setRenderedRows] = useState(rows);

  const handleTableFilter = (selectedCheckboxes) => {
    setRenderedRows([]);

    for (let i = 0; i < selectedCheckboxes.length; i++) {
      // Filter the items inside the rows list
      const filteredRows = rows.filter((row) => {
        return Object.values(row).some((value) =>
          String(value)
            .toLowerCase()
            .includes(selectedCheckboxes[i].toLowerCase())
        );
      });

      setRenderedRows((prevData) => {
        // Filter out duplicate rows
        const uniqueRows = filteredRows.filter((row) => {
          return !prevData.some((prevRow) => {
            return Object.keys(row).every((key) => {
              return row[key] === prevRow[key];
            });
          });
        });
        return [...prevData, ...uniqueRows];
      });
    }
  };

  const handleOnResetFilter = () => {
    setRenderedRows(rows);
  };

  return (
    <DataTable rows={renderedRows} headers={headers} {...args}>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        onInputChange,
        getCellProps,
      }) => (
        <TableContainer title="DataTable" description="With filtering">
          <TableToolbar>
            <TableToolbarContent>
              {/* pass in `onInputChange` change here to make filtering work */}
              <TableToolbarSearch
                onChange={(evt, value) => {
                  action(`TableToolbarSearch - onChange ${value}`)(evt);
                  onInputChange(evt);
                }}
              />
              <TableToolbarFilter
                onApplyFilter={handleTableFilter}
                onResetFilter={handleOnResetFilter}
              />
              <TableToolbarMenu>
                <TableToolbarAction onClick={action('Action 1 Click')}>
                  Action 1
                </TableToolbarAction>
                <TableToolbarAction onClick={action('Action 2 Click')}>
                  Action 2
                </TableToolbarAction>
                <TableToolbarAction onClick={action('Action 3 Click')}>
                  Action 3
                </TableToolbarAction>
              </TableToolbarMenu>
              <Button onClick={action('Button click')}>Primary Button</Button>
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()} aria-label="sample table">
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell {...getCellProps({ cell })}>
                      {cell.value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
};



File: DataTable/stories/dynamic-content/story.scss


//
// Copyright IBM Corp. 2020, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

.demo-expanded-td td {
  padding-inline-start: 4rem;
}



File: DataTable/stories/dynamic-content/DataTable-dynamic-content.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import React from 'react';
import { TrashCan, Save, Download } from '@carbon/icons-react';
import { action } from 'storybook/actions';
import DataTable, {
  Table,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
} from '../..';
import { batchActionClick, headers } from '../shared';
import IconIndicator from '../../../IconIndicator';

const rows = [
  {
    id: 'a',
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    port: 3000,
    rule: 'Round robin',
    attached_groups: 'Kevin’s VM Groups',
    status: <IconIndicator kind="failed" label="Failed" />,
  },
  {
    id: 'b',
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: 443,
    rule: 'Round robin',
    attached_groups: 'Maureen’s VM Groups',
    status: <IconIndicator kind="in-progress" label="In progress" />,
  },
  {
    id: 'c',
    name: 'Load Balancer 2',
    protocol: 'HTTP',
    port: 80,
    rule: 'DNS delegation',
    attached_groups: 'Andrew’s VM Groups',
    status: <IconIndicator kind="succeeded" label="Succeeded" />,
  },
  {
    id: 'd',
    name: 'Load Balancer 6',
    protocol: 'HTTP',
    port: 3000,
    rule: 'Round robin',
    attached_groups: 'Marc’s VM Groups',
    status: <IconIndicator kind="failed" label="Failed" />,
  },
  {
    id: 'e',
    name: 'Load Balancer 4',
    protocol: 'HTTP',
    port: 443,
    rule: 'Round robin',
    attached_groups: 'Mel’s VM Groups',
    status: <IconIndicator kind="in-progress" label="In progress" />,
  },
  {
    id: 'f',
    name: 'Load Balancer 5',
    protocol: 'HTTP',
    port: 80,
    rule: 'DNS delegation',
    attached_groups: 'Ronja’s VM Groups',
    status: <IconIndicator kind="succeeded" label="Succeeded" />,
  },
];

export default {
  title: 'Components/DataTable/Dynamic',
  component: DataTable,
};

export const Default = (args) => {
  const insertInRandomPosition = (array, element) => {
    const index = Math.floor(Math.random() * (array.length + 1));
    return [...array.slice(0, index), element, ...array.slice(index)];
  };

  class DynamicRows extends React.Component {
    state = {
      rows,
      headers: headers,
      id: 0,
    };

    handleOnHeaderAdd = () => {
      const length = this.state.headers.length;
      const header = {
        key: `header_${length}`,
        header: `Header ${length}`,
      };

      this.setState((state) => {
        const rows = state.rows.map((row) => {
          return {
            ...row,
            [header.key]: header.header,
          };
        });
        return {
          rows,
          headers: state.headers.concat(header),
        };
      });
    };

    handleOnRowAdd = () => {
      this.setState((state) => {
        const { id: _id, rows } = state;
        const id = _id + 1;
        const row = {
          id: '' + id,
          name: `New Row ${id}`,
          protocol: 'HTTP',
          port: id * 100,
          rule: id % 2 === 0 ? 'Round robin' : 'DNS delegation',
          attached_groups: `Row ${id}'s VM Groups`,
          status: 'Starting',
        };

        state.headers
          .filter((header) => row[header.key] === undefined)
          .forEach((header) => {
            row[header.key] = header.header;
          });

        return {
          id,
          rows: insertInRandomPosition(rows, row),
        };
      });
    };

    render() {
      return (
        <DataTable
          {...args}
          rows={this.state.rows}
          headers={this.state.headers}>
          {({
            rows,
            headers,
            getExpandHeaderProps,
            getHeaderProps,
            getSelectionProps,
            getToolbarProps,
            getBatchActionProps,
            getRowProps,
            getExpandedRowProps,
            onInputChange,
            selectedRows,
            getTableProps,
            getTableContainerProps,
            getCellProps,
          }) => {
            const batchActionProps = getBatchActionProps();
            return (
              <TableContainer
                title="DataTable"
                description="Use the toolbar menu to add rows and headers"
                {...getTableContainerProps()}>
                <TableToolbar {...getToolbarProps()}>
                  <TableBatchActions {...getBatchActionProps()}>
                    <TableBatchAction
                      renderIcon={TrashCan}
                      iconDescription="Delete the selected rows"
                      onClick={batchActionClick(selectedRows)}
                      tabIndex={
                        batchActionProps.shouldShowBatchActions ? 0 : -1
                      }>
                      Delete
                    </TableBatchAction>
                    <TableBatchAction
                      renderIcon={Save}
                      iconDescription="Save the selected rows"
                      onClick={batchActionClick(selectedRows)}
                      tabIndex={
                        batchActionProps.shouldShowBatchActions ? 0 : -1
                      }>
                      Save
                    </TableBatchAction>
                    <TableBatchAction
                      renderIcon={Download}
                      iconDescription="Download the selected rows"
                      onClick={batchActionClick(selectedRows)}
                      tabIndex={
                        batchActionProps.shouldShowBatchActions ? 0 : -1
                      }>
                      Download
                    </TableBatchAction>
                  </TableBatchActions>
                  <TableToolbarContent
                    aria-hidden={batchActionProps.shouldShowBatchActions}>
                    <TableToolbarSearch
                      tabIndex={
                        batchActionProps.shouldShowBatchActions ? -1 : 0
                      }
                      onChange={onInputChange}
                    />
                    <TableToolbarMenu
                      tabIndex={
                        batchActionProps.shouldShowBatchActions ? -1 : 0
                      }>
                      <TableToolbarAction onClick={this.handleOnRowAdd}>
                        Add row
                      </TableToolbarAction>
                      <TableToolbarAction onClick={this.handleOnHeaderAdd}>
                        Add header
                      </TableToolbarAction>
                    </TableToolbarMenu>
                  </TableToolbarContent>
                </TableToolbar>
                <Table {...getTableProps()} aria-label="sample table">
                  <TableHead>
                    <TableRow>
                      <TableExpandHeader
                        aria-label="expand row"
                        {...getExpandHeaderProps()}
                      />
                      {args.radio ? (
                        <th scope="col" />
                      ) : (
                        <TableSelectAll {...getSelectionProps()} />
                      )}
                      {headers.map((header, i) => (
                        <TableHeader key={i} {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <React.Fragment key={row.id}>
                        <TableExpandRow {...getRowProps({ row })}>
                          <TableSelectRow {...getSelectionProps({ row })} />
                          {row.cells.map((cell) => (
                            <TableCell {...getCellProps({ cell })}>
                              {cell.value}
                            </TableCell>
                          ))}
                        </TableExpandRow>
                        <TableExpandedRow
                          colSpan={headers.length + 3}
                          className="demo-expanded-td"
                          {...getExpandedRowProps({ row })}>
                          <h6>Expandable row content</h6>
                          <div>Description here</div>
                        </TableExpandedRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            );
          }}
        </DataTable>
      );
    }
  }
  return <DynamicRows />;
};

Default.args = {
  size: 'lg',
  useStaticWidth: false,
  useZebraStyles: false,
  isSortable: false,
  locale: 'en',
  radio: false,
};

Default.argTypes = {
  size: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    description: 'Change the row height of table',
  },
  useStaticWidth: {
    control: 'boolean',
    description: 'If true, will use a width of "auto" instead of 100%',
  },
  useZebraStyles: {
    control: 'boolean',
    description: 'Add zebra striping to rows',
  },
  isSortable: {
    control: 'boolean',
    description: 'Specify if the rows are sortable',
  },
  locale: {
    description: 'Provide a string for the current locale',
  },
  radio: {
    description: 'Use radio-selection instead of multi-selection',
  },
};



File: DataTable/stories/DataTable-toolbar.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from 'storybook/actions';
import React from 'react';
import Button from '../../Button';
import OverflowMenu from '../../OverflowMenu';
import OverflowMenuItem from '../../OverflowMenuItem';
import {
  default as DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
} from '..';
import mdx from '../DataTable.mdx';
import { headers, rows } from './shared';

export default {
  title: 'Components/DataTable/Toolbar',
  component: DataTable,
  subcomponents: {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgTypes = {
  size: {
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    control: { type: 'select' },
  },
  useZebraStyles: {
    control: { type: 'boolean' },
  },
  isSortable: { control: { type: 'boolean' } },
  persistent: { control: { type: 'boolean' } },
};

export const Default = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getToolbarProps,
      onInputChange,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With toolbar"
        {...getTableContainerProps()}>
        <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
          <TableToolbarContent>
            <TableToolbarSearch onChange={onInputChange} />
            <TableToolbarMenu>
              <TableToolbarAction onClick={action('Action 1 Click')}>
                Action 1
              </TableToolbarAction>
              <TableToolbarAction onClick={action('Action 2 Click')}>
                Action 2
              </TableToolbarAction>
              <TableToolbarAction onClick={action('Action 3 Click')}>
                Action 3
              </TableToolbarAction>
            </TableToolbarMenu>
            <Button onClick={action('Button click')}>Primary Button</Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

Default.argTypes = { ...sharedArgTypes };

export const PersistentToolbar = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getToolbarProps,
      onInputChange,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With toolbar"
        {...getTableContainerProps()}>
        <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
          <TableToolbarContent>
            <TableToolbarSearch onChange={onInputChange} persistent />
            <TableToolbarMenu>
              <TableToolbarAction onClick={action('Action 1 Click')}>
                Action 1
              </TableToolbarAction>
              <TableToolbarAction onClick={action('Action 2 Click')}>
                Action 2
              </TableToolbarAction>
              <TableToolbarAction onClick={action('Action 3 Click')}>
                Action 3
              </TableToolbarAction>
            </TableToolbarMenu>
            <Button onClick={action('Button click')}>Primary Button</Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

PersistentToolbar.argTypes = { ...sharedArgTypes };

export const SmallPersistentToolbar = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getToolbarProps,
      onInputChange,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With toolbar"
        {...getTableContainerProps()}>
        <TableToolbar
          {...getToolbarProps()}
          aria-label="data table toolbar"
          size="sm">
          <TableToolbarContent>
            <TableToolbarSearch onChange={onInputChange} persistent size="sm" />
            <TableToolbarMenu size="sm">
              <TableToolbarAction onClick={action('Action 1 Click')}>
                Action 1
              </TableToolbarAction>
              <TableToolbarAction onClick={action('Action 2 Click')}>
                Action 2
              </TableToolbarAction>
              <TableToolbarAction onClick={action('Action 3 Click')}>
                Action 3
              </TableToolbarAction>
            </TableToolbarMenu>
            <Button onClick={action('Button click')}>Primary Button</Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table {...getTableProps()} size="sm" aria-label="sample table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

SmallPersistentToolbar.argTypes = { ...sharedArgTypes };

export const WithOverflowMenu = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getToolbarProps,
      onInputChange,
      getCellProps,
    }) => (
      <TableContainer title="DataTable" description="With overflow menu">
        <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
          <TableToolbarContent>
            <TableToolbarSearch onChange={onInputChange} />
            <TableToolbarMenu>
              <TableToolbarAction onClick={action('Action 1 Click')}>
                Action 1
              </TableToolbarAction>
              <TableToolbarAction onClick={action('Action 2 Click')}>
                Action 2
              </TableToolbarAction>
              <TableToolbarAction onClick={action('Action 3 Click')}>
                Action 3
              </TableToolbarAction>
            </TableToolbarMenu>
            <Button onClick={action('Button click')}>Primary Button</Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
              <TableHeader aria-label="overflow actions" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
                <TableCell className="cds--table-column-menu">
                  <OverflowMenu size="sm" flipped>
                    <OverflowMenuItem itemText="Stop app" />
                    <OverflowMenuItem itemText="Restart app" />
                    <OverflowMenuItem itemText="Rename app" />
                  </OverflowMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

WithOverflowMenu.argTypes = {
  ...sharedArgTypes,
  overflowMenuOnHover: {
    control: { type: 'boolean' },
  },
};



File: DataTable/stories/DataTable-ai-label.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DataTable, {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableSlugRow,
  TableDecoratorRow,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
} from '..';
import { rows, headers } from './shared';
import mdx from '../../AILabel/AILabelDataTable.mdx';
import Button from '../../Button';
import { IconButton } from '../../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import { AILabel, AILabelContent, AILabelActions } from '../../AILabel';
import './datatable-story.scss';

export default {
  title: 'Components/DataTable/WithAILabel',
  component: DataTable,
  subcomponents: {
    TableSelectAll,
    TableSelectRow,
    TableSlugRow,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: [
        'filterRows',
        'headers',
        'isSortable',
        'overflowMenuOnHover',
        'radio',
        'rows',
        'translateWithId',
        'sortRow',
      ],
    },
  },
};

const columnAILabelHeaders = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'protocol',
    header: 'Protocol',
  },
  {
    key: 'port',
    header: 'Port',
  },
  {
    key: 'rule',
    header: 'Rule',
  },
  {
    key: 'attached_groups',
    header: 'Attached groups',
    decorator: (
      <AILabel
        className="ai-label-container"
        autoAlign={false}
        align="bottom-right">
        <AILabelContent>
          <div>
            <p className="secondary">AI Explained</p>
            <h2 className="ai-label-heading">84%</h2>
            <p className="secondary bold">Confidence score</p>
            <p className="secondary">
              Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut fsil labore et dolore magna
              aliqua.
            </p>
            <hr />
            <p className="secondary">Model type</p>
            <p className="bold">Foundation model</p>
          </div>
          <AILabelActions>
            <IconButton kind="ghost" label="View">
              <View />
            </IconButton>
            <IconButton kind="ghost" label="Open Folder">
              <FolderOpen />
            </IconButton>
            <IconButton kind="ghost" label="Folders">
              <Folders />
            </IconButton>
            <Button>View details</Button>
          </AILabelActions>
        </AILabelContent>
      </AILabel>
    ),
  },
  {
    key: 'status',
    header: 'Status',
  },
];

const aiLabel = (
  <AILabel className="ai-label-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h2 className="ai-label-heading">84%</h2>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <AILabelActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View details</Button>
      </AILabelActions>
    </AILabelContent>
  </AILabel>
);

export const AILabelWithSelection = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getTableProps,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With selection"
        {...getTableContainerProps()}>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              <th scope="col" />
              <TableSelectAll {...getSelectionProps()} />
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow {...getRowProps({ row })}>
                {i === 3 || i === 4 || i === 1 ? (
                  <TableDecoratorRow decorator={aiLabel} />
                ) : (
                  <TableCell />
                )}
                <TableSelectRow {...getSelectionProps({ row })} />
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const AILabelWithRadioSelection = (args) => (
  <DataTable rows={rows} headers={headers} radio {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getTableProps,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With radio selection"
        {...getTableContainerProps()}>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              <th scope="col" />
              <th scope="col" />
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow {...getRowProps({ row })}>
                {i === 3 || i === 4 || i === 1 ? (
                  <TableDecoratorRow decorator={aiLabel} />
                ) : (
                  <TableCell />
                )}
                <TableSelectRow {...getSelectionProps({ row })} />
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const AILabelWithSelectionAndExpansion = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getExpandedRowProps,
      getExpandHeaderProps,
      getSelectionProps,
      getTableProps,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With expansion"
        {...getTableContainerProps()}>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              <th scope="col" />
              <TableExpandHeader
                enableToggle={true}
                {...getExpandHeaderProps()}
              />
              <TableSelectAll {...getSelectionProps()} />
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <React.Fragment key={row.id}>
                <TableExpandRow {...getRowProps({ row })}>
                  {i === 3 || i === 4 || i === 1 ? (
                    <TableDecoratorRow decorator={aiLabel} />
                  ) : (
                    <TableDecoratorRow decorator={null} />
                  )}
                  <TableSelectRow {...getSelectionProps({ row })} />
                  {row.cells.map((cell) => (
                    <TableCell {...getCellProps({ cell })}>
                      {cell.value}
                    </TableCell>
                  ))}
                </TableExpandRow>
                <TableExpandedRow
                  colSpan={headers.length + 3}
                  className="demo-expanded-td"
                  {...getExpandedRowProps({ row })}>
                  <h6>Expandable row content</h6>
                  <div>Description here</div>
                </TableExpandedRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const AILabelWithExpansion = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getExpandedRowProps,
      getExpandHeaderProps,
      getTableProps,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With expansion"
        {...getTableContainerProps()}>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              <th scope="col" />
              <TableExpandHeader
                enableToggle={true}
                {...getExpandHeaderProps()}
              />
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <React.Fragment key={row.id}>
                <TableExpandRow {...getRowProps({ row })}>
                  {i === 3 || i === 4 || i === 1 ? (
                    <TableDecoratorRow decorator={aiLabel} />
                  ) : (
                    <TableDecoratorRow decorator={null} />
                  )}
                  {row.cells.map((cell) => (
                    <TableCell {...getCellProps({ cell })}>
                      {cell.value}
                    </TableCell>
                  ))}
                </TableExpandRow>
                <TableExpandedRow
                  colSpan={headers.length + 2}
                  className="demo-expanded-td"
                  {...getExpandedRowProps({ row })}>
                  <h6>Expandable row content</h6>
                  <div>Description here</div>
                </TableExpandedRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const ColumnAILabelWithSelectionAndExpansion = (args) => (
  <DataTable rows={rows} headers={columnAILabelHeaders} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getExpandedRowProps,
      getExpandHeaderProps,
      getSelectionProps,
      getTableProps,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With expansion"
        className="ai-label-column-table"
        {...getTableContainerProps()}>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              <TableExpandHeader
                enableToggle={true}
                {...getExpandHeaderProps()}
              />
              <TableSelectAll {...getSelectionProps()} />
              {headers.map((header, i) => (
                <TableHeader
                  key={i}
                  {...getHeaderProps({
                    header,
                  })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <React.Fragment key={row.id}>
                  <TableExpandRow {...getRowProps({ row })}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...getCellProps({ cell })}>
                          {cell.value}
                        </TableCell>
                      );
                    })}
                  </TableExpandRow>
                  <TableExpandedRow
                    colSpan={headers.length + 2}
                    className="demo-expanded-td"
                    {...getExpandedRowProps({ row })}>
                    <h6>Expandable row content</h6>
                    <div>Description here</div>
                  </TableExpandedRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const ColumnAILabelSort = (args) => (
  <DataTable rows={rows} headers={columnAILabelHeaders} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With sorting"
        className="ai-label-column-table">
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader
                  key={header.key}
                  {...getHeaderProps({ header, isSortable: true })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const FullTableAI = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getCellProps,
    }) => (
      <TableContainer
        decorator={aiLabel}
        aiEnabled
        title="DataTable"
        description="AI, full table"
        className="ai-label-column-table">
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader
                  key={header.key}
                  {...getHeaderProps({ header, isSortable: true })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);



File: DataTable/stories/DataTable-sorting.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DataTable, {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '..';
import { rows, headers } from './shared';
import mdx from '../DataTable.mdx';

export default {
  title: 'Components/DataTable/Sorting',
  component: DataTable,
  subcomponents: {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => (
  <DataTable isSortable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getCellProps,
    }) => (
      <TableContainer title="DataTable" description="With sorting">
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);



File: DataTable/stories/DataTable-batch-actions.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import { TrashCan, Save, Download, Add } from '@carbon/icons-react';

import Button from '../../Button';
import DataTable, {
  Table,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
} from '..';

import { Toggletip, ToggletipButton, ToggletipContent } from '../../Toggletip';

import { batchActionClick, rows, headers } from './shared';
import mdx from '../DataTable.mdx';
import Link from '../../Link';

export default {
  title: 'Components/DataTable/Batch Actions',
  component: DataTable,
  subcomponents: {
    TableBatchAction,
    TableBatchActions,
    TableToolbar,
    TableToolbarAction,
    TableToolbarContent,
    TableToolbarSearch,
    TableToolbarMenu,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getToolbarProps,
      getBatchActionProps,
      onInputChange,
      selectedRows,
      getTableProps,
      getTableContainerProps,
      getCellProps,
    }) => {
      const batchActionProps = getBatchActionProps();

      return (
        <TableContainer
          title="DataTable"
          description="With batch actions"
          {...getTableContainerProps()}>
          <TableToolbar {...getToolbarProps()}>
            <TableBatchActions {...batchActionProps}>
              <TableBatchAction
                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                renderIcon={TrashCan}
                onClick={batchActionClick(selectedRows)}>
                Delete
              </TableBatchAction>
              <TableBatchAction
                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                renderIcon={Save}
                onClick={batchActionClick(selectedRows)}>
                Save
              </TableBatchAction>
              <TableBatchAction
                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                renderIcon={Download}
                onClick={batchActionClick(selectedRows)}>
                Download
              </TableBatchAction>
            </TableBatchActions>
            <TableToolbarContent
              aria-hidden={batchActionProps.shouldShowBatchActions}>
              <TableToolbarSearch
                tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                onChange={(evt) => {
                  action('TableToolbarSearch - onChange')(evt);
                  onInputChange(evt);
                }}
              />
              <TableToolbarMenu
                tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}>
                <TableToolbarAction onClick={() => alert('Alert 1')}>
                  Action 1
                </TableToolbarAction>
                <TableToolbarAction onClick={() => alert('Alert 2')}>
                  Action 2
                </TableToolbarAction>
                <TableToolbarAction onClick={() => alert('Alert 3')}>
                  Action 3
                </TableToolbarAction>
              </TableToolbarMenu>
              <Button
                tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                onClick={action('Add new row')}
                kind="primary">
                Add new
              </Button>
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()} aria-label="sample table">
            <TableHead>
              <TableRow>
                <TableSelectAll {...getSelectionProps()} />
                {headers.map((header, i) => (
                  <TableHeader key={i} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({ row })}>
                  <TableSelectRow
                    {...getSelectionProps({ row })}
                    onChange={action('TableSelectRow - onChange')}
                  />
                  {row.cells.map((cell) => (
                    <TableCell {...getCellProps({ cell })}>
                      {cell.value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }}
  </DataTable>
);

Default.args = {
  isSortable: false,
  locale: 'en',
  overflowMenuOnHover: true,
  size: 'lg',
  stickyHeader: false,
  useStaticWidth: false,
  useZebraStyles: false,
};

Default.argTypes = {
  locale: {
    control: 'text',
    description: 'Provide a string for the current locale',
  },
  overflowMenuOnHover: {
    control: 'boolean',
    description:
      'Specify whether the overflow menu (if it exists) should be shown always, or only on hover',
  },
  size: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    description: 'Change the row height of table',
  },
  stickyHeader: {
    control: 'boolean',
    description:
      'Specify whether the header should be sticky. Still in preview: may not work with every combination of table props',
  },
  useStaticWidth: {
    control: 'boolean',
    description: 'If true, will use a width of "auto" instead of 100%',
  },
  useZebraStyles: {
    control: 'boolean',
    description: 'Add zebra striping to rows',
  },
};



File: DataTable/stories/datatable-story.scss


//
// Copyright IBM Corp. 2016, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@use '@carbon/styles/scss/type';

.sb-two-lines p:first-child {
  @include type.type-style('body-compact-01');
}

.sb-two-lines p:last-child {
  @include type.type-style('label-01');
}

#storybook-root .ai-label-column-table .cds--data-table-content {
  overflow: initial;
}

.cds--container-checkbox {
  padding: 1rem;
}



File: DataTable/stories/shared.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { action } from 'storybook/actions';
import Link from '../../Link';

export const rows = [
  {
    id: 'a',
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    port: 3000,
    rule: 'Round robin',
    attached_groups: 'Kevin’s VM Groups',
    status: (
      <Link href="#" disabled={true}>
        Disabled
      </Link>
    ),
  },
  {
    id: 'b',
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: 443,
    rule: 'Round robin',
    attached_groups: 'Maureen’s VM Groups',
    status: <Link href="#">Starting</Link>,
  },
  {
    id: 'c',
    name: 'Load Balancer 2',
    protocol: 'HTTP',
    port: 80,
    rule: 'DNS delegation',
    attached_groups: 'Andrew’s VM Groups',
    status: <Link href="#">Active</Link>,
  },
  {
    id: 'd',
    name: 'Load Balancer 6',
    protocol: 'HTTP',
    port: 3000,
    rule: 'Round robin',
    attached_groups: 'Marc’s VM Groups',
    status: (
      <Link href="#" disabled={true}>
        Disabled
      </Link>
    ),
  },
  {
    id: 'e',
    name: 'Load Balancer 4',
    protocol: 'HTTP',
    port: 443,
    rule: 'Round robin',
    attached_groups: 'Mel’s VM Groups',
    status: <Link href="#">Starting</Link>,
  },
  {
    id: 'f',
    name: 'Load Balancer 5',
    protocol: 'HTTP',
    port: 80,
    rule: 'DNS delegation',
    attached_groups: 'Ronja’s VM Groups',
    status: <Link href="#">Active</Link>,
  },
];

export const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'protocol',
    header: 'Protocol',
  },
  {
    key: 'port',
    header: 'Port',
  },
  {
    key: 'rule',
    header: 'Rule',
  },
  {
    key: 'attached_groups',
    header: 'Attached groups',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

export const batchActionClick = (selectedRows) => () =>
  action('Batch action click')(selectedRows);



File: DataTable/stories/examples/TableToolbarFilter.tsx


import cx from 'classnames';
import React, { ChangeEvent, useId, useState } from 'react';
import PropTypes from 'prop-types';

import { Filter } from '@carbon/icons-react';

import { usePrefix } from '../../../../internal/usePrefix';
import { Popover, PopoverContent } from '../../../Popover';
import Button from '../../../Button';
import Checkbox from '../../../Checkbox';
import { Layer } from '../../../Layer';

export type PopoverAlignment =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-end'
  | 'left-start'
  | 'right-end'
  | 'right-start';

interface TableToolbarFilterProps {
  /**
   * Specify how the popover should align with the trigger element
   */
  align?: PopoverAlignment;

  /**
   * Provide an optional class name for the toolbar filter
   */
  className?: string;

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange?: (event: '' | ChangeEvent<HTMLInputElement>) => void;

  /**
   * Provide an function that is called when the apply button is clicked
   */
  onApplyFilter?: (selectedCheckboxes: Array<string>) => void;

  /**
   * Provide an function that is called when the reset button is clicked
   */
  onResetFilter?: () => void;
}

const TableToolbarFilter = ({
  align = 'bottom-end',
  onApplyFilter,
  onResetFilter,
  className,
  ...rest
}: TableToolbarFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  const toolbarFilerId = useId();


  const prefix = usePrefix();

  const toolbarActionClasses = cx(
    className,
    `${prefix}--toolbar-action ${prefix}--overflow-menu`
  );

  const handleApplyFilter = () => {
    setIsOpen(false);
    if (onApplyFilter) {
      onApplyFilter(selectedCheckboxes);
    }
  };

  const handleResetFilter = () => {
    setIsOpen(false);
    setSelectedCheckboxes([])
    if (onResetFilter) {
      onResetFilter();
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checkboxId = e.target.id;
    const isChecked = e.target.checked;

    const checkboxValue: HTMLSpanElement | null = document.querySelector(
      `label[for="${checkboxId}"]`
    );

    if (isChecked && checkboxValue) {
      setSelectedCheckboxes([...selectedCheckboxes, checkboxValue.innerText]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== checkboxValue?.innerText));
    }
  }

  return (
    <Layer>
    <Popover<any>
      open={isOpen}
      isTabTip
      onRequestClose={() => setIsOpen(false)}
      align={align}
      {...rest}>
      <button
        aria-label="Filtering"
        type="button"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={toolbarActionClasses}>
        <Filter />
      </button>
      <PopoverContent id={toolbarFilerId}>
        <div className={`${prefix}--container-checkbox`}>
          <fieldset className={`${prefix}--fieldset`}>
            <legend className={`${prefix}--label`}>
              Filter options
            </legend>
            <Checkbox labelText="Marc" id="checkbox1" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('Marc')}/>
            <Checkbox labelText="300" id="checkbox2" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('300')}/>
            <Checkbox labelText="80" id="checkbox3" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('80')}/>
            <Checkbox labelText="Robin" id="checkbox4" onChange={handleCheckboxChange} checked={selectedCheckboxes.includes('Robin')}/>
          </fieldset>
        </div>
        <Button
          kind="secondary"
          title="Reset filters"
          onClick={handleResetFilter}>
          Reset filters
        </Button>
        <Button
          kind="primary"
          title="Reset filters"
          onClick={handleApplyFilter}>
          Apply filter
        </Button>
      </PopoverContent>
    </Popover>
    </Layer>
  );
};

TableToolbarFilter.propTypes = {
  /**
   * Specify how the popover should align with the trigger element
   */
  align: PropTypes.string,

  /**
   * Provide an optional class name for the search container
   */
  className: PropTypes.string,

  /**
   * Provide an function that is called when the apply button is clicked
   */
  onApplyFilter: PropTypes.func,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func,

  /**
   * Provide an function that is called when the reset button is clicked
   */
  onResetFilter: PropTypes.func,
};

export default TableToolbarFilter;



File: DataTable/stories/DataTable-basic.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { DataTable } from '..';

const {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} = DataTable;

import mdx from '../DataTable.mdx';
import './datatable-story.scss';

export default {
  title: 'Components/DataTable/Basic',
  component: DataTable,
  subcomponents: {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgTypes = {
  size: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    description: 'Change the row height of table',
  },
  stickyHeader: {
    control: 'boolean',
    description:
      'Specify whether the header should be sticky. Still in preview: may not work with every combination of table props',
  },
  useStaticWidth: {
    control: 'boolean',
    description: 'If true, will use a width of "auto" instead of 100%',
  },
  useZebraStyles: {
    control: 'boolean',
    description: 'Add zebra striping to rows',
  },
};

const sharedArgs = {
  size: 'lg',
  stickyHeader: false,
  useStaticWidth: false,
  useZebraStyles: false,
};

export const Default = (args) => {
  const rows = [
    {
      id: 'load-balancer-1',
      name: 'Load Balancer 1',
      rule: 'Round robin',
      Status: 'Starting',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-2',
      name: 'Load Balancer 2',
      rule: 'DNS delegation',
      status: 'Active',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-3',
      name: 'Load Balancer 3',
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-4',
      name: 'Load Balancer 4',
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-5',
      name: 'Load Balancer 5',
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-6',
      name: 'Load Balancer 6',
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-7',
      name: 'Load Balancer 7',
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
  ];
  const headers = ['Name', 'Rule', 'Status', 'Other', 'Example'];

  return (
    <Table {...args} aria-label="sample table">
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeader id={header.key} key={header}>
              {header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {Object.keys(row)
              .filter((key) => key !== 'id')
              .map((key) => {
                return <TableCell key={key}>{row[key]}</TableCell>;
              })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

Default.args = sharedArgs;
Default.argTypes = sharedArgTypes;

export const XLWithTwoLines = (args) => {
  const rows = [
    {
      id: 'load-balancer-1',
      name: (
        <div className="sb-two-lines">
          <p>Load Balancer 1</p>
          <p>Austin, Tx</p>
        </div>
      ),
      rule: 'Round robin',
      Status: 'Starting',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-2',
      name: (
        <div className="sb-two-lines">
          <p>Load Balancer 2</p>
          <p>Austin, Tx</p>
        </div>
      ),
      rule: 'DNS delegation',
      status: 'Active',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-3',
      name: (
        <div className="sb-two-lines">
          <p>Load Balancer 3</p>
          <p>Austin, Tx</p>
        </div>
      ),
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-4',
      name: (
        <div className="sb-two-lines">
          <p>Load Balancer 4</p>
          <p>Austin, Tx</p>
        </div>
      ),
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-5',
      name: (
        <div className="sb-two-lines">
          <p>Load Balancer 5</p>
          <p>Austin, Tx</p>
        </div>
      ),
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-6',
      name: (
        <div className="sb-two-lines">
          <p>Load Balancer 6</p>
          <p>Austin, Tx</p>
        </div>
      ),
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-7',
      name: (
        <div className="sb-two-lines">
          <p>Load Balancer 7</p>
          <p>Austin, Tx</p>
        </div>
      ),
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
  ];
  const headers = ['Name', 'Rule', 'Status', 'Other', 'Example'];

  return (
    <Table {...args} aria-label="sample table">
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeader id={header.key} key={header}>
              {header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {Object.keys(row)
              .filter((key) => key !== 'id')
              .map((key) => {
                return <TableCell key={key}>{row[key]}</TableCell>;
              })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

XLWithTwoLines.args = {
  ...sharedArgs,
  size: 'xl',
};
XLWithTwoLines.argTypes = sharedArgTypes;



File: DataTable/stories/DataTable-selection.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DataTable, {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
} from '..';
import { rows, headers } from './shared';
import mdx from '../DataTable.mdx';
import { action } from 'storybook/actions';

export default {
  title: 'Components/DataTable/Selection',
  component: DataTable,
  subcomponents: {
    TableSelectAll,
    TableSelectRow,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgTypes = {
  filterRows: {
    control: false,
  },
  headers: {
    control: false,
  },
  overflowMenuOnHover: {
    control: false,
  },
  rows: {
    control: false,
  },
  translateWithId: {
    control: false,
  },
  sortRow: {
    control: false,
  },
};

export const Default = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getTableProps,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With selection"
        {...getTableContainerProps()}>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              {args.radio ? (
                <th scope="col" />
              ) : (
                <TableSelectAll {...getSelectionProps()} />
              )}
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                {...getRowProps({ row })}
                onClick={(evt) => {
                  action('TableRow onClick')(evt);
                }}>
                <TableSelectRow
                  {...getSelectionProps({ row })}
                  onChange={action('TableSelectRow - onChange')}
                />
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

Default.argTypes = { ...sharedArgTypes };

export const WithRadioSelection = (args) => (
  <DataTable rows={rows} headers={headers} radio {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getTableProps,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With radio selection"
        {...getTableContainerProps()}>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              <th scope="col" />
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                <TableSelectRow {...getSelectionProps({ row })} />
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

WithRadioSelection.argTypes = { ...sharedArgTypes };

export const WithSelectionAndSorting = (args) => (
  <DataTable rows={rows} headers={headers} isSortable {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getTableProps,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With selection"
        {...getTableContainerProps()}>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              <TableSelectAll {...getSelectionProps()} />
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                <TableSelectRow {...getSelectionProps({ row })} />
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

WithSelectionAndSorting.argTypes = { ...sharedArgTypes };



File: DataTable/stories/expansion/DataTable-expansion-story.scss


//
// Copyright IBM Corp. 2020, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@use '../../../../../scss/type';
@use '../../../../../scss/theme';

.demo-inner-container-header {
  @include type.type-style('heading-compact-01');

  color: theme.$text-primary;
}

.demo-inner-container-content {
  @include type.type-style('body-01');

  color: theme.$text-secondary;
}



File: DataTable/stories/expansion/DataTable-expansion.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './DataTable-expansion-story.scss';
import React from 'react';
import DataTable, {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableHead,
  TableHeader,
  TableRow,
} from '../..';
import { rows, headers } from '../shared';
import mdx from '../../DataTable.mdx';
import { action } from 'storybook/actions';

export default {
  title: 'Components/DataTable/Expansion',
  component: DataTable,
  subcomponents: {
    TableExpandHeader,
    TableExpandRow,
    TableExpandedRow,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getExpandHeaderProps,
      getRowProps,
      getExpandedRowProps,
      getTableProps,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With expansion"
        {...getTableContainerProps()}>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              <TableExpandHeader
                aria-label="expand row"
                {...getExpandHeaderProps()}
              />
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableExpandRow
                  {...getRowProps({ row })}
                  onClick={action('onClick')}>
                  {row.cells.map((cell) => (
                    <TableCell {...getCellProps({ cell })}>
                      {cell.value}
                    </TableCell>
                  ))}
                </TableExpandRow>
                <TableExpandedRow
                  colSpan={headers.length + 1}
                  className="demo-expanded-td"
                  {...getExpandedRowProps({ row })}>
                  <h6>Expandable row content</h6>
                  <div>Description here</div>
                </TableExpandedRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const BatchExpansion = (args) => (
  <DataTable {...args} rows={rows} headers={headers}>
    {({
      rows,
      headers,
      getHeaderProps,
      getExpandHeaderProps,
      getRowProps,
      getExpandedRowProps,
      getTableProps,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With batch expansion"
        {...getTableContainerProps()}>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              <TableExpandHeader
                enableToggle={true}
                {...getExpandHeaderProps()}
              />
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableExpandRow {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell {...getCellProps({ cell })}>
                      {cell.value}
                    </TableCell>
                  ))}
                </TableExpandRow>
                <TableExpandedRow
                  colSpan={headers.length + 1}
                  className="demo-expanded-td"
                  {...getExpandedRowProps({ row })}>
                  <h6>Expandable row content</h6>
                  <div>Description here</div>
                </TableExpandedRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const BatchExpansionMultipleTables = (args) => (
  <>
    <DataTable {...args} rows={rows} headers={headers}>
      {({
        rows,
        headers,
        getHeaderProps,
        getExpandHeaderProps,
        getRowProps,
        getExpandedRowProps,
        getTableProps,
        getTableContainerProps,
        getCellProps,
      }) => (
        <TableContainer
          title="DataTable"
          description="With batch expansion"
          {...getTableContainerProps()}>
          <Table {...getTableProps()} aria-label="sample table">
            <TableHead>
              <TableRow>
                <TableExpandHeader
                  enableToggle={true}
                  {...getExpandHeaderProps()}
                />
                {headers.map((header, i) => (
                  <TableHeader key={i} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableExpandRow {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell {...getCellProps({ cell })}>
                        {cell.value}
                      </TableCell>
                    ))}
                  </TableExpandRow>
                  <TableExpandedRow
                    colSpan={headers.length + 1}
                    className="demo-expanded-td"
                    {...getExpandedRowProps({ row })}>
                    <h6>Expandable row content</h6>
                    <div>Description here</div>
                  </TableExpandedRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
    <DataTable {...args} rows={rows} headers={headers}>
      {({
        rows,
        headers,
        getHeaderProps,
        getExpandHeaderProps,
        getRowProps,
        getExpandedRowProps,
        getTableProps,
        getTableContainerProps,
        getCellProps,
      }) => (
        <TableContainer
          title="DataTable"
          description="With batch expansion"
          {...getTableContainerProps()}>
          <Table {...getTableProps()} aria-label="sample table">
            <TableHead>
              <TableRow>
                <TableExpandHeader
                  enableToggle={true}
                  {...getExpandHeaderProps()}
                />
                {headers.map((header, i) => (
                  <TableHeader key={i} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableExpandRow {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell {...getCellProps({ cell })}>
                        {cell.value}
                      </TableCell>
                    ))}
                  </TableExpandRow>
                  <TableExpandedRow
                    colSpan={headers.length + 1}
                    className="demo-expanded-td"
                    {...getExpandedRowProps({ row })}>
                    <h6>Expandable row content</h6>
                    <div>Description here</div>
                  </TableExpandedRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  </>
);
/*
 * This story will:
 * - Be excluded from the docs page
 * - Removed from the sidebar navigation
 * - Still be a tested variant and available at direct url
 */
BatchExpansionMultipleTables.tags = ['!dev', '!autodocs'];



File: DataTable/TableHead.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ThHTMLAttributes } from 'react';
import wrapComponent from '../../tools/wrapComponent';

export type TableHeadProps = ThHTMLAttributes<HTMLTableSectionElement>;

const TableHead = wrapComponent({
  name: 'TableHead',
  type: 'thead',
});

export default TableHead;



File: DataTable/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  wide
  tall
  variants={[
    {
      label: 'Basic',
      variant: 'components-datatable-basic--default'
    },
    {
      label: 'Batch Actions',
      variant: 'components-datatable-batch-actions--default'
    },
    {
      label: 'Dynamic',
      variant: 'components-datatable-dynamic--default'
    },
    {
      label: 'Expansion',
      variant: 'components-datatable-expansion--default'
    },
    {
      label: 'Batch Expansion',
      variant: 'components-datatable-expansion--batch-expansion'
    },
    {
      label: 'Filtering',
      variant: 'components-datatable-filtering--default'
    },
    {
      label: 'Selection',
      variant: 'components-datatable-selection--default'
    },
    {
      label: 'With Radio Selection',
      variant: 'components-datatable-selection--with-radio-selection'
    },
    {
      label: 'With Selection And Sorting',
      variant: 'components-datatable-selection--with-selection-and-sorting'
    },
    {
      label: 'Sorting',
      variant: 'components-datatable-sorting--default'
    },
    {
      label: 'Toolbar',
      variant: 'components-datatable-toolbar--default'
    },
    {
      label: 'Persistent Toolbar',
      variant: 'components-datatable-toolbar--persistent-toolbar'
    },
    {
      label: 'Small Persistent Toolbar',
      variant: 'components-datatable-toolbar--small-persistent-toolbar'
    },
    {
      label: 'With Overflow Menu',
      variant: 'components-datatable-toolbar--with-overflow-menu'
    }
  ]}
/>



File: DataTable/migrate-to-7.x.md


## `<Table>`

- New prop: `sortable` applies styles for sortable tables (false by default)

## `<TableToolbarAction>`

| v6                                        | v7                                                                               |
| ----------------------------------------- | -------------------------------------------------------------------------------- |
| `icon`, icon name from `carbon-icons`     | `renderIcon`, which takes a React component, e.g. one from `@carbon/icons-react` |
| `iconName`, icon data from `carbon-icons` | `renderIcon`, which takes a React component, e.g. one from `@carbon/icons-react` |

## `v7` example

```javascript
import Download16 from '@carbon/icons-react/lib/download/16';

...

<TableToolbarAction renderIcon={Download16} />
```

---

## `<TableExpandedRow>`

- Now manages it's own TableCell
- Expects `colSpan` prop to determine width



File: DataTable/TableBody.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type HTMLAttributes } from 'react';

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  /**
   * `polite` Adjust the notification behavior of screen readers
   */
  'aria-live'?: 'polite' | 'assertive' | 'off';
}

const TableBody = ({ children, className, ...rest }: TableBodyProps) => (
  <tbody
    aria-live={rest['aria-live'] ?? 'polite'}
    className={className}
    {...rest}>
    {children}
  </tbody>
);

TableBody.propTypes = {
  /**
   * `polite` Adjust the notification behavior of screen readers
   */
  'aria-live': PropTypes.oneOf(['polite', 'assertive', 'off']),
  children: PropTypes.node,

  className: PropTypes.string,
};

export default TableBody;



File: DataTable/TableHeader.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  cloneElement,
  useRef,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from 'react';
import {
  ArrowUp as Arrow,
  ArrowsVertical as Arrows,
} from '@carbon/icons-react';
import classNames from 'classnames';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import type { TFunc, TranslateWithId } from '../../types/common';
import { sortStates, type DataTableSortState } from './state/sortStates';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';

const defaultScope = 'col';

const translationIds = {
  'carbon.table.header.icon.description':
    'carbon.table.header.icon.description',
} as const;

type TranslationKey = keyof typeof translationIds;

interface TableHeaderTranslationArgs {
  header: ReactNode;
  isSortHeader?: boolean;
  sortDirection?: DataTableSortState;
  sortStates: typeof sortStates;
}

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['carbon.table.header.icon.description']]:
    'Click to sort rows by header in ascending order',
};

const defaultTranslateWithId: TFunc<
  TranslationKey,
  TableHeaderTranslationArgs
> = (messageId, args) => {
  if (
    args &&
    messageId === translationIds['carbon.table.header.icon.description']
  ) {
    if (args.isSortHeader && sortStates) {
      // When transitioning, we know that the sequence of states is as follows:
      // NONE -> ASC -> DESC -> NONE
      if (args.sortDirection === sortStates.NONE) {
        return `Click to sort rows by ${args.header} header in ascending order`;
      }
      if (args.sortDirection === sortStates.ASC) {
        return `Click to sort rows by ${args.header} header in descending order`;
      }

      return `Click to unsort rows by ${args.header} header`;
    }
    return `Click to sort rows by ${args.header} header in ascending order`;
  }

  return defaultTranslations[messageId];
};

const sortDirections: { [key: string]: 'none' | 'ascending' | 'descending' } = {
  [sortStates.NONE]: 'none',
  [sortStates.ASC]: 'ascending',
  [sortStates.DESC]: 'descending',
};

export interface TableHeaderProps
  extends HTMLAttributes<HTMLTableCellElement & HTMLButtonElement>,
    TranslateWithId<TranslationKey, TableHeaderTranslationArgs> {
  /**
   * Pass in children that will be embedded in the table header label
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify `colSpan` as a non-negative integer value to indicate how
   * many columns the TableHeader cell extends in a table
   */
  colSpan?: number;

  /**
   * Supply an id to the th element.
   */
  id?: string;

  /**
   * Specify whether this header is the header by which a table is being sorted
   * by
   */
  isSortHeader?: boolean;

  /**
   * Specify whether this header is one through which a user can sort the table
   */
  isSortable?: boolean;

  /**
   * Hook that is invoked when the header is clicked
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Specify the scope of this table header. You can find more info about this
   * attribute at the following URL:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope
   */
  scope?: string;

  /**
   * @deprecated please use decorator instead.
   * Provide a `Slug` component to be rendered inside the `TableSlugRow` component
   */
  slug?: ReactNode;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `TableDecoratorRow` component
   */
  decorator?: ReactNode;

  /**
   * Specify which direction we are currently sorting by, should be one of DESC,
   * NONE, or ASC.
   */
  sortDirection?: DataTableSortState;
}

const TableHeader = React.forwardRef(function TableHeader(
  {
    className: headerClassName,
    children,
    colSpan,
    decorator,
    isSortable = false,
    isSortHeader,
    onClick,
    scope = defaultScope,
    sortDirection,
    translateWithId: t = defaultTranslateWithId,
    slug,
    id,
    ...rest
  }: TableHeaderProps,
  ref: React.Ref<HTMLTableCellElement>
) {
  const prefix = usePrefix();
  const uniqueId = useId('table-sort');

  // AILabel is always size `mini`
  const AILableRef = useRef<HTMLInputElement>(null);

  const candidate = slug ?? decorator;
  const candidateIsAILabel = isComponentElement(candidate, AILabel);
  const colHasAILabel = candidateIsAILabel;
  const normalizedDecorator = candidateIsAILabel
    ? cloneElement(candidate, { size: 'mini', ref: AILableRef })
    : candidate;

  const headerLabelClassNames = classNames({
    [`${prefix}--table-header-label`]: true,
    [`${prefix}--table-header-label--slug ${prefix}--table-header-label--ai-label`]:
      colHasAILabel,
    [`${prefix}--table-header-label--decorator`]: decorator,
  });

  if (!isSortable) {
    return (
      <th
        {...rest}
        id={id}
        className={headerClassName}
        scope={scope}
        colSpan={colSpan}
        ref={ref}>
        {children ? (
          <div className={headerLabelClassNames}>
            {children}
            <div className={`${prefix}--table-header-label--decorator-inner`}>
              {normalizedDecorator}
            </div>
          </div>
        ) : null}
      </th>
    );
  }

  const className = cx(headerClassName, {
    [`${prefix}--table-sort`]: true,
    [`${prefix}--table-sort--active`]:
      isSortHeader && sortDirection !== sortStates.NONE,
    [`${prefix}--table-sort--descending`]:
      isSortHeader && sortDirection === sortStates.DESC,
  });
  const ariaSort =
    !isSortHeader || !sortDirection ? 'none' : sortDirections[sortDirection];
  const sortDescription =
    t &&
    t('carbon.table.header.icon.description', {
      header: children,
      sortDirection,
      isSortHeader,
      sortStates,
    });

  const headerClasses = cx(headerClassName, `${prefix}--table-sort__header`, {
    [`${prefix}--table-sort__header--ai-label`]: colHasAILabel,
    [`${prefix}--table-sort__header--decorator`]: decorator,
  });

  const handleClick = (evt) => {
    if (
      colHasAILabel &&
      AILableRef.current &&
      AILableRef.current.contains(evt.target)
    ) {
      return;
    } else if (onClick) {
      return onClick(evt);
    }
  };

  return (
    <th
      id={id}
      aria-sort={ariaSort}
      className={headerClasses}
      colSpan={colSpan}
      ref={ref}
      scope={scope}>
      <div className={`${prefix}--table-sort__description`} id={uniqueId}>
        {sortDescription}
      </div>
      <button
        type="button"
        aria-describedby={uniqueId}
        className={className}
        onClick={handleClick}
        {...rest}>
        <span className={`${prefix}--table-sort__flex`}>
          <div className={`${prefix}--table-header-label`}>{children}</div>
          <Arrow size={20} className={`${prefix}--table-sort__icon`} />
          <Arrows
            size={20}
            className={`${prefix}--table-sort__icon-unsorted`}
          />
          <div className={`${prefix}--table-header-label--decorator-inner`}>
            {normalizedDecorator}
          </div>
        </span>
      </button>
    </th>
  );
});

TableHeader.propTypes = {
  /**
   * Pass in children that will be embedded in the table header label
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify `colSpan` as a non-negative integer value to indicate how
   * many columns the TableHeader cell extends in a table
   */
  colSpan: PropTypes.number,

  /**
   * Supply an id to the th element.
   */
  id: PropTypes.string,

  /**
   * Specify whether this header is the header by which a table is being sorted
   * by
   */
  isSortHeader: PropTypes.bool,

  /**
   * Specify whether this header is one through which a user can sort the table
   */
  isSortable: PropTypes.bool,

  /**
   * Hook that is invoked when the header is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the scope of this table header. You can find more info about this
   * attribute at the following URL:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope
   */
  scope: PropTypes.string,

  /**
   * Specify which direction we are currently sorting by, should be one of DESC,
   * NONE, or ASC.
   */
  sortDirection: PropTypes.oneOf(Object.values(sortStates)),

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,
};

TableHeader.displayName = 'TableHeader';

export default TableHeader;



File: DataTable/TableCell.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import PropTypes from 'prop-types';

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  /**
   * Pass in children that will be embedded in the table header label
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * The width of the expanded row's internal cell
   */
  colSpan?: number;

  /**
   * Specify if the table cell is in an AI column
   */
  hasAILabelHeader?: boolean;

  /**
   * The id of the matching th node in the table head. Addresses a11y concerns outlined here: https://www.ibm.com/able/guidelines/ci162/info_and_relationships.html and https://www.w3.org/TR/WCAG20-TECHS/H43
   */
  headers?: string;
}

const frFn = forwardRef<HTMLTableCellElement, TableCellProps>;

const TableCell = frFn((props, ref) => {
  const { children, className, hasAILabelHeader, colSpan, ...rest } = props;
  const prefix = usePrefix();

  const tableCellClassNames = classNames(className, {
    [`${prefix}--table-cell--column-slug`]: hasAILabelHeader,
  });
  return (
    <td
      className={tableCellClassNames ? tableCellClassNames : undefined}
      ref={ref}
      colSpan={colSpan}
      {...rest}>
      {children}
    </td>
  );
});

TableCell.displayName = 'TableCell';
TableCell.propTypes = {
  /**
   * Pass in children that will be embedded in the table header label
   */
  children: PropTypes.node,
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,
  /**
   * The width of the expanded row's internal cell
   */
  colSpan: PropTypes.number,
  /**
   * Specify if the table cell is in an AI column
   */
  hasAILabelHeader: PropTypes.bool,
  /**
   * The id of the matching th node in the table head. Addresses a11y concerns outlined here: https://www.ibm.com/able/guidelines/ci162/info_and_relationships.html and https://www.w3.org/TR/WCAG20-TECHS/H43
   */
  headers: PropTypes.string,
};

export default TableCell;



