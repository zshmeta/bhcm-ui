File: Toggletip/Toggletip.featureflag.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Information } from '@carbon/icons-react';

import { Link } from '../Link';
import { Button } from '../Button';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  ToggletipActions,
} from '../Toggletip';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Toggletip/Feature Flag',
  component: Toggletip,
  tags: ['!autodocs'],

  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

export const FloatingStyles = (args) => {
  return (
    <div>
      <ToggletipLabel>Toggletip label</ToggletipLabel>
      <Toggletip align={args.align} defaultOpen>
        <ToggletipButton label="Show information">
          <Information />
        </ToggletipButton>
        <ToggletipContent>
          <p>
            Scroll the container up, down, left or right to observe how the
            Toggletip will automatically change its position in attempt to stay
            within the viewport. This works on initial render in addition to on
            scroll.
          </p>
          <ToggletipActions>
            <Link href="#">Link action</Link>
            <Button size="sm">Button</Button>
          </ToggletipActions>
        </ToggletipContent>
      </Toggletip>
    </div>
  );
};

FloatingStyles.args = {
  align: 'bottom',
};

FloatingStyles.argTypes = {
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
    control: {
      type: 'select',
    },
  },
};



File: Toggletip/Toggletip.DynamicStyles.featureflag.mdx


import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Components/Toggletip/Feature Flag" name="Flag details" />

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
  <ToggletipLabel>Toggletip label</ToggletipLabel>
  <Toggletip align={args.align} defaultOpen>
    <ToggletipButton label="Show information">
      <Information />
    </ToggletipButton>
    <ToggletipContent>
      <p>
        Scroll the container up, down, left or right to observe how the
        Toggletip will automatically change its position in attempt to stay
        within the viewport. This works on initial render in addition to on
        scroll.
      </p>
      <ToggletipActions>
        <Link href="#">Link action</Link>
        <Button size="sm">Button</Button>
      </ToggletipActions>
    </ToggletipContent>
  </Toggletip>
</FeatureFlags>
```



File: Toggletip/Toggletip.mdx


import { ArgTypes, Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as ToggletipStories from './Toggletip.stories';
import Toggletip from '../Toggletip';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Toggletip

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Toggletip)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/toggletip/usage)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [Toggletips vs Tooltips](#toggletips-vs-tooltips)
- [Alignment](#alignment)
- [Customizing content](#customizing-content)
- [Actions](#actions)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

The `Toggletip` component provides an accessible way to render interactive
content within a popover. If you do not have any interactive content inside of
your `Toggletip`, consider using `Tooltip` instead. To use this component,
you'll need to include a `Toggletip`, `ToggletipButton` for the trigger, and
`ToggletipContent` for the content you would like to render within the popover.

<Canvas
  of={ToggletipStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ToggletipStories.Default),
    },
  ]}
/>

```jsx
import { Toggletip, ToggletipButton, ToggletipContent } from '@carbon/react';
import { Information } from '@carbon/react/icons';

<Toggletip>
  <ToggletipButton label="Additional information">
    <Information />
  </ToggletipButton>
  <ToggletipContent>
    <p>Custom content here</p>
  </ToggletipContent>
</Toggletip>;
```

### Toggletips vs Tooltips

Toggletips and tooltips are similar visually and both contain a popover and
interactive trigger element. The two components differ in the way they are
invoked and dismissed and if the user must interact with the contents. A tooltip
is exposed on hover or focus when you need to expose brief, supplemental
information that is not interactive. A toggletip is used on click or enter when
you need to expose interactive elements, such as button, that a user needs to
interact with.

## Alignment

The Toggletip component provides four options for alignment: `top`, `bottom`,
`left`, and `right`. These options will correspond to where the popover will
render relative to the ToggletipButton. For example, when choosing `align="top"`
the ToggletipContent will render above the ToggletipButton.

## Customizing content

You can customize the contents of a Toggletip with the ToggletipContent
component. You can render any kind of child element or component inside of this
component as `children`.

## Actions

If your Toggletip includes actions, you can make use of the ToggletipActions
component to render them underneath the content of your ToggletipContent. For
example:

```jsx
<Toggletip>
  <ToggletipButton label="Show information">
    <Information />
  </ToggletipButton>
  <ToggletipContent>
    <p>
      Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
    </p>
    <ToggletipActions>
      <Link href="custom-link">Custom link</Link>
      <Button size="sm">Custom action</Button>
    </ToggletipActions>
  </ToggletipContent>
