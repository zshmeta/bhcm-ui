File: Menu/MenuContext.ts


/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, KeyboardEvent, RefObject } from 'react';

type ActionType = {
  type: 'enableIcons' | 'enableSelectableItems' | 'registerItem';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  payload: any;
};

type StateType = {
  isRoot: boolean;
  hasIcons: boolean;
  hasSelectableItems: boolean;
  size: 'xs' | 'sm' | 'md' | 'lg' | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  items: any[];
  requestCloseRoot: (e: Pick<KeyboardEvent<HTMLUListElement>, 'type'>) => void;
};

const menuDefaultState: StateType = {
  isRoot: true,
  hasIcons: false,
  hasSelectableItems: false,
  size: null,
  items: [],
  requestCloseRoot: () => {},
};

function menuReducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'enableIcons':
      return {
        ...state,
        hasIcons: true,
      };
    case 'enableSelectableItems':
      return {
        ...state,
        hasSelectableItems: true,
      };
    case 'registerItem': {
      const newItem = action.payload;
      const items = state.items.filter((item) => item.ref.current);
      const next = newItem.ref.current?.nextElementSibling;
      const idx = items.findIndex((item) => item.ref.current === next);
      items.splice(idx < 0 ? items.length : idx, 0, newItem);
      return { ...state, items };
    }
  }
}

type DispatchFuncProps = {
  type: ActionType['type'];
  payload: {
    ref: RefObject<HTMLLIElement | null>;
    disabled: boolean;
  };
};

type MenuContextProps = {
  state: StateType;
  dispatch: (props: DispatchFuncProps) => void;
};

const MenuContext = createContext<MenuContextProps>({
  state: menuDefaultState,
  // 'dispatch' is populated by the root menu
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
  dispatch: (_: DispatchFuncProps) => {},
});

export { MenuContext, menuReducer };



File: Menu/Menu.stories.js


/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';

import {
  Copy,
  Cut,
  FolderShared,
  Paste,
  TextBold,
  TextItalic,
  TrashCan,
} from '@carbon/icons-react';

import {
  Menu,
  MenuItem,
  MenuItemSelectable,
  MenuItemGroup,
  MenuItemRadioGroup,
  MenuItemDivider,
} from './';
import mdx from './Menu.mdx';

export default {
  title: 'Components/Menu',
  component: Menu,
  subcomponents: {
    MenuItem,
    MenuItemSelectable,
    MenuItemGroup,
    MenuItemRadioGroup,
    MenuItemDivider,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['target'],
    },
  },
  argTypes: {
    mode: {
      control: false,
    },
  },
};

export const Default = (args) => {
  const itemOnClick = action('onClick (MenuItem)');
  const selectableOnChange = action('onChange (MenuItemSelectable)');
  const radioOnChange = action('onChange (MenuItemRadioGroup)');

  const target = document.getElementById('storybook-root');

  return (
    <Menu {...args} target={target} x={document?.dir === 'rtl' ? 250 : 0}>
      <MenuItem label="Share with" renderIcon={FolderShared}>
        <MenuItemRadioGroup
          label="Share with"
          items={['None', 'Product team', 'Organization', 'Company']}
          defaultSelectedItem="Product team"
          onChange={radioOnChange}
        />
      </MenuItem>
      <MenuItemDivider />
      <MenuItem
        label="Cut"
        shortcut="⌘X"
        onClick={itemOnClick}
        renderIcon={Cut}
      />
      <MenuItem
        label="Copy"
        shortcut="⌘C"
        onClick={itemOnClick}
        renderIcon={Copy}
      />
      <MenuItem
        label="Paste"
        shortcut="⌘V"
        disabled
        onClick={itemOnClick}
        renderIcon={Paste}
      />
      <MenuItemDivider />
      <MenuItemGroup label="Font style">
        <MenuItemSelectable
          label="Bold"
          shortcut="⌘B"
          defaultSelected
          onChange={selectableOnChange}
          renderIcon={TextBold}
        />
        <MenuItemSelectable
          label="Italic"
          shortcut="⌘I"
          onChange={selectableOnChange}
          renderIcon={TextItalic}
        />
      </MenuItemGroup>
      <MenuItemDivider />
      <MenuItemRadioGroup
        label="Text decoration"
        items={['None', 'Overline', 'Line-through', 'Underline']}
        defaultSelectedItem="None"
        onChange={radioOnChange}
      />
      <MenuItemDivider />
      <MenuItem
        label="Delete"
        shortcut="⌫"
        kind="danger"
        onClick={itemOnClick}
        renderIcon={TrashCan}
      />
    </Menu>
  );
};

Default.args = {
  onClose: action('onClose'),
  open: true,
};



File: Menu/MenuItem.tsx


/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  ComponentProps,
  FC,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  LiHTMLAttributes,
  MouseEvent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  useHover,
  useFloating,
  useInteractions,
  safePolygon,
  autoUpdate,
  offset,
  FloatingFocusManager,
} from '@floating-ui/react';
import { CaretRight, CaretLeft, Checkmark } from '@carbon/icons-react';
import { keys, match } from '../../internal/keyboard';
import { useControllableState } from '../../internal/useControllableState';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';

import { Menu } from './Menu';
import { MenuContext } from './MenuContext';
import { useLayoutDirection } from '../LayoutDirection';
import { Text } from '../Text';
import { defaultItemToString } from '../../internal';

export interface MenuItemProps extends LiHTMLAttributes<HTMLLIElement> {
  /**
   * Optionally provide another Menu to create a submenu. props.children can't be used to specify the content of the MenuItem itself. Use props.label instead.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Specify whether the MenuItem is disabled or not.
   */
  disabled?: boolean;

  /**
   * Specify the kind of the MenuItem.
   */
  kind?: 'default' | 'danger';

  /**
   * A required label titling the MenuItem. Will be rendered as its text content.
   */
  label: string;

  /**
   * Provide an optional function to be called when the MenuItem is clicked.
   */
  onClick?: (
    event: KeyboardEvent<HTMLLIElement> | MouseEvent<HTMLLIElement>
  ) => void;

  /**
   * A component used to render an icon.
   */
  renderIcon?: FC;

