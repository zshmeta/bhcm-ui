File: ComboBox/ComboBox.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { WithLayer } from '../../../.storybook/templates/WithLayer';
import ComboBox from '../ComboBox';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import { action } from 'storybook/actions';
import mdx from './ComboBox.mdx';

const items = [
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
    text: 'Option 3',
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
export default {
  title: 'Components/ComboBox',
  component: ComboBox,
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
    onChange: { action: 'onChange' },
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: [
        'aria-label',
        'id',
        'downshiftProps',
        'initialSelectedItem',
        'items',
        'itemToElement',
        'itemToString',
        'selectedItem',
        'shouldFilterItem',
        'translateWithId',
        'titleText',
        'type',
      ],
    },
  },
};

const sharedArgTypes = {
  onChange: {
    action: 'onChange',
  },
  onToggleClick: {
    action: 'clicked',
  },
  invalidText: {
    control: 'text',
  },
  warnText: {
    control: 'text',
  },
};

export const Default = (args) => {
  const items = [
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
      text: 'Option 3',
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
  return (
    <div style={{ width: 300 }}>
      <ComboBox
        id="carbon-combobox"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        titleText="Label"
        helperText="Helper text"
        invalidText="Error message goes here"
        warnText="Warning message goes here"
        onChange={action('onChange')}
        {...args}
      />
    </div>
  );
};

Default.argTypes = { ...sharedArgTypes };

export const AllowCustomValue = (args) => {
  const filterItems = (menu) => {
    return menu?.item?.toLowerCase().includes(menu?.inputValue?.toLowerCase());
  };
  return (
    <div style={{ width: 300 }}>
      <ComboBox
        allowCustomValue
        shouldFilterItem={filterItems}
        id="carbon-combobox"
        items={['Apple', 'Orange', 'Banana', 'Pineapple', 'Raspberry', 'Lime']}
        titleText="Label"
        helperText="Helper text"
        invalidText="Error message goes here"
        warnText="Warning message goes here"
        {...args}
      />
    </div>
  );
};

AllowCustomValue.argTypes = { ...sharedArgTypes };

export const AutocompleteWithTypeahead = (args) => {
  return (
    <div style={{ width: 300 }}>
      <ComboBox
        helperText="Helper text"
        invalidText="Error message goes here"
        warnText="Warning message goes here"
        id="carbon-combobox"
        items={[
          'Apple',
          'Apricot',
          'Avocado',
          'Banana',
          'Blackberry',
          'Blueberry',
          'Cantaloupe',
        ]}
        titleText="Label"
        {...args}
        typeahead
      />
    </div>
  );
};

AutocompleteWithTypeahead.argTypes = {
  ...sharedArgTypes,
  onChange: { action: 'onChange' },
};

export const ExperimentalAutoAlign = (args) => (
  <div style={{ width: 400 }}>
    <div style={{ height: 300 }}></div>
    <ComboBox
      onChange={() => {}}
      id="carbon-combobox"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      titleText="Label"
      helperText="Helper text"
      autoAlign={true}
      {...args}
    />
    <div style={{ height: 800 }}></div>
  </div>
);

ExperimentalAutoAlign.argTypes = { ...sharedArgTypes };

export const _WithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 300 }}>
        <ComboBox
          onChange={() => {}}
          id={`carbon-combobox-${layer}`}
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          titleText="Label"
          helperText="Helper text"
          {...args}
        />
      </div>
    )}
  </WithLayer>
);

_WithLayer.argTypes = { ...sharedArgTypes };

