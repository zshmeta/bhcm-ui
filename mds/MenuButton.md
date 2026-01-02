File: MenuButton/MenuButton.mdx


import { ArgTypes, Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as MenuButtonStories from "./MenuButton.stories.js"
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# MenuButton

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/MenuButton)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
    - [With Danger](#with-danger)
    - [With Dividers](#with-dividers)
    - [With Icons](#with-icons)
- [Menu Alignment](#menu-alignment)
- [menuTarget Prop](#menutarget-prop)
- [Managing the `menuTarget` prop with React refs](#managing-the-menutarget-prop-with-react-refs)
- [Experimental Auto Align](#experimental-auto-align)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

A `MenuButton` can be used to group a set of actions that are related. These
actions must be `MenuItem`s passed as `children`. The trigger buttons's label is
passed as `props.label`.

```jsx
<MenuButton label="Actions">
  <MenuItem label="First action" />
  <MenuItem label="Second action" />
  <MenuItem label="Third action" />
</MenuButton>
```
<Canvas
  of={MenuButtonStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(MenuButtonStories.Default),
    },
  ]}
/>

#### With Danger

<Canvas
  of={MenuButtonStories.WithDanger}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(MenuButtonStories.WithDanger),
    },
  ]}
/>

#### With Dividers

<Canvas
  of={MenuButtonStories.WithDividers}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(MenuButtonStories.WithDividers),
    },
  ]}
/>

#### With Icons

<Canvas
  of={MenuButtonStories.WithIcons}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(MenuButtonStories.WithIcons),
    },
  ]}
/>

## Menu Alignment

The `menuAlignment` prop enables you to define the placement of the Menu in
relation to the `MenuButton`. For instance, setting `menuAlignment="top"` on the
`MenuButton` will render the Menu above the button.

If it seems your specified `menuAlignment` isn't working, it's because we
prioritize ensuring the Menu remains visible. We calculate the optimal position
to display the Menu in case the provided `menuAlignment` obscures it.

We encourage you to play around in the Storybook Default stories to better
understand the `menuAlignment` prop.

<Canvas
  of={MenuButtonStories.WithMenuAlignment}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(MenuButtonStories.WithMenuAlignment),
    },
  ]}
/>

## menuTarget Prop

The `menuTarget` prop specifies where the `Menu` should render, which is
particularly useful when using `MenuButton` inside a modal. By default, the menu
renders in `document.body`, but this can disrupt focus order in modals or other
components with focus management.

Pass the `menuTarget` prop to render the `Menu` inside the modal or any specific
element where you want it to render:

## Managing the `menuTarget` prop with React refs
Because React does not trigger re-renders when a ref's `.current` value changes,
you must capture the ref value in state to update the `menuTarget` prop.
```tsx
const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState<HTMLDivElement | undefined>(undefined);
  useEffect(() => {
    if (containerRef.current) {
      setTarget(containerRef.current);
    }
  }, []);
  return (
    <div ref={containerRef}>
      <MenuButton label="Actions" menuTarget={target}>
        <MenuItem label="First action" />
      </MenuButton>
    </div>
  );
};
```

## Experimental Auto Align

<Canvas
  of={MenuButtonStories.ExperimentalAutoAlign}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(MenuButtonStories.ExperimentalAutoAlign),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/MenuButton/MenuButton.mdx).



File: MenuButton/MenuButton.stories.js


/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';

import { MenuItem, MenuItemDivider } from '../Menu';

import { Asset, User, Group } from '@carbon/react/icons';

import { MenuButton } from './';
import mdx from './MenuButton.mdx';

export default {
  title: 'Components/MenuButton',
  component: MenuButton,
  subcomponents: {
    MenuItem,
    MenuItemDivider,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['menuTarget'],
    },
  },
};

export const Default = (args) => {
  return (
    <MenuButton {...args} onClick={action('onClick')} label="Actions">
      <MenuItem
        label="First action with a long label description"
        onClick={action('onClick')}
      />
      <MenuItem label="Second action" onClick={action('onClick')} />
      <MenuItem label="Third action" onClick={action('onClick')} disabled />
    </MenuButton>
  );
};

