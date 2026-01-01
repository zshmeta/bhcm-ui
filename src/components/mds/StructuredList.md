File: StructuredList/StructuredList.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface StructuredListSkeletonProps {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * number of table rows
   */
  rowCount?: number;
}

export default function StructuredListSkeleton({
  rowCount = 5,
  className,
  ...rest
}: StructuredListSkeletonProps) {
  const prefix = usePrefix();
  const classNames = cx(
    `${prefix}--skeleton`,
    `${prefix}--structured-list`,
    className
  );

  const rows = new Array(rowCount).fill(null).map((_, i) => (
    <div className={`${prefix}--structured-list-row`} key={i}>
      <div className={`${prefix}--structured-list-td`} />
      <div className={`${prefix}--structured-list-td`} />
      <div className={`${prefix}--structured-list-td`} />
    </div>
  ));

  return (
    <div className={classNames} {...rest}>
      <div className={`${prefix}--structured-list-thead`}>
        <div
          className={`${prefix}--structured-list-row ${prefix}--structured-list-row--header-row`}>
          <div className={`${prefix}--structured-list-th`}>
            <span />
          </div>
          <div className={`${prefix}--structured-list-th`}>
            <span />
          </div>
          <div className={`${prefix}--structured-list-th`}>
            <span />
          </div>
        </div>
      </div>
      <div className={`${prefix}--structured-list-tbody`}>{rows}</div>
    </div>
  );
}

StructuredListSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * number of table rows
   */
  rowCount: PropTypes.number,
};



File: StructuredList/StructuredList.featureflag.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { WithLayer } from '../../../.storybook/templates/WithLayer';
import { useFeatureFlag } from '../FeatureFlags';

import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListInput,
  StructuredListCell,
} from './';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

export default {
  title: 'Components/StructuredList/Feature Flag',
  component: StructuredListWrapper,
  subcomponents: {
    StructuredListHead,
    StructuredListBody,
    StructuredListRow,
    StructuredListInput,
    StructuredListCell,
  },
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

const structuredListBodyRowGenerator = (numRows) => {
  return Array.apply(null, Array(numRows)).map((n, i) => (
    <StructuredListRow key={`row-${i}`} selection>
      <StructuredListCell>Row {i}</StructuredListCell>
      <StructuredListCell>Row {i}</StructuredListCell>
      <StructuredListCell>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna,
        finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel
        euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.
      </StructuredListCell>
      <StructuredListInput
        id={`row-${i}`}
        value={`row-${i}`}
        title={`row-${i}`}
        name="row-0"
        aria-label={`row-${i}`}
      />
    </StructuredListRow>
  ));
};

export const Selection = (args) => {
  return (
    <StructuredListWrapper selection {...args}>
      <StructuredListHead>
        <StructuredListRow head selection>
          <StructuredListCell head>ColumnA</StructuredListCell>
          <StructuredListCell head>ColumnB</StructuredListCell>
          <StructuredListCell head>ColumnC</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        {structuredListBodyRowGenerator(4)}
      </StructuredListBody>
    </StructuredListWrapper>
  );
};

Selection.parameters = {
  controls: {
    exclude: ['isFlush', 'selection'],
  },
};

export const WithBackgroundLayer = () => {
  const v12StructuredRadioIcons = useFeatureFlag(
    'enable-v12-structured-list-visible-icons'
  );
  return (
    <WithLayer>
      <StructuredListWrapper selection>
        <StructuredListHead>
          <StructuredListRow head>
            {v12StructuredRadioIcons && (
              <StructuredListCell head></StructuredListCell>
            )}
            <StructuredListCell head>ColumnA</StructuredListCell>
            <StructuredListCell head>ColumnB</StructuredListCell>
            <StructuredListCell head>ColumnC</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {structuredListBodyRowGenerator(4, v12StructuredRadioIcons)}
        </StructuredListBody>
      </StructuredListWrapper>
    </WithLayer>
  );
};



File: StructuredList/StructuredList.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useState,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
  type ChangeEvent,
  type MouseEvent,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useId } from '../../internal/useId';
import { deprecate } from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { Text } from '../Text';
import { RadioButtonChecked, RadioButton } from '@carbon/icons-react';
import { useOutsideClick } from '../../internal/useOutsideClick';

type DivAttrs = HTMLAttributes<HTMLDivElement>;

type GridSelectedRowState = null | string;
type GridSelectedRowSetter = null | ((value: GridSelectedRowState) => void);
const GridSelectedRowStateContext =
  React.createContext<GridSelectedRowState>(null);
const GridSelectedRowDispatchContext =
  React.createContext<GridSelectedRowSetter>(null);

