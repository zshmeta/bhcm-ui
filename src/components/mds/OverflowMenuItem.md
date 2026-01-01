File: OverflowMenuItem/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import OverflowMenuItem from './OverflowMenuItem';

export default OverflowMenuItem;
export { OverflowMenuItem };



File: OverflowMenuItem/OverflowMenuItem.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { keys, match } from '../../internal/keyboard';
import { usePrefix } from '../../internal/usePrefix';
import { warning } from '../../internal/warning';
import { Text } from '../Text';

export interface OverflowMenuItemProps
  extends React.HTMLAttributes<HTMLElement> {
  /**
   * The CSS class name to be placed on the button element
   */
  className?: string;

  /**
   * A callback to tell the parent menu component that the menu should be closed.
   */
  closeMenu?: () => void;

  /**
   * `true` to make this menu item disabled.
   */
  disabled?: boolean;

  handleOverflowMenuItemFocus?: (options: {
    currentIndex?: number;
    direction: number;
  }) => void;

  /**
   * `true` to make this menu item a divider.
   */
  hasDivider?: boolean;

  /**
   * If given, overflow item will render as a link with the given href
   */
  href?: string;

  index?: number;

  /**
   * The text to show for the menu item
   */
  itemText?: React.ReactNode;

  /**
   * `true` to make this menu item a danger button.
   */
  isDelete?: boolean;

  /**
   * accepts a ref to the button element
   */
  ref?: (element: HTMLElement) => void;

  /**
   * `true` to require the title attribute.
   */
  requireTitle?: boolean;

  /**
   * The title attribute.
   */
  title?: string;

  /**
   * The CSS class name to be placed on the wrapper element
   */
  wrapperClassName?: string;
}

const frFn = forwardRef<HTMLElement, OverflowMenuItemProps>;

const OverflowMenuItem = frFn((props, ref) => {
  const {
    className,
    closeMenu,
    disabled = false,
    handleOverflowMenuItemFocus,
    hasDivider = false,
    href,
    isDelete = false,
    index,
    itemText = 'Provide itemText',
    onClick = () => {},
    onKeyDown = () => {},
    requireTitle,
    title,
    wrapperClassName,
    ...rest
  } = props;
  const prefix = usePrefix();

  function setTabFocus(evt) {
    if (match(evt, keys.ArrowDown)) {
      handleOverflowMenuItemFocus?.({
        currentIndex: index,
        direction: 1,
      });
    }
    if (match(evt, keys.ArrowUp)) {
      handleOverflowMenuItemFocus?.({
        currentIndex: index,
        direction: -1,
      });
    }
  }

  function handleClick(evt) {
    onClick(evt);
    if (closeMenu) {
      closeMenu();
    }
  }

  warning(
    !!closeMenu,
    '`<OverflowMenuItem>` detected missing `closeMenu` prop. ' +
      '`closeMenu` is required to let `<OverflowMenu>` close the menu upon actions on `<OverflowMenuItem>`. ' +
      'Please make sure `<OverflowMenuItem>` is a direct child of `<OverflowMenu>.'
  );

  const overflowMenuBtnClasses = cx(
    `${prefix}--overflow-menu-options__btn`,
    className
  );
  const overflowMenuItemClasses = cx(
    `${prefix}--overflow-menu-options__option`,
    {
      [`${prefix}--overflow-menu--divider`]: hasDivider,
      [`${prefix}--overflow-menu-options__option--danger`]: isDelete,
      [`${prefix}--overflow-menu-options__option--disabled`]: disabled,
    },
    wrapperClassName
  );

  const TagToUse = href ? 'a' : 'button';

  const OverflowMenuItemContent = (() => {
    if (typeof itemText !== 'string') {
      return itemText;
    }
    return (
      <div className={`${prefix}--overflow-menu-options__option-content`}>
        {itemText}
      </div>
    );
  })();

  return (
    <Text as="li" className={overflowMenuItemClasses} role="none">
      <TagToUse
        className={overflowMenuBtnClasses}
        disabled={disabled}
        href={href}
        onClick={handleClick}
        onKeyDown={(evt) => {
          setTabFocus(evt);
          onKeyDown(evt);
        }}
        role="menuitem"
        // ref as any: the type of `ref` is `ForwardedRef<HTMLButtonElement>` in `Button` component
        // but `OverflowMenuItem` can be rendered as `a` tag as well, which is `HTMLAnchorElement`
        // so we have to use `any` here
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        ref={ref as any}
        tabIndex={-1}
        // itemText as any: itemText may be a ReactNode, but `title` only accepts string
        // to avoid compatibility issue, we use `any` here. Consider to enforce `itemText` to be `string?`
        // in the next major release
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
        title={requireTitle ? title || (itemText as any) : undefined}
        {...rest}>
        {OverflowMenuItemContent}
      </TagToUse>
    </Text>
  );
});

OverflowMenuItem.propTypes = {
  /**
   * The CSS class name to be placed on the button element
   */
  className: PropTypes.string,

  /**
   * A callback to tell the parent menu component that the menu should be closed.
   */
  closeMenu: PropTypes.func,

  /**
   * `true` to make this menu item disabled.
   */
  disabled: PropTypes.bool,

  handleOverflowMenuItemFocus: PropTypes.func,

  /**
   * `true` to make this menu item a divider.
   */
  hasDivider: PropTypes.bool,

  /**
   * If given, overflow item will render as a link with the given href
   */
  href: PropTypes.string,

  index: PropTypes.number,

  /**
   * `true` to make this menu item a "danger button".
   */
  isDelete: PropTypes.bool,

  /**
   * The text in the menu item.
   */
  itemText: PropTypes.node.isRequired,

  /**
   * event handlers
   */
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,

  /**
   * `true` if this menu item has long text and requires a browser tooltip
   */
  requireTitle: PropTypes.bool,

  /**
   * Specify a title for the OverflowMenuItem
   */
  title: PropTypes.string,

  /**
   * The CSS class name to be placed on the wrapper list item element
   */
  wrapperClassName: PropTypes.string,
};

