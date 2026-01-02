File: ListBox/ListBoxField.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';

export interface ListBoxFieldProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify if the parent <ListBox> is disabled
   */
  disabled?: boolean;
}

/**
 * `ListBoxField` is responsible for creating the containing node for valid
 * elements inside of a field. It also provides a11y-related attributes like
 * `role` to make sure a user can focus the given field.
 */
function ListBoxField({
  children,
  disabled,
  tabIndex,
  ...rest
}: ListBoxFieldProps) {
  const prefix = usePrefix();

  return (
    <div
      className={`${prefix}--list-box__field`}
      tabIndex={(!disabled && tabIndex) || -1}
      {...rest}>
      {children}
    </div>
  );
}

ListBoxField.propTypes = {
  /**
   * Typically set by `getToggleButtonProps`, this should specify whether the
   * field has a popup.
   */
  'aria-haspopup': PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /**
   * Provide the contents of your ListBoxField
   */
  children: PropTypes.node,

  /**
   * Specify if the parent <ListBox> is disabled
   */
  disabled: PropTypes.bool,

  /**
   * The role for the component, should be set by `getToggleButtonProps` coming
   * from Downshift
   */
  role: PropTypes.string,

  /**
   * Optional prop to specify the tabIndex of the <ListBox> trigger button
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export type ListBoxFieldComponent = React.FC<ListBoxFieldProps>;

export default ListBoxField as ListBoxFieldComponent;



File: ListBox/ListBoxMenu.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import PropTypes from 'prop-types';
import ListBoxMenuItem from './ListBoxMenuItem';

type ExcludedAttributes = 'id';

export interface ListBoxMenuProps
  extends Omit<HTMLAttributes<HTMLUListElement>, ExcludedAttributes> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  children?: any;

  /**
   * Specify a custom `id`
   */
  id: string;
}

const frFn = forwardRef<HTMLUListElement, ListBoxMenuProps>;

/**
 * `ListBoxMenu` is a simple container node that isolates the `list-box__menu`
 * class into a single component. It is also being used to validate given
 * `children` components.
 */
const ListBoxMenu = frFn(({ children, id, ...rest }, ref) => {
  const prefix = usePrefix();
  return (
    <ul
      ref={ref}
      id={id}
      className={`${prefix}--list-box__menu`}
      role="listbox"
      {...rest}>
      {children}
    </ul>
  );
});

ListBoxMenu.displayName = 'ListBoxMenu';
ListBoxMenu.propTypes = {
  /**
   * Provide the contents of your ListBoxMenu
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.oneOf([ListBoxMenuItem])),
    /**
     * allow single item using the workaround for functional components
     * https://github.com/facebook/react/issues/2979#issuecomment-222379916
     */
    PropTypes.shape({
      type: PropTypes.oneOf([ListBoxMenuItem]),
    }),
    PropTypes.bool, // used in Dropdown for closed state
  ]),

  /**
   * Specify a custom `id`
   */
  id: PropTypes.string.isRequired,
};

export default ListBoxMenu;



File: ListBox/test-helpers.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const prefix = 'cds';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

// Finding nodes in a ListBox
export const findListBoxNode = () => {
  return document.querySelector('.cds--list-box');
};

export const findMenuNode = () => {
  return document.querySelector(`.${prefix}--list-box__menu`);
};

export const findMenuItemNode = (index) => {
  const nodes = document.querySelectorAll(`.${prefix}--list-box__menu-item`);
  if (nodes[index]) {
    return nodes[index];
  }
  throw new Error(`Unable to find node at index: ${index} in: ${nodes}`);
};

export const findMenuIconNode = () => {
  return document.querySelector(`.${prefix}--list-box__menu-icon`);
};

export const findFieldNode = () => {
  return document.querySelector(`.${prefix}--list-box__field`);
};

export const findComboboxNode = () => {
  return document.querySelector(`.${prefix}--list-box[role="combobox"]`);
};

export const findPopupNode = () => {
  return document.querySelector('[aria-haspopup="listbox"]');
};

// Actions
export const openMenu = async () => {
  await userEvent.click(findFieldNode());
};

// Common assertions, useful for validating a11y props are set when needed
export const assertMenuOpen = (mockProps) => {
  expect(findMenuNode().childNodes.length).toBe(mockProps.items.length);

  expect(findMenuIconNode()).toHaveClass(
    `${prefix}--list-box__menu-icon--open`
  );

  expect(findPopupNode()).toHaveAttribute('aria-expanded', 'true');
};

