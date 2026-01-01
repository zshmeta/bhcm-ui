File: Pagination/Pagination.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import SkeletonText from '../SkeletonText';
import { usePrefix } from '../../internal/usePrefix';

export interface PaginationSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add.
   */
  className?: string;
}

function PaginationSkeleton({ className, ...rest }: PaginationSkeletonProps) {
  const prefix = usePrefix();
  return (
    <div
      className={cx(`${prefix}--pagination`, `${prefix}--skeleton`, className)}
      {...rest}>
      <div className={`${prefix}--pagination__left`}>
        <SkeletonText width="70px" />
        <SkeletonText width="35px" />
        <SkeletonText width="105px" />
      </div>
      <div
        className={`${prefix}--pagination__right ${prefix}--pagination--inline`}>
        <SkeletonText width="70px" />
      </div>
    </div>
  );
}

PaginationSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default PaginationSkeleton;
export { PaginationSkeleton };



File: Pagination/Pagination.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CaretLeft, CaretRight } from '@carbon/icons-react';
import React, { useEffect, useRef, useState } from 'react';

import { IconButton } from '../IconButton';
import PropTypes from 'prop-types';
import Select from '../Select';
import SelectItem from '../SelectItem';
import cx from 'classnames';
import isEqual from 'react-fast-compare';
import { useFallbackId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';

type ExcludedAttributes = 'id' | 'onChange';

export interface PaginationPageSize {
  text: string;
  value: number;
}

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, ExcludedAttributes> {
  /**
   * The description for the backward icon.
   */
  backwardText?: string;

  /**
   * The CSS class names.
   */
  className?: string;

  /**
   * `true` if the backward/forward buttons, as well as the page select elements,  should be disabled.
   */
  disabled?: boolean;

  /**
   * The description for the forward icon.
   */
  forwardText?: string;

  /**
   * The unique ID of this component instance.
   */
  id?: string | number;

  // TODO: remove when v9 is deprecated
  /**
   * `true` if the current page should be the last page.
   */
  isLastPage?: boolean;

  /**
   * The function returning a translatable text showing where the current page is,
   * in a manner of the range of items.
   */
  itemRangeText?: (min: number, max: number, total: number) => string;

  /**
   * A variant of `itemRangeText`, used if the total number of items is unknown.
   */
  itemText?: (min: number, max: number) => string;

  /**
   * The translatable text indicating the number of items per page.
   */
  itemsPerPageText?: string;

  /**
   * The callback function called when the current page changes.
   */
  onChange?: (data: {
    page: number;
    pageSize: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    ref?: React.RefObject<any>;
  }) => void;

  /**
   * The current page.
   */
  page?: number;

  /**
   * `true` if the select box to change the page should be disabled.
   */
  pageInputDisabled?: boolean;

  pageNumberText?: string;

  /**
   * A function returning PII showing where the current page is.
   */
  pageRangeText?: (current: number, total: number) => string;

  /**
   * The number dictating how many items a page contains.
   */
  pageSize?: number;

  /**
   * `true` if the select box to change the items per page should be disabled.
   */
  pageSizeInputDisabled?: boolean;

  /**
   * The choices for `pageSize`.
   */
  pageSizes: number[] | PaginationPageSize[];

  /**
   * The translatable text showing the current page.
   */
  pageText?: (page: number, pagesUnknown?: boolean) => string;

  /**
   * `true` if the total number of items is unknown.
   */
  pagesUnknown?: boolean;

  /**
   * Specify the size of the Pagination.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * The total number of items.
   */
  totalItems?: number;
}

function mapPageSizesToObject(sizes) {
  return typeof sizes[0] === 'object' && sizes[0] !== null
    ? sizes
    : sizes.map((size) => ({ text: size, value: size }));
}

function renderSelectItems(total) {
  let counter = 1;
  const itemArr: React.ReactNode[] = [];
  while (counter <= total) {
    itemArr.push(
      <SelectItem key={counter} value={counter} text={String(counter)} />
    );
    counter++;
  }
  return itemArr;
}

function getPageSize(pageSizes, pageSize) {
  if (pageSize) {
    const hasSize = pageSizes.find((size) => {
      return pageSize === size.value;
    });

    if (hasSize) {
      return pageSize;
    }
  }
  return pageSizes[0].value;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const Pagination = React.forwardRef(
  (
    {
      backwardText = 'Previous page',
      className: customClassName = '',
      disabled = false,
      forwardText = 'Next page',
      id,
      isLastPage = false,
      itemText = (min, max) => `${min}–${max} items`,
      itemRangeText = (min, max, total) => `${min}–${max} of ${total} items`,
      itemsPerPageText = 'Items per page:',
      onChange,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
      pageNumberText: _pageNumberText = 'Page Number',
      pageRangeText = (_current, total) =>
        `of ${total} ${total === 1 ? 'page' : 'pages'}`,
      page: controlledPage = 1,
      pageInputDisabled,
      pageSize: controlledPageSize,
      pageSizeInputDisabled,
      pageSizes: controlledPageSizes,
      pageText = (page) => `page ${page}`,
      pagesUnknown = false,
      size = 'md',
      totalItems,
      ...rest
    }: PaginationProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const prefix = usePrefix();
    const inputId = useFallbackId(id?.toString());
    const backBtnRef = useRef<HTMLButtonElement>(null);
    const forwardBtnRef = useRef<HTMLButtonElement>(null);
    const [pageSizes, setPageSizes] = useState(() => {
      return mapPageSizesToObject(controlledPageSizes);
    });
    const [prevPageSizes, setPrevPageSizes] = useState(controlledPageSizes);

    const [page, setPage] = useState(controlledPage);
    const [prevControlledPage, setPrevControlledPage] =
      useState(controlledPage);
    const [focusTarget, setFocusTarget] = useState<
      'backward' | 'forward' | null
    >(null);

    const [pageSize, setPageSize] = useState(() => {
      return getPageSize(pageSizes, controlledPageSize);
    });
    const [prevControlledPageSize, setPrevControlledPageSize] =
      useState(controlledPageSize);

    const className = cx({
      [`${prefix}--pagination`]: true,
      [`${prefix}--pagination--${size}`]: size,
      [customClassName]: !!customClassName,
    });
    const totalPages = totalItems
      ? Math.max(Math.ceil(totalItems / pageSize), 1)
      : 1;
    const backButtonDisabled = disabled || page === 1;
    const backButtonClasses = cx({
      [`${prefix}--pagination__button`]: true,
      [`${prefix}--pagination__button--backward`]: true,
      [`${prefix}--pagination__button--no-index`]: backButtonDisabled,
    });
    const forwardButtonDisabled =
      disabled || (page === totalPages && !pagesUnknown);
    const forwardButtonClasses = cx({
      [`${prefix}--pagination__button`]: true,
      [`${prefix}--pagination__button--forward`]: true,
      [`${prefix}--pagination__button--no-index`]: forwardButtonDisabled,
    });
    const selectItems = renderSelectItems(totalPages);

    const focusMap = {
      backward: backBtnRef,
      forward: forwardBtnRef,
    };

    const handleFocus = (target: 'backward' | 'forward') => {
      const targetRef = focusMap[target];

      if (targetRef?.current && !targetRef.current.disabled) {
        targetRef.current.focus();
      }
    };

    useEffect(() => {
      if (focusTarget) {
        handleFocus(focusTarget);
        setFocusTarget(null);
      }
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
    }, [focusTarget]);

    // Sync state with props
    if (controlledPage !== prevControlledPage) {
      setPage(controlledPage);
      setPrevControlledPage(controlledPage);
    }

    if (controlledPageSize !== prevControlledPageSize) {
      setPageSize(getPageSize(pageSizes, controlledPageSize));
      setPrevControlledPageSize(controlledPageSize);
    }

    if (!isEqual(controlledPageSizes, prevPageSizes)) {
      const pageSizes = mapPageSizesToObject(controlledPageSizes);

      const hasPageSize = pageSizes.find((size) => {
        return size.value === pageSize;
      });

      // Reset page to 1 if the current pageSize is not included in the new page
      // sizes
      if (!hasPageSize) {
        setPage(1);
      }

      setPageSizes(pageSizes);
      setPrevPageSizes(controlledPageSizes);
    }

    function handleSizeChange(event) {
      const pageSize = Number(event.target.value);
      const changes = {
        pageSize,
        page: 1,
      };

      setPage(changes.page);
      setPageSize(changes.pageSize);

      if (onChange) {
        onChange(changes);
      }
    }

    function handlePageInputChange(event) {
      const page = Number(event.target.value);
      if (
        page > 0 &&
        totalItems &&
        page <= Math.max(Math.ceil(totalItems / pageSize), 1)
      ) {
        setPage(page);

        if (onChange) {
          onChange({
            page,
            pageSize,
          });
        }
      }
    }

    function incrementPage() {
      const nextPage = page + 1;
      setPage(nextPage);

      // when the increment button reaches the last page,
      // the icon button becomes disabled and the focus shifts to `main`
      // this presents an a11y problem for keyboard & screen reader users
      // instead, we want the focus to shift to the other pagination btn
      if (nextPage === totalPages) {
        setFocusTarget('backward');
      }

      if (onChange) {
        onChange({
          page: nextPage,
          pageSize,
          ref: backBtnRef,
        });
      }
    }

    function decrementPage() {
      const nextPage = page - 1;
      setPage(nextPage);

      // when the decrement button reaches the first page,
      // the icon button becomes disabled and the focus shifts to `main`
      // this presents an a11y problem for keyboard & screen reader users
      // instead, we want the focus to shift to the other pagination btn
      if (nextPage === 1) {
        setFocusTarget('forward');
      }

      if (onChange) {
        onChange({
          page: nextPage,
          pageSize,
          ref: forwardBtnRef,
        });
      }
    }

    return (
      <div className={className} ref={ref} {...rest}>
        <div className={`${prefix}--pagination__left`}>
          <label
            id={`${prefix}-pagination-select-${inputId}-count-label`}
            className={`${prefix}--pagination__text`}
            htmlFor={`${prefix}-pagination-select-${inputId}`}>
            {itemsPerPageText}
          </label>
          <Select
            id={`${prefix}-pagination-select-${inputId}`}
            className={`${prefix}--select__item-count`}
            labelText=""
            hideLabel
            noLabel
            inline
            onChange={handleSizeChange}
            disabled={pageSizeInputDisabled || disabled}
            value={pageSize}>
            {pageSizes.map((sizeObj) => (
              <SelectItem
                key={sizeObj.value}
                value={sizeObj.value}
                text={String(sizeObj.text)}
              />
            ))}
          </Select>
          <span
            className={`${prefix}--pagination__text ${prefix}--pagination__items-count`}>
            {pagesUnknown || !totalItems
              ? totalItems === 0
                ? itemRangeText(0, 0, 0)
                : itemText(pageSize * (page - 1) + 1, page * pageSize)
              : itemRangeText(
                  Math.min(pageSize * (page - 1) + 1, totalItems),
                  Math.min(page * pageSize, totalItems),
                  totalItems
                )}
          </span>
        </div>
        <div className={`${prefix}--pagination__right`}>
          {pagesUnknown ? (
            <span
              className={`${prefix}--pagination__text ${prefix}--pagination__page-text ${prefix}--pagination__unknown-pages-text`}>
              {pageText(page)}
            </span>
          ) : (
            <>
              <Select
                id={`${prefix}-pagination-select-${inputId}-right`}
                className={`${prefix}--select__page-number`}
                labelText={`Page of ${totalPages} pages`}
                inline
                hideLabel
                onChange={handlePageInputChange}
                value={page}
                key={page}
                disabled={pageInputDisabled || disabled}>
                {selectItems}
              </Select>
              <span className={`${prefix}--pagination__text`}>
                {pageRangeText(page, totalPages)}
              </span>
            </>
          )}
          <div className={`${prefix}--pagination__control-buttons`}>
            <IconButton
              align="top"
              disabled={backButtonDisabled}
              kind="ghost"
              className={backButtonClasses}
              label={backwardText}
              aria-label={backwardText}
              onClick={decrementPage}
              ref={backBtnRef}>
              <CaretLeft />
            </IconButton>
            <IconButton
              align="top"
              disabled={forwardButtonDisabled || isLastPage}
              kind="ghost"
              className={forwardButtonClasses}
              label={forwardText}
              aria-label={forwardText}
              onClick={incrementPage}
              ref={forwardBtnRef}>
              <CaretRight />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
);

Pagination.propTypes = {
  /**
   * The description for the backward icon.
   */
  backwardText: PropTypes.string,

  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * `true` if the backward/forward buttons, as well as the page select elements,  should be disabled.
   */
  disabled: PropTypes.bool,

  /**
   * The description for the forward icon.
   */
  forwardText: PropTypes.string,

  /**
   * The unique ID of this component instance.
   */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // TODO: remove when v9 is deprecated
  /**
   * `true` if the current page should be the last page.
   */
  isLastPage: PropTypes.bool,

  /**
   * The function returning a translatable text showing where the current page is,
   * in a manner of the range of items.
   */
  itemRangeText: PropTypes.func,

  /**
   * A variant of `itemRangeText`, used if the total number of items is unknown.
   */
  itemText: PropTypes.func,

  /**
   * The translatable text indicating the number of items per page.
   */
  itemsPerPageText: PropTypes.string,

  /**
   * The callback function called when the current page changes.
   */
  onChange: PropTypes.func,

  /**
   * The current page.
   */
  page: PropTypes.number,

  /**
   * `true` if the select box to change the page should be disabled.
   */
  pageInputDisabled: PropTypes.bool,

  pageNumberText: PropTypes.string,

  /**
   * A function returning PII showing where the current page is.
   */
  pageRangeText: PropTypes.func,

  /**
   * The number dictating how many items a page contains.
   */
  pageSize: PropTypes.number,

  /**
   * `true` if the select box to change the items per page should be disabled.
   */
  pageSizeInputDisabled: PropTypes.bool,

  /**
   * The choices for `pageSize`.
   */
  pageSizes: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number.isRequired),
    PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      }).isRequired
    ),
  ]).isRequired,

  /**
   * The translatable text showing the current page.
   */
  pageText: PropTypes.func,

  /**
   * `true` if the total number of items is unknown.
   */
  pagesUnknown: PropTypes.bool,

  /**
   * Specify the size of the Pagination.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * The total number of items.
   */
  totalItems: PropTypes.number,
};

