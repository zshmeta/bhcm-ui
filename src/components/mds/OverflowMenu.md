File: OverflowMenu/OverflowMenu.mdx


import { Story, ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as OverflowMenuStories from './OverflowMenu.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# OverflowMenu

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/OverflowMenu)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/overflow-menu/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/overflow-menu/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [`data-floating-menu-container`](#data-floating-menu-container)
- [Render Custom Icon](#render-custom-icon)
- [Customizing the tooltip](#customizing-the-tooltip)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

The overflow menu component is a clickable element that contains additional
options that are available to the user, but there is a space constraint.

<Canvas
  of={OverflowMenuStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(OverflowMenuStories.Default),
    },
  ]}
/>

### `data-floating-menu-container`

`OverflowMenu` uses React Portals to render the overflow menu into the DOM. To
determine where in the DOM the menu will be placed, it looks for a parent
element with the `data-floating-menu-container` attribute. If no parent with
this attribute is found, the menu will be placed on `document.body`.

## Render Custom Icon

<Canvas
  of={OverflowMenuStories.RenderCustomIcon}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(OverflowMenuStories.RenderCustomIcon),
    },
  ]}
/>

## Customizing the tooltip

The `OverflowMenu` uses an `IconButton` under the hood, which means it can
accept any props that an `IconButton` can receive and will successfully pass
those forward. To modify the tooltip's alignment, you may make use of the
`align` property as described in the `IconButton` props:

```jsx
<OverflowMenu aria-label="overflow-menu" align="bottom">
  <OverflowMenuItem itemText="Stop app" />
  <OverflowMenuItem itemText="Restart app" />
  <OverflowMenuItem itemText="Rename app" />
  <OverflowMenuItem itemText="Clone and move app" disabled requireTitle />
  <OverflowMenuItem itemText="Edit routes and access" requireTitle />
  <OverflowMenuItem hasDivider isDelete itemText="Delete app" />
</OverflowMenu>
```

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/OverflowMenu/OverflowMenu.mdx).