export interface StructuredListWrapperProps extends DivAttrs {
  /**
   * Specify a label to be read by screen readers on the container node
   */
  'aria-label'?: string;

  /**
   * Provide the contents of your StructuredListWrapper
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify if structured list is condensed, default is false
   */
  isCondensed?: boolean;

  /**
   * Specify if structured list is flush, default is false
   */
  isFlush?: boolean;

  /**
   * Specify whether your StructuredListWrapper should have selections
   */
  selection?: boolean;

  /**
   * Specify which row will be selected initially
   */
  selectedInitialRow?: string;
}
export function StructuredListWrapper(props: StructuredListWrapperProps) {
  const {
    children,
    selection,
    className,
    ['aria-label']: ariaLabel = 'Structured list section',
    // @ts-expect-error: Deprecated prop
    ariaLabel: deprecatedAriaLabel,
    isCondensed,
    isFlush,
    selectedInitialRow,
    ...other
  } = props;

  const prefix = usePrefix();
  const classes = classNames(
    `${prefix}--structured-list`,
    {
      [`${prefix}--structured-list--selection`]: selection,
      [`${prefix}--structured-list--condensed`]: isCondensed,
      [`${prefix}--structured-list--flush`]: isFlush && !selection,
    },
    className
  );
  const [selectedRow, setSelectedRow] = React.useState<GridSelectedRowState>(
    selectedInitialRow ?? null
  );

  return (
    <GridSelectedRowStateContext.Provider value={selectedRow}>
      <GridSelectedRowDispatchContext.Provider value={setSelectedRow}>
        <div
          role="table"
          className={classes}
          {...other}
          aria-label={deprecatedAriaLabel || ariaLabel}>
          {children}
        </div>
      </GridSelectedRowDispatchContext.Provider>
    </GridSelectedRowStateContext.Provider>
  );
}
StructuredListWrapper.propTypes = {
  /**
   * Specify a label to be read by screen readers on the container node
   */
  ['aria-label']: PropTypes.string,

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify a label to be read by screen readers on the container note.
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'This prop syntax has been deprecated. Please use the new `aria-label`.'
  ),

  /**
   * Provide the contents of your StructuredListWrapper
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify if structured list is condensed, default is false
   */
  isCondensed: PropTypes.bool,

  /**
   * Specify if structured list is flush, not valid for selection variant, default is false
   */
  isFlush: PropTypes.bool,

  /**
   * Specify whether your StructuredListWrapper should have selections
   */
  selection: PropTypes.bool,

  /**
   * Specify which row will be selected initially
   */
  selectedInitialRow: PropTypes.string,
};

export interface StructuredListHeadProps extends DivAttrs {
  /**
   * Provide the contents of your StructuredListHead
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the node
   */
  className?: string;
}
export function StructuredListHead(props) {
  const { children, className, ...other } = props;
  const prefix = usePrefix();
  const classes = classNames(`${prefix}--structured-list-thead`, className);
  return (
    <div role="rowgroup" className={classes} {...other}>
      {children}
    </div>
  );
}
StructuredListHead.propTypes = {
  /**
   * Provide the contents of your StructuredListHead
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the node
   */
  className: PropTypes.string,
};

export interface StructuredListBodyProps extends DivAttrs {
  /**
   * Provide the contents of your StructuredListBody
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  head?: boolean;

  /**
   * Provide a handler that is invoked on the key down event for the control
   */
  onKeyDown?(event: KeyboardEvent): void;
}
export function StructuredListBody(props: StructuredListBodyProps) {
  const { children, className, ...other } = props;
  const prefix = usePrefix();
  const classes = classNames(`${prefix}--structured-list-tbody`, className);

  return (
    <div className={classes} role="rowgroup" {...other}>
      {children}
    </div>
  );
}
StructuredListBody.propTypes = {
  /**
   * Provide the contents of your StructuredListBody
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  head: PropTypes.bool,

  /**
   * Provide a handler that is invoked on the key down event for the control
   */
  onKeyDown: PropTypes.func,
};

const GridRowContext = React.createContext<null | { id: string }>(null);

export interface StructuredListRowProps extends DivAttrs {
  /**
   * Provide the contents of your StructuredListRow
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify whether your StructuredListRow should be used as a header row
   */
  head?: boolean;

  /**
   * Provide a handler that is invoked on the click
   */
  onClick?(event: MouseEvent): void;

  /**
   * Provide a handler that is invoked on the key down event for the control
   */
  onKeyDown?(event: KeyboardEvent): void;

  /**
   * Mark if this row should be selectable
   */
  selection?: boolean;