export const assertMenuClosed = () => {
  expect(findMenuIconNode()).toHaveClass(`${prefix}--list-box__menu-icon`);

  expect(findMenuIconNode()).not.toHaveClass(
    `${prefix}--list-box__menu-icon--open`
  );
  expect(findPopupNode()).toHaveAttribute('aria-expanded', 'false');
};

/**
 * `GenericItem` corresponds to an item in a collection that is passed to
 * MultiSelect that is in a predictable shape and works with the default
 * `itemToString` out of the box.
 * @param {number} index
 *
 * @returns {{id: string, label: string, value: string}}
 */
export const generateGenericItem = (index) => ({
  id: `id-${index}`,
  label: `Item ${index}`,
  value: index,
});

/**
 * `CustomItem` corresponds to a potentially different item structure that
 * might be passed into MultiSelect that we would need to supply a custom
 * `itemToString` method for
 * @param {number} index
 *
 * @returns {{field: string, value: string}}
 */
export const generateCustomItem = (index) => ({
  field: `Item ${index}`,
  value: `Custom value ${index}`,
});

/**
 * Returns an Array filled by values generated by the `generator` function
 * @param {number} amount Number of elements to generate
 *
 * @returns {Array<object>} Array of objects generated by `generator`
 */
export const generateItems = (amount, generator) =>
  Array(amount)
    .fill(null)
    .map((_, i) => generator(i));

export const customItemToString = ({ field }) => field;

/**
 * This object contains two sets of three items that share the same root
 * word in different portions of the string (beginning, middle, end):
 *
 *  - 'struct'
 *  - 'port'
 *
 * Separated by a disabled item, these derivative words are helpful when
 * testing fuzzy search functions and components that do substring filtering.
 */
export const cognateItems = [
  {
    id: 'structure',
    text: 'Structure',
  },
  {
    id: 'construct',
    text: 'Construct',
  },
  {
    id: 'instruction',
    text: 'Instruction',
  },
  {
    id: 'disabled-item',
    text: 'A disabled item',
    disabled: true,
  },
  {
    id: 'transport',
    text: 'Transport',
  },
  {
    id: 'portable',
    text: 'Portable',
  },
  {
    id: 'import',
    text: 'Import',
  },
];

/**
 * Flushes microtasks to ensure element position state is settled
 * From https://floating-ui.com/docs/react#testing
 * More context here: https://github.com/floating-ui/react-popper/issues/368#issuecomment-1340413010
 */
export const waitForPosition = () => act(async () => {});



File: ListBox/ListBoxPropTypes.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';

const listBoxTypes = ['default', 'inline'] as const;
const listBoxSizes = ['sm', 'md', 'lg'] as const;

export type ListBoxType = (typeof listBoxTypes)[number];
export type ListBoxSize = (typeof listBoxSizes)[number];

export const ListBoxTypePropType = PropTypes.oneOf(listBoxTypes);
export const ListBoxSizePropType = PropTypes.oneOf(listBoxSizes);



File: ListBox/index.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export * from './ListBoxPropTypes';

import type { ComponentProps } from 'react';
import ListBoxInternal from './ListBox';
import ListBoxField, { ListBoxFieldComponent } from './ListBoxField';
import ListBoxMenu from './ListBoxMenu';
import ListBoxMenuIcon, { ListBoxMenuIconComponent } from './ListBoxMenuIcon';
import ListBoxMenuItem from './ListBoxMenuItem';
import ListBoxSelection, {
  ListBoxSelectionComponent,
} from './ListBoxSelection';

type ListBoxMenuComponent = typeof ListBoxMenu;
type ListBoxMenuItemComponent = typeof ListBoxMenuItem;
type ListBoxPartialComponent = typeof ListBoxInternal;

export interface ListBoxComponent extends ListBoxPartialComponent {
  readonly Field: ListBoxFieldComponent;
  readonly Menu: ListBoxMenuComponent;
  readonly MenuIcon: ListBoxMenuIconComponent;
  readonly MenuItem: ListBoxMenuItemComponent;
  readonly Selection: ListBoxSelectionComponent;
}