File: OverflowMenu/OverflowMenu-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Filter } from '@carbon/icons-react';
import OverflowMenu from './OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('OverflowMenu', () => {
  describe('Renders as expected', () => {
    const closeMenuMock = jest.fn();
    it('should support a custom `className` prop on the button element', () => {
      render(
        <OverflowMenu open aria-label="Overflow menu" className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );
      expect(screen.getByRole('button')).toHaveClass('extra-class');
    });

    it('should forward ref', () => {
      const ref = React.createRef();
      render(
        <OverflowMenu open ref={ref} aria-label="Overflow menu">
          <OverflowMenuItem itemText="one" />
          <OverflowMenuItem itemText="two" />
        </OverflowMenu>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('should spread extra props on the button element', () => {
      render(
        <OverflowMenu
          data-testid="test"
          aria-label="Overflow menu"
          className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );
      expect(screen.getByRole('button')).toHaveAttribute('data-testid', 'test');
    });

    it('should always use button kind=ghost', () => {
      render(
        <OverflowMenu
          data-testid="test"
          aria-label="Overflow menu"
          className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      expect(screen.getByRole('button')).not.toHaveClass('cds--btn--primary');
      expect(screen.getByRole('button')).toHaveClass('cds--btn--ghost');
    });

    it('should flip menu alignment', async () => {
      render(
        <OverflowMenu
          flipped={true}
          aria-label="Overflow menu"
          className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      await userEvent.click(screen.getByRole('button'));

      expect(
        // eslint-disable-next-line testing-library/no-node-access
        document.querySelector('.cds--overflow-menu--flip')
      ).toBeInTheDocument();
    });

    it('should call onClick', async () => {
      const onClick = jest.fn();
      render(
        <OverflowMenu
          aria-label="Overflow menu"
          className="extra-class"
          onClick={onClick}>
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      await userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalled();
    });

    it('should call onClose', async () => {
      const onClose = jest.fn();
      render(
        <OverflowMenu
          aria-label="Overflow menu"
          className="extra-class"
          onClose={onClose}>
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      await userEvent.click(screen.getByRole('button'));
      await userEvent.click(screen.getByText('one'));
      expect(onClose).toHaveBeenCalled();
    });

    it('should call onClose only once when menu is closed', async () => {
      const onClose = jest.fn();
      render(
        <OverflowMenu
          aria-label="Overflow menu"
          className="extra-class"
          onClose={onClose}>
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      await userEvent.click(screen.getByRole('button'));
      await userEvent.click(screen.getByText('one'));
      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });

    it('should call onFocus', async () => {
      const onFocus = jest.fn();
      render(
        <OverflowMenu
          aria-label="Overflow menu"
          className="extra-class"
          onFocus={onFocus}>
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      await userEvent.click(screen.getByRole('button'));
      expect(onFocus).toHaveBeenCalled();
    });

    it('should render open if open is true', () => {
      render(
        <OverflowMenu open aria-label="Overflow menu" className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });

    it('should render icon from renderIcon', () => {
      render(
        <OverflowMenu
          aria-label="Overflow menu"
          className="extra-class"
          renderIcon={() => <Filter aria-label="filter icon" />}>
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      expect(screen.getByRole('img')).toHaveAttribute(
        'aria-label',
        'filter icon'
      );
    });

    describe('should change size based on size prop', () => {
      const sizes = ['xs', 'sm', 'md', 'lg'];

      sizes.forEach((size) => {
        it(`size="${size}"`, () => {
          render(
            <OverflowMenu
              open
              aria-label="Overflow menu"
              className="extra-class"
              size={size}>
              <OverflowMenuItem className="test-child" itemText="one" />
              <OverflowMenuItem className="test-child" itemText="two" />
            </OverflowMenu>
          );

          expect(screen.getByRole('button')).toHaveClass(
            `cds--overflow-menu--${size}`
          );
        });
      });
    });

    it('should open on click', async () => {
      render(
        <OverflowMenu aria-label="Overflow menu" className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-expanded',
        'false'
      );

      await userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });

    it('should call onClick handler only once per click', async () => {
      const handleClick = jest.fn();

      render(
        <OverflowMenu
          open
          aria-label="Overflow menu"
          className="extra-class"
          onClick={handleClick}>
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
      );

      // Find the OverflowMenu button
      const button = screen.getByRole('button');

      // Click the OverflowMenu button
      await userEvent.click(button);

      // Check that the click handler was called only once
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
  it('should not open menu when disabled', async () => {
    render(
      <OverflowMenu aria-label="Overflow menu" className="extra-class" disabled>
        <OverflowMenuItem className="test-child" itemText="one" />
        <OverflowMenuItem className="test-child" itemText="two" />
      </OverflowMenu>
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
  it('should close the menu when clicking outside', async () => {
    render(
      <div>
        <OverflowMenu aria-label="Overflow menu" className="extra-class">
          <OverflowMenuItem className="test-child" itemText="one" />
          <OverflowMenuItem className="test-child" itemText="two" />
        </OverflowMenu>
        <div data-testid="outside-element">Outside Element</div>
      </div>
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(screen.getByTestId('outside-element'));
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
  it('should set aria-label for the icon using iconDescription prop', () => {
    const iconDescription = 'custom icon description';
    render(
      <OverflowMenu
        aria-label="Overflow menu"
        className="extra-class"
        iconDescription={iconDescription}>
        <OverflowMenuItem className="test-child" itemText="one" />
        <OverflowMenuItem className="test-child" itemText="two" />
      </OverflowMenu>
    );
    const button = screen.getByRole('button', { name: iconDescription });
    const svgIcon = button.querySelector('.cds--overflow-menu__icon');
    expect(svgIcon).toHaveAttribute('aria-label', iconDescription);
  });
  it('should align menu based on direction prop', async () => {
    const { rerender } = render(
      <OverflowMenu
        direction="top"
        iconDescription="custom-icon"
        className="extra-class">
        <OverflowMenuItem className="test-child" itemText="one" />
        <OverflowMenuItem className="test-child" itemText="two" />
      </OverflowMenu>
    );
    const button = screen.getByRole('button', { name: 'custom-icon' });
    fireEvent.click(button);
    const menu = await waitFor(() =>
      screen.getByRole('menu', { hidden: true })
    );
    expect(menu).toHaveAttribute('data-floating-menu-direction', 'top');

    rerender(
      <OverflowMenu
        direction="bottom"
        iconDescription="custom-icon"
        className="extra-class">
        <OverflowMenuItem className="test-child" itemText="one" />
        <OverflowMenuItem className="test-child" itemText="two" />
      </OverflowMenu>
    );
    const newMenu = await waitFor(() =>
      screen.getByRole('menu', { hidden: true })
    );
    expect(newMenu).toHaveAttribute('data-floating-menu-direction', 'bottom');
  });
  it('focuses the next enabled menu item when pressing ArrowDown', async () => {
    render(
      <OverflowMenu iconDescription="custom-icon" className="extra-class">
        <OverflowMenuItem itemText="Item 1" data-testid="menu-item-1" />
        <OverflowMenuItem
          itemText="Item 2"
          disabled
          data-testid="menu-item-2"
        />
        <OverflowMenuItem itemText="Item 3" data-testid="menu-item-3" />
      </OverflowMenu>
    );
    const button = screen.getByRole('button', { name: 'custom-icon' });
    fireEvent.click(button);

    const menuItem1 = screen.getByText('Item 1').closest('button');
    const menuItem3 = screen.getByText('Item 3').closest('button');

    menuItem1.focus();
    fireEvent.keyDown(menuItem1, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(menuItem3).toHaveFocus();
  });
  it('focuses the next enabled menu item when pressing ArrowUp', async () => {
    render(
      <OverflowMenu iconDescription="custom-icon" className="extra-class">
        <OverflowMenuItem itemText="Item 1" data-testid="menu-item-1" />
        <OverflowMenuItem
          itemText="Item 2"
          disabled
          data-testid="menu-item-2"
        />
        <OverflowMenuItem itemText="Item 3" data-testid="menu-item-3" />
      </OverflowMenu>
    );
    const button = screen.getByRole('button', { name: 'custom-icon' });
    fireEvent.click(button);

    const menuItem1 = screen.getByText('Item 1').closest('button');
    const menuItem3 = screen.getByText('Item 3').closest('button');

    menuItem3.focus();
    expect(menuItem3).toHaveFocus();
    fireEvent.keyDown(menuItem3, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(menuItem1).toHaveFocus();
  });
  it('focuses the last enabled item when moving backwards from the first enabled item (case -1)', () => {
    render(
      <OverflowMenu iconDescription="custom-icon" className="extra-class">
        <OverflowMenuItem itemText="Item 1" data-testid="menu-item-1" />
        <OverflowMenuItem
          itemText="Item 2"
          disabled
          data-testid="menu-item-2"
        />
        <OverflowMenuItem itemText="Item 3" data-testid="menu-item-3" />
      </OverflowMenu>
    );

    const button = screen.getByRole('button', { name: 'custom-icon' });
    fireEvent.click(button);

    const menuItem1 = screen.getByText('Item 1').closest('button');
    const menuItem3 = screen.getByText('Item 3').closest('button');
    menuItem1.focus();
    expect(menuItem1).toHaveFocus();
    fireEvent.keyDown(menuItem1, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(menuItem3).toHaveFocus();
  });

  it('focuses the first enabled item when moving forward from the last enabled item (case enabledIndices.length)', () => {
    render(
      <OverflowMenu iconDescription="custom-icon" className="extra-class">
        <OverflowMenuItem itemText="Item 1" data-testid="menu-item-1" />
        <OverflowMenuItem
          itemText="Item 2"
          disabled
          data-testid="menu-item-2"
        />
        <OverflowMenuItem itemText="Item 3" data-testid="menu-item-3" />
      </OverflowMenu>
    );

    const button = screen.getByRole('button', { name: 'custom-icon' });
    fireEvent.click(button);

    const menuItem1 = screen.getByText('Item 1').closest('button');
    const menuItem3 = screen.getByText('Item 3').closest('button');
    menuItem3.focus();
    expect(menuItem3).toHaveFocus();
    fireEvent.keyDown(menuItem3, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(menuItem1).toHaveFocus();
  });
  it('closes the menu on Escape key press', async () => {
    render(
      <OverflowMenu open iconDescription="custom-icon" className="extra-class">
        <OverflowMenuItem itemText="Item 1" data-testid="menu-item-1" />
        <OverflowMenuItem
          itemText="Item 2"
          disabled
          data-testid="menu-item-2"
        />
        <OverflowMenuItem itemText="Item 3" data-testid="menu-item-3" />
      </OverflowMenu>
    );
    const button = screen.getByRole('button', { name: 'custom-icon' });
    expect(button).toHaveClass('cds--overflow-menu--open');

    const menu = await waitFor(() =>
      screen.getByRole('menu', { hidden: true })
    );
    fireEvent.keyDown(menu, { key: 'Escape', code: 'Escape' });
    expect(button).not.toHaveClass('cds--overflow-menu--open');
    expect(button).toHaveFocus();
  });
  describe('Ref handling', () => {
    it('should support both standard ref and innerRef', () => {
      const standardRef = React.createRef();
      const innerRef = React.createRef();

      render(
        <OverflowMenu
          ref={standardRef}
          innerRef={innerRef}
          aria-label="Overflow menu"
          data-testid="overflow-menu">
          <OverflowMenuItem itemText="Option 1" />
          <OverflowMenuItem itemText="Option 2" />
        </OverflowMenu>
      );
      const buttonElement = screen.getByRole('button');
      expect(standardRef.current).not.toBeNull();
      expect(innerRef.current).not.toBeNull();
      expect(standardRef.current).toBe(buttonElement);
      expect(innerRef.current).toBe(buttonElement);

      // Verify both refs point to the same element & not null
      expect(standardRef.current).toBe(innerRef.current);
    });
  });
  it('should call onOpen', async () => {
    const onOpen = jest.fn();
    render(
      <OverflowMenu
        aria-label="Overflow menu"
        className="extra-class"
        onOpen={onOpen}>
        <OverflowMenuItem className="test-child" itemText="one" />
        <OverflowMenuItem className="test-child" itemText="two" />
      </OverflowMenu>
    );

    await userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(onOpen).toHaveBeenCalledTimes(1);
    });
  });
});



File: OverflowMenu/OverflowMenu.DynamicStyles.featureflag.mdx


import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Components/OverflowMenu/Feature Flag" name="Flag details" />

# OverflowMenu

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/OverflowMenu/next)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Menu Alignment](#menu-alignment)
- [menuTarget Prop](#menutarget-prop)
- [Dynamically set floating styles](#dynamically-set-floating-styles)
- [Enable dynamic setting of floating styles](#enable-dynamic-setting-of-floating-styles)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

This version of the `OverflowMenu` can be enabled by using the
`enable-v12-overflowmenu` feature flag and supports all
[subcomponents of `Menu`](/docs/components-menu--default#subcomponents).

```jsx
<OverflowMenu label="Primary action">
  <MenuItem label="Stop app" />
  <MenuItem label="Restart app" />
  <MenuItem label="Rename app" />
  <MenuItem label="Edit routes and access" />
  <MenuItemDivider />
  <MenuItem label="Delete app" kind="danger" />
</OverflowMenu>
```

## Menu Alignment

The `menuAlignment` prop enables you to define the placement of the Menu in
relation to the `OverflowMenu`. For instance, setting
`menuAlignment="top-start"` on the `OverflowMenu` will render the Menu above the
button.

If it seems your specified `menuAlignment` isn't working, it's because we
prioritize ensuring the Menu remains visible. We calculate the optimal position
to display the Menu in case the provided `menuAlignment` obscures it.

We encourage you to play around in the Storybook Default stories to better
understand the `menuAlignment` prop.

## menuTarget Prop

The `menuTarget` prop specifies where the `OverflowMenu` should render, which is
particularly useful when using `OverflowMenu` inside a modal. By default, the
menu renders in `document.body`, but this can disrupt focus order in modals or
other components with focus management.

Pass the `menuTarget` prop to render the `OverflowMenu` inside the modal or any
specific element where you want it to render:

## Dynamically set floating styles

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
  <OverflowMenu>
    <MenuItem label="Stop app" />
    <MenuItem label="Restart app" />
    <MenuItem label="Rename app" />
    <MenuItem label="Edit routes and access" />
    <MenuItemDivider />
    <MenuItem label="Delete app" kind="danger" />
  </OverflowMenu>
</FeatureFlags>
```

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/OverflowMenu/next/OverflowMenu.mdx).



File: OverflowMenu/OverflowMenu.featureflag.stories.js


/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useEffect } from 'react';
import {
  MenuItem,
  MenuItemDivider,
  MenuItemGroup,
  MenuItemRadioGroup,
  MenuItemSelectable,
} from '../Menu';
import { OverflowMenu } from './';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';
import { FeatureFlags } from '../FeatureFlags';

export default {
  title: 'Components/OverflowMenu/Feature Flag',
  component: OverflowMenu,
  subcomponents: {
    MenuItem,
    MenuItemSelectable,
    MenuItemGroup,
    MenuItemRadioGroup,
    MenuItemDivider,
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

export const AutoAlign = () => {
  const ref = useRef();

  useEffect(() => {
    ref?.current?.scrollIntoView({ block: 'center', inline: 'center' });
  });

  return (
    <div style={{ width: '4900px', height: '4900px' }}>
      <div
        style={{
          position: 'absolute',
          top: '2450px',
          left: '2450px',
        }}
        ref={ref}>
        <OverflowMenu autoAlign={true}>
          <MenuItem label="Stop app" />
          <MenuItem label="Restart app" />
          <MenuItem label="Rename app" />
          <MenuItem label="Edit routes and access" />
          <MenuItemDivider />
          <MenuItem label="Delete app" kind="danger" />
        </OverflowMenu>
      </div>
    </div>
  );
};

export const Nested = () => {
  return (
    <FeatureFlags
      flags={{
        'enable-v12-overflowmenu': true,
        'enable-v12-dynamic-floating-styles': false,
      }}>
      <OverflowMenu>
        <MenuItem label="Level 1" />
        <MenuItem label="Level 1" />
        <MenuItem label="Level 1">
          <MenuItem label="Level 2">
            <MenuItem label="Level 3" />
            <MenuItem label="Level 3">
              <MenuItem label="Level 4" />
            </MenuItem>
          </MenuItem>
          <MenuItem label="Level 2" />
          <MenuItem label="Level 2" />
        </MenuItem>
        <MenuItem label="Level 1" />
      </OverflowMenu>
    </FeatureFlags>
  );
};

export const WithMenuAlignment = (args) => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <OverflowMenu {...args} menuAlignment="bottom-start">
          <MenuItem label="Stop app" />
          <MenuItem label="Restart app" />
          <MenuItem label="Rename app" />
          <MenuItem label="Edit routes and access" />
          <MenuItemDivider />
          <MenuItem label="Delete app" kind="danger" />
        </OverflowMenu>

        <OverflowMenu {...args} menuAlignment="bottom-end">
          <MenuItem label="Stop app" />
          <MenuItem label="Restart app" />
          <MenuItem label="Rename app" />
          <MenuItem label="Edit routes and access" />
          <MenuItemDivider />
          <MenuItem label="Delete app" kind="danger" />
        </OverflowMenu>
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: '15rem',
          justifyContent: 'space-between',
        }}>
        <OverflowMenu
          {...args}
          menuAlignment="top-start"
          tooltipAlignment="bottom">
          <MenuItem label="Stop app" />
          <MenuItem label="Restart app" />
          <MenuItem label="Rename app" />
          <MenuItem label="Edit routes and access" />
          <MenuItemDivider />
          <MenuItem label="Delete app" kind="danger" />
        </OverflowMenu>

        <OverflowMenu
          {...args}
          menuAlignment="top-end"
          tooltipAlignment="bottom">
          <MenuItem label="Stop app" />
          <MenuItem label="Restart app" />
          <MenuItem label="Rename app" />
          <MenuItem label="Edit routes and access" />
          <MenuItemDivider />
          <MenuItem label="Delete app" kind="danger" />
        </OverflowMenu>
      </div>
    </>
  );
};

export const FloatingStyles = () => {
  return (
    <div>
      <OverflowMenu>
        <MenuItem label="Stop app" />
        <MenuItem label="Restart app" />
        <MenuItem label="Rename app" />
        <MenuItem label="Edit routes and access" />
        <MenuItemDivider />
        <MenuItem label="Delete app" kind="danger" />
      </OverflowMenu>
    </div>
  );
};

export const Default = (args) => {
  return (
    <OverflowMenu {...args}>
      <MenuItem label="Stop app" />
      <MenuItem label="Restart app" />
      <MenuItem label="Rename app" />
      <MenuItem label="Edit routes and access" />
      <MenuItemDivider />
      <MenuItem label="Delete app" kind="danger" />
    </OverflowMenu>
  );
};

Default.args = {
  label: 'Options',
};

Default.parameters = {
  controls: {
    exclude: ['renderIcon', 'menuTarget'],
  },
};
Default.argTypes = {
  menuAlignment: {
    options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
    control: { type: 'select' },
    description:
      'Specify how the menu should align with the button element `bottom-start` `bottom-end` `top-start` `top-end`',
    default: 'bottom-start',
  },
};



File: OverflowMenu/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-overflowmenu--default'
    },
    {
      label: 'Render custom Icon',
      variant: 'components-overflowmenu--render-custom-icon'
    }
  ]}
/>



File: OverflowMenu/migrate-to-7.x.md


# Props

`<OverflowMenu>`

| v9                                             | v10                                                                              |
| ---------------------------------------------- | -------------------------------------------------------------------------------- |
| `floatingMenu`                                 | Removed - `<OverflowMenu>` always works as a floating menu                       |
| `icon`, icon name from `carbon-icons`          | `renderIcon`, which takes a React component, e.g. one from `@carbon/icons-react` |
| `iconName`, icon data from `carbon-icons`      | `renderIcon`, which takes a React component, e.g. one from `@carbon/icons-react` |
| `ref` grabs the React class instance reference | `ref` grabs the trigger button                                                   |

## `v10` example

```javascript
import OverflowMenuVertical16 from '@carbon/icons-react/lib/overflow-menu--vertical/16';

...

<OverflowMenu renderIcon={OverflowMenuVertical16}>
  <OverflowMenuItem itemText="Option 1" />
  <OverflowMenuItem itemText="Option 2" />
  ...
</OverflowMenu>
```



File: OverflowMenu/index.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef } from 'react';
import { useFeatureFlag } from '../FeatureFlags';
import { OverflowMenu as OverflowMenuV12 } from './next';
import {
  OverflowMenu as OverflowMenuV11,
  type OverflowMenuProps,
} from './OverflowMenu';

const OverflowMenu = forwardRef<HTMLDivElement, OverflowMenuProps>(
  (props, ref) => {
    const enableV12OverflowMenu = useFeatureFlag('enable-v12-overflowmenu');

    return enableV12OverflowMenu ? (
      <OverflowMenuV12 {...props} ref={ref} />
    ) : (
      <OverflowMenuV11
        {...props}
        ref={ref as React.LegacyRef<HTMLButtonElement>}
      />
    );
  }
);

OverflowMenu.displayName = 'OverflowMenu';
OverflowMenu.propTypes = OverflowMenuV11.propTypes;

export default OverflowMenu;
export { OverflowMenu, type OverflowMenuProps };



File: OverflowMenu/next/OverflowMenu-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { act } from 'react';
import { OverflowMenu } from '.';
import { MenuItem } from '../../Menu';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const prefix = 'cds';

describe('OverflowMenu (enable-v12-overflowmenu)', () => {
  it('should render closed by default', () => {
    render(
      <OverflowMenu>
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenu>
    );

    // eslint-disable-next-line testing-library/no-node-access
    const ul = document.querySelector('ul');
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );

    expect(ul).toBe(null);
  });

  it('should forward a ref', () => {
    const ref = React.createRef();
    render(
      <OverflowMenu ref={ref}>
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenu>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should be in an open state after trigger is clicked', async () => {
    render(
      <OverflowMenu>
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenu>
    );
    await userEvent.type(screen.getByRole('button'), 'enter');
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    // eslint-disable-next-line testing-library/no-node-access
    const ul = document.querySelector('ul');
    expect(ul).toBeInTheDocument();
  });

  it('should add custom classNames', () => {
    const { container } = render(
      <OverflowMenu className="extra-class">
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenu>
    );

    expect(container.firstChild).toHaveClass('extra-class');
  });

  it('should set an id if one is given', () => {
    const { container } = render(
      <OverflowMenu id="custom-id">
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenu>
    );

    expect(container.firstChild).toHaveAttribute('id', 'custom-id');
  });

  it('should always use button kind=ghost', () => {
    render(
      <OverflowMenu>
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenu>
    );

    expect(screen.getByRole('button')).not.toHaveClass('cds--btn--primary');
    expect(screen.getByRole('button')).toHaveClass('cds--btn--ghost');
  });

  it('should close menu on outside click', async () => {
    render(
      <OverflowMenu>
        <MenuItem label="item" className="test-child">
          one
        </MenuItem>
        <MenuItem label="item" className="test-child">
          two
        </MenuItem>
      </OverflowMenu>
    );
    await userEvent.type(screen.getByRole('button'), 'enter');
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    // this test needs to be worked on, as this is just a workaround right now.
    await userEvent.keyboard('{Escape}');

    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  describe('supports props.menuAlignment', () => {
    const alignments = ['top-start', 'top-end', 'bottom-start', 'bottom-end'];

    alignments.forEach((alignment) => {
      it(`menuAlignment="${alignment}"`, async () => {
        render(
          <OverflowMenu label="Actions" menuAlignment={alignment}>
            <MenuItem label="item">one</MenuItem>
          </OverflowMenu>
        );

        await userEvent.click(screen.getByRole('button'));

        expect(screen.getAllByRole('menu')[0]).toHaveClass(
          `${prefix}--overflow-menu__${alignment}`
        );
      });
    });
  });
});



File: OverflowMenu/next/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  tall
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Custom Icon',
      variant: 'experimental-feature-flags-overflowmenu--custom-icon'
    },
    {
      label: 'Nested',
      variant: 'experimental-feature-flags-overflowmenu--nested'
    },
    {
      label: 'Overflow Menu V2',
      variant: 'experimental-feature-flags-overflowmenu--overflow-menu'
    }
  ]}
/>



File: OverflowMenu/next/index.tsx


/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, type ElementType } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { OverflowMenuVertical } from '@carbon/icons-react';
import { useFloating, flip, autoUpdate } from '@floating-ui/react';
import { useFeatureFlag } from '../../FeatureFlags';

import { IconButton } from '../../IconButton';
import { Menu } from '../../Menu';
import type { PopoverAlignment } from '../../Popover';
import { mergeRefs } from '../../../tools/mergeRefs';

import { useId } from '../../../internal/useId';
import { usePrefix } from '../../../internal/usePrefix';
import { useAttachedMenu } from '../../../internal/useAttachedMenu';
import { deprecateValuesWithin } from '../../../prop-types/deprecateValuesWithin';
import { mapPopoverAlign } from '../../../tools/mapPopoverAlign';

const defaultSize = 'md';

interface OverflowMenuProps {
  /**
   * **Experimental**: Will attempt to automatically align the floating element
   * to avoid collisions with the viewport and being clipped by ancestor
   * elements. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign?: boolean;

  /**
   * A collection of MenuItems to be rendered within this OverflowMenu.
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class names for the trigger button.
   */
  className?: string;

  /**
   * A label describing the options available. Is used in the trigger tooltip and as the menu's accessible label.
   */
  label?: string;

  /**
   * Experimental property. Specify how the menu should align with the button element
   */
  menuAlignment?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

  /**
   * A component used to render an icon.
   */
  renderIcon?: ElementType;

  /**
   * Specify the size of the menu, from a list of available sizes.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * Specify how the trigger tooltip should be aligned.
   */
  tooltipAlignment?: PopoverAlignment;

  /**
   * Specify a DOM node where the Menu should be rendered in. Defaults to document.body.
   */
  menuTarget?: Element;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const OverflowMenu = React.forwardRef<HTMLDivElement, OverflowMenuProps>(
  (
    {
      autoAlign = false,
      children,
      className,
      label = 'Options',
      renderIcon: IconElement = OverflowMenuVertical,
      size = defaultSize,
      menuAlignment = 'bottom-start',
      tooltipAlignment,
      menuTarget,
      ...rest
    },
    forwardRef
  ) => {
    const enableFloatingStyles =
      useFeatureFlag('enable-v12-dynamic-floating-styles') || autoAlign;

    const { refs, floatingStyles, placement, middlewareData } = useFloating(
      enableFloatingStyles
        ? {
            // Computing the position starts with initial positioning
            // via `placement`.
            placement: menuAlignment,

            // The floating element is positioned relative to its nearest
            // containing block (usually the viewport). It will in many cases
            // also “break” the floating element out of a clipping ancestor.
            // https://floating-ui.com/docs/misc#clipping
            strategy: 'fixed',

            // Middleware are executed as an in-between “middle” step of the
            // initial `placement` computation and eventual return of data for
            // rendering. Each middleware is executed in order.
            middleware: [
              autoAlign &&
                flip({
                  // An explicit array of placements to try if the initial
                  // `placement` doesn’t fit on the axes in which overflow
                  // is checked.
                  fallbackPlacements: menuAlignment.includes('bottom')
                    ? ['bottom-start', 'bottom-end', 'top-start', 'top-end']
                    : ['top-start', 'top-end', 'bottom-start', 'bottom-end'],
                }),
            ],
            whileElementsMounted: autoUpdate,
          }
        : {}
      // When autoAlign is turned off & the `enable-v12-dynamic-floating-styles` feature flag is not
      // enabled, floating-ui will not be used
    );

    const id = useId('overflowmenu');
    const prefix = usePrefix();

    const triggerRef = useRef<HTMLDivElement>(null);

    const {
      open,
      x,
      y,
      handleClick: hookOnClick,
      handleMousedown,
      handleClose,
    } = useAttachedMenu(triggerRef);
    useEffect(() => {
      if (enableFloatingStyles) {
        Object.keys(floatingStyles).forEach((style) => {
          if (refs.floating.current) {
            refs.floating.current.style[style] = floatingStyles[style];
          }
        });
      }
    }, [
      floatingStyles,
      enableFloatingStyles,
      refs.floating,
      open,
      placement,
      middlewareData,
    ]);

    function handleTriggerClick() {
      if (triggerRef.current) {
        hookOnClick();
      }
    }

    const containerClasses = classNames(
      className,
      `${prefix}--overflow-menu__container`,
      { [`${prefix}--autoalign`]: enableFloatingStyles }
    );

    const menuClasses = classNames(
      `${prefix}--overflow-menu__${menuAlignment}`
    );

    const triggerClasses = classNames(
      `${prefix}--overflow-menu`,
      {
        [`${prefix}--overflow-menu--open`]: open,
      },
      size !== defaultSize && `${prefix}--overflow-menu--${size}`
    );

    const floatingRef = mergeRefs(triggerRef, refs.setReference);

    return (
      <div
        {...rest}
        className={containerClasses}
        aria-owns={open ? id : undefined}
        ref={forwardRef}>
        <IconButton
          aria-controls={open ? id : undefined}
          aria-haspopup
          aria-expanded={open}
          className={triggerClasses}
          onClick={handleTriggerClick}
          onMouseDown={handleMousedown}
          ref={floatingRef}
          label={label}
          align={tooltipAlignment}
          kind="ghost">
          <IconElement className={`${prefix}--overflow-menu__icon`} />
        </IconButton>
        <Menu
          containerRef={triggerRef}
          ref={refs.setFloating}
          menuAlignment={menuAlignment}
          className={menuClasses}
          id={id}
          size={size}
          legacyAutoalign={!enableFloatingStyles}
          open={open}
          onClose={handleClose}
          x={x}
          y={y}
          label={label}
          target={menuTarget}>
          {children}
        </Menu>
      </div>
    );
  }
);
OverflowMenu.propTypes = {
  /**
   * **Experimental**: Will attempt to automatically align the floating element
   * to avoid collisions with the viewport and being clipped by ancestor
   * elements. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: PropTypes.bool,
  /**
   * A collection of MenuItems to be rendered within this OverflowMenu.
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names for the trigger button.
   */
  className: PropTypes.string,

  /**
   * A label describing the options available. Is used in the trigger tooltip and as the menu's accessible label.
   */
  label: PropTypes.string,

  /**
   * Experimental property. Specify how the menu should align with the button element
   */
  menuAlignment: PropTypes.oneOf([
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
  ]),

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the menu, from a list of available sizes.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),

  /**
   * Specify how the trigger tooltip should be aligned.
   */
  tooltipAlignment: deprecateValuesWithin(
    PropTypes.oneOf([
      'top',
      'top-left', // deprecated use top-start instead
      'top-right', // deprecated use top-end instead

      'bottom',
      'bottom-left', // deprecated use bottom-start instead
      'bottom-right', // deprecated use bottom-end instead

      'left',
      'left-bottom', // deprecated use left-end instead
      'left-top', // deprecated use left-start instead

      'right',
      'right-bottom', // deprecated use right-end instead
      'right-top', // deprecated use right-start instead

      // new values to match floating-ui
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'left-end',
      'left-start',
      'right-end',
      'right-start',
    ]),
    [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ],
    mapPopoverAlign
  ),

  /**
   * Specify a DOM node where the Menu should be rendered in. Defaults to document.body.
   */
  menuTarget: PropTypes.instanceOf(
    typeof Element !== 'undefined' ? Element : Object
  ) as PropTypes.Validator<Element | null | undefined>,
};

export { OverflowMenu };



File: OverflowMenu/OverflowMenu.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { OverflowMenu } from './OverflowMenu';
import { default as OverflowMenuItem } from '../OverflowMenuItem';
import { Filter } from '@carbon/icons-react';
import mdx from './OverflowMenu.mdx';

export default {
  title: 'Components/OverflowMenu',
  component: OverflowMenu,
  subcomponents: {
    OverflowMenuItem,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const RenderCustomIcon = () => {
  return (
    <OverflowMenu flipped={document?.dir === 'rtl'} renderIcon={Filter}>
      <OverflowMenuItem itemText="Filter A" />
      <OverflowMenuItem itemText="Filter B" />
    </OverflowMenu>
  );
};
export const Default = (args) => (
  <OverflowMenu aria-label="overflow-menu" {...args}>
    <OverflowMenuItem itemText="Stop app" />
    <OverflowMenuItem itemText="Restart app" />
    <OverflowMenuItem itemText="Rename app" />
    <OverflowMenuItem itemText="Clone and move app" disabled requireTitle />
    <OverflowMenuItem itemText="Edit routes and access" requireTitle />
    <OverflowMenuItem hasDivider isDelete itemText="Delete app" />
  </OverflowMenu>
);

Default.args = {
  flipped: document?.dir === 'rtl',
  focusTrap: false,
  open: false,
};

Default.argTypes = {
  align: {
    options: [
      'top',
      'top-start',
      'top-end',

      'bottom',
      'bottom-start',
      'bottom-end',

      'left',
      'left-end',
      'left-start',

      'right',
      'right-end',
      'right-start',
    ],
  },
  flipped: {
    control: {
      type: 'boolean',
    },
  },
  focusTrap: {
    control: {
      type: 'boolean',
    },
  },
  iconDescription: {
    control: { type: 'text' },
  },
  open: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    options: ['xs', 'sm', 'md', 'lg'],
    control: { type: 'select' },
  },
};

Default.parameters = {
  controls: {
    exclude: [
      'direction',
      'iconClass',
      'id',
      'light',
      'menuOffset',
      'menuOffsetFlip',
      'menuOptionsClass',
      'renderIcon',
    ],
  },
};



File: OverflowMenu/OverflowMenu.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import { OverflowMenuVertical } from '@carbon/icons-react';
import classNames from 'classnames';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import {
  DIRECTION_BOTTOM,
  DIRECTION_TOP,
  FloatingMenu,
  type MenuDirection,
  type MenuOffset,
} from '../../internal/FloatingMenu';
import { matches as keyCodeMatches, keys } from '../../internal/keyboard';
import { noopFn } from '../../internal/noopFn';
import { PrefixContext } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';
import { mergeRefs } from '../../tools/mergeRefs';
import { setupGetInstanceId } from '../../tools/setupGetInstanceId';
import { IconButton, IconButtonProps } from '../IconButton';
import { OverflowMenuItemProps } from '../OverflowMenuItem/OverflowMenuItem';
import { useOutsideClick } from '../../internal/useOutsideClick';
import { deprecateValuesWithin } from '../../prop-types/deprecateValuesWithin';
import { mapPopoverAlign } from '../../tools/mapPopoverAlign';

const getInstanceId = setupGetInstanceId();

const on = (
  target: EventTarget,
  ...args: [
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ]
) => {
  target.addEventListener(...args);
  return {
    release() {
      target.removeEventListener(...args);
      return null;
    },
  };
};

/**
 * The CSS property names of the arrow keyed by the floating menu direction.
 */
const triggerButtonPositionProps = {
  [DIRECTION_TOP]: 'bottom',
  [DIRECTION_BOTTOM]: 'top',
};

/**
 * Determines how the position of the arrow should affect the floating menu
 * position.
 */
const triggerButtonPositionFactors = {
  [DIRECTION_TOP]: -2,
  [DIRECTION_BOTTOM]: -1,
};

/**
 * Calculates the offset for the floating menu.
 *
 * @param menuBody - The menu body with the menu arrow.
 * @param direction - The floating menu direction.
 * @returns The adjustment of the floating menu position, upon the position of
 *          the menu arrow.
 */
export const getMenuOffset: MenuOffset = (
  menuBody,
  direction,
  trigger,
  flip
) => {
  const triggerButtonPositionProp = triggerButtonPositionProps[direction];
  const triggerButtonPositionFactor = triggerButtonPositionFactors[direction];
  if (process.env.NODE_ENV !== 'production') {
    invariant(
      triggerButtonPositionProp && triggerButtonPositionFactor,
      '[OverflowMenu] wrong floating menu direction: `%s`',
      direction
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
  const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menuBody;

  switch (triggerButtonPositionProp) {
    case 'top':
    case 'bottom': {
      // TODO: Ensure `trigger` is there for `<OverflowMenu open>`
      const triggerWidth = !trigger ? 0 : trigger.offsetWidth;
      return {
        left: (!flip ? 1 : -1) * (menuWidth / 2 - triggerWidth / 2),
        top: 0,
      };
    }
    default:
      return { left: 0, top: 0 };
  }
};

export interface OverflowMenuProps
  extends Omit<
    IconButtonProps,
    | 'type'
    | 'aria-haspopup'
    | 'aria-expanded'
    | 'aria-controls'
    | 'className'
    | 'onClick'
    | 'id'
    | 'ref'
    | 'size'
    | 'label'
    | 'kind'
  > {
  /**
   * Specify a label to be read by screen readers on the container node
   */
  ['aria-label']?: string;

  /**
   * Specify a label to be read by screen readers on the container note.
   *
   * @deprecated - Use `aria-label` instead.
   */
  ariaLabel?: string;

  /**
   * The child nodes.
   */
  children: ReactNode;

  /**
   * The CSS class names.
   */
  className?: string;

  /**
   * The menu direction.
   */
  direction?: MenuDirection;

  /**
   * `true` if the menu alignment should be flipped.
   */
  flipped?: boolean;

  /**
   * Enable or disable focus trap behavior
   */
  focusTrap?: boolean;

  /**
   * The CSS class for the icon.
   */
  iconClass?: string;

  /**
   * The element ID.
   */
  id?: string;

  /**
   * The icon description.
   */
  iconDescription?: string;

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make OverflowMenu background color same as container background color.
   */
  light?: boolean;

  /**
   * The adjustment in position applied to the floating menu.
   */
  menuOffset?: MenuOffset;

  /**
   * The adjustment in position applied to the floating menu.
   */
  menuOffsetFlip?: MenuOffset;

  /**
   * The class to apply to the menu options
   */
  menuOptionsClass?: string;

  /**
   * The event handler for the `click` event.
   */
  onClick?: (evt?) => void;

  /**
   * Function called when menu is closed
   */
  onClose?: () => void;

  /**
   * Function called when menu is opened
   */
  onOpen?: () => void;

  /**
   * `true` if the menu should be open.
   */
  open?: boolean;

  /**
   * A component used to render an icon.
   */
  renderIcon?: ElementType;

  /**
   * Specify a CSS selector that matches the DOM element that should
   * be focused when the OverflowMenu opens
   */
  selectorPrimaryFocus?: string;

  /**
   * Specify the size of the OverflowMenu. Currently supports either `xs`, `sm`, `md` (default) or `lg` as an option.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * The ref to the overflow menu's trigger button element.
   * @deprecated Use the standard React `ref` prop instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  innerRef?: Ref<any>;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
export const OverflowMenu = forwardRef<HTMLButtonElement, OverflowMenuProps>(
  (
    {
      align,
      ['aria-label']: ariaLabel = null,
      ariaLabel: deprecatedAriaLabel,
      children,
      className,
      direction = DIRECTION_BOTTOM,
      flipped = false,
      focusTrap = true,
      iconClass,
      iconDescription = 'Options',
      id,
      light,
      menuOffset = getMenuOffset,
      menuOffsetFlip = getMenuOffset,
      menuOptionsClass,
      onClick = noopFn,
      onClose = noopFn,
      onOpen = noopFn,
      open: openProp,
      renderIcon: IconElement = OverflowMenuVertical,
      selectorPrimaryFocus = '[data-floating-menu-primary-focus]',
      size = 'md',
      innerRef,
      ...other
    },
    ref
  ) => {
    const prefix = useContext(PrefixContext);
    const [open, setOpen] = useState(openProp ?? false);
    const [click, setClick] = useState(false);
    const [hasMountedTrigger, setHasMountedTrigger] = useState(false);
    /**  The handle of `onfocusin` or `focus` event handler. */
    const hFocusIn = useRef<{ release: () => null } | null>(null);
    const instanceId = useRef(getInstanceId());
    const menuBodyRef = useRef<HTMLElement | null>(null);
    const menuItemRefs = useRef<Record<number, HTMLElement | null>>({});
    const prevOpenProp = useRef(openProp);
    const prevOpenState = useRef(open);
    /** The element ref of the tooltip's trigger button. */
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const wrapperRef = useRef<HTMLSpanElement | null>(null);

    // Sync open prop changes.
    useEffect(() => {
      if (prevOpenProp.current !== openProp) {
        setOpen(!!openProp);
        prevOpenProp.current = openProp;
      }
    }, [openProp]);

    // Mark trigger as mounted.
    useEffect(() => {
      if (triggerRef.current) {
        setHasMountedTrigger(true);
      }
    }, []);

    useEffect(() => {
      if (open && !prevOpenState.current) {
        onOpen();
      } else if (!open && prevOpenState.current) {
        onClose();
      }

      prevOpenState.current = open;
    }, [open, onClose, onOpen]);

    useOutsideClick(wrapperRef, ({ target }) => {
      if (
        open &&
        (!menuBodyRef.current ||
          (target instanceof Node && !menuBodyRef.current.contains(target)))
      ) {
        closeMenu();
      }
    });

    const focusMenuEl = useCallback(() => {
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    }, []);

    const closeMenu = useCallback((onCloseMenu?: () => void) => {
      setOpen(false);
      // Optional callback to be executed after the state as been set to close
      if (onCloseMenu) {
        onCloseMenu();
      }
    }, []);

    const closeMenuAndFocus = useCallback(() => {
      const wasClicked = click;
      const wasOpen = open;
      closeMenu(() => {
        if (wasOpen && !wasClicked) {
          focusMenuEl();
        }
      });
    }, [click, open, closeMenu, focusMenuEl]);

    const closeMenuOnEscape = useCallback(() => {
      const wasOpen = open;
      closeMenu(() => {
        if (wasOpen) {
          focusMenuEl();
        }
      });
    }, [open, closeMenu, focusMenuEl]);

    const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
      setClick(true);
      if (
        !menuBodyRef.current ||
        !menuBodyRef.current.contains(evt.target as Node)
      ) {
        setOpen((prev) => !prev);
        onClick(evt);
      }
    };

    const handleKeyPress = (evt: KeyboardEvent<HTMLUListElement>) => {
      if (
        open &&
        keyCodeMatches(evt, [
          keys.ArrowUp,
          keys.ArrowRight,
          keys.ArrowDown,
          keys.ArrowLeft,
        ])
      ) {
        evt.preventDefault();
      }

      // Close the overflow menu on escape
      if (keyCodeMatches(evt, [keys.Escape])) {
        closeMenuOnEscape();

        // Stop the esc keypress from bubbling out and closing something it shouldn't
        evt.stopPropagation();
      }
    };

    /**
     * Focuses the next enabled overflow menu item given the currently focused
     * item index and direction to move.
     */
    const handleOverflowMenuItemFocus = ({
      currentIndex = 0,
      direction,
    }: {
      /**
       * The index of the currently focused overflow menu item in the list of
       * overflow menu items
       */
      currentIndex?: number;
      /**
       * Number denoting the direction to move focus (1 for forwards, -1 for
       * backwards).
       */
      direction: number;
    }) => {
      const enabledIndices = Children.toArray(children).reduce<number[]>(
        (acc, curr, i) => {
          if (
            React.isValidElement<OverflowMenuItemProps>(curr) &&
            !curr.props.disabled
          ) {
            acc.push(i);
          }
          return acc;
        },
        []
      );
      const nextValidIndex = (() => {
        const nextIndex = enabledIndices.indexOf(currentIndex) + direction;
        switch (nextIndex) {
          case -1:
            return enabledIndices.length - 1;
          case enabledIndices.length:
            return 0;
          default:
            return nextIndex;
        }
      })();
      const overflowMenuItem =
        menuItemRefs.current[enabledIndices[nextValidIndex]];
      overflowMenuItem?.focus();
    };

    const bindMenuBody = (menuBody: HTMLElement | null) => {
      if (!menuBody) {
        menuBodyRef.current = menuBody;
      }
      if (!menuBody && hFocusIn.current) {
        hFocusIn.current = hFocusIn.current.release();
      }
    };

    const handlePlace = (menuBody: HTMLElement) => {
      if (!menuBody) return;

      menuBodyRef.current = menuBody;
      const hasFocusin = 'onfocusin' in window;
      const focusinEventName = hasFocusin ? 'focusin' : 'focus';
      hFocusIn.current = on(
        menuBody.ownerDocument,
        focusinEventName,
        (event: Event) => {
          const target = event.target as HTMLElement;
          const triggerEl = triggerRef.current;
          if (typeof target.matches === 'function') {
            if (
              !menuBody.contains(target) &&
              triggerEl &&
              !target.matches(
                `.${prefix}--overflow-menu:first-child, .${prefix}--overflow-menu-options:first-child`
              )
            ) {
              closeMenuAndFocus();
            }
          }
        },
        !hasFocusin
      );
    };

    const getTarget = () => {
      const triggerEl = triggerRef.current;
      if (triggerEl instanceof Element) {
        return (
          triggerEl.closest('[data-floating-menu-container]') || document.body
        );
      }
      return document.body;
    };

    const menuBodyId = `overflow-menu-${instanceId.current}__menu-body`;

    const overflowMenuClasses = classNames(
      className,
      `${prefix}--overflow-menu`,
      {
        [`${prefix}--overflow-menu--open`]: open,
        [`${prefix}--overflow-menu--light`]: light,
        [`${prefix}--overflow-menu--${size}`]: size,
      }
    );

    const overflowMenuOptionsClasses = classNames(
      menuOptionsClass,
      `${prefix}--overflow-menu-options`,
      {
        [`${prefix}--overflow-menu--flip`]: flipped,
        [`${prefix}--overflow-menu-options--open`]: open,
        [`${prefix}--overflow-menu-options--light`]: light,
        [`${prefix}--overflow-menu-options--${size}`]: size,
      }
    );

    const overflowMenuIconClasses = classNames(
      `${prefix}--overflow-menu__icon`,
      iconClass
    );

    const childrenWithProps = Children.toArray(children).map((child, index) => {
      if (isValidElement(child)) {
        const childElement = child as ReactElement<OverflowMenuItemProps>;
        return cloneElement(childElement, {
          closeMenu: childElement.props.closeMenu || closeMenuAndFocus,
          handleOverflowMenuItemFocus,
          ref: (el: HTMLElement) => {
            menuItemRefs.current[index] = el;
          },
          index,
        });
      }
      return null;
    });

    const menuBody = (
      <ul
        className={overflowMenuOptionsClasses}
        tabIndex={-1}
        role="menu"
        aria-label={ariaLabel || deprecatedAriaLabel}
        onKeyDown={handleKeyPress}
        id={menuBodyId}>
        {childrenWithProps}
      </ul>
    );

    const wrappedMenuBody = (
      <FloatingMenu
        focusTrap={focusTrap}
        triggerRef={triggerRef as RefObject<HTMLElement>}
        menuDirection={direction}
        menuOffset={flipped ? menuOffsetFlip : menuOffset}
        menuRef={bindMenuBody}
        flipped={flipped}
        target={getTarget}
        onPlace={handlePlace}
        selectorPrimaryFocus={selectorPrimaryFocus}>
        {cloneElement(menuBody, {
          'data-floating-menu-direction': direction,
        })}
      </FloatingMenu>
    );
    const combinedRef = innerRef
      ? mergeRefs(triggerRef, innerRef, ref)
      : mergeRefs(triggerRef, ref);

    return (
      <>
        <span
          className={`${prefix}--overflow-menu__wrapper`}
          aria-owns={open ? menuBodyId : undefined}
          ref={wrapperRef}>
          <IconButton
            {...other}
            align={align}
            type="button"
            aria-haspopup
            aria-expanded={open}
            aria-controls={open ? menuBodyId : undefined}
            className={overflowMenuClasses}
            onClick={handleClick}
            id={id}
            ref={combinedRef}
            size={size}
            label={iconDescription}
            kind="ghost">
            <IconElement
              className={overflowMenuIconClasses}
              aria-label={iconDescription}
            />
          </IconButton>
          {open && hasMountedTrigger && wrappedMenuBody}
        </span>
      </>
    );
  }
);

OverflowMenu.propTypes = {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align: deprecateValuesWithin(
    PropTypes.oneOf([
      'top',
      'top-left', // deprecated use top-start instead
      'top-right', // deprecated use top-end instead

      'bottom',
      'bottom-left', // deprecated use bottom-start instead
      'bottom-right', // deprecated use bottom-end instead

      'left',
      'left-bottom', // deprecated use left-end instead
      'left-top', // deprecated use left-start instead

      'right',
      'right-bottom', // deprecated use right-end instead
      'right-top', // deprecated use right-start instead

      // new values to match floating-ui
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'left-end',
      'left-start',
      'right-end',
      'right-start',
    ]),
    [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ],
    mapPopoverAlign
  ),

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
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * The menu direction.
   */
  direction: PropTypes.oneOf([DIRECTION_TOP, DIRECTION_BOTTOM]),

  /**
   * `true` if the menu alignment should be flipped.
   */
  flipped: PropTypes.bool,

  /**
   * Enable or disable focus trap behavior
   */
  focusTrap: PropTypes.bool,

  /**
   * The CSS class for the icon.
   */
  iconClass: PropTypes.string,

  /**
   * The icon description.
   */
  iconDescription: PropTypes.string,

  /**
   * The element ID.
   */
  id: PropTypes.string,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make OverflowMenu background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `OverflowMenu` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
  ),

  /**
   * The adjustment in position applied to the floating menu.
   */
  menuOffset: PropTypes.oneOfType([
    PropTypes.shape({
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
    }),
    PropTypes.func,
  ]),

  /**
   * The adjustment in position applied to the floating menu.
   */
  menuOffsetFlip: PropTypes.oneOfType([
    PropTypes.shape({
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
    }),
    PropTypes.func,
  ]),

  /**
   * The class to apply to the menu options
   */
  menuOptionsClass: PropTypes.string,

  /**
   * The event handler for the `click` event.
   */
  onClick: PropTypes.func,

  /**
   * Function called when menu is closed
   */
  onClose: PropTypes.func,

  /**
   * The event handler for the `focus` event.
   */
  onFocus: PropTypes.func,

  /**
   * The event handler for the `keydown` event.
   */
  onKeyDown: PropTypes.func,

  /**
   * Function called when menu is opened
   */
  onOpen: PropTypes.func,

  /**
   * `true` if the menu should be open.
   */
  open: PropTypes.bool,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify a CSS selector that matches the DOM element that should
   * be focused when the OverflowMenu opens
   */
  selectorPrimaryFocus: PropTypes.string,

  /**
   * Specify the size of the OverflowMenu. Currently supports either `xs`, `sm`, `md` (default) or `lg` as an option.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
};

export default OverflowMenu;