  /**
   * Specify row id so that it can be used for initial selection
   */
  id?: string;
}
export function StructuredListRow(props: StructuredListRowProps) {
  const {
    onKeyDown,
    children,
    className,
    head,
    onClick,
    selection,
    id,
    ...other
  } = props;
  const [hasFocusWithin, setHasFocusWithin] = useState(false);
  // eslint-disable-next-line  react-hooks/rules-of-hooks -- https://github.com/carbon-design-system/carbon/issues/20452
  const rowId = id ?? useId('grid-input');
  const selectedRow = React.useContext(GridSelectedRowStateContext);
  const setSelectedRow = React.useContext(GridSelectedRowDispatchContext);
  const prefix = usePrefix();
  const value = { id: rowId };
  const classes = classNames(
    `${prefix}--structured-list-row`,
    {
      [`${prefix}--structured-list-row--header-row`]: head,
      [`${prefix}--structured-list-row--focused-within`]:
        (hasFocusWithin && !selection) ||
        (hasFocusWithin &&
          selection &&
          (selectedRow === rowId || selectedRow === null)),
      // Ensure focus on the first item when navigating through Tab keys and no row is selected (selectedRow === null)
      [`${prefix}--structured-list-row--selected`]: selectedRow === rowId,
    },
    className
  );
  const itemRef = useRef<HTMLDivElement | null>(null);
  const handleClick = () => {
    setHasFocusWithin(false);
  };
  useOutsideClick(itemRef, handleClick);
  return head ? (
    <div role="row" {...other} className={classes}>
      {selection && <StructuredListCell head></StructuredListCell>}
      {children}
    </div>
  ) : (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      {...other}
      role="row"
      className={classes}
      ref={itemRef}
      onClick={(event) => {
        setSelectedRow?.(rowId);
        // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
        onClick && onClick(event);
        if (selection) {
          // focus items only when selection is enabled
          setHasFocusWithin(true);
        }
      }}
      onFocus={(event) => {
        if (selection || event.currentTarget === event.target) {
          setHasFocusWithin(true);
        }
      }}
      onBlur={() => {
        setHasFocusWithin(false);
      }}
      onKeyDown={onKeyDown}>
      <GridRowContext.Provider value={value}>
        {selection && (
          <StructuredListCell>
            {selectedRow === rowId ? (
              <RadioButtonChecked
                className={`${prefix}--structured-list__icon`}
              />
            ) : (
              <RadioButton className={`${prefix}--structured-list__icon`} />
            )}
          </StructuredListCell>
        )}

        {children}
      </GridRowContext.Provider>
    </div>
  );
}
StructuredListRow.propTypes = {
  /**
   * Provide the contents of your StructuredListRow
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether your StructuredListRow should be used as a header row
   */
  head: PropTypes.bool,

  /**
   * Specify whether a `<label>` should be used
   */
  label: deprecate(
    PropTypes.bool,
    `\nThe \`label\` prop is no longer needed and will be removed in the next major version of Carbon.`
  ),

  /**
   * Provide a handler that is invoked on the click
   */
  onClick: PropTypes.func,

  /**
   * Provide a handler that is invoked on the key down event for the control,
   */
  onKeyDown: PropTypes.func,

  /**
   * Mark if this row should be selectable
   */
  selection: PropTypes.bool,

  /**
   * Specify row id so that it can be used for initial selection
   */
  id: PropTypes.string,
};

export interface StructuredListInputProps extends DivAttrs {
  /**
   * Specify an optional className to be applied to the input
   */
  className?: string;

  /**
   * Specify a custom `id` for the input
   */
  id?: string;

  /**
   * Provide a `name` for the input
   */
  name?: string;

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange?(event: ChangeEvent<HTMLInputElement>): void;

