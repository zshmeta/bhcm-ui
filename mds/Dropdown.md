File: Dropdown/Dropdown.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type HTMLAttributes } from 'react';
import cx from 'classnames';
import { ListBoxSizePropType, type ListBoxSize } from '../ListBox';
import { usePrefix } from '../../internal/usePrefix';

export interface DropdownSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;

  /**
   * Specify the size of the ListBox.
   */
  size?: ListBoxSize;
}

const DropdownSkeleton: React.FC<DropdownSkeletonProps> = ({
  className,
  size,
  hideLabel,
  ...rest
}: DropdownSkeletonProps) => {
  const prefix = usePrefix();
  const wrapperClasses = cx(
    className,
    `${prefix}--skeleton`,
    `${prefix}--form-item`
  );

  return (
    <div className={wrapperClasses} {...rest}>
      {!hideLabel && (
        <span className={`${prefix}--label ${prefix}--skeleton`} />
      )}
      <div
        className={cx(`${prefix}--skeleton ${prefix}--dropdown`, {
          [`${prefix}--list-box--${size}`]: size,
        })}
      />
    </div>
  );
};

DropdownSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify the size of the ListBox.
   */
  size: ListBoxSizePropType,
};

export default DropdownSkeleton;
export { DropdownSkeleton };



File: Dropdown/Dropdown.tsx


/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type ForwardedRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from 'react';
import {
  useSelect,
  UseSelectInterface,
  UseSelectProps,
  UseSelectState,
  UseSelectStateChange,
  UseSelectStateChangeTypes,
} from 'downshift';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {
  Checkmark,
  WarningAltFilled,
  WarningFilled,
} from '@carbon/icons-react';
import ListBox, {
  ListBoxSizePropType,
  ListBoxTypePropType,
  type ListBoxMenuIconTranslationKey,
  type ListBoxSize,
  type ListBoxType,
} from '../ListBox';
import { mergeRefs } from '../../tools/mergeRefs';
import { deprecate } from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import type { TranslateWithId } from '../../types/common';
import { useNormalizedInputProps } from '../../internal/useNormalizedInputProps';
import {
  useFloating,
  flip,
  hide,
  autoUpdate,
  size as floatingSize,
} from '@floating-ui/react';
import { useFeatureFlag } from '../FeatureFlags';
import { AILabel } from '../AILabel';
import { defaultItemToString, isComponentElement } from '../../internal';

const { ItemMouseMove, MenuMouseLeave, ToggleButtonBlur, FunctionCloseMenu } =
  useSelect.stateChangeTypes as UseSelectInterface['stateChangeTypes'] & {
    ToggleButtonClick: UseSelectStateChangeTypes.ToggleButtonClick;
  };

type ExcludedAttributes = 'id' | 'onChange';

export interface OnChangeData<ItemType> {
  selectedItem: ItemType | null;
}