  /**
   * Provide a shortcut for the action of this MenuItem. Note that the component will only render it as a hint but not actually register the shortcut.
   */
  shortcut?: string;
}

export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  function MenuItem(
    {
      children,
      className,
      disabled,
      kind = 'default',
      label,
      onClick,
      renderIcon: IconElement,
      shortcut,
      ...rest
    },
    forwardRef
  ) {
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [rtl, setRtl] = useState(false);

    const {
      refs,
      floatingStyles,
      context: floatingContext,
    } = useFloating({
      open: submenuOpen,
      onOpenChange: setSubmenuOpen,
      placement: rtl ? 'left-start' : 'right-start',
      whileElementsMounted: autoUpdate,
      middleware: [offset({ mainAxis: -6, crossAxis: -6 })],
      strategy: 'fixed',
    });
    const { getReferenceProps, getFloatingProps } = useInteractions([
      useHover(floatingContext, {
        delay: 100,
        enabled: true,
        handleClose: safePolygon({
          requireIntent: false,
        }),
      }),
    ]);

    const prefix = usePrefix();
    const context = useContext(MenuContext);

    const menuItem = useRef<HTMLLIElement>(null);
    const ref = useMergedRefs([forwardRef, menuItem, refs.setReference]);

    const hasChildren = Boolean(children);

    const isDisabled = disabled && !hasChildren;
    const isDanger = kind === 'danger' && !hasChildren;

    function registerItem() {
      context.dispatch({
        type: 'registerItem',
        payload: {
          ref: menuItem,
          disabled: Boolean(disabled),
        },
      });
    }

    function openSubmenu() {
      if (!menuItem.current) {
        return;
      }

      setSubmenuOpen(true);
    }

    function closeSubmenu() {
      setSubmenuOpen(false);
    }

    function handleClick(
      e: KeyboardEvent<HTMLLIElement> | MouseEvent<HTMLLIElement>
    ) {
      if (!isDisabled) {
        if (hasChildren) {
          openSubmenu();
        } else {
          context.state.requestCloseRoot(e);

          if (onClick) {
            onClick(e);
          }
        }
      }
    }

    // Avoid stray keyup event from MenuButton affecting MenuItem, and vice versa.
    // Keyboard click is handled differently for <button> vs. <li> and for Enter vs. Space.  See
    // https://www.stefanjudis.com/today-i-learned/keyboard-button-clicks-with-space-and-enter-behave-differently/.
    const pendingKeyboardClick = useRef(false);

    const keyboardClickEvent = (e: KeyboardEvent) =>
      match(e, keys.Enter) || match(e, keys.Space);

    function handleKeyDown(e: KeyboardEvent<HTMLLIElement>) {
      if (hasChildren && match(e, keys.ArrowRight)) {
        openSubmenu();
        requestAnimationFrame(() => {
          refs.floating.current?.focus();
        });
        e.stopPropagation();
        e.preventDefault();
      }

      pendingKeyboardClick.current = keyboardClickEvent(e);

      if (rest.onKeyDown) {
        rest.onKeyDown(e);
      }
    }

    function handleKeyUp(e: KeyboardEvent<HTMLLIElement>) {
      if (pendingKeyboardClick.current && keyboardClickEvent(e)) {
        handleClick(e);
      }

      pendingKeyboardClick.current = false;
    }

    const classNames = cx(className, `${prefix}--menu-item`, {
      [`${prefix}--menu-item--disabled`]: isDisabled,
      [`${prefix}--menu-item--danger`]: isDanger,
    });

    // on first render, register this menuitem in the context's state
    // (used for keyboard navigation)
    useEffect(() => {
      registerItem();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Set RTL based on the document direction or `LayoutDirection`
    const { direction } = useLayoutDirection();
    useEffect(() => {
      if (document?.dir === 'rtl' || direction === 'rtl') {
        setRtl(true);
      } else {
        setRtl(false);
      }
    }, [direction]);

    useEffect(() => {
      if (IconElement && !context.state.hasIcons) {
        // @ts-expect-error - TODO: Should we be passing payload?
        context.dispatch({ type: 'enableIcons' });
      }
    }, [IconElement, context.state.hasIcons, context]);

    useEffect(() => {
      Object.keys(floatingStyles).forEach((style) => {
        if (refs.floating.current && style !== 'position') {
          refs.floating.current.style[style] = floatingStyles[style];
        }
      });
    }, [floatingStyles, refs.floating]);

    return (
      <FloatingFocusManager
        context={floatingContext}
        order={['reference', 'floating']}
        modal={false}>
        <li
          role="menuitem"
          {...rest}
          ref={ref}
          className={classNames}
          tabIndex={!disabled ? 0 : -1}
          aria-disabled={isDisabled ?? undefined}
          aria-haspopup={hasChildren ?? undefined}
          aria-expanded={hasChildren ? submenuOpen : undefined}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          title={label}
          {...getReferenceProps()}>
          <div className={`${prefix}--menu-item__selection-icon`}>
            {rest['aria-checked'] && <Checkmark />}
          </div>
          <div className={`${prefix}--menu-item__icon`}>
            {IconElement && <IconElement />}
          </div>
          <Text as="div" className={`${prefix}--menu-item__label`}>
            {label}
          </Text>
          {shortcut && !hasChildren && (
            <div className={`${prefix}--menu-item__shortcut`}>{shortcut}</div>
          )}
          {hasChildren && (
            <>
              <div className={`${prefix}--menu-item__shortcut`}>
                {rtl ? <CaretLeft /> : <CaretRight />}
              </div>
              <Menu
                label={label}
                open={submenuOpen}
                onClose={() => {
                  closeSubmenu();
                  menuItem.current?.focus();
                }}
                ref={refs.setFloating}
                {...getFloatingProps()}>
                {children}
              </Menu>
            </>
          )}
        </li>
      </FloatingFocusManager>
    );
  }
);

MenuItem.propTypes = {
  /**
   * Optionally provide another Menu to create a submenu. props.children can't be used to specify the content of the MenuItem itself. Use props.label instead.
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * Specify whether the MenuItem is disabled or not.
   */
  disabled: PropTypes.bool,

  /**
   * Specify the kind of the MenuItem.
   */
  kind: PropTypes.oneOf(['default', 'danger']),

  /**
   * A required label titling the MenuItem. Will be rendered as its text content.
   */
  label: PropTypes.string.isRequired,

  /**
   * Provide an optional function to be called when the MenuItem is clicked.
   */
  onClick: PropTypes.func,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Provide a shortcut for the action of this MenuItem. Note that the component will only render it as a hint but not actually register the shortcut.
   */
  shortcut: PropTypes.string,
};

export interface MenuItemSelectableProps
  extends Omit<MenuItemProps, 'onChange'> {
  /**
   * Specify whether the option should be selected by default.
   */
  defaultSelected?: boolean;

  /**
   * Provide an optional function to be called when the selection state changes.
   */
  onChange?: (checked: boolean) => void;

  /**
   * Controls the state of this option.
   */
  selected?: boolean;
}

export const MenuItemSelectable = forwardRef<
  HTMLLIElement,
  MenuItemSelectableProps
>(function MenuItemSelectable(
  { className, defaultSelected, label, onChange, selected, ...rest },
  forwardRef
) {
  const prefix = usePrefix();
  const context = useContext(MenuContext);

  const [checked, setChecked] = useControllableState({
    value: selected,
    onChange,
    defaultValue: defaultSelected ?? false,
  });

  function handleClick() {
    setChecked(!checked);
  }

  useEffect(() => {
    if (!context.state.hasSelectableItems) {
      // @ts-expect-error - TODO: Should we be passing payload?
      context.dispatch({ type: 'enableSelectableItems' });
    }
  }, [context.state.hasSelectableItems, context]);

  const classNames = cx(className, `${prefix}--menu-item-selectable--selected`);

  return (
    <MenuItem
      {...rest}
      ref={forwardRef}
      label={label}
      className={classNames}
      role="menuitemcheckbox"
      aria-checked={checked}
      onClick={handleClick}
    />
  );
});

MenuItemSelectable.propTypes = {
  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * Specify whether the option should be selected by default.
   */
  defaultSelected: PropTypes.bool,

  /**
   * A required label titling this option.
   */
  label: PropTypes.string.isRequired,

  /**
   * Provide an optional function to be called when the selection state changes.
   */
  onChange: PropTypes.func,

  /**
   * Pass a bool to props.selected to control the state of this option.
   */
  selected: PropTypes.bool,
};

export interface MenuItemGroupProps extends ComponentProps<'ul'> {
  /**
   * A collection of MenuItems to be rendered within this group.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * A required label titling this group.
   */
  label: string;
}

export const MenuItemGroup = forwardRef<HTMLLIElement, MenuItemGroupProps>(
  function MenuItemGroup({ children, className, label, ...rest }, forwardRef) {
    const prefix = usePrefix();

    const classNames = cx(className, `${prefix}--menu-item-group`);

    return (
      <li className={classNames} role="none" ref={forwardRef}>
        <ul {...rest} role="group" aria-label={label}>
          {children}
        </ul>
      </li>
    );
  }
);

MenuItemGroup.propTypes = {
  /**
   * A collection of MenuItems to be rendered within this group.
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * A required label titling this group.
   */
  label: PropTypes.string.isRequired,
};

export interface MenuItemRadioGroupProps<Item>
  extends Omit<ComponentProps<'ul'>, 'onChange'> {
  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Specify the default selected item. Must match the type of props.items.
   */
  defaultSelectedItem?: Item;

  /**
   * Converts an item into a string for display.
   */
  itemToString?: (item: Item) => string;

  /**
   * Provide the options for this radio group. Can be of any type, as long as you provide an appropriate props.itemToString function.
   */
  items: Item[];

  /**
   * A required label titling this radio group.
   */
  label: string;

  /**
   * Provide an optional function to be called when the selection changes.
   */
  onChange?: (selectedItem: Item) => void;

  /**
   * Provide props.selectedItem to control the state of this radio group. Must match the type of props.items.
   */
  selectedItem?: Item;
}

export const MenuItemRadioGroup = forwardRef(function MenuItemRadioGroup<Item>(
  {
    className,
    defaultSelectedItem,
    items,
    itemToString = defaultItemToString,
    label,
    onChange,
    selectedItem,
    ...rest
  }: MenuItemRadioGroupProps<Item>,
  forwardRef: ForwardedRef<HTMLLIElement>
) {
  const prefix = usePrefix();
  const context = useContext(MenuContext);

  const [selection, setSelection] = useControllableState({
    value: selectedItem,
    onChange,
    defaultValue: defaultSelectedItem ?? ({} as Item),
  });
  //eslint-disable-next-line  @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
  function handleClick(item, e) {
    setSelection(item);
  }

  useEffect(() => {
    if (!context.state.hasSelectableItems) {
      // @ts-expect-error - TODO: Should we be passing payload?
      context.dispatch({ type: 'enableSelectableItems' });
    }
  }, [context.state.hasSelectableItems, context]);

  const classNames = cx(className, `${prefix}--menu-item-radio-group`);

  return (
    <li className={classNames} role="none" ref={forwardRef}>
      <ul {...rest} role="group" aria-label={label}>
        {items.map((item, i) => (
          <MenuItem
            key={i}
            label={itemToString(item)}
            role="menuitemradio"
            aria-checked={item === selection}
            onClick={(e) => {
              handleClick(item, e);
            }}
          />
        ))}
      </ul>
    </li>
  );
});

MenuItemRadioGroup.propTypes = {
  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * Specify the default selected item. Must match the type of props.items.
   */
  defaultSelectedItem: PropTypes.any,

  /**
   * Converts an item into a string for display.
   */
  itemToString: PropTypes.func,

  /**
   * Provide the options for this radio group. Can be of any type, as long as you provide an appropriate props.itemToString function.
   */
  items: PropTypes.array,

  /**
   * A required label titling this radio group.
   */
  label: PropTypes.string.isRequired,

  /**
   * Provide an optional function to be called when the selection changes.
   */
  onChange: PropTypes.func,

  /**
   * Provide props.selectedItem to control the state of this radio group. Must match the type of props.items.
   */
  selectedItem: PropTypes.any,
};

export interface MenuItemDividerProps extends ComponentProps<'li'> {
  /**
   * Additional CSS class names.
   */
  className?: string;
}

export const MenuItemDivider = forwardRef<HTMLLIElement, MenuItemDividerProps>(
  function MenuItemDivider({ className, ...rest }, forwardRef) {
    const prefix = usePrefix();

    const classNames = cx(className, `${prefix}--menu-item-divider`);

    return (
      <li {...rest} className={classNames} role="separator" ref={forwardRef} />
    );
  }
);

MenuItemDivider.propTypes = {
  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,
};



File: Menu/Menu-test.js


/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useState } from 'react';
import { Menu, MenuItem, MenuItemSelectable, MenuItemRadioGroup } from './';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitForPosition } from '../ListBox/test-helpers';

