File: PaginationNav/PaginationNav.mdx


import { ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as PaginationNavStories from './PaginationNav.stories';
import PaginationNav from '../PaginationNav';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# PaginationNav

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/PaginationNav)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

  <Canvas
    of={PaginationNavStories.Default}
    additionalActions={[
      {
        title: 'Open in Stackblitz',
        onClick: () => stackblitzPrefillConfig(PaginationNavStories.Default),
      },
    ]}
  />

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/PaginationNav.mdx).



File: PaginationNav/PaginationNav-test.js


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PaginationNav from './PaginationNav';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const prefix = 'cds';

describe('PaginationNav', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(
        <PaginationNav totalItems={10} data-testid="test-id" />
      );

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <PaginationNav totalItems={10} className="custom-class" />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect itemsShown prop', () => {
      render(<PaginationNav totalItems={10} itemsShown={4} />);

      expect(
        // eslint-disable-next-line testing-library/no-node-access
        document.querySelectorAll('.cds--pagination-nav__page').length
      ).toBe(4);
    });

    it('should respect loop prop', async () => {
      render(<PaginationNav totalItems={4} loop />);

      await userEvent.click(screen.getByText('4'));

      await userEvent.click(screen.getByLabelText('Next'));
      expect(screen.getByText('1')).toHaveAttribute('aria-current', 'page');

      await userEvent.click(screen.getByText('1'));
      await userEvent.click(screen.getByLabelText('Previous'));

      expect(screen.getByText('4')).toHaveAttribute('aria-current', 'page');
    });

    it('should respect onChange prop', async () => {
      const onChange = jest.fn();

      render(<PaginationNav totalItems={10} onChange={onChange} />);
      await userEvent.click(screen.getByText('4'));
      expect(onChange).toHaveBeenCalled();
    });

    it('should respect page prop', () => {
      render(<PaginationNav totalItems={10} page={3} />);

      expect(screen.getByText('4')).toHaveAttribute('aria-current', 'page');
    });

    it('should respect totalItems prop', () => {
      render(<PaginationNav totalItems={5} />);

      expect(
        // eslint-disable-next-line testing-library/no-node-access
        document.querySelectorAll('.cds--pagination-nav__page').length
      ).toBe(5);
    });

    it('should disable "Previous" button when on first page and loop is false', () => {
      render(<PaginationNav totalItems={4} />);

      expect(screen.getByLabelText('Previous')).toBeDisabled();
    });

    it('should disable "Next" button when on last page and loop is false', () => {
      render(<PaginationNav totalItems={4} page={3} />);

      expect(screen.getByLabelText('Next')).toBeDisabled();
    });

    it('should render in small size and let user render 4 pages', () => {
      render(
        <PaginationNav
          size="sm"
          totalItems={10}
          itemsShown={4}
          aria-label="pagination"
        />
      );

      expect(screen.getByLabelText('pagination')).toHaveClass(
        `${prefix}--pagination-nav ${prefix}--layout--size-sm`
      );
      expect(screen.getByLabelText('Select Page number')).toBeInTheDocument();
    });

    it('should render in medium size and let user render 4 pages', () => {
      render(
        <PaginationNav
          size="md"
          totalItems={10}
          itemsShown={4}
          aria-label="pagination"
        />
      );

      expect(screen.getByLabelText('pagination')).toHaveClass(
        `${prefix}--pagination-nav ${prefix}--layout--size-md`
      );
      expect(screen.getByLabelText('Select Page number')).toBeInTheDocument();
    });

    it('should render in default (large) size and let user render 4 pages', () => {
      render(
        <PaginationNav
          size="lg"
          totalItems={10}
          itemsShown={4}
          aria-label="pagination"
        />
      );

      expect(screen.getByLabelText('pagination')).toHaveClass(
        `${prefix}--pagination-nav ${prefix}--layout--size-lg`
      );
      expect(screen.getByLabelText('Select Page number')).toBeInTheDocument();
    });

    it('should respect tooltipAlignment and tooltipPosition props', () => {
      render(
        <PaginationNav
          totalItems={10}
          tooltipAlignment="end"
          tooltipPosition="right"
        />
      );

      expect(
        document.querySelector('.cds--popover--right-end')
      ).toBeInTheDocument();
    });
  });

  describe('behaves as expected', () => {
    it('should move to next page when "Next" is pressed', async () => {
      render(<PaginationNav totalItems={4} loop />);

      await userEvent.click(screen.getByLabelText('Next'));
      expect(screen.getByText('2')).toHaveAttribute('aria-current', 'page');
    });

    it('should move to previous page when "Previous" is pressed', async () => {
      render(<PaginationNav totalItems={4} loop />);

      await userEvent.click(screen.getByText('4'));

      await userEvent.click(screen.getByLabelText('Previous'));
      expect(screen.getByText('3')).toHaveAttribute('aria-current', 'page');
    });

    it('should move to page that is pressed', async () => {
      render(<PaginationNav totalItems={4} loop />);

      await userEvent.click(screen.getByText('4'));

      expect(screen.getByText('4')).toHaveAttribute('aria-current', 'page');
    });

    it('should render PaginationNav correctly and navigate through different page ranges using select elements', async () => {
      render(<PaginationNav totalItems={10} itemsShown={4} />);

      // Initial state: < 1 2 ... 10 >
      expect(screen.getByText('1')).toHaveAttribute('aria-current', 'page');
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();

      let selectElements = screen.getAllByLabelText('Select Page number');
      expect(selectElements).toHaveLength(1);

      // Select page 6 from the dropdown
      await userEvent.selectOptions(selectElements[0], '6');

      // New state: < ... 6 ... 10 >
      expect(screen.getByText('6')).toHaveAttribute('aria-current', 'page');

      // Check for two select elements in this state
      selectElements = screen.getAllByLabelText('Select Page number');
      expect(selectElements).toHaveLength(2);

      // Select page 1 from the first dropdown
      await userEvent.selectOptions(selectElements[0], '1');

      // Final state: < 1 2 ... 10 >
      expect(screen.getByText('1')).toHaveAttribute('aria-current', 'page');
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();

      // Check that we're back to one select element
      selectElements = screen.getAllByLabelText('Select Page number');
      expect(selectElements).toHaveLength(1);
    });
  });
});