const ListBox: ListBoxComponent = Object.assign(ListBoxInternal, {
  Field: ListBoxField,
  Menu: ListBoxMenu,
  MenuIcon: ListBoxMenuIcon,
  MenuItem: ListBoxMenuItem,
  Selection: ListBoxSelection,
});

export default ListBox;

export type ListBoxMenuIconTranslationKey = Parameters<
  NonNullable<ComponentProps<typeof ListBoxMenuIcon>['translateWithId']>
>[0];
export type ListBoxSelectionTranslationKey = Parameters<
  NonNullable<ComponentProps<typeof ListBoxSelection>['translateWithId']>
>[0];



File: ListBox/ListBoxMenuItem.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type MutableRefObject,
  type ReactNode,
  type Ref,
} from 'react';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';
import { useMergedRefs } from '../../internal/useMergedRefs';

/**
 * Determines if the content of an element is truncated.
 *
 * Merges a forwarded ref with a local ref to check the element's dimensions.
 *
 * @template T
 * @param forwardedRef - A ref passed from the parent component.
 * @param deps - Dependencies to re-run the truncation check.
 * @returns An object containing the truncation state and the merged ref.
 */
const useIsTruncated = <T extends HTMLElement>(
  forwardedRef?: Ref<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  deps: any[] = []
) => {
  const localRef = useRef<T>(null);
  const mergedRef = useMergedRefs([
    ...(forwardedRef ? [forwardedRef] : []),
    localRef,
  ]);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = localRef.current;

    if (element) {
      const { offsetWidth, scrollWidth } = element;

      setIsTruncated(offsetWidth < scrollWidth);
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [localRef, ...deps]);

  return { isTruncated, ref: mergedRef };
};

export interface ListBoxMenuItemProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Specify any children nodes that should be rendered inside of the ListBox
   * Menu Item
   */
  children?: ReactNode;
  /**
   * Specify whether the current menu item is "active".
   */
  isActive?: boolean;

  /**
   * Specify whether the current menu item is "highlighted".
   */
  isHighlighted?: boolean;

  /**
   * Specify whether the item should be disabled
   */
  disabled?: boolean;

  /**
   * Provide an optional tooltip for the ListBoxMenuItem
   */
  title?: string;
}

/**
 * `ListBoxMenuItem` is a helper component for managing the container class
 * name, alongside any classes for any corresponding states, for a generic list
 * box menu item.
 */
const ListBoxMenuItem = forwardRef<HTMLLIElement, ListBoxMenuItemProps>(
  (
    { children, isActive = false, isHighlighted = false, title, ...rest },
    forwardedRef
  ) => {
    const prefix = usePrefix();

    const menuItemOptionRefProp =
      forwardedRef && typeof forwardedRef !== 'function'
        ? (
            forwardedRef as MutableRefObject<HTMLLIElement | null> & {
              menuItemOptionRef?: Ref<HTMLDivElement>;
            }
          ).menuItemOptionRef
        : undefined;

    const { isTruncated, ref: menuItemOptionRef } = useIsTruncated(
      menuItemOptionRefProp,
      [children]
    );
    const className = cx(`${prefix}--list-box__menu-item`, {
      [`${prefix}--list-box__menu-item--active`]: isActive,
      [`${prefix}--list-box__menu-item--highlighted`]: isHighlighted,
    });

    return (
      <li
        {...rest}
        className={className}
        title={isTruncated ? title : undefined}>
        <div
          className={`${prefix}--list-box__menu-item__option`}
          ref={menuItemOptionRef}>
          {children}
        </div>
      </li>
    );
  }
);

ListBoxMenuItem.displayName = 'ListBoxMenuItem';
ListBoxMenuItem.propTypes = {
  /**
   * Specify any children nodes that should be rendered inside of the ListBox
   * Menu Item
   */
  children: PropTypes.node,

  /**
   * Specify if the item should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether the current menu item is "active".
   */
  isActive: PropTypes.bool,

  /**
   * Specify whether the current menu item is "highlighted".
   */
  isHighlighted: PropTypes.bool,

  /**
   * Provide an optional tooltip for the ListBoxMenuItem
   */
  title: PropTypes.string,
};

export default ListBoxMenuItem;



File: ListBox/ListBoxMenuIcon.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from '@carbon/icons-react';
import { usePrefix } from '../../internal/usePrefix';
import type { TFunc, TranslateWithId } from '../../types/common';