  /**
   * Provide a `title` for the input
   */
  title?: string;
}
export function StructuredListInput(props: StructuredListInputProps) {
  const defaultId = useId('structureListInput');
  const {
    className,
    name = `structured-list-input-${defaultId}`,
    title,
    id,
    onChange,
    ...other
  } = props;
  const prefix = usePrefix();
  const classes = classNames(
    `${prefix}--structured-list-input`,
    `${prefix}--visually-hidden`,
    className
  );
  const row = React.useContext(GridRowContext);
  const selectedRow = React.useContext(GridSelectedRowStateContext);
  const setSelectedRow = React.useContext(GridSelectedRowDispatchContext);

  return (
    <input
      {...other}
      type="radio"
      tabIndex={0}
      checked={!!row && row.id === selectedRow}
      value={row?.id ?? ''}
      onChange={(event) => {
        setSelectedRow?.(event.target.value);
        // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
        onChange && onChange(event);
      }}
      id={id ?? defaultId}
      className={classes}
      name={name}
      title={title}
    />
  );
}
StructuredListInput.propTypes = {
  /**
   * Specify an optional className to be applied to the input
   */
  className: PropTypes.string,

  /**
   * Specify whether the underlying input should be checked by default
   */
  defaultChecked: deprecate(
    PropTypes.bool,
    `\nThe prop \`defaultChecked\` is no longer needed and will be removed in the next major version of Carbon.`
  ),

  /**
   * Specify a custom `id` for the input
   */
  id: PropTypes.string,

  /**
   * Provide a `name` for the input
   */
  name: PropTypes.string,

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange: PropTypes.func,

  /**
   * Provide a `title` for the input
   */
  title: PropTypes.string,

  /**
   * Specify the value of the input
   */
  value: deprecate(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    `\nThe prop \`value\` will be removed in the next major version of Carbon.`
  ),
};

export interface StructuredListCellProps extends DivAttrs {
  /**
   * Provide the contents of your StructuredListCell
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify whether your StructuredListCell should be used as a header cell
   */
  head?: boolean;

  /**
   * Specify whether your StructuredListCell should have text wrapping
   */
  noWrap?: boolean;
}
export function StructuredListCell(props: StructuredListCellProps) {
  const { children, className, head, noWrap, ...other } = props;
  const prefix = usePrefix();
  const classes = classNames(
    {
      [`${prefix}--structured-list-th`]: head,
      [`${prefix}--structured-list-td`]: !head,
      [`${prefix}--structured-list-content--nowrap`]: noWrap,
    },
    className
  );

  if (head) {
    return (
      <Text className={classes} role="columnheader" {...other}>
        {children}
      </Text>
    );
  }

  return (
    <Text as="div" className={classes} role="cell" {...other}>
      {children}
    </Text>
  );
}
StructuredListCell.propTypes = {
  /**
   * Provide the contents of your StructuredListCell
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether your StructuredListCell should be used as a header cell
   */
  head: PropTypes.bool,

  /**
   * Specify whether your StructuredListCell should have text wrapping
   */
  noWrap: PropTypes.bool,
};



File: StructuredList/__tabs__/StructuredList.Skeleton-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import StructuredListSkeleton from '../StructuredList.Skeleton';
import { render } from '@testing-library/react';