export const withAILabel = (args) => {
  const aiLabel = (
    <AILabel className="ai-label-container">
      <AILabelContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h2 className="ai-label-heading">84%</h2>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
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
  const items = [
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
      text: 'Option 3',
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
  return (
    <div style={{ width: 300 }}>
      <ComboBox
        onChange={action('onChange')}
        id="carbon-combobox"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        titleText="Label"
        helperText="Helper text"
        decorator={aiLabel}
        {...args}
      />
    </div>
  );
};

withAILabel.argTypes = { ...sharedArgTypes };

export const _fullyControlled = (args) => {
  const options = [
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
      text: 'Option 3',
    },
  ];
  const [value, setValue] = React.useState(options[0]);
  const onChange = ({ selectedItem }) => {
    setValue(selectedItem);
  };

  return (
    <div>
      <ComboBox
        {...args}
        onChange={onChange}
        id="carbon-combobox"
        items={options}
        selectedItem={value}
        itemToString={(item) => (item ? item.text : '')}
        titleText="Label"
        helperText="Helper text"
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Button onClick={() => setValue(null)}>Reset</Button>
        <Button onClick={() => setValue(options[0])}>Option 1</Button>
        <Button onClick={() => setValue(options[1])}>Option 2</Button>
        <Button onClick={() => setValue(options[2])}>Option 3</Button>
      </div>
    </div>
  );
};

_fullyControlled.argTypes = { ...sharedArgTypes };



File: ComboBox/ComboBox.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import { useCombobox, UseComboboxProps, UseComboboxActions } from 'downshift';
import PropTypes from 'prop-types';
import React, {
  cloneElement,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type FocusEvent,
  type ForwardedRef,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type PropsWithChildren,
  type PropsWithRef,
  type ReactElement,
  type ReactNode,
  type RefAttributes,
} from 'react';
import { Text } from '../Text';
import {
  Checkmark,
  WarningAltFilled,
  WarningFilled,
} from '@carbon/icons-react';
import isEqual from 'react-fast-compare';
import ListBox, {
  ListBoxSizePropType,
  type ListBoxMenuIconTranslationKey,
  type ListBoxSelectionTranslationKey,
  type ListBoxSize,
} from '../ListBox';
import { ListBoxTrigger, ListBoxSelection } from '../ListBox/next';
import { match, keys } from '../../internal/keyboard';
import { useId } from '../../internal/useId';
import { mergeRefs } from '../../tools/mergeRefs';
import { deprecate } from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import { autoUpdate, flip, hide, useFloating } from '@floating-ui/react';
import type { TranslateWithId } from '../../types/common';
import { useFeatureFlag } from '../FeatureFlags';
import { AILabel } from '../AILabel';
import { defaultItemToString, isComponentElement } from '../../internal';

const {
  InputBlur,
  InputKeyDownEnter,
  FunctionToggleMenu,
  ToggleButtonClick,
  ItemMouseMove,
  InputKeyDownArrowUp,
  InputKeyDownArrowDown,
  MenuMouseLeave,
  ItemClick,
  FunctionSelectItem,
} = useCombobox.stateChangeTypes;

const defaultShouldFilterItem = () => true;

const autocompleteCustomFilter = ({
  item,
  inputValue,
}: {
  item: string;
  inputValue: string | null;
}): boolean => {
  if (inputValue === null || inputValue === '') {
    return true; // Show all items if there's no input
  }

  const lowercaseItem = item.toLowerCase();
  const lowercaseInput = inputValue.toLowerCase();

  return lowercaseItem.startsWith(lowercaseInput);
};

const getInputValue = <ItemType,>({
  initialSelectedItem,
  itemToString,
  selectedItem,
  prevSelectedItem,
}: {
  initialSelectedItem?: ItemType | null;
  itemToString: ItemToStringHandler<ItemType>;
  selectedItem?: ItemType | null;
  prevSelectedItem?: ItemType | null;
}) => {
  // If there's a current selection (even if it's an object or string), use it.
  if (selectedItem !== null && typeof selectedItem !== 'undefined') {
    return itemToString(selectedItem);
  }

  // On the very first render (when no previous value exists), use
  // `initialSelectedItem`.
  if (
    typeof prevSelectedItem === 'undefined' &&
    initialSelectedItem !== null &&
    typeof initialSelectedItem !== 'undefined'
  ) {
    return itemToString(initialSelectedItem);
  }

  // Otherwise (i.e., after the user has cleared the selection), return an empty
  // string.
  return '';
};

const findHighlightedIndex = <ItemType,>(
  {
    items,
    itemToString = defaultItemToString,
  }: { items: ItemType[]; itemToString?: ItemToStringHandler<ItemType> },
  inputValue?: string | null
) => {
  if (!inputValue) {
    return -1;
  }

  const searchValue = inputValue.toLowerCase();

  for (let i = 0; i < items.length; i++) {
    const item = itemToString(items[i]).toLowerCase();
    if (!items[i]['disabled'] && item.indexOf(searchValue) !== -1) {
      return i;
    }
  }

  return -1;
};

type ExcludedAttributes = 'id' | 'onChange' | 'onClick' | 'type' | 'size';

export interface OnChangeData<ItemType> {
  selectedItem: ItemType | null | undefined;
  inputValue?: string | null;
}

export type ItemToStringHandler<ItemType> = (item: ItemType | null) => string;

export interface ComboBoxProps<ItemType>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, ExcludedAttributes>,
    TranslateWithId<
      ListBoxMenuIconTranslationKey | ListBoxSelectionTranslationKey
    > {
  /**
   * Specify whether or not the ComboBox should allow a value that is
   * not in the list to be entered in the input
   */
  allowCustomValue?: boolean;

  /**
   * Specify a label to be read by screen readers on the container node
   * 'aria-label' of the ListBox component.
   */
  ['aria-label']?: string;

  /**
   * @deprecated please use `aria-label` instead.
   * 'aria-label' of the ListBox component.
   */
  ariaLabel?: string;

  /**
   * **Experimental**: Will attempt to automatically align the floating
   * element to avoid collisions with the viewport and being clipped by
   * ancestor elements. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign?: boolean;

  /**
   * An optional className to add to the container node
   */
  className?: string;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `ComboBox` component
   */
  decorator?: ReactNode;

  /**
   * Specify the direction of the combobox dropdown. Can be either top or bottom.
   */
  direction?: 'top' | 'bottom';

  /**
   * Specify if the control should be disabled, or not
   */
  disabled?: boolean;

  /**
   * Additional props passed to Downshift.
   *
   * **Use with caution:** anything you define here overrides the components'
   * internal handling of that prop. Downshift APIs and internals are subject to
   * change, and in some cases they can not be shimmed by Carbon to shield you
   * from potentially breaking changes.
   *
   */
  downshiftProps?: Partial<UseComboboxProps<ItemType>>;

  /**
   * Provide a ref that will be mutated to contain an object of downshift
   * action functions. These can be called to change the internal state of the
   * downshift useCombobox hook.
   *
   * **Use with caution:** calling these actions modifies the internal state of
   * downshift. It may conflict with or override the state management used within
   * Combobox. Downshift APIs and internals are subject to change, and in some
   * cases they can not be shimmed by Carbon to shield you from potentially breaking
   * changes.
   */
  downshiftActions?: React.MutableRefObject<
    UseComboboxActions<ItemType> | undefined
  >;

  /**
   * Provide helper text that is used alongside the control label for
   * additional help
   */
  helperText?: ReactNode;

  /**
   * Specify a custom `id` for the input
   */
  id: string;

  /**
   * Allow users to pass in an arbitrary item or a string (in case their items are an array of strings)
   * from their collection that are pre-selected
   */
  initialSelectedItem?: ItemType;

  /**
   * Specify if the currently selected value is invalid.
   */
  invalid?: boolean;

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText?: ReactNode;

  /**
   * Optional function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement?: ComponentType<ItemType> | null;

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list
   */
  itemToString?: ItemToStringHandler<ItemType>;

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: ItemType[];

  /**
   * @deprecated
   * should use "light theme" (white background)?
   */
  light?: boolean;

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component when a specific dropdown item is selected.
   * `({ selectedItem }) => void`
  //  * @param {{ selectedItem }}
   */
  onChange: (data: OnChangeData<ItemType>) => void;

  /**
   * Callback function to notify consumer when the text input changes.
   * This provides support to change available items based on the text.
   * `(inputText) => void`
   * @param {string} inputText
   */
  onInputChange?: (inputText: string) => void;

  /**
   * Callback function that fires when the combobox menu toggle is clicked
   * `(evt) => void`
   * @param {MouseEvent} event
   */
  onToggleClick?: (evt: MouseEvent<HTMLButtonElement>) => void;

  /**
   * Used to provide a placeholder text node before a user enters any input.
   * This is only present if the control has no items selected
   */
  placeholder?: string;

  /**
   * Whether or not the component is read-only
   */
  readOnly?: boolean;

  /**
   * For full control of the selection
   */
  selectedItem?: ItemType | null;

  /**
   * Specify your own filtering logic by passing in a `shouldFilterItem`
   * function that takes in the current input and an item and passes back
   * whether or not the item should be filtered.
   * this prop will be ignored if `typeahead` prop is enabled
   */
  shouldFilterItem?: (input: {
    item: ItemType;
    itemToString?: ItemToStringHandler<ItemType>;
    inputValue: string | null;
  }) => boolean;

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size?: ListBoxSize;

  /**
   * @deprecated please use decorator instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `ComboBox` component
   */
  slug?: ReactNode;

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * combobox via ARIA attributes.
   */
  titleText?: ReactNode;

  /**
   * **Experimental**: will enable autocomplete and typeahead for the input field
   */
  typeahead?: boolean;

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
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const ComboBox = forwardRef(
  <ItemType,>(
    props: ComboBoxProps<ItemType>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const prevInputLengthRef = useRef(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const {
      ['aria-label']: ariaLabel = 'Choose an item',
      ariaLabel: deprecatedAriaLabel,
      autoAlign = false,
      className: containerClassName,
      decorator,
      direction = 'bottom',
      disabled = false,
      downshiftActions,
      downshiftProps,
      helperText,
      id,
      initialSelectedItem,
      invalid,
      invalidText,
      items,
      itemToElement = null,
      itemToString = defaultItemToString,
      light,
      onChange,
      onInputChange,
      onToggleClick,
      placeholder,
      readOnly,
      selectedItem: selectedItemProp,
      shouldFilterItem = defaultShouldFilterItem,
      size,
      titleText,
      translateWithId,
      typeahead = false,
      warn,
      warnText,
      allowCustomValue = false,
      slug,
      inputProps,
      ...rest
    } = props;

    const enableFloatingStyles =
      useFeatureFlag('enable-v12-dynamic-floating-styles') || autoAlign;

    const { refs, floatingStyles, middlewareData } = useFloating(
      enableFloatingStyles
        ? {
            placement: direction,
            strategy: 'fixed',
            middleware: autoAlign ? [flip(), hide()] : undefined,
            whileElementsMounted: autoUpdate,
          }
        : {}
    );
    const parentWidth = (refs?.reference?.current as HTMLElement)?.clientWidth;

    useEffect(() => {
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
        if (parentWidth && refs.floating.current) {
          refs.floating.current.style.width = parentWidth + 'px';
        }
      }
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
    }, [enableFloatingStyles, floatingStyles, refs.floating, parentWidth]);

    const [inputValue, setInputValue] = useState(
      getInputValue({
        initialSelectedItem,
        itemToString,
        selectedItem: selectedItemProp,
      })
    );

    const [typeaheadText, setTypeaheadText] = useState('');

    useEffect(() => {
      if (typeahead) {
        if (inputValue.length >= prevInputLengthRef.current) {
          if (inputValue) {
            const filteredItems = items.filter((item) =>
              autocompleteCustomFilter({
                item: itemToString(item),
                inputValue: inputValue,
              })
            );
            if (filteredItems.length > 0) {
              const suggestion = itemToString(filteredItems[0]);
              setTypeaheadText(suggestion.slice(inputValue.length));
            } else {
              setTypeaheadText('');
            }
          } else {
            setTypeaheadText('');
          }
        } else {
          setTypeaheadText('');
        }
        prevInputLengthRef.current = inputValue.length;
      }
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
    }, [typeahead, inputValue, items, itemToString, autocompleteCustomFilter]);
    const isManualClearingRef = useRef(false);
    const [isClearing, setIsClearing] = useState(false);
    const prefix = usePrefix();
    const { isFluid } = useContext(FormContext);
    const textInput = useRef<HTMLInputElement>(null);
    const comboBoxInstanceId = useId();
    const [isFocused, setIsFocused] = useState(false);
    const prevInputValue = useRef(inputValue);
    const prevSelectedItemProp = useRef<ItemType | null | undefined>(
      selectedItemProp
    );
    useEffect(() => {
      isManualClearingRef.current = isClearing;

      // Reset flag after render cycle
      if (isClearing) {
        setIsClearing(false);
      }
    }, [isClearing]);

    // fully controlled combobox: handle changes to selectedItemProp
    useEffect(() => {
      if (prevSelectedItemProp.current !== selectedItemProp) {
        const currentInputValue = getInputValue({
          initialSelectedItem,
          itemToString,
          selectedItem: selectedItemProp,
          prevSelectedItem: prevSelectedItemProp.current,
        });
        // selectedItem has been updated externally, need to update state and call onChange
        if (inputValue !== currentInputValue) {
          setInputValue(currentInputValue);
          onChange({
            selectedItem: selectedItemProp,
            inputValue: currentInputValue,
          });
        }
        prevSelectedItemProp.current = selectedItemProp;
      }
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
    }, [selectedItemProp]);

    const filterItems = (
      items: ItemType[],
      itemToString: ItemToStringHandler<ItemType>,
      inputValue: string | null
    ) =>
      items.filter((item) =>
        typeahead
          ? autocompleteCustomFilter({ item: itemToString(item), inputValue })
          : shouldFilterItem
            ? shouldFilterItem({
                item,
                itemToString,
                inputValue,
              })
            : defaultShouldFilterItem()
      );

    // call onInputChange whenever inputValue is updated
    useEffect(() => {
      if (prevInputValue.current !== inputValue) {
        prevInputValue.current = inputValue;
        // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
        onInputChange && onInputChange(inputValue);
      }
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
    }, [inputValue]);

    const handleSelectionClear = () => {
      if (textInput?.current) {
        textInput.current.focus();
      }
    };

    const filteredItems = (inputValue) =>
      filterItems(items, itemToString, inputValue || null);

    const indexToHighlight = (inputValue) =>
      findHighlightedIndex(
        {
          ...props,
          items: filteredItems(inputValue),
        },
        inputValue
      );

    const stateReducer = useCallback(
      (state, actionAndChanges) => {
        const { type, changes } = actionAndChanges;
        const { highlightedIndex } = changes;

        switch (type) {
          case InputBlur: {
            // If custom values are allowed, treat whatever the user typed as
            // the value.
            if (allowCustomValue && highlightedIndex === -1) {
              const inputValue = state.inputValue ?? '';
              const currentSelectedItem =
                typeof changes.selectedItem === 'undefined'
                  ? state.selectedItem
                  : changes.selectedItem;
              const isMatchingSelection =
                currentSelectedItem !== null &&
                typeof currentSelectedItem !== 'undefined' &&
                itemToString(currentSelectedItem) === inputValue &&
                items.some((item) => isEqual(item, currentSelectedItem));

              if (isMatchingSelection) {
                return changes;
              }
              const nextSelectedItem =
                items.find((item) => itemToString(item) === inputValue) ??
                inputValue;

              if (!isEqual(currentSelectedItem, nextSelectedItem) && onChange) {
                onChange({ selectedItem: nextSelectedItem, inputValue });
              }

              return {
                ...changes,
                selectedItem: nextSelectedItem,
              };
            }

            // If a new item was selected, keep its label in the input.
            if (
              state.inputValue &&
              highlightedIndex === -1 &&
              changes.selectedItem
            ) {
              return {
                ...changes,
                inputValue: itemToString(changes.selectedItem),
              };
            }

            // If custom values are not allowed, normalize any non-matching
            // text. If the input isn’t an exact item label, restore the
            // selected label if there is one, or clear it.
            if (!allowCustomValue) {
              const currentInput = state.inputValue ?? '';
              const hasExactMatch =
                !!currentInput &&
                items.some((item) => itemToString(item) === currentInput);

              if (!hasExactMatch) {
                const restoredInput =
                  state.selectedItem !== null
                    ? itemToString(state.selectedItem)
                    : '';

                return { ...changes, inputValue: restoredInput };
              }
            }

            return changes;
          }

          case InputKeyDownEnter:
            if (!allowCustomValue) {
              if (state.highlightedIndex !== -1) {
                const filteredList = filterItems(
                  items,
                  itemToString,
                  inputValue
                );
                const highlightedItem = filteredList[state.highlightedIndex];

                // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
                if (highlightedItem && !(highlightedItem as any).disabled) {
                  return {
                    ...changes,
                    selectedItem: highlightedItem,
                    inputValue: itemToString(highlightedItem),
                  };
                }
              } else {
                const autoIndex = indexToHighlight(inputValue);
                if (autoIndex !== -1) {
                  const matchingItem = items[autoIndex];

                  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
                  if (matchingItem && !(matchingItem as any).disabled) {
                    return {
                      ...changes,
                      selectedItem: matchingItem,
                      inputValue: itemToString(matchingItem),
                    };
                  }
                }

                // If no matching item is found and there is an existing
                // selection, clear the selection.
                if (state.selectedItem !== null) {
                  return {
                    ...changes,
                    selectedItem: null,
                    inputValue,
                  };
                }
              }
            }

            // For `allowCustomValue` or if no matching item is found, keep the
            // menu open.
            return { ...changes, isOpen: true };
          case FunctionToggleMenu:
          case ToggleButtonClick:
            // When closing the menu, apply the same normalization as blur.
            if (state.isOpen && !changes.isOpen && !allowCustomValue) {
              const currentInput = state.inputValue ?? '';
              const hasExactMatch =
                !!currentInput &&
                items.some((item) => itemToString(item) === currentInput);

              if (!hasExactMatch) {
                const restoredInput =
                  state.selectedItem !== null
                    ? itemToString(state.selectedItem)
                    : '';

                return { ...changes, inputValue: restoredInput };
              }
            }

            return changes;

          case MenuMouseLeave:
            return { ...changes, highlightedIndex: state.highlightedIndex };

          case InputKeyDownArrowUp:
          case InputKeyDownArrowDown:
            if (highlightedIndex === -1) {
              return {
                ...changes,
                highlightedIndex: 0,
              };
            }
            return changes;

          case ItemMouseMove:
            return { ...changes, highlightedIndex: state.highlightedIndex };

          default:
            return changes;
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [allowCustomValue, inputValue, itemToString, items, onChange]
    );

    const handleToggleClick =
      (isOpen: boolean) =>
      (
        event: MouseEvent<HTMLButtonElement> & {
          preventDownshiftDefault: boolean;
        }
      ) => {
        if (onToggleClick) {
          onToggleClick(event);
        }
        if (readOnly) {
          // Prevent the list from opening if readOnly is true
          event.preventDownshiftDefault = true;
          event?.persist?.();
          return;
        }

        if (event.target === textInput.current && isOpen) {
          event.preventDownshiftDefault = true;
          event?.persist?.();
        }
      };

    const showWarning = !invalid && warn;
    const className = cx(`${prefix}--combo-box`, {
      [`${prefix}--combo-box--invalid--focused`]: invalid && isFocused,
      [`${prefix}--list-box--up`]: direction === 'top',
      [`${prefix}--combo-box--warning`]: showWarning,
      [`${prefix}--combo-box--readonly`]: readOnly,
      [`${prefix}--autoalign`]: enableFloatingStyles,
    });

    const titleClasses = cx(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: disabled,
    });
    const helperTextId = `combobox-helper-text-${comboBoxInstanceId}`;
    const warnTextId = `combobox-warn-text-${comboBoxInstanceId}`;
    const invalidTextId = `combobox-invalid-text-${comboBoxInstanceId}`;
    const helperClasses = cx(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });
    const wrapperClasses = cx(`${prefix}--list-box__wrapper`, [
      containerClassName,
      {
        [`${prefix}--list-box__wrapper--fluid--invalid`]: isFluid && invalid,
        [`${prefix}--list-box__wrapper--slug`]: slug,
        [`${prefix}--list-box__wrapper--decorator`]: decorator,
      },
    ]);

    const inputClasses = cx(`${prefix}--text-input`, {
      [`${prefix}--text-input--empty`]: !inputValue,
      [`${prefix}--combo-box--input--focus`]: isFocused,
    });

    // needs to be Capitalized for react to render it correctly
    const ItemToElement = itemToElement;

    // AILabel always size `mini`
    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator = candidateIsAILabel
      ? cloneElement(candidate, { size: 'mini' })
      : candidate;

    const {
      // Prop getters
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      getToggleButtonProps,

      // State
      isOpen,
      highlightedIndex,
      selectedItem,

      // Actions
      closeMenu,
      openMenu,
      reset,
      selectItem,
      setHighlightedIndex,
      setInputValue: downshiftSetInputValue,
      toggleMenu,
    } = useCombobox({
      items: filterItems(items, itemToString, inputValue),
      inputValue: inputValue,
      itemToString: (item) => {
        return itemToString(item);
      },
      onInputValueChange({ inputValue }) {
        const normalizedInput = inputValue || '';
        setInputValue(normalizedInput);
        setHighlightedIndex(indexToHighlight(normalizedInput));
      },
      onHighlightedIndexChange: ({ highlightedIndex }) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion , valid-typeof , no-constant-binary-expression -- https://github.com/carbon-design-system/carbon/issues/20452
        if (highlightedIndex! > -1 && typeof window !== undefined) {
          const itemArray = document.querySelectorAll(
            `li.${prefix}--list-box__menu-item[role="option"]`
          );
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
          const highlightedItem = itemArray[highlightedIndex!];
          if (highlightedItem) {
            highlightedItem.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
            });
          }
        }
      },
      initialSelectedItem: initialSelectedItem,
      inputId: id,
      stateReducer,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
      isItemDisabled(item, _index) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        return (item as any)?.disabled;
      },
      ...downshiftProps,
      onStateChange: ({ type, selectedItem: newSelectedItem }) => {
        downshiftProps?.onStateChange?.({
          type,
          selectedItem: newSelectedItem,
        });
        if (isManualClearingRef.current) {
          return;
        }
        if (
          (type === ItemClick ||
            type === FunctionSelectItem ||
            type === InputKeyDownEnter) &&
          typeof newSelectedItem !== 'undefined' &&
          !isEqual(selectedItemProp, newSelectedItem)
        ) {
          onChange({ selectedItem: newSelectedItem });
        }
      },
    });

    // Keep the dropdown highlight in sync with either the controlled value or
    // Downshift's own selection when uncontrolled.
    const menuSelectedItem =
      typeof selectedItemProp !== 'undefined' ? selectedItemProp : selectedItem;

    useEffect(() => {
      // Used to expose the downshift actions to consumers for use with downshiftProps
      // An odd pattern, here we mutate the value stored in the ref provided from the consumer.
      // A riff of https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509
      if (downshiftActions) {
        downshiftActions.current = {
          closeMenu,
          openMenu,
          reset,
          selectItem,
          setHighlightedIndex,
          setInputValue: downshiftSetInputValue,
          toggleMenu,
        };
      }
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
    }, [
      closeMenu,
      openMenu,
      reset,
      selectItem,
      setHighlightedIndex,
      downshiftSetInputValue,
      toggleMenu,
    ]);

    const buttonProps = getToggleButtonProps({
      disabled: disabled || readOnly,
      onClick: handleToggleClick(isOpen),
      // When we moved the "root node" of Downshift to the <input> for
      // ARIA 1.2 compliance, we unfortunately hit this branch for the
      // "mouseup" event that downshift listens to:
      // https://github.com/downshift-js/downshift/blob/v5.2.1/src/downshift.js#L1051-L1065
      //
      // As a result, it will reset the state of the component and so we
      // stop the event from propagating to prevent this if the menu is already open.
      // This allows the toggleMenu behavior for the toggleButton to correctly open and
      // close the menu.
      onMouseUp(event) {
        if (isOpen) {
          event.stopPropagation();
        }
      },
    });

    const handleFocus = (evt: FocusEvent<HTMLDivElement>) => {
      setIsFocused(evt.type === 'focus');
      if (!inputRef.current?.value && evt.type === 'blur') {
        selectItem(null);
      }
    };

    const readOnlyEventHandlers = readOnly
      ? {
          onKeyDown: (evt: KeyboardEvent<HTMLInputElement>) => {
            // This prevents the select from opening for the above keys
            if (evt.key !== 'Tab') {
              evt.preventDefault();
            }
          },
          onClick: (evt: MouseEvent<HTMLInputElement>) => {
            // Prevent the default behavior which would open the list
            evt.preventDefault();
            // Focus on the element as per readonly input behavior
            evt.currentTarget.focus();
          },
        }
      : {};

    // The input should be described by the appropriate message text id
    // when both the message is supplied *and* when the component is in
    // the matching state (invalid, warn, etc).
    const ariaDescribedBy =
      (invalid && invalidText && invalidTextId) ||
      (warn && warnText && warnTextId) ||
      (helperText && !isFluid && helperTextId) ||
      undefined;

    // Memoize the value of getMenuProps to avoid an infinite loop
    const menuProps = useMemo(
      () =>
        getMenuProps({
          ref: enableFloatingStyles ? refs.setFloating : null,
        }),
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
      [
        enableFloatingStyles,
        deprecatedAriaLabel,
        ariaLabel,
        getMenuProps,
        refs.setFloating,
      ]
    );

    useEffect(() => {
      if (textInput.current) {
        if (inputRef.current && typeaheadText) {
          const selectionStart = inputValue.length;
          const selectionEnd = selectionStart + typeaheadText.length;

          inputRef.current.value = inputValue + typeaheadText;
          inputRef.current.setSelectionRange(selectionStart, selectionEnd);
        }
      }
    }, [inputValue, typeaheadText]);
    return (
      <div className={wrapperClasses}>
        {titleText && (
          <Text as="label" className={titleClasses} {...getLabelProps()}>
            {titleText}
          </Text>
        )}
        <ListBox
          onFocus={handleFocus}
          onBlur={handleFocus}
          className={className}
          disabled={disabled}
          invalid={invalid}
          invalidText={invalidText}
          invalidTextId={invalidTextId}
          isOpen={isOpen}
          light={light}
          size={size}
          warn={warn}
          ref={enableFloatingStyles ? refs.setReference : null}
          warnText={warnText}
          warnTextId={warnTextId}>
          <div className={`${prefix}--list-box__field`}>
            <input
              disabled={disabled}
              className={inputClasses}
              type="text"
              tabIndex={0}
              aria-haspopup="listbox"
              title={textInput?.current?.value}
              {...getInputProps({
                'aria-label': titleText
                  ? undefined
                  : deprecatedAriaLabel || ariaLabel,
                'aria-controls': menuProps.id,
                placeholder,
                value: inputValue,
                ...inputProps,
                onChange: (e) => {
                  const newValue = e.target.value;
                  setInputValue(newValue);
                  downshiftSetInputValue(newValue);
                },
                ref: mergeRefs(textInput, ref, inputRef),
                onKeyDown: (
                  event: KeyboardEvent<HTMLInputElement> & {
                    preventDownshiftDefault: boolean;
                    target: {
                      value: string;
                      setSelectionRange: (start: number, end: number) => void;
                    };
                  }
                ): void => {
                  if (match(event, keys.Space)) {
                    event.stopPropagation();
                  }
                  if (
                    match(event, keys.Enter) &&
                    (!inputValue || allowCustomValue)
                  ) {
                    toggleMenu();

                    if (highlightedIndex !== -1) {
                      selectItem(
                        filterItems(items, itemToString, inputValue)[
                          highlightedIndex
                        ]
                      );
                    }

                    // Since `onChange` does not normally fire when the menu is closed, we should
                    // manually fire it when `allowCustomValue` is provided, the menu is closing,
                    // and there is a value.
                    if (
                      allowCustomValue &&
                      isOpen &&
                      inputValue &&
                      highlightedIndex === -1
                    ) {
                      onChange({ selectedItem: null, inputValue });
                    }

                    event.preventDownshiftDefault = true;
                    event?.persist?.();
                  }

                  if (match(event, keys.Escape) && inputValue) {
                    if (event.target === textInput.current && isOpen) {
                      toggleMenu();
                      event.preventDownshiftDefault = true;
                      event?.persist?.();
                    }
                  }

                  if (match(event, keys.Home) && event.code !== 'Numpad7') {
                    event.target.setSelectionRange(0, 0);
                  }

                  if (match(event, keys.End) && event.code !== 'Numpad1') {
                    event.target.setSelectionRange(
                      event.target.value.length,
                      event.target.value.length
                    );
                  }

                  if (event.altKey && event.key == 'ArrowDown') {
                    event.preventDownshiftDefault = true;
                    if (!isOpen) {
                      toggleMenu();
                    }
                  }
                  if (event.altKey && event.key == 'ArrowUp') {
                    event.preventDownshiftDefault = true;
                    if (isOpen) {
                      toggleMenu();
                    }
                  }
                  if (
                    !inputValue &&
                    highlightedIndex == -1 &&
                    event.key == 'Enter'
                  ) {
                    if (!isOpen) toggleMenu();
                    selectItem(null);
                    event.preventDownshiftDefault = true;
                    if (event.currentTarget.ariaExpanded === 'false')
                      openMenu();
                  }
                  if (typeahead && event.key === 'Tab') {
                    //  event.preventDefault();
                    const matchingItem = items.find((item) =>
                      itemToString(item)
                        .toLowerCase()
                        .startsWith(inputValue.toLowerCase())
                    );
                    if (matchingItem) {
                      const newValue = itemToString(matchingItem);
                      downshiftSetInputValue(newValue);
                      selectItem(matchingItem);
                    }
                  }
                },
              })}
              {...rest}
              {...readOnlyEventHandlers}
              readOnly={readOnly}
              aria-describedby={ariaDescribedBy}
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
                clearSelection={() => {
                  setIsClearing(true); // This updates the state which syncs to the ref
                  setInputValue('');
                  onChange({ selectedItem: null });
                  selectItem(null);
                  handleSelectionClear();
                }}
                translateWithId={translateWithId}
                disabled={disabled || readOnly}
                onClearSelection={handleSelectionClear}
                selectionCount={0}
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
              {/* wrap only when NOT an AILabel */}
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
              ? filterItems(items, itemToString, inputValue).map(
                  (item, index) => {
                    const isObject = item !== null && typeof item === 'object';
                    const title =
                      isObject && 'text' in item && itemToElement
                        ? item.text?.toString()
                        : itemToString(item);
                    const itemProps = getItemProps({
                      item,
                      index,
                    });

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
                        isActive={isEqual(menuSelectedItem, item)}
                        isHighlighted={highlightedIndex === index}
                        title={title}
                        disabled={disabled}
                        {...modifiedItemProps}>
                        {ItemToElement ? (
                          <ItemToElement key={itemProps.id} {...item} />
                        ) : (
                          itemToString(item)
                        )}
                        {isEqual(menuSelectedItem, item) && (
                          <Checkmark
                            className={`${prefix}--list-box__menu-item__selected-icon`}
                          />
                        )}
                      </ListBox.MenuItem>
                    );
                  }
                )
              : null}
          </ListBox.Menu>
        </ListBox>
        {helperText && !invalid && !warn && !isFluid && (
          <Text as="div" id={helperTextId} className={helperClasses}>
            {helperText}
          </Text>
        )}
      </div>
    );
  }
);