const translationIds = {
  'close.menu': 'close.menu',
  'open.menu': 'open.menu',
} as const;

type TranslationKey = keyof typeof translationIds;

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['close.menu']]: 'Close menu',
  [translationIds['open.menu']]: 'Open menu',
};

const defaultTranslateWithId: TFunc<TranslationKey> = (messageId) => {
  return defaultTranslations[messageId];
};

export interface ListBoxMenuIconProps extends TranslateWithId<TranslationKey> {
  /**
   * Specify whether the menu is currently open, which will influence the
   * direction of the menu icon
   */
  isOpen: boolean;
}

export type ListBoxMenuIconComponent = React.FC<ListBoxMenuIconProps>;

/**
 * `ListBoxMenuIcon` is used to orient the icon up or down depending on the
 * state of the menu for a given `ListBox`
 */
const ListBoxMenuIcon: ListBoxMenuIconComponent = ({
  isOpen,
  translateWithId: t = defaultTranslateWithId,
}: ListBoxMenuIconProps) => {
  const prefix = usePrefix();
  const className = cx(`${prefix}--list-box__menu-icon`, {
    [`${prefix}--list-box__menu-icon--open`]: isOpen,
  });
  const description = isOpen ? t('close.menu') : t('open.menu');
  return (
    <div className={className}>
      <ChevronDown name="chevron--down" aria-label={description}>
        <title>{description}</title>
      </ChevronDown>
    </div>
  );
};

ListBoxMenuIcon.propTypes = {
  /**
   * Specify whether the menu is currently open, which will influence the
   * direction of the menu icon
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,
};

export default ListBoxMenuIcon;



File: ListBox/ListBoxSelection.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { Close } from '@carbon/icons-react';
import { usePrefix } from '../../internal/usePrefix';
import { KeyboardEvent, MouseEvent } from 'react';
import type { TFunc, TranslateWithId } from '../../types/common';

export interface ListBoxSelectionProps extends TranslateWithId<TranslationKey> {
  /**
   * Specify a function to be invoked when a user interacts with the clear
   * selection element.
   */
  clearSelection(
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ): void;

  /**
   * Specify whether or not the clear selection element should be disabled
   */
  disabled?: boolean;

  /**
   * Specify an optional `onClearSelection` handler that is called when the underlying
   * element is cleared
   */
  onClearSelection?(
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ): void;

  /**
   * Whether or not the Dropdown is readonly
   */
  readOnly?: boolean;

  /**
   * Specify an optional `selectionCount` value that will be used to determine
   * whether the selection should display a badge or a single clear icon.
   */
  selectionCount?: number;
}

export type ListBoxSelectionComponent = React.FC<ListBoxSelectionProps>;

const translationIds = {
  'clear.all': 'clear.all',
  'clear.selection': 'clear.selection',
} as const;

type TranslationKey = keyof typeof translationIds;

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['clear.all']]: 'Clear all selected items',
  [translationIds['clear.selection']]: 'Clear selected item',
};

const defaultTranslateWithId: TFunc<TranslationKey> = (messageId) => {
  return defaultTranslations[messageId];
};

/**
 * `ListBoxSelection` is used to provide controls for clearing a selection, in
 * addition to conditionally rendering a badge if the control has more than one
 * selection.
 */
const ListBoxSelection: ListBoxSelectionComponent = ({
  clearSelection,
  selectionCount,
  translateWithId: t = defaultTranslateWithId,
  disabled,
  onClearSelection,
  readOnly,
}: ListBoxSelectionProps) => {
  const prefix = usePrefix();
  const className = cx(`${prefix}--list-box__selection`, {
    [`${prefix}--tag--filter`]: selectionCount,
    [`${prefix}--list-box__selection--multi`]: selectionCount,
  });
  const handleOnClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (disabled || readOnly) {
      return;
    }
    clearSelection(event);
    if (onClearSelection) {
      onClearSelection(event);
    }
  };
  const description = selectionCount ? t('clear.all') : t('clear.selection');
  const tagClasses = cx(
    `${prefix}--tag`,
    `${prefix}--tag--filter`,
    `${prefix}--tag--high-contrast`,
    {
      [`${prefix}--tag--disabled`]: disabled,
    }
  );

  /* eslint-disable jsx-a11y/click-events-have-key-events */
  return selectionCount ? (
    <div className={tagClasses}>
      <span className={`${prefix}--tag__label`} title={`${selectionCount}`}>
        {selectionCount}
      </span>
      <div
        role="button"
        tabIndex={-1}
        className={`${prefix}--tag__close-icon`}
        onClick={handleOnClick}
        aria-label={t('clear.all')}
        title={description}
        aria-disabled={readOnly ? true : undefined}>
        <Close />
      </div>
    </div>
  ) : (
    <div
      role="button"
      className={className}
      tabIndex={-1}
      onClick={handleOnClick}
      aria-label={description}
      title={description}>
      {selectionCount}
      <Close />
    </div>
  );
};

