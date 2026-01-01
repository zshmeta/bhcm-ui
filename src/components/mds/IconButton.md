File: IconButton/IconButton.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Edit, Notification } from '@carbon/icons-react';
import React from 'react';
import { IconButton } from '../IconButton';
import mdx from './IconButton.mdx';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
      exclude: ['badgeCount'],
    },
    docs: {
      page: mdx,
    },
    layout: 'centered',
  },
};

export const Default = (args) => {
  return (
    <div style={{ margin: '3rem' }}>
      <IconButton {...args}>
        <Edit />
      </IconButton>
    </div>
  );
};

Default.args = {
  align: 'bottom',
  defaultOpen: true,
  disabled: false,
  label: 'Custom label',
  kind: 'primary',
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
      'right',
    ],
    control: {
      type: 'select',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  label: {
    control: {
      type: 'text',
    },
  },
  kind: {
    control: {
      type: 'select',
    },
    options: ['primary', 'secondary', 'ghost', 'tertiary'],
  },
};

export const withBadgeIndicator = (args) => {
  return (
    <div style={{ margin: '3rem' }}>
      <IconButton
        label="Notification"
        kind="ghost"
        size="lg"
        autoAlign
        {...args}>
        <Notification />
      </IconButton>
    </div>
  );
};

withBadgeIndicator.args = {
  badgeCount: 4,
};
withBadgeIndicator.parameters = {
  controls: {
    exclude: ['size', 'kind'],
  },
};



File: IconButton/IconButton.mdx


import { ArgTypes, Meta, Canvas } from '@storybook/addon-docs/blocks';
import  * as IconButtonStories from './IconButton.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';


<Meta isTemplate />

# IconButton

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/IconButton)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/button/usage)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Kind](#kind)
- [Alignment](#alignment)
- [Customizing the label](#customizing-the-label)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

The `IconButton` component is useful when you have a button where the content is
an icon. In this situation, it's important that the button itself is labeled in
a way that can be understandable by mouse, keyboard, and screen readers. As a
result, this component makes it easy to create accessible icon buttons

```jsx
import { IconButton } from '@carbon/react';
import { Add } from '@carbon/react/icons';

function ExampleComponent() {
  return (
    <IconButton label="Add">
      <Add />
    </IconButton>
  );
}
```
<Canvas
  of={IconButtonStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(IconButtonStories.Default),
    },
  ]}
/>

## Kind

Icon buttons can take the form of Primary, Secondary, Tertiary, and Ghost but
most commonly will be styled as primary or ghost buttons. Icon only buttons do
not support Danger, Danger tertiary, or Danger ghost.

## Alignment

The `align` prop allows you to specify where your content should be placed
relative to the `IconButton`. For example, if you provide `align="top"` to the
`IconButton` component then the tooltip will render above your component.
Similarly, if you provide `align="bottom"` then the tooltip will render below
your component.

## Customizing the label

You can customize the label, or tooltip, of the `IconButton` with the `label`
prop. However, it's important that this label contain no interactive content so
that the component remains accessible.

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/IconButton/IconButton.mdx).



File: IconButton/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-iconbutton--default',
    },
  ]}
/>



File: IconButton/index.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ForwardedRef, ReactNode } from 'react';
import { ButtonSize } from '../Button';
import classNames from 'classnames';
import { Tooltip } from '../Tooltip';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import ButtonBase from '../Button/ButtonBase';
import { deprecateValuesWithin } from '../../prop-types/deprecateValuesWithin';
import BadgeIndicator from '../BadgeIndicator';
import type {
  DeprecatedPopoverAlignment,
  NewPopoverAlignment,
  PopoverAlignment,
} from '../Popover';
import { mapPopoverAlign } from '../../tools/mapPopoverAlign';

export const IconButtonKinds = [
  'primary',
  'secondary',
  'ghost',
  'tertiary',
] as const;

export type IconButtonKind = (typeof IconButtonKinds)[number];

export type DeprecatedIconButtonAlignment = DeprecatedPopoverAlignment;

export type NewIconButtonAlignment = NewPopoverAlignment;