export interface DropdownProps<ItemType>
  extends Omit<HTMLAttributes<HTMLDivElement>, ExcludedAttributes>,
    TranslateWithId<ListBoxMenuIconTranslationKey> {
  /**
   * Specify a label to be read by screen readers on the container node
   * 'aria-label' of the ListBox component.
   */
  ['aria-label']?: string;

  /**
   * @deprecated please use `aria-label` instead.
   * Specify a label to be read by screen readers on the container note.
   */
  ariaLabel?: string;

  /**
   * **Experimental**: Will attempt to automatically align the floating element
   * to avoid collisions with the viewport and being clipped by ancestor
   * elements. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign?: boolean;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `Dropdown` component
   */
  decorator?: ReactNode;

  /**
   * Specify the direction of the dropdown. Can be either top or bottom.
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
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement?: React.JSXElementConstructor<ItemType> | null;

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list.
   */
  itemToString?(item: ItemType | null): string;

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
   * @deprecated The `light` prop for `Dropdown` has been deprecated
   * in favor of the new `Layer` component. It will be removed in the next major release.
   */
  light?: boolean;

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange?(data: OnChangeData<ItemType>): void;

  /**
   * Whether or not the Dropdown is readonly
   */
  readOnly?: boolean;

  /**
   * An optional callback to render the currently selected item as a react element instead of only
   * as a string.
   */
  renderSelectedItem?(item: ItemType): ReactNode;

  /**
   * In the case you want to control the dropdown selection entirely.
   */
  selectedItem?: ItemType;

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size?: ListBoxSize;

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Dropdown` component
   */
  slug?: ReactNode;

  /**
   * Provide the title text that will be read by a screen reader when
   * visiting this control
   */
  titleText: ReactNode;

  /**
   * The dropdown type, `default` or `inline`
   */
  type?: ListBoxType;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNode;
}

export type DropdownTranslationKey = ListBoxMenuIconTranslationKey;

/**
 * Custom state reducer for `useSelect` in Downshift, providing control over
 * state changes.
 *
 * This function is called each time `useSelect` updates its internal state or
 * triggers `onStateChange`. It allows for fine-grained control of state
 * updates by modifying or overriding the default changes from Downshift's
 * reducer.
 * https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#statereducer
 *
 * @param {Object} state - The current full state of the Downshift component.
 * @param {Object} actionAndChanges - Contains the action type and proposed
 * changes from the default Downshift reducer.
 * @param {Object} actionAndChanges.changes - Suggested state changes.
 * @param {string} actionAndChanges.type - The action type for the state
 * change (e.g., item selection).
 * @returns {Object} - The modified state based on custom logic or default
 * changes if no custom logic applies.
 */
function stateReducer(state, actionAndChanges) {
  const { changes, type } = actionAndChanges;

  switch (type) {
    case ItemMouseMove:
    case MenuMouseLeave:
      if (changes.highlightedIndex === state.highlightedIndex) {
        // Prevent state update if highlightedIndex hasn't changed
        return state;
      }
      return changes;
    case ToggleButtonBlur:
    case FunctionCloseMenu:
      return {
        ...changes,
        selectedItem: state.selectedItem,
      };
    default:
      return changes;
  }
}

const Dropdown = React.forwardRef(
  <ItemType,>(
    {
      autoAlign = false,
      className: containerClassName,
      decorator,
      disabled = false,
      direction = 'bottom',
      items: itemsProp,
      label,
      ['aria-label']: ariaLabel,
      ariaLabel: deprecatedAriaLabel,
      itemToString = defaultItemToString,
      itemToElement = null,
      renderSelectedItem,
      type = 'default',
      size,
      onChange,
      id,
      titleText = '',
      hideLabel,
      helperText = '',
      translateWithId,
      light,
      invalid,
      invalidText,
      warn,
      warnText,
      initialSelectedItem,
      selectedItem: controlledSelectedItem,
      downshiftProps,
      readOnly,
      slug,
      ...other
    }: DropdownProps<ItemType>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const enableFloatingStyles = useFeatureFlag(
      'enable-v12-dynamic-floating-styles'
    );

    const { refs, floatingStyles, middlewareData } = useFloating(
      enableFloatingStyles || autoAlign
        ? {
            placement: direction,

            // The floating element is positioned relative to its nearest
            // containing block (usually the viewport). It will in many cases also
            // “break” the floating element out of a clipping ancestor.
            // https://floating-ui.com/docs/misc#clipping
            strategy: 'fixed',

            // Middleware order matters, arrow should be last
            middleware: [
              floatingSize({
                apply({ rects, elements }) {
                  Object.assign(elements.floating.style, {
                    width: `${rects.reference.width}px`,
                  });
                },
              }),
              autoAlign && flip(),
              autoAlign && hide(),
            ],
            whileElementsMounted: autoUpdate,
          }
        : {}
      // When autoAlign is turned off & the `enable-v12-dynamic-floating-styles` feature flag is not
      // enabled, floating-ui will not be used
    );

    useEffect(() => {
      if (enableFloatingStyles || autoAlign) {
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
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
    }, [floatingStyles, autoAlign, refs.floating]);

    const prefix = usePrefix();
    const { isFluid } = useContext(FormContext);

    const onSelectedItemChange = useCallback(
      ({ selectedItem }: Partial<UseSelectState<ItemType>>) => {
        if (onChange) {
          onChange({ selectedItem: selectedItem ?? null });
        }
      },
      [onChange]
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    const isItemDisabled = useCallback((item, _index) => {
      const isObject = item !== null && typeof item === 'object';
      return isObject && 'disabled' in item && item.disabled === true;
    }, []);

    const onHighlightedIndexChange = useCallback(
      (changes: UseSelectStateChange<ItemType>) => {
        const { highlightedIndex } = changes;

        if (
          highlightedIndex !== undefined &&
          highlightedIndex > -1 &&
          // eslint-disable-next-line valid-typeof , no-constant-binary-expression -- https://github.com/carbon-design-system/carbon/issues/20452
          typeof window !== undefined
        ) {
          const itemArray = document.querySelectorAll(
            `li.${prefix}--list-box__menu-item[role="option"]`
          );
          const highlightedItem = itemArray[highlightedIndex];
          if (highlightedItem) {
            highlightedItem.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
            });
          }
        }
      },
      [prefix]
    );

    const items = useMemo(() => itemsProp, [itemsProp]);
    const selectProps = useMemo(
      () => ({
        items,
        itemToString,
        initialSelectedItem,
        onSelectedItemChange,
        stateReducer,
        isItemDisabled,
        onHighlightedIndexChange,
        ...downshiftProps,
      }),
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
      [
        items,
        itemToString,
        initialSelectedItem,
        onSelectedItemChange,
        stateReducer,
        isItemDisabled,
        onHighlightedIndexChange,
        downshiftProps,
      ]
    );

    // only set selectedItem if the prop is defined. Setting if it is undefined
    // will overwrite default selected items from useSelect
    if (controlledSelectedItem !== undefined) {
      selectProps.selectedItem = controlledSelectedItem;
    }

    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getItemProps,
      selectedItem,
      highlightedIndex,
    } = useSelect(selectProps);
    const inline = type === 'inline';

    const normalizedProps = useNormalizedInputProps({
      id,
      readOnly,
      disabled: disabled ?? false,
      invalid: invalid ?? false,
      invalidText,
      warn: warn ?? false,
      warnText,
    });

    const [isFocused, setIsFocused] = useState(false);

    const className = cx(`${prefix}--dropdown`, {
      [`${prefix}--dropdown--invalid`]: normalizedProps.invalid,
      [`${prefix}--dropdown--warning`]: normalizedProps.warn,
      [`${prefix}--dropdown--open`]: isOpen,
      [`${prefix}--dropdown--focus`]: isFocused,
      [`${prefix}--dropdown--inline`]: inline,
      [`${prefix}--dropdown--disabled`]: normalizedProps.disabled,
      [`${prefix}--dropdown--light`]: light,
      [`${prefix}--dropdown--readonly`]: readOnly,
      [`${prefix}--dropdown--${size}`]: size,
      [`${prefix}--list-box--up`]: direction === 'top',
      [`${prefix}--autoalign`]: autoAlign,
    });

    const titleClasses = cx(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: normalizedProps.disabled,
      [`${prefix}--visually-hidden`]: hideLabel,
    });

    const helperClasses = cx(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: normalizedProps.disabled,
    });

    const wrapperClasses = cx(
      `${prefix}--dropdown__wrapper`,
      `${prefix}--list-box__wrapper`,
      containerClassName,
      {
        [`${prefix}--dropdown__wrapper--inline`]: inline,
        [`${prefix}--list-box__wrapper--inline`]: inline,
        [`${prefix}--dropdown__wrapper--inline--invalid`]:
          inline && normalizedProps.invalid,
        [`${prefix}--list-box__wrapper--inline--invalid`]:
          inline && normalizedProps.invalid,
        [`${prefix}--list-box__wrapper--fluid--invalid`]:
          isFluid && normalizedProps.invalid,
        [`${prefix}--list-box__wrapper--slug`]: slug,
        [`${prefix}--list-box__wrapper--decorator`]: decorator,
      }
    );

    // needs to be Capitalized for react to render it correctly
    const ItemToElement = itemToElement;
    const toggleButtonProps = getToggleButtonProps({
      'aria-label': ariaLabel || deprecatedAriaLabel,
    });

    const helper =
      helperText && !isFluid ? (
        <div id={normalizedProps.helperId} className={helperClasses}>
          {helperText}
        </div>
      ) : null;

    const handleFocus = (evt: FocusEvent<HTMLDivElement>) => {
      setIsFocused(evt.type === 'focus' && !selectedItem ? true : false);
    };

    const buttonRef = useRef<HTMLButtonElement>(null);
    const mergedRef = mergeRefs<HTMLButtonElement>(
      toggleButtonProps.ref,
      ref,
      buttonRef
    );

    const [currTimer, setCurrTimer] = useState<NodeJS.Timeout>();

    const [isTyping, setIsTyping] = useState(false);

    const onKeyDownHandler = useCallback(
      (evt: React.KeyboardEvent<HTMLButtonElement>) => {
        if (
          evt.code !== 'Space' ||
          !['ArrowDown', 'ArrowUp', ' ', 'Enter'].includes(evt.key)
        ) {
          setIsTyping(true);
        }
        if (
          (isTyping && evt.code === 'Space') ||
          !['ArrowDown', 'ArrowUp', ' ', 'Enter'].includes(evt.key)
        ) {
          if (currTimer) {
            clearTimeout(currTimer);
          }
          setCurrTimer(
            setTimeout(() => {
              setIsTyping(false);
            }, 3000)
          );
        }
        if (['ArrowDown'].includes(evt.key)) {
          setIsFocused(false);
        }
        if (['Enter'].includes(evt.key) && !selectedItem && !isOpen) {
          setIsFocused(true);
        }

        // For Dropdowns the arrow up key is only allowed if the Dropdown is open
        if (
          toggleButtonProps.onKeyDown &&
          (evt.key !== 'ArrowUp' || (isOpen && evt.key === 'ArrowUp'))
        ) {
          toggleButtonProps.onKeyDown(evt);
        }
      },
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
      [isTyping, currTimer, toggleButtonProps]
    );

    const readOnlyEventHandlers = useMemo(() => {
      if (readOnly) {
        return {
          onClick: (evt: MouseEvent<HTMLButtonElement>) => {
            // NOTE: does not prevent click
            evt.preventDefault();
            // focus on the element as per readonly input behavior
            buttonRef.current?.focus();
          },
          onKeyDown: (evt: React.KeyboardEvent<HTMLButtonElement>) => {
            const selectAccessKeys = ['ArrowDown', 'ArrowUp', ' ', 'Enter'];
            // This prevents the select from opening for the above keys
            if (selectAccessKeys.includes(evt.key)) {
              evt.preventDefault();
            }
          },
        };
      } else {
        return {
          onKeyDown: onKeyDownHandler,
        };
      }
    }, [readOnly, onKeyDownHandler]);

    const menuProps = useMemo(
      () =>
        getMenuProps({
          ref: enableFloatingStyles || autoAlign ? refs.setFloating : null,
        }),
      [autoAlign, getMenuProps, refs.setFloating, enableFloatingStyles]
    );

    // AILabel is always size `mini`
    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator = candidateIsAILabel
      ? cloneElement(candidate, { size: 'mini' })
      : candidate;

    const allLabelProps = getLabelProps();
    const labelProps = isValidElement(titleText)
      ? { id: allLabelProps.id }
      : allLabelProps;

    return (
      <div className={wrapperClasses} {...other}>
        {titleText && (
          <label className={titleClasses} {...labelProps}>
            {titleText}
          </label>
        )}
        <ListBox
          onFocus={handleFocus}
          onBlur={handleFocus}
          size={size}
          className={className}
          invalid={normalizedProps.invalid}
          invalidText={isFluid ? invalidText : undefined}
          invalidTextId={normalizedProps.invalidId}
          warn={normalizedProps.warn}
          warnText={isFluid ? warnText : undefined}
          warnTextId={normalizedProps.warnId}
          light={light}
          isOpen={isOpen}
          ref={enableFloatingStyles || autoAlign ? refs.setReference : null}
          id={id}>
          {normalizedProps.invalid && (
            <WarningFilled className={`${prefix}--list-box__invalid-icon`} />
          )}
          {normalizedProps.warn && (
            <WarningAltFilled
              className={`${prefix}--list-box__invalid-icon ${prefix}--list-box__invalid-icon--warning`}
            />
          )}
          <button
            type="button"
            // aria-expanded is already being passed through {...toggleButtonProps}
            className={`${prefix}--list-box__field`}
            disabled={normalizedProps.disabled}
            aria-disabled={readOnly ? true : undefined} // aria-disabled to remain focusable
            aria-describedby={
              !inline &&
              !normalizedProps.invalid &&
              !normalizedProps.warn &&
              helper
                ? normalizedProps.helperId
                : normalizedProps.invalid
                  ? normalizedProps.invalidId
                  : normalizedProps.warn
                    ? normalizedProps.warnId
                    : undefined
            }
            title={
              selectedItem && itemToString !== undefined
                ? itemToString(selectedItem)
                : defaultItemToString(label)
            }
            {...toggleButtonProps}
            {...readOnlyEventHandlers}
            ref={mergedRef}>
            <span className={`${prefix}--list-box__label`}>
              {selectedItem
                ? renderSelectedItem
                  ? renderSelectedItem(selectedItem)
                  : itemToString(selectedItem)
                : // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
                  (label as any)}
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
          <ListBox.Menu {...menuProps}>
            {isOpen &&
              items.map((item, index) => {
                const isObject = item !== null && typeof item === 'object';
                const itemProps = getItemProps({
                  item,
                  index,
                });
                const title =
                  isObject && 'text' in item && itemToElement
                    ? item.text
                    : itemToString(item);
                return (
                  <ListBox.MenuItem
                    key={itemProps.id}
                    isActive={selectedItem === item}
                    isHighlighted={highlightedIndex === index}
                    title={title as string}
                    disabled={itemProps['aria-disabled']}
                    {...itemProps}>
                    {typeof item === 'object' &&
                    ItemToElement !== undefined &&
                    ItemToElement !== null ? (
                      <ItemToElement key={itemProps.id} {...item} />
                    ) : (
                      itemToString(item)
                    )}
                    {selectedItem === item && (
                      <Checkmark
                        className={`${prefix}--list-box__menu-item__selected-icon`}
                      />
                    )}
                  </ListBox.MenuItem>
                );
              })}
          </ListBox.Menu>
        </ListBox>
        {!inline && !isFluid && !normalizedProps.validation && helper}
        {!inline && !isFluid && normalizedProps.validation}
      </div>
    );
  }
);

// Workaround problems with forwardRef() and generics.  In the long term, should stop using forwardRef().
// See https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref.
interface DropdownComponent {
  <ItemType>(
    props: DropdownProps<ItemType> & { ref?: Ref<HTMLButtonElement> }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  ): React.ReactElement<any> | null;
}

Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = {
  /**
   * 'aria-label' of the ListBox component.
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
   * **Experimental**: Will attempt to automatically align the floating element
   * to avoid collisions with the viewport and being clipped by ancestor
   * elements. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: PropTypes.bool,

  /**
   * Provide a custom className to be applied on the cds--dropdown node
   */
  className: PropTypes.string,

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `Dropdown` component
   */
  decorator: PropTypes.node,

  /**
   * Specify the direction of the dropdown. Can be either top or bottom.
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
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: PropTypes.node.isRequired,

  /**
   * `true` to use the light version.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `Dropdown` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange: PropTypes.func,

  /**
   * Whether or not the Dropdown is readonly
   */
  readOnly: PropTypes.bool,

  /**
   * An optional callback to render the currently selected item as a react element instead of only
   * as a string.
   */
  renderSelectedItem: PropTypes.func,

  /**
   * In the case you want to control the dropdown selection entirely.
   */
  selectedItem: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size: ListBoxSizePropType,

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Dropdown` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop for `Dropdown` has ' +
      'been deprecated in favor of the new `decorator` prop. It will be removed in the next major release.'
  ),

  /**
   * Provide the title text that will be read by a screen reader when
   * visiting this control
   */
  titleText: PropTypes.node.isRequired,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,

  /**
   * The dropdown type, `default` or `inline`
   */
  type: ListBoxTypePropType,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

