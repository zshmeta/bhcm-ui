File: Popover/Popover.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as PopoverStories from './Popover.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Popover

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Popover)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/popover/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/popover/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Visibility](#visibility)
- [Alignment](#alignment)
- [Appearance](#appearance)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

`Popover` is a primitive component used to build custom components which render
over other elements on the page.

The `Popover` component accepts two items as `children`: a trigger element and a
`PopoverContent` component which contains the content to be rendered inside of
the `Popover`.

```jsx
import { Popover, PopoverContent } from '@carbon/react';
import React from 'react';

function CustomComponent() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open}>
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
        }}>
        Toggle
      </button>
      <PopoverContent>
        The content that is revealed by interacting with the Toggle button
      </PopoverContent>
    </Popover>
  );
}
```

<Canvas
  of={PopoverStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(PopoverStories.Default),
    },
  ]}
/>

## Visibility

The `open` prop allows you to control the visibility of the `Popover`. This is
often tracked in state and is toggled based on the trigger render inside of the
`Popover`. A trigger must be an interactive element and in most cases it will be
a `<button>`.

The `onRequestClose` callback prop can be used to ensure that only a single
popover is open on the screen at a time. It also can be used to ensure that any
clicks outside of a popover will close the popover. This is achieved by using
state in conjunction with the callback prop to set `open` to false when
`onRequestClose` is called.

<Canvas
  of={PopoverStories.TabTip}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(PopoverStories.TabTip),
    },
  ]}
/>

## Alignment

The `align` prop allows you to specify where your content should be placed
relative to the popover. For example, if you provide `align="top"` to the
`Popover` component then the popover will render above your component.
Similarly, if you provide `align="bottom"` then the popover will render below
your component.

You can also configure the placement of the caret, if it is enabled, by choosing
between `left` and `right` or `bottom` and `top`, depending on where your
popover is being rendered.

If you are using `align="top"`, then you can choose between `align="top-left"`
and `align="top-right"`. These options will place the caret closer to the left
or right edges of the popover.

If you are using `align="left"` or `align="right"`, you can use `top` or
`bottom` to control this alignment.

<Canvas
  of={PopoverStories.ExperimentalAutoAlign}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(PopoverStories.ExperimentalAutoAlign),
    },
  ]}
/>

<Canvas
  of={PopoverStories.ExperimentalAutoAlignBoundary}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(PopoverStories.ExperimentalAutoAlignBoundary),
    },
  ]}
/>

<Canvas
  of={PopoverStories.TabTipExperimentalAutoAlign}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(PopoverStories.TabTipExperimentalAutoAlign),
    },
  ]}
/>

## Appearance

The `Popover` component has several props which you can use to customize its
appearance, including:

- `caret`: to conditionally display a `caret` or render the popover directly
  beside the trigger element
- `dropShadow`: to display a drop shadow on the popover content
- `highContrast`: to display a high contrast variant of the popover
- `border`: to display a border on the popover
- `backgroundToken`: to change the token for the color of the background

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Popover/Popover.mdx).



File: Popover/Popover.DynamicStyles.featureflag.mdx


import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Components/Popover/Feature Flag" name="Flag details" />

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
  <Popover open={open}>
    <button
      type="button"
      onClick={() => {
        setOpen(!open);
      }}>
      Toggle
    </button>
    <PopoverContent>
      The content that is revealed by interacting with the Toggle button
    </PopoverContent>
  </Popover>