ComboBox.displayName = 'ComboBox';
ComboBox.propTypes = {
  /**
   * Specify whether or not the ComboBox should allow a value that is
   * not in the list to be entered in the input
   */
  allowCustomValue: PropTypes.bool,

  /**
   * 'aria-label' of the ListBox component.
   * Specify a label to be read by screen readers on the container node
   */
  ['aria-label']: PropTypes.string,

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify a label to be read by screen readers on the container note.
   * 'aria-label' of the ListBox component.
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'This prop syntax has been deprecated. Please use the new `aria-label`.'
  ),
  /**
   * **Experimental**: Will attempt to automatically align the floating
   * element to avoid collisions with the viewport and being clipped by
   * ancestor elements. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: PropTypes.bool,

  /**
   * An optional className to add to the container node
   */
  className: PropTypes.string,

  /**
   * **Experimental**: Provide a decorator component to be rendered inside the `ComboBox` component
   */
  decorator: PropTypes.node,

  /**
   * Specify the direction of the combobox dropdown. Can be either top or bottom.
   */
  direction: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Specify if the control should be disabled, or not
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
    UseComboboxProps<unknown>
  >,

  /**
   * Provide a ref that will be mutated to contain an object of downshift
   * action functions. These can be called to change the internal state of the
   * downshift useCombobox hook.
   *
   * **Use with caution:** calling these actions modifies the internal state of
   * downshift. It may conflict with or override the state management used within
   * Combobox. Downshift APIs and internals are subject to change, and in some
   * cases they can not be shimmed by Carbon to shield you from potentially breaking
   * changes.
   */
  downshiftActions: PropTypes.exact({ current: PropTypes.any }),

  /**
   * Provide helper text that is used alongside the control label for
   * additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify a custom `id` for the input
   */
  id: PropTypes.string.isRequired,

  /**
   * Allow users to pass in an arbitrary item or a string (in case their items are an array of strings)
   * from their collection that are pre-selected
   */
  initialSelectedItem: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Specify if the currently selected value is invalid.
   */
  invalid: PropTypes.bool,

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText: PropTypes.node,

  /**
   * Optional function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement: PropTypes.func,

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list
   */
  itemToString: PropTypes.func,

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: PropTypes.array.isRequired,

  /**
   * should use "light theme" (white background)?
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `Combobox` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component when a specific dropdown item is selected.
   * `({ selectedItem }) => void`
   * @param {{ selectedItem }}
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Callback function to notify consumer when the text input changes.
   * This provides support to change available items based on the text.
   * `(inputText) => void`
   * @param {string} inputText
   */
  onInputChange: PropTypes.func,

  /**
   * Callback function that fires when the combobox menu toggle is clicked
   * `(evt) => void`
   * @param {MouseEvent} event
   */
  onToggleClick: PropTypes.func,

  /**
   * Used to provide a placeholder text node before a user enters any input.
   * This is only present if the control has no items selected
   */
  placeholder: PropTypes.string,

  /**
   * Is the ComboBox readonly?
   */
  readOnly: PropTypes.bool,

  /**
   * For full control of the selection
   */
  selectedItem: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Specify your own filtering logic by passing in a `shouldFilterItem`
   * function that takes in the current input and an item and passes back
   * whether or not the item should be filtered.
   * this prop will be ignored if `typeahead` prop is enabled
   */
  shouldFilterItem: PropTypes.func,

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size: ListBoxSizePropType,

  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * combobox via ARIA attributes.
   */
  titleText: PropTypes.node,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,

  /**
   * **Experimental**: will enable autocomplete and typeahead for the input field
   */
  typeahead: PropTypes.bool,

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

