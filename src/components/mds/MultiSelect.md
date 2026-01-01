File: MultiSelect/MultiSelect.DynamicStyles.featureflag.mdx


import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Components/MultiSelect/Feature Flag" name="Flag details" />

# Dynamically set floating styles

Components with `autoAlign` use the
[`floating-ui`](https://github.com/floating-ui/floating-ui) library to handle
the dynamic positioning of floating elements relative to their trigger / anchor
element. This also includes collision detection that repositions the floating
element as necessary to keep it visible within the viewport. In the majority of
cases, the styling from the `floating-ui` 'fixed' positioning strategy prevents
the floating element from being
[clipped](https://floating-ui.com/docs/misc#clipping) by an ancestor element.

The `enable-v12-dynamic-floating-styles` flag enables this dynamic styling
without the collision detection.

**Note**: The flag has no effect when used with `autoAlign` because `autoAlign`
includes both the dynamic positioning styles and collision detection.

To use `autoAlign` your project needs to be using React v17+, see
https://github.com/carbon-design-system/carbon/issues/18714.

## Enable dynamic setting of floating styles

```js
<FeatureFlags
  flags={{
    'enable-v12-dynamic-floating-styles': true,
  }}>
  <MultiSelect
    label="Multiselect Label"
    id="carbon-multiselect-example"
    titleText="Multiselect title"
    helperText="This is helper text"
    items={comboBoxItems}
    direction={args.direction}
    itemToString={(item) => (item ? item.text : '')}
    selectionFeedback="top-after-reopen"
  />
</FeatureFlags>
```



File: MultiSelect/MultiSelectPropTypes.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';

export const sortingPropTypes = {
  /**
   * Provide a compare function that is used to determine the ordering of
   * options. `compareItems` has the following function signature:
   *
   * compareFunction :
   *  (itemA: string, itemB: string, { locale: string }) => number
   */
  compareItems: PropTypes.func,

  /**
   * Provide a method that sorts all options in the control. Overriding this
   * prop means that you also have to handle the sort logic for selected versus
   * un-selected items. If you just want to control ordering, consider the
   * `compareItems` prop instead.
   *
   * `sortItems` has the following signature:
   *
   * sortItems :
   *   (items: Array<Item>, {
   *     selectedItems: Array<Item>,
   *     itemToString: Item => string,
   *     compareItems: (itemA: string, itemB: string, {
   *       locale: string
   *     }) => number,
   *     locale: string,
   *   }) => Array<Item>
   */
  sortItems: PropTypes.func,
};

interface DownshiftTypedProps<ItemType> {
  itemToString?(item: ItemType): string;
}

interface SharedOptions {
  locale: string;
}

interface CompareItems {
  (itemA: string, itemB: string, options: SharedOptions): number;
}

export interface SortItemsOptions<ItemType>
  extends SharedOptions,
    DownshiftTypedProps<ItemType> {
  compareItems: CompareItems;
  selectedItems: ItemType[];
}

export interface MultiSelectSortingProps<ItemType> {
  /**
   * Provide a compare function that is used to determine the ordering of
   * options. See 'sortItems' for more control.
   */
  compareItems?: CompareItems;

  /**
   * Provide a method that sorts all options in the control. Overriding this
   * prop means that you also have to handle the sort logic for selected versus
   * un-selected items. If you just want to control ordering, consider the
   * `compareItems` prop instead.
   *
   * The return value should be a number whose sign indicates the relative order
   * of the two elements: negative if a is less than b, positive if a is greater
   * than b, and zero if they are equal.
   */
  sortItems?(
    items: ReadonlyArray<ItemType>,
    options: SortItemsOptions<ItemType>
  ): ItemType[];
}



File: MultiSelect/tools/__tests__/sorting-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defaultSortItems, defaultCompareItems } from '../sorting';

describe('defaultSortItems', () => {
  let mockItemToString;
  let mockOptions;

  beforeEach(() => {
    mockItemToString = jest.fn(({ label }) => label);
    mockOptions = {
      selectedItems: [],
      itemToString: mockItemToString,
      compareItems: defaultCompareItems,
      locale: 'en',
    };
  });

  it('should sort un-selected options alphabetically', () => {
    const mockItems = ['d', 'c', 'b', 'a'].map((label) => ({ label }));
    expect(defaultSortItems(mockItems, mockOptions)).toEqual([
      {
        label: 'a',
      },
      {
        label: 'b',
      },
      {
        label: 'c',
      },
      {
        label: 'd',
      },
    ]);
  });

  it('should sort un-selected numbers in increasing order', () => {
    const mockItems = ['1', '10', '11', '2', '3'].map((label) => ({ label }));
    expect(defaultSortItems(mockItems, mockOptions)).toEqual([
      {
        label: '1',
      },
      {
        label: '2',
      },
      {
        label: '3',
      },
      {
        label: '10',
      },
      {
        label: '11',
      },
    ]);
  });

  it('should sort un-selected alpha-numeric sequences with increasing order', () => {
    const mockItems = ['Option 1', 'Option 10', 'Option 11', 'Option 2'].map(
      (label) => ({ label })
    );
    expect(defaultSortItems(mockItems, mockOptions)).toEqual([
      {
        label: 'Option 1',
      },
      {
        label: 'Option 2',
      },
      {
        label: 'Option 10',
      },
      {
        label: 'Option 11',
      },
    ]);
  });

  it('should order a selected item before all other options', () => {
    const mockItems = ['Option 1', 'Option 10', 'Option 11', 'Option 2'].map(
      (label) => ({ label })
    );

    // Set `selectedItems` to ['Option 11']
    mockOptions.selectedItems = [mockItems[2]];

    expect(defaultSortItems(mockItems, mockOptions)).toEqual([
      {
        label: 'Option 11',
      },
      {
        label: 'Option 1',
      },
      {
        label: 'Option 2',
      },
      {
        label: 'Option 10',
      },
    ]);
  });

  it('should sort selected items and order them before all other options', () => {
    const mockItems = ['Option 1', 'Option 10', 'Option 11', 'Option 2'].map(
      (label) => ({ label })
    );

    // Set `selectedItems` to ['Option 11', 'Option 2']
    mockOptions.selectedItems = [mockItems[2], mockItems[3]];

    expect(defaultSortItems(mockItems, mockOptions)).toEqual([
      {
        label: 'Option 2',
      },
      {
        label: 'Option 11',
      },
      {
        label: 'Option 1',
      },
      {
        label: 'Option 10',
      },
    ]);
  });
});

describe('defaultCompareItems', () => {
  it('should return a negative number if the first string comes before the second', () => {
    expect(defaultCompareItems('a', 'b', { locale: 'en' })).toBeLessThan(0);
  });

  it('should return a positive number if the first string comes after the second', () => {
    expect(defaultCompareItems('z', 'y', { locale: 'en' })).toBeGreaterThan(0);
  });

  it('should return 0 if both strings are equal', () => {
    expect(defaultCompareItems('same', 'same', { locale: 'en' })).toEqual(0);
  });
});



File: MultiSelect/tools/sorting.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use the locale `localeCompare` with the `numeric` option to sort two
 * alpha-numeric strings.
 *
 * @param {string} itemA - The first string to compare.
 * @param {string} itemB - The second string to compare.
 * @param {object} options - Options for comparing.
 * @param {string} options.locale - The locale to use for comparison.
 * @returns {number} A negative number if itemA comes before itemB, a positive
 *   number if itemA comes after itemB, or 0 if they are equal.
 */
export const defaultCompareItems = (itemA, itemB, { locale }) =>
  itemA.localeCompare(itemB, locale, {
    numeric: true,
  });

/**
 * Default sorting algorithm for options in a selection control
 */
export const defaultSortItems = (
  items,
  { selectedItems = [], itemToString, compareItems, locale = 'en' }
) => {
  return items.sort((itemA, itemB) => {
    // Always place "select all" option at the beginning
    if (itemA.isSelectAll) return -1;
    if (itemB.isSelectAll) return 1;

    const hasItemA = selectedItems.includes(itemA);
    const hasItemB = selectedItems.includes(itemB);

    if (hasItemA && !hasItemB) return -1;
    if (hasItemB && !hasItemA) return 1;

    return compareItems(itemToString(itemA), itemToString(itemB), {
      locale,
    });
  });
};



File: MultiSelect/MultiSelect.featureflag.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MultiSelect } from '../MultiSelect';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/MultiSelect/Feature Flag',
  component: MultiSelect,
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    direction: {
      options: ['top', 'bottom'],
      control: { type: 'radio' },
    },
    type: {
      options: ['inline', 'default'],
      control: { type: 'radio' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    invalid: {
      control: { type: 'boolean' },
    },
    light: {
      table: {
        disable: true,
      },
    },
    warn: {
      control: { type: 'boolean' },
    },
    helperText: {
      control: { type: 'text' },
    },
    invalidText: {
      control: { type: 'text' },
    },
    label: {
      control: { type: 'text' },
    },
    warnText: {
      control: { type: 'text' },
    },
  },
  parameters: {
    controls: {
      exclude: [
        'filterItems',
        'translateWithId',
        'titleText',
        'open',
        'selectedItems',
        'itemToString',
        'itemToElement',
        'locale',
        'items',
        'id',
        'initialSelectedItems',
        'sortItems',
        'compareItems',
        'downshiftProps',
      ],
    },
  },
};

const comboBoxItems = [
  {
    id: 'option-0',
    text: 'An example option that is really long to show what should be done to handle long text',
  },
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    id: 'option-4',
    text: 'Option 4',
  },
  {
    id: 'option-5',
    text: 'Option 5',
  },
];

const sharedArgs = {
  size: 'md',
  autoAlign: false,
  type: 'default',
  titleText: 'Multiselect title',
  disabled: false,
  hideLabel: false,
  invalid: false,
  warn: false,
  helperText: 'This is helper text',
  warnText: 'whoopsie!',
  invalidText: 'whoopsie!',
  label: 'Multiselect Label',
  clearSelectionDescription: 'Total items selected: ',
  useTitleInItem: false,
  clearSelectionText: 'To clear selection, press Delete or Backspace,',
};
export const FloatingStyles = (args) => (
  <MultiSelect
    id="carbon-multiselect-example"
    items={comboBoxItems}
    itemToString={(item) => (item ? item.text : '')}
    selectionFeedback="top-after-reopen"
    {...args}
  />
);

FloatingStyles.args = {
  ...sharedArgs,
  direction: 'bottom',
};

FloatingStyles.argTypes = {
  direction: {
    options: ['top', 'bottom'],
    control: {
      type: 'radio',
    },
  },
};



File: MultiSelect/MultiSelect.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import cx from 'classnames';
import {
  useSelect,
  UseSelectInterface,
  UseSelectProps,
  UseSelectStateChangeTypes,
} from 'downshift';
import isEqual from 'react-fast-compare';
import PropTypes from 'prop-types';
import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ForwardedRef,
  type ReactNode,
} from 'react';
import ListBox, {
  ListBoxSizePropType,
  ListBoxTypePropType,
  type ListBoxMenuIconTranslationKey,
  type ListBoxSelectionTranslationKey,
  type ListBoxSize,
  type ListBoxType,
} from '../ListBox';
import {
  MultiSelectSortingProps,
  SortItemsOptions,
  sortingPropTypes,
} from './MultiSelectPropTypes';
import { defaultSortItems, defaultCompareItems } from './tools/sorting';
import { useSelection } from '../../internal/Selection';
import { useId } from '../../internal/useId';
import { mergeRefs } from '../../tools/mergeRefs';
import { deprecate } from '../../prop-types/deprecate';
import { keys, match } from '../../internal/keyboard';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import { ListBoxProps } from '../ListBox/ListBox';
import Checkbox from '../Checkbox';
import type { TranslateWithId } from '../../types/common';
import { noopFn } from '../../internal/noopFn';
import {
  useFloating,
  flip,
  hide,
  size as floatingSize,
  autoUpdate,
} from '@floating-ui/react';
import { useFeatureFlag } from '../FeatureFlags';
import { AILabel } from '../AILabel';
import { defaultItemToString, isComponentElement } from '../../internal';