export default Pagination;



File: Pagination/Pagination.mdx


import { ArgTypes, Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as PaginationStories from './Pagination.stories';
import Pagination from '../Pagination';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Pagination

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Pagination)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/pagination/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/pagination/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Multiple pagination components](#multiple-pagination-components)
- [Pagination unknown pages](#pagination-unknown-pages)
- [Pagination with custom page sizes label](#pagination-with-custom-page-sizes-label)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

  <Canvas
    of={PaginationStories.Default}
    additionalActions={[
      {
        title: 'Open in Stackblitz',
        onClick: () => stackblitzPrefillConfig(PaginationStories.Default),
      },
    ]}
  />

## Multiple pagination components
  <Canvas
    of={PaginationStories.MultiplePaginationComponents}
    additionalActions={[
      {
        title: 'Open in Stackblitz',
        onClick: () => stackblitzPrefillConfig(PaginationStories.MultiplePaginationComponents),
      },
    ]}
  />

## Pagination unknown pages

  <Canvas
    of={PaginationStories.PaginationUnknownPages}
    additionalActions={[
      {
        title: 'Open in Stackblitz',
        onClick: () => stackblitzPrefillConfig(PaginationStories.PaginationUnknownPages),
      },
    ]}
  />

## Pagination with custom page sizes label

    <Canvas
    of={PaginationStories.PaginationWithCustomPageSizesLabel}
    additionalActions={[
      {
        title: 'Open in Stackblitz',
        onClick: () => stackblitzPrefillConfig(PaginationStories.PaginationWithCustomPageSizesLabel),
      },
    ]}
  />

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Pagination/Pagination.mdx).



File: Pagination/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Pagination from './Pagination';

export * from './Pagination.Skeleton';

export default Pagination;
export { Pagination };



File: Pagination/Pagination.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Pagination from './Pagination';
import React from 'react';
import { action } from 'storybook/actions';
import mdx from './Pagination.mdx';

const props = () => ({
  disabled: false,
  page: 1,
  totalItems: 103,
  pagesUnknown: false,
  pageInputDisabled: undefined,
  pageSizeInputDisabled: undefined,
  backwardText: 'Previous',
  forwardText: 'Next',
  pageSize: 10,
  pageSizes: [10, 20, 30, 40, 50],
  itemsPerPageText: 'Items per page:',
  onChange: action('onChange'),
});

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
  args: {
    size: 'md',
  },
  decorators: [
    (story) => (
      <div style={{ maxWidth: '800px', marginTop: '15px' }}>{story()}</div>
    ),
  ],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return <Pagination pageSizes={[10, 20, 30, 40, 50]} {...args} />;
};

Default.args = {
  backwardText: 'Previous',
  forwardText: 'Next',
  disabled: false,
  isLastPage: false,
  itemsPerPageText: 'Items per page:',
  page: 1,
  pageInputDisabled: false,
  pageSize: 10,
  pageSizes: [10, 20, 30, 40, 50],
  pageNumberText: 'Page Number',
  pagesUnknown: false,
  pageSizeInputDisabled: false,
  totalItems: 103,
};

Default.argTypes = {
  className: {
    control: false,
  },
  id: {
    control: false,
  },
  itemText: {
    control: false,
  },
  backwardText: {
    control: {
      type: 'text',
    },
  },
  forwardText: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  isLastPage: {
    control: {
      type: 'boolean',
    },
  },
  itemsPerPageText: {
    control: {
      type: 'text',
    },
  },
  page: {
    control: {
      type: 'number',
    },
  },
  pageInputDisabled: {
    control: {
      type: 'boolean',
    },
  },
  pageSize: {
    control: {
      type: 'number',
    },
  },
  pageSizes: {
    control: {
      type: 'array',
    },
  },
  pageNumberText: {
    control: {
      type: 'text',
    },
  },
  pagesUnknown: {
    control: {
      type: 'boolean',
    },
  },
  pageSizeInputDisabled: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  totalItems: {
    control: {
      type: 'number',
    },
  },
};

export const MultiplePaginationComponents = (args) => {
  return (
    <div>
      <Pagination {...props()} {...args} />
      <Pagination {...props()} {...args} />
    </div>
  );
};

MultiplePaginationComponents.storyName = 'Multiple Pagination components';

export const PaginationWithCustomPageSizesLabel = (args) => {
  return (
    <div>
      <Pagination
        {...props()}
        pageSizes={[
          { text: 'Ten', value: 10 },
          { text: 'Twenty', value: 20 },
          { text: 'Thirty', value: 30 },
          { text: 'Forty', value: 40 },
          { text: 'Fifty', value: 50 },
        ]}
        {...args}
      />
    </div>
  );
};

PaginationWithCustomPageSizesLabel.storyName =
  'Pagination with custom page sizes label';

export const PaginationUnknownPages = (args) => {
  return (
    <div>
      <Pagination
        {...props()}
        pagesUnknown={true}
        totalItems={undefined}
        page={1}
        {...args}
      />
    </div>
  );
};

PaginationUnknownPages.storyName = 'Unknown pages and items';



File: Pagination/experimental/PageSelector.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useId } from '../../../internal/useId';
import Select from '../../Select';
import SelectItem from '../../SelectItem';
import { usePrefix } from '../../../internal/usePrefix';