type ComboboxComponentProps<ItemType> = PropsWithRef<
  PropsWithChildren<ComboBoxProps<ItemType>> & RefAttributes<HTMLInputElement>
>;

export interface ComboBoxComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  <ItemType>(props: ComboboxComponentProps<ItemType>): ReactElement<any> | null;
}

export default ComboBox as ComboBoxComponent;



File: ComboBox/Combobox.DynamicStyles.featureflag.mdx


import { Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as ComboBoxFeatureflagStories from './ComboBox.featureflag.stories.js';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta title="Components/ComboBox/Feature Flag" name="Flag details" />

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
  <ComboBox
    onChange={() => {}}
    id="carbon-combobox"
    items={comboBoxItems}
    itemToString={(item) => (item ? item.text : '')}
    titleText="Label"
    helperText="Helper text"
    {...args}
  />
</FeatureFlags>
```

<Canvas
  of={ComboBoxFeatureflagStories.FloatingStyles}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(ComboBoxFeatureflagStories.FloatingStyles),
    },
  ]}
/>



File: ComboBox/ComboBox.featureflag.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ComboBox } from '../ComboBox';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

export default {
  title: 'Components/ComboBox/Feature Flag',
  component: ComboBox,
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags
        flags={{
          'enable-v12-dynamic-floating-styles': true,
        }}>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

export const FloatingStyles = (args) => {
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
      text: 'Option 3',
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
  return (
    <div style={{ width: 300 }}>
      <ComboBox
        onChange={() => {}}
        id="carbon-combobox"
        items={comboBoxItems}
        itemToString={(item) => (item ? item.text : '')}
        titleText="Label"
        helperText="Helper text"
        invalidText="Error message goes here"
        warnText="Warning message goes here"
        {...args}
      />
    </div>
  );
};

FloatingStyles.args = {
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



File: ComboBox/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ComboBox from './ComboBox';
export default ComboBox;
export { ComboBox };



File: ComboBox/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  tall
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-combobox--default'
    },
    {
      label: 'Fluid (unstable)',
      variant: 'experimental-unstable-fluidcombobox--default'
    },
    {
      label: 'Fluid Condensed (unstable)',
      variant: 'experimental-unstable-fluidcombobox--condensed'
    }
  ]}
/>



File: ComboBox/ComboBox-test.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { render, screen, within, fireEvent, act } from '@testing-library/react';
import { useCombobox } from 'downshift';
import userEvent from '@testing-library/user-event';
import {
  findListBoxNode,
  assertMenuOpen,
  assertMenuClosed,
  generateItems,
  generateGenericItem,
  cognateItems,
  waitForPosition,
  findMenuItemNode,
} from '../ListBox/test-helpers';
import ComboBox from '../ComboBox';
import { AILabel } from '../AILabel';

const findInputNode = () => screen.getByRole('combobox');
const openMenu = async () => {
  await userEvent.click(screen.getByRole('combobox'));
};

const prefix = 'cds';

const ControlledComboBox = ({ controlledItem }) => {
  const items = generateItems(5, generateGenericItem);
  const [value, setValue] = useState(
    typeof controlledItem !== 'undefined' ? controlledItem : items[0]
  );
  const [onChangeCallCount, setOnChangeCallCount] = useState(0);
  const [onInputChangeCallCount, setOnInputChangeCallCount] = useState(0);
  const controlledOnChange = ({ selectedItem }) => {
    setValue(selectedItem);
    setOnChangeCallCount((prevCount) => prevCount + 1);
  };
  const controlledOnInputChange = () => {
    setOnInputChangeCallCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <ComboBox
        id="test-combobox"
        items={items}
        selectedItem={value}
        onChange={controlledOnChange}
        onInputChange={controlledOnInputChange}
        placeholder="Filter..."
        type="default"
      />
      <div data-testid="selected-item">{value?.label || 'none'}</div>
      <div>onChangeCallCount: {onChangeCallCount}</div>
      <div>onInputChangeCallCount: {onInputChangeCallCount}</div>
      <button onClick={() => setValue(items[3])}>Choose item 3</button>
      <button onClick={() => setValue(null)}>reset</button>
    </div>
  );
};

describe('ComboBox', () => {
  let mockProps;
  window.HTMLElement.prototype.scrollIntoView = function () {};
  beforeEach(() => {
    mockProps = {
      id: 'test-combobox',
      items: generateItems(5, generateGenericItem),
      onChange: jest.fn(),
      placeholder: 'Filter...',
      type: 'default',
    };
  });

  it('should display the menu of items when a user clicks on the input', async () => {
    render(<ComboBox {...mockProps} />);

    await userEvent.click(findInputNode());

    assertMenuOpen(mockProps);
  });

  it('should call `onChange` each time an item is selected', async () => {
    render(<ComboBox {...mockProps} />);
    expect(mockProps.onChange).not.toHaveBeenCalled();

    for (let i = 0; i < mockProps.items.length; i++) {
      await openMenu();

      await userEvent.click(screen.getAllByRole('option')[i]);

      expect(mockProps.onChange).toHaveBeenCalledTimes(i + 1);
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItem: mockProps.items[i],
      });
    }
  });

  it('should call `onChange` when selection is cleared', async () => {
    render(<ComboBox {...mockProps} />);
    expect(mockProps.onChange).not.toHaveBeenCalled();
    await openMenu();
    await userEvent.click(screen.getAllByRole('option')[0]);
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    await userEvent.click(
      screen.getByRole('button', { name: 'Clear selected item' })
    );
    expect(mockProps.onChange).toHaveBeenCalledTimes(2);
  });

  it('should call `onChange` with the proper item when `shouldFilterItem` is provided', async () => {
    const filterItems = (menu) => {
      return menu?.item?.label
        ?.toLowerCase()
        .includes(menu?.inputValue?.toLowerCase());
    };
    const onInputChange = jest.fn();

    render(
      <ComboBox
        {...mockProps}
        shouldFilterItem={filterItems}
        onInputChange={onInputChange}
      />
    );

    await userEvent.type(findInputNode(), 'Item 2');
    expect(onInputChange).toHaveBeenCalledWith('Item 2');

    await userEvent.click(screen.getAllByRole('option')[0]);
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: mockProps.items[2],
    });
  });

  it('should display titleText', () => {
    render(<ComboBox {...mockProps} titleText="Combobox title" />);

    expect(screen.getByText('Combobox title')).toBeInTheDocument();
  });

  it('should confirm custom aria-label is on the input', () => {
    render(<ComboBox {...mockProps} aria-label="custom aria-label" />);

    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-label',
      'custom aria-label'
    );
  });

  it('should select the correct item from the filtered list after text input on click', async () => {
    const user = userEvent.setup();

    render(<ComboBox {...mockProps} items={cognateItems} />);

    await user.type(findInputNode(), 'struct');

    await user.click(screen.getAllByRole('option')[1]);

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: {
        id: 'construct',
        text: 'Construct',
      },
    });
  });

  it('should select the correct item from the filtered list after text input on [Enter]', async () => {
    const user = userEvent.setup();

    render(<ComboBox {...mockProps} items={cognateItems} />);

    await user.type(findInputNode(), 'struct');

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('[Enter]');

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: {
        id: 'construct',
        text: 'Construct',
      },
    });
  });

  describe('onInputChange', () => {
    let onInputChange;
    beforeEach(() => {
      onInputChange = jest.fn();
    });
    it('should not call onChange or onInputChange on initial render', () => {
      render(<ComboBox {...mockProps} onInputChange={onInputChange} />);
      expect(onInputChange).not.toHaveBeenCalled();
      expect(mockProps.onChange).not.toHaveBeenCalled();
    });

    it('capture filter text event onInputChange', async () => {
      render(<ComboBox {...mockProps} onInputChange={onInputChange} />);
      await userEvent.type(findInputNode(), 'something');
      expect(onInputChange).toHaveBeenCalledWith('something');
    });

    it('should call onInputChange when option is selected from dropdown', async () => {
      render(<ComboBox {...mockProps} onInputChange={onInputChange} />);
      await openMenu();
      expect(onInputChange).not.toHaveBeenCalled();
      await userEvent.click(screen.getByRole('option', { name: 'Item 2' }));
      expect(onInputChange).toHaveBeenCalledWith('Item 2');
    });

    it('should call onInputChange when option is cleared with button', async () => {
      render(
        <ComboBox
          {...mockProps}
          initialSelectedItem={mockProps.items[0]}
          onInputChange={onInputChange}
        />
      );
      expect(onInputChange).not.toHaveBeenCalled();
      await userEvent.click(
        screen.getByRole('button', { name: 'Clear selected item' })
      );
      expect(onInputChange).toHaveBeenCalledWith('');
    });

    it('should not call onInputChange when combobox is interacted with but input value does not change', async () => {
      render(
        <ComboBox
          {...mockProps}
          initialSelectedItem={mockProps.items[0]}
          onInputChange={onInputChange}
        />
      );
      expect(onInputChange).not.toHaveBeenCalled();
      await openMenu();
      await userEvent.click(screen.getByRole('option', { name: 'Item 0' }));
      expect(onInputChange).not.toHaveBeenCalled();
    });

    it('should call onInputChange when custom value is entered into combobox', async () => {
      render(
        <ComboBox
          {...mockProps}
          initialSelectedItem={mockProps.items[0]}
          onInputChange={onInputChange}
        />
      );
      await userEvent.clear(findInputNode());
      expect(onInputChange).toHaveBeenCalledWith('');
      await userEvent.type(findInputNode(), 'custom value');
      await userEvent.keyboard('[Enter]');
      expect(onInputChange).toHaveBeenCalledWith('custom value');
    });
  });

  it('should render custom item components', async () => {
    const itemToElement = jest.fn((item) => {
      return <div className="mock-item">{item.text}</div>;
    });
    render(<ComboBox {...mockProps} itemToElement={itemToElement} />);
    await openMenu();

    expect(itemToElement).toHaveBeenCalled();
  });

  it('should let the user select an option by clicking on the option node', async () => {
    render(<ComboBox {...mockProps} />);
    await openMenu();

    await userEvent.click(screen.getAllByRole('option')[0]);

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: mockProps.items[0],
    });
    assertMenuClosed();

    mockProps.onChange.mockClear();

    await openMenu();

    await userEvent.click(screen.getAllByRole('option')[1]);
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith({
      selectedItem: mockProps.items[1],
    });
    expect(screen.getByRole('combobox')).toHaveDisplayValue('Item 1');
  });

  it('should not let the user select an option by clicking on the disabled option node', async () => {
    mockProps.items[2].disabled = true;

    render(<ComboBox {...mockProps} />);
    await openMenu();

    await userEvent.click(screen.getAllByRole('option')[2]);

    expect(mockProps.onChange).not.toHaveBeenCalled();
  });

  it('should not select the disabled option if user type in input and press enter', async () => {
    mockProps.items[2].disabled = true;

    render(<ComboBox {...mockProps} />);
    await userEvent.type(findInputNode(), 'Item 2');
    await userEvent.keyboard('[Enter]');

    expect(mockProps.onChange).not.toHaveBeenCalled();
    //it should not close the menu if matching element not found and enter is pressed.
    expect(findListBoxNode()).toHaveClass(`${prefix}--list-box--expanded`);
  });

  it('should retain value if custom value is entered and `allowCustomValue` is set', async () => {
    render(<ComboBox {...mockProps} allowCustomValue />);

    expect(findInputNode()).toHaveDisplayValue('');

    await userEvent.type(findInputNode(), 'Apple');
    // Should close menu and keep value in input, even though it is not in the item list
    await userEvent.keyboard('[Enter]');
    assertMenuClosed();
    expect(findInputNode()).toHaveDisplayValue('Apple');
    // Should retain value on blur
    await userEvent.keyboard('[Tab]');
    expect(findInputNode()).toHaveDisplayValue('Apple');
  });

  it('should handle InputBlur with allowCustomValue', async () => {
    render(<ComboBox {...mockProps} allowCustomValue />);
    await userEvent.type(findInputNode(), 'Apple');
    fireEvent.blur(findInputNode());
    expect(findInputNode()).toHaveDisplayValue('Apple');
  });

  it('should apply onChange value if custom value is entered and `allowCustomValue` is set', async () => {
    render(<ComboBox {...mockProps} allowCustomValue />);

    expect(findInputNode()).toHaveDisplayValue('');

    await userEvent.type(findInputNode(), 'Apple');
    await userEvent.keyboard('[Enter]');
    assertMenuClosed();
    expect(mockProps.onChange).toHaveBeenCalledWith({
      inputValue: 'Apple',
      selectedItem: null,
    });
  });

  it('should respect slug prop', async () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(
      <ComboBox {...mockProps} slug={<AILabel />} />
    );
    await waitForPosition();
    expect(container.firstChild).toHaveClass(
      `${prefix}--list-box__wrapper--slug`
    );
    spy.mockRestore();
  });

  it('should respect decorator prop', async () => {
    const { container } = render(
      <ComboBox {...mockProps} decorator={<AILabel />} />
    );
    await waitForPosition();
    expect(container.firstChild).toHaveClass(
      `${prefix}--list-box__wrapper--decorator`
    );
  });

  it('should keep the selected item active after blur when allowCustomValue is set', async () => {
    const user = userEvent.setup();

    render(
      <>
        <ComboBox {...mockProps} allowCustomValue />
        <button type="button">Move focus</button>
      </>
    );

    await openMenu();
    await user.click(screen.getByRole('option', { name: 'Item 1' }));
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Move focus' }));

    await openMenu();
    const activeOption = screen.getByRole('option', { name: 'Item 1' });
    expect(activeOption).toHaveClass(`${prefix}--list-box__menu-item--active`);
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('should yield highlighted item as `selectedItem` when pressing Enter with an unmodified input value', async () => {
    render(<ControlledComboBox controlledItem={null} />);

    const input = findInputNode();

    expect(screen.getByTestId('selected-item').textContent).toBe('none');

    await userEvent.click(input);
    await userEvent.type(input, 'Item 1');
    await userEvent.keyboard('{Enter}');

    expect(screen.getByTestId('selected-item').textContent).toBe('Item 1');

    await userEvent.type(input, '{backspace}');
    await userEvent.type(input, '1');
    await userEvent.keyboard('{Enter}');

    expect(screen.getByTestId('selected-item').textContent).toBe('Item 1');
  });

  it('should yield highlighted item as `selectedItem` when pressing Enter with a modified input value', async () => {
    render(<ControlledComboBox controlledItem={null} />);
    const input = findInputNode();

    expect(screen.getByTestId('selected-item').textContent).toBe('none');

    await userEvent.click(input);
    await userEvent.type(input, 'Item 2');
    await userEvent.keyboard('{Enter}');

    expect(screen.getByTestId('selected-item').textContent).toBe('Item 2');

    await userEvent.type(input, '{backspace}');
    await userEvent.keyboard('{Enter}');

    expect(screen.getByTestId('selected-item').textContent).toBe('Item 0');
  });

  it('should restore selected item label on blur when input does not match any item and a selection exists', async () => {
    render(
      <ComboBox
        {...mockProps}
        initialSelectedItem={mockProps.items[1]}
        allowCustomValue={false}
      />
    );

    expect(findInputNode()).toHaveDisplayValue('Item 1');

    await userEvent.clear(findInputNode());
    await userEvent.type(findInputNode(), 'no-match');
    await userEvent.keyboard('[Tab]');

    expect(findInputNode()).toHaveDisplayValue('Item 1');
  });

  it('should keep exact match input on blur when it matches an item label', async () => {
    render(<ComboBox {...mockProps} allowCustomValue={false} />);

    await userEvent.type(findInputNode(), 'Item 2');
    await userEvent.keyboard('[Tab]');

    expect(findInputNode()).toHaveDisplayValue('Item 2');
  });

  describe('should display initially selected item found in `initialSelectedItem`', () => {
    it('using an object type for the `initialSelectedItem` prop', async () => {
      render(
        <ComboBox {...mockProps} initialSelectedItem={mockProps.items[0]} />
      );
      await waitForPosition();
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[0].label);
    });

    it('using a string type for the `initialSelectedItem` prop', async () => {
      // Replace the 'items' property in mockProps with a list of strings
      mockProps = {
        ...mockProps,
        items: ['1', '2', '3'],
      };

      render(
        <ComboBox {...mockProps} initialSelectedItem={mockProps.items[1]} />
      );
      await waitForPosition();
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[1]);
    });

    it('should not revert to `initialSelectedItem` after clearing selection in uncontrolled mode', async () => {
      // Render a non-fully controlled `ComboBox` using `initialSelectedItem`.
      render(
        <ComboBox {...mockProps} initialSelectedItem={mockProps.items[0]} />
      );
      await waitForPosition();
      // Verify that the input initially displays `initialSelectedItem`.
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[0].label);

      // Simulate clearing the selection by clicking the clear button.
      await userEvent.click(
        screen.getByRole('button', { name: 'Clear selected item' })
      );
      // After clearing, the input should be empty rather than reverting to
      // `initialSelectedItem`.
      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should ignore updates to `initialSelectedItem` after initial render in uncontrolled mode', async () => {
      // Render a non-fully controlled `ComboBox` using `initialSelectedItem`.
      const { rerender } = render(
        <ComboBox {...mockProps} initialSelectedItem={mockProps.items[0]} />
      );
      await waitForPosition();
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[0].label);

      // Rerender the component with a different `initialSelectedItem`.
      rerender(
        <ComboBox {...mockProps} initialSelectedItem={mockProps.items[2]} />
      );
      // The displayed value should still be the one from the first render.
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[0].label);
    });

    it('should mark the initially selectedItem on load when rendered', async () => {
      render(
        <ComboBox
          {...mockProps}
          initialSelectedItem={mockProps.items[0]}
          selectedItem={mockProps.items[0]}
        />
      );
      await openMenu();

      // Find the first menu item (which should be the initially selected item)
      const menuItems = screen.getAllByRole('option');
      const firstMenuItem = menuItems[0];

      // Check if the initially selected item has the active class
      expect(firstMenuItem).toHaveClass(
        `${prefix}--list-box__menu-item--active`
      );

      // Check if the initially selected item contains an SVG (checkmark icon)
      expect(firstMenuItem.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('provided `selectedItem`', () => {
    it('should display selected item using an object type for the `selectedItem` prop', async () => {
      render(<ComboBox {...mockProps} selectedItem={mockProps.items[0]} />);
      await waitForPosition();
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[0].label);
    });
    it('should not call onChange or onInputChange on initial render', () => {
      render(<ControlledComboBox />);
      expect(screen.getByText('onChangeCallCount: 0')).toBeInTheDocument();
      expect(screen.getByText('onInputChangeCallCount: 0')).toBeInTheDocument();
    });
    it('should call onInputChange when input changes', async () => {
      render(<ControlledComboBox />);
      await userEvent.type(findInputNode(), 'Item 2');
      expect(screen.getByText('onInputChangeCallCount: 6')).toBeInTheDocument();
    });
    it('should call onInputChange when external state managing selectedItem is updated', async () => {
      render(<ControlledComboBox />);
      await userEvent.click(
        screen.getByRole('button', { name: 'Choose item 3' })
      );
      expect(screen.getByText('onInputChangeCallCount: 1')).toBeInTheDocument();
    });
    it('should not call onChange or onInputChange when external state managing selectedItem is updated to same value', async () => {
      render(
        <ControlledComboBox
          controlledItem={{ id: 'id-3', label: 'Item 3', value: 3 }}
        />
      );
      await userEvent.click(
        screen.getByRole('button', { name: 'Choose item 3' })
      );
      expect(screen.getByText('onChangeCallCount: 0')).toBeInTheDocument();
      expect(screen.getByText('onInputChangeCallCount: 0')).toBeInTheDocument();
    });

    it('should display selected item using a string type for the `selectedItem` prop', async () => {
      // Replace the 'items' property in mockProps with a list of strings
      mockProps = {
        ...mockProps,
        items: ['1', '2', '3'],
      };

      render(<ComboBox {...mockProps} selectedItem={mockProps.items[1]} />);
      await waitForPosition();
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[1]);
    });
    it('should update and call `onChange` once when selection is updated from the combobox', async () => {
      render(<ComboBox {...mockProps} selectedItem={mockProps.items[0]} />);
      expect(mockProps.onChange).not.toHaveBeenCalled();
      await openMenu();
      await userEvent.click(screen.getByRole('option', { name: 'Item 2' }));
      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
      expect(
        screen.getByRole('combobox', { value: 'Item 2' })
      ).toBeInTheDocument();
    });
    it('should not call `onChange` when current selection is selected again', async () => {
      render(<ComboBox {...mockProps} selectedItem={mockProps.items[0]} />);
      expect(mockProps.onChange).not.toHaveBeenCalled();
      await openMenu();
      await userEvent.click(screen.getByRole('option', { name: 'Item 0' }));
      expect(mockProps.onChange).toHaveBeenCalledTimes(0);
      expect(
        screen.getByRole('combobox', { value: 'Item 0' })
      ).toBeInTheDocument();
    });
    it('should update and call `onChange` once when selection is updated from the combobox and the external state managing selectedItem is updated', async () => {
      render(<ControlledComboBox />);
      expect(screen.getByText('onChangeCallCount: 0')).toBeInTheDocument();
      await openMenu();
      await userEvent.click(screen.getByRole('option', { name: 'Item 2' }));
      expect(screen.getByText('onChangeCallCount: 1')).toBeInTheDocument();
      expect(screen.getByTestId('selected-item').textContent).toBe('Item 2');
      expect(
        screen.getByRole('combobox', { value: 'Item 2' })
      ).toBeInTheDocument();
    });
    it('should update and call `onChange` once when selection is cleared from the combobox and the external state managing selectedItem is updated', async () => {
      render(<ControlledComboBox />);
      expect(screen.getByText('onChangeCallCount: 0')).toBeInTheDocument();
      await openMenu();
      await userEvent.click(screen.getByRole('option', { name: 'Item 2' }));
      expect(screen.getByText('onChangeCallCount: 1')).toBeInTheDocument();
      await userEvent.click(
        screen.getByRole('button', { name: 'Clear selected item' })
      );
      expect(screen.getByText('onChangeCallCount: 2')).toBeInTheDocument();
      expect(screen.getByTestId('selected-item').textContent).toBe('none');
      expect(findInputNode()).toHaveDisplayValue('');
    });
    it('should update and call `onChange` once when selection is cleared from the combobox after an external update is made, and the external state managing selectedItem is updated', async () => {
      render(<ControlledComboBox />);
      expect(screen.getByText('onChangeCallCount: 0')).toBeInTheDocument();
      await openMenu();
      await userEvent.click(
        screen.getByRole('button', { name: 'Choose item 3' })
      );
      expect(screen.getByText('onChangeCallCount: 1')).toBeInTheDocument();
      await userEvent.click(
        screen.getByRole('button', { name: 'Clear selected item' })
      );
      expect(screen.getByText('onChangeCallCount: 2')).toBeInTheDocument();
      expect(screen.getByTestId('selected-item').textContent).toBe('none');
      expect(findInputNode()).toHaveDisplayValue('');
    });
    it('should update and call `onChange` when a combination of external and combobox selections are made', async () => {
      render(<ControlledComboBox />);
      expect(screen.getByText('onChangeCallCount: 0')).toBeInTheDocument();
      await userEvent.click(
        screen.getByRole('button', { name: 'Choose item 3' })
      );
      expect(screen.getByText('onChangeCallCount: 1')).toBeInTheDocument();
      expect(findInputNode()).toHaveDisplayValue('Item 3');
      expect(screen.getByTestId('selected-item').textContent).toBe('Item 3');
      await openMenu();
      await userEvent.click(screen.getByRole('option', { name: 'Item 2' }));
      expect(screen.getByText('onChangeCallCount: 2')).toBeInTheDocument();
      expect(findInputNode()).toHaveDisplayValue('Item 2');
      expect(screen.getByTestId('selected-item').textContent).toBe('Item 2');
      await userEvent.click(
        screen.getByRole('button', { name: 'Clear selected item' })
      );
      expect(screen.getByText('onChangeCallCount: 3')).toBeInTheDocument();
      expect(screen.getByTestId('selected-item').textContent).toBe('none');
      expect(findInputNode()).toHaveDisplayValue('');
    });
    it('should sync the menu active item when `selectedItem` updates externally', async () => {
      render(<ControlledComboBox />);
      await openMenu();
      let menuItems = screen.getAllByRole('option');
      expect(menuItems[0]).toHaveClass(
        `${prefix}--list-box__menu-item--active`
      );

      await userEvent.keyboard('{Escape}');
      await userEvent.click(
        screen.getByRole('button', { name: 'Choose item 3' })
      );

      await openMenu();
      menuItems = screen.getAllByRole('option');
      expect(menuItems[3]).toHaveClass(
        `${prefix}--list-box__menu-item--active`
      );
      expect(menuItems[0]).not.toHaveClass(
        `${prefix}--list-box__menu-item--active`
      );
    });
    it('should update and call `onChange` once when selection is updated externally', async () => {
      const { rerender } = render(
        <ComboBox {...mockProps} selectedItem={mockProps.items[0]} />
      );
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[0].label);
      rerender(<ComboBox {...mockProps} selectedItem={mockProps.items[1]} />);
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[1].label);
      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    });
    it('should clear selected item and call `onChange` when selection is cleared externally', async () => {
      render(<ControlledComboBox />);
      expect(screen.getByText('onChangeCallCount: 0')).toBeInTheDocument();
      await openMenu();
      await userEvent.click(screen.getByRole('option', { name: 'Item 2' }));
      await userEvent.click(screen.getByRole('button', { name: 'reset' }));
      expect(screen.getByText('onChangeCallCount: 2')).toBeInTheDocument();
      expect(screen.getByTestId('selected-item').textContent).toBe('none');
      expect(findInputNode()).toHaveDisplayValue('');
    });
    it('should clear selected item when `selectedItem` is updated to `null` externally', async () => {
      const { rerender } = render(
        <ComboBox {...mockProps} selectedItem={mockProps.items[1]} />
      );
      await waitForPosition();
      expect(findInputNode()).toHaveDisplayValue(mockProps.items[1].label);
      rerender(<ComboBox {...mockProps} selectedItem={null} />);
      await waitForPosition();
      expect(findInputNode()).toHaveDisplayValue('');
      expect(mockProps.onChange).toHaveBeenCalled();
    });
    it('should call onChange when downshiftProps onStateChange is provided', async () => {
      const downshiftProps = {
        onStateChange: jest.fn(),
      };
      render(
        <ComboBox
          {...mockProps}
          selectedItem={mockProps.items[0]}
          downshiftProps={downshiftProps}
        />
      );
      expect(mockProps.onChange).not.toHaveBeenCalled();
      expect(downshiftProps.onStateChange).not.toHaveBeenCalled();
      await openMenu();
      expect(downshiftProps.onStateChange).toHaveBeenCalledTimes(1);
      await userEvent.click(screen.getByRole('option', { name: 'Item 2' }));
      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
      expect(downshiftProps.onStateChange).toHaveBeenCalledTimes(3);
      expect(downshiftProps.onStateChange).toHaveBeenNthCalledWith(2, {
        selectedItem: {
          id: 'id-2',
          label: 'Item 2',
          value: 2,
        },
        type: useCombobox.stateChangeTypes.ItemClick,
      });
      expect(downshiftProps.onStateChange).toHaveBeenLastCalledWith({
        selectedItem: undefined,
        type: useCombobox.stateChangeTypes.FunctionSetHighlightedIndex,
      });
      expect(
        screen.getByRole('combobox', { value: 'Item 2' })
      ).toBeInTheDocument();
    });
  });

  describe('when disabled', () => {
    it('should not let the user edit the input node', async () => {
      render(<ComboBox {...mockProps} disabled={true} />);
      await waitForPosition();
      expect(findInputNode()).toHaveAttribute('disabled');

      expect(findInputNode()).toHaveDisplayValue('');

      await userEvent.type(findInputNode(), 'a');

      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should not let the user expand the menu', async () => {
      render(<ComboBox {...mockProps} disabled={true} />);
      await waitForPosition();
      await openMenu();
      expect(findListBoxNode()).not.toHaveClass(
        `${prefix}--list-box--expanded`
      );
    });
  });

  describe('when readonly', () => {
    it('should not let the user edit the input node', async () => {
      render(<ComboBox {...mockProps} readOnly={true} />);
      await waitForPosition();
      expect(findInputNode()).toHaveAttribute('readonly');

      expect(findInputNode()).toHaveDisplayValue('');

      await userEvent.type(findInputNode(), 'o');

      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should not let the user expand the menu', async () => {
      render(<ComboBox {...mockProps} disabled={true} />);
      await waitForPosition();
      await openMenu();
      expect(findListBoxNode()).not.toHaveClass(
        `${prefix}--list-box--expanded`
      );
    });
  });

  describe('downshift quirks', () => {
    it('should set `inputValue` to an empty string if a false-y value is given', async () => {
      render(<ComboBox {...mockProps} />);
      await waitForPosition();
      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should only render one listbox at a time when multiple comboboxes are present', async () => {
      render(
        <>
          <div data-testid="combobox-1">
            <ComboBox {...mockProps} id="combobox-1" />
          </div>
          <div data-testid="combobox-2">
            <ComboBox {...mockProps} id="combobox-2" />
          </div>
        </>
      );
      await waitForPosition();
      const firstCombobox = screen.getByTestId('combobox-1');
      const secondCombobox = screen.getByTestId('combobox-2');

      const firstComboboxChevron = within(firstCombobox).getByRole('button');
      const secondComboboxChevron = within(secondCombobox).getByRole('button');

      function firstListBox() {
        return within(firstCombobox).getByRole('listbox');
      }

      function secondListBox() {
        return within(secondCombobox).getByRole('listbox');
      }

      expect(firstListBox()).toBeEmptyDOMElement();
      expect(secondListBox()).toBeEmptyDOMElement();

      await userEvent.click(firstComboboxChevron);

      expect(firstListBox()).not.toBeEmptyDOMElement();
      expect(secondListBox()).toBeEmptyDOMElement();

      await userEvent.click(secondComboboxChevron);

      expect(firstListBox()).toBeEmptyDOMElement();
      expect(secondListBox()).not.toBeEmptyDOMElement();

      await userEvent.click(secondComboboxChevron);

      expect(firstListBox()).toBeEmptyDOMElement();
      expect(secondListBox()).toBeEmptyDOMElement();
    });
    it('should open menu without moving focus on pressing Alt+ DownArrow', async () => {
      render(<ComboBox {...mockProps} />);
      await waitForPosition();
      act(() => {
        screen.getByRole('combobox').focus();
      });
      await userEvent.keyboard('{Alt>}{ArrowDown}');
      assertMenuOpen(mockProps);
    });

    it('should close menu and return focus to combobox on pressing Alt+ UpArrow', async () => {
      render(<ComboBox {...mockProps} />);
      await waitForPosition();
      await openMenu();
      await userEvent.keyboard('{Alt>}{ArrowUp}');
      assertMenuClosed(mockProps);
    });
  });

  describe('Highlights', () => {
    it('should highlight the matched element', async () => {
      render(<ComboBox {...mockProps} allowCustomValue={false} />);
      await userEvent.type(findInputNode(), '1');
      expect(screen.getAllByRole('option')[1]).toHaveClass(
        'cds--list-box__menu-item'
      );
    });

    it('should highlight the selected element', async () => {
      render(<ComboBox {...mockProps} allowCustomValue={false} />);
      await openMenu();
      await userEvent.type(findInputNode(), 'Item 1');
      await userEvent.keyboard('[Enter]');
      await openMenu();
      expect(screen.getAllByRole('option')[1]).toHaveClass(
        'cds--list-box__menu-item--highlighted'
      );
    });

    it('should highlight the selected element if user enter some other value click outside of combobox', async () => {
      render(<ComboBox {...mockProps} allowCustomValue={false} />);
      await openMenu();
      await userEvent.type(findInputNode(), 'Item 1');
      await userEvent.keyboard('[Enter]');
      await openMenu();
      expect(screen.getAllByRole('option')[1]).toHaveClass(
        'cds--list-box__menu-item--highlighted'
      );

      await userEvent.clear(findInputNode());
      await userEvent.type(findInputNode(), 'Item');
      //should match the loosely match element
      expect(screen.getAllByRole('option')[0]).toHaveClass(
        'cds--list-box__menu-item--highlighted'
      );

      fireEvent.blur(findInputNode());
      await openMenu();
      // on blur, it should retain the selected value
      expect(findInputNode()).toHaveDisplayValue('Item 1');
      expect(screen.getAllByRole('option')[1]).toHaveClass(
        'cds--list-box__menu-item--highlighted'
      );
    });

    it('should clear input when closing with chevron if input does not match any item and allowCustomValue is false', async () => {
      render(<ComboBox {...mockProps} allowCustomValue={false} />);

      // First type something that doesn't match any item
      await userEvent.type(findInputNode(), 'xyz');

      // Menu should be open at this point
      assertMenuOpen(mockProps);

      // Click the chevron/toggle button to close
      await userEvent.click(screen.getByRole('button', { name: 'Close' }));

      // Menu should be closed
      assertMenuClosed();

      // Input should be cleared
      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should not clear input when opening then closing the menu without changes', async () => {
      render(
        <ComboBox {...mockProps} initialSelectedItem={mockProps.items[1]} />
      );

      expect(findInputNode()).toHaveDisplayValue('Item 1');

      await userEvent.click(screen.getByRole('button', { name: 'Open' }));
      assertMenuOpen(mockProps);

      await userEvent.click(screen.getByRole('button', { name: 'Close' }));
      assertMenuClosed(mockProps);

      expect(findInputNode()).toHaveDisplayValue('Item 1');
    });

    it('should clear input on blur when no item is selected and value does not match any item (`allowCustomValue` is `false`)', async () => {
      render(<ComboBox {...mockProps} allowCustomValue={false} />);

      await userEvent.type(findInputNode(), 'no-match-here');
      await userEvent.keyboard('[Tab]');

      expect(findInputNode()).toHaveDisplayValue('');
    });

    it('should pass defined selectedItem to onChange when item is selected', async () => {
      render(<ComboBox {...mockProps} />);

      expect(mockProps.onChange).not.toHaveBeenCalled();

      await openMenu();
      await userEvent.click(screen.getAllByRole('option')[0]);

      expect(mockProps.onChange).toHaveBeenCalledTimes(1);
      expect(mockProps.onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          selectedItem: expect.anything(),
        })
      );

      const call = mockProps.onChange.mock.calls[0][0];
      expect(call.selectedItem).toBeDefined();
      expect(call.selectedItem).toEqual(mockProps.items[0]);
    });

    it('should never pass undefined as selectedItem to onChange', async () => {
      render(<ComboBox {...mockProps} />);

      for (let i = 0; i < mockProps.items.length; i++) {
        await openMenu();
        await userEvent.click(screen.getAllByRole('option')[i]);

        const call = mockProps.onChange.mock.calls[i][0];
        expect(call.selectedItem).toBeDefined();
        expect(call.selectedItem).not.toBeUndefined();
        expect(call.selectedItem).toEqual(mockProps.items[i]);
      }
    });
    it('should clear selection if input does not match any item and there is already a selected item', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} />);

      // First select an item
      await openMenu();
      await user.click(screen.getAllByRole('option')[0]);

      expect(findInputNode()).toHaveDisplayValue('Item 0');
      expect(mockProps.onChange).toHaveBeenCalledWith({
        selectedItem: mockProps.items[0],
      });

      // Clear input and type something that doesn't match
      await user.clear(findInputNode());
      await user.type(findInputNode(), 'xyz');
      await user.keyboard('[Enter]');
      // Selection should be cleared

      expect(mockProps.onChange).toHaveBeenLastCalledWith({
        selectedItem: null,
      });

      expect(findInputNode()).toHaveDisplayValue('xyz');
    });

    it('should not clear selection if no item was previously selected', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} />);

      // Type something that doesn't match any item
      await user.type(findInputNode(), 'xyz');
      await user.keyboard('[Enter]');

      // No onChange should be called since there was no selection to clear
      expect(mockProps.onChange).not.toHaveBeenCalled();
      expect(findInputNode()).toHaveDisplayValue('xyz');
    });

    it('should keep selection when allowCustomValue is true even if input does not match', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} allowCustomValue />);

      // First select an item
      await openMenu();
      await user.click(screen.getAllByRole('option')[0]);
      expect(findInputNode()).toHaveDisplayValue('Item 0');

      // Type something that doesn't match
      await user.clear(findInputNode());
      await user.type(findInputNode(), 'xyz');
      await user.keyboard('[Enter]');

      // Selection should not be cleared with allowCustomValue
      expect(mockProps.onChange).toHaveBeenLastCalledWith({
        selectedItem: null,
        inputValue: 'xyz',
      });

      expect(findInputNode()).toHaveDisplayValue('xyz');
    });
  });

  describe('ComboBox autocomplete', () => {
    const items = [
      { id: 'option-1', text: 'Option 1' },
      { id: 'option-2', text: 'Option 2' },
      { id: 'option-3', text: 'Option 3' },
      { id: 'apple', text: 'Apple' },
      { id: 'banana', text: 'Banana' },
      { id: 'orange', text: 'Orange' },
      { id: 'orangeish', text: 'Orangeish' },
    ];

    const mockProps = {
      id: 'test-combobox',
      items,
      itemToString: (item) => (item ? item.text : ''),
      onChange: jest.fn(),
    };

    it('should respect autocomplete prop', async () => {
      render(<ComboBox {...mockProps} typeahead />);
      await waitForPosition();
      const inputNode = findInputNode();
      expect(inputNode).toHaveAttribute('autocomplete');
    });
    it('should use autocompleteCustomFilter when autocomplete prop is true', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} typeahead />);

      // Open the dropdown
      const input = screen.getByRole('combobox');
      user.click(input);

      // Type 'op' which should match all options
      await user.type(input, 'op');
      expect(screen.getAllByRole('option')).toHaveLength(3);

      // Type 'opt' which should still match all options
      await user.type(input, 't');
      expect(screen.getAllByRole('option')).toHaveLength(3);

      // Type 'opti' which should match only 'Option 1'
      await user.type(input, 'i');
      expect(screen.getAllByRole('option')).toHaveLength(3);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should use default filter when autocomplete prop is false', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} />);

      // Open the dropdown
      const input = screen.getByRole('combobox');
      user.click(input);

      // Type 'op' which should match all options
      await user.type(input, 'op');
      expect(screen.getAllByRole('option')).toHaveLength(7);

      // Type 'opt' which should still match all options
      await user.type(input, 't');
      expect(screen.getAllByRole('option')).toHaveLength(7);

      // Type 'opti' which should still match all options
      await user.type(input, 'i');
      expect(screen.getAllByRole('option')).toHaveLength(7);

      // Type 'option' which should still match all options
      await user.type(input, 'on');
      expect(screen.getAllByRole('option')).toHaveLength(7);
    });

    it('should not autocomplete when no match is found', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} typeahead />);

      const input = screen.getByRole('combobox');
      user.click(input);

      await user.type(input, 'xyz');
      await user.keyboard('[Tab]');

      expect(document.activeElement).not.toBe(input);
    });
    it('should suggest best matching typeahead suggestion and complete it in Tab key press', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} typeahead />);

      // Open the dropdown
      const input = screen.getByRole('combobox');
      user.click(input);

      // Type 'op' which should match all options
      await user.type(input, 'Ap');

      await user.keyboard('[Tab]');

      expect(findInputNode()).toHaveDisplayValue('Apple');
    });
    it('should not autocomplete on Tab after backspace', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} allowCustomValue typeahead />);

      const input = screen.getByRole('combobox');
      user.click(input);

      await user.type(input, 'App');
      await user.keyboard('[Backspace]');

      await user.keyboard('[Tab]');

      expect(document.activeElement).not.toBe(input);
    });
    it('should autocomplete with the first matching suggestion when multiple matches exist', async () => {
      const multipleMatchProps = {
        ...mockProps,
        options: ['Apple', 'Application', 'Apricot'],
      };
      const user = userEvent.setup();
      render(<ComboBox {...multipleMatchProps} allowCustomValue typeahead />);

      const input = screen.getByRole('combobox');
      user.click(input);

      await user.type(input, 'App');
      await user.keyboard('[Tab]');

      expect(input).toHaveDisplayValue('Apple');
    });

    it('should match case exactly with option list when Tab is pressed', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} allowCustomValue typeahead />);

      const input = screen.getByRole('combobox');
      user.click(input);

      await user.type(input, 'APpl');
      await user.keyboard('[Tab]');

      expect(input).toHaveDisplayValue('Apple');
    });

    it('should remove input and enter new conditions', async () => {
      const user = userEvent.setup();
      render(<ComboBox {...mockProps} typeahead />);

      const input = screen.getByRole('combobox');
      user.click(input);

      await user.keyboard('[Enter]');

      expect(input).toHaveDisplayValue('');
    });

    it('should open the menu and select null when Enter is pressed with no input and no highlighted item', async () => {
      const onInputChange = jest.fn();

      render(<ComboBox {...mockProps} onInputChange={onInputChange} />);

      await userEvent.type(findInputNode(), 'apple');
      expect(findInputNode()).toHaveDisplayValue('apple');
      await userEvent.keyboard('[Enter]');

      // Delete the selected item
      await userEvent.keyboard('[Backspace]');
      await userEvent.keyboard('[Backspace]');
      await userEvent.keyboard('[Backspace]');
      await userEvent.keyboard('[Backspace]');
      await userEvent.keyboard('[Backspace]');
      // check for an empty value
      expect(findInputNode()).toHaveDisplayValue('');

      // blur
      await userEvent.keyboard('[Tab]');
      assertMenuClosed(mockProps);

      // open the menu
      await userEvent.click(findInputNode());
      assertMenuOpen(mockProps);

      // check if the `li` item are all false
      for (let i = 0; i < mockProps.items.length; i++) {
        const item = findMenuItemNode(i);
        expect(item).toHaveAttribute('aria-selected', 'false');
      }
    });
  });

  describe('ComboBox repeated selection with controlled selectedItem and object items', () => {
    const ControlledComboBox = () => {
      const [selectedItem, setSelectedItem] = useState(null);
      const [changeCount, setChangeCount] = useState(0);
      const items = [
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

      const handleChange = ({ selectedItem }) => {
        setSelectedItem(selectedItem);
        setChangeCount((prev) => prev + 1);
      };

      return (
        <>
          <ComboBox
            id="test-combobox"
            items={items}
            selectedItem={selectedItem}
            onChange={handleChange}
            itemToString={(item) => (item ? item.text : '')}
            placeholder="Filter..."
          />
          <div data-testid="change-count">{changeCount}</div>
        </>
      );
    };
    it('should not fire onChange when selecting the same item repeatedly with mouse', async () => {
      const user = userEvent.setup();

      render(<ControlledComboBox />);

      // First selection - should trigger onChange
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Verify first selection changed the state
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Second selection of the same item - should NOT trigger onChange
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Should NOT trigger another onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Third selection of the same item - should still NOT trigger onChange
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Should still NOT trigger onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');
    });

    it('should not fire onChange when selecting the same item repeatedly with keyboard', async () => {
      const user = userEvent.setup();

      render(<ControlledComboBox />);

      // First selection with keyboard
      await openMenu();
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}'); // Navigate to Option 2
      await user.keyboard('{Enter}');

      // Verify first selection changed the state
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Second selection of same item with keyboard
      await openMenu();
      await user.keyboard('{Enter}'); // Option 2 should already be highlighted

      // Should NOT trigger another onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Third selection of same item with keyboard
      await openMenu();
      await user.keyboard('{Enter}'); // Option 2 should still be highlighted

      // Should still NOT trigger onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');
    });

    it('should not fire onChange when selecting the same item repeatedly with mouse, with allowCustomValue', async () => {
      const user = userEvent.setup();

      // Set up a controlled component with object items and allowCustomValue

      render(<ControlledComboBox />);

      // First selection with mouse
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Verify first selection changed the state
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Second selection of same item with mouse
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Should NOT trigger another onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      await user.click(document.body); // Close the menu

      // Third selection of same item with mouse
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Should still NOT trigger onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');
    });

    it('should not fire onChange when selecting the same item repeatedly with keyboard, with allowCustomValue', async () => {
      const user = userEvent.setup();

      render(<ControlledComboBox />);

      // First selection with keyboard
      await openMenu();
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}'); // Navigate to Option 2
      await user.keyboard('{Enter}');

      // Verify first selection changed the state
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Second selection of same item with keyboard
      await openMenu();
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');
      await user.keyboard('{Enter}'); // Option 2 should already be highlighted

      // Should NOT trigger another onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Third selection of same item with keyboard
      await openMenu();
      await user.keyboard('{Enter}'); // Option 2 should still be highlighted

      // Should still NOT trigger onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');
    });
  });

  describe('ComboBox repeated selection with controlled selectedItem and string items', () => {
    const ControlledComboBox = () => {
      const [selectedItem, setSelectedItem] = useState(null);
      const [changeCount, setChangeCount] = useState(0);
      const items = [
        'An example option that is really long',
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
      ];

      const handleChange = ({ selectedItem }) => {
        setSelectedItem(selectedItem);
        setChangeCount((prev) => prev + 1);
      };

      return (
        <>
          <ComboBox
            id="test-combobox"
            items={items}
            selectedItem={selectedItem}
            onChange={handleChange}
            placeholder="Filter..."
          />
          <div data-testid="change-count">{changeCount}</div>
        </>
      );
    };
    it('should not fire onChange when selecting the same item repeatedly with mouse', async () => {
      const user = userEvent.setup();
      // Set up a controlled component that uses state to manage selectedItem

      render(<ControlledComboBox />);

      // First selection - should trigger onChange
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Verify first selection changed the state
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Second selection of the same item - should NOT trigger onChange
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Should NOT trigger another onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');
    });

    it('should not fire onChange when selecting the same item repeatedly with keyboard', async () => {
      const user = userEvent.setup();

      render(<ControlledComboBox />);

      // First selection with keyboard
      await openMenu();
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}'); // Navigate to Option 2
      await user.keyboard('{Enter}');

      // Verify first selection changed the state
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Second selection of same item with keyboard
      await openMenu();
      await user.keyboard('{Enter}'); // Option 2 should already be highlighted

      // Should NOT trigger another onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');
    });

    it('should not fire onChange when selecting the same item repeatedly with mouse, with allowCustomValue', async () => {
      const user = userEvent.setup();

      render(<ControlledComboBox />);

      // First selection with mouse
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Verify first selection changed the state
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Second selection of same item with mouse
      await openMenu();
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // Should NOT trigger another onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');
    });

    it('should not fire onChange when selecting the same item repeatedly with keyboard, with allowCustomValue', async () => {
      const user = userEvent.setup();

      render(<ControlledComboBox />);

      // First selection with keyboard
      await openMenu();
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}'); // Navigate to Option 2
      await user.keyboard('{Enter}');

      // Verify first selection changed the state
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');

      // Second selection of same item with keyboard
      await openMenu();
      await user.keyboard('{Enter}'); // Option 2 should already be highlighted

      // Should NOT trigger another onChange
      expect(screen.getByTestId('change-count').textContent).toBe('1');
      expect(findInputNode()).toHaveDisplayValue('Option 2');
    });
  });

  it('passes inputProps to the input element', () => {
    render(
      <ComboBox
        id="test-combo"
        items={[{ label: 'Item 1' }]}
        itemToString={(item) => item?.label || ''}
        inputProps={{ maxLength: 10, placeholder: 'Type here' }}
      />
    );

    const input = screen.getByPlaceholderText('Type here');
    const attributes = Array.from(input.attributes).reduce(
      (acc, { name, value }) => ({ ...acc, [name]: value }),
      {}
    );

    expect(input).toBeInTheDocument();
    expect(attributes).toEqual({
      'aria-activedescendant': '',
      'aria-autocomplete': 'list',
      'aria-controls': attributes['aria-controls'],
      'aria-expanded': 'false',
      'aria-haspopup': 'listbox',
      'aria-label': 'Choose an item',
      autocomplete: 'off',
      class: 'cds--text-input cds--text-input--empty',
      id: 'test-combo',
      maxlength: '10',
      placeholder: 'Type here',
      role: 'combobox',
      tabindex: '0',
      type: 'text',
      value: '',
    });
  });

  it('should set `aria-controls` on the combobox input when the menu opens', async () => {
    render(<ComboBox {...mockProps} />);

    await openMenu();

    const combobox = screen.getByRole('combobox');
    const listbox = screen.getByRole('listbox');

    expect(listbox).toHaveAttribute('id');
    expect(combobox).toHaveAttribute('aria-controls', listbox.id);
  });
});



File: ComboBox/ComboBox.mdx


import { ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as ComboBoxStories from './ComboBox.stories.js';
import ComboBox from '../ComboBox';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# ComboBox

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/ComboBox)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/dropdown/usage#combo-box)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/dropdown/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Disabled](#disabled)
- [Combobox uses Downshift](#combobox-uses-downshift)
  - [`downshiftProps`](#downshiftprops)
- [typeahead Prop](#typeahead-prop)
  - [Autocomplete with typeahead](#autocomplete-with-typeahead)
  - [Combobox `downshiftActions`](#combobox-downshiftactions)
    - [`downshiftActions` Usage](#downshiftactions-usage)
- [Placeholders and Labeling](#placeholders-and-labeling)
- [`initialSelectedItem`](#initialselecteditem)
- [`selectedItem`](#selecteditem)
- [`itemToElement`](#itemtoelement)
- [`itemToString`](#itemtostring)
- [`shouldFilterItem`](#shouldfilteritem)
- [`allowCustomValue`](#allowcustomvalue)
- [`inputProps`](#inputprops)
  - [Using `maxLength`](#using-maxlength)
- [With AI Label](#with-ai-label)
- [With Layer](#with-layer)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

A combobox allows the user to make a selection from a predefined list of options
and is typically used when there are a large amount of options to choose from.

<Canvas
  of={ComboBoxStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ComboBoxStories.Default),
    },
  ]}
/>

## Disabled

A disabled combobox is available but should not be used as the sole means of
conveying information. For example, if the user must complete a previous form
input before moving on to the combobox, make sure to make that clear to the user
via an error state on the previous form element in addition to disabling the
next element.

```jsx
<Combobox disabled />
```

## Combobox uses Downshift

Our `Combobox` component utilizes [Downshift](https://www.downshift-js.com/)
under the hood to help provide complex yet accessible custom dropdown
components.

### `downshiftProps`

`downshiftProps` is made available as a passthrough to the underlying downshift
`useCombobox` hook.

**Use with caution:** anything you define here overrides the components'
internal handling of that prop. Downshift internals are subject to change, and
in some cases they can not be shimmed to shield you from potentially breaking
changes.

For more information, checkout the Downshift `useCombobox` props
[documentation](https://github.com/downshift-js/downshift/tree/v9.0.7/src/hooks/useCombobox#basic-props)

## typeahead Prop

The `typeahead` prop enables predictive text and autocomplete functionality in
the ComboBox. When enabled, it displays inline suggestions as you type, using a
built-in prefix-matching filter that ignores the `shouldFilterItem` prop.
Pressing `Tab` will complete the input with the first matching suggestion, while
arrow keys can still be used to navigate through filtered options.

When combined with the `allowCustomValue` prop, the ComboBox supports both
custom values and typeahead suggestions.

### Autocomplete with typeahead

<Canvas
  of={ComboBoxStories.AutocompleteWithTypeahead}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ComboBoxStories.AutocompleteWithTypeahead),
    },
  ]}
/>

### Combobox `downshiftActions`

The downshift action methods are made available through the `downshiftActions`
prop. While not recommended, this prop allows you to modify downshift's internal
state without having to fully control the component.

**Use with caution:** calling these actions modifies the internal state of
downshift. It may conflict with or override the state management used within
Combobox. Downshift APIs and internals are subject to change, and in some cases
they can not be shimmed by Carbon to shield you from potentially breaking
changes.

#### `downshiftActions` Usage

Provide a ref that will be mutated to contain an object of downshift action
functions. These can be called to change the internal state of the downshift
useCombobox hook.

```
const downshiftActions = useRef();

return (
  <ComboBox
    ...
    downshiftActions={downshiftActions}
    downshiftProps={{
      onStateChange: (changes) => {
        if (changes.selectedItem === null) {
          downshiftActions?.current?.openMenu?.();
          return;
        }
      },
    }}
  />
);
```

For more information, checkout the Downshift `useCombobox` action functions
[documentation](https://github.com/downshift-js/downshift/tree/v9.0.7/src/hooks/useCombobox#actions)

## Placeholders and Labeling

The placeholder is not a replacement for a label under any circumstances
including space restraints. Placeholders should be used to provide additive
information regarding the format of the input. In all cases a label is required
_in addition to_ a placeholder.

## `initialSelectedItem`

If you want the Combobox to render with a value already selected, but do not
want to fully control the component, you can use `initialSelectedItem`

```jsx
const items = ['Option 1', 'Option 2', 'Option 3']

<Combobox initialSelectedItem={items[2]} onChange={() => {}} />
```

## `selectedItem`

You can use `selectedItem` for a fully controlled component.

<Canvas
  of={ComboBoxStories._fullyControlled}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ComboBoxStories._fullyControlled),
    },
  ]}
/>

```jsx
const options = [
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
    text: 'Option 3',
  },
];
const [value, setValue] = useState(options[0]);