const {
  ItemClick,
  ToggleButtonBlur,
  ToggleButtonKeyDownArrowDown,
  ToggleButtonKeyDownArrowUp,
  ToggleButtonKeyDownEnter,
  ToggleButtonKeyDownEscape,
  ToggleButtonKeyDownSpaceButton,
  ItemMouseMove,
  MenuMouseLeave,
  ToggleButtonClick,
  ToggleButtonKeyDownPageDown,
  ToggleButtonKeyDownPageUp,
  FunctionSetHighlightedIndex,
} = useSelect.stateChangeTypes as UseSelectInterface['stateChangeTypes'] & {
  ToggleButtonClick: UseSelectStateChangeTypes.ToggleButtonClick;
};

interface selectedItemType {
  text: string;
}

interface OnChangeData<ItemType> {
  selectedItems: ItemType[] | null;
}

export interface MultiSelectProps<ItemType>
  extends MultiSelectSortingProps<ItemType>,
    TranslateWithId<
      ListBoxMenuIconTranslationKey | ListBoxSelectionTranslationKey
    > {
  /**
   * **Experimental**: Will attempt to automatically align the floating
   * element to avoid collisions with the viewport and being clipped by
   * ancestor elements. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign?: boolean;

  className?: string;

  /**
   * Specify the text that should be read for screen readers that describes that all items are deleted
   */
  clearAnnouncement?: string;

  /**
   * Specify the text that should be read for screen readers that describes total items selected
   */
  clearSelectionDescription?: string;

  /**
   * Specify the text that should be read for screen readers to clear selection.
   */
  clearSelectionText?: string;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `MultiSelect` component
   */
  decorator?: ReactNode;

  /**
   * Specify the direction of the multiselect dropdown. Can be either top or bottom.
   */
  direction?: 'bottom' | 'top';

  /**
   * Disable the control
   */
  disabled?: ListBoxProps['disabled'];

  /**
   * Additional props passed to Downshift.
   *
   * **Use with caution:** anything you define here overrides the components'
   * internal handling of that prop. Downshift APIs and internals are subject to
   * change, and in some cases they can not be shimmed by Carbon to shield you
   * from potentially breaking changes.
   */
  downshiftProps?: Partial<UseSelectProps<ItemType>>;

  /**
   * Provide helper text that is used alongside the control label for
   * additional help
   */
  helperText?: ReactNode;

  /**
   * Specify whether the title text should be hidden or not
   */
  hideLabel?: boolean;

  /**
   * Specify a custom `id`
   */
  id: string;

  /**
   * Allow users to pass in arbitrary items from their collection that are
   * pre-selected
   */
  initialSelectedItems?: ItemType[];

  /**
   * Is the current selection invalid?
   */
  invalid?: boolean;

  /**
   * If invalid, what is the error?
   */
  invalidText?: ReactNode;

  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement?: React.JSXElementConstructor<ItemType>;

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list.
   */
  itemToString?(item: ItemType): string;

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: ItemType[];

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: NonNullable<ReactNode>;

  /**
   * `true` to use the light version.
   *
   * @deprecated The `light` prop for `MultiSelect` has
   *     been deprecated in favor of the new `Layer` component. It will be removed in the next major release.
   */
  light?: boolean;

  /**
   * Specify the locale of the control. Used for the default `compareItems`
   * used for sorting the list of items in the control.
   */
  locale?: string;

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange?(data: OnChangeData<ItemType>): void;

  /**
   * `onMenuChange` is a utility for this controlled component to communicate to a
   * consuming component that the menu was open(`true`)/closed(`false`).
   */
  onMenuChange?(open: boolean): void;

  /**
   * Initialize the component with an open(`true`)/closed(`false`) menu.
   */
  open?: boolean;

  /**
   * Whether or not the Dropdown is readonly
   */
  readOnly?: boolean;

  /**
   * For full control of the selected items
   */
  selectedItems?: ItemType[];

  /**
   * Specify feedback (mode) of the selection.
   * `top`: selected item jumps to top
   * `fixed`: selected item stays at it's position
   * `top-after-reopen`: selected item jump to top after reopen dropdown
   */
  selectionFeedback?: 'fixed' | 'top' | 'top-after-reopen';

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size?: ListBoxSize;

  /**
   * @deprecated please use decorator instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `MultiSelect` component
   */
  slug?: ReactNode;

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * multiselect via ARIA attributes.
   */
  titleText?: ReactNode;

  /**
   * Specify 'inline' to create an inline multi-select.
   */
  type?: ListBoxType;

  /**
   * Specify title to show title on hover
   */
  useTitleInItem?: boolean;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNode;
}