File: PaginationNav/PaginationNav.tsx


/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import {
  CaretRight,
  CaretLeft,
  OverflowMenuHorizontal,
} from '@carbon/icons-react';
import { IconButton } from '../IconButton';
import { usePrefix } from '../../internal/usePrefix';
import type { TFunc, TranslateWithId } from '../../types/common';
import { breakpoints } from '@carbon/layout';
import { useMatchMedia } from '../../internal/useMatchMedia';
import { clamp } from '../../internal/clamp';
import { PopoverAlignment } from '../Popover';

type TooltipAlignment = 'start' | 'center' | 'end';
type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

const translationIds = {
  'carbon.pagination-nav.next': 'carbon.pagination-nav.next',
  'carbon.pagination-nav.previous': 'carbon.pagination-nav.previous',
  'carbon.pagination-nav.item': 'carbon.pagination-nav.item',
  'carbon.pagination-nav.active': 'carbon.pagination-nav.active',
  'carbon.pagination-nav.of': 'carbon.pagination-nav.of',
} as const;

type TranslationKey = keyof typeof translationIds;

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['carbon.pagination-nav.next']]: 'Next',
  [translationIds['carbon.pagination-nav.previous']]: 'Previous',
  [translationIds['carbon.pagination-nav.item']]: 'Page',
  [translationIds['carbon.pagination-nav.active']]: 'Active',
  [translationIds['carbon.pagination-nav.of']]: 'of',
};

const defaultTranslateWithId: TFunc<TranslationKey> = (messageId) => {
  return defaultTranslations[messageId];
};