ListBoxSelection.propTypes = {
  /**
   * Specify a function to be invoked when a user interacts with the clear
   * selection element.
   */
  clearSelection: PropTypes.func.isRequired,

  /**
   * Specify whether or not the clear selection element should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify an optional `onClearSelection` handler that is called when the underlying
   * element is cleared
   */
  onClearSelection: PropTypes.func,

  /**
   * Whether or not the Dropdown is readonly
   */
  readOnly: PropTypes.bool,

  /**
   * Specify an optional `selectionCount` value that will be used to determine
   * whether the selection should display a badge or a single clear icon.
   */
  selectionCount: PropTypes.number,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,
};

export default ListBoxSelection;



File: ListBox/ListBox.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, {
  forwardRef,
  useContext,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import PropTypes from 'prop-types';
import { deprecate } from '../../prop-types/deprecate';
import {
  ListBoxSizePropType,
  ListBoxTypePropType,
  type ListBoxSize,
  type ListBoxType,
} from './ListBoxPropTypes';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';

const handleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
  if (event.keyCode === 27) {
    event.stopPropagation();
  }
};

const handleClick = (event: MouseEvent<HTMLDivElement>) => {
  event.preventDefault();
  event.stopPropagation();
};

type ExcludedAttributes = 'onKeyDown' | 'onKeyPress' | 'ref';

export interface ListBoxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, ExcludedAttributes> {
  /**
   * Specify whether the ListBox is currently disabled
   */
  disabled?: boolean;

  /**
   * Specify whether the control is currently invalid
   */
  invalid?: boolean;

  /**
   * Specify the text to be displayed when the control is invalid
   */
  invalidText?: React.ReactNode;

  /**
   * Specify the id to be applied to the element containing the invalid text
   */
  invalidTextId?: string;

  /**
   * Specify if the control should render open
   */
  isOpen?: boolean;

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   *
   * @deprecated The `light` prop for `ListBox` has been deprecated in favor of
   * the new `Layer` component. It will be removed in the next major release.
   */
  light?: boolean;

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size?: ListBoxSize;

  /**
   * Specify the "type" of the ListBox. Currently supports either `default` or
   * `inline` as an option.
   */
  type?: ListBoxType;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;

  /**
   * Specify the id to be applied to the element containing the warn text
   */
  warnTextId?: string;
}

/**
 * `ListBox` is a generic container component that handles creating the
 * container class name in response to certain props.
 */
const ListBox = forwardRef<HTMLDivElement, ListBoxProps>((props, ref) => {
  const {
    children,
    className: containerClassName,
    disabled = false,
    type = 'default',
    size,
    invalid,
    invalidText,
    invalidTextId,
    warn,
    warnText,
    warnTextId,
    light,
    isOpen,
    ...rest
  } = props;
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const showWarning = !invalid && warn;

  const className = cx({
    ...(containerClassName && { [containerClassName]: true }),
    [`${prefix}--list-box`]: true,
    [`${prefix}--list-box--${size}`]: size,
    [`${prefix}--list-box--inline`]: type === 'inline',
    [`${prefix}--list-box--disabled`]: disabled,
    [`${prefix}--list-box--light`]: light,
    [`${prefix}--list-box--expanded`]: isOpen,
    [`${prefix}--list-box--invalid`]: invalid,
    [`${prefix}--list-box--warning`]: showWarning,
  });
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        {...rest}
        className={className}
        ref={ref}
        onKeyDown={handleOnKeyDown}
        onClick={handleClick}
        data-invalid={invalid || undefined}>
        {children}
      </div>
      {isFluid && <hr className={`${prefix}--list-box__divider`} />}
      {invalid ? (
        <div className={`${prefix}--form-requirement`} id={invalidTextId}>
          {invalidText}
        </div>
      ) : null}
      {showWarning ? (
        <div className={`${prefix}--form-requirement`} id={warnTextId}>
          {warnText}
        </div>
      ) : null}
    </>
  );
});