const onChange = ({ selectedItem }) => {
  setValue(selectedItem);
};

return (
  <div>
    <ComboBox
      onChange={onChange}
      id="carbon-combobox"
      items={options}
      selectedItem={value}
      itemToString={(item) => (item ? item.text : '')}
      titleText="Label"
      helperText="Helper text"
    />
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Button onClick={() => setValue(null)}>Reset</Button>
      <Button onClick={() => setValue(options[0])}>Option 1</Button>
      <Button onClick={() => setValue(options[1])}>Option 2</Button>
      <Button onClick={() => setValue(options[2])}>Option 3</Button>
    </div>
  </div>
);
```

## `itemToElement`

The Combobox takes in an `items` array and can then be formatted by
`itemToElement` and `itemToString`. `itemToElement` allows you to wrap each
dropdown item in a custom element.

```jsx
<Combobox
  onChange={() => {}}
  items={[
    { id: 'option-0', text: 'Option 0' },
    { id: 'option-1', text: 'Option 1' },
    { id: 'option-2', text: 'Option 2' },
  ]}
  itemToElement={(item) =>
    item ? (
      <span className="test" style={{ color: 'red' }}>
        {item.text} 🔥
      </span>
    ) : (
      ''
    )
  }
  label="Select an option..."
/>
```

## `itemToString`

If the `items` array is not an array of strings, you'll need to use
`itemToString` to grab the text to be used as the `Combobox` item text.

```jsx
<Combobox
  items={[
    { id: 'option-0', text: 'Option 0' },
    { id: 'option-1', text: 'Option 1' },
    { id: 'option-2', text: 'Option 2' },
  ]}
  itemToString={(item) => (item ? item.text : '')}
  onChange={() => {}}