export default Dropdown as DropdownComponent;



File: Dropdown/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Dropdown, {
  type DropdownTranslationKey,
  type OnChangeData,
  type DropdownProps,
} from './Dropdown';

export type { DropdownTranslationKey, OnChangeData };
export { Dropdown, type DropdownProps };
export { default as DropdownSkeleton } from './Dropdown.Skeleton';

export default Dropdown;



File: Dropdown/Dropdown.mdx


import { Story, ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import Dropdown from '../Dropdown';
import DropdownSkeleton from './Dropdown.Skeleton';
import * as DropdownStories from './Dropdown.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Dropdown

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Dropdown)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/dropdown/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/dropdown/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [Inline Dropdown](#inline-dropdown)
  - [Experimental Auto Align](#experimental-auto-align)
  - [Skeleton state](#skeleton-state)
  - [AI label](#ai-label)
- [Component API](#component-api)
  - [Dropdown `direction`](#dropdown-direction)
  - [Dropdown `downshiftProps`](#dropdown-downshiftprops)
  - [Dropdown `initialSelectedItem`](#dropdown-initialselecteditem)
  - [Dropdown `itemToElement`](#dropdown-itemtoelement)
  - [Dropdown `itemToString`](#dropdown-itemtostring)
  - [Dropdown `items`](#dropdown-items)
  - [Dropdown `light` **deprecated**](#dropdown-light-deprecated)
  - [Dropdown `selectedItem`](#dropdown-selecteditem)
  - [Dropdown `size`](#dropdown-size)
  - [Dropdown `titleText`](#dropdown-titletext)
  - [Dropdown `type`](#dropdown-type)
- [References](#references)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

Dropdowns present a list of options from which a user can select one option, or
several. A selected option can represent a value in a form, or can be used as an
action to filter or sort existing content.

<Canvas
  of={DropdownStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(DropdownStories.Default),
    },
  ]}
/>

### Inline Dropdown

You can place a `Dropdown` inline with other content by using the `inline`
variant

<Canvas
  of={DropdownStories.Inline}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(DropdownStories.Inline),
    },
  ]}
/>

### Experimental Auto Align

<Canvas
  of={DropdownStories.ExperimentalAutoAlign}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(DropdownStories.ExperimentalAutoAlign),
    },
  ]}
/>

### Skeleton state

You can use the `DropdownSkeleton` component to render a skeleton variant of a
`Dropdown`. This is useful to display on initial page load or when data needs to
be fetched from an external API.

<Canvas
  of={DropdownStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(DropdownStories.Skeleton),
    },
  ]}
/>

### AI label

<Canvas
  of={DropdownStories.withAILabel}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(DropdownStories.withAILabel),
    },
  ]}
/>

## Component API

<ArgTypes />

### Dropdown `direction`

When a `Dropdown` is near the bottom of a page, you may want to render the menu
to the top of the screen. To do this, specify `direction="top"`

<Dropdown
  items={[
    { id: 'option-0', text: 'Option 0' },
    {
      id: 'option-1',
      text: 'Option 1',
    },
    { id: 'option-2', text: 'Option 2' },
  ]}
  itemToString={(item) => (item ? item.text : '')}
  label="Select an option..."
  direction="top"
  id="direction"
  titleText="Dropdown label"
/>

```jsx
<Dropdown direction="top" />
```

### Dropdown `downshiftProps`

Our `Dropdown` component utilizes [Downshift](https://www.downshift-js.com/)
under the hood to help provide complex yet accessible custom dropdown
components. We provide access to the built in Downshift features with this prop.

Use with caution: anything you define here overrides the components' internal
handling of that prop. Downshift internals are subject to change, and in some
cases they can not be shimmed to shield you from potentially breaking changes.

For more information, checkout the Downshift prop
[documentation](https://www.downshift-js.com/downshift#props-used-in-examples)

### Dropdown `initialSelectedItem`

If you want the `Dropdown` to render with a value already selected, but do not
want to fully control the component, you can use `initialSelectedItem`.

```jsx
const items = ['Option 1', 'Option 2', 'Option 3']

<Dropdown initialSelectedItem={items[2]} />
```

### Dropdown `itemToElement`

The `Dropdown` takes in an `items` array and can then be formatted by
`itemToElement` and `itemToString`. `itemToElement` allows you to wrap each
dropdown item in a custom element. The
[`itemToString` prop](#dropdown-itemtostring) can be used with this to provide
the text of the item in the input on selection.

<Dropdown
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
  id="item-to-element"
  titleText="Dropdown label"
/>

```jsx
<Dropdown
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
  titleText="Dropdown label"
/>
```

### Dropdown `itemToString`

If the `items` array is not an array of strings, you'll need to use
`itemToString` to grab the text to be used as the `Dropdown` item text.

<Dropdown
  items={[
    { id: 'option-0', text: 'Option 0' },
    { id: 'option-1', text: 'Option 1' },
    { id: 'option-2', text: 'Option 2' },
  ]}
  itemToString={(item) => (item ? item.text : '')}
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
  id="item-to-element"
  titleText="Dropdown label"
/>

```jsx
<Dropdown
  items={[
    { id: 'option-0', text: 'Option 0' },
    { id: 'option-1', text: 'Option 1' },
    { id: 'option-2', text: 'Option 2' },
  ]}
  itemToString={(item) => (item ? item.text : '')}
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
  id="item-to-element"
  titleText="Dropdown label"
/>
```

### Dropdown `items`

This is the data that will be rendered as options for the `Dropdown`. If `items`
is simply an array of strings, no further formatting is required. If `items` is
an array of objects, you'll need to pass in an `itemToString` function as well.

```jsx
<Dropdown
  items={['Option 0', 'Option 1', 'Option 2']}
/>


<Dropdown
  items={[
    { id: 'option-0', text: 'Option 0' },
    { id: 'option-1', text: 'Option 1' },
    { id: 'option-2', text: 'Option 2' },
  ]}
  itemToString={(item) => (item ? item.text : '')}
/>
```

### Dropdown `light` **deprecated**

In certain circumstances, a `Dropdown` will exist on a container element with
the same background color. To improve contrast, you can use the `light` property
to toggle the light variant of the `Dropdown`. `light` is now deprecated, we
recommend using the new `Layer` component instead.

```jsx
<Dropdown light>...</Dropdown>
```

### Dropdown `selectedItem`

You can pass a `selectedItem` to the `Dropdown` to set a value on initial load.
Keep in mind, if you set a value the `Dropdown` will become a controlled
component and you will need to handle state management.

```jsx
const [currentItem, setCurrentItem] = useState(items[4]);
...
<Dropdown
  items={items}
  itemToString={(item) => (item ? item.text : '')}
  onChange={({ selectedItem }) => setCurrentItem(selectedItem)}
  selectedItem={currentItem}
/>
```

### Dropdown `size`

There are three sizes of `Dropdown` available: `sm`, `md` (the default), and
`lg`.

<Dropdown
  items={['Option 1', 'Option 2', 'Option 3']}
  size="sm"
  label="Small [sm]"
  id="sm"
  titleText="Dropdown label"
/>
<br />
<Dropdown
  items={['Option 1', 'Option 2', 'Option 3']}
  label="Medium [md]"
  id="md"
  size="md"
  titleText="Dropdown label"
/>
<br />
<Dropdown
  items={['Option 1', 'Option 2', 'Option 3']}
  size="lg"
  label="Large [lg]"
  id="lg"
  titleText="Dropdown label"
/>

```jsx
<Dropdown
  items={['Option 1', 'Option 2', 'Option 3']}
  size="sm"
  label="Small [sm]"
  titleText="Dropdown label"
/>
<Dropdown
  items={['Option 1', 'Option 2', 'Option 3']}
  label="Medium [md]"
  size="md"
  titleText="Dropdown label"
/>
<Dropdown
  items={['Option 1', 'Option 2', 'Option 3']}
  size="lg"
  label="Large [lg]"
  titleText="Dropdown label"
/>
```

### Dropdown `titleText`

This is the text that will be used as a label for the `Dropdown`

```jsx
<Dropdown titleText="This is the Dropdown label" />
```

### Dropdown `type`

Sometimes you will need to place a `Dropdown` inline with other content. To do
that, pass in `type="inline"` to the `Dropdown`

<Dropdown
  items={['Option 1', 'Option 2', 'Option 3']}
  label="Inline"
  type="inline"
  id="inline"
  titleText="Dropdown label"
/>

```jsx
<Dropdown
  items={['Option 1', 'Option 2', 'Option 3']}
  label="Inline"
  type="inline"
  is="inline"
  titleText="Dropdown label"
/>
```

## References

- [Carbon Usage Guidelines](https://www.carbondesignsystem.com/components/dropdown/usage/)

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Dropdown/Dropdown.mdx).



File: Dropdown/Dropdown.featureflag.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { Dropdown } from '../Dropdown';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Dropdown/Feature Flag',
  component: Dropdown,
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
  const items = [
    {
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      text: 'Option 1',
    },
    {
      text: 'Option 2',
    },
    {
      text: 'Option 3 - a disabled item',
      disabled: true,
    },
    {
      text: 'Option 4',
    },
    {
      text: 'Option 5',
    },
    {
      text: 'Option 6',
    },
    {
      text: 'Option 7',
    },
    {
      text: 'Option 8',
    },
  ];

  return (
    <Dropdown
      id="default"
      titleText="Dropdown label"
      helperText="This is some helper text"
      initialSelectedItem={items[1]}
      label="Option 1"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      {...args}
    />
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



File: Dropdown/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  tall
  variants={[
    {
      label: 'Default',
      variant: 'components-dropdown--default'
    },
    {
      label: 'Inline',
      variant: 'components-dropdown--inline'
    },
    {
      label: 'Fluid (unstable)',
      variant: 'experimental-unstable-fluiddropdown--default'
    },
    {
      label: 'Fluid Condensed (unstable)',
      variant: 'experimental-unstable-fluiddropdown--condensed'
    }
  ]}
/>



File: Dropdown/Dropdown.DynamicStyles.featureflag.mdx


import { Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as DropdownFeatureflagStories from './Dropdown.featureflag.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta title="Components/Dropdown/Feature Flag" name="Flag details" />

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
  <Dropdown
    id="default"
    titleText="Dropdown label"
    helperText="This is some helper text"
    initialSelectedItem={items[1]}
    label="Option 1"
    items={items}
    itemToString={(item) => (item ? item.text : '')}
    {...args}
  />
</FeatureFlags>
```

<Canvas
  of={DropdownFeatureflagStories.FloatingStyles}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(DropdownFeatureflagStories.FloatingStyles),
    },
  ]}
/>



File: Dropdown/Dropdown.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FolderOpen, Folders, Information, View } from '@carbon/icons-react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import { default as Dropdown, DropdownSkeleton } from './';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import {
  Toggletip,
  ToggletipActions,
  ToggletipButton,
  ToggletipContent,
  ToggletipLabel,
} from '../Toggletip';
import { IconButton } from '../IconButton';
import mdx from './Dropdown.mdx';
import Link from '../Link';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  subcomponents: {
    DropdownSkeleton,
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
    slug: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['items', 'initialSelectedItem', 'itemToElement', 'id'],
    },
  },
};

const items = [
  {
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    text: 'Option 1',
  },
  {
    text: 'Option 2',
  },
  {
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    text: 'Option 4',
  },
  {
    text: 'Option 5',
  },
  {
    text: 'Option 6',
  },
  {
    text: 'Option 7',
  },
  {
    text: 'Option 8',
  },
];

const sharedArgs = {
  invalid: false,
  invalidText: 'invalid selection',
  disabled: false,
  hideLabel: false,
  label: 'This is an example label',
  warn: false,
  warnText: 'please notice the warning',
  titleText: 'This is an example title',
  type: 'default',
};

const sharedArgTypes = {
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
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
  label: {
    control: {
      type: 'text',
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
  titleText: {
    control: {
      type: 'text',
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  type: {
    control: { type: 'select' },
    options: ['default', 'inline'],
  },
};

export const Default = (args) => {
  const items = [
    {
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      text: 'Option 1',
    },
    {
      text: 'Option 2',
    },
    {
      text: 'Option 3 - a disabled item',
      disabled: true,
    },
    {
      text: 'Option 4',
    },
    {
      text: 'Option 5',
    },
    {
      text: 'Option 6',
    },
    {
      text: 'Option 7',
    },
    {
      text: 'Option 8',
    },
  ];

  return (
    <div style={{ width: 400 }}>
      <Dropdown
        id="default"
        titleText="Dropdown label"
        helperText="This is some helper text"
        label="Choose an option"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        {...args}
      />
    </div>
  );
};

Default.args = {
  ...sharedArgs,
};

Default.argTypes = {
  ...sharedArgTypes,
};

export const ExperimentalAutoAlign = (args) => {
  const items = [
    {
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      text: 'Option 1',
    },
    {
      text: 'Option 2',
    },
    {
      text: 'Option 3 - a disabled item',
      disabled: true,
    },
    {
      text: 'Option 4',
    },
    {
      text: 'Option 5',
    },
    {
      text: 'Option 6',
    },
    {
      text: 'Option 7',
    },
    {
      text: 'Option 8',
    },
  ];
  return (
    <div style={{ width: 400 }}>
      <div style={{ height: 300 }}></div>
      <Dropdown
        autoAlign={true}
        id="default"
        titleText="Dropdown label"
        helperText="This is some helper text"
        initialSelectedItem={items[1]}
        label="Option 1"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        direction="top"
        {...args}
      />
      <div style={{ height: 800 }}></div>
    </div>
  );
};

ExperimentalAutoAlign.argTypes = {
  ...sharedArgTypes,
};

export const Inline = (args) => {
  const items = [
    {
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      text: 'Option 1',
    },
    {
      text: 'Option 2',
    },
    {
      text: 'Option 3 - a disabled item',
      disabled: true,
    },
    {
      text: 'Option 4',
    },
    {
      text: 'Option 5',
    },
    {
      text: 'Option 6',
    },
    {
      text: 'Option 7',
    },
    {
      text: 'Option 8',
    },
  ];
  return (
    <div style={{ width: 600 }}>
      <Dropdown
        id="inline"
        titleText="Inline dropdown label"
        initialSelectedItem={items[1]}
        label="Option 1"
        type="inline"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        {...args}
      />
    </div>
  );
};

Inline.argTypes = {
  ...sharedArgTypes,
};

export const _WithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 400 }}>
        <Dropdown
          id={`default-${layer}`}
          titleText="Dropdown label"
          helperText="This is some helper text"
          initialSelectedItem={items[1]}
          label="Option 1"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          {...args}
        />
      </div>
    )}
  </WithLayer>
);

_WithLayer.argTypes = {
  ...sharedArgTypes,
};

export const InlineWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 600 }}>
        <Dropdown
          id={`inline-${layer}`}
          titleText="Inline dropdown label"
          initialSelectedItem={items[1]}
          label="Option 1"
          type="inline"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          {...args}
        />
      </div>
    )}
  </WithLayer>
);

InlineWithLayer.argTypes = {
  ...sharedArgTypes,
};

export const Skeleton = () => {
  return (
    <div style={{ width: 300 }}>
      <DropdownSkeleton />
    </div>
  );
};

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
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      text: 'Option 1',
    },
    {
      text: 'Option 2',
    },
    {
      text: 'Option 3 - a disabled item',
      disabled: true,
    },
    {
      text: 'Option 4',
    },
    {
      text: 'Option 5',
    },
    {
      text: 'Option 6',
    },
    {
      text: 'Option 7',
    },
    {
      text: 'Option 8',
    },
  ];

  return (
    <div style={{ width: 400 }}>
      <Dropdown
        id="default"
        titleText="Dropdown title"
        helperText="This is some helper text"
        initialSelectedItem={items[1]}
        label="Option 1"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        decorator={aiLabel}
        {...args}
      />
    </div>
  );
};

withAILabel.argTypes = {
  ...sharedArgTypes,
};

export const withToggletipLabel = () => {
  return (
    <div>
      <Dropdown
        label="placeholder"
        id="dropdown"
        items={[]}
        titleText={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ToggletipLabel>Dropdown title</ToggletipLabel>
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
      />
    </div>
  );
};

// Hidden Test-Only Story. This story tests for a bug where the invalid-text would overlap with components below it. #19960
export const TestInvalidTextNoOverlap = () => {
  const items = [
    {
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
  ];

  return (
    <div style={{ width: 400 }}>
      <Dropdown
        id="test-1"
        titleText="test invalid text, the invalid text should not overlap"
        helperText="This is some helper text"
        label="Choose an option"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        invalid
        invalidText="invalid text, this should not overlap with the component below"
      />
      <Dropdown
        titleText="test title"
        label="Choose an option"
        itemToString={(item) => (item ? item.text : '')}
        id="test-2"
        items={items}
      />
    </div>
  );
};
/*
 * This story will:
 * - Be excluded from the docs page
 * - Removed from the sidebar navigation
 * - Still be a tested variant
 */
TestInvalidTextNoOverlap.tags = ['!dev', '!autodocs'];