export type IconButtonAlignment = PopoverAlignment;

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align?: IconButtonAlignment;

  /**
   * **Experimental**: Will attempt to automatically align the tooltip. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign?: boolean;

  /**
   * **Experimental**: Display a badge on the button. An empty/dot badge if 0, a numbered badge if > 0.
   * Must be used with size="lg" and kind="ghost"
   */
  badgeCount?: number;

  /**
   * Optionally specify an href for your IconButton to become an `<a>` element
   */
  href?: React.AnchorHTMLAttributes<HTMLAnchorElement>['href'];

  /**
   * Provide an icon or asset to be rendered inside of the IconButton
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be added to your Button
   */
  className?: string;

  /**
   * Determines whether the tooltip should close when inner content is activated (click, Enter or Space)
   */
  closeOnActivation?: boolean;

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  defaultOpen?: boolean;

  /**
   * Specify whether the Button should be disabled, or not
   */
  disabled?: boolean;

  /**
   * Specify whether a drop shadow should be rendered on the tooltip
   */
  dropShadow?: boolean;

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  enterDelayMs?: number;

  /**
   * Render the tooltip using the high-contrast theme
   */
  highContrast?: boolean;

  /**
   * Specify whether the IconButton is currently selected
   */

  isSelected?: boolean;

  /**
   * Specify the type of button to be used as the base for the IconButton
   */
  kind?: IconButtonKind;

  /**
   * Provide the label to be rendered inside of the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * This means that if you have text in the child node it will not be
   * announced to the screen reader. If using the badgeCount = 0 then provide a
   * label with describing there is a new notification.
   */
  label: ReactNode;

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs?: number;

  /**
   * Optionally specify a `rel` when using an `<a>` element.
   */
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel'];

  /**
   * Specify the size of the Button.
   */
  size?: Extract<ButtonSize, 'xs' | 'sm' | 'md' | 'lg'>;

  /**
   * Optionally specify a `target` when using an `<a>` element.
   */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];

  /**
   * Specify an optional className to be added to your Tooltip wrapper
   */
  wrapperClasses?: string;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const IconButton = React.forwardRef(
  (
    {
      align,
      autoAlign = false,
      badgeCount,
      children,
      className,
      closeOnActivation = true,
      defaultOpen = false,
      disabled,
      dropShadow = false,
      enterDelayMs = 100,
      highContrast = true,
      kind,
      label,
      leaveDelayMs = 100,
      wrapperClasses,
      size,
      isSelected,
      ...rest
    }: IconButtonProps,
    ref: ForwardedRef<unknown> // TODO: this is unknown on Button, so should it be here as well?
  ) => {
    const prefix = usePrefix();

    const tooltipClasses = classNames(
      wrapperClasses,
      `${prefix}--icon-tooltip`,
      {
        [`${prefix}--icon-tooltip--disabled`]: disabled,
      }
    );

    if (badgeCount && (kind !== 'ghost' || size !== 'lg')) {
      // eslint-disable-next-line no-console -- https://github.com/carbon-design-system/carbon/issues/20452
      console.warn(
        "The prop BadgeCount must be used with hasIconOnly=true, kind='ghost' and size='lg'"
      );
    }
    const badgeId = useId('badge-indicator');

    return (
      <Tooltip
        align={align}
        autoAlign={autoAlign}
        closeOnActivation={closeOnActivation}
        className={tooltipClasses}
        defaultOpen={defaultOpen}
        dropShadow={dropShadow}
        enterDelayMs={enterDelayMs}
        highContrast={highContrast}
        label={label}
        leaveDelayMs={leaveDelayMs}>
        <ButtonBase
          {...rest}
          disabled={disabled}
          kind={kind}
          ref={ref}
          size={size}
          isSelected={isSelected}
          hasIconOnly
          className={className}
          aria-describedby={
            rest['aria-describedby'] || (badgeCount && badgeId)
          }>
          {children}
          {!disabled && badgeCount !== undefined && (
            <BadgeIndicator
              id={badgeId}
              count={badgeCount > 0 ? badgeCount : undefined}></BadgeIndicator>
          )}
        </ButtonBase>
      </Tooltip>
    );
  }
);

IconButton.propTypes = {
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
   * **Experimental**: Will attempt to automatically align the tooltip. Requires
   * React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: PropTypes.bool,

  /**
   * **Experimental**: Display a badge on the button. An empty/dot badge if 0, a numbered badge if > 0.
   * Must be used with size="lg", kind="ghost" and hasIconOnly=true
   */
  badgeCount: PropTypes.number,

  /**
   * Optionally specify an href for your IconButton to become an `<a>` element
   */
  href: PropTypes.string,

  /**
   * Provide an icon or asset to be rendered inside of the IconButton
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your Button
   */
  className: PropTypes.string,

  /**
   * Determines whether the tooltip should close when inner content is activated (click, Enter or Space)
   */
  closeOnActivation: PropTypes.bool,

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  defaultOpen: PropTypes.bool,

  /**
   * Specify whether a drop shadow should be rendered on the tooltip
   */
  dropShadow: PropTypes.bool,

  /**
   * Specify whether the Button should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  enterDelayMs: PropTypes.number,

  /**
   * Specify whether the IconButton is currently selected
   */
  isSelected: PropTypes.bool,

  /**
   * Render the tooltip using the high-contrast theme
   */
  highContrast: PropTypes.bool,

  /**
   * Specify the type of button to be used as the base for the IconButton
   */
  kind: PropTypes.oneOf(IconButtonKinds),

  /**
   * Provide the label to be rendered inside of the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * This means that if you have text in the child node it will not be
   * announced to the screen reader.
   * If using `badgeCount={0}`, make sure the label explains that there is a
   * new notification.
   */
  label: PropTypes.node.isRequired,

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs: PropTypes.number,

  /**
   * Optionally specify a `rel` when using an `<a>` element.
   */
  rel: PropTypes.string,

  /**
   * Specify the size of the Button.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Optionally specify a `target` when using an `<a>` element.
   */
  target: PropTypes.string,

  /**
   * Specify an optional className to be added to your Tooltip wrapper
   */
  wrapperClasses: PropTypes.string,
};

export { IconButton };