</Toggletip>
```

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Toggletip/Toggletip.mdx).



File: Toggletip/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-toggletip--default'
    }
  ]}
/>


File: Toggletip/index.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  type ElementType,
  useContext,
  useRef,
  useState,
  useEffect,
  type ReactNode,
  type ComponentProps,
  type KeyboardEventHandler,
  type FocusEventHandler,
} from 'react';
import {
  Popover,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
  type PopoverAlignment,
  PopoverBaseProps,
  PopoverContent,
} from '../Popover';
import { match, keys } from '../../internal/keyboard';
import { useWindowEvent } from '../../internal/useEvent';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';
import { PolymorphicComponentPropWithRef } from '../../internal/PolymorphicProps';

type ToggletipLabelProps<E extends ElementType> = {
  as?: E;
  children?: ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'children' | 'className'>;

/**
 * Used to render the label for a Toggletip
 */
export function ToggletipLabel<E extends ElementType>({
  as: BaseComponent = 'span' as E,
  children,
  className: customClassName,
  ...rest
}: ToggletipLabelProps<E>) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--toggletip-label`, customClassName);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  const BaseComponentAsAny = BaseComponent as any;
  return (
    <BaseComponentAsAny className={className} {...rest}>
      {children}
    </BaseComponentAsAny>
  );
}