ListBox.displayName = 'ListBox';
ListBox.propTypes = {
  /**
   * Provide the contents of your ListBox
   */
  children: PropTypes.node,

  /**
   * Specify a class name to be applied on the containing list box node
   */
  className: PropTypes.string,

  /**
   * Specify whether the ListBox is currently disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Specify the text to be displayed when the control is invalid
   */
  invalidText: PropTypes.node,

  /**
   * Specify the id to be applied to the element containing the invalid text
   */
  invalidTextId: PropTypes.string,

  /**
   * Specify if the control should render open
   */
  isOpen: PropTypes.bool,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `ListBox` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size: ListBoxSizePropType,

  /**
   * Specify the "type" of the ListBox. Currently supports either `default` or
   * `inline` as an option.
   */
  type: ListBoxTypePropType,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.string,

  /**
   * Specify the id to be applied to the element containing the warn text
   */
  warnTextId: PropTypes.string,
};

export default ListBox;



File: ListBox/README.md


# `ListBox` component

`ListBox` is responsible for powering a variety of dropdown-flavored components
in Carbon. This list includes components like: Dropdown, Combobox, MultiSelect,
and more!

Currently, a `ListBox` is broken up into the following pieces:

- `ListBox`: container component that wraps all `ListBox*`-related components
  - `ListBoxField`: component used for handling input and displaying selections
    in components like Combobox and MultiSelect
    - `ListBoxMenuIcon`: indicates the status of the menu, e.g. whether it is
      open or closed.
    - `ListBoxSelection`: indicates the status of the selection for the control,
      works for both single selection and multi-selection components
  - `ListBoxMenu`: container component for the menu of options available in a
    `ListBox`
    - `ListBoxMenuItem`: container component for an option in a `ListBoxMenu`



File: ListBox/next/ListBoxTrigger.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from '@carbon/icons-react';
import { usePrefix } from '../../../internal/usePrefix';
import type { TFunc, TranslateWithId } from '../../../types/common';

const translationIds = {
  'close.menu': 'close.menu',
  'open.menu': 'open.menu',
} as const;

type TranslationKey = keyof typeof translationIds;

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['close.menu']]: 'Close',
  [translationIds['open.menu']]: 'Open',
};

const defaultTranslateWithId: TFunc<TranslationKey> = (messageId) => {
  return defaultTranslations[messageId];
};

export interface ListBoxTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    TranslateWithId<TranslationKey> {
  /**
   * Specify whether the menu is currently open, which will influence the
   * direction of the menu icon
   */
  isOpen: boolean;
}

/**
 * `ListBoxTrigger` is used to orient the icon up or down depending on the
 * state of the menu for a given `ListBox`
 */

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const ListBoxTrigger = React.forwardRef<HTMLButtonElement, ListBoxTriggerProps>(
  ({ isOpen, translateWithId: t = defaultTranslateWithId, ...rest }, ref) => {
    const prefix = usePrefix();
    const className = cx({
      [`${prefix}--list-box__menu-icon`]: true,
      [`${prefix}--list-box__menu-icon--open`]: isOpen,
    });
    const description = isOpen ? t('close.menu') : t('open.menu');
    return (
      <button
        {...rest}
        aria-label={description}
        title={description}
        className={className}
        type="button"
        tabIndex={-1}
        ref={ref}>
        <ChevronDown />
      </button>
    );
  }
);

ListBoxTrigger.propTypes = {
  /**
   * Specify whether the menu is currently open, which will influence the
   * direction of the menu icon
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,
};

export default ListBoxTrigger;



File: ListBox/next/index.ts


/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export {
  default as ListBoxSelection,
  type ListBoxSelectionProps,
} from './ListBoxSelection';
export {
  default as ListBoxTrigger,
  type ListBoxTriggerProps,
} from './ListBoxTrigger';



File: ListBox/next/ListBoxSelection.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { Close } from '@carbon/icons-react';
import { usePrefix } from '../../../internal/usePrefix';
import type { TFunc, TranslateWithId } from '../../../types/common';

/**
 * `ListBoxSelection` is used to provide controls for clearing a selection, in
 * addition to conditionally rendering a badge if the control has more than one
 * selection.
 */

const translationIds = {
  'clear.all': 'clear.all',
  'clear.selection': 'clear.selection',
} as const;

type TranslationKey = keyof typeof translationIds;

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['clear.all']]: 'Clear all selected items',
  [translationIds['clear.selection']]: 'Clear selected item',
};