describe('StructuredListSkeleton', () => {
  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(<StructuredListSkeleton className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread additional props on the outermost element', () => {
    const { container } = render(<StructuredListSkeleton data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});



File: StructuredList/__tabs__/StructuredList-test.js


/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListInput,
  StructuredListCell,
} from '../StructuredList';
import { CheckmarkFilled } from '@carbon/react/icons';

const prefix = 'cds';
const dataTestId = 'structured-list-test-id';
const customHeadClass = 'structured-list-header-custom-class';
const customRowClass = 'structured-list-row-custom-class';
const customBodyClass = 'structured-list-body-custom-class';
const customInputClass = 'structured-list-input-custom-class';
const customCellClass = 'structured-list-cell-custom-class';
const inputNameValue = 'list-radio-input';
const onKeyDownHandlerFn = jest.fn();
const onKeyDownBodyHandlerFn = jest.fn();
const onChangeHandlerFn = jest.fn();

const user = userEvent.setup();

const renderComponent = ({ ...rest } = {}) => {
  const { bodyProps, bodyCellProps, headProps, wrapperProps } = rest;
  return render(
    <StructuredListWrapper {...wrapperProps}>
      <StructuredListHead className={customHeadClass} {...headProps}>
        <StructuredListRow head className={customRowClass}>
          <StructuredListCell head>ColumnA</StructuredListCell>
          <StructuredListCell head>ColumnB</StructuredListCell>
          <StructuredListCell head>ColumnC</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody className={customBodyClass} {...bodyProps}>
        <StructuredListRow>
          <StructuredListCell noWrap {...bodyCellProps}>
            Row 1
          </StructuredListCell>
          <StructuredListCell>Row 1, Col 2</StructuredListCell>
          <StructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque
            vulputate nisl a porttitor interdum.
          </StructuredListCell>
        </StructuredListRow>
        <StructuredListRow>
          <StructuredListCell noWrap>Row 2</StructuredListCell>
          <StructuredListCell>Row 2</StructuredListCell>
          <StructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque
            vulputate nisl a porttitor interdum.
          </StructuredListCell>
        </StructuredListRow>
      </StructuredListBody>
    </StructuredListWrapper>
  );
};

const structuredListBodyRowGenerator = (numRows, rest, selection) => {
  return Array.apply(null, Array(numRows)).map((n, i) => (
    <StructuredListRow
      key={`row-${i}`}
      id={`row-${i}`}
      onKeyDown={onKeyDownHandlerFn}
      selection={selection}>
      <StructuredListCell>Row {i}</StructuredListCell>
      <StructuredListCell>Row {i}, Col 2</StructuredListCell>
      <StructuredListCell>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna,
        finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel
        euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.
      </StructuredListCell>
      <StructuredListInput
        {...rest}
        id={`row-${i}`}
        title={`row-${i}`}
        name={inputNameValue}
        className={customInputClass}
        onChange={onChangeHandlerFn}
      />
      <StructuredListCell>
        <CheckmarkFilled
          className={`${prefix}--structured-list-svg`}
          aria-label="select an option">
          <title>select an option</title>
        </CheckmarkFilled>
      </StructuredListCell>
    </StructuredListRow>
  ));
};

const renderSelectionVariant = ({ ...rest } = {}) => {
  const { inputProps, wrapperProps, rowSelection } = rest;
  return render(
    <StructuredListWrapper selection {...wrapperProps}>
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell head>ColumnA</StructuredListCell>
          <StructuredListCell head>ColumnB</StructuredListCell>
          <StructuredListCell head>ColumnC</StructuredListCell>
          <StructuredListCell head>{''}</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody onKeyDown={onKeyDownBodyHandlerFn}>
        {structuredListBodyRowGenerator(4, inputProps, rowSelection)}
      </StructuredListBody>
    </StructuredListWrapper>
  );
};

const renderInitialSelectionVariant = ({ ...rest } = {}) => {
  const { inputProps, wrapperProps, rowSelection } = rest;
  return render(
    <StructuredListWrapper
      selection
      {...wrapperProps}
      selectedInitialRow="row-1">
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell head>ColumnA</StructuredListCell>
          <StructuredListCell head>ColumnB</StructuredListCell>
          <StructuredListCell head>ColumnC</StructuredListCell>
          <StructuredListCell head>{''}</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody onKeyDown={onKeyDownBodyHandlerFn}>
        {structuredListBodyRowGenerator(4, inputProps, rowSelection)}
      </StructuredListBody>
    </StructuredListWrapper>
  );
};

describe('StructuredList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('StructuredListWrapper', () => {
    it('should spread extra props onto outermost element', () => {
      renderComponent({ wrapperProps: { 'data-testid': dataTestId } });
      expect(screen.getByLabelText('Structured list section')).toHaveAttribute(
        'data-testid',
        dataTestId
      );
    });
    it('should have the expected classes', () => {
      renderComponent();
      expect(screen.getByRole('table')).toHaveClass(
        `${prefix}--structured-list`
      );
    });
    it('should add extra classes that are passed via classname', () => {
      renderComponent({ wrapperProps: { className: 'extra-class' } });
      expect(screen.getByRole('table')).toHaveClass('extra-class');
    });
    it('should default selection prop as false', () => {
      renderComponent();
      expect(screen.getByRole('table')).not.toHaveClass(
        `${prefix}--structured-list--selection`
      );
    });
    it('should add the modifier class for selection when selection prop is true', () => {
      renderComponent({ wrapperProps: { selection: true } });
      expect(screen.getByRole('table')).toHaveClass(
        `${prefix}--structured-list--selection`
      );
    });
    it('should add the modifier class for condensed when isCondensed prop is true', () => {
      renderComponent({ wrapperProps: { isCondensed: true } });
      expect(screen.getByRole('table')).toHaveClass(
        `${prefix}--structured-list--condensed`
      );
    });
    it('should add the modifier class for flush when isFlush prop is true', () => {
      renderComponent({ wrapperProps: { isFlush: true } });
      expect(screen.getByRole('table')).toHaveClass(
        `${prefix}--structured-list--flush`
      );
    });
    it('should allow a custom aria label to be passed in', () => {
      const testAriaLabel = 'custom-test-aria-label';
      renderComponent({ wrapperProps: { 'aria-label': testAriaLabel } });
      expect(screen.getByLabelText(testAriaLabel)).toBeInTheDocument();
    });
    it('should check that children are rendered', () => {
      renderComponent();
      expect(screen.getByText('ColumnA')).toBeVisible();
    });
    it('should apply the selected class to the initially selected row', async () => {
      renderInitialSelectionVariant();
      const input = screen.getByTitle('row-1');
      expect(input).toBeChecked();
      const selectedRow = input.closest('.cds--structured-list-row');
      expect(selectedRow).toHaveClass('cds--structured-list-row--selected');
    });
  });

  describe('StructuredListHeader', () => {
    it('should have the expected classes', () => {
      renderComponent();
      const rowGroups = screen.getAllByRole('rowgroup');
      const headerRowGroup = [...rowGroups].filter((rowgroup) =>
        rowgroup.classList.contains(`${prefix}--structured-list-thead`)
      )[0];
      expect(headerRowGroup).toHaveClass(`${prefix}--structured-list-thead`);
    });
    it('should add extra classes that are passed via className', () => {
      renderComponent();
      const rowGroups = screen.getAllByRole('rowgroup');
      const headerRowGroup = [...rowGroups].filter((rowgroup) =>
        rowgroup.classList.contains(`${prefix}--structured-list-thead`)
      )[0];
      expect(headerRowGroup).toHaveClass(customHeadClass);
    });
    it('should check that children are rendered', () => {
      renderComponent();
      expect(screen.getByText('ColumnA')).toBeVisible();
    });
    it('should accept rest props', () => {
      const customHeadTitle = 'custom-header-title';
      renderComponent({ headProps: { title: customHeadTitle } });
      expect(screen.getByTitle(customHeadTitle)).toBeInTheDocument();
    });
  });

  describe('StructuredListRow', () => {
    it('should check that children are rendered', () => {
      renderComponent();
      expect(screen.getByText('ColumnA')).toBeVisible();
    });
    it('should add extra class that are passed via className', () => {
      renderComponent();
      const rows = screen.getAllByRole('row');
      const rowWithCustomClass = [...rows].filter((row) =>
        row.classList.contains(customRowClass)
      )[0];
      expect(rowWithCustomClass).toHaveClass(customRowClass);
    });
    it('should check that a row is specified as a header row', () => {
      renderComponent();
      const rows = screen.getAllByRole('row');
      const headerRow = [...rows].filter((row) =>
        row.classList.contains(`${prefix}--structured-list-row--header-row`)
      )[0];
      expect(headerRow).toHaveClass(
        `${prefix}--structured-list-row--header-row`
      );
    });
    it('should add an onKeyDown handler', async () => {
      renderSelectionVariant();
      await user.tab();
      await user.keyboard('[ArrowDown]');
      expect(onKeyDownHandlerFn).toHaveBeenCalledTimes(1);
      await user.keyboard('[ArrowDown]');
      expect(onKeyDownHandlerFn).toHaveBeenCalledTimes(2);
      await user.keyboard('[ArrowDown]');
      expect(onKeyDownHandlerFn).toHaveBeenCalledTimes(3);
    });

    it('should be able to click on a selected row', async () => {
      renderSelectionVariant({ rowSelection: true });

      await userEvent.click(screen.getByText('Row 1'));
    });
  });

  describe('StructuredListBody', () => {
    it('should check that children are rendered', () => {
      renderComponent();
      expect(screen.getByText('Row 1')).toBeVisible();
    });
    it('should add extra classes that are passed via className', () => {
      renderComponent();
      const rowGroups = screen.getAllByRole('rowgroup');
      const listBody = [...rowGroups].filter((rowgroup) =>
        rowgroup.classList.contains(`${prefix}--structured-list-tbody`)
      )[0];
      expect(listBody).toHaveClass(customBodyClass);
    });
    it('should have the expected classes', () => {
      renderComponent();
      const rowGroups = screen.getAllByRole('rowgroup');
      const bodyRowGroup = [...rowGroups].filter((rowgroup) =>
        rowgroup.classList.contains(`${prefix}--structured-list-tbody`)
      )[0];
      expect(bodyRowGroup).toHaveClass(`${prefix}--structured-list-tbody`);
    });
    it('should add an onKeyDown handler', async () => {
      renderSelectionVariant();
      await user.tab();
      await user.keyboard('[ArrowDown]');
      expect(onKeyDownBodyHandlerFn).toHaveBeenCalledTimes(1);
      await user.keyboard('[ArrowDown]');
      expect(onKeyDownBodyHandlerFn).toHaveBeenCalledTimes(2);
      await user.keyboard('[ArrowDown]');
      expect(onKeyDownBodyHandlerFn).toHaveBeenCalledTimes(3);
    });
    it('should accept rest props', () => {
      const dataTestId = 'data-testid';
      renderComponent({ bodyProps: { 'data-testid': dataTestId } });
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });
  });

  describe('StructuredListInput', () => {
    it('should have the expected classes', () => {
      renderSelectionVariant();
      const inputElement = screen.getByTitle('row-0');
      expect(inputElement).toHaveClass(`${prefix}--structured-list-input`);
    });
    it('should render the input with custom title attribute and add additional classes via className', () => {
      renderSelectionVariant();
      const inputElement = screen.getByTitle('row-0');
      expect(inputElement).toHaveClass(customInputClass);
    });
    it('should accept an id', () => {
      renderSelectionVariant();
      const inputElement = screen.getByTitle('row-0');
      expect(inputElement).toHaveAttribute('id', 'row-0');
    });
    it('should add a custom name attribute to the input element', () => {
      renderSelectionVariant();
      const inputElement = screen.getByTitle('row-0');
      expect(inputElement).toHaveAttribute('name', 'list-radio-input');
    });
    it('should render unique id with multiple inputs when no id prop is given', () => {
      const { container } = renderSelectionVariant();
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const inputElements = container.querySelectorAll(
        `[name=${inputNameValue}]`
      );
      const inputIds = Array.from(inputElements).map((input) => {
        return input.id;
      });
      const containsDuplicates = (array) => {
        if (array.length !== new Set(array).size) {
          return true;
        }
        return false;
      };
      expect(containsDuplicates(inputIds)).toBeFalsy();
    });
    it('should accept rest props', () => {
      const testAriaLabel = 'test-aria-label';
      renderSelectionVariant({ inputProps: { 'aria-label': testAriaLabel } });
      const allInputs = screen.getAllByLabelText(testAriaLabel);
      allInputs.forEach((input) => {
        expect(input).toHaveAttribute('aria-label', testAriaLabel);
      });
    });
    it('should call onChange on change', async () => {
      renderSelectionVariant();
      const inputElement = screen.getByTitle('row-0');
      await userEvent.click(inputElement);
      expect(onChangeHandlerFn).toHaveBeenCalled();
    });
  });

  describe('StructuredListCell', () => {
    it('should add extra classes that are passed via className', () => {
      renderComponent({ bodyCellProps: { className: customCellClass } });
      const bodyCells = screen.getAllByRole('cell');
      expect(bodyCells[0]).toHaveClass(customCellClass);
    });
    it('should have the expected classes', () => {
      renderComponent();
      const bodyCells = screen.getAllByRole('cell');
      expect(bodyCells[0]).toHaveClass(`${prefix}--structured-list-td`);
    });
    it('should use correct class when head prop is true', () => {
      renderComponent();
      const bodyCells = screen.getAllByRole('columnheader');
      expect(bodyCells[0]).toHaveClass(`${prefix}--structured-list-th`);
    });
    it('should use correct class when noWrap prop is true', () => {
      renderComponent();
      const bodyCells = screen.getAllByRole('cell');
      expect(bodyCells[0]).toHaveClass(
        `${prefix}--structured-list-content--nowrap`
      );
    });
    it('should accept rest props', () => {
      const dataTestId = 'data-testid';
      renderComponent({ bodyCellProps: { 'data-testid': dataTestId } });
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });
  });
});