export const MultiSelect = React.forwardRef(
  <ItemType,>(
    {
      autoAlign = false,
      className: containerClassName,
      decorator,
      id,
      items,
      itemToElement,
      itemToString = defaultItemToString,
      titleText = false,
      hideLabel,
      helperText,
      label,
      type = 'default',
      size,
      disabled = false,
      initialSelectedItems = [],
      sortItems = defaultSortItems as MultiSelectProps<ItemType>['sortItems'],
      compareItems = defaultCompareItems,
      clearSelectionText = 'To clear selection, press Delete or Backspace',
      clearAnnouncement = 'all items have been cleared',
      clearSelectionDescription = 'Total items selected: ',
      light,
      invalid,
      invalidText,
      warn,
      warnText,
      useTitleInItem,
      translateWithId,
      downshiftProps,
      open = false,
      selectionFeedback = 'top-after-reopen',
      onChange,
      onMenuChange,
      direction = 'bottom',
      selectedItems: selected,
      readOnly,
      locale = 'en',
      slug,
    }: MultiSelectProps<ItemType>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const filteredItems = useMemo(() => {
      return items.filter((item) => {
        if (typeof item === 'object' && item !== null) {
          for (const key in item) {
            if (Object.hasOwn(item, key) && item[key] === undefined) {
              return false; // Return false if any property has an undefined value
            }
          }
        }
        return true; // Return true if item is not an object with undefined values
      });
    }, [items]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    const selectAll = filteredItems.some((item) => (item as any).isSelectAll);

    const prefix = usePrefix();
    const { isFluid } = useContext(FormContext);
    const multiSelectInstanceId = useId();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    const [isFocused, setIsFocused] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(open || false);
    const [prevOpenProp, setPrevOpenProp] = useState(open);
    const [topItems, setTopItems] = useState<ItemType[]>([]);
    const [itemsCleared, setItemsCleared] = useState(false);

    const enableFloatingStyles =
      useFeatureFlag('enable-v12-dynamic-floating-styles') || autoAlign;

    const { refs, floatingStyles, middlewareData } = useFloating(
      enableFloatingStyles
        ? {
            placement: direction,

            // The floating element is positioned relative to its nearest
            // containing block (usually the viewport). It will in many cases also
            // “break” the floating element out of a clipping ancestor.
            // https://floating-ui.com/docs/misc#clipping
            strategy: 'fixed',

            // Middleware order matters, arrow should be last
            middleware: [
              autoAlign && flip({ crossAxis: false }),
              floatingSize({
                apply({ rects, elements }) {
                  Object.assign(elements.floating.style, {
                    width: `${rects.reference.width}px`,
                  });
                },
              }),
              autoAlign && hide(),
            ],
            whileElementsMounted: autoUpdate,
          }
        : {}
    );

    useLayoutEffect(() => {
      if (enableFloatingStyles) {
        const updatedFloatingStyles = {
          ...floatingStyles,
          visibility: middlewareData.hide?.referenceHidden
            ? 'hidden'
            : 'visible',
        };
        Object.keys(updatedFloatingStyles).forEach((style) => {
          if (refs.floating.current) {
            refs.floating.current.style[style] = updatedFloatingStyles[style];
          }
        });
      }
    }, [
      enableFloatingStyles,
      floatingStyles,
      refs.floating,
      middlewareData,
      open,
    ]);

    const {
      selectedItems: controlledSelectedItems,
      onItemChange,
      clearSelection,
    } = useSelection({
      disabled,
      initialSelectedItems,
      onChange,
      selectedItems: selected,
      selectAll,
      filteredItems,
    });

    const sortOptions = {
      selectedItems: controlledSelectedItems,
      itemToString,
      compareItems,
      locale,
    };

    const selectProps: UseSelectProps<ItemType> = {
      stateReducer,
      isOpen,
      itemToString: (filteredItems) => {
        return (
          (Array.isArray(filteredItems) &&
            filteredItems
              .map((item) => {
                return itemToString(item);
              })
              .join(', ')) ||
          ''
        );
      },
      selectedItem: controlledSelectedItems as ItemType,
      items: filteredItems,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
      isItemDisabled(item, _index) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        return (item as any)?.disabled;
      },
      ...downshiftProps,
    };

    const {
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getItemProps,
      selectedItem,
      highlightedIndex,
      setHighlightedIndex,
    } = useSelect<ItemType>(selectProps);

    const toggleButtonProps = getToggleButtonProps({
      onFocus: () => {
        setInputFocused(true);
      },
      onBlur: () => {
        setInputFocused(false);
      },
      onKeyDown: (e) => {
        if (!disabled) {
          if ((match(e, keys.Delete) || match(e, keys.Escape)) && !isOpen) {
            clearSelection();
            e.stopPropagation();
          }

          if (!isOpen && match(e, keys.Delete) && selectedItems.length > 0) {
            setItemsCleared(true);
          }

          if (
            (match(e, keys.Space) ||
              match(e, keys.ArrowDown) ||
              match(e, keys.Enter)) &&
            !isOpen
          ) {
            setHighlightedIndex(0);
            setItemsCleared(false);
            setIsOpenWrapper(true);
          }
          if (match(e, keys.ArrowDown) && selectedItems.length === 0) {
            setInputFocused(false);
            setIsFocused(false);
          }
          if (match(e, keys.Escape) && isOpen) {
            setInputFocused(true);
          }
          if (match(e, keys.Enter) && isOpen) {
            setInputFocused(true);
          }
        }
      },
    });

    const toggleButtonRef = useRef<HTMLButtonElement>(null);
    const mergedRef = mergeRefs<HTMLButtonElement>(
      toggleButtonProps.ref,
      ref,
      toggleButtonRef
    );

    const selectedItems = selectedItem as ItemType[];

    /**
     * wrapper function to forward changes to consumer
     */
    const setIsOpenWrapper = (open) => {
      setIsOpen(open);
      if (onMenuChange) {
        onMenuChange(open);
      }
    };

    /**
     * programmatically control this `open` prop
     */
    if (prevOpenProp !== open) {
      setIsOpenWrapper(open);
      setPrevOpenProp(open);
    }

    const inline = type === 'inline';
    const showWarning = !invalid && warn;

    const wrapperClasses = cx(
      `${prefix}--multi-select__wrapper`,
      `${prefix}--list-box__wrapper`,
      containerClassName,
      {
        [`${prefix}--multi-select__wrapper--inline`]: inline,
        [`${prefix}--list-box__wrapper--inline`]: inline,
        [`${prefix}--multi-select__wrapper--inline--invalid`]:
          inline && invalid,
        [`${prefix}--list-box__wrapper--inline--invalid`]: inline && invalid,
        [`${prefix}--list-box__wrapper--fluid--invalid`]: isFluid && invalid,
        [`${prefix}--list-box__wrapper--slug`]: slug,
        [`${prefix}--list-box__wrapper--decorator`]: decorator,
      }
    );
    const titleClasses = cx(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: disabled,
      [`${prefix}--visually-hidden`]: hideLabel,
    });
    const helperId = !helperText
      ? undefined
      : `multiselect-helper-text-${multiSelectInstanceId}`;
    const fieldLabelId = `multiselect-field-label-${multiSelectInstanceId}`;
    const helperClasses = cx(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });

    const className = cx(`${prefix}--multi-select`, {
      [`${prefix}--multi-select--invalid`]: invalid,
      [`${prefix}--multi-select--invalid--focused`]: invalid && inputFocused,
      [`${prefix}--multi-select--warning`]: showWarning,
      [`${prefix}--multi-select--inline`]: inline,
      [`${prefix}--multi-select--selected`]:
        selectedItems && selectedItems.length > 0,
      [`${prefix}--list-box--up`]: direction === 'top',
      [`${prefix}--multi-select--readonly`]: readOnly,
      [`${prefix}--autoalign`]: enableFloatingStyles,
      [`${prefix}--multi-select--selectall`]: selectAll,
    });

    // needs to be capitalized for react to render it correctly
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ItemToElement = itemToElement!;

    if (selectionFeedback === 'fixed') {
      sortOptions.selectedItems = [];
    } else if (selectionFeedback === 'top-after-reopen') {
      sortOptions.selectedItems = topItems;
    }

    function stateReducer(state, actionAndChanges) {
      const { changes, props, type } = actionAndChanges;
      const { highlightedIndex } = changes;

      if (changes.isOpen && !isOpen) {
        setTopItems(controlledSelectedItems);
      }

      switch (type) {
        case ToggleButtonKeyDownSpaceButton:
        case ToggleButtonKeyDownEnter:
          if (changes.selectedItem === undefined) {
            break;
          }
          if (Array.isArray(changes.selectedItem)) {
            break;
          }
          onItemChange(changes.selectedItem);
          return { ...changes, highlightedIndex: state.highlightedIndex };
        case ToggleButtonBlur:
        case ToggleButtonKeyDownEscape:
          setIsOpenWrapper(false);
          break;
        case ToggleButtonClick:
          setIsOpenWrapper(changes.isOpen || false);
          return {
            ...changes,
            highlightedIndex:
              controlledSelectedItems.length > 0 ? 0 : undefined,
          };
        case ItemClick:
          setHighlightedIndex(changes.selectedItem);
          onItemChange(changes.selectedItem);
          return { ...changes, highlightedIndex: state.highlightedIndex };
        case MenuMouseLeave:
          return { ...changes, highlightedIndex: state.highlightedIndex };
        case FunctionSetHighlightedIndex:
          if (!isOpen) {
            return {
              ...changes,
              highlightedIndex: 0,
            };
          } else {
            return {
              ...changes,
              highlightedIndex: filteredItems.indexOf(highlightedIndex),
            };
          }
        case ToggleButtonKeyDownArrowDown:
        case ToggleButtonKeyDownArrowUp:
        case ToggleButtonKeyDownPageDown:
        case ToggleButtonKeyDownPageUp:
          if (highlightedIndex > -1) {
            const itemArray = document.querySelectorAll(
              `li.${prefix}--list-box__menu-item[role="option"]`
            );
            props.scrollIntoView(itemArray[highlightedIndex]);
          }
          if (highlightedIndex === -1) {
            return {
              ...changes,
              highlightedIndex: 0,
            };
          }
          return changes;
        case ItemMouseMove:
          return { ...changes, highlightedIndex: state.highlightedIndex };
      }
      return changes;
    }

    const multiSelectFieldWrapperClasses = cx(
      `${prefix}--list-box__field--wrapper`,
      {
        [`${prefix}--list-box__field--wrapper--input-focused`]: inputFocused,
      }
    );

    const handleFocus = (evt: React.FocusEvent<HTMLDivElement>) => {
      // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
      evt.target.classList.contains(`${prefix}--tag__close-icon`)
        ? setIsFocused(false)
        : setIsFocused(evt.type === 'focus' ? true : false);
    };

    const readOnlyEventHandlers = readOnly
      ? {
          onClick: (evt: React.MouseEvent<HTMLButtonElement>) => {
            // NOTE: does not prevent click
            evt.preventDefault();
            // focus on the element as per readonly input behavior
            if (toggleButtonRef.current) {
              toggleButtonRef.current.focus();
            }
          },
          onKeyDown: (evt: React.KeyboardEvent<HTMLButtonElement>) => {
            const selectAccessKeys = ['ArrowDown', 'ArrowUp', ' ', 'Enter'];
            // This prevents the select from opening for the above keys
            if (selectAccessKeys.includes(evt.key)) {
              evt.preventDefault();
            }
          },
        }
      : {};

    // AILabel always size `mini`
    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator = candidateIsAILabel
      ? cloneElement(candidate, { size: 'mini' })
      : candidate;

    const itemsSelectedText =
      selectedItems.length > 0 &&
      selectedItems.map((item) => (item as selectedItemType)?.text);

    const selectedItemsLength = selectAll
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        selectedItems.filter((item: any) => !item.isSelectAll).length
      : selectedItems.length;

    // Memoize the value of getMenuProps to avoid an infinite loop
    const menuProps = useMemo(
      () =>
        getMenuProps({
          ref: enableFloatingStyles ? refs.setFloating : null,
        }),
      [enableFloatingStyles, getMenuProps, refs.setFloating]
    );

    const allLabelProps = getLabelProps();
    const labelProps = isValidElement(titleText)
      ? { id: allLabelProps.id }
      : allLabelProps;

    const getSelectionStats = useCallback(
      (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        selectedItems: any[],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        filteredItems: any[]
      ): {
        hasIndividualSelections: boolean;
        nonSelectAllSelectedCount: number;
        totalSelectableCount: number;
      } => {
        const hasIndividualSelections = selectedItems.some(
          (selected) => !selected.isSelectAll
        );

        const nonSelectAllSelectedCount = selectedItems.filter(
          (selected) => !selected.isSelectAll
        ).length;

        const totalSelectableCount = filteredItems.filter(
          (item) => !item.isSelectAll && !item.disabled
        ).length;

        return {
          hasIndividualSelections,
          nonSelectAllSelectedCount,
          totalSelectableCount,
        };
      },
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
      [selectedItems, filteredItems]
    );

    return (
      <div className={wrapperClasses}>
        <label className={titleClasses} {...labelProps}>
          {titleText && titleText}
          {selectedItems.length > 0 && (
            <span className={`${prefix}--visually-hidden`}>
              {clearSelectionDescription} {selectedItems.length}{' '}
              {itemsSelectedText},{clearSelectionText}
            </span>
          )}
        </label>
        <ListBox
          onFocus={isFluid ? handleFocus : undefined}
          onBlur={isFluid ? handleFocus : undefined}
          type={type}
          size={size}
          className={className}
          disabled={disabled}
          light={light}
          invalid={invalid}
          invalidText={invalidText}
          warn={warn}
          warnText={warnText}
          isOpen={isOpen}
          id={id}>
          {invalid && (
            <WarningFilled className={`${prefix}--list-box__invalid-icon`} />
          )}
          {showWarning && (
            <WarningAltFilled
              className={`${prefix}--list-box__invalid-icon ${prefix}--list-box__invalid-icon--warning`}
            />
          )}
          <div
            className={multiSelectFieldWrapperClasses}
            ref={enableFloatingStyles ? refs.setReference : null}>
            {selectedItems.length > 0 && (
              <ListBox.Selection
                readOnly={readOnly}
                clearSelection={
                  !disabled && !readOnly ? clearSelection : noopFn
                }
                selectionCount={selectedItemsLength}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                translateWithId={translateWithId!}
                disabled={disabled}
              />
            )}
            <button
              type="button"
              className={`${prefix}--list-box__field`}
              disabled={disabled}
              aria-disabled={disabled || readOnly}
              aria-describedby={
                !inline && !invalid && !warn && helperText
                  ? helperId
                  : undefined
              }
              {...toggleButtonProps}
              ref={mergedRef}
              {...readOnlyEventHandlers}>
              <span id={fieldLabelId} className={`${prefix}--list-box__label`}>
                {label}
              </span>
              <ListBox.MenuIcon
                isOpen={isOpen}
                translateWithId={translateWithId}
              />
            </button>
            {slug ? (
              normalizedDecorator
            ) : decorator ? (
              <div className={`${prefix}--list-box__inner-wrapper--decorator`}>
                {normalizedDecorator}
              </div>
            ) : (
              ''
            )}
          </div>
          <ListBox.Menu {...menuProps}>
            {isOpen &&
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
              sortItems!(
                filteredItems,
                sortOptions as SortItemsOptions<ItemType>
              ).map((item, index) => {
                const {
                  hasIndividualSelections,
                  nonSelectAllSelectedCount,
                  totalSelectableCount,
                } = getSelectionStats(selectedItems, filteredItems);

                // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
                const isChecked = (item as any).isSelectAll
                  ? nonSelectAllSelectedCount === totalSelectableCount &&
                    totalSelectableCount > 0
                  : selectedItems.some((selected) => isEqual(selected, item));

                const isIndeterminate =
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
                  (item as any).isSelectAll &&
                  hasIndividualSelections &&
                  nonSelectAllSelectedCount < totalSelectableCount;

                const itemProps = getItemProps({
                  item,
                  // we don't want Downshift to set aria-selected for us
                  // we also don't want to set 'false' for reader verbosity's sake
                  ['aria-selected']: isChecked,
                });
                const itemText = itemToString(item);

                return (
                  <ListBox.MenuItem
                    key={itemProps.id}
                    isActive={isChecked && !item['isSelectAll']}
                    aria-label={itemText}
                    isHighlighted={highlightedIndex === index}
                    title={itemText}
                    disabled={itemProps['aria-disabled']}
                    {...itemProps}>
                    <div className={`${prefix}--checkbox-wrapper`}>
                      <Checkbox
                        id={`${itemProps.id}__checkbox`}
                        labelText={
                          itemToElement ? (
                            <ItemToElement key={itemProps.id} {...item} />
                          ) : (
                            itemText
                          )
                        }
                        checked={isChecked}
                        title={useTitleInItem ? itemText : undefined}
                        indeterminate={isIndeterminate}
                        disabled={disabled}
                      />
                    </div>
                  </ListBox.MenuItem>
                );
              })}
          </ListBox.Menu>
          {itemsCleared && (
            <span aria-live="assertive" aria-label={clearAnnouncement} />
          )}
        </ListBox>
        {!inline && !invalid && !warn && helperText && (
          <div id={helperId} className={helperClasses}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
) as MultiSelectComponent;

type MultiSelectComponentProps<ItemType> = React.PropsWithChildren<
  MultiSelectProps<ItemType>
> &
  React.RefAttributes<HTMLButtonElement>;

interface MultiSelectComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  propTypes: Record<string, any>;
  displayName: string;
  <ItemType>(
    props: MultiSelectComponentProps<ItemType>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  ): React.ReactElement<any> | null;
}

MultiSelect.displayName = 'MultiSelect';
MultiSelect.propTypes = {
  ...sortingPropTypes,

  /**
   * **Experimental**: Will attempt to automatically align the floating
   * element to avoid collisions with the viewport and being clipped by
   * ancestor elements. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: PropTypes.bool,

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: PropTypes.string,

  /**
   * Specify the text that should be read for screen readers that describes total items selected
   */
  clearSelectionDescription: PropTypes.string,

  /**
   * Specify the text that should be read for screen readers to clear selection.
   */
  clearSelectionText: PropTypes.string,

  /**
   * Provide a compare function that is used to determine the ordering of
   * options. See 'sortItems' for more control. Consider
   * declaring function with `useCallback` to prevent unnecessary re-renders.
   */
  compareItems: PropTypes.func,

  /**
   * **Experimental**: Provide a decorator component to be rendered inside the `MultiSelect` component
   */
  decorator: PropTypes.node,

  /**
   * Specify the direction of the multiselect dropdown. Can be either top or bottom.
   */
  direction: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Disable the control
   */
  disabled: PropTypes.bool,

  /**
   * Additional props passed to Downshift.
   *
   * **Use with caution:** anything you define here overrides the components'
   * internal handling of that prop. Downshift APIs and internals are subject to
   * change, and in some cases they can not be shimmed by Carbon to shield you
   * from potentially breaking changes.
   */
  downshiftProps: PropTypes.object as PropTypes.Validator<
    UseSelectProps<unknown>
  >,

  /**
   * Provide helper text that is used alongside the control label for
   * additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether the title text should be hidden or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify a custom `id`
   */
  id: PropTypes.string.isRequired,

  /**
   * Allow users to pass in arbitrary items from their collection that are
   * pre-selected
   */
  initialSelectedItems: PropTypes.array,

  /**
   * Is the current selection invalid?
   */
  invalid: PropTypes.bool,

  /**
   * If invalid, what is the error?
   */
  invalidText: PropTypes.node,

  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement: PropTypes.func,

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list. Consider
   * declaring function with `useCallback` to prevent unnecessary re-renders.
   */
  itemToString: PropTypes.func,

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: PropTypes.array.isRequired,

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: PropTypes.node.isRequired,

  /**
   * `true` to use the light version.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `MultiSelect` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * Specify the locale of the control. Used for the default `compareItems`
   * used for sorting the list of items in the control.
   */
  locale: PropTypes.string,

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange: PropTypes.func,

  /**
   * `onMenuChange` is a utility for this controlled component to communicate to a
   * consuming component that the menu was open(`true`)/closed(`false`).
   */
  onMenuChange: PropTypes.func,

  /**
   * Initialize the component with an open(`true`)/closed(`false`) menu.
   */
  open: PropTypes.bool,

  /**
   * Whether or not the Dropdown is readonly
   */
  readOnly: PropTypes.bool,

  /**
   * For full control of the selected items
   */
  selectedItems: PropTypes.array,

  /**
   * Specify feedback (mode) of the selection.
   * `top`: selected item jumps to top
   * `fixed`: selected item stays at it's position
   * `top-after-reopen`: selected item jump to top after reopen dropdown
   */
  selectionFeedback: PropTypes.oneOf(['top', 'fixed', 'top-after-reopen']),

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size: ListBoxSizePropType,

  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),

  /**
   * Provide a method that sorts all options in the control. Overriding this
   * prop means that you also have to handle the sort logic for selected versus
   * un-selected items. If you just want to control ordering, consider the
   * `compareItems` prop instead.
   *
   * The return value should be a number whose sign indicates the relative order
   * of the two elements: negative if a is less than b, positive if a is greater
   * than b, and zero if they are equal.
   *
   * sortItems :
   *   (items: Array<Item>, {
   *     selectedItems: Array<Item>,
   *     itemToString: Item => string,
   *     compareItems: (itemA: string, itemB: string, {
   *       locale: string
   *     }) => number,
   *     locale: string,
   *   }) => Array<Item>
   */
  sortItems: PropTypes.func,

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * multiselect via ARIA attributes.
   */
  titleText: PropTypes.node,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,

  /**
   * Specify 'inline' to create an inline multi-select.
   */
  type: ListBoxTypePropType,

  /**
   * Specify title to show title on hover
   */
  useTitleInItem: PropTypes.bool,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};