function DynamicMenu() {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  return (
    <>
      <button
        onClick={() => {
          setItems([0, 1, 2, 3, 11, 4, 5, 6, 9]);
        }}>
        add menu items
      </button>
      <Menu open>
        {items.map((item) => (
          <MenuItem key={item} label={item} />
        ))}
      </Menu>
    </>
  );
}

describe('Menu', () => {
  describe('renders as expected', () => {
    it('should place a className on the outermost element', () => {
      render(<Menu className="custom-class" open />);

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector('.custom-class')).toBeDefined();
    });

    it('should spread props onto ul', () => {
      render(<Menu data-testid="test-id" open />);

      expect(screen.getByRole('menu')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('have an id when one is provided', () => {
      render(<Menu id="test-id" open />);

      expect(screen.getByRole('menu')).toHaveAttribute('id', 'test-id');
    });

    it('should call onClose on key down', async () => {
      const onClose = jest.fn();
      render(
        <Menu open onClose={onClose}>
          <MenuItem label="item" />
        </Menu>
      );

      await userEvent.type(screen.getByRole('menuitem'), '{enter}');

      expect(onClose).toHaveBeenCalled();
    });

    it('should call onClose on click', async () => {
      const onClose = jest.fn();
      render(
        <Menu open onClose={onClose}>
          <MenuItem label="item" />
        </Menu>
      );

      await userEvent.click(screen.getByRole('menuitem'));

      expect(onClose).toHaveBeenCalled();
    });

    it('should be open if open is supplied', () => {
      render(<Menu open />);

      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('should change size based on size prop', () => {
      render(<Menu open size="lg" />);

      expect(screen.getByRole('menu')).toHaveClass('cds--menu--lg');
    });

    it('should add border class when border prop is true', () => {
      render(<Menu open border />);

      expect(screen.getByRole('menu')).toHaveClass('cds--menu--border');
    });

    it('should add background token class when backgroundToken is "background"', () => {
      render(<Menu open backgroundToken="background" />);

      expect(screen.getByRole('menu')).toHaveClass(
        'cds--menu--background-token__background'
      );
    });

    it('should not add background token class when backgroundToken is "layer"', () => {
      render(<Menu open backgroundToken="layer" />);

      expect(screen.getByRole('menu')).not.toHaveClass(
        'cds--menu--background-token__background'
      );
    });

    it('should append to target element', () => {
      const el = document.createElement('div');
      document.body.appendChild(el);
      el.classList.add('custom-class');
      render(<Menu open target={el} />);

      // eslint-disable-next-line testing-library/no-node-access
      expect(document.querySelector('.custom-class')).toBeInTheDocument();
      document.body.removeChild(el);
    });

    it('should not call onClose when relatedTarget is null on blur', () => {
      const onClose = jest.fn();
      render(
        <Menu open onClose={onClose} label="Test Menu">
          <MenuItem label="item" />
        </Menu>
      );

      const menu = screen.getByRole('menu');
      fireEvent.blur(menu, { relatedTarget: null });

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Submenu behavior', () => {
    beforeEach(async () => {
      jest.useFakeTimers();
      render(
        <Menu open>
          <MenuItem label="Submenu">
            <MenuItem label="Item" />
          </MenuItem>
        </Menu>
      );
      await waitForPosition();
    });
    afterEach(() => {
      jest.useRealTimers();
    });
    it('should only show parent and not then submenu when not hovered', () => {
      const menus = screen.getAllByRole('menu');
      expect(menus.length).toBe(2);
      expect(menus[0]).toHaveClass('cds--menu--open');
      expect(menus[1]).not.toHaveClass('cds--menu--open');
    });

    it('should show sub menu when hovered for hoverIntentDelay', async () => {
      const menus = screen.getAllByRole('menu');
      await act(() =>
        fireEvent.mouseEnter(
          screen.getByRole('menuitem', { name: 'Submenu Submenu' })
        )
      );
      expect(menus[0]).toHaveClass('cds--menu--open');
      expect(menus[1]).not.toHaveClass('cds--menu--open');

      await act(() => jest.runOnlyPendingTimers());
      expect(menus[0]).toHaveClass('cds--menu--open');
      expect(menus[1]).toHaveClass('cds--menu--open');
    });

    it('should close sub menu on leave after leaveIntentDelay', async () => {
      const menus = screen.getAllByRole('menu');
      await act(() => {
        fireEvent.mouseEnter(
          screen.getByRole('menuitem', { name: 'Submenu Submenu' })
        );
        jest.runOnlyPendingTimers();
      });
      expect(menus[0]).toHaveClass('cds--menu--open');
      expect(menus[1]).toHaveClass('cds--menu--open');

      await act(() => {
        fireEvent.mouseLeave(
          screen.getByRole('menuitem', { name: 'Submenu Submenu' })
        );
        jest.runOnlyPendingTimers();
      });
      expect(menus[0]).toHaveClass('cds--menu--open');
      expect(menus[1]).not.toHaveClass('cds--menu--open');
    });

    it('should cancel close sub menu on leave and reenter before leaveIntentDelay', async () => {
      const menus = screen.getAllByRole('menu');
      await act(() => {
        fireEvent.mouseEnter(
          screen.getByRole('menuitem', { name: 'Submenu Submenu' })
        );
        jest.runOnlyPendingTimers();
      });
      expect(menus[0]).toHaveClass('cds--menu--open');
      expect(menus[1]).toHaveClass('cds--menu--open');

      await act(() => {
        fireEvent.mouseLeave(
          screen.getByRole('menuitem', { name: 'Submenu Submenu' })
        );
        fireEvent.mouseEnter(
          screen.getByRole('menuitem', { name: 'Submenu Submenu' })
        );
        jest.runOnlyPendingTimers();
      });
      expect(menus[0]).toHaveClass('cds--menu--open');
      expect(menus[1]).toHaveClass('cds--menu--open');
    });
  });
});

describe('MenuItem', () => {
  describe('renders as expected', () => {
    it('should be disabled', () => {
      render(
        <Menu open>
          <MenuItem label="item" disabled />
        </Menu>
      );

      expect(screen.getByRole('menuitem')).toHaveAttribute(
        'aria-disabled',
        'true'
      );

      expect(screen.getByRole('menuitem')).toHaveClass(
        'cds--menu-item--disabled'
      );
    });

    it('should change kind based on prop', () => {
      render(
        <Menu open>
          <MenuItem label="item" kind="danger" />
        </Menu>
      );

      expect(screen.getByRole('menuitem')).toHaveClass(
        'cds--menu-item--danger'
      );
    });

    it('should render label', () => {
      render(
        <Menu open>
          <MenuItem label="item" />
        </Menu>
      );

      expect(screen.getByText('item')).toBeInTheDocument();
    });
  });

  it('should call MenuItemRadioGroup onChange once', async () => {
    const onChange = jest.fn();

    render(
      <Menu open label="Menu">
        <MenuItem label="Menu">
          <MenuItemRadioGroup
            label="MenuItemRadioGroup"
            items={[
              { label: 'Item 1', value: '1' },
              { label: 'Item 2', value: '2' },
            ]}
            onChange={onChange}
            itemToString={(item) => item.label}
          />
        </MenuItem>
      </Menu>
    );

    await userEvent.click(screen.getByTitle('Menu'));
    await userEvent.click(screen.getByTitle('Item 1'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should call MenuItemSelectable onChange once with correct value', async () => {
    const onChange = jest.fn();

    const { rerender } = render(
      <Menu open label="Menu">
        <MenuItemSelectable
          label="Item 1"
          onChange={onChange}
          selected={false}
        />
      </Menu>
    );

    await userEvent.click(screen.getByTitle('Item 1'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);

    onChange.mockClear();
    rerender(
      <Menu open label="Menu">
        <MenuItemSelectable label="Item 1" onChange={onChange} selected />
      </Menu>
    );

    await userEvent.click(screen.getByTitle('Item 1'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(false);
  });

  describe('accessibility', () => {
    it('should focus the first focusable menu item on open', async () => {
      render(
        <Menu open label="Menu">
          <MenuItem label="Item 1" />
          <MenuItem label="Item 2" />
        </Menu>
      );

      const item1 = await screen.findByRole('menuitem', { name: 'Item 1' });
      expect(document.activeElement).toBe(item1);
    });

    it('should skip disabled items when determining first focusable', () => {
      render(
        <Menu open label="Menu">
          <MenuItem label="Disabled" disabled />
          <MenuItem label="Focusable" />
        </Menu>
      );

      const items = screen.getAllByRole('menuitem');
      expect(items[0]).toHaveAttribute('tabindex', '-1');
      expect(items[1]).toHaveAttribute('tabindex', '0');
    });

    it('moves focus to submenu when opening via ArrowRight key', async () => {
      render(
        <Menu open label="Menu">
          <MenuItem label="Parent">
            <MenuItem label="Child" />
          </MenuItem>
        </Menu>
      );

      const parentItem = screen.getAllByRole('menuitem')[0];
      parentItem.focus();
      expect(parentItem).toHaveFocus();

      await userEvent.keyboard('{ArrowRight}');

      const child = screen.getByRole('menuitem', { name: 'Child' });
      expect(child).toBeVisible();

      expect(child).toHaveFocus();
    });
  });

  it('navigates through dynamically added MenuItems in the correct order', async () => {
    render(<DynamicMenu />);

    // add the new items
    await userEvent.click(
      screen.getByRole('button', { name: /add menu items/i })
    );

    const menu = screen.getByRole('menu');
    menu.focus();

    const expectedOrder = ['0', '1', '2', '3', '11', '4', '5', '6', '9'];
    for (const label of expectedOrder) {
      await userEvent.keyboard('{ArrowDown}');
      expect(screen.getByRole('menuitem', { name: label })).toHaveFocus();
    }
  });
});



File: Menu/index.ts


/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Menu, type MenuProps } from './Menu';
import {
  MenuItem,
  MenuItemDivider,
  MenuItemGroup,
  MenuItemRadioGroup,
  MenuItemSelectable,
  type MenuItemProps,
  type MenuItemDividerProps,
  type MenuItemGroupProps,
  type MenuItemRadioGroupProps,
  type MenuItemSelectableProps,
} from './MenuItem';

export {
  Menu,
  MenuItem,
  MenuItemDivider,
  MenuItemGroup,
  MenuItemRadioGroup,
  MenuItemSelectable,
  type MenuProps,
  type MenuItemProps,
  type MenuItemDividerProps,
  type MenuItemGroupProps,
  type MenuItemRadioGroupProps,
  type MenuItemSelectableProps,
};
export default Menu;



File: Menu/Menu.tsx


/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  RefObject,
} from 'react';
import { createPortal } from 'react-dom';

import { keys, match } from '../../internal/keyboard';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';

import { MenuContext, menuReducer } from './MenuContext';
import { useLayoutDirection } from '../LayoutDirection';
import { canUseDOM } from '../../internal/environment';

const spacing = 8; // distance to keep to window edges, in px

export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Specify the background token to use. Default is 'layer'.
   */
  backgroundToken?: 'layer' | 'background';

  /**
   * Specify whether a border should be rendered on the popover
   */
  border?: boolean;

  /**
   * The ref of the containing element, used for positioning and alignment of the menu
   */
  containerRef?: RefObject<HTMLDivElement | null>;
  /**
   * A collection of MenuItems to be rendered within this Menu.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * A label describing the Menu.
   */
  label: string;

  /**
   * Specify how the menu should align with the button element
   */
  menuAlignment?: string;

  /**
   * @deprecated Menus now always support both icons as well as selectable items and nesting.
   * The mode of this menu. Defaults to full.
   * `full` supports nesting and selectable menu items, but no icons.
   * `basic` supports icons but no nesting or selectable menu items.
   *
   * **This prop is not intended for use and will be set by the respective implementation (like useContextMenu, MenuButton, and ComboButton).**
   */
  mode?: 'full' | 'basic';

  /**
   * Provide an optional function to be called when the Menu should be closed,
   * including if the Menu is blurred, the user presses escape, or the Menu is
   * a submenu and the user presses ArrowLeft.
   */
  onClose?: () => void;

  /**
   * Provide an optional function to be called when the Menu is opened.
   */
  onOpen?: () => void;

  /**
   * Whether the Menu is open or not.
   */
  open?: boolean;

  /**
   * Specify the size of the Menu.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * Specify a DOM node where the Menu should be rendered in. Defaults to document.body.
   */
  target?: Element;

  /**
   * Specify the x position of the Menu. Either pass a single number or an array with two numbers describing your activator's boundaries ([x1, x2])
   */
  x?: number | [number, number];

  /**
   * Specify the y position of the Menu. Either pass a single number or an array with two numbers describing your activator's boundaries ([y1, y2])
   */
  y?: number | [number, number];

  legacyAutoalign?: boolean;
}

const Menu = forwardRef<HTMLUListElement, MenuProps>(function Menu(
  {
    backgroundToken = 'layer',
    border = false,
    children,
    className,
    containerRef,
    label,
    menuAlignment,
    onClose,
    onOpen,
    open,
    size = 'sm',
    legacyAutoalign = 'true',
    target = canUseDOM && document.body,
    x = 0,
    y = 0,
    ...rest
  },
  forwardRef
) {
  const prefix = usePrefix();

  const focusReturn = useRef<HTMLElement | null>(null);

  const context = useContext(MenuContext);

  const isRoot = context.state.isRoot;

  const menuSize = isRoot ? size : context.state.size;

  const [childState, childDispatch] = useReducer(menuReducer, {
    ...context.state,
    isRoot: false,
    size,
    requestCloseRoot: isRoot ? handleClose : context.state.requestCloseRoot,
  });
  const childContext = useMemo(() => {
    return {
      state: childState,
      dispatch: childDispatch,
    };
  }, [childState, childDispatch]);

  const menu = useRef<HTMLUListElement>(null);
  const ref = useMergedRefs([forwardRef, menu]);

  const [position, setPosition] = useState([-1, -1]);
  const focusableItems = childContext.state.items.filter(
    (item) => !item.disabled && item.ref.current
  );

  // Getting the width from the parent container element - controlled
  let actionButtonWidth: number;
  if (containerRef?.current) {
    const { width: w } = containerRef.current.getBoundingClientRect();
    actionButtonWidth = w;
  }

  // Set RTL based on the document direction or `LayoutDirection`
  const { direction } = useLayoutDirection();

  function returnFocus() {
    if (focusReturn.current) {
      focusReturn.current.focus();
    }
  }

  function handleOpen() {
    if (menu.current) {
      focusReturn.current = document.activeElement as HTMLElement;
      if (legacyAutoalign) {
        const pos = calculatePosition();
        if (
          (document?.dir === 'rtl' || direction === 'rtl') &&
          !rest?.id?.includes('MenuButton')
        ) {
          menu.current.style.insetInlineStart = `initial`;
          menu.current.style.insetInlineEnd = `${pos[0]}px`;
        } else {
          menu.current.style.insetInlineStart = `${pos[0]}px`;
          menu.current.style.insetInlineEnd = `initial`;
        }

        menu.current.style.insetBlockStart = `${pos[1]}px`;
        setPosition(pos);
      }

      menu.current.focus();

      if (onOpen) {
        onOpen();
      }
    }
  }

  function handleClose() {
    returnFocus();

    if (onClose) {
      onClose();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    e.stopPropagation();

    // if the user presses escape or this is a submenu
    // and the user presses ArrowLeft, close it
    if (
      (match(e, keys.Escape) || (!isRoot && match(e, keys.ArrowLeft))) &&
      onClose
    ) {
      handleClose();
    } else {
      focusItem(e);
    }
  }

  function focusItem(e?: React.KeyboardEvent<HTMLUListElement>) {
    const validItems = focusableItems?.filter((item) => item?.ref?.current);
    if (!validItems?.length) return;

    const currentItem = focusableItems.findIndex((item) =>
      item.ref?.current?.contains(document.activeElement)
    );
    let indexToFocus = currentItem;

    // if currentItem is -1, no menu item is focused yet.
    // in this case, the first item should receive focus.
    if (currentItem === -1) {
      indexToFocus = 0;
    } else if (e) {
      if (match(e, keys.ArrowUp)) {
        indexToFocus = indexToFocus - 1;
      }
      if (match(e, keys.ArrowDown)) {
        indexToFocus = indexToFocus + 1;
      }
    }

    if (indexToFocus < 0) {
      indexToFocus = validItems.length - 1;
    }
    if (indexToFocus >= validItems.length) {
      indexToFocus = 0;
    }

    if (indexToFocus !== currentItem) {
      const nodeToFocus = validItems[indexToFocus];
      nodeToFocus?.ref?.current?.focus();
      e?.preventDefault();
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLUListElement>) {
    if (
      open &&
      onClose &&
      isRoot &&
      e.relatedTarget &&
      !menu.current?.contains(e.relatedTarget)
    ) {
      handleClose();
    }
  }

  function fitValue(range: number[], axis: 'x' | 'y') {
    if (!menu.current) {
      return;
    }

    const { width, height } = menu.current.getBoundingClientRect();
    const alignment = isRoot ? 'vertical' : 'horizontal';

    const axes = {
      x: {
        max: window.innerWidth,
        size: width,
        anchor: alignment === 'horizontal' ? range[1] : range[0],
        reversedAnchor: alignment === 'horizontal' ? range[0] : range[1],
        offset: 0,
      },
      y: {
        max: window.innerHeight,
        size: height,
        anchor: alignment === 'horizontal' ? range[0] : range[1],
        reversedAnchor: alignment === 'horizontal' ? range[1] : range[0],
        offset: isRoot ? 0 : 4, // top padding in menu, used to align the menu items
      },
    };

    // Avoid that the Menu render incorrectly when the position is set in the right side of the screen
    if (
      actionButtonWidth &&
      actionButtonWidth < axes.x.size &&
      (menuAlignment === 'bottom' || menuAlignment === 'top')
    ) {
      axes.x.size = actionButtonWidth;
    }

    // if 'axes.x.anchor' is lower than 87px dynamically switch render side
    if (
      actionButtonWidth &&
      (menuAlignment === 'bottom-end' || menuAlignment === 'top-end') &&
      axes.x.anchor >= 87 &&
      actionButtonWidth < axes.x.size
    ) {
      const diff = axes.x.anchor + axes.x.reversedAnchor;
      axes.x.anchor = axes.x.anchor + diff;
    }

    const { max, size, anchor, reversedAnchor, offset } = axes[axis];

    // get values for different scenarios, set to false if they don't work
    const options = [
      // towards max (preferred)
      max - spacing - size - anchor >= 0 ? anchor - offset : false,

      // towards min / reversed (first fallback)
      reversedAnchor - size >= 0 ? reversedAnchor - size + offset : false,

      // align at max (second fallback)
      max - spacing - size,
    ];

    const topAlignment =
      menuAlignment === 'top' ||
      menuAlignment === 'top-end' ||
      menuAlignment === 'top-start';

    // If the tooltip is not visible in the top, switch to the bottom
    if (
      typeof options[0] === 'number' &&
      topAlignment &&
      options[0] >= 0 &&
      !options[1] &&
      axis === 'y'
    ) {
      menu.current.style.transform = 'translate(0)';
    } else if (topAlignment && !options[0] && axis === 'y') {
      options[0] = anchor - offset;
    }

    // Previous array `options`, has at least one item that is a number (the last one - second fallback).
    // That guarantees that the return of `find()` will always be a number
    // and we can safely add the numeric casting `as number`.
    const bestOption = options.find((option) => option !== false) as number;

    return bestOption >= spacing ? bestOption : spacing;
  }

  function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }

  function getPosition(x: number | (number | null | undefined)[]) {
    if (Array.isArray(x)) {
      // has to be of length 2
      const filtered = x.filter(notEmpty);
      if (filtered.length === 2) {
        return filtered;
      } else {
        return;
      }
    } else {
      return [x, x];
    }
  }

  function calculatePosition() {
    const ranges = {
      x: getPosition(x),
      y: getPosition(y),
    };

    if (!ranges.x || !ranges.y) {
      return [-1, -1];
    }

    return [fitValue(ranges.x, 'x') ?? -1, fitValue(ranges.y, 'y') ?? -1];
  }

  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => {
        if (focusableItems.length > 0) {
          focusItem();
        }
      });

      return () => cancelAnimationFrame(raf);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, focusableItems]);

  useEffect(() => {
    if (open) {
      handleOpen();
    } else {
      // reset position when menu is closed in order for the --shown
      // modifier to be applied correctly
      setPosition([-1, -1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const classNames = cx(
    className,
    `${prefix}--menu`,
    `${prefix}--menu--${menuSize}`,
    {
      // --open sets visibility and --shown sets opacity.
      // visibility is needed for focusing elements.
      // opacity is only set once the position has been set correctly
      // to avoid a flicker effect when opening.
      [`${prefix}--menu--box-shadow-top`]:
        menuAlignment && menuAlignment.slice(0, 3) === 'top',
      [`${prefix}--menu--open`]: open,
      [`${prefix}--menu--shown`]:
        (open && !legacyAutoalign) || (position[0] >= 0 && position[1] >= 0),
      [`${prefix}--menu--with-icons`]: childContext.state.hasIcons,
      [`${prefix}--menu--with-selectable-items`]:
        childContext.state.hasSelectableItems,
      [`${prefix}--autoalign`]: !legacyAutoalign,
      [`${prefix}--menu--border`]: border,
      [`${prefix}--menu--background-token__background`]:
        backgroundToken === 'background',
    }
  );

  const rendered = (
    <MenuContext.Provider value={childContext}>
      <ul
        {...rest}
        className={classNames}
        role="menu"
        ref={ref}
        aria-label={label}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}>
        {children}
      </ul>
    </MenuContext.Provider>
  );

  if (!target) {
    return rendered;
  }

  return isRoot ? (open && createPortal(rendered, target)) || null : rendered;
});

Menu.propTypes = {
  /**
   * Specify the background token to use. Default is 'layer'.
   */
  backgroundToken: PropTypes.oneOf(['layer', 'background']),

  /**
   * Specify whether a border should be rendered on the menu
   */
  border: PropTypes.bool,

  /**
   * A collection of MenuItems to be rendered within this Menu.
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * A label describing the Menu.
   */
  label: PropTypes.string,

  /**
   * Specify how the menu should align with the button element
   */
  menuAlignment: PropTypes.string,

  /**
   * **Deprecated**: Menus now always support both icons as well as selectable items and nesting.
   * The mode of this menu. Defaults to full.
   * `full` supports nesting and selectable menu items, but no icons.
   * `basic` supports icons but no nesting or selectable menu items.
   *
   * **This prop is not intended for use and will be set by the respective implementation (like useContextMenu, MenuButton, and ComboButton).**
   */
  mode: deprecate(
    PropTypes.oneOf(['full', 'basic']),
    'Menus now always support both icons as well as selectable items and nesting.'
  ),

  /**
   * Provide an optional function to be called when the Menu should be closed,
   * including if the Menu is blurred, the user presses escape, or the Menu is
   * a submenu and the user presses ArrowLeft.
   */
  onClose: PropTypes.func,

  /**
   * Provide an optional function to be called when the Menu is opened.
   */
  onOpen: PropTypes.func,

  /**
   * Whether the Menu is open or not.
   */
  open: PropTypes.bool,

  /**
   * Specify the size of the Menu.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),

  /**
   * Specify a DOM node where the Menu should be rendered in. Defaults to document.body.
   */
  target: PropTypes.object,

  /**
   * Specify the x position of the Menu. Either pass a single number or an array with two numbers describing your activator's boundaries ([x1, x2])
   */
  x: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),

  /**
   * Specify the y position of the Menu. Either pass a single number or an array with two numbers describing your activator's boundaries ([y1, y2])
   */
  y: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
};

export { Menu };



File: Menu/Menu.mdx


import { ArgTypes, Meta } from '@storybook/addon-docs/blocks';
import Menu from '../Menu';
import * as MenuStories from './Menu.stories';

<Meta isTemplate />

# Menu

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Menu)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Positioning](#positioning)
- [Subcomponents](#subcomponents)
  - [MenuItem](#menuitem)
  - [MenuItemDivider](#menuitemdivider)
  - [MenuItemGroup](#menuitemgroup)
  - [MenuItemSelectable](#menuitemselectable)
  - [MenuItemRadioGroup](#menuitemradiogroup)
- [Context menu (right-click menu)](#context-menu-right-click-menu)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

`Menu` is a versatile component that can be used in a variety of situations. It
implements the
[menu design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) defined
in the ARIA Authoring Practices Guide (APG).

The `Menu` component's `children` must be a collection of any of these
subcomponents:

- [MenuItem](#menuitem)
- [MenuItemDivider](#menuitemdivider)
- [MenuItemGroup](#menuitemgroup)
- [MenuItemSelectable](#menuitemselectable)
- [MenuItemRadioGroup](#menuitemradiogroup)

## Positioning

You must provide a reference point for the `Menu` to position itself at. The
props `x` and `y` either accept a single number each or an array of two numbers.

The latter option is used to specify the trigger boundaries. For example, Carbon
uses this for the
[next version of OverflowMenu](/story/experimental-feature-flags-overflowmenu--overflow-menu)
where we pass `[x, x + width]` and `[y, y + height]` of the trigger button. This
way, the `Menu` is able to automatically determine its ideal position on the
screen (which side to open at and in which direction) while always staying
visually attached to the trigger. Each `MenuItem` that has `children` and
therefore a submenu uses the same approach under the hood to correctly position
the submenu.

## Subcomponents

### MenuItem

A `MenuItem` renders a basic menu item with a label an optionally a shortcut
hint (_note: the component only renders this hint and doesn't actually register
the shortcut in the browser_). Each `MenuItem` can be clicked unless it's marked
as `disabled`. If it triggers a destructive action, you can pass it
`kind="danger"` to highlight it specially on hover and focus.

```jsx
<Menu open>
  <MenuItem label="Copy" shortcut="⌘C" />
  <MenuItem label="Paste" shortcut="⌘V" disabled />
  <MenuItem label="Delete" kind="danger" />
</Menu>
```

In order to render a submenu, you can pass any of the above mentioned
subcomponents as `children` of a `MenuItem`.

```jsx
<Menu open>
  <MenuItem label="Open" />
  <MenuItem label="Save" />
  <MenuItem label="Import">
    <MenuItem label="Image" />
    <MenuItem label="Movie" />
    <MenuItem label="Text" />
  </MenuItem>
</Menu>
```

### MenuItemDivider

The `MenuItemDivider` renders a thin dividing line, visually separating menu
items. Use this to enhance grouping of related items.

```jsx
<Menu open>
  <MenuItem label="Cut" />
  <MenuItem label="Copy" />
  <MenuItem label="Paste" />
  <MenuItemDivider />
  <MenuItem label="Delete" kind="danger" />
</Menu>
```

### MenuItemGroup

You can logically group multiple menu items by wrapping them inside a
`MenuItemGroup`. This doesn't affect the visual rendering but can tremendously
improve the experience for assistive technology users. You'll always want to use
a `MenuItemGroup` if you have multiple
[`MenuItemSelectable`](#menuitemselectable) that are related to each other.

### MenuItemSelectable

`MenuItemSelectable` is a checkbox in a menu context. Each `MenuItemSelectable`
can be checked and unchecked unrelated to other items. If multiple items are
related to each other, you'll want to wrap them in a `MenuItemGroup` for
improved accessibility.

```jsx
<Menu open>
  <MenuItemGroup label="Font style">
    <MenuItemSelectable label="Bold" selected />
    <MenuItemSelectable label="Italic" />
  </MenuItemGroup>
</Menu>
```

### MenuItemRadioGroup

`MenuItemRadioGroup` is a radio button group in a menu context. Only one item
can be selected at a time. The component automatically wraps itself in a
`MenuItemGroup`, so you won't have to nest it manually.

```jsx
<Menu open>
  <MenuItemRadioGroup
    label="Font family"
    items={['Sans', 'Serif', 'Mono']}
    selectedItem="Sans"
  />
  <MenuItemDivider />
  <MenuItemRadioGroup
    label="Text decoration"
    items={['None', 'Overline', 'Line-through', 'Underline']}
    selectedItem="None"
  />
</Menu>
```

The `items` prop is designed to accept arbitrary items to best match your data
structure. If you pass your items as anything that doesn't support `.toString()`
out of the box, you'll need to pass a custom `itemToString` function that will
be used for rendering the labels.

```jsx
const items = [
  { weight: 100, label: 'Thin' },
  { weight: 200, label: 'Extralight' },
  { weight: 300, label: 'Light' },
  { weight: 400, label: 'Regular' },
  { weight: 500, label: 'Medium' },
  { weight: 600, label: 'Semibold' },
  { weight: 700, label: 'Bold' },
];

<MenuItemRadioGroup
  label="Font weight"
  items={items}
  selectedItem={items[3]}
  itemToString={(item) => item.label}
/>;
```

## Context menu (right-click menu)

The `Menu` component is suited to be used as a context menu for complex web
applications. To make this easy, Carbon provides a
[`useContextMenu`](/story/hooks-usecontextmenu--use-context-menu) react hook.
Please refer to the
[hook's documentation](/docs/hooks-usecontextmenu--use-context-menu) for more
details.

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Menu/Menu.mdx).



File: Menu/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  tall
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-menu--default',
    },
  ]}
/>