Default.args = { label: 'Actions' };

export const ExperimentalAutoAlign = (args) => (
  <div style={{ width: '5000px', height: '5000px' }}>
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
      }}>
      <MenuButton label="Actions" {...args}>
        <MenuItem label="First action" />
        <MenuItem label="Second action that is a longer item to test overflow and title." />
        <MenuItem label="Third action" disabled />
      </MenuButton>
    </div>
  </div>
);

export const WithDanger = (args) => {
  return (
    <MenuButton label="Actions" {...args}>
      <MenuItem label="First action" />
      <MenuItem label="Second action" />
      <MenuItem label="Third action" />
      <MenuItemDivider />
      <MenuItem label="Danger action" kind="danger" />
    </MenuButton>
  );
};

export const WithDividers = (args) => {
  return (
    <MenuButton label="Actions" {...args}>
      <MenuItem label="Create service request" />
      <MenuItem label="Create work order" />
      <MenuItemDivider />
      <MenuItem label="Add plan" />
      <MenuItem label="Add flag" />
      <MenuItemDivider />
      <MenuItem label="Edit source location" />
      <MenuItem label="Recalculate source" />
    </MenuButton>
  );
};

export const WithIcons = (args) => {
  return (
    <MenuButton label="Add" {...args}>
      <MenuItem label="Asset" renderIcon={Asset} />
      <MenuItem label="User" renderIcon={User} />
      <MenuItem label="User group" renderIcon={Group} />
    </MenuButton>
  );
};

export const WithNestedMenu = (args) => (
  <MenuButton label="Actions" {...args}>
    <MenuItem label="Save" shortcut="⌘S" />
    <MenuItem label="Save as" shortcut="⌥⌘S" />
    <MenuItem label="Export as">
      <MenuItem label="PDF" />
      <MenuItem label="JPG" />
      <MenuItem label="PNG" />
    </MenuItem>
    <MenuItemDivider />
    <MenuItem label="Delete" kind="danger" />
  </MenuButton>
);

export const WithMenuAlignment = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <MenuButton label="Bottom" menuAlignment="bottom">
          <MenuItem label="First action" />
          <MenuItem label="Second action that is a longer item to test overflow and title." />
          <MenuItem label="Third action" disabled />
        </MenuButton>

        <MenuButton label="Bottom start" menuAlignment="bottom-start">
          <MenuItem label="First action" />
          <MenuItem label="Second action that is a longer item to test overflow and title." />
          <MenuItem label="Third action" disabled />
        </MenuButton>

        <MenuButton label="Bottom end" menuAlignment="bottom-end">
          <MenuItem label="First action" />
          <MenuItem label="Second action that is a longer item to test overflow and title." />
          <MenuItem label="Third action" disabled />
        </MenuButton>
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: '15rem',
          justifyContent: 'space-between',
        }}>
        <MenuButton label="Top" menuAlignment="top">
          <MenuItem label="First action" />
          <MenuItem label="Second action that is a longer item to test overflow and title." />
          <MenuItem label="Third action" disabled />
        </MenuButton>

        <MenuButton label="Top start" menuAlignment="top-start">
          <MenuItem label="First action" />
          <MenuItem label="Second action that is a longer item to test overflow and title." />
          <MenuItem label="Third action" disabled />
        </MenuButton>

        <MenuButton label="Top end" menuAlignment="top-end">
          <MenuItem label="First action" />
          <MenuItem label="Second action that is a longer item to test overflow and title." />
          <MenuItem label="Third action" disabled />
        </MenuButton>
      </div>
    </>
  );
};



File: MenuButton/MenuButton.featureflag.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MenuItem } from '../Menu';
import { MenuButton } from '../MenuButton';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/MenuButton/Feature Flag',
  component: MenuButton,
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

export const FloatingStyles = (args) => (
  <MenuButton menuAlignment={args.menuAlignment} label="Actions">
    <MenuItem label="First action" />
    <MenuItem label="Second action that is a longer item to test overflow and title." />
    <MenuItem label="Third action" disabled />
  </MenuButton>
);