File: MultiSelect/MultiSelect.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';

import * as MultiSelect from './MultiSelect.stories';
import { Filterable } from './MultiSelect.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# MultiSelect

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/MultiSelect)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/dropdown/usage#multiselect)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/dropdown/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [With initial selected items](#with-initial-selected-items)
  - [Select all](#select-all)
  - [Filtering](#filtering)
  - [With layer](#with-layer)
- [Component API](#component-api)
  - [`downshiftProps`](#downshiftprops)
- [`inputProps`](#inputprops)
  - [Using `maxLength`](#using-maxlength)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

The `MultiSelect` component is a variant of the `Dropdown` component that allows
for multiple items to be selected. `MultiSelect` stays open while items are
being selected.

<Canvas
  of={MultiSelect.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(MultiSelect.Default),
    },
  ]}
/>

### With initial selected items

By passing items into the `initialSelectedItems` prop, they can be pre-selected.

<Canvas
  of={MultiSelect.WithInitialSelectedItems}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(MultiSelect.WithInitialSelectedItems),
    },
  ]}
/>

### Select all

The MultiSelect component includes a "Select All" feature, allowing users to
easily select or deselect all options with a single action.

To implement the "Select All" feature in your MultiSelect component, add a new
option to your options array with these properties:

- `id`: A unique identifier (e.g., 'select-all')
- `text`: The label for the option
- `isSelectAll`: Set to `true`

```
const options = [
  {
    id: 'select-all',
    text: 'All roles',
    isSelectAll: true,
  },
  // ... other options
];
```

### Filtering

The `FilterableMultiSelect` component allows for filtering the list of
selectable items to a subset.

<Canvas
  of={Filterable}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(Filterable),
    },
  ]}
/>

### With layer

<Canvas of={MultiSelect.WithLayerMultiSelect} />

## Component API

### `downshiftProps`

This component utilizes [Downshift](https://www.downshift-js.com/) under the
hood to help provide complex yet accessible custom dropdown components. We
provide access to the built in Downshift features with this prop.

Use with caution: anything you define here overrides the components' internal
handling of that prop. Downshift internals are subject to change, and in some
cases they can not be shimmed to shield you from potentially breaking changes.

For more information, checkout the Downshift prop
[documentation](https://www.downshift-js.com/downshift#props-used-in-examples)

<ArgTypes />

## `inputProps`

Use `inputProps` to specify native input attributes to place on the `<input>`.  
These are passed to [Downshift's `getInputProps()`](https://github.com/downshift-js/downshift?tab=readme-ov-file#getinputprops) 
and will override the internal input props.


### Using `maxLength`

The native `maxLength` attribute can be included in `inputProps` to define the maximum string length that the user can enter into the input.

When using `maxLength`, ensure the limit is communicated to the user through both `helperText` and `invalidText`/`warnText`.

```jsx
<FilterableMultiSelect
  inputProps={{ maxLength: 5 }}
  id="test-combo"
  items={[{ label: 'Item 1' }]}
  titleText="Abbreviation"
  helperText="Provide an abbreviation that is 5 characters or less"
  invalidText="Abbreviations must be 5 characters or less"
  warnText="Abbreviations must be 5 characters or less"
/>
```

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/MultiSelect/MultiSelect.mdx).



File: MultiSelect/README.md


# `MultiSelect`

> A Dropdown Menu from which you can select given items by clicking on a
> checkbox. Given the right options/properties items can be already selected
> initially.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

This component comes with any installation of the `carbon-components-react`
package on npm. You can install this package by running the following command in
your terminal with [npm](https://www.npmjs.com/):

```bash
npm i carbon-components carbon-components-react carbon-icons --save
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add carbon-components-react carbon-components carbon-icons
```

## Usage

You can use `MultiSelect` by doing the following in your project:

```js
import { MultiSelect } from 'carbon-components-react';
```

You can then create the `MultiSelect` by the following:

```jsx
<MultiSelect
  useTitleInItem={false}
  label="MultiSelect Label"
  invalid={false}
  invalidText="Invalid Selection"
  onChange={onChange}
  items={[
    { id: 'item-1', text: 'Item 1' },
    { id: 'item-2', text: 'Item 2' },
  ]}
  itemToString={itemToString}
  initialSelectedItems={[
    { id: 'item-1', text: 'Item 1' },
    { id: 'item-2', text: 'Item 2' },
  ]}
  translateWithId={translateWithId}
/>
```

## Use-cases

If the variable array provided to the `items` attribute lacks a `label`
property, the component will not render. Using the label prop to render items
would look like the following:

```jsx
<MultiSelect
  useTitleInItem={false}
  label="MultiSelect Label"
  invalid={false}
  invalidText="Invalid Selection"
  onChange={onChange}
  items={[
    { id: 'item-1', text: 'Item 1', label: 'Item 1' },
    { id: 'item-2', text: 'Item 2', label: 'Item 2' },
  ]}
  itemToString={itemToString}
  initialSelectedItems={[
    { id: 'item-1', text: 'Item 1' },
    { id: 'item-2', text: 'Item 2' },
  ]}
  translateWithId={translateWithId}
/>
```

However, you can have items in your array without a `label` field, as long as
you provide the `itemToString` method that properly maps them.

What does the helper function itemToString do?<br/> The helper function
`itemToString` allows you to render a given item to a string label. By default,
it extracts the `label` field from a given item to serve as the item label in
the list. For instance you can use:

```jsx
<MultiSelect
  useTitleInItem={false}
  label="MultiSelect Label"
  invalid={false}
  invalidText="Invalid Selection"
  onChange={onChange}
  items={[
    { id: 'item-1', text: 'Item 1' },
    { id: 'item-2', text: 'Item 2' },
  ]}
  initialSelectedItems={[
    { id: 'item-1', text: 'Item 1' },
    { id: 'item-2', text: 'Item 2' },
  ]}
  translateWithId={translateWithId}
  itemToString={(item) => (item ? item.text : '')}
/>
```



File: MultiSelect/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-multiselect--default'
    },
    {
      label: 'Filterable',
      variant: 'components-multiselect--filterable'
    },
    {
      label: 'With initial selected items',
      variant: 'components-multiselect--with-initial-selected-items'
    },
    {
      label: 'Fluid (unstable)',
      variant: 'experimental-unstable-fluidmultiselect--default'
    },
    {
      label: 'Fluid Condensed (unstable)',
      variant: 'experimental-unstable-fluidmultiselect--condensed'
    }
  ]}
/>



File: MultiSelect/index.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export * from './FilterableMultiSelect';
export * from './MultiSelect';



File: MultiSelect/MultiSelect.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, FolderOpen, Folders, Information } from '@carbon/icons-react';
import { action } from 'storybook/actions';
import { WithLayer } from '../../../.storybook/templates/WithLayer';
import mdx from './MultiSelect.mdx';

import { FilterableMultiSelect, MultiSelect } from '.';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import {
  Toggletip,
  ToggletipActions,
  ToggletipButton,
  ToggletipContent,
  ToggletipLabel,
} from '../Toggletip';
import Link from '../Link';
import TextInput from '../TextInput';