// https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
function usePrevious(value: number) {
  const ref = useRef<number | null>(null);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

function calculateCuts(
  page: number,
  totalItems: number,
  itemsDisplayedOnPage: number,
  splitPoint: number | null = null
) {
  if (itemsDisplayedOnPage >= totalItems) {
    return { front: 0, back: 0 };
  }

  const split = splitPoint || Math.ceil(itemsDisplayedOnPage / 2) - 1;

  let frontHidden = page + 1 - split;
  let backHidden = totalItems - page - (itemsDisplayedOnPage - split) + 1;

  if (frontHidden <= 1) {
    backHidden -= frontHidden <= 0 ? Math.abs(frontHidden) + 1 : 0;
    frontHidden = 0;
  }

  if (backHidden <= 1) {
    frontHidden -= backHidden <= 0 ? Math.abs(backHidden) + 1 : 0;
    backHidden = 0;
  }

  return { front: frontHidden, back: backHidden };
}

export interface DirectionButtonProps {
  /**
   * The direction this button represents ("forward" or "backward").
   */
  direction?: 'forward' | 'backward';

  /**
   * Whether or not the button should be disabled.
   */
  disabled?: boolean;

  /**
   * The label shown in the button's tooltip.
   */
  label?: string;

  /**
   * The callback function called when the button is clicked.
   */
  onClick?: React.MouseEventHandler;

  /**
   * Specify the alignment of the tooltip for the icon-only next/prev buttons.
   */
  tooltipAlignment?: TooltipAlignment;

  /**
   * Specify the position of the tooltip for the icon-only next/prev buttons.
   */
  tooltipPosition?: TooltipPosition;
}

function DirectionButton({
  direction,
  label,
  disabled,
  onClick,
  tooltipAlignment = 'center',
  tooltipPosition = 'bottom',
}: DirectionButtonProps) {
  const prefix = usePrefix();

  const align: PopoverAlignment =
    tooltipAlignment === 'center'
      ? (tooltipPosition as PopoverAlignment)
      : (`${tooltipPosition}-${tooltipAlignment}` as PopoverAlignment);

  return (
    <li className={`${prefix}--pagination-nav__list-item`}>
      <IconButton
        align={align}
        disabled={disabled}
        kind="ghost"
        label={label}
        onClick={onClick}>
        {direction === 'forward' ? <CaretRight /> : <CaretLeft />}
      </IconButton>
    </li>
  );
}

export interface PaginationItemProps
  extends TranslateWithId<
    'carbon.pagination-nav.item' | 'carbon.pagination-nav.active'
  > {
  /**
   * Whether or not this is the currently active page.
   */
  isActive?: boolean;

  /**
   * The callback function called when the item is clicked.
   */
  onClick?: React.MouseEventHandler;

  /**
   * The page number this item represents.
   */
  page?: number;
}

function PaginationItem({
  page,
  isActive,
  onClick,
  translateWithId: t = defaultTranslateWithId,
}: PaginationItemProps) {
  const prefix = usePrefix();
  const itemLabel = t('carbon.pagination-nav.item');

  return (
    <li className={`${prefix}--pagination-nav__list-item`}>
      <button
        type="button"
        className={classnames(`${prefix}--pagination-nav__page`, {
          [`${prefix}--pagination-nav__page--active`]: isActive,
        })}
        onClick={onClick}
        data-page={page}
        aria-current={isActive ? 'page' : undefined}>
        <span className={`${prefix}--pagination-nav__accessibility-label`}>
          {isActive
            ? `${t('carbon.pagination-nav.active')}, ${itemLabel}`
            : itemLabel}
        </span>
        {page}
      </button>
    </li>
  );
}

export interface PaginationOverflowProps
  extends TranslateWithId<
    'carbon.pagination-nav.item' | 'carbon.pagination-nav.active'
  > {
  /**
   * How many items to display in this overflow.
   */
  count?: number;

  /**
   * From which index on this overflow should start displaying pages.
   */
  fromIndex?: number;

  /**
   * The callback function called when the user selects a page from the overflow.
   */
  onSelect?: (id: number) => void;

  /**
   * If true, the '...' pagination overflow will not render page links between the first and last rendered buttons.
   * Set this to true if you are having performance problems with large data sets.
   */
  disableOverflow?: boolean;
}

function PaginationOverflow({
  fromIndex = NaN,
  count = NaN,
  onSelect,

  disableOverflow,
  translateWithId: t = defaultTranslateWithId,
}: PaginationOverflowProps) {
  const prefix = usePrefix();

  //If overflow is disabled, return a select tag with no select options
  if (disableOverflow === true && count > 1) {
    return (
      <li className={`${prefix}--pagination-nav__list-item`}>
        <div className={`${prefix}--pagination-nav__select`}>
          {}
          <select
            className={`${prefix}--pagination-nav__page ${prefix}--pagination-nav__page--select`}
            aria-label={`Select ${t('carbon.pagination-nav.item')} number`}
            disabled></select>
          <div className={`${prefix}--pagination-nav__select-icon-wrapper`}>
            <OverflowMenuHorizontal
              className={`${prefix}--pagination-nav__select-icon`}
            />
          </div>
        </div>
      </li>
    );
  }

  if (count > 1) {
    return (
      <li className={`${prefix}--pagination-nav__list-item`}>
        <div className={`${prefix}--pagination-nav__select`}>
          {}
          <select
            className={`${prefix}--pagination-nav__page ${prefix}--pagination-nav__page--select`}
            aria-label={`Select ${t('carbon.pagination-nav.item')} number`}
            onChange={(e) => {
              const index = Number(e.target.value);
              onSelect?.(index);
            }}>
            {}
            <option value="" hidden />
            {[...Array(count)].map((e, i) => (
              <option
                value={(fromIndex + i).toString()}
                data-page={fromIndex + i + 1}
                key={`overflow-${fromIndex + i}`}>
                {fromIndex + i + 1}
              </option>
            ))}
          </select>
          <div className={`${prefix}--pagination-nav__select-icon-wrapper`}>
            <OverflowMenuHorizontal
              className={`${prefix}--pagination-nav__select-icon`}
            />
          </div>
        </div>
      </li>
    );
  }

  if (count === 1) {
    return (
      <PaginationItem
        page={fromIndex + 1}
        translateWithId={t}
        onClick={() => {
          onSelect?.(fromIndex);
        }}
      />
    );
  }

  return null;
}

export interface PaginationNavProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'>,
    TranslateWithId<TranslationKey> {
  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * If true, the '...' pagination overflow will not render page links between the first and last rendered buttons.
   * Set this to true if you are having performance problems with large data sets.
   */
  disableOverflow?: boolean;

  /**
   * The number of items to be shown (minimum of 4 unless props.items < 4).
   */
  itemsShown?: number;

  /**
   * Whether user should be able to loop through the items when reaching first / last.
   */
  loop?: boolean;

  /**
   * The callback function called when the current page changes.
   */
  onChange?: (data: number) => void;

  /**
   * The index of current page.
   */
  page?: number;

  /**
   * Specify the size of the PaginationNav.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Specify the alignment of the tooltip for the icon-only next/prev buttons.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment?: TooltipAlignment;

  /**
   * Specify the position of the tooltip for the icon-only next/prev buttons.
   * Can be one of: top, right, bottom, or left.
   */
  tooltipPosition?: TooltipPosition;

  /**
   * The total number of items.
   */
  totalItems?: number;
}

const PaginationNav = React.forwardRef<HTMLElement, PaginationNavProps>(
  (
    {
      className,
      onChange = () => {},
      totalItems = NaN,
      disableOverflow,
      itemsShown = 10,
      page = 0,
      loop = false,
      size = 'lg',
      tooltipAlignment,
      tooltipPosition,
      translateWithId: t = defaultTranslateWithId,
      ...rest
    },
    ref
  ) => {
    const smMediaQuery = `(max-width: ${breakpoints.sm.width})`;
    const isSm = useMatchMedia(smMediaQuery);

    let numberOfPages: number;

    switch (size) {
      case 'md':
        numberOfPages = itemsShown === 4 ? itemsShown : 5;
        break;
      case 'sm':
        numberOfPages = clamp(itemsShown, 4, 7);
        break;

      default:
        numberOfPages = 4;
        break;
    }

    const [currentPage, setCurrentPage] = useState(page);
    const [itemsDisplayedOnPage, setItemsDisplayedOnPage] = useState(
      itemsShown >= 4 && !isSm ? itemsShown : numberOfPages
    );

    const [cuts, setCuts] = useState(
      calculateCuts(currentPage, totalItems, itemsDisplayedOnPage)
    );
    const prevPage = usePrevious(currentPage);
    const prefix = usePrefix();
    const [isOverflowDisabled, setIsOverFlowDisabled] =
      useState(disableOverflow);
    function jumpToItem(index: number) {
      if (index >= 0 && index < totalItems) {
        setCurrentPage(index);
        onChange(index);
      }
    }

    function jumpToNext() {
      const nextIndex = currentPage + 1;

      if (nextIndex >= totalItems) {
        if (loop) {
          jumpToItem(0);
        }
      } else {
        jumpToItem(nextIndex);
      }
    }

    function jumpToPrevious() {
      const previousIndex = currentPage - 1;

      if (previousIndex < 0) {
        if (loop) {
          jumpToItem(totalItems - 1);
        }
      } else {
        jumpToItem(previousIndex);
      }
    }

    function pageWouldBeHidden(page: number) {
      const startOffset = itemsDisplayedOnPage <= 4 && page > 1 ? 0 : 1;

      const wouldBeHiddenInFront =
        (page >= startOffset && page <= cuts.front) || page === 0;
      const wouldBeHiddenInBack =
        page >= totalItems - cuts.back - 1 && page <= totalItems - 2;

      return wouldBeHiddenInFront || wouldBeHiddenInBack;
    }

    // jump to new page if props.page is updated
    useEffect(() => {
      setCurrentPage(page);
    }, [page]);

    // re-calculate cuts if props.totalItems or props.itemsShown change
    useEffect(() => {
      const itemsToBeShown =
        itemsShown >= 4 && !isSm ? itemsShown : numberOfPages;
      setItemsDisplayedOnPage(Math.max(itemsToBeShown, 4));
      setCuts(
        calculateCuts(currentPage, totalItems, Math.max(itemsToBeShown, 4))
      );
    }, [totalItems, itemsShown, isSm, size]); // eslint-disable-line react-hooks/exhaustive-deps

    // update cuts if necessary whenever currentPage changes
    useEffect(() => {
      if (pageWouldBeHidden(currentPage)) {
        const delta = currentPage - (prevPage || 0);

        if (delta > 0) {
          const splitPoint = itemsDisplayedOnPage - 3;
          setCuts(
            calculateCuts(
              currentPage,
              totalItems,
              itemsDisplayedOnPage,
              splitPoint
            )
          );
        } else {
          const splitPoint = itemsDisplayedOnPage > 4 ? 2 : 1;
          setCuts(
            calculateCuts(
              currentPage,
              totalItems,
              itemsDisplayedOnPage,
              splitPoint
            )
          );
        }
      }
    }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      setIsOverFlowDisabled(disableOverflow);
    }, [disableOverflow]);

    const classNames = classnames(`${prefix}--pagination-nav`, className, {
      [`${prefix}--layout--size-${size}`]: size,
    });

    const backwardButtonDisabled = !loop && currentPage === 0;
    const forwardButtonDisabled = !loop && currentPage === totalItems - 1;

    const startOffset = itemsDisplayedOnPage <= 4 && currentPage > 1 ? 0 : 1;

    return (
      <nav className={classNames} ref={ref} {...rest}>
        <ul className={`${prefix}--pagination-nav__list`}>
          <DirectionButton
            direction="backward"
            aria-label={t('carbon.pagination-nav.previous')}
            label={t('carbon.pagination-nav.previous')}
            disabled={backwardButtonDisabled}
            onClick={jumpToPrevious}
            tooltipAlignment={tooltipAlignment}
            tooltipPosition={tooltipPosition}
          />

          {
            // render first item if at least 5 items can be displayed or
            // 4 items can be displayed and the current page is either 0 or 1
            (itemsDisplayedOnPage >= 5 ||
              (itemsDisplayedOnPage <= 4 && currentPage <= 1)) && (
              <PaginationItem
                page={1}
                translateWithId={t}
                isActive={currentPage === 0}
                onClick={() => {
                  jumpToItem(0);
                }}
              />
            )
          }

          {/* render first overflow */}
          <PaginationOverflow
            fromIndex={startOffset}
            count={cuts.front}
            onSelect={jumpToItem}
            disableOverflow={isOverflowDisabled}
          />

          {
            // render items between overflows
            [...Array(totalItems)]
              .map((e, i) => i)
              .slice(startOffset + cuts.front, (1 + cuts.back) * -1)
              .map((item) => (
                <PaginationItem
                  key={`item-${item}`}
                  page={item + 1}
                  translateWithId={t}
                  isActive={currentPage === item}
                  onClick={() => {
                    jumpToItem(item);
                  }}
                />
              ))
          }

          {/* render second overflow */}
          <PaginationOverflow
            fromIndex={totalItems - cuts.back - 1}
            count={cuts.back}
            onSelect={jumpToItem}
            disableOverflow={isOverflowDisabled}
          />

          {
            // render last item unless there is only one in total
            totalItems > 1 && (
              <PaginationItem
                page={totalItems}
                translateWithId={t}
                isActive={currentPage === totalItems - 1}
                onClick={() => {
                  jumpToItem(totalItems - 1);
                }}
              />
            )
          }

          <DirectionButton
            direction="forward"
            aria-label={t('carbon.pagination-nav.next')}
            label={t('carbon.pagination-nav.next')}
            disabled={forwardButtonDisabled}
            onClick={jumpToNext}
            tooltipAlignment={tooltipAlignment}
            tooltipPosition={tooltipPosition}
          />
        </ul>
        <div
          aria-live="polite"
          aria-atomic="true"
          className={`${prefix}--pagination-nav__accessibility-label`}>
          {`${t('carbon.pagination-nav.item')} ${currentPage + 1} ${t(
            'carbon.pagination-nav.of'
          )} ${totalItems}`}
        </div>
      </nav>
    );
  }
);