FloatingStyles.args = {
  menuAlignment: 'bottom',
};

FloatingStyles.argTypes = {
  menuAlignment: {
    options: ['top', 'bottom'],
    control: {
      type: 'radio',
    },
  },
};



File: MenuButton/MenuButton.DynamicStyles.featureflag.mdx


import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Components/MenuButton/Feature Flag" name="Flag details" />

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
  <MenuButton menuAlignment={args.menuAlignment} label="Actions">
    <MenuItem label="First action" />
    <MenuItem label="Second action that is a longer item to test overflow and title." />
    <MenuItem label="Third action" disabled />
  </MenuButton>
</FeatureFlags>
```



File: MenuButton/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  tall
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-menubutton--default'
    },
  ]}
/>



File: MenuButton/index.tsx


/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  ComponentProps,
  forwardRef,
  ReactNode,
  useLayoutEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ChevronDown } from '@carbon/icons-react';
import Button from '../Button';
import { Menu } from '../Menu';

import { useAttachedMenu } from '../../internal/useAttachedMenu';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import {
  useFloating,
  flip,
  size as floatingSize,
  autoUpdate,
} from '@floating-ui/react';
import { useFeatureFlag } from '../FeatureFlags';
import { mergeRefs } from '../../tools/mergeRefs';

const validButtonKinds = ['primary', 'tertiary', 'ghost'];
const defaultButtonKind = 'primary';

export type MenuAlignment =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end';
export interface MenuButtonProps extends ComponentProps<'div'> {
  /**
   * A collection of MenuItems to be rendered as actions for this MenuButton.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Specify whether the MenuButton should be disabled, or not.
   */
  disabled?: boolean;

  /**
   * Specify the type of button to be used as the base for the trigger button.
   */
  kind?: 'primary' | 'tertiary' | 'ghost';

  /**
   * Provide the label to be rendered on the trigger button.
   */
  label: string;

  /**
   * Experimental property. Specify how the menu should align with the button element
   */
  menuAlignment?: MenuAlignment;

  /**
   * Specify the size of the button and menu.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * Specify the tabIndex of the button.
   */
  tabIndex?: number;

  /**
   * Specify the background token to use for the menu. Default is 'layer'.
   */
  menuBackgroundToken?: 'layer' | 'background';

  /**
   * Specify whether a border should be rendered on the menu
   */
  menuBorder?: boolean;

  /**
   * Specify a DOM node where the Menu should be rendered in. Defaults to document.body.
   */
  menuTarget?: Element;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const MenuButton = forwardRef<HTMLDivElement, MenuButtonProps>(
  (
    {
      children,
      className,
      disabled,
      kind = defaultButtonKind,
      label,
      menuBackgroundToken = 'layer',
      menuBorder = false,
      size = 'lg',
      menuAlignment = 'bottom',
      tabIndex = 0,
      menuTarget,
      ...rest
    },
    forwardRef
  ) => {
    // feature flag utilized to separate out only the dynamic styles from @floating-ui
    // flag is turned on when collision detection (ie. flip, hide) logic is not desired
    const enableOnlyFloatingStyles = useFeatureFlag(
      'enable-v12-dynamic-floating-styles'
    );

    const id = useId('MenuButton');
    const prefix = usePrefix();
    const triggerRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    let middlewares: any[] = [];

    if (!enableOnlyFloatingStyles) {
      middlewares = [flip({ crossAxis: false })];
    }

    if (menuAlignment === 'bottom' || menuAlignment === 'top') {
      middlewares.push(
        floatingSize({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          },
        })
      );
    }
    const { refs, floatingStyles, placement, middlewareData } = useFloating({
      placement: menuAlignment,

      // The floating element is positioned relative to its nearest
      // containing block (usually the viewport). It will in many cases also
      // “break” the floating element out of a clipping ancestor.
      // https://floating-ui.com/docs/misc#clipping
      strategy: 'fixed',

      // Submenus are using a fixed position to break out of the parent menu's
      // box avoiding clipping while allowing for vertical scroll. When an
      // element is using transform it establishes a new containing block
      // block for all of its descendants. Therefore, its padding box will be
      // used for fixed-positioned descendants. This would cause the submenu
      // to be clipped by its parent menu.
      // Reference: https://www.w3.org/TR/2019/CR-css-transforms-1-20190214/#current-transformation-matrix-computation
      // Reference: https://github.com/carbon-design-system/carbon/pull/18153#issuecomment-2498548835
      transform: false,

      // Middleware order matters, arrow should be last
      middleware: middlewares,
      whileElementsMounted: autoUpdate,
    });
    const ref = mergeRefs(forwardRef, triggerRef);
    const {
      open,
      handleClick: hookOnClick,
      handleMousedown,
      handleClose,
    } = useAttachedMenu(triggerRef);

    useLayoutEffect(() => {
      Object.keys(floatingStyles).forEach((style) => {
        if (refs.floating.current) {
          let value = floatingStyles[style];

          if (
            ['top', 'right', 'bottom', 'left'].includes(style) &&
            Number(value)
          ) {
            value += 'px';
          }

          refs.floating.current.style[style] = value;
        }
      });
    }, [floatingStyles, refs.floating, middlewareData, placement, open]);

    function handleClick() {
      if (triggerRef.current) {
        hookOnClick();
      }
    }

    const containerClasses = classNames(
      `${prefix}--menu-button__container`,
      className
    );

    const triggerClasses = classNames(`${prefix}--menu-button__trigger`, {
      [`${prefix}--menu-button__trigger--open`]: open,
    });

    const menuClasses = classNames(`${prefix}--menu-button__${menuAlignment}`);

    return (
      <div
        {...rest}
        ref={ref}
        aria-owns={open ? id : undefined}
        className={containerClasses}>
        <Button
          ref={refs.setReference}
          className={triggerClasses}
          size={size}
          tabIndex={tabIndex}
          kind={kind}
          renderIcon={ChevronDown}
          disabled={disabled}
          aria-haspopup
          aria-expanded={open}
          onClick={handleClick}
          onMouseDown={handleMousedown}
          aria-controls={open ? id : undefined}>
          {label}
        </Button>
        <Menu
          containerRef={triggerRef}
          menuAlignment={menuAlignment}
          className={menuClasses}
          ref={refs.setFloating}
          id={id}
          legacyAutoalign={false}
          label={label}
          size={size}
          open={open}
          onClose={handleClose}
          target={menuTarget}
          backgroundToken={menuBackgroundToken}
          border={menuBorder}>
          {children}
        </Menu>
      </div>
    );
  }
);

MenuButton.propTypes = {
  /**
   * A collection of MenuItems to be rendered as actions for this MenuButton.
   */
  children: PropTypes.node.isRequired,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * Specify whether the MenuButton should be disabled, or not.
   */
  disabled: PropTypes.bool,

  /**
   * Specify the type of button to be used as the base for the trigger button.
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore-next-line -- avoid spurious (?) TS2322 error
  kind: PropTypes.oneOf(validButtonKinds),

  /**
   * Provide the label to be rendered on the trigger button.
   */
  label: PropTypes.string.isRequired,

  /**
   * Experimental property. Specify how the menu should align with the button element
   */
  menuAlignment: PropTypes.oneOf([
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
  ]),

  /**
   * Specify the size of the button and menu.
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore-next-line -- avoid spurious (?) TS2322 error
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),

  /**
   * Specify the tabIndex of the button.
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore-next-line -- avoid spurious (?) TS2322 error
  tabIndex: PropTypes.number,

  /**
   * Specify the background token to use for the menu. Default is 'layer'.
   */
  menuBackgroundToken: PropTypes.oneOf(['layer', 'background']),

  /**
   * Specify whether a border should be rendered on the menu
   */
  menuBorder: PropTypes.bool,

  /**
   * Specify a DOM node where the Menu should be rendered in. Defaults to document.body.
   */
  menuTarget: PropTypes.instanceOf(
    typeof Element !== 'undefined' ? Element : Object
  ) as PropTypes.Validator<Element | null | undefined>,
};

export { MenuButton };



File: MenuButton/MenuButton-test.js


/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { MenuItem } from '../Menu';

import { MenuButton } from './';

const prefix = 'cds';

describe('MenuButton', () => {
  describe('renders as expected - Component API', () => {
    it('supports a ref on the outermost element', () => {
      const ref = jest.fn();
      const { container } = render(
        <MenuButton label="Actions" ref={ref}>
          <MenuItem label="Action" />
        </MenuButton>
      );
      expect(ref).toHaveBeenCalledWith(container.firstChild);
    });

    it('supports a custom class name on the outermost element', () => {
      const { container } = render(
        <MenuButton label="Actions" className="test">
          <MenuItem label="Action" />
        </MenuButton>
      );
      expect(container.firstChild).toHaveClass('test');
    });

    it('forwards additional props on the outermost element', () => {
      const { container } = render(
        <MenuButton label="Actions" data-testid="test">
          <MenuItem label="Action" />
        </MenuButton>
      );
      expect(container.firstChild).toHaveAttribute('data-testid', 'test');
    });

    it('renders props.label on the trigger button', () => {
      render(
        <MenuButton label="Test">
          <MenuItem label="Action" />
        </MenuButton>
      );
      expect(screen.getByRole('button')).toHaveTextContent(/^Test$/);
    });

    it('supports props.disabled', () => {
      render(
        <MenuButton label="Actions" disabled>
          <MenuItem label="Action" />
        </MenuButton>
      );

      expect(screen.getByRole('button')).toBeDisabled();
    });

    describe('supports props.size', () => {
      // Button component doesn't apply any size class for `lg`
      const sizes = ['xs', 'sm', 'md'];

      sizes.forEach((size) => {
        it(`size="${size}"`, () => {
          render(
            <MenuButton label="Actions" size={size}>
              <MenuItem label="Action" />
            </MenuButton>
          );

          expect(screen.getByRole('button')).toHaveClass(
            `${prefix}--btn--${size}`
          );
        });
      });
    });

    describe('supports props.kind', () => {
      const kinds = ['primary', 'tertiary', 'ghost'];

      kinds.forEach((kind) => {
        it(`kind="${kind}"`, () => {
          render(
            <MenuButton label="Actions" kind={kind}>
              <MenuItem label="Action" />
            </MenuButton>
          );

          expect(screen.getByRole('button')).toHaveClass(
            `${prefix}--btn--${kind}`
          );
        });
      });
    });
  });

  describe('behaves as expected', () => {
    it('opens a menu on click', async () => {
      render(
        <MenuButton label="Actions">
          <MenuItem label="Action" />
        </MenuButton>
      );

      await userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(screen.getByRole('menuitem')).toHaveTextContent(/^Action$/);
    });

    it('has basic keyboard support', async () => {
      const onClick = jest.fn();

      render(
        <MenuButton label="Actions">
          <MenuItem label="Action 1" />
          <MenuItem label="Action 2" onClick={onClick} />
        </MenuButton>
      );

      expect(document.body).toHaveFocus();

      // Tab to MenuButton.
      await userEvent.tab();
      const menuButton = screen.getByRole('button', { name: 'Actions' });
      expect(menuButton).toHaveFocus();

      // Open the menu with Enter.  Focus moves to first MenuItem.
      await userEvent.keyboard('{Enter}');
      expect(screen.getByRole('menu')).toBeInTheDocument();
      const menuItem1 = screen.getByRole('menuitem', { name: 'Action 1' });
      expect(menuItem1).toHaveFocus();

      // Close the menu with Escape.  Focus should move back to MenuButton.
      await userEvent.keyboard('{Escape}');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      expect(menuButton).toHaveFocus();
      expect(onClick).not.toHaveBeenCalled();

      // Open the menu with Space.  Focus moves to first MenuItem.
      await userEvent.keyboard(' ');
      expect(screen.getByRole('menu')).toBeInTheDocument();
      const menuItem1Again = screen.getByRole('menuitem', { name: 'Action 1' });
      expect(menuItem1Again).toHaveFocus();

      // Arrow down to second MenuItem.
      await userEvent.keyboard('{ArrowDown}');
      const menuItem2 = screen.getByRole('menuitem', { name: 'Action 2' });
      expect(menuItem2).toHaveFocus();

      // Click the second MenuItem with Enter.  Menu should close, and focus should move back to MenuButton.
      await userEvent.keyboard('{Enter}');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      expect(menuButton).toHaveFocus();
      expect(onClick).toHaveBeenCalled();
    });

    it('does not steal focus', async () => {
      render(
        <>
          <MenuButton label="Actions">
            <MenuItem
              label="Action"
              onClick={() => {
                // This focus() should "override" Carbon's behavior to focus the MenuButton.
                document.querySelector('input')?.focus();
              }}
            />
          </MenuButton>
          <input />
        </>
      );

      expect(document.body).toHaveFocus();

      // Tab to MenuButton.
      await userEvent.tab();
      const menuButton = screen.getByRole('button', { name: 'Actions' });
      expect(menuButton).toHaveFocus();

      // Open the menu with Enter.  Focus moves to MenuItem.
      await userEvent.keyboard('{Enter}');
      const menuItem = screen.getByRole('menuitem', { name: 'Action' });
      expect(menuItem).toHaveFocus();

      // Click the MenuItem with Enter.  Menu should close, and focus should move to <input>.
      await userEvent.keyboard('{Enter}');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      const input = screen.getByRole('textbox');
      expect(input).toHaveFocus();

      // Shift-tab to MenuButton.
      await userEvent.tab({ shift: true });
      expect(menuButton).toHaveFocus();

      // Open the menu with Space.  Focus moves to MenuItem.
      await userEvent.keyboard(' ');
      const menuItemAgain = screen.getByRole('menuitem', { name: 'Action' });
      expect(menuItemAgain).toHaveFocus();

      // Click the MenuItem with Space.  Menu should close, and focus should move to <input>.
      await userEvent.keyboard(' ');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      expect(input).toHaveFocus();
    });
  });

  describe('supports props.menuAlignment', () => {
    const alignments = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
    ];

    alignments.forEach((alignment) => {
      it(`menuAlignment="${alignment}"`, async () => {
        render(
          <MenuButton label="Actions" menuAlignment={alignment}>
            <MenuItem label="Action" />
          </MenuButton>
        );

        await userEvent.click(screen.getByRole('button'));

        expect(screen.getByRole('menu')).toHaveClass(
          `${prefix}--menu-button__${alignment}`
        );
      });
    });
  });

  describe('supports menu styling props', () => {
    it('should add border class when menuBorder is true', async () => {
      render(
        <MenuButton label="Actions" menuBorder>
          <MenuItem label="Action" />
        </MenuButton>
      );

      await userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('menu')).toHaveClass(`${prefix}--menu--border`);
    });

    it('should not add border class when menuBorder is false', async () => {
      render(
        <MenuButton label="Actions" menuBorder={false}>
          <MenuItem label="Action" />
        </MenuButton>
      );

      await userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('menu')).not.toHaveClass(
        `${prefix}--menu--border`
      );
    });

    it('should add background token class when menuBackgroundToken is "background"', async () => {
      render(
        <MenuButton label="Actions" menuBackgroundToken="background">
          <MenuItem label="Action" />
        </MenuButton>
      );

      await userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('menu')).toHaveClass(
        `${prefix}--menu--background-token__background`
      );
    });

    it('should not add background token class when menuBackgroundToken is "layer"', async () => {
      render(
        <MenuButton label="Actions" menuBackgroundToken="layer">
          <MenuItem label="Action" />
        </MenuButton>
      );

      await userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('menu')).not.toHaveClass(
        `${prefix}--menu--background-token__background`
      );
    });
  });
});