export default {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  subcomponents: {
    FilterableMultiSelect,
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    light: {
      table: {
        disable: true,
      },
    },
    selectionFeedback: {
      options: ['top', 'fixed', 'top-after-reopen'],
      control: { type: 'select' },
    },
    direction: {
      options: ['top', 'bottom'],
      control: { type: 'radio' },
    },
    type: {
      options: ['inline', 'default'],
      control: { type: 'radio' },
    },
    titleText: {
      control: {
        type: 'text',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    hideLabel: {
      control: {
        type: 'boolean',
      },
    },
    helperText: {
      control: {
        type: 'text',
      },
    },
    invalid: {
      control: {
        type: 'boolean',
      },
    },
    warn: {
      control: {
        type: 'boolean',
      },
    },
    warnText: {
      control: {
        type: 'text',
      },
    },
    invalidText: {
      control: {
        type: 'text',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    clearSelectionDescription: {
      control: {
        type: 'text',
      },
    },
    useTitleInItem: {
      control: {
        type: 'boolean',
      },
    },
    clearSelectionText: {
      control: {
        type: 'text',
      },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: [
        'filterItems',
        'translateWithId',
        'titleText',
        'open',
        'selectedItems',
        'itemToString',
        'itemToElement',
        'locale',
        'items',
        'id',
        'initialSelectedItems',
        'sortItems',
        'compareItems',
        'downshiftProps',
      ],
    },
  },
};

const items = [
  {
    id: 'downshift-1-item-0',
    text: 'Option 1',
  },
  {
    id: 'downshift-1-item-1',
    text: 'Option 2',
  },
  {
    id: 'downshift-1-item-2',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    id: 'downshift-1-item-3',
    text: 'Option 4',
  },
  {
    id: 'downshift-1-item-4',
    text: 'An example option that is really long to show what should be done to handle long text',
  },
  {
    id: 'downshift-1-item-5',
    text: 'Option 5',
  },
];

const sharedArgs = {
  size: 'md',
  autoAlign: false,
  type: 'default',
  titleText: 'This is a MultiSelect Title',
  disabled: false,
  hideLabel: false,
  invalid: false,
  warn: false,
  open: false,
  helperText: 'This is helper text',
  warnText: 'whoopsie!',
  invalidText: 'whoopsie!',
  label: 'This is a label',
  clearSelectionDescription: 'Total items selected: ',
  useTitleInItem: false,
  clearSelectionText: 'To clear selection, press Delete or Backspace,',
};

const filterableArgTypes = {
  label: {
    control: false,
    table: {
      disable: true,
    },
  },
  placeholder: {
    control: {
      type: 'text',
    },
    description:
      'Generic `placeholder` that will be used as the textual representation of what this field is for',
    table: {
      type: { summary: 'string' },
    },
  },
};
export const Default = (args) => {
  const items = [
    {
      id: 'downshift-1-item-0',
      text: 'Option 1',
    },
    {
      id: 'downshift-1-item-1',
      text: 'Option 2',
    },
    {
      id: 'downshift-1-item-2',
      text: 'Option 3 - a disabled item',
      disabled: true,
    },
    {
      id: 'downshift-1-item-3',
      text: 'Option 4',
    },
    {
      id: 'downshift-1-item-4',
      text: 'An example option that is really long to show what should be done to handle long text',
    },
    {
      id: 'downshift-1-item-5',
      text: 'Option 5',
    },
  ];
  return (
    <div
      style={{
        width: 300,
      }}>
      <MultiSelect
        label="Multiselect Label"
        id="carbon-multiselect-example"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        {...args}
      />
    </div>
  );
};

Default.args = { ...sharedArgs };

export const WithInitialSelectedItems = (args) => {
  const items = [
    {
      id: 'downshift-1-item-0',
      text: 'Option 1',
    },
    {
      id: 'downshift-1-item-1',
      text: 'Option 2',
    },
    {
      id: 'downshift-1-item-2',
      text: 'Option 3 - a disabled item',
      disabled: true,
    },
    {
      id: 'downshift-1-item-3',
      text: 'Option 4',
    },
    {
      id: 'downshift-1-item-4',
      text: 'An example option that is really long to show what should be done to handle long text',
    },
    {
      id: 'downshift-1-item-5',
      text: 'Option 5',
    },
  ];
  return (
    <div
      style={{
        width: 300,
      }}>
      <MultiSelect
        label="Multiselect Label"
        id="carbon-multiselect-example-2"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        initialSelectedItems={[items[0], items[1]]}
        selectionFeedback="top-after-reopen"
        {...args}
      />
    </div>
  );
};

WithInitialSelectedItems.args = { ...sharedArgs };
export const Filterable = (args) => {
  const items = [
    {
      id: 'downshift-1-item-0',
      text: 'Option 1',
    },
    {
      id: 'downshift-1-item-1',
      text: 'Option 2',
    },
    {
      id: 'downshift-1-item-2',
      text: 'Option 3 - a disabled item',
      disabled: true,
    },
    {
      id: 'downshift-1-item-3',
      text: 'Option 4',
    },
    {
      id: 'downshift-1-item-4',
      text: 'An example option that is really long to show what should be done to handle long text',
    },
    {
      id: 'downshift-1-item-5',
      text: 'Option 5',
    },
  ];
  return (
    <div
      style={{
        width: 300,
      }}>
      <FilterableMultiSelect
        id="carbon-multiselect-example-3"
        titleText="FilterableMultiSelect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        {...args}
      />
    </div>
  );
};

export const FilterableWithSelectAll = (args) => {
  return (
    <div
      style={{
        width: 300,
      }}>
      <FilterableMultiSelect
        id="carbon-multiselect-example-3"
        titleText="FilterableMultiSelect title"
        helperText="This is helper text"
        items={itemsWithSelectAll}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        {...args}
      />
    </div>
  );
};

FilterableWithSelectAll.argTypes = {
  ...filterableArgTypes,
};
Filterable.argTypes = {
  ...filterableArgTypes,
  onChange: {
    action: 'onChange',
  },
  onMenuChange: {
    action: 'onMenuChange',
  },
};

export const WithLayerMultiSelect = (args) => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 300 }}>
        <MultiSelect
          label="Multiselect Label"
          id={`carbon-multiselect-example-${layer}`}
          titleText="Multiselect title"
          helperText="This is helper text"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
          {...args}
        />
      </div>
    )}
  </WithLayer>
);
WithLayerMultiSelect.args = { ...sharedArgs };
export const _FilterableWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 300 }}>
        <FilterableMultiSelect
          id={`carbon-multiselect-example-${layer}`}
          titleText="Multiselect title"
          helperText="This is helper text"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
          {...args}
        />
      </div>
    )}
  </WithLayer>
);

_FilterableWithLayer.argTypes = {
  ...filterableArgTypes,
};
export const _Controlled = (args) => {
  const [selectedItems, setSelectedItems] = useState(
    items.filter((item) => item.id === 'downshift-1-item-0')
  );

  const onSelectionChanged = (value) => {
    action('changed items')(value);
    setSelectedItems(value);
  };

  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        id="carbon-multiselect-example-controlled"
        titleText="Multiselect title"
        label="Multiselect label"
        items={items}
        selectedItems={selectedItems}
        onChange={(data) => onSelectionChanged(data.selectedItems)}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        {...args}
      />
      <br />
      <ButtonSet>
        <Button
          id="all"
          onClick={() =>
            setSelectedItems(items.filter((item) => !item.disabled))
          }>
          Select all
        </Button>
        <Button
          id="clear"
          kind="secondary"
          onClick={() => setSelectedItems([])}>
          Clear
        </Button>
      </ButtonSet>
    </div>
  );
};

_Controlled.args = { ...sharedArgs };
const itemsWithSelectAll = [
  {
    id: 'downshift-1-item-0',
    text: 'Editor',
  },
  {
    id: 'downshift-1-item-1',
    text: 'Owner',
  },
  {
    id: 'downshift-1-item-2',
    text: 'Uploader',
  },
  {
    id: 'downshift-1-item-3',
    text: 'Reader - a disabled item',
    disabled: true,
  },
  {
    id: 'select-all',
    text: 'All roles',
    isSelectAll: true,
  },
];

export const SelectAll = (args) => {
  const [label, setLabel] = useState('Choose options');

  const onChange = (value) => {
    if (value.selectedItems.length == 1) {
      setLabel('Option selected');
    } else if (value.selectedItems.length > 1) {
      setLabel('Options selected');
    } else {
      setLabel('Choose options');
    }
  };

  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        label={label}
        id="carbon-multiselect-example"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={itemsWithSelectAll}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        onChange={onChange}
        {...args}
      />
    </div>
  );
};

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

export const withAILabel = (args) => (
  <div style={{ width: 400 }}>
    <MultiSelect
      label="Multiselect Label"
      id="carbon-multiselect-example"
      titleText="Multiselect title"
      helperText="This is helper text"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      selectionFeedback="top-after-reopen"
      decorator={aiLabel}
      {...args}
    />
  </div>
);

withAILabel.args = { ...sharedArgs };
export const FilterableWithAILabel = (args) => (
  <div style={{ width: 400 }}>
    <FilterableMultiSelect
      label="Multiselect Label"
      id="carbon-multiselect-example"
      titleText="Multiselect title"
      helperText="This is helper text"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      selectionFeedback="top-after-reopen"
      decorator={aiLabel}
      {...args}
    />
  </div>
);

FilterableWithAILabel.argTypes = {
  ...filterableArgTypes,
};
export const ExperimentalAutoAlign = (args) => {
  const ref = useRef();
  useEffect(() => {
    ref?.current?.scrollIntoView({ block: 'center', inline: 'center' });
  });
  return (
    <div style={{ width: '5000px', height: '5000px' }}>
      <div
        style={{
          position: 'absolute',
          top: '2500px',
          left: '2500px',
          width: 300,
        }}>
        <MultiSelect
          label="Multiselect Label"
          id="carbon-multiselect-example"
          titleText="Multiselect title"
          helperText="This is helper text"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
          ref={ref}
          autoAlign
          {...args}
        />
      </div>
    </div>
  );
};

ExperimentalAutoAlign.argTypes = {
  autoAlign: {
    control: false,
  },
};

ExperimentalAutoAlign.args = { ...sharedArgs, autoAlign: true };
export const withToggletipLabel = (args) => {
  return (
    <div>
      <MultiSelect
        label="Multiselect Label"
        id="carbon-multiselect-example"
        titleText={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ToggletipLabel>Multiselect title</ToggletipLabel>
            <Toggletip>
              <ToggletipButton label="Show information">
                <Information />
              </ToggletipButton>
              <ToggletipContent>
                <p>
                  Lorem ipsum dolor sit amet, di os consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut fsil labore et dolore
                  magna aliqua.
                </p>
                <ToggletipActions>
                  <Link href="#">Link action</Link>
                  <Button size="sm">Button</Button>
                </ToggletipActions>
              </ToggletipContent>
            </Toggletip>
          </div>
        }
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        {...args}
      />
    </div>
  );
};

export const SelectAllWithDynamicItems = (args) => {
  const [label, setLabel] = useState('Choose options');
  const [items, setItems] = useState(itemsWithSelectAll);

  const onChange = (value) => {
    if (value.selectedItems.length == 1) {
      setLabel('Option selected');
    } else if (value.selectedItems.length > 1) {
      setLabel('Options selected');
    } else {
      setLabel('Choose options');
    }
  };

  function addItems() {
    setItems((prevItems) => {
      const now = Date.now();
      return [
        ...prevItems,
        {
          id: `item-added-via-button-1${now}`,
          text: `item-added-via-button-1${now}`,
        },
        {
          id: `item-added-via-button-2${now}`,
          text: `item-added-via-button-2${now}`,
        },
      ];
    });
  }

  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        label={label}
        id="carbon-multiselect-example"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        onChange={onChange}
        {...args}
      />
      <Button onClick={addItems}>Add 2 items to the list</Button>
    </div>
  );
};