function PageSelector({
  className = null,
  currentPage,
  id = 1,
  labelText = 'Current page number',
  totalPages,
  ...other
}) {
  const prefix = usePrefix();
  const namespace = `${prefix}--unstable-pagination__page-selector`;
  const instanceId = `${namespace}__select-${useId()}`;

  const renderPages = (total) => {
    const pages = [];
    for (let counter = 1; counter <= total; counter += 1) {
      pages.push(
        <SelectItem key={counter} value={counter} text={String(counter)} />
      );
    }
    return pages;
  };

  return (
    <Select
      className={classnames(namespace, className)}
      hideLabel
      id={instanceId || id}
      inline
      labelText={labelText}
      value={currentPage}
      {...other}>
      {renderPages(totalPages)}
    </Select>
  );
}

PageSelector.propTypes = {
  /** Extra class names to add. */
  className: PropTypes.string,

  /** The current page. */
  currentPage: PropTypes.number.isRequired,

  /** The unique ID of this component instance. */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Translatable string to label the page selector element. */
  labelText: PropTypes.string,

  /**
   * Total number of pages.
   * This value is calculated using a valid `totalItems` prop passed to the parent `Unstable_Pagination`.
   */
  totalPages: PropTypes.number.isRequired,
};

export default PageSelector;