File: StructuredList/StructuredList.mdx


import { ArgTypes, Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as StructuredListStories from './StructuredList.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# StructuredList

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/StructuredList)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/structured-list/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/structured-list/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [StructuredList](#structuredList)
  - [Overview](#overview)
  - [Skeleton](#skeleton)
  - [Initial Row Selection](#initial-row-selection)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={StructuredListStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(StructuredListStories.Default),
    },
  ]}
/>

## Skeleton

<Canvas
  of={StructuredListStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(StructuredListStories.Skeleton),
    },
  ]}
/>

## Initial Row Selection 
<Canvas
  of={StructuredListStories.InitialSelection}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(StructuredListStories.InitialSelection),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/StructuredList/StructuredList.mdx).



File: StructuredList/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  tall
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-structuredlist--default'
    },
    {
      label: 'Simple',
      variant: 'components-structuredlist--simple'
    },
    {
      label: 'Selection',
      variant: 'components-structuredlist--selection'
    }
  ]}
/>



File: StructuredList/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type StructuredListWrapperProps } from './StructuredList';
export * from './StructuredList';
export {
  default as StructuredListSkeleton,
  type StructuredListSkeletonProps,
} from './StructuredList.Skeleton';
export { type StructuredListWrapperProps };



File: StructuredList/StructuredList.featureflag.mdx