DirectionButton.propTypes = {
  /**
   * The direction this button represents ("forward" or "backward").
   */
  direction: PropTypes.oneOf(['forward', 'backward']),

  /**
   * Whether or not the button should be disabled.
   */
  disabled: PropTypes.bool,

  /**
   * The label shown in the button's tooltip.
   */
  label: PropTypes.string,

  /**
   * The callback function called when the button is clicked.
   */
  onClick: PropTypes.func,

  /**
   * Specify how the tooltip should align with the navigation button.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * Specify the position of the tooltip relative to the navigation button.
   * Can be one of: top, right, bottom, or left.
   */
  tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

PaginationItem.propTypes = {
  /**
   * Whether or not this is the currently active page.
   */
  isActive: PropTypes.bool,

  /**
   * The callback function called when the item is clicked.
   */
  onClick: PropTypes.func,

  /**
   * The page number this item represents.
   */
  page: PropTypes.number,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,
};

PaginationOverflow.propTypes = {
  /**
   * How many items to display in this overflow.
   */
  count: PropTypes.number,

  /**
   * From which index on this overflow should start displaying pages.
   */
  fromIndex: PropTypes.number,

  /**
   * The callback function called when the user selects a page from the overflow.
   */
  onSelect: PropTypes.func,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,
};

PaginationNav.displayName = 'PaginationNav';
PaginationNav.propTypes = {
  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * If true, the '...' pagination overflow will not render page links between the first and last rendered buttons.
   * Set this to true if you are having performance problems with large data sets.
   */
  disableOverflow: PropTypes.bool,

  /**
   * The number of items to be shown (minimum of 4 unless props.items < 4).
   */
  itemsShown: PropTypes.number,

  /**
   * Whether user should be able to loop through the items when reaching first / last.
   */
  loop: PropTypes.bool,

  /**
   * The callback function called when the current page changes.
   */
  onChange: PropTypes.func,

  /**
   * The index of current page.
   */
  page: PropTypes.number,

  /**
   * Specify the size of the PaginationNav.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Specify the alignment of the tooltip for the icon-only prev/next buttons.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * Specify the position of the tooltip for the icon-only prev/next buttons.
   * Can be one of: top, right, bottom, or left.
   */
  tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The total number of items.
   */
  totalItems: PropTypes.number,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,
};

export default PaginationNav;



File: PaginationNav/index.ts


/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PaginationNav from './PaginationNav';

export default PaginationNav;
export { PaginationNav };



File: PaginationNav/PaginationNav.stories.js


/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PaginationNav from '../PaginationNav';
import mdx from './PaginationNav.mdx';

export default {
  title: 'Components/PaginationNav',
  component: PaginationNav,
  subcomponents: {},
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return (
    <div style={{ width: '800px' }}>
      <PaginationNav totalItems={25} {...args} />
    </div>
  );
};

Default.args = {
  size: 'lg',
  loop: false,
  itemsShown: 10,
  page: 0,
  totalItems: 25,
  disableOverflow: false,
};

Default.argTypes = {
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  loop: {
    control: {
      type: 'boolean',
    },
  },
  itemsShown: {
    control: {
      type: 'number',
    },
  },
  page: {
    control: {
      type: 'number',
    },
  },
  totalItems: {
    control: {
      type: 'number',
    },
  },
  disableOverflow: {
    control: {
      type: 'boolean',
    },
  },
};



File: PaginationNav/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-paginationnav--default'
    }
  ]}
/>