File: Pagination/experimental/Pagination.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CaretRight, CaretLeft } from '@carbon/icons-react';
import Select from '../../Select';
import SelectItem from '../../SelectItem';
import { IconButton } from '../../IconButton';
import { usePrefix } from '../../../internal/usePrefix';

function Pagination({
  backwardText = 'Previous page',
  children = undefined,
  className = null,
  disabled = false,
  forwardText = 'Next page',
  id = 1,
  initialPage = 1,
  itemsPerPageText = 'Items per page:',
  itemRangeText = (min, max, total) => `${min}–${max} of ${total} items`,
  itemText = (min, max) => `${min}–${max} items`,
  onChange,
  pageRangeText = (current, total) => `${current} of ${total} pages`,
  pageSize = 10,
  pageSizes = undefined,
  pageText = (page) => `page ${page}`,
  pagesUnknown = false,
  totalItems = undefined,
  ...other
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const prefix = usePrefix();

  const totalPages = totalItems
    ? Math.max(Math.ceil(totalItems / currentPageSize), 1)
    : undefined;

  const backButtonDisabled = disabled || currentPage === 1;
  const forwardButtonDisabled = disabled || currentPage === totalPages;

  function onSetPage(newPage) {
    setCurrentPage(Number(newPage));
  }

  function incrementPage() {
    const page = currentPage + 1;
    setCurrentPage(page);
    onChange({ page, pageSize: currentPageSize });
  }

  function decrementPage() {
    const page = currentPage - 1;
    setCurrentPage(page);
    onChange({ page, pageSize: currentPageSize });
  }

  const namespace = `${prefix}--unstable-pagination`;

  return (
    <section className={classnames(namespace, className)} {...other}>
      <div className={`${namespace}__left`}>
        {pageSizes && (
          <>
            <label
              id={`${namespace}__page-sizer__counter-${id}`}
              className={`${namespace}__text`}
              htmlFor={`${namespace}__page-sizer__input-${id}`}>
              {itemsPerPageText}
            </label>
            <Select
              id={`${namespace}__page-sizer__input-${id}`}
              className={`${namespace}__page-sizer`}
              labelText=""
              hideLabel
              noLabel
              inline
              onChange={(event) =>
                setCurrentPageSize(Number(event.target.value))
              }
              value={currentPageSize}>
              {pageSizes.map((size) => (
                <SelectItem key={size} value={size} text={String(size)} />
              ))}
            </Select>
          </>
        )}
        <span className={`${namespace}__text`}>
          {totalItems &&
            !pagesUnknown &&
            itemRangeText(
              Math.min(currentPageSize * (currentPage - 1) + 1, totalItems),
              Math.min(currentPage * currentPageSize, totalItems),
              totalItems
            )}

          {totalItems &&
            pagesUnknown &&
            itemText(
              currentPageSize * (currentPage - 1) + 1,
              currentPage * currentPageSize
            )}

          {!totalItems &&
            itemText(
              currentPageSize * (currentPage - 1) + 1,
              currentPage * currentPageSize
            )}
        </span>
      </div>
      <div className={`${namespace}__right`}>
        {children &&
          totalItems &&
          children({
            currentPage,
            currentPageSize,
            onSetPage,
            totalPages,
          })}

        {children && totalItems && !pagesUnknown && (
          <span className={`${namespace}__text`}>
            {pageRangeText('', totalPages)}
          </span>
        )}

        {children && !totalItems && (
          <span className={`${namespace}__text`}>{pageText(currentPage)}</span>
        )}

        {!children && (
          <span className={`${namespace}__text`}>
            {!totalItems
              ? pageText(currentPage)
              : pageRangeText(currentPage, totalPages)}
          </span>
        )}
        {
          <>
            <IconButton
              align="top"
              disabled={backButtonDisabled}
              kind="ghost"
              className={classnames(
                `${namespace}__button`,
                `${namespace}__button--backward`,
                {
                  [`${namespace}__button--no-index`]: backButtonDisabled,
                }
              )}
              label={backwardText}
              onClick={() => decrementPage()}>
              <CaretLeft />
            </IconButton>
            <IconButton
              align="top-right"
              disabled={forwardButtonDisabled}
              kind="ghost"
              className={classnames(
                `${namespace}__button`,
                `${namespace}__button--forward`,
                {
                  [`${namespace}__button--no-index`]: forwardButtonDisabled,
                }
              )}
              label={forwardText}
              onClick={() => incrementPage()}>
              <CaretRight />
            </IconButton>
          </>
        }
      </div>
    </section>
  );
}

Pagination.propTypes = {
  /**
   * The description for the backward icon.
   */
  backwardText: PropTypes.string,

  /**
   * The children of the pagination component.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /**
   * Extra classes to add.
   */
  className: PropTypes.string,

  /**
   * `true` if the backward/forward buttons should be disabled.
   */
  disabled: PropTypes.bool,

  /**
   * The description for the forward icon.
   */
  forwardText: PropTypes.string,

  /** The unique ID of this component instance. */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * The initial active page when the component is first mounted.
   */
  initialPage: PropTypes.number,

  /**
   * The function returning a translatable text showing where the current page is,
   * in a manner of the range of items.
   */
  itemRangeText: PropTypes.func,

  /**
   * A variant of `itemRangeText`, used if the total number of items is unknown.
   */
  itemText: PropTypes.func,

  /**
   * The translatable text indicating the number of items per page.
   */
  itemsPerPageText: PropTypes.string,

  /**
   * The callback function called when the current page changes.
   */
  onChange: PropTypes.func,

  /**
   * The function returning a translatable text showing where the current page is,
   * in a manner of the total number of pages.
   */
  pageRangeText: PropTypes.func,

  /**
   * The number dictating how many items a page contains.
   */
  pageSize: PropTypes.number,

  /**
   * The choices for `pageSize`.
   */
  pageSizes: PropTypes.arrayOf(PropTypes.number),

  /**
   * The translatable text showing the current page.
   */
  pageText: PropTypes.func,

  /**
   * `true` if total number of pages is unknown.
   */
  pagesUnknown: PropTypes.bool,

  /**
   * The total number of items.
   * You need to provide total items to calculate total page,
   * which is required by a child like the `PageSelector`
   * to know how many pages to display.
   */
  totalItems: PropTypes.number,
};

export default Pagination;



File: Pagination/experimental/Pagination-story.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import {
  preview_PageSelector as PageSelector,
  preview_Pagination as Pagination,
} from '../../..';

const props = () => ({
  disabled: false,
  pagesUnknown: false,
  backwardText: 'Previous page',
  forwardText: 'Next page',
  pageSize: 10,
  itemsPerPageText: 'Items per page:',
  onChange: action('onChange'),
});

export default {
  title: 'Preview/preview_Pagination',
  component: Pagination,
  subcomponents: {
    PageSelector,
  },
  decorators: [(story) => <div style={{ width: '800px' }}>{story()}</div>],
};

export const WithAPageSelector = () => (
  <Pagination {...props()} totalItems={350} pageSizes={[10, 20, 30]}>
    {({ currentPage, onSetPage, totalPages }) => (
      <PageSelector
        currentPage={currentPage}
        id="select-1"
        onChange={(event) => onSetPage(event.target.value)}
        totalPages={totalPages}
      />
    )}
  </Pagination>
);

WithAPageSelector.storyName = 'with a page selector';

export const WithNoSizerChildInputOrChildSelector = () => (
  <Pagination {...props()} totalItems={350} />
);

WithNoSizerChildInputOrChildSelector.storyName =
  'with no sizer, child input, or child selector';

export const Playground = (args) => <Pagination {...args} />;

Playground.argTypes = {
  className: {
    control: false,
  },
  children: {
    control: false,
  },
  id: {
    control: false,
  },
  itemText: {
    control: false,
  },
  forwardText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Next page',
  },
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: 'false',
  },
  itemRangeText: {
    control: false,
  },
  itemsPerPageText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Items per page:',
  },
  initialPage: {
    control: {
      type: 'number',
    },
    defaultValue: 1,
  },
  pageSize: {
    control: {
      type: 'number',
    },
    defaultValue: 10,
  },
  pageSizes: {
    control: {
      type: 'array',
    },
    defaultValue: [10, 20, 30, 40, 50],
  },
  pagesUnknown: {
    control: {
      type: 'boolean',
    },
    defaultValue: 'false',
  },
  totalItems: {
    control: {
      type: 'number',
    },
    defaultValue: 350,
  },
};



File: Pagination/experimental/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  wide
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'With a Page Selector',
      variant: 'experimental-unstable-pagination--with-a-page-selector'
    },
    {
      label: 'With no Sizer, Child Input, or Child Selector',
      variant: 'experimental-unstable-pagination--with-no-sizer-child-input-or-child-selector'
    }
  ]}
/>



File: Pagination/experimental/index.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Pagination from './Pagination';
import PageSelector from './PageSelector';

export { PageSelector, Pagination };



File: Pagination/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-pagination--default'
    },
    {
      label: 'Multiple Pagination Components',
      variant: 'components-pagination--multiple-pagination-components'
    },
    {
      label: 'Pagination with custom page sizes label',
      variant: 'components-pagination--pagination-with-custom-page-sizes-label'
    }
  ]}
/>