import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Components/StructuredList/Feature Flag" name="Flag details" />

# Structured List

## Enable structured list visible icons

```js
<FeatureFlags
  flags={{
    'enable-v12-structured-list-visible-icons': true,
  }}>
  <StructuredList />
</FeatureFlags>
```



File: StructuredList/StructuredList.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import mdx from './StructuredList.mdx';
import { WithLayer } from '../../../.storybook/templates/WithLayer';

import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListInput,
  StructuredListCell,
} from './';
import { CheckmarkFilled } from '@carbon/icons-react';
const prefix = 'cds';
import StructuredListSkeleton from './StructuredList.Skeleton';

export default {
  title: 'Components/StructuredList',
  component: StructuredListWrapper,
  subcomponents: {
    StructuredListHead,
    StructuredListBody,
    StructuredListRow,
    StructuredListInput,
    StructuredListCell,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return (
    <StructuredListWrapper {...args}>
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell head>ColumnA</StructuredListCell>
          <StructuredListCell head>ColumnB</StructuredListCell>
          <StructuredListCell head>ColumnC</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        <StructuredListRow>
          <StructuredListCell noWrap>Row 1</StructuredListCell>
          <StructuredListCell>Row 1</StructuredListCell>
          <StructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque
            vulputate nisl a porttitor interdum.
          </StructuredListCell>
        </StructuredListRow>
        <StructuredListRow>
          <StructuredListCell noWrap>Row 2</StructuredListCell>
          <StructuredListCell>Row 2</StructuredListCell>
          <StructuredListCell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque
            vulputate nisl a porttitor interdum.
          </StructuredListCell>
        </StructuredListRow>
      </StructuredListBody>
    </StructuredListWrapper>
  );
};

Default.args = {
  isCondensed: false,
  isFlush: false,
};

Default.parameters = {
  controls: {
    exclude: ['selection'],
  },
};
Default.argTypes = {
  isCondensed: {
    control: {
      type: 'boolean',
    },
  },
  isFlush: {
    control: {
      type: 'boolean',
    },
  },
};
const structuredListBodyRowGenerator = (numRows) => {
  return Array.apply(null, Array(numRows)).map((n, i) => (
    <StructuredListRow key={`row-${i}`} id={`row-${i}`}>
      <StructuredListCell>Row {i}</StructuredListCell>
      <StructuredListCell>Row {i}</StructuredListCell>
      <StructuredListCell>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna,
        finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel
        euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
        porttitor interdum.
      </StructuredListCell>
      <StructuredListInput
        id={`row-${i}`}
        value={`row-${i}`}
        title={`row-${i}`}
        name="row-0"
        aria-label={`row-${i}`}
      />
      <StructuredListCell>
        <CheckmarkFilled
          className={`${prefix}--structured-list-svg`}
          aria-label="select an option">
          <title>select an option</title>
        </CheckmarkFilled>
      </StructuredListCell>
    </StructuredListRow>
  ));
};

export const Selection = (args) => {
  return (
    <StructuredListWrapper selection {...args}>
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell head>ColumnA</StructuredListCell>
          <StructuredListCell head>ColumnB</StructuredListCell>
          <StructuredListCell head>ColumnC</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        {structuredListBodyRowGenerator(4)}
      </StructuredListBody>
    </StructuredListWrapper>
  );
};

export const InitialSelection = (args) => {
  return (
    <StructuredListWrapper selection {...args} selectedInitialRow="row-2">
      <StructuredListHead>
        <StructuredListRow head>
          <StructuredListCell head>ColumnA</StructuredListCell>
          <StructuredListCell head>ColumnB</StructuredListCell>
          <StructuredListCell head>ColumnC</StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        {structuredListBodyRowGenerator(4)}
      </StructuredListBody>
    </StructuredListWrapper>
  );
};

const sharedParameters = {
  controls: {
    exclude: ['isFlush', 'selection'],
  },
};

Selection.parameters = { ...sharedParameters };

InitialSelection.parameters = { ...sharedParameters };

export const WithBackgroundLayer = () => {
  return (
    <WithLayer>
      <StructuredListWrapper selection>
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>ColumnA</StructuredListCell>
            <StructuredListCell head>ColumnB</StructuredListCell>
            <StructuredListCell head>ColumnC</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {structuredListBodyRowGenerator(4)}
        </StructuredListBody>
      </StructuredListWrapper>
    </WithLayer>
  );
};

WithBackgroundLayer.parameters = { ...sharedParameters };

export const Skeleton = (args) => (
  <div style={{ width: '800px' }}>
    <StructuredListSkeleton {...args} />
  </div>
);

Skeleton.args = {
  rowCount: 5,
};

Skeleton.parameters = {
  controls: {
    include: ['rowCount', 'selectedInitialRow'],
  },
};

Skeleton.argTypes = {
  rowCount: {
    control: {
      type: 'number',
    },
  },
};