ToggletipLabel.propTypes = {
  /**
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: PropTypes.elementType,

  /**
   * Custom children to be rendered as the content of the label
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: PropTypes.string,
};

type ToggleTipContextType =
  | undefined
  | {
      buttonProps: ComponentProps<'button'>;
      contentProps: ComponentProps<typeof PopoverContent>;
      onClick: ComponentProps<'button'>;
    };

// Used to coordinate accessibility props between button and content along with
// the actions to open and close the toggletip
const ToggletipContext = React.createContext<ToggleTipContextType>(undefined);

function useToggletip() {
  return useContext(ToggletipContext);
}

export interface ToggletipBaseProps extends Omit<PopoverBaseProps, 'open'> {
  defaultOpen?: boolean;
}

export type ToggletipProps<T extends ElementType> =
  PolymorphicComponentPropWithRef<T, ToggletipBaseProps>;

/**
 * Used as a container for the button and content of a toggletip. This component
 * is responsible for coordinating between interactions with the button and the
 * visibility of the content
 */
export function Toggletip<E extends ElementType = 'span'>({
  align,
  as,
  autoAlign,
  className: customClassName,
  children,
  defaultOpen = false,
  ...rest
}: ToggletipProps<E>) {
  const ref = useRef<Element>(null);
  const [open, setOpen] = useState(defaultOpen);
  const prefix = usePrefix();
  const id = useId();
  const className = cx(`${prefix}--toggletip`, customClassName, {
    [`${prefix}--toggletip--open`]: open,
    [`${prefix}--autoalign`]: autoAlign,
  });
  const actions = {
    toggle: () => {
      setOpen(!open);
    },
    close: () => {
      setOpen(false);
    },
  };
  const value = {
    buttonProps: {
      'aria-expanded': open,
      'aria-controls': id,
      'aria-describedby': open ? id : undefined,
      onClick: actions.toggle,
    },
    contentProps: {
      id,
    },
    onClick: {
      onClick: actions.toggle,
    },
  };

  const onKeyDown: KeyboardEventHandler = (event) => {
    if (open && match(event, keys.Escape)) {
      event.stopPropagation();
      actions.close();

      // If the menu is closed while focus is still inside the menu, it should return to the trigger button  (#12922)
      const button = ref.current?.children[0];
      if (button instanceof HTMLButtonElement) {
        button.focus();
      }
    }
  };

  const handleBlur: FocusEventHandler = (event) => {
    // Do not close if the menu itself is clicked, should only close on focus out
    if (open && event.relatedTarget === null) {
      return;
    }
    if (!event.currentTarget.contains(event.relatedTarget)) {
      // The menu should be closed when focus leaves the `Toggletip`  (#12922)
      actions.close();
    }
  };

  // If the `Toggletip` is the last focusable item in the tab order, it should also close when the browser window loses focus  (#12922)
  useWindowEvent('blur', () => {
    if (open) {
      actions.close();
    }
  });

  useEffect(() => {
    if (!ref.current) return;

    const targetDocument = ref.current.ownerDocument || document;
    const eventType: 'pointerdown' | 'mousedown' =
      'PointerEvent' in window ? 'pointerdown' : 'mousedown';

    const handleOutsideClick = (event: MouseEvent | PointerEvent) => {
      const node = event.target as Node | null;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      if (open && node && !ref.current!.contains(node)) {
        setOpen(false);
      }
    };

    const options = { capture: true } as const;

    targetDocument.addEventListener(eventType, handleOutsideClick, options);
    return () => {
      targetDocument.removeEventListener(
        eventType,
        handleOutsideClick,
        options
      );
    };
  }, [open]);

  return (
    <ToggletipContext.Provider value={value}>
      {/*eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452 */}
      <Popover<any>
        align={align}
        as={as}
        caret
        className={className}
        dropShadow={false}
        highContrast
        open={open}
        onKeyDown={onKeyDown}
        onBlur={handleBlur}
        ref={ref}
        autoAlign={autoAlign}
        {...rest}>
        {children}
      </Popover>
    </ToggletipContext.Provider>
  );
}

// Get all the properties from Popover except for "open".
// The Typescript types for PropTypes are really messed up so we need lots of
// casting.  It will be great when we can finally get rid of PropTypes altogether.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
const { open, ...popoverNonOpenPropTypes } = (Popover.propTypes ??
  {}) as unknown as PopoverBaseProps;

Toggletip.propTypes = {
  // Has all of Popover's PropTypes except for "open".
  ...popoverNonOpenPropTypes,

  /**
   * Specify if the toggletip should be open by default
   */
  defaultOpen: PropTypes.bool,
};

export interface ToggletipButtonBaseProps {
  children?: ReactNode;
  className?: string;
  label?: string;
}

export type ToggleTipButtonProps<T extends React.ElementType> =
  PolymorphicProps<T, ToggletipButtonBaseProps>;

/**
 * `ToggletipButton` controls the visibility of the Toggletip through mouse
 * clicks and keyboard interactions.
 */

export const ToggletipButton = React.forwardRef(function ToggletipButton<
  T extends React.ElementType,
>(
  {
    children,
    className: customClassName,
    label = 'Show information',
    as: BaseComponent,
    ...rest
  }: ToggleTipButtonProps<T>,
  ref
) {
  const toggletip = useToggletip();
  const prefix = usePrefix();
  const className = cx(`${prefix}--toggletip-button`, customClassName);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  const ComponentToggle: any = BaseComponent ?? 'button';

  if (ComponentToggle !== 'button') {
    return (
      <ComponentToggle {...toggletip?.onClick} className={className} {...rest}>
        {children}
      </ComponentToggle>
    );
  }
  return (
    <button
      {...toggletip?.buttonProps}
      aria-label={label}
      type="button"
      className={className}
      ref={ref}
      {...rest}>
      {children}
    </button>
  );
});

ToggletipButton.propTypes = {
  /**
   * Custom children to be rendered as the content of the label
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: PropTypes.string,

  /**
   * Provide an accessible label for this button
   */
  label: PropTypes.string,
};

ToggletipButton.displayName = 'ToggletipButton';

export interface ToggletipContentProps {
  children?: ReactNode;
  className?: string;
}

/**
 * `ToggletipContent` is a wrapper around `PopoverContent`. It places the
 * `children` passed in as a prop inside of `PopoverContent` so that they will
 * be rendered inside of the popover for this component.
 */
const ToggletipContent = React.forwardRef<
  HTMLDivElement,
  ToggletipContentProps
>(function ToggletipContent({ children, className: customClassName }, ref) {
  const toggletip = useToggletip();
  const prefix = usePrefix();
  return (
    <PopoverContent
      className={customClassName}
      {...toggletip?.contentProps}
      ref={ref}>
      <div className={`${prefix}--toggletip-content`}>{children}</div>
    </PopoverContent>
  );
});
ToggletipContent.propTypes = {
  /**
   * Custom children to be rendered as the content of the label
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: PropTypes.string,
};

ToggletipContent.displayName = 'ToggletipContent';

export { ToggletipContent };

export interface ToggleTipActionsProps {
  children?: ReactNode;
  className?: string;
}

/**
 * `ToggletipActions` is a container for one or two actions present at the base
 * of a toggletip. It is used for layout of these items.
 */
export function ToggletipActions({
  children,
  className: customClassName,
}: ToggleTipActionsProps) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--toggletip-actions`, customClassName);
  return <div className={className}>{children}</div>;
}

ToggletipActions.propTypes = {
  /**
   * Custom children to be rendered as the content of the label
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: PropTypes.string,
};

export default Toggletip;



File: Toggletip/Toggletip.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Information } from '@carbon/icons-react';
import React, { useRef, useEffect } from 'react';
import { default as Button } from '../Button';
import { default as Link } from '../Link';
import Modal from '../Modal';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  ToggletipActions,
} from '../Toggletip';
import mdx from './Toggletip.mdx';

export default {
  title: 'Components/Toggletip',
  component: Toggletip,
  subcomponents: {
    ToggletipLabel,
    ToggletipButton,
    ToggletipContent,
    ToggletipActions,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const ExperimentalAutoAlign = () => {
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
          inlineSize: '8rem',
        }}>
        <ToggletipLabel>Toggletip label</ToggletipLabel>
        <Toggletip align="bottom" autoAlign defaultOpen>
          <ToggletipButton label="Show information">
            <Information ref={ref} />
          </ToggletipButton>
          <ToggletipContent>
            <p>
              Scroll the container up, down, left or right to observe how the
              Toggletip will automatically change its position in attempt to
              stay within the viewport. This works on initial render in addition
              to on scroll.
            </p>
            <ToggletipActions>
              <Link href="#">Link action</Link>
              <Button size="sm">Button</Button>
            </ToggletipActions>
          </ToggletipContent>
        </Toggletip>
      </div>
    </div>
  );
};

// Note: autoAlign is used here only to make tooltips visible in StackBlitz,
// autoAlign is in preview and not part of the actual implementation.
export const Default = (args) => {
  return (
    <>
      <ToggletipLabel>Toggletip label</ToggletipLabel>
      <Toggletip autoAlign {...args}>
        <ToggletipButton label="Show information">
          <Information />
        </ToggletipButton>
        <ToggletipContent>
          <p>
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <ToggletipActions>
            <Link href="#">Link action</Link>
            <Button size="sm">Button</Button>
          </ToggletipActions>
        </ToggletipContent>
      </Toggletip>
    </>
  );
};

Default.argTypes = {
  align: {
    // TODO:
    // 1. Should the deprecated options be deleted?
    // 2. The list doesn't include all of the options available in the
    //    component. Is it supposed to?
    options: [
      'top',
      'top-left',
      'top-right',

      'bottom',
      'bottom-left',
      'bottom-right',

      'left',
      'left-bottom',
      'left-top',

      'right',
      'right-bottom',
      'right-top',
    ],
    control: {
      type: 'select',
    },
  },
};

Default.story = {
  decorators: [
    (story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        {story()}
      </div>
    ),
  ],
};