const defaultTranslateWithId: TFunc<TranslationKey> = (messageId) => {
  return defaultTranslations[messageId];
};

export interface ListBoxSelectionProps extends TranslateWithId<TranslationKey> {
  /**
   * Specify a function to be invoked when a user interacts with the clear
   * selection element.
   */
  clearSelection: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * Specify an optional `selectionCount` value that will be used to determine
   * whether the selection should display a badge or a single clear icon.
   */
  selectionCount?: number;
  /**
   * Specify whether or not the clear selection element should be disabled
   */
  disabled?: boolean;
  /**
   * Whether or not the listbox is readonly
   */
  readOnly?: boolean;

  /**
   * Specify an optional `onClearSelection` handler that is called when the underlying
   * element is cleared
   */
  onClearSelection?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Specify an optional `onClick` handler that is called when the underlying
   * clear selection element is clicked
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Specify an optional `onKeyDown` handler that is called when the underlying
   * clear selection element fires a keydown event
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;

  /**
   * Specify an optional `onMouseUp` handler that is called when the underlying
   * clear selection element fires a mouseup event
   */
  onMouseUp?: React.MouseEventHandler<HTMLButtonElement>;
}

function ListBoxSelection({
  clearSelection,
  selectionCount,
  translateWithId: t = defaultTranslateWithId,
  disabled,
  readOnly,
  onClearSelection,
  ...rest
}: ListBoxSelectionProps) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--list-box__selection`, {
    [`${prefix}--tag--filter`]: selectionCount,
    [`${prefix}--list-box__selection--multi`]: selectionCount,
  });
  const description = selectionCount ? t('clear.all') : t('clear.selection');
  const tagClasses = cx(
    `${prefix}--tag`,
    `${prefix}--tag--filter`,
    `${prefix}--tag--high-contrast`,
    {
      [`${prefix}--tag--disabled`]: disabled,
    }
  );

  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    if (disabled || readOnly) {
      return;
    }
    clearSelection(event);
    if (onClearSelection) {
      onClearSelection(event);
    }
  }

  if (selectionCount) {
    return (
      <div className={tagClasses}>
        <span
          className={`${prefix}--tag__label`}
          title={selectionCount?.toString()}>
          {selectionCount}
        </span>
        <button
          aria-label={description}
          className={`${prefix}--tag__close-icon`}
          disabled={disabled || readOnly}
          onClick={onClick}
          tabIndex={-1}
          title={description}
          type="button"
          aria-disabled={readOnly ? true : undefined}>
          <Close />
        </button>
      </div>
    );
  }

  return (
    <button
      {...rest}
      aria-label={description}
      className={className}
      disabled={disabled || readOnly}
      onClick={onClick}
      tabIndex={-1}
      title={description}
      type="button"
      aria-disabled={readOnly ? true : undefined}>
      <Close />
    </button>
  );
}

ListBoxSelection.propTypes = {
  /**
   * Specify a function to be invoked when a user interacts with the clear
   * selection element.
   */
  clearSelection: PropTypes.func.isRequired,

  /**
   * Specify whether or not the clear selection element should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Whether or not the listbox is readonly
   */
  readOnly: PropTypes.bool,

  /**
   * Specify an optional `onClearSelection` handler that is called when the underlying
   * element is cleared
   */
  onClearSelection: PropTypes.func,

  /**
   * Specify an optional `onClick` handler that is called when the underlying
   * clear selection element is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify an optional `onClick` handler that is called when the underlying
   * clear selection element is clicked
   */
  onMouseUp: PropTypes.func,

  /**
   * Specify an optional `onKeyDown` handler that is called when the underlying
   * clear selection element fires a keydown event
   */
  onKeyDown: PropTypes.func,

  /**
   * Specify an optional `selectionCount` value that will be used to determine
   * whether the selection should display a badge or a single clear icon.
   */
  selectionCount: PropTypes.number,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,
};

export default ListBoxSelection;