/>
```

## `shouldFilterItem`

By default, the Combobox will _not_ filter out items that do not match the input
string. If you would like to hide items that do not match what the user is
typing, you can pass in your own filtering function to the `shouldFilterItem`
prop.

<ComboBox
  id="carbon-combobox"
  items={['Apple', 'Orange', 'Banana']}
  titleText="Label"
  helperText="Helper text"
  shouldFilterItem={(menu) =>
    menu?.item?.toLowerCase().includes(menu?.inputValue?.toLowerCase())
  }
  onChange={() => {}}
/>

```jsx
const filterItems = (menu) => {
  return menu?.item?.toLowerCase().includes(menu?.inputValue?.toLowerCase());
};

<Combobox
  titleText="Label"
  helperText="Helper text"
  items={['Apple', 'Orange', 'Banana']}
  shouldFilterItem={filterItems}
  onChange={() => {}}
/>;
```

## `allowCustomValue`

By default, if text is entered into the `Combobox` and it does not match an
item, it will be cleared on blur. However, you can change this behavior by
passing in the `allowCustomValue` prop. This will allow a user to close the menu
and accept a custom value by pressing `Enter` as well as retain the value on
blur. The `inputValue` is provided as a second argument to the `onChange`
callback.

```js
{selectedItem: undefined, inputValue: 'Apple'}
```
<Canvas
  of={ComboBoxStories.AllowCustomValue}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ComboBoxStories.AllowCustomValue),
    },
  ]}
/>

## `inputProps`

Use `inputProps` to specify native input attributes to place on the `<input>`.
These are passed to [Downshift's `getInputProps()`](https://github.com/downshift-js/downshift?tab=readme-ov-file#getinputprops)
and will override the internal input props.


### Using `maxLength`

The native `maxLength` attribute can be included in `inputProps` to define the maximum string length that the user can enter into the input.

When using `maxLength`, ensure the limit is communicated to the user through both `helperText` and `invalidText`/`warnText`.

```jsx
<ComboBox
  inputProps={{ maxLength: 5 }}
  titleText="Abbreviation"
  helperText="Provide an abbreviation that is 5 characters or less"
  invalidText="Abbreviations must be 5 characters or less"
  warnText="Abbreviations must be 5 characters or less"
/>
```


## With AI Label

<Canvas
  of={ComboBoxStories.withAILabel}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ComboBoxStories.withAILabel),
    },
  ]}
/>

## With Layer

<Canvas of={ComboBoxStories._WithLayer} />

## Component API

<ArgTypes />

## Feedback

Help us improve these docs by
[editing this file on GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/ComboBox/ComboBox.mdx)



