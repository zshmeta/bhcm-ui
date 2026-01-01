File: Button/Button.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import { Add, Notification } from '@carbon/icons-react';
import { default as Button, ButtonSkeleton } from '../Button';
import { Stack } from '../Stack';
import mdx from './Button.mdx';
import './button-story.scss';

export default {
  title: 'Components/Button',
  component: Button,
  subcomponents: {
    ButtonSkeleton,
  },
  argTypes: {
    kind: {
      options: [
        'primary',
        'secondary',
        'tertiary',
        'ghost',
        'danger',
        'danger--tertiary',
        'danger--ghost',
      ],
      control: { type: 'select' },
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' },
    },
    children: {
      control: false,
    },
    renderIcon: {
      control: false,
    },
    as: {
      control: false,
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return (
    <Stack gap={7}>
      <Button {...args}>Button</Button>
      <Button renderIcon={Add} {...args}>
        Button
      </Button>
    </Stack>
  );
};

export const Secondary = (args) => {
  return (
    <Stack gap={7}>
      <Button kind="secondary" {...args}>
        Button
      </Button>
      <Button kind="secondary" renderIcon={Add} {...args}>
        Button
      </Button>
    </Stack>
  );
};

export const Tertiary = (args) => {
  return (
    <Stack gap={7}>
      <Button kind="tertiary" {...args}>
        Button
      </Button>
      <Button kind="tertiary" renderIcon={Add} {...args}>
        Button
      </Button>
    </Stack>
  );
};

export const Danger = (args) => {
  return (
    <>
      <Button kind="danger" {...args}>
        Button
      </Button>
      &nbsp;
      <Button kind="danger--tertiary" {...args}>
        Danger tertiary button
      </Button>
      &nbsp;
      <Button kind="danger--ghost" {...args}>
        Danger ghost button
      </Button>
    </>
  );
};

export const Ghost = (args) => {
  return (
    <Stack gap={7}>
      <Button kind="ghost" {...args}>
        Button
      </Button>
      <Button kind="ghost" renderIcon={Add} {...args}>
        Button
      </Button>
    </Stack>
  );
};

export const IconButton = (args) => (
  <Button
    renderIcon={Add}
    iconDescription="Icon Description"
    hasIconOnly
    onClick={action('onClick')}
    {...args}
  />
);

export const IconButtonWithBadge = (args) => {
  const { badgeCount } = args;

  return (
    <Button
      kind="ghost"
      size="lg"
      badgeCount={badgeCount}
      hasIconOnly
      renderIcon={Notification}
      iconDescription="Notification"
      onClick={action('onClick')}
      autoAlign
      {...args}
    />
  );
};

IconButtonWithBadge.args = {
  badgeCount: 4,
};

export const Skeleton = () => {
  return (
    <div>
      <ButtonSkeleton />
      &nbsp;
      <ButtonSkeleton size="sm" />
    </div>
  );
};



File: Button/Button.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { IconButton, IconButtonKind, IconButtonKinds } from '../IconButton';
import { PopoverAlignment } from '../Popover';
import ButtonBase from './ButtonBase';
import { PolymorphicComponentPropWithRef } from '../../internal/PolymorphicProps';

export const ButtonKinds = [
  'primary',
  'secondary',
  'danger',
  'ghost',
  'danger--primary',
  'danger--ghost',
  'danger--tertiary',
  'tertiary',
] as const;

export type ButtonKind = (typeof ButtonKinds)[number];

export const ButtonSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

export type ButtonSize = (typeof ButtonSizes)[number];

export const ButtonTooltipAlignments = ['start', 'center', 'end'] as const;

export type ButtonTooltipAlignment = (typeof ButtonTooltipAlignments)[number];

export const ButtonTooltipPositions = ['top', 'right', 'bottom', 'left'];

export type ButtonTooltipPosition = (typeof ButtonTooltipPositions)[number];

export interface ButtonBaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specify the message read by screen readers for the danger button variant
   */
  dangerDescription?: string;

  /**
   * Specify if the button is an icon-only button
   */
  hasIconOnly?: boolean;

  /**
   * Optionally specify an href for your Button to become an `<a>` element
   */
  href?: React.AnchorHTMLAttributes<HTMLAnchorElement>['href'];

  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can
   * be read by screen readers
   */
  iconDescription?: string;

  /**
   * Specify whether the Button is expressive, or not. Only applies to the large/default button size.
   */
  isExpressive?: boolean;

  /**
   * Specify whether the Button is currently selected. Only applies to the Ghost variant.
   */
  isSelected?: boolean;

  /**
   * Specify the kind of Button you want to create
   */
  kind?: ButtonBaseProps['hasIconOnly'] extends true
    ? IconButtonKind
    : ButtonKind;

  /**
   * Optionally specify a `rel` when using an `<a>` element.
   */
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel'];

  /**
   * A component used to render an icon.
   */
  renderIcon?: React.ElementType;

  /**
   * Specify the size of the button, from the following list of sizes:
   */
  size?: ButtonSize;

  /**
   * Optionally specify a `target` when using an `<a>` element.
   */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment?: ButtonTooltipAlignment;

  /**
   * Enable drop shadow for tooltips for icon-only buttons.
   */
  tooltipDropShadow?: boolean;

  /**
   * Enable high-contrast theme for tooltips on icon-only buttons.
   * Defaults to true.
   */
  tooltipHighContrast?: boolean;

  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  tooltipPosition?: ButtonTooltipPosition;
}

export type ButtonProps<T extends React.ElementType> =
  PolymorphicComponentPropWithRef<T, ButtonBaseProps>;

export type ButtonComponent = <T extends React.ElementType = 'button'>(
  props: ButtonProps<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  context?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
) => React.ReactElement | any;

function isIconOnlyButton(
  hasIconOnly: ButtonBaseProps['hasIconOnly'],
  _kind: ButtonBaseProps['kind']
): _kind is IconButtonKind {
  if (hasIconOnly === true) {
    return true;
  }

  return false;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const Button: ButtonComponent = React.forwardRef(
  <T extends React.ElementType = 'button'>(
    props: ButtonProps<T>,
    ref: React.Ref<unknown>
  ) => {
    const {
      as,
      autoAlign = false,
      children,
      hasIconOnly = false,
      tooltipHighContrast = true,
      tooltipDropShadow = false,
      iconDescription,
      kind = 'primary',
      onBlur,
      onClick,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      renderIcon: ButtonImageElement,
      size,
      tooltipAlignment = 'center',
      tooltipPosition = 'top',
      ...rest
    } = props;

    if (ButtonImageElement && !children && !iconDescription) {
      // eslint-disable-next-line no-console -- https://github.com/carbon-design-system/carbon/issues/20452
      console.error(
        'Button: renderIcon property specified without also providing an iconDescription property. ' +
          'This may impact accessibility for screen reader users.'
      );
    }

    const iconOnlyImage = !ButtonImageElement ? null : <ButtonImageElement />;

    if (!isIconOnlyButton(hasIconOnly, kind)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { tooltipAlignment, ...propsWithoutTooltipAlignment } = props;
      return <ButtonBase ref={ref} {...propsWithoutTooltipAlignment} />;
    } else {
      let align: PopoverAlignment | undefined = undefined;

      if (tooltipPosition === 'top' || tooltipPosition === 'bottom') {
        if (tooltipAlignment === 'center') {
          align = tooltipPosition;
        }
        if (tooltipAlignment === 'end') {
          align = `${tooltipPosition}-end`;
        }
        if (tooltipAlignment === 'start') {
          align = `${tooltipPosition}-start`;
        }
      }

      if (tooltipPosition === 'right' || tooltipPosition === 'left') {
        align = tooltipPosition;
      }

      return (
        // @ts-expect-error - `IconButton` does not support all `size`s that
        // `Button` supports.
        //
        // TODO: What should be done here?
        // 1. Should the `IconButton` not be rendered if the `size` is not
        //    supported?
        // 2. Should an error be thrown?
        // 3. Something else?
        <IconButton
          {...rest}
          ref={ref}
          as={as}
          align={align}
          label={iconDescription}
          kind={kind}
          size={size}
          highContrast={tooltipHighContrast}
          dropShadow={tooltipDropShadow}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          autoAlign={autoAlign}
          onClick={onClick}
          renderIcon={iconOnlyImage ? null : ButtonImageElement} // avoid doubling the icon.
        >
          {iconOnlyImage ?? children}
        </IconButton>
      );
    }
  }
);

(Button as React.FC).displayName = 'Button';
(Button as React.FC).propTypes = {
  /**
   * Specify how the button itself should be rendered.
   * Make sure to apply all props to the root node and render children appropriately
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /**
   * **Experimental**: Will attempt to automatically align the tooltip. Requires
   * React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: PropTypes.bool,

  /**
   * Specify the content of your Button
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your Button
   */
  className: PropTypes.string,

  /**
   * Specify the message read by screen readers for the danger button variant
   */
  dangerDescription: PropTypes.string,

  /**
   * Specify whether the Button should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * Specify if the button is an icon-only button
   */
  hasIconOnly: PropTypes.bool,

  /**
   * Optionally specify an href for your Button to become an `<a>` element
   */
  href: PropTypes.string,

  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can
   * be read by screen readers
   */
  iconDescription: (props) => {
    if (props.renderIcon && !props.children && !props.iconDescription) {
      return new Error(
        'renderIcon property specified without also providing an iconDescription property.'
      );
    }
    return null;
  },

  /**
   * Specify whether the Button is expressive, or not
   */
  isExpressive: PropTypes.bool,

  /**
   * Specify whether the Button is currently selected. Only applies to the Ghost variant.
   */
  isSelected: PropTypes.bool,

  /**
   * Specify the kind of Button you want to create
   */
  kind: (props, propName, componentName) => {
    const { hasIconOnly } = props;
    const validKinds = hasIconOnly ? IconButtonKinds : ButtonKinds;

    if (props[propName] === undefined) {
      return null;
    }

    if (!validKinds.includes(props[propName])) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Expected one of ${validKinds.join(
          ', '
        )}.`
      );
    }

    return null;
  },

  /**
   * Provide an optional function to be called when the button element
   * loses focus
   */
  onBlur: PropTypes.func,

  /**
   * Provide an optional function to be called when the button element
   * is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an optional function to be called when the button element
   * receives focus
   */
  onFocus: PropTypes.func,

  /**
   * Provide an optional function to be called when the mouse
   * enters the button element
   */
  onMouseEnter: PropTypes.func,

  /**
   * Provide an optional function to be called when the mouse
   * leaves the button element
   */
  onMouseLeave: PropTypes.func,

  /**
   * Optionally specify a `rel` when using an `<a>` element.
   */
  rel: PropTypes.string,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Optional prop to specify the role of the Button
   */
  role: PropTypes.string,

  /**
   * Specify the size of the button, from the following list of sizes:
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),

  /**
   * Optional prop to specify the tabIndex of the Button
   */
  tabIndex: PropTypes.number,

  /**
   * Optionally specify a `target` when using an `<a>` element.
   */
  target: PropTypes.string,

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * Enable drop shadow for tooltips for icon-only buttons.
   */
  tooltipDropShadow: PropTypes.bool,

  /**
   * Enable high-contrast theme for tooltips for icon-only buttons.
   * Defaults to true.
   */
  tooltipHighContrast: PropTypes.bool,

  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * Optional prop to specify the type of the Button
   */
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
};

export default Button as ButtonComponent;



File: Button/button-story.scss


//
// Copyright IBM Corp. 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

.container {
  margin: 1rem;
  position: relative;

  button > span {
    background-color: rebeccapurple;
  }

  button > svg {
    background-color: rebeccapurple;
  }

  .ruler {
    height: 1px;
    width: 100%;
    position: absolute;
    border-top: 1px dotted black;
    box-sizing: border-box;

    &.top {
      &.sm {
        top: 6px;
      }

      &.md {
        top: 10px;
      }

      &.lg {
        top: 14px;
      }

      &.xl {
        top: 14px;
      }
    }

    &.bottom {
      &.sm {
        top: 25px;
      }

      &.md {
        top: 29px;
      }

      &.lg {
        top: 33px;
      }

      &.xl {
        top: 33px;
      }
    }
  }
}



File: Button/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Button from './Button';
import { type ButtonProps } from './Button';
export default Button;
export { Button, type ButtonProps };
export * from './Button';
export { default as ButtonSkeleton } from './Button.Skeleton';



File: Button/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-button--default',
    },
    {
      label: 'Danger',
      variant: 'components-button--danger',
    },
    {
      label: 'Ghost',
      variant: 'components-button--ghost',
    },
    {
      label: 'Icon Button',
      variant: 'components-button--icon-button',
    },
    {
      label: 'Secondary',
      variant: 'components-button--secondary',
    },
    {
      label: 'Set of Buttons (default)',
      variant: 'components-button-set-of-buttons--default',
    },
    {
      label: 'Set of Buttons (fluid)',
      variant: 'components-button-set-of-buttons--fluid',
    },
    {
      label: 'Tertiary',
      variant: 'components-button--tertiary',
    },
  ]}
/>



File: Button/migrate-to-7.x.md


# Props

`<Button>`

| v9                                                 | v10                                                                              |
| -------------------------------------------------- | -------------------------------------------------------------------------------- |
| `icon`, icon name or icon data from `carbon-icons` | `renderIcon`, which takes a React component, e.g. one from `@carbon/icons-react` |
| `danger--primary` value in `kind`                  | Removed                                                                          |
| `inputRef`                                         | `ref`                                                                            |

## `v10` example

```javascript
import AddFilled16 from '@carbon/icons-react/lib/add--filled/16';

...

<Button renderIcon={AddFilled16} />
```



File: Button/button-avt.md


Button Component Accessibility Verification Testing

Developers or designers wanting to manually verify the accessibility of the
component can carry out the following steps:

## Contrast

- [ ] the Button text has a contrast of 4.5:1 minimum against the background
      color
- [ ] the Button background has a contrast of 4.5:1 minimum against the page
      background

## Screen reader

Each screen reader should be tested when paired with its preferred browser.

### VoiceOver on Safari

1. {tab} "Button, button, main. You are currently on a button. To click this
   button press ctrl-option-space"

### JAWS on Edge/Chrome

1. {tab} "Main frame, Button, button. To activate press SPACEBAR"

### NVDA on Firefox (optional, but recommended)

1. {tab} "main frame, main landmark. Button button"



File: Button/Button.mdx


import { Story, ArgTypes, Canvas, Unstyled, Meta } from '@storybook/addon-docs/blocks';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import { Add, TrashCan } from '@carbon/icons-react';
import * as ButtonStories from './Button.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Buttons

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Button)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/button/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/button/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Secondary](#secondary)
- [Tertiary](#tertiary)
- [Ghost](#ghost)
- [Danger Button](#danger-button)
- [Icon-only Button](#icon-only-button)
- [Skeleton state](#skeleton-state)
- [Component API](#component-api)
  - [Button `as`](#button-as)
  - [Button `className`](#button-classname)
  - [Button `hasIconOnly`](#button-hasicononly)
  - [Button `href`](#button-href)
  - [Button `iconDescription`](#button-icondescription)
  - [Button `kind`](#button-kind)
  - [Button `renderIcon`](#button-rendericon)
  - [Button `role`](#button-role)
  - [Button `size`](#button-size)
  - [Button `tooltipAlignment`](#button-tooltipalignment)
  - [Button `tooltipPosition`](#button-tooltipposition)
  - [ButtonSet `stacked`](#buttonset-stacked)
- [References](#references)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

Buttons are clickable elements that are used to trigger actions. They
communicate calls to action to the user and allow users to interact with pages
in a variety of ways. `Button` labels express what action will occur when the
user interacts with it.

<Canvas
  of={ButtonStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ButtonStories.Default),
    },
  ]}
/>

## Secondary

<Canvas
  of={ButtonStories.Secondary}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ButtonStories.Secondary),
    },
  ]}
/>

## Tertiary

<Canvas
  of={ButtonStories.Tertiary}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ButtonStories.Tertiary),
    },
  ]}
/>

## Ghost

<Canvas
  of={ButtonStories.Ghost}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ButtonStories.Ghost),
    },
  ]}
/>

## Danger Button

The danger button has three different styles: primary, tertiary, and ghost.
Determining which danger button style to use will depend on the level of
emphasis you want to give to the danger action. Destructive actions that are
considered a required or primary step in a workflow should use the primary
danger button style. However, if a destructive action is just one of several
actions a user could choose from, then a lower emphasis style like the danger
tertiary button or the danger ghost button may be more appropriate.

<Canvas
  of={ButtonStories.Danger}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ButtonStories.Danger),
    },
  ]}
/>

## Icon-only Button

Icon buttons allow users to take actions, and make choices, with a single tap.
Icon buttons can take the form of Primary, Secondary, Tertiary, and Ghost but
most commonly will be styled as primary or ghost buttons. Icon only buttons do
not support Danger, Danger tertiary, or Danger ghost.

<Canvas
  of={ButtonStories.IconButton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ButtonStories.IconButton),
    },
  ]}
/>

## Skeleton state

You can use the `ButtonSkeleton` component to render a skeleton variant of a
button. This is useful to display on initial page load to indicate to users that
content is being loaded.

<Canvas
  of={ButtonStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ButtonStories.Skeleton),
    },
  ]}
/>

## Component API

<ArgTypes />

Additional props passed into `Button` will be forwarded along to the underlying
button element.

### Button `as`

This prop allows you to specify a different element to be rendered as a
`Button`. You may also need to add a [role](#button-role) for accessibility if
an element other than a `button` is rendered.

```jsx
<Button as="div" role="button">
  I'm a div tag
</Button>
```

### Button `className`

The className prop passed into `Button` will be forwarded along to the
underlying `Button` element. This is useful for specifying a custom class name
for layout.

```jsx
<Button className="custom-class">Submit</Button>
```

### Button `hasIconOnly`

Use this prop to render the icon-only variant of `Button`. First you'll pass in
the `renderIcon` prop to tell the `Button` which icon to render. Next, you'll
need to specify the `iconDescription` ([read more](#button-icondescription)),
which is used to populate the tooltip that is shown when the icon button is
interacted with, as well as internal `aria-label` for screen-readers. Lastly,
you can configure both the `tooltipAlignment`
([read more](#button-tooltipalignment)) and `tooltipPosition`
([read more](#button-tooltipposition)) props to tell the `Button` where your
tooltip should be rendered. These props default to `center` and `bottom`,
respectively.

<Unstyled>
  <Button hasIconOnly renderIcon={Add} iconDescription="Add" />
</Unstyled>

```jsx
<Button hasIconOnly renderIcon={Add} iconDescription="Add" />
```

### Button `href`

This prop allows you to specify an address to navigate to on click. This will
change the underlying `Button` element to be rendered as an `a` anchor element.

<Unstyled>
  <Button href="https://www.carbondesignsystem.com">Navigate</Button>
</Unstyled>

```jsx
<Button href="https://www.carbondesignsystem.com">Navigate</Button>
```

### Button `iconDescription`

If using the `hasIconOnly` prop, `iconDescription` becomes a required prop for
accessibility reasons. The text provided here populates the internal
`aria-label` tag on the icon, as well as provides text to be shown when the icon
button is interacted with.

```jsx
<Button hasIconOnly renderIcon={Add} iconDescription="Add" />
```

### Button `kind`

Carbon has seven types of buttons, `primary`, `secondary`, `tertiary`, `ghost`,
`danger`, `danger--tertiary`, and `danger--ghost`. If no `kind` is specified, a
`primary` button will be rendered. For more information on when to use each
variant, check out the
[design documentation](https://www.carbondesignsystem.com/components/button/usage#overview)

<Unstyled>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Button>Primary</Button>
    <Button kind="secondary">Secondary</Button>
    <Button kind="tertiary">Tertiary </Button>
    <Button kind="danger">Danger</Button>
    <Button kind="danger--tertiary">Danger tertiary</Button>
    <Button kind="danger--ghost">Danger Ghost</Button>
    <Button kind="ghost">Ghost</Button>
  </div>
</Unstyled>

```jsx
<Button>Primary</Button>
<Button kind="secondary">Secondary</Button>
<Button kind="tertiary">Tertiary</Button>
<Button kind="danger">Danger</Button>
<Button kind="danger--tertiary">Danger tertiary</Button>
<Button kind="danger--ghost">Danger ghost</Button>
<Button kind="ghost">Ghost</Button>
```

### Button `renderIcon`

This prop is used to tell `Button` which icon should be rendered inside the
button. Before you pass in the icon, you'll need to import the icon(s) you would
like to render, like so:

```js
import { Add, TrashCan } from '@carbon/react/icons';
```

Once the icons are imported, you can pass them directly in to the `Button`
component. Keep in mind, you will also need to add an `iconDescription` to help
with screen-reader support if you use the `renderIcon` prop. If you are trying
to render an icon-only button, please refer to the section on the
[hasIconOnly](#button-hasicononly) prop

<Unstyled>
  <Button renderIcon={Add} iconDescription="Add" style={{ marginRight: '3px' }}>
    Add
  </Button>
  <Button renderIcon={TrashCan} kind="danger" iconDescription="TrashCan">
    Delete
  </Button>
</Unstyled>

```jsx
<Button renderIcon={Add} iconDescription="Add">Add</Button>
<Button renderIcon={TrashCan} kind="danger" iconDescription="TrashCan">Delete</Button>
```

To render an icon of a different `size`, pass a function that spreads props on
the Icon to ensure the proper classes are applied:

<Unstyled>
  <Button
    renderIcon={(props) => <Add size={24} {...props} />}
    iconDescription="Add"
    style={{ marginRight: '3px' }}>
    Add
  </Button>
  <Button
    renderIcon={(props) => <TrashCan size={24} {...props} />}
    kind="danger"
    iconDescription="TrashCan">
    Delete
  </Button>
</Unstyled>

```jsx
<Button renderIcon={(props) => <Add size={24} {...props} />} iconDescription="Add">Add</Button>
<Button renderIcon={(props) => <TrashCan size={24} {...props} />} kind="danger"  iconDescription="TrashCan">Delete</Button>
```

### Button `role`

If you use the [as](#button-as) prop to render a non-button as a button, you may
need to add a `role` for accessibility reasons. Adding `role="button"` will make
an element appear as a button control to a screen reader. Check out the
[References](#references) section for more information.

<Unstyled>
  <Button as="div" role="button">
    a11y Button
  </Button>
</Unstyled>

```jsx
<Button as="div" role="button">
  a11y Button
</Button>
```

### Button `size`

This attribute specifies at which size the `button` should be rendered. Valid
values are `sm`, `md`, `lg`, `xl`, and `2xl`. If no size is specified, it
renders as `lg`.

<Button>Submit</Button> <Button size="sm">Submit</Button> <Button size="md">
  Submit
</Button> <Button size="xl">Submit</Button> <Button size="2xl">Submit</Button>

```jsx
<Button>Submit</Button>
<Button size="sm">Submit</Button>
<Button size="md">Submit</Button>
<Button size="xl">Submit</Button>
<Button size="2xl">Submit</Button>
```

### Button `tooltipAlignment`

The `tooltipAlignment` prop is used to change where the tooltip text and caret
is rendered in relation to the `Button`. Accepted options are `start`, `center`,
and `end`. The default alignment is `center`.

<Button
  hasIconOnly
  renderIcon={Add}
  iconDescription="Add to selection"
  tooltipAlignment="start"
/> <Button hasIconOnly renderIcon={Add} iconDescription="Add to selection" /> <Button
  hasIconOnly
  renderIcon={Add}
  iconDescription="Add to selection"
  tooltipAlignment="end"
/>

```jsx
<Button hasIconOnly renderIcon={Add} iconDescription="Add to selection" tooltipAlignment="start" />
<Button hasIconOnly renderIcon={Add} iconDescription="Add to selection" />
<Button hasIconOnly renderIcon={Add} iconDescription="Add to selection" tooltipAlignment="end"/>
```

### Button `tooltipPosition`

When using an icon-only button, you may be in a situation where you need to
change where the tooltip is positioned on the screen. `tooltipPosition` takes in
a position and will render the tooltip accordingly. Accepted options are `top`,
`bottom`, `left`, and `right`. The default is position is `top`.

<Button hasIconOnly renderIcon={Add} iconDescription="Add" />
<Button
  hasIconOnly
  renderIcon={Add}
  iconDescription="Add"
  tooltipPosition="right"
/>
<Button
  hasIconOnly
  renderIcon={Add}
  iconDescription="Add"
  tooltipPosition="bottom"
/>
<Button
  hasIconOnly
  renderIcon={Add}
  iconDescription="Add"
  tooltipPosition="left"
/>

```jsx
<Button hasIconOnly renderIcon={Add} iconDescription="Add" />
<Button hasIconOnly renderIcon={Add} iconDescription="Add" tooltipPosition="right"/>
<Button hasIconOnly renderIcon={Add} iconDescription="Add" tooltipPosition="bottom"/>
<Button hasIconOnly renderIcon={Add} iconDescription="Add" tooltipPosition="left" />
```

### ButtonSet `stacked`

By passing in `stacked` to the `ButtonSet` component, you can arrange your two
`Button` elements vertically

<ButtonSet stacked>
  <Button kind="secondary">Secondary button</Button>
  <Button kind="primary">Primary button</Button>
</ButtonSet>

```jsx
<ButtonSet stacked>
  <Button kind="secondary">Secondary button</Button>
  <Button kind="primary">Primary button</Button>
</ButtonSet>
```

## References

[MDN: ARIA button role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role)

[W3: Role attribute](https://www.w3.org/WAI/PF/HTML/wiki/RoleAttribute)

[W3: ARIA button role example](https://www.w3.org/TR/2016/WD-wai-aria-practices-1.1-20160317/examples/button/button.html)

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Button/Button.mdx)



File: Button/ButtonBase.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type JSX } from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import { ButtonBaseProps, ButtonProps } from './Button';

const ButtonBase = React.forwardRef(function ButtonBase<
  T extends React.ElementType,
>(
  {
    as,
    children,
    className,
    dangerDescription = 'danger',
    disabled = false,
    hasIconOnly = false,
    href,
    iconDescription,
    isExpressive = false,
    isSelected,
    kind = 'primary',
    onBlur,
    onClick,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    renderIcon: ButtonImageElement,
    size,
    tabIndex,
    type = 'button',
    ...rest
  }: ButtonProps<T>,
  ref: React.Ref<unknown>
) {
  const prefix = usePrefix();

  const buttonClasses = classNames(className, {
    [`${prefix}--btn`]: true,
    [`${prefix}--btn--xs`]: size === 'xs' && !isExpressive, // TODO: V12 - Remove this class
    [`${prefix}--btn--sm`]: size === 'sm' && !isExpressive, // TODO: V12 - Remove this class
    [`${prefix}--btn--md`]: size === 'md' && !isExpressive, // TODO: V12 - Remove this class
    [`${prefix}--btn--lg`]: size === 'lg' && !isExpressive, // TODO: V12 - Remove this class
    [`${prefix}--btn--xl`]: size === 'xl', // TODO: V12 - Remove this class
    [`${prefix}--btn--2xl`]: size === '2xl', // TODO: V12 - Remove this class
    [`${prefix}--layout--size-${size}`]: size,
    [`${prefix}--btn--${kind}`]: kind,
    [`${prefix}--btn--disabled`]: disabled,
    [`${prefix}--btn--expressive`]: isExpressive,
    [`${prefix}--btn--icon-only`]: hasIconOnly,
    [`${prefix}--btn--selected`]: hasIconOnly && isSelected && kind === 'ghost',
  });

  const commonProps = {
    tabIndex,
    className: buttonClasses,
    ref,
  };

  const buttonImage = !ButtonImageElement ? null : (
    <ButtonImageElement
      aria-label={iconDescription}
      className={`${prefix}--btn__icon`}
      aria-hidden="true"
    />
  );

  const dangerButtonVariants = ['danger', 'danger--tertiary', 'danger--ghost'];

  let component: React.ElementType = 'button';
  const assistiveId = useId('danger-description');
  const { 'aria-pressed': ariaPressed, 'aria-describedby': ariaDescribedBy } =
    rest;
  let otherProps: Partial<ButtonBaseProps> = {
    disabled,
    type,
    'aria-describedby': dangerButtonVariants.includes(kind)
      ? assistiveId
      : ariaDescribedBy || undefined,
    'aria-pressed':
      ariaPressed ?? (hasIconOnly && kind === 'ghost' ? isSelected : undefined),
  };
  const anchorProps = {
    href,
  };

  let assistiveText: JSX.Element | null = null;
  if (dangerButtonVariants.includes(kind)) {
    assistiveText = (
      <span id={assistiveId} className={`${prefix}--visually-hidden`}>
        {dangerDescription}
      </span>
    );
  }

  if (as) {
    component = as;
    otherProps = {
      ...otherProps,
      ...anchorProps,
    };
  } else if (href && !disabled) {
    component = 'a';
    otherProps = anchorProps;
  }

  return React.createElement(
    component,
    {
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onClick,
      ...rest,
      ...commonProps,
      ...otherProps,
    },
    assistiveText,
    children,
    buttonImage
  );
});

export default ButtonBase;



File: Button/__story__/fluid-button-set-args.js


/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const btn = (label, kind, key) => {
  return {
    label,
    kind,
    key,
  };
};

const primary = btn('Primary', 'primary', 1);
const danger = btn('Danger', 'danger', 2);
const secondary = btn('Secondary', 'secondary', 3);
const secondary2 = btn('Secondary 2', 'secondary 2', 4);
const tertiary = btn('Tertiary', 'tertiary', 5);
const dangerGhost = btn('Danger-ghost', 'danger--ghost', 6);
const ghost = btn('Ghost', 'ghost', 7);

const fluidButtonSets = [
  { label: 'None', mapping: [] },
  { label: 'One button', mapping: [primary] },
  { label: 'A danger button', mapping: [danger] },
  { label: 'A ghost button', mapping: [ghost] },
  { label: 'Two buttons', mapping: [secondary, primary] },
  { label: 'Two buttons with one ghost', mapping: [ghost, primary] },
  { label: 'Three buttons', mapping: [secondary, secondary2, primary] },
  {
    label: 'Three buttons with one ghost',
    mapping: [ghost, secondary, primary],
  },
  {
    label: 'Three buttons with one danger',
    mapping: [ghost, secondary, danger],
  },
  {
    label: 'Four buttons',
    mapping: [tertiary, secondary, secondary2, primary],
  },
  {
    label: 'Four buttons with one ghost',
    mapping: [ghost, secondary, secondary2, primary],
  },
  {
    label: 'Four buttons with danger ghost',
    mapping: [dangerGhost, secondary, secondary2, danger],
  },
];

export const fluidButtonOptions = fluidButtonSets.map((_, i) => i);

export const fluidButtonLabels = fluidButtonSets.reduce((acc, val, i) => {
  acc[i] = val.label;
  return acc;
}, {});

export const fluidButtonMapping = fluidButtonSets.reduce((acc, val, i) => {
  acc[i] = val.mapping;
  return acc;
}, {});



File: Button/Button.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { ButtonSize } from './Button';

export interface ButtonSkeletonProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optionally specify an href for your Button to become an `<a>` element
   */
  href?: string;

  /**
   * Specify the size of the button, from a list of available sizes.
   */
  size?: ButtonSize;

  /**
   * @deprecated This property will be removed in the next major Carbon version,
   * use size={sm} instead.
   *
   * Specify whether the Button should be a small variant
   */
  small?: boolean;
}

const ButtonSkeleton: React.FC<ButtonSkeletonProps> = ({
  className,
  small = false,
  href,
  size = 'lg',
  ...rest
}: ButtonSkeletonProps) => {
  const prefix = usePrefix();

  const buttonClasses = cx(className, {
    [`${prefix}--skeleton`]: true,
    [`${prefix}--btn`]: true,
    [`${prefix}--btn--xs`]: size === 'xs',
    [`${prefix}--btn--sm`]: small || size === 'sm',
    [`${prefix}--btn--md`]: size === 'md',
    [`${prefix}--btn--lg`]: size === 'lg',
    [`${prefix}--btn--xl`]: size === 'xl',
    [`${prefix}--btn--2xl`]: size === '2xl',
  });

  const commonProps = {
    className: buttonClasses,
    ...rest,
  };

  const button = <div {...commonProps} />;

  const anchor = <a {...commonProps} href={href} role="button" />; // eslint-disable-line

  return href ? anchor : button;
};

ButtonSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Optionally specify an href for your Button to become an `<a>` element
   */
  href: PropTypes.string,

  /**
   * Specify the size of the button, from a list of available sizes.
   * For `default` buttons, this prop can remain unspecified or use `default`.
   * In the next major release of Carbon, `default`, `field`, and `small` will be removed
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),

  /**
   * @deprecated This property will be removed in the next major Carbon version,
   * use size={sm} instead.
   *
   * Specify whether the Button should be a small variant
   */
  small: PropTypes.bool,
};

export default ButtonSkeleton;
export { ButtonSkeleton };