</FeatureFlags>
```



File: Popover/Popover.featureflag.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Popover, PopoverContent } from '../Popover';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';
import { Checkbox as CheckboxIcon } from '@carbon/icons-react';

import './story.scss';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Popover/Feature Flag',
  component: Popover,
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
  const [open, setOpen] = useState(true);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Popover open={open} align={args.align}>
        <div className="playground-trigger">
          <CheckboxIcon
            onClick={() => {
              setOpen(!open);
            }}
          />
        </div>
        <PopoverContent className="p-3">
          <div>
            <p className="popover-title">This popover uses autoAlign</p>
            <p className="popover-details">
              Scroll the container up, down, left or right to observe how the
              popover will automatically change its position in attempt to stay
              within the viewport. This works on initial render in addition to
              on scroll.
            </p>
          </div>
        </PopoverContent>
      </Popover>
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



File: Popover/README.md


# Popover

A popover is a piece of UI that _pops over_ or renders on top of other UI on the
page. It's a component "primitive" meaning it can be used to help make more
complex components that utilize this behavior.

## Popover Behaviors

- popovers are invoked/shown by interacting with some other UI element either
  through click, hover, key press, or focus
- popovers can be dismissed either through blur, <kbd>esc</kbd> keypress, or by
  having a different popover be triggered and shown
- popovers are displayed on top of other UI and out of the normal page flow
  typically anchored to a triggering element

## Further Reading

- [Open UI Popup documentation](https://open-ui.org/components/popup.research)



File: Popover/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-popover--experimental-auto-align',
    },
  ]}
/>



File: Popover/index.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes, { WeakValidationMap } from 'prop-types';
import { deprecateValuesWithin } from '../../prop-types/deprecateValuesWithin';
import React, { useEffect, useMemo, useRef, type ElementType } from 'react';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';
import { useWindowEvent, useEvent } from '../../internal/useEvent';
import { mapPopoverAlign } from '../../tools/mapPopoverAlign';
import {
  useFloating,
  flip,
  hide,
  autoUpdate,
  arrow,
  offset,
  type Boundary,
} from '@floating-ui/react';
import { useFeatureFlag } from '../FeatureFlags';
import { PolymorphicComponentPropWithRef } from '../../internal/PolymorphicProps';

export interface PopoverContext {
  setFloating: React.Ref<HTMLSpanElement>;
  caretRef: React.Ref<HTMLSpanElement>;
  autoAlign: boolean | null;
}

const PopoverContext = React.createContext<PopoverContext>({
  setFloating: {
    current: null,
  },
  caretRef: {
    current: null,
  },
  autoAlign: null,
});

/**
 * Deprecated popover alignment values.
 * @deprecated Use NewPopoverAlignment instead.
 */
export type DeprecatedPopoverAlignment =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-bottom'
  | 'left-top'
  | 'right-bottom'
  | 'right-top';

export type NewPopoverAlignment =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-end'
  | 'left-start'
  | 'right-end'
  | 'right-start';

export type PopoverAlignment = DeprecatedPopoverAlignment | NewPopoverAlignment;

export interface PopoverBaseProps {
  /**
   * Specify how the popover should align with the trigger element.
   */
  align?: PopoverAlignment;

  /**
   * **Experimental:** Provide an offset value for alignment axis. Only takes effect when `autoalign` is enabled.
   */
  alignmentAxisOffset?: number;

  /**
   * Specify the background token to use. Default is 'layer'.
   */
  backgroundToken?: 'layer' | 'background';

  /**
   * Will auto-align the popover on first render if it is not visible. This prop
   * is currently experimental and is subject to future changes. Requires
   * React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign?: boolean;

  /**
   * Specify a bounding element to be used for autoAlign calculations. The viewport is used by default. This prop is currently experimental and is subject to future changes.
   */
  autoAlignBoundary?: Boundary;

  /**
   * Specify whether a caret should be rendered
   */
  caret?: boolean;

  /**
   * Specify whether a border should be rendered on the popover
   */
  border?: boolean;

  /**
   * Provide elements to be rendered inside of the component
   */
  children?: React.ReactNode;

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className?: string;

  /**
   * Specify whether a drop shadow should be rendered on the popover
   */
  dropShadow?: boolean;

  /**
   * Render the component using the high-contrast variant
   */
  highContrast?: boolean;

  /**
   * Render the component using the tab tip variant
   */
  isTabTip?: boolean;

  /**
   * Specify a handler for closing popover.
   * The handler should take care of closing the popover, e.g. changing the `open` prop.
   */
  onRequestClose?: () => void;

  /**
   * Specify whether the component is currently open or closed
   */
  open: boolean;
}

export type PopoverProps<E extends React.ElementType> =
  PolymorphicComponentPropWithRef<E, PopoverBaseProps>;
export type PopoverComponent = <E extends React.ElementType = 'span'>(
  props: PopoverProps<E>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
) => React.ReactElement | any;

export const Popover: PopoverComponent & {
  displayName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  propTypes?: WeakValidationMap<PopoverProps<any>>;
} = React.forwardRef(function PopoverRenderFunction<
  E extends ElementType = 'span',
>(
  {
    isTabTip,
    align: initialAlign = isTabTip ? 'bottom-start' : 'bottom',
    as: BaseComponent = 'span' as E,
    autoAlign = false,
    autoAlignBoundary,
    backgroundToken = 'layer',
    caret = isTabTip ? false : true,
    className: customClassName,
    children,
    border = false,
    dropShadow = true,
    highContrast = false,
    onRequestClose,
    open,
    alignmentAxisOffset,
    ...rest
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  }: any,
  //this is a workaround, have to come back and fix this.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  forwardRef: any
) {
  const prefix = usePrefix();
  const floating = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const popover = useRef<Element>(null);
  const enableFloatingStyles =
    useFeatureFlag('enable-v12-dynamic-floating-styles') || autoAlign;

  let align = mapPopoverAlign(initialAlign);

  // The `Popover` should close whenever it and its children loses focus
  useEvent(popover, 'focusout', (event) => {
    const relatedTarget = (event as FocusEvent).relatedTarget as Node | null;
    if (isTabTip) {
      if (relatedTarget && !popover.current?.contains(relatedTarget)) {
        onRequestClose?.();
      }
      return;
    }

    if (!relatedTarget) {
      onRequestClose?.();
      return;
    }

    const isOutsideMainContainer = !popover.current?.contains(relatedTarget);
    const isOutsideFloating =
      enableFloatingStyles && refs.floating.current
        ? !refs.floating.current.contains(relatedTarget)
        : true;

    // Only close if focus moved outside both containers
    if (isOutsideMainContainer && isOutsideFloating) {
      onRequestClose?.();
    }
  });

  useWindowEvent('click', ({ target }) => {
    if (open && target instanceof Node && !popover.current?.contains(target)) {
      onRequestClose?.();
    }
  });

  // Slug styling places a border around the popover content so the caret
  // needs to be placed 1px further outside the popover content. To do so,
  // we look to see if any of the children has a className containing "slug"
  const initialCaretHeight = React.Children.toArray(children).some((x) => {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      (x as any)?.props?.className?.includes('slug') ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      (x as any)?.props?.className?.includes('ai-label')
    );
  })
    ? 7
    : 6;
  // These defaults match the defaults defined in packages/styles/scss/components/popover/_popover.scss
  const popoverDimensions = useRef({
    offset: 10,
    caretHeight: initialCaretHeight,
  });

  useIsomorphicEffect(() => {
    // The popover is only offset when a caret is present. Technically, the custom properties
    // accessed below can be set by a user even if caret=false, but doing so does not follow
    // the design specification for Popover.
    if (caret && popover.current) {
      // Gather the dimensions of the caret and prefer the values set via custom properties.
      // If a value is not set via a custom property, provide a default value that matches the
      // default values defined in the sass style file
      const getStyle = window.getComputedStyle(popover.current, null);
      const offsetProperty = getStyle.getPropertyValue(
        `--${prefix}-popover-offset`
      );
      const caretProperty = getStyle.getPropertyValue(
        `--${prefix}-popover-caret-height`
      );

      // Handle if the property values are in px or rem.
      // We want to store just the base number value without a unit suffix
      if (offsetProperty) {
        popoverDimensions.current.offset = offsetProperty.includes('px')
          ? Number(offsetProperty.split('px', 1)[0]) * 1
          : Number(offsetProperty.split('rem', 1)[0]) * 16;
      }

      if (caretProperty) {
        popoverDimensions.current.caretHeight = caretProperty.includes('px')
          ? Number(caretProperty.split('px', 1)[0]) * 1
          : Number(caretProperty.split('rem', 1)[0]) * 16;
      }
    }
  });
  const { refs, floatingStyles, placement, middlewareData } = useFloating(
    enableFloatingStyles
      ? {
          placement: align,

          // The floating element is positioned relative to its nearest
          // containing block (usually the viewport). It will in many cases also
          // “break” the floating element out of a clipping ancestor.
          // https://floating-ui.com/docs/misc#clipping
          strategy: 'fixed',

          // Middleware order matters, arrow should be last
          middleware: [
            offset(
              !isTabTip
                ? {
                    alignmentAxis: alignmentAxisOffset,
                    mainAxis: popoverDimensions?.current?.offset,
                  }
                : 0
            ),
            autoAlign &&
              flip({
                fallbackPlacements: isTabTip
                  ? align.includes('bottom')
                    ? ['bottom-start', 'bottom-end', 'top-start', 'top-end']
                    : ['top-start', 'top-end', 'bottom-start', 'bottom-end']
                  : align.includes('bottom')
                    ? [
                        'bottom',
                        'bottom-start',
                        'bottom-end',
                        'right',
                        'right-start',
                        'right-end',
                        'left',
                        'left-start',
                        'left-end',
                        'top',
                        'top-start',
                        'top-end',
                      ]
                    : [
                        'top',
                        'top-start',
                        'top-end',
                        'left',
                        'left-start',
                        'left-end',
                        'right',
                        'right-start',
                        'right-end',
                        'bottom',
                        'bottom-start',
                        'bottom-end',
                      ],

                fallbackStrategy: 'initialPlacement',
                fallbackAxisSideDirection: 'start',
                boundary: autoAlignBoundary,
              }),
            arrow({
              element: caretRef,
              padding: 16,
            }),
            autoAlign && hide(),
          ],
          whileElementsMounted: autoUpdate,
        }
      : {}
    // When autoAlign is turned off & the `enable-v12-dynamic-floating-styles` feature flag is not
    // enabled, floating-ui will not be used
  );

  const value = useMemo(() => {
    return {
      floating,
      setFloating: refs.setFloating,
      caretRef,
      autoAlign: autoAlign,
    };
  }, [refs.setFloating, autoAlign]);

  if (isTabTip) {
    const tabTipAlignments: PopoverAlignment[] = ['bottom-start', 'bottom-end'];

    if (!tabTipAlignments.includes(align)) {
      align = 'bottom-start';
    }
  }

  useEffect(() => {
    if (enableFloatingStyles) {
      const updatedFloatingStyles = {
        ...floatingStyles,
        visibility: middlewareData.hide?.referenceHidden ? 'hidden' : 'visible',
      };
      Object.keys(updatedFloatingStyles).forEach((style) => {
        if (refs.floating.current) {
          refs.floating.current.style[style] = updatedFloatingStyles[style];
        }
      });

      if (
        caret &&
        middlewareData &&
        middlewareData.arrow &&
        caretRef?.current
      ) {
        const { x, y } = middlewareData.arrow;

        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]];

        caretRef.current.style.left = x != null ? `${x}px` : '';
        caretRef.current.style.top = y != null ? `${y}px` : '';

        // Ensure the static side gets unset when flipping to other placements' axes.
        caretRef.current.style.right = '';
        caretRef.current.style.bottom = '';

        if (staticSide) {
          caretRef.current.style[staticSide] = `${-popoverDimensions?.current
            ?.caretHeight}px`;
        }
      }
    }
  }, [
    floatingStyles,
    refs.floating,
    enableFloatingStyles,
    middlewareData,
    placement,
    caret,
  ]);

  const ref = useMergedRefs([forwardRef, popover]);
  const currentAlignment = autoAlign && placement !== align ? placement : align;
  const className = cx(
    {
      [`${prefix}--popover-container`]: true,
      [`${prefix}--popover--caret`]: caret,
      [`${prefix}--popover--drop-shadow`]: dropShadow,
      [`${prefix}--popover--border`]: border,
      [`${prefix}--popover--high-contrast`]: highContrast,
      [`${prefix}--popover--open`]: open,
      [`${prefix}--popover--auto-align ${prefix}--autoalign`]:
        enableFloatingStyles,
      [`${prefix}--popover--${currentAlignment}`]: true,
      [`${prefix}--popover--tab-tip`]: isTabTip,
      [`${prefix}--popover--background-token__background`]:
        backgroundToken === 'background' && !highContrast,
    },
    customClassName
  );

  const mappedChildren = React.Children.map(children, (child) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    const item = child as any;
    const displayName = item?.type?.displayName;

    /**
     * Only trigger elements (button) or trigger components (ToggletipButton) should be
     * cloned because these will be decorated with a trigger-specific className and ref.
     *
     * There are also some specific components that should not be cloned when autoAlign
     * is on, even if they are a trigger element.
     */
    const isTriggerElement = item?.type === 'button';
    const isTriggerComponent =
      enableFloatingStyles &&
      displayName &&
      ['ToggletipButton'].includes(displayName);
    const isAllowedTriggerComponent =
      enableFloatingStyles &&
      !['ToggletipContent', 'PopoverContent'].includes(displayName);

    if (
      React.isValidElement(item) &&
      (isTriggerElement || isTriggerComponent || isAllowedTriggerComponent)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      const className = (item?.props as any)?.className;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      const ref = (item?.props as any).ref;
      const tabTipClasses = cx(
        `${prefix}--popover--tab-tip__button`,
        className
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      return React.cloneElement(item as any, {
        className:
          isTabTip && item?.type === 'button' ? tabTipClasses : className || '',

        // With cloneElement, if you pass a `ref`, it overrides the original ref.
        // https://react.dev/reference/react/cloneElement#parameters
        // The block below works around this and ensures that the original ref is still
        // called while allowing the floating-ui reference element to be set as well.
        // `useMergedRefs` can't be used here because hooks can't be called from within a callback.
        // More here: https://github.com/facebook/react/issues/8873#issuecomment-489579878
        ref: (node) => {
          // For a popover, there isn't an explicit trigger component, it's just the first child that's
          // passed in which should *not* be PopoverContent.
          // For a toggletip there is a specific trigger component, ToggletipButton.
          // In either of these cases we want to set this as the reference node for floating-ui autoAlign
          // positioning.
          if (
            (enableFloatingStyles && item?.type !== PopoverContent) ||
            (enableFloatingStyles &&
              item?.type['displayName'] === 'ToggletipButton')
          ) {
            // Set the reference element for floating-ui
            refs.setReference(node);
          }

          // Call the original ref, if any
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref !== null && ref !== undefined) {
            ref.current = node;
          }
        },
      });
    } else {
      return item;
    }
  });

  const BaseComponentAsAny = BaseComponent as React.ElementType;

  return (
    <PopoverContext.Provider value={value}>
      <BaseComponentAsAny {...rest} className={className} ref={ref}>
        {enableFloatingStyles || isTabTip ? mappedChildren : children}
      </BaseComponentAsAny>
    </PopoverContext.Provider>
  );
}) as PopoverComponent;

// Note: this displayName is temporarily set so that Storybook ArgTable
// correctly displays the name of this component
if (process.env.NODE_ENV !== 'production') {
  Popover.displayName = 'Popover';
}

Popover.propTypes = {
  /**
   * Specify how the popover should align with the trigger element
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
   * **Experimental:** Provide an offset value for alignment axis. Only takes effect when `autoalign` is enabled.
   */
  alignmentAxisOffset: PropTypes.number,

  /**
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Will auto-align the popover on first render if it is not visible. This prop
   * is currently experimental and is subject to future changes. Requires
   * React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: PropTypes.bool,

  /**
   * Specify the background token to use. Default is 'layer'.
   */
  backgroundToken: PropTypes.oneOf(['layer', 'background']),

  /**
   * Specify a bounding element to be used for autoAlign calculations. The viewport is used by default. This prop is currently experimental and is subject to future changes.
   */
  autoAlignBoundary: PropTypes.oneOfType([
    PropTypes.oneOf(['clippingAncestors']),
    PropTypes.elementType,
    PropTypes.arrayOf(PropTypes.elementType),
    PropTypes.exact({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
  ]) as PropTypes.Validator<Boundary | null | undefined>,

  /**
   * Specify whether a caret should be rendered
   */
  caret: PropTypes.bool,

  /**
   * Specify whether a border should be rendered on the popover
   */
  border: PropTypes.bool,

  /**
   * Provide elements to be rendered inside of the component
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: PropTypes.string,

  /**
   * Specify whether a drop shadow should be rendered on the popover
   */
  dropShadow: PropTypes.bool,

  /**
   * Render the component using the high-contrast variant
   */
  highContrast: PropTypes.bool,

  /**
   * Render the component using the tab tip variant
   */
  isTabTip: PropTypes.bool,

  /**
   * Specify a handler for closing popover.
   * The handler should take care of closing the popover, e.g. changing the `open` prop.
   */
  onRequestClose: PropTypes.func,

  /**
   * Specify whether the component is currently open or closed
   */
  open: PropTypes.bool.isRequired,
};

export type PopoverContentProps = React.HTMLAttributes<HTMLSpanElement>;

function PopoverContentRenderFunction(
  { className, children, ...rest }: PopoverContentProps,
  forwardRef: React.ForwardedRef<HTMLSpanElement>
) {
  const prefix = usePrefix();
  const { setFloating, caretRef, autoAlign } = React.useContext(PopoverContext);
  const ref = useMergedRefs([setFloating, forwardRef]);
  const enableFloatingStyles =
    useFeatureFlag('enable-v12-dynamic-floating-styles') || autoAlign;
  return (
    <span {...rest} className={`${prefix}--popover`}>
      <span className={cx(`${prefix}--popover-content`, className)} ref={ref}>
        {children}
        {enableFloatingStyles && (
          <span
            className={cx({
              [`${prefix}--popover-caret`]: true,
              [`${prefix}--popover--auto-align`]: true,
            })}
            ref={caretRef}
          />
        )}
      </span>
      {!enableFloatingStyles && (
        <span
          className={cx({
            [`${prefix}--popover-caret`]: true,
          })}
          ref={caretRef}
        />
      )}
    </span>
  );
}

export const PopoverContent = React.forwardRef(PopoverContentRenderFunction);
PopoverContent.displayName = 'PopoverContent';

PopoverContent.propTypes = {
  /**
   * Provide elements to be rendered inside of the component
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: PropTypes.string,
};



File: Popover/story.scss


//
// Copyright IBM Corp. 2016, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@use '@carbon/styles/scss/spacing';
@use '@carbon/styles/scss/theme';
@use '@carbon/styles/scss/type';
@use '@carbon/styles/scss/utilities/component-reset';

/// Utilities
.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.justify-center {
  justify-content: center;
}

.justify-end {
  justify-content: flex-end;
}

.align-center {
  align-items: center;
}

.align-end {
  align-items: flex-end;
}

.justify-items-end {
  justify-items: end;
}

.position-relative {
  position: relative;
}

.display-inline-block {
  display: inline-block;
}

.grid {
  display: grid;
}

.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.mb-3 {
  margin-block-end: 1rem;
}

.mt-9 {
  padding-block-start: 3rem;
}

.mt-10 {
  padding-block-start: 4rem;
}

.p-3 {
  padding: 1rem;
}

.playground-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid theme.$border-subtle;
  background: theme.$background;
  block-size: 2rem;
  inline-size: 2rem;
}

.playground-trigger svg {
  fill: theme.$background-inverse;
}

.popover-title {
  @include component-reset.reset;
  @include type.type-style('heading-compact-01');

  margin-block-end: spacing.$spacing-01;
}

.popover-details {
  @include component-reset.reset;
  @include type.type-style('body-compact-01');
}

.popover-story {
  display: flex;
  flex-direction: column;
  block-size: 100%;
  inline-size: 100%;
}

.popover-tabtip-story .cds--popover-content.p-3 {
  inline-size: 16rem;
}

.popover-tabtip-story .cds--radio-button-wrapper {
  margin-block-end: 0.5rem;
}

.popover-tabtip-story hr {
  border: none;
  margin: 8px 0 16px;
  background: theme.$border-subtle;
  block-size: 1px;
}

.popover-tabtip-story .cds--popover-container:last-of-type {
  margin-inline-start: 15rem;
}



File: Popover/Popover.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';
import { Checkbox as CheckboxIcon } from '@carbon/icons-react';
import React, { useState, useEffect, useRef } from 'react';
import { Popover, PopoverContent } from '../Popover';
import RadioButton from '../RadioButton';
import RadioButtonGroup from '../RadioButtonGroup';
import { default as Checkbox } from '../Checkbox';
import mdx from './Popover.mdx';
import { Settings } from '@carbon/icons-react';
import { keys, match } from '../../internal/keyboard';
import OverflowMenu from '../OverflowMenu/OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';

const prefix = 'cds';

export default {
  title: 'Components/Popover',
  component: Popover,
  subcomponents: {
    PopoverContent,
  },
  parameters: {
    controls: {
      hideNoControlsWarning: true,
      exclude: ['relative'],
    },
    docs: {
      page: mdx,
    },
  },
};

const DefaultStory = (props) => {
  const { align, caret, dropShadow, highContrast, open } = props;
  const [isOpen, setIsOpen] = useState(open);

  return (
    <Popover
      {...props}
      align={align}
      caret={caret}
      dropShadow={dropShadow}
      highContrast={highContrast}
      open={isOpen}
      onRequestClose={() => setIsOpen(false)}>
      <button
        className="playground-trigger"
        aria-label="Checkbox"
        type="button"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
        }}>
        <CheckboxIcon />
      </button>
      <PopoverContent className="p-3">
        <h2 className="popover-title">Available storage</h2>
        <p className="popover-details">
          This server has 150 GB of block storage remaining.
        </p>
      </PopoverContent>
    </Popover>
  );
};

export const TabTip = (args) => {
  const [open, setOpen] = useState(true);
  const [openTwo, setOpenTwo] = useState(false);
  const align = document?.dir === 'rtl' ? 'bottom-right' : 'bottom-left';
  const alignTwo = document?.dir === 'rtl' ? 'bottom-left' : 'bottom-right';
  return (
    <div className="popover-tabtip-story" style={{ display: 'flex' }}>
      <Popover
        align={align}
        open={open}
        onKeyDown={(evt) => {
          if (match(evt, keys.Escape)) {
            setOpen(false);
          }
        }}
        isTabTip
        onRequestClose={() => setOpen(false)}
        {...args}>
        <button
          aria-label="Settings"
          type="button"
          aria-expanded={open}
          onClick={() => {
            setOpen(!open);
          }}>
          <Settings />
        </button>
        <PopoverContent className="p-3">
          <RadioButtonGroup
            style={{ alignItems: 'flex-start', flexDirection: 'column' }}
            legendText="Row height 1"
            name="radio-button-group"
            defaultSelected="small">
            <RadioButton labelText="Small" value="small" id="radio-small" />
            <RadioButton labelText="Large" value="large" id="radio-large" />
          </RadioButtonGroup>
          <hr />
          <fieldset className={`${prefix}--fieldset`}>
            <legend className={`${prefix}--label`}>Edit columns</legend>
            <Checkbox defaultChecked labelText="Name" id="checkbox-label-1" />
            <Checkbox defaultChecked labelText="Type" id="checkbox-label-2" />
            <Checkbox
              defaultChecked
              labelText="Location"
              id="checkbox-label-3"
            />
          </fieldset>
        </PopoverContent>
      </Popover>

      <Popover
        open={openTwo}
        isTabTip
        align={alignTwo}
        onRequestClose={() => setOpenTwo(false)}
        {...args}>
        <button
          aria-label="Settings"
          type="button"
          aria-expanded={open}
          onClick={() => {
            setOpenTwo(!openTwo);
          }}>
          <Settings />
        </button>
        <PopoverContent className="p-3">
          <RadioButtonGroup
            style={{ alignItems: 'flex-start', flexDirection: 'column' }}
            legendText="Row height 2"
            name="radio-button-group-2"
            defaultSelected="small-2">
            <RadioButton labelText="Small" value="small-2" id="radio-small-2" />
            <RadioButton labelText="Large" value="large-2" id="radio-large-2" />
          </RadioButtonGroup>
          <hr />
          <fieldset className={`${prefix}--fieldset`}>
            <legend className={`${prefix}--label`}>Testing</legend>
            <Checkbox defaultChecked labelText="Name" id="checkbox-label-8" />
            <Checkbox defaultChecked labelText="Type" id="checkbox-label-9" />
            <Checkbox
              defaultChecked
              labelText="Location"
              id="checkbox-label-10"
            />
          </fieldset>
        </PopoverContent>
      </Popover>
    </div>
  );
};

TabTip.argTypes = {
  align: { control: false },
  autoAlign: { control: false },
};

export const Default = DefaultStory.bind({});

Default.args = {
  caret: true,
  dropShadow: true,
  highContrast: false,
  open: true,
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
    control: {
      type: 'select',
    },
  },
  border: {
    control: {
      type: 'boolean',
    },
  },
  caret: {
    control: {
      type: 'boolean',
    },
  },
  dropShadow: {
    control: {
      type: 'boolean',
    },
  },
  highContrast: {
    control: {
      type: 'boolean',
    },
  },
  open: {
    control: {
      type: 'boolean',
    },
  },
};

Default.story = {
  decorators: [
    (story) => <div className="mt-10 flex justify-center">{story()}</div>,
  ],
};

export const ExperimentalAutoAlign = (args) => {
  const [open, setOpen] = useState(true);
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
        }}>
        <Popover
          open={open}
          align="top"
          autoAlign
          ref={ref}
          onRequestClose={() => setOpen(false)}
          {...args}>
          <button
            className="playground-trigger"
            aria-label="Checkbox"
            type="button"
            aria-expanded={open}
            onClick={() => {
              setOpen(!open);
            }}>
            <CheckboxIcon />
          </button>
          <PopoverContent className="p-3">
            <div>
              <p className="popover-title">This popover uses autoAlign</p>
              <p className="popover-details">
                Scroll the container up, down, left or right to observe how the
                popover will automatically change its position in attempt to
                stay within the viewport. This works on initial render in
                addition to on scroll.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export const ExperimentalAutoAlignBoundary = () => {
  const [open, setOpen] = useState(true);
  const ref = useRef();
  const [boundary, setBoundary] = useState();

  useEffect(() => {
    ref?.current?.scrollIntoView({ block: 'center', inline: 'center' });
  });

  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        overflow: 'scroll',
        width: '800px',
        height: '500px',
        border: '1px',
        borderStyle: 'dashed',
        borderColor: 'black',
        margin: '0 auto',
      }}
      ref={setBoundary}>
      <div
        style={{
          width: '2100px',
          height: '1px',
          placeItems: 'center',
        }}
      />
      <div style={{ placeItems: 'center', height: '32px', width: '32px' }}>
        <Popover
          open={open}
          align="top"
          autoAlign
          autoAlignBoundary={boundary}
          onRequestClose={() => setOpen(false)}
          ref={ref}>
          <button
            className="playground-trigger"
            aria-label="Checkbox"
            type="button"
            aria-expanded={open}
            onClick={() => {
              setOpen(!open);
            }}>
            <CheckboxIcon />
          </button>
          <PopoverContent className="p-3">
            <div>
              <p className="popover-title">This popover uses autoAlign</p>
              <p className="popover-details">
                Scroll the container up, down, left or right to observe how the
                popover will automatically change its position in attempt to
                stay within the viewport. This works on initial render in
                addition to on scroll.
              </p>
            </div>
          </PopoverContent>
        </Popover>
        <div
          style={{
            height: '1000px',
            width: '1px',
            placeItems: 'center',
          }}
        />
      </div>
    </div>
  );
};

export const TabTipExperimentalAutoAlign = () => {
  const [open, setOpen] = useState(true);
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
        }}>
        <Popover open={open} align="bottom-right" autoAlign ref={ref} isTabTip>
          <div className="playground-trigger">
            <CheckboxIcon
              onClick={() => {
                setOpen(!open);
              }}
            />
          </div>
          <PopoverContent className="p-3">
            <div>
              <p className="popover-title">
                This popover uses autoAlign with isTabTip
              </p>
              <p className="popover-details">
                Scroll the container up, down, left or right to observe how the
                popover will automatically change its position in attempt to
                stay within the viewport. This works on initial render in
                addition to on scroll.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};