export default OverflowMenuItem;



File: OverflowMenuItem/OverflowMenuItem-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import OverflowMenuItem from '../OverflowMenuItem';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('OverflowMenuItem - RTL', () => {
  describe('renders as expected', () => {
    it('should support a className on the button node', () => {
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          className="test-item"
        />
      );

      expect(screen.getByRole('menuitem')).toHaveClass('test-item');
    });

    it('should support a className on the outermost node', () => {
      const { container } = render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          wrapperClassName="test-item"
        />
      );

      expect(container.firstChild).toHaveClass('test-item');
    });

    it('should spread extra props on the button node', () => {
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          data-testid="test"
        />
      );

      expect(screen.getByRole('menuitem')).toHaveAttribute(
        'data-testid',
        'test'
      );
    });

    it('should support a className on the anchor node', () => {
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          href="carbondesignsystem.com"
          itemText="one"
          className="test-item"
        />
      );

      expect(screen.getByRole('menuitem')).toHaveClass('test-item');
    });

    it('should spread extra props on the anchor node', () => {
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          href="carbondesignsystem.com"
          data-testid="test"
        />
      );

      expect(screen.getByRole('menuitem')).toHaveAttribute(
        'data-testid',
        'test'
      );
    });

    it('should call closeMenu on click', async () => {
      const closeMenu = jest.fn();
      render(<OverflowMenuItem closeMenu={closeMenu} itemText="one" />);

      await userEvent.click(screen.getByRole('menuitem'));

      expect(closeMenu).toHaveBeenCalled();
    });

    it('should be disabled', () => {
      const { container } = render(
        <OverflowMenuItem closeMenu={jest.fn()} itemText="one" disabled />
      );

      expect(container.firstChild).toHaveClass(
        'cds--overflow-menu-options__option--disabled'
      );

      expect(container.firstChild.firstChild).toHaveProperty('disabled', true);
    });

    it('should have divider', () => {
      const { container } = render(
        <OverflowMenuItem closeMenu={jest.fn()} itemText="one" hasDivider />
      );

      expect(container.firstChild).toHaveClass('cds--overflow-menu--divider');
    });

    it('should be delete button', () => {
      const { container } = render(
        <OverflowMenuItem closeMenu={jest.fn()} itemText="one" isDelete />
      );

      expect(container.firstChild).toHaveClass(
        'cds--overflow-menu-options__option--danger'
      );
    });

    it('should render itemText', () => {
      render(<OverflowMenuItem closeMenu={jest.fn()} itemText="one" />);

      expect(screen.getByText('one')).toBeInTheDocument();
    });

    it('should call onClick', async () => {
      const onClick = jest.fn();
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          onClick={onClick}
        />
      );

      await userEvent.click(screen.getByRole('menuitem'));

      expect(onClick).toHaveBeenCalled();
    });

    it('should call onMouseDown', async () => {
      const onMouseDown = jest.fn();
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          onMouseDown={onMouseDown}
        />
      );

      await userEvent.click(screen.getByRole('menuitem'));

      expect(onMouseDown).toHaveBeenCalled();
    });

    it('should call onMouseEnter', async () => {
      const onMouseEnter = jest.fn();
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          onMouseEnter={onMouseEnter}
        />
      );

      await userEvent.click(screen.getByRole('menuitem'));

      expect(onMouseEnter).toHaveBeenCalled();
    });

    it('should call onMouseUp', async () => {
      const onMouseUp = jest.fn();
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          onMouseUp={onMouseUp}
        />
      );

      await userEvent.click(screen.getByRole('menuitem'));

      expect(onMouseUp).toHaveBeenCalled();
    });

    it('should call onFocus', async () => {
      const onFocus = jest.fn();
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          onFocus={onFocus}
        />
      );

      await userEvent.click(screen.getByRole('menuitem'));

      expect(onFocus).toHaveBeenCalled();
    });

    it('should call onKeyDown', async () => {
      const onKeyDown = jest.fn();
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          onKeyDown={onKeyDown}
        />
      );

      await userEvent.type(screen.getByRole('menuitem'), '{enter}');

      expect(onKeyDown).toHaveBeenCalled();
    });

    it('should call onKeyUp', async () => {
      const onKeyUp = jest.fn();
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          onKeyUp={onKeyUp}
        />
      );

      await userEvent.type(screen.getByRole('menuitem'), '{enter}');

      expect(onKeyUp).toHaveBeenCalled();
    });

    it('should have title', () => {
      render(
        <OverflowMenuItem
          closeMenu={jest.fn()}
          itemText="one"
          requireTitle
          title="menu item"
        />
      );

      expect(screen.getByRole('menuitem')).toHaveAttribute(
        'title',
        'menu item'
      );
    });
  });
});



File: OverflowMenuItem/migrate-to-7.x.md


# Props

`floatingMenu` prop that is set from `<OverflowMenu>` has been gone, and
overflow menu always works as a floating menu.