File: MultiSelect/filter.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const defaultFilterItems = <ItemType>(
  items: ItemType[],
  {
    itemToString,
    inputValue,
  }: {
    itemToString: (item: ItemType | null) => string;
    inputValue: string | null;
  }
): ItemType[] => {
  if (!inputValue) return items;

  const normalizedInput = inputValue.toLowerCase();

  return items.filter((item) =>
    itemToString(item).toLowerCase().includes(normalizedInput)
  );
};



File: MultiSelect/FilterableMultiSelect.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import cx from 'classnames';
import Downshift, {
  useCombobox,
  useMultipleSelection,
  type UseComboboxProps,
  type UseMultipleSelectionProps,
  UseComboboxInterface,
  UseComboboxStateChangeTypes,
  UseMultipleSelectionInterface,
} from 'downshift';
import isEqual from 'react-fast-compare';
import PropTypes from 'prop-types';
import React, {
  cloneElement,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type ForwardedRef,
  type FunctionComponent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { defaultFilterItems } from './filter';
import {
  type MultiSelectSortingProps,
  sortingPropTypes,
} from './MultiSelectPropTypes';
import ListBox, {
  ListBoxSizePropType,
  ListBoxTypePropType,
  type ListBoxMenuIconTranslationKey,
  type ListBoxSelectionTranslationKey,
  type ListBoxSize,
  type ListBoxType,
} from '../ListBox';
import Checkbox from '../Checkbox';
import { ListBoxTrigger, ListBoxSelection } from '../ListBox/next';
import { match, keys } from '../../internal/keyboard';
import { mergeRefs } from '../../tools/mergeRefs';
import { deprecate } from '../../prop-types/deprecate';
import { useId } from '../../internal/useId';
import { defaultSortItems, defaultCompareItems } from './tools/sorting';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import { useSelection } from '../../internal/Selection';
import {
  useFloating,
  flip,
  hide,
  size as floatingSize,
  autoUpdate,
} from '@floating-ui/react';
import type { TranslateWithId } from '../../types/common';
import { AILabel } from '../AILabel';
import { defaultItemToString, isComponentElement } from '../../internal';

const {
  InputBlur,
  InputKeyDownEnter,
  ItemClick,
  MenuMouseLeave,
  InputKeyDownArrowUp,
  InputKeyDownArrowDown,
  ItemMouseMove,
  InputClick,
  ToggleButtonClick,
  FunctionToggleMenu,
  InputChange,
  InputKeyDownEscape,
  FunctionSetHighlightedIndex,
} = useCombobox.stateChangeTypes as UseComboboxInterface['stateChangeTypes'] & {
  ToggleButtonClick: UseComboboxStateChangeTypes.ToggleButtonClick;
};

const {
  SelectedItemKeyDownBackspace,
  SelectedItemKeyDownDelete,
  DropdownKeyDownBackspace,
  FunctionRemoveSelectedItem,
} =
  useMultipleSelection.stateChangeTypes as UseMultipleSelectionInterface['stateChangeTypes'];

export interface FilterableMultiSelectProps<ItemType>
  extends MultiSelectSortingProps<ItemType>,
    React.RefAttributes<HTMLDivElement>,
    TranslateWithId<
      ListBoxSelectionTranslationKey | ListBoxMenuIconTranslationKey
    > {
  /**
   * Specify a label to be read by screen readers on the container node
   * @deprecated
   */
  'aria-label'?: string;
  /** @deprecated */
  ariaLabel?: string;

  /**
   * **Experimental**: Will attempt to automatically align the floating
   * element to avoid collisions with the viewport and being clipped by
   * ancestor elements. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign?: boolean;

  className?: string;

  /**
   * Specify the text that should be read for screen readers that describes total items selected
   */
  clearSelectionDescription?: string;

  /**
   * Specify the text that should be read for screen readers to clear selection.
   */
  clearSelectionText?: string;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `FilterableMultiSelect` component
   */
  decorator?: ReactNode;

  /**
   * Specify the direction of the multiselect dropdown.
   */
  direction?: 'top' | 'bottom';

  /**
   * Disable the control
   */
  disabled?: boolean;

  /**
   * Additional props passed to Downshift.
   *
   * **Use with caution:** anything you define here overrides the components'
   * internal handling of that prop. Downshift APIs and internals are subject to
   * change, and in some cases they can not be shimmed by Carbon to shield you
   * from potentially breaking changes.
   */
  downshiftProps?: UseMultipleSelectionProps<ItemType>;

  /**
   * Provide a method that filters the dropdown options based on the current input. Overriding this
   * prop means that you have to handle the filtering logic when the user types in the text input.
   * Otherwise, a default built-in filtering function will be used.
   */
  filterItems?(
    items: readonly ItemType[],
    extra: {
      inputValue: string | null;
      itemToString: NonNullable<UseComboboxProps<ItemType>['itemToString']>;
    }
  ): ItemType[];

  /**
   * Specify whether the title text should be hidden or not
   */
  hideLabel?: boolean;

  /**
   * Provide helper text that is used alongside
   * the control label for additional help
   */
  helperText?: ReactNode;

  /**
   * Specify a custom `id`
   */
  id: string;

  /**
   * Allow users to pass in arbitrary items from their collection that are
   * pre-selected
   */
  initialSelectedItems?: ItemType[];

  /**
   * Is the current selection invalid?
   */
  invalid?: boolean;

  /**
   * If invalid, what is the error?
   */
  invalidText?: ReactNode;

  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement?: FunctionComponent<ItemType>;

  /**
   * Helper function passed to downshift that allows the library to render
   * a given item to a string label.
   *
   * By default, it extracts the `label` field from a given item
   * to serve as the item label in the list.
   */
  itemToString?(item: ItemType | null): string;

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: ItemType[];

  /**
   * @deprecated `true` to use the light version.
   */
  light?: boolean;

  /**
   * Specify the locale of the control.
   * Used for the default `compareItems`,
   * which is used for sorting the list of items in the control.
   */
  locale?: string;

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange?(changes: { selectedItems: ItemType[] }): void;

  /**
   * A utility for this controlled component
   * to communicate to the currently typed input.
   */
  onInputValueChange?: UseComboboxProps<ItemType>['onInputValueChange'];

  /**
   * `onMenuChange` is a utility for this controlled component to communicate to a
   * consuming component that the menu was opened(`true`)/closed(`false`).
   */
  onMenuChange?(open: boolean): void;

  /**
   * Initialize the component with an open(`true`)/closed(`false`) menu.
   */
  open?: boolean;

  /**
   * Generic `placeholder` that will be used as the textual representation of
   * what this field is for
   */
  placeholder?: string;

  /**
   * Whether or not the filterable multiselect is readonly
   */
  readOnly?: boolean;

  /**
   * Specify feedback (mode) of the selection.
   * `top`: selected item jumps to top
   * `fixed`: selected item stays at its position
   * `top-after-reopen`: selected item jump to top after reopen dropdown
   */
  selectionFeedback?: 'top' | 'fixed' | 'top-after-reopen';

  /**
   * For full control of the selected items
   */
  selectedItems?: ItemType[];

  /**
   * Specify the size of the ListBox.
   * Currently, supports either `sm`, `md` or `lg` as an option.
   */
  size?: ListBoxSize;

  /**
   * @deprecated please use decorator instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Checkbox` component
   */
  slug?: ReactNode;

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * combobox via ARIA attributes.
   */
  titleText?: ReactNode;

  type?: ListBoxType;

  /**
   * Specify title to show title on hover
   */
  useTitleInItem?: boolean;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNode;

  /**
   * Specify native input attributes to place on the `<input>`, like maxLength.
   * These are passed to downshift's getInputProps() and will override the
   * internal input props.
   * https://github.com/downshift-js/downshift?tab=readme-ov-file#getinputprops
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const FilterableMultiSelect = forwardRef(function FilterableMultiSelect<
  ItemType,
>(
  {
    autoAlign = false,
    className: containerClassName,
    clearSelectionDescription = 'Total items selected: ',
    clearSelectionText = 'To clear selection, press Delete or Backspace',
    compareItems = defaultCompareItems,
    decorator,
    direction = 'bottom',
    disabled = false,
    downshiftProps,
    filterItems = defaultFilterItems,
    helperText,
    hideLabel,
    id,
    initialSelectedItems = [],
    invalid,
    invalidText,
    items,
    itemToElement: ItemToElement, // needs to be capitalized for react to render it correctly
    itemToString = defaultItemToString,
    light,
    locale = 'en',
    onInputValueChange,
    open = false,
    onChange,
    onMenuChange,
    placeholder,
    readOnly,
    titleText,
    type,
    selectionFeedback = 'top-after-reopen',
    selectedItems: selected,
    size,
    sortItems = defaultSortItems as FilterableMultiSelectProps<ItemType>['sortItems'],
    translateWithId,
    useTitleInItem,
    warn,
    warnText,
    slug,
    inputProps,
  }: FilterableMultiSelectProps<ItemType>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { isFluid } = useContext(FormContext);
  const isFirstRender = useRef(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(!!open);
  const [prevOpen, setPrevOpen] = useState<boolean>(!!open);
  const [inputValue, setInputValue] = useState<string>('');
  const [topItems, setTopItems] = useState<ItemType[]>(
    initialSelectedItems ?? []
  );
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const filteredItems = useMemo(
    () => filterItems(items, { itemToString, inputValue }),
    [items, inputValue, itemToString, filterItems]
  );

  const nonSelectAllItems = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    () => filteredItems.filter((item) => !(item as any).isSelectAll),
    [filteredItems]
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  const selectAll = filteredItems.some((item) => (item as any).isSelectAll);

  const {
    selectedItems: controlledSelectedItems,
    onItemChange,
    clearSelection,
    toggleAll,
  } = useSelection({
    disabled,
    initialSelectedItems,
    onChange,
    selectedItems: selected,
    selectAll,
    filteredItems,
  });

  const selectAllStatus = useMemo(() => {
    const selectable = nonSelectAllItems.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      (item) => !(item as any).disabled
    );

    const nonSelectedCount = selectable.filter(
      (item) => !controlledSelectedItems.some((sel) => isEqual(sel, item))
    ).length;

    const totalCount = selectable.length;
    return {
      checked: totalCount > 0 && nonSelectedCount === 0,
      indeterminate: nonSelectedCount > 0 && nonSelectedCount < totalCount,
    };
  }, [controlledSelectedItems, nonSelectAllItems]);

  const handleSelectAllClick = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    const selectable = nonSelectAllItems.filter((i) => !(i as any).disabled);
    const { checked, indeterminate } = selectAllStatus;

    // clear all options if select-all state is checked or indeterminate
    if (checked || indeterminate) {
      const remainingSelectedItems = controlledSelectedItems.filter(
        (sel) => !filteredItems.some((e) => isEqual(e, sel))
      );
      toggleAll(remainingSelectedItems);

      // select all options if select-all state is empty
    } else {
      const toSelect = selectable.filter(
        (e) => !controlledSelectedItems.some((sel) => isEqual(sel, e))
      );
      toggleAll([...controlledSelectedItems, ...toSelect]);
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [nonSelectAllItems, selectAllStatus, controlledSelectedItems, toggleAll]);

  const { refs, floatingStyles, middlewareData } = useFloating(
    autoAlign
      ? {
          placement: direction,

          // The floating element is positioned relative to its nearest
          // containing block (usually the viewport). It will in many cases also
          // “break” the floating element out of a clipping ancestor.
          // https://floating-ui.com/docs/misc#clipping
          strategy: 'fixed',

          // Middleware order matters, arrow should be last
          middleware: [
            flip({ crossAxis: false }),
            floatingSize({
              apply({ rects, elements }) {
                Object.assign(elements.floating.style, {
                  width: `${rects.reference.width}px`,
                });
              },
            }),
            hide(),
          ],
          whileElementsMounted: autoUpdate,
        }
      : {}
  );

  useLayoutEffect(() => {
    if (autoAlign) {
      const updatedFloatingStyles = {
        ...floatingStyles,
        visibility: middlewareData.hide?.referenceHidden ? 'hidden' : 'visible',
      };
      Object.keys(updatedFloatingStyles).forEach((style) => {
        if (refs.floating.current) {
          refs.floating.current.style[style] = updatedFloatingStyles[style];
        }
      });
    }
  }, [autoAlign, floatingStyles, refs.floating, middlewareData, open]);

  const textInput = useRef<HTMLInputElement>(null);
  const filterableMultiSelectInstanceId = useId();

  const prefix = usePrefix();

  if (prevOpen !== open) {
    setIsOpen(open);
    setPrevOpen(open);
  }

  // memoize sorted items to reduce unnecessary expensive sort on rerender
  const sortedItems = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    const selectAllItem = items.find((item) => (item as any).isSelectAll);

    const selectableRealItems = nonSelectAllItems.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      (item) => !(item as any).disabled
    );

    // Sort only non-select-all items, select-all item must stay at the top
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
    const sortedReal = sortItems!(nonSelectAllItems, {
      selectedItems: {
        top: controlledSelectedItems,
        fixed: [],
        'top-after-reopen': topItems,
      }[selectionFeedback],
      itemToString,
      compareItems,
      locale,
    });

    // Only show select-all-item if there exist non-disabled filtered items to select
    if (selectAllItem && selectableRealItems.length > 0) {
      return [selectAllItem, ...sortedReal];
    }
    return sortedReal;
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [
    items,
    inputValue,
    controlledSelectedItems,
    topItems,
    selectionFeedback,
    itemToString,
    compareItems,
    locale,
    sortItems,
    nonSelectAllItems,
  ]);

  const inline = type === 'inline';
  const showWarning = !invalid && warn;

  const wrapperClasses = cx(
    `${prefix}--multi-select__wrapper`,
    `${prefix}--multi-select--filterable__wrapper`,
    `${prefix}--list-box__wrapper`,
    containerClassName,
    {
      [`${prefix}--multi-select__wrapper--inline`]: inline,
      [`${prefix}--list-box__wrapper--inline`]: inline,
      [`${prefix}--multi-select__wrapper--inline--invalid`]: inline && invalid,
      [`${prefix}--list-box__wrapper--inline--invalid`]: inline && invalid,
      [`${prefix}--list-box--up`]: direction === 'top',
      [`${prefix}--list-box__wrapper--fluid--invalid`]: isFluid && invalid,
      [`${prefix}--list-box__wrapper--slug`]: slug,
      [`${prefix}--list-box__wrapper--decorator`]: decorator,
      [`${prefix}--autoalign`]: autoAlign,
    }
  );
  const helperId = !helperText
    ? undefined
    : `filterablemultiselect-helper-text-${filterableMultiSelectInstanceId}`;
  const labelId = `${id}-label`;
  const titleClasses = cx({
    [`${prefix}--label`]: true,
    [`${prefix}--label--disabled`]: disabled,
    [`${prefix}--visually-hidden`]: hideLabel,
  });
  const helperClasses = cx({
    [`${prefix}--form__helper-text`]: true,
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });
  const inputClasses = cx({
    [`${prefix}--text-input`]: true,
    [`${prefix}--text-input--empty`]: !inputValue,
    [`${prefix}--text-input--light`]: light,
  });
  const helper = helperText ? (
    <div id={helperId} className={helperClasses}>
      {helperText}
    </div>
  ) : null;
  const menuId = `${id}__menu`;
  const inputId = `${id}-input`;

  useEffect(() => {
    if (!isOpen) {
      setTopItems(controlledSelectedItems);
    }
  }, [controlledSelectedItems, isOpen, setTopItems]);

  const validateHighlightFocus = () => {
    if (controlledSelectedItems.length > 0) {
      setHighlightedIndex(0);
    }
  };

  function handleMenuChange(forceIsOpen: boolean): void {
    if (!readOnly) {
      const nextIsOpen = forceIsOpen ?? !isOpen;
      setIsOpen(nextIsOpen);
      validateHighlightFocus();
    }
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      if (open) {
        onMenuChange?.(isOpen);
      }
    } else {
      onMenuChange?.(isOpen);
    }
  }, [isOpen, onMenuChange, open]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement;
      const wrapper = document
        .getElementById(id)
        ?.closest(`.${prefix}--multi-select__wrapper`);

      // If click is outside our component and menu is open or input is focused
      if (wrapper && !wrapper.contains(target)) {
        if (isOpen || inputFocused) {
          setIsOpen(false);
          setInputFocused(false);
          setInputValue('');
        }
      }
    };

    if (inputFocused || isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [isOpen, inputFocused]);

  const {
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    setHighlightedIndex,
    getItemProps,
    openMenu,
    isOpen: isMenuOpen,
  } = useCombobox<ItemType>({
    isOpen,
    items: sortedItems,
    // defaultHighlightedIndex: 0, // after selection, highlight the first item.
    itemToString,
    id,
    labelId,
    menuId,
    inputId,
    inputValue,
    stateReducer,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    isItemDisabled(item, _index) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      return (item as any)?.disabled;
    },
  });
  function stateReducer(state, actionAndChanges) {
    const { type, props, changes } = actionAndChanges;
    const { highlightedIndex } = changes;

    if (changes.isOpen && !isOpen) {
      setTopItems(controlledSelectedItems);
    }
    switch (type) {
      case InputKeyDownEnter:
        if (sortedItems.length === 0) {
          return changes;
        }
        if (changes.selectedItem && changes.selectedItem.disabled !== true) {
          if (changes.selectedItem.isSelectAll) {
            handleSelectAllClick();
          } else {
            onItemChange(changes.selectedItem);
          }
        }
        setHighlightedIndex(changes.selectedItem);

        return { ...changes, highlightedIndex: state.highlightedIndex };
      case ItemClick:
        if (changes.selectedItem.isSelectAll) {
          handleSelectAllClick();
        } else {
          onItemChange(changes.selectedItem);
        }
        setHighlightedIndex(changes.selectedItem);
        return changes;
      case InputBlur:
      case InputKeyDownEscape:
        setIsOpen(false);
        return changes;
      case FunctionToggleMenu:
      case ToggleButtonClick:
        validateHighlightFocus();
        if (changes.isOpen && !changes.selectedItem) {
          return { ...changes };
        }

        return {
          ...changes,
          highlightedIndex: controlledSelectedItems.length > 0 ? 0 : -1,
        };
      case InputChange:
        if (onInputValueChange) {
          onInputValueChange(changes.inputValue);
        }
        setInputValue(changes.inputValue ?? '');
        setIsOpen(true);
        return { ...changes, highlightedIndex: 0 };

      case InputClick:
        setIsOpen(changes.isOpen || false);
        validateHighlightFocus();
        if (changes.isOpen && !changes.selectedItem) {
          return { ...changes };
        }
        return {
          ...changes,
          isOpen: false,
          highlightedIndex: controlledSelectedItems.length > 0 ? 0 : -1,
        };
      case MenuMouseLeave:
        return { ...changes, highlightedIndex: state.highlightedIndex };
      case InputKeyDownArrowUp:
      case InputKeyDownArrowDown:
        if (InputKeyDownArrowDown === type && !isOpen) {
          setIsOpen(true);
          return {
            ...changes,
            highlightedIndex: 0,
          };
        }
        if (highlightedIndex > -1) {
          const itemArray = document.querySelectorAll(
            `li.${prefix}--list-box__menu-item[role="option"]`
          );
          props.scrollIntoView(itemArray[highlightedIndex]);
        }
        if (highlightedIndex === -1) {
          return {
            ...changes,
            highlightedIndex: 0,
          };
        }
        return changes;
      case ItemMouseMove:
        return { ...changes, highlightedIndex: state.highlightedIndex };
      case FunctionSetHighlightedIndex:
        if (!isOpen) {
          return {
            ...changes,
            highlightedIndex: 0,
          };
        } else {
          return {
            ...changes,
            highlightedIndex: props.items.indexOf(highlightedIndex),
          };
        }
      default:
        return changes;
    }
  }

  const { getDropdownProps } = useMultipleSelection<ItemType>({
    activeIndex: highlightedIndex,
    initialSelectedItems,
    selectedItems: controlledSelectedItems,
    onStateChange(changes) {
      switch (changes.type) {
        case SelectedItemKeyDownBackspace:
        case SelectedItemKeyDownDelete:
        case DropdownKeyDownBackspace:
        case FunctionRemoveSelectedItem: {
          clearSelection();
          break;
        }
      }
    },
    ...downshiftProps,
  });

  useEffect(() => {
    if (isOpen && !isMenuOpen) {
      openMenu();
    }
  });

  function clearInputValue(
    event?: KeyboardEvent<Element> | MouseEvent<HTMLButtonElement>
  ) {
    const value = textInput.current?.value;
    if (
      value?.length === 1 ||
      (event && 'key' in event && match(event, keys.Escape))
    ) {
      setInputValue('');
    } else {
      setInputValue(value ?? '');
    }

    if (textInput.current) {
      textInput.current.focus();
    }
  }

  // AILabel always size `mini`
  const candidate = slug ?? decorator;
  const candidateIsAILabel = isComponentElement(candidate, AILabel);
  const normalizedDecorator = candidateIsAILabel
    ? cloneElement(candidate, { size: 'mini' })
    : candidate;

  // exclude the select-all item from the count
  const selectedItemsLength = controlledSelectedItems.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    (item: any) => !(item as any).isSelectAll
  ).length;

  const className = cx(
    `${prefix}--multi-select`,
    `${prefix}--combo-box`,
    `${prefix}--multi-select--filterable`,
    {
      [`${prefix}--multi-select--invalid`]: invalid,
      [`${prefix}--multi-select--invalid--focused`]: invalid && inputFocused,
      [`${prefix}--multi-select--open`]: isOpen,
      [`${prefix}--multi-select--inline`]: inline,
      [`${prefix}--multi-select--selected`]:
        controlledSelectedItems?.length > 0,
      [`${prefix}--multi-select--filterable--input-focused`]: inputFocused,
      [`${prefix}--multi-select--readonly`]: readOnly,
      [`${prefix}--multi-select--selectall`]: selectAll,
    }
  );

  const labelProps = getLabelProps();

  const buttonProps = getToggleButtonProps({
    disabled,
    onClick: () => {
      handleMenuChange(!isOpen);
      textInput.current?.focus();
    },
    // When we moved the "root node" of Downshift to the <input> for
    // ARIA 1.2 compliance, we unfortunately hit this branch for the
    // "mouseup" event that downshift listens to:
    // https://github.com/downshift-js/downshift/blob/v5.2.1/src/downshift.js#L1051-L1065
    //
    // As a result, it will reset the state of the component and so we
    // stop the event from propagating to prevent this. This allows the
    // toggleMenu behavior for the toggleButton to correctly open and
    // close the menu.
    onMouseUp(event) {
      if (isOpen) {
        event.stopPropagation();
      }
    },
  });

  const inputProp = getInputProps(
    getDropdownProps({
      'aria-controls': isOpen ? menuId : undefined,
      'aria-describedby':
        helperText && !invalid && !warn ? helperId : undefined,
      'aria-haspopup': 'listbox',
      // Remove excess aria `aria-labelledby`. HTML <label for>
      // provides this aria information.
      'aria-labelledby': undefined,
      disabled,
      placeholder,
      preventKeyAction: isOpen,
      ...inputProps,

      onClick: () => handleMenuChange(true),
      onKeyDown(event: KeyboardEvent<HTMLElement>) {
        const $input = event.target as HTMLInputElement;
        const $value = $input.value;

        if (match(event, keys.Space)) {
          event.stopPropagation();
        }

        if (match(event, keys.Enter)) {
          handleMenuChange(true);
        }

        if (!disabled) {
          if (match(event, keys.Delete) || match(event, keys.Escape)) {
            if (isOpen) {
              handleMenuChange(true);
              clearInputValue(event);
              event.stopPropagation();
            } else if (!isOpen) {
              clearInputValue(event);
              clearSelection();
              event.stopPropagation();
            }
          }
        }

        if (match(event, keys.Tab)) {
          handleMenuChange(false);
        }

        if (match(event, keys.Home)) {
          $input.setSelectionRange(0, 0);
        }

        if (match(event, keys.End)) {
          $input.setSelectionRange($value.length, $value.length);
        }
      },
      onFocus: () => setInputFocused(true),
      onBlur: () => {
        setInputFocused(false);
        setInputValue('');
      },
    })
  );

  // Memoize the value of getMenuProps to avoid an infinite loop
  const menuProps = useMemo(
    () =>
      getMenuProps(
        {
          ref: autoAlign ? refs.setFloating : null,
        },
        { suppressRefError: true }
      ),
    [autoAlign, getMenuProps, refs.setFloating]
  );

  const handleFocus = (evt: FocusEvent<HTMLDivElement> | undefined) => {
    if (
      evt?.target.classList.contains(`${prefix}--tag__close-icon`) ||
      evt?.target.classList.contains(`${prefix}--list-box__selection`)
    ) {
      setIsFocused(false);
    } else {
      setIsFocused(evt?.type === 'focus' ? true : false);
    }
  };

  const mergedRef = mergeRefs(textInput, inputProp.ref);

  const readOnlyEventHandlers = readOnly
    ? {
        onClick: (evt: React.MouseEvent<HTMLInputElement>) => {
          // NOTE: does not prevent click
          evt.preventDefault();
          // focus on the element as per readonly input behavior
          if (textInput.current) {
            textInput.current.focus();
          }
        },
        onKeyDown: (evt: React.KeyboardEvent<HTMLInputElement>) => {
          const selectAccessKeys = ['ArrowDown', 'ArrowUp', ' ', 'Enter'];
          // This prevents the select from opening for the above keys
          if (selectAccessKeys.includes(evt.key)) {
            evt.preventDefault();
          }
        },
      }
    : {};

  const clearSelectionContent =
    controlledSelectedItems.length > 0
      ? `${clearSelectionDescription} ${controlledSelectedItems.length}. ${clearSelectionText}.`
      : `${clearSelectionDescription} 0.`;

  return (
    <div className={wrapperClasses}>
      {titleText ? (
        <label className={titleClasses} {...labelProps}>
          {titleText}
          <span className={`${prefix}--visually-hidden`}>
            {clearSelectionContent}
          </span>
        </label>
      ) : null}
      <ListBox
        onFocus={isFluid ? handleFocus : undefined}
        onBlur={isFluid ? handleFocus : undefined}
        className={className}
        disabled={disabled}
        light={light}
        ref={ref}
        id={id}
        invalid={invalid}
        invalidText={invalidText}
        warn={warn}
        warnText={warnText}
        isOpen={!readOnly && isOpen}
        size={size}>
        <div
          className={`${prefix}--list-box__field`}
          ref={autoAlign ? refs.setReference : null}>
          {controlledSelectedItems.length > 0 && (
            <ListBoxSelection
              readOnly={readOnly}
              clearSelection={() => {
                clearSelection();
                if (textInput.current) {
                  textInput.current.focus();
                }
              }}
              selectionCount={selectedItemsLength}
              translateWithId={translateWithId}
              disabled={disabled}
            />
          )}
          <input
            className={inputClasses}
            {...inputProp}
            ref={mergedRef}
            {...readOnlyEventHandlers}
            readOnly={readOnly}
          />
          {invalid && (
            <WarningFilled className={`${prefix}--list-box__invalid-icon`} />
          )}
          {showWarning && (
            <WarningAltFilled
              className={`${prefix}--list-box__invalid-icon ${prefix}--list-box__invalid-icon--warning`}
            />
          )}
          {inputValue && (
            <ListBoxSelection
              clearSelection={clearInputValue}
              disabled={disabled}
              translateWithId={translateWithId}
              readOnly={readOnly}
              onMouseUp={(event: MouseEvent) => {
                // If we do not stop this event from propagating,
                // it seems like Downshift takes our event and
                // prevents us from getting `onClick` /
                // `clearSelection` from the underlying <button> in
                // ListBoxSelection
                event.stopPropagation();
              }}
            />
          )}
          <ListBoxTrigger
            {...buttonProps}
            isOpen={isOpen}
            translateWithId={translateWithId}
          />
        </div>
        {slug ? (
          normalizedDecorator
        ) : decorator ? (
          <div className={`${prefix}--list-box__inner-wrapper--decorator`}>
            {candidateIsAILabel ? (
              normalizedDecorator
            ) : (
              <span>{normalizedDecorator}</span>
            )}
          </div>
        ) : (
          ''
        )}

        <ListBox.Menu {...menuProps}>
          {isOpen
            ? sortedItems.map((item, index) => {
                let isChecked: boolean;
                let isIndeterminate = false;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
                if ((item as any).isSelectAll) {
                  isChecked = selectAllStatus.checked;
                  isIndeterminate = selectAllStatus.indeterminate;
                } else {
                  isChecked =
                    controlledSelectedItems.filter((selected) =>
                      isEqual(selected, item)
                    ).length > 0;
                }
                const itemProps = getItemProps({
                  item,
                  ['aria-selected']: isChecked,
                });
                const itemText = itemToString(item);

                // The initial implementation using <Downshift> would place the disabled attribute
                // on disabled menu items. Conversely, useCombobox places aria-disabled instead.
                // To avoid any potential breaking changes, we avoid placing aria-disabled and
                // instead match the old behavior of placing the disabled attribute.
                const disabled = itemProps['aria-disabled'];
                const {
                  'aria-disabled': unusedAriaDisabled, // eslint-disable-line @typescript-eslint/no-unused-vars
                  ...modifiedItemProps
                } = itemProps;

                return (
                  <ListBox.MenuItem
                    key={itemProps.id}
                    aria-label={itemText}
                    isActive={isChecked && !item['isSelectAll']}
                    isHighlighted={highlightedIndex === index}
                    title={itemText}
                    disabled={disabled}
                    {...modifiedItemProps}>
                    <div className={`${prefix}--checkbox-wrapper`}>
                      <Checkbox
                        id={`${itemProps.id}-item`}
                        labelText={
                          ItemToElement ? (
                            <ItemToElement key={itemProps.id} {...item} />
                          ) : (
                            itemText
                          )
                        }
                        checked={isChecked}
                        title={useTitleInItem ? itemText : undefined}
                        indeterminate={isIndeterminate}
                        disabled={disabled}
                        tabIndex={-1}
                      />
                    </div>
                  </ListBox.MenuItem>
                );
              })
            : null}
        </ListBox.Menu>
      </ListBox>
      {!inline && !invalid && !warn ? helper : null}
    </div>
  );
}) as {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  <ItemType>(props: FilterableMultiSelectProps<ItemType>): ReactElement<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  propTypes?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  contextTypes?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  defaultProps?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  displayName?: any;
};

FilterableMultiSelect.displayName = 'FilterableMultiSelect';
FilterableMultiSelect.propTypes = {
  /**
   * Deprecated, aria-label is no longer needed
   * Specify a label to be read by screen readers on the container node
   */
  ['aria-label']: deprecate(
    PropTypes.string,
    'ariaLabel / aria-label props are no longer required for FilterableMultiSelect'
  ),

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify a label to be read by screen readers on the container note.
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'ariaLabel / aria-label props are no longer required for FilterableMultiSelect'
  ),

  /**
   * **Experimental**: Will attempt to automatically align the floating
   * element to avoid collisions with the viewport and being clipped by
   * ancestor elements. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: PropTypes.bool,

  /**
   * Specify the text that should be read for screen readers that describes total items selected
   */
  clearSelectionDescription: PropTypes.string,

  /**
   * Specify the text that should be read for screen readers to clear selection.
   */
  clearSelectionText: PropTypes.string,

  /**
   * **Experimental**: Provide a decorator component to be rendered inside the `FilterableMultiSelect` component
   */
  decorator: PropTypes.node,

  /**
   * Provide a method that filters the dropdown options based on the current input. Overriding this
   * prop means that you have to handle the filtering logic when the user types in the text input.
   * Otherwise, a default built-in filtering function will be used.
   */
  filterItems: PropTypes.func,

  /**
   * Specify the direction of the multiselect dropdown. Can be either top or bottom.
   */
  direction: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Disable the control
   */
  disabled: PropTypes.bool,

  /**
   * Additional props passed to Downshift.
   *
   * **Use with caution:** anything you define here overrides the components'
   * internal handling of that prop. Downshift APIs and internals are subject to
   * change, and in some cases they can not be shimmed by Carbon to shield you
   * from potentially breaking changes.
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore
  downshiftProps: PropTypes.shape(Downshift.propTypes),

  /**
   * Specify whether the title text should be hidden or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify a custom `id`
   */
  id: PropTypes.string.isRequired,

  /**
   * Allow users to pass in arbitrary items from their collection that are
   * pre-selected
   */
  initialSelectedItems: PropTypes.array,

  /**
   * Is the current selection invalid?
   */
  invalid: PropTypes.bool,

  /**
   * If invalid, what is the error?
   */
  invalidText: PropTypes.node,

  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement: PropTypes.func,

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list.
   */
  itemToString: PropTypes.func,

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: PropTypes.array.isRequired,

  /**
   * `true` to use the light version.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `FilterableMultiSelect` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * Specify the locale of the control. Used for the default `compareItems`
   * used for sorting the list of items in the control.
   */
  locale: PropTypes.string,

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange: PropTypes.func,

  /**
   * `onInputValueChange` is a utility for this controlled component to communicate to
   * the currently typed input.
   */
  onInputValueChange: PropTypes.func,

  /**
   * `onMenuChange` is a utility for this controlled component to communicate to a
   * consuming component that the menu was opened(`true`)/closed(`false`).
   */
  onMenuChange: PropTypes.func,

  /**
   * Initialize the component with an open(`true`)/closed(`false`) menu.
   */
  open: PropTypes.bool,

  /**
   * Generic `placeholder` that will be used as the textual representation of
   * what this field is for
   */
  placeholder: PropTypes.string,

  /**
   * Specify feedback (mode) of the selection.
   * `top`: selected item jumps to top
   * `fixed`: selected item stays at it's position
   * `top-after-reopen`: selected item jump to top after reopen dropdown
   */
  selectionFeedback: PropTypes.oneOf(['top', 'fixed', 'top-after-reopen']),

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size: ListBoxSizePropType,

  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),

  ...sortingPropTypes,

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * combobox via ARIA attributes.
   */
  titleText: PropTypes.node,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,

  type: ListBoxTypePropType,

  /**
   * Specify title to show title on hover
   */
  useTitleInItem: PropTypes.bool,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,

  /**
   * Specify native input attributes to place on the `<input>`, like maxLength.
   * These are passed to downshift's getInputProps() and will override the
   * internal input props.
   * https://github.com/downshift-js/downshift?tab=readme-ov-file#getinputprops
   */
  inputProps: PropTypes.object,
};



