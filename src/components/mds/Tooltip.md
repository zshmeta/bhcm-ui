File: Tooltip/Tooltip.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type JSX,
} from 'react';
import { Popover, PopoverAlignment, PopoverContent } from '../Popover';
import { keys, match } from '../../internal/keyboard';
import { useDelayedState } from '../../internal/useDelayedState';
import { useId } from '../../internal/useId';
import { useNoInteractiveChildren } from '../../internal/useNoInteractiveChildren';
import { usePrefix } from '../../internal/usePrefix';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from '../../internal/PolymorphicProps';

/**
 * Event types that trigger a "drag" to stop.
 */
const DRAG_STOP_EVENT_TYPES = new Set(['mouseup', 'touchend', 'touchcancel']);

interface TooltipBaseProps {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align?: PopoverAlignment;

  /**
   * Pass in the child to which the tooltip will be applied
   */
  children?: React.ReactElement<
    JSX.IntrinsicElements[keyof JSX.IntrinsicElements]
  >;

  /**
   * Specify an optional className to be applied to the container node
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
   * Provide the description to be rendered inside of the Tooltip. The
   * description will use `aria-describedby` and will describe the child node
   * in addition to the text rendered inside of the child. This means that if you
   * have text in the child node, that it will be announced alongside the
   * description to the screen reader.
   *
   * Note: if label and description are both provided, label will be used and
   * description will not be used
   */
  description?: React.ReactNode;

  /**
   * Specify whether a drop shadow should be rendered
   */
  dropShadow?: boolean;

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  enterDelayMs?: number;

  /**
   * Render the component using the high-contrast theme
   */
  highContrast?: boolean; // TODO: remove in v12, highContrast should not be configurable

  /**
   * Provide the label to be rendered inside of the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * This means that if you have text in the child node, that it will not be
   * announced to the screen reader.
   *
   * Note: if label and description are both provided, description will not be
   * used
   */
  label?: React.ReactNode;

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs?: number;
}

export type TooltipProps<T extends React.ElementType> =
  PolymorphicComponentPropWithRef<T, TooltipBaseProps>;

type TooltipComponent = <T extends React.ElementType = typeof Popover>(
  props: TooltipProps<T>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
) => React.ReactElement | any;

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const Tooltip: TooltipComponent = React.forwardRef(
  <T extends React.ElementType = typeof Popover>(
    {
      as,
      align = 'top',
      className: customClassName,
      children,
      label,
      description,
      enterDelayMs = 100,
      leaveDelayMs = 300,
      defaultOpen = false,
      closeOnActivation = false,
      dropShadow = false,
      highContrast = true, // TODO: remove in v12, highContrast should not be configurable
      ...rest
    }: TooltipProps<T>,
    ref?: PolymorphicRef<T>
  ) => {
    const tooltipRef = useRef<HTMLSpanElement>(null);
    const [open, setOpen] = useDelayedState(defaultOpen);
    const [isDragging, setIsDragging] = useState(false);
    const [focusByMouse, setFocusByMouse] = useState(false);
    const [isPointerIntersecting, setIsPointerIntersecting] = useState(false);
    const id = useId('tooltip');
    const prefix = usePrefix();
    const child = React.Children.only(children);

    const {
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
    } = child?.props ?? {};

    const hasLabel = !!label;
    const labelledBy = ariaLabelledBy ?? (hasLabel ? id : undefined);
    const describedBy = ariaDescribedBy ?? (!hasLabel ? id : undefined);

    const triggerProps = {
      onFocus: () => !focusByMouse && setOpen(true),
      onBlur: () => {
        setOpen(false);
        setFocusByMouse(false);
      },
      onClick: () => closeOnActivation && setOpen(false),
      // This should be placed on the trigger in case the element is disabled
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseMove: onMouseMove,
      onTouchStart: onDragStart,
      'aria-labelledby': labelledBy,
      'aria-describedby': describedBy,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    function getChildEventHandlers(childProps: any) {
      const eventHandlerFunctions = Object.keys(triggerProps).filter((prop) =>
        prop.startsWith('on')
      );
      const eventHandlers = {};
      eventHandlerFunctions.forEach((functionName) => {
        eventHandlers[functionName] = (evt: React.SyntheticEvent) => {
          triggerProps[functionName](evt);
          if (childProps?.[functionName]) {
            childProps?.[functionName](evt);
          }
        };
      });
      return eventHandlers;
    }

    const onKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (open && match(event, keys.Escape)) {
          event.stopPropagation();
          setOpen(false);
        }
        if (
          open &&
          closeOnActivation &&
          (match(event, keys.Enter) || match(event, keys.Space))
        ) {
          setOpen(false);
        }
      },
      [closeOnActivation, open, setOpen]
    );

    useIsomorphicEffect(() => {
      if (!open) {
        return undefined;
      }

      function handleKeyDown(event: KeyboardEvent) {
        if (match(event, keys.Escape)) {
          onKeyDown(event);
        }
      }

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [open, onKeyDown]);

    function onMouseEnter() {
      // Interactive Tags should not support onMouseEnter
      if (!rest?.onMouseEnter) {
        setIsPointerIntersecting(true);
        setOpen(true, enterDelayMs);
      }
    }

    function onMouseDown() {
      setFocusByMouse(true);
      onDragStart();
    }

    function onMouseLeave() {
      setIsPointerIntersecting(false);
      if (isDragging) {
        return;
      }
      setOpen(false, leaveDelayMs);
    }

    function onMouseMove(evt) {
      if (evt.buttons === 1) {
        setIsDragging(true);
      } else {
        setIsDragging(false);
      }
    }

    function onDragStart() {
      setIsDragging(true);
    }

    const onDragStop = useCallback(() => {
      setIsDragging(false);
      // Close the tooltip, unless the mouse pointer is within the bounds of the
      // trigger.
      if (!isPointerIntersecting) {
        setOpen(false, leaveDelayMs);
      }
    }, [isPointerIntersecting, leaveDelayMs, setOpen]);

    useNoInteractiveChildren(
      tooltipRef,
      'The Tooltip component must have no interactive content rendered by the' +
        '`label` or `description` prop'
    );

    useEffect(() => {
      if (isDragging) {
        // Register drag stop handlers.
        DRAG_STOP_EVENT_TYPES.forEach((eventType) => {
          document.addEventListener(eventType, onDragStop);
        });
      }
      return () => {
        DRAG_STOP_EVENT_TYPES.forEach((eventType) => {
          document.removeEventListener(eventType, onDragStop);
        });
      };
    }, [isDragging, onDragStop]);

    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      <Popover<any>
        as={as}
        ref={ref}
        {...rest}
        align={align}
        className={cx(`${prefix}--tooltip`, customClassName)}
        dropShadow={dropShadow}
        highContrast={highContrast} // TODO: v12 hard-set highContrast to true
        onKeyDown={onKeyDown}
        onMouseLeave={onMouseLeave}
        open={open}>
        <div className={`${prefix}--tooltip-trigger__wrapper`}>
          {typeof child !== 'undefined'
            ? React.cloneElement(child, {
                ...triggerProps,
                ...getChildEventHandlers(child.props),
              })
            : null}
        </div>
        <PopoverContent
          aria-hidden={open ? 'false' : 'true'}
          className={`${prefix}--tooltip-content`}
          id={id}
          onMouseEnter={onMouseEnter}
          role="tooltip">
          {label || description}
        </PopoverContent>
      </Popover>
    );
  }
);

(Tooltip as React.FC).propTypes = {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align: PropTypes.oneOf([
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

  /**
   * Pass in the child to which the tooltip will be applied
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Determines wether the tooltip should close when inner content is activated (click, Enter or Space)
   */
  closeOnActivation: PropTypes.bool,

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  defaultOpen: PropTypes.bool,

  /**
   * Provide the description to be rendered inside of the Tooltip. The
   * description will use `aria-describedby` and will describe the child node
   * in addition to the text rendered inside of the child. This means that if you
   * have text in the child node, that it will be announced alongside the
   * description to the screen reader.
   *
   * Note: if label and description are both provided, label will be used and
   * description will not be used
   */
  description: PropTypes.node,

  /**
   * Specify whether a drop shadow should be rendered
   */
  dropShadow: PropTypes.bool,

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  enterDelayMs: PropTypes.number,

  /**
   * Render the component using the high-contrast theme
   */
  highContrast: PropTypes.bool, // TODO: remove in v12, highContrast should not be configurable

  /**
   * Provide the label to be rendered inside of the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * This means that if you have text in the child node, that it will not be
   * announced to the screen reader.
   *
   * Note: if label and description are both provided, description will not be
   * used
   */
  label: PropTypes.node,

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs: PropTypes.number,
};

export { Tooltip };



File: Tooltip/DefinitionTooltip.mdx


import { Story, ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as DefinitionTooltipStories from './DefinitionTooltip.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# DefinitionTooltip

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Tooltip/DefinitionTooltip.tsx)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/tooltip/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/tooltip/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [Customizing the content of a definition tooltip](#customizing-the-content-of-a-definition-tooltip)
  - [Tooltip alignment](#tooltip-alignment)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

The `DefinitionTooltip` component is used to provide additional information
about a particular term or phrase in text content. It is similar to a `Tooltip`
component but has fewer alignment options and has a slightly different
interaction pattern.

The `DefinitionTooltip` is made up of two parts: a term and the tooltip itself.
You can customize the contents of the tooltip through the `definition` prop. You
can customize the term by providing your own `children` to this component.

<Canvas
  of={DefinitionTooltipStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(DefinitionTooltipStories.Default),
    },
  ]}
/>

### Customizing the content of a definition tooltip

You can customize the content of the tooltip through the `definition` prop. This
prop allows you to provide text or your own custom elements to be rendered as a
definition for your term.

Note: content passed into the `definition` prop must not contain any interactive
content. If you pass in interactive content, it's semantics will not be
available to users of screen reader software.

### Tooltip alignment

The `align` prop allows you to specify where your content should be placed
relative to the tooltip. For example, if you provide `align="top"` to the
`DefinitionTooltip` component then the tooltip will render above your component.
Similarly, if you provide `align="bottom"` then the tooltip will render below
your component.

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Tooltip/DefinitionTooltip.mdx).



File: Tooltip/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  DefinitionTooltip,
  type DefinitionTooltipProps,
} from './DefinitionTooltip';
import { Tooltip, type TooltipProps } from './Tooltip';

export {
  DefinitionTooltip,
  Tooltip,
  type DefinitionTooltipProps,
  type TooltipProps,
};
export default Tooltip;



File: Tooltip/Tooltip.featureflag.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { OverflowMenuVertical } from '@carbon/icons-react';
import { Tooltip } from '../Tooltip';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

import './story.scss';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Tooltip/Feature Flag',
  component: Tooltip,
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
  const tooltipLabel = 'Options';
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Tooltip label={tooltipLabel} align={args.align}>
        <button className="sb-tooltip-trigger" type="button">
          <OverflowMenuVertical />
        </button>
      </Tooltip>
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
  label: {
    control: {
      type: 'text',
    },
  },
  description: {
    control: {
      type: 'text',
    },
  },
  highContrast: {
    table: {
      disable: true,
    },
  },
};



File: Tooltip/DefinitionTooltip.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Popover, PopoverAlignment, PopoverContent } from '../Popover';
import { match, keys } from '../../internal/keyboard';
import { useFallbackId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';

export interface DefinitionTooltipProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'id' | 'classname' | 'children' | 'type'
  > {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align?: PopoverAlignment;

  /**
   * Will auto-align Definition Tooltip. This prop is currently experimental
   * and is subject to future changes. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign?: boolean;

  /**
   * The `children` prop will be used as the value that is being defined
   */
  children: React.ReactNode;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  defaultOpen?: boolean;

  /**
   * The `definition` prop is used as the content inside of the tooltip that
   * appears when a user interacts with the element rendered by the `children`
   * prop
   */
  definition: React.ReactNode;

  /**
   * Provide a value that will be assigned as the id of the tooltip
   */
  id?: string;

  /**
   * Specifies whether or not the `DefinitionTooltip` should open on hover or not
   */
  openOnHover?: boolean;

  /**
   * @deprecated [Deprecated in v11] Please use the `definition` prop instead.
   *
   * Provide the text that will be displayed in the tooltip when it is rendered.
   */
  tooltipText?: React.ReactNode;

  /**
   * The CSS class name of the trigger element
   */
  triggerClassName?: string;
}

const DefinitionTooltip: React.FC<DefinitionTooltipProps> = ({
  align = 'bottom',
  autoAlign,
  className,
  children,
  definition,
  defaultOpen = false,
  id,
  openOnHover,
  tooltipText,
  triggerClassName,
  ...rest
}) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const prefix = usePrefix();
  const tooltipId = useFallbackId(id);

  function onKeyDown(event: React.KeyboardEvent) {
    if (isOpen && match(event, keys.Escape)) {
      event.stopPropagation();
      setOpen(false);
    }
  }

  return (
    <Popover
      align={align}
      className={className}
      autoAlign={autoAlign}
      dropShadow={false}
      highContrast
      onMouseLeave={() => {
        setOpen(false);
      }}
      onMouseEnter={() => {
        // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
        openOnHover ? setOpen(true) : null;
      }}
      onFocus={() => {
        setOpen(true);
      }}
      open={isOpen}>
      <button
        {...rest}
        className={cx(`${prefix}--definition-term`, triggerClassName)}
        aria-controls={tooltipId}
        aria-describedby={tooltipId}
        aria-expanded={isOpen}
        onBlur={() => {
          setOpen(false);
        }}
        onMouseDown={(event) => {
          // We use onMouseDown rather than onClick to make sure this triggers
          // before onFocus.
          if (event.button === 0) setOpen(!isOpen);
        }}
        onKeyDown={onKeyDown}
        type="button">
        {children}
      </button>
      <PopoverContent
        className={`${prefix}--definition-tooltip`}
        id={tooltipId}>
        {tooltipText ?? definition}
      </PopoverContent>
    </Popover>
  );
};

DefinitionTooltip.propTypes = {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align: PropTypes.oneOf([
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

  /**
   * Will auto-align the popover. This prop is currently experimental and is
   * subject to future changes. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: PropTypes.bool,

  /**
   * The `children` prop will be used as the value that is being defined
   */
  children: PropTypes.node.isRequired,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  defaultOpen: PropTypes.bool,

  /**
   * The `definition` prop is used as the content inside of the tooltip that
   * appears when a user interacts with the element rendered by the `children`
   * prop
   */
  definition: PropTypes.node.isRequired,

  /**
   * Provide a value that will be assigned as the id of the tooltip
   */
  id: PropTypes.string,

  /**
   * Specifies whether or not the `DefinitionTooltip` should open on hover or not
   */
  openOnHover: PropTypes.bool,

  /**
   * [Deprecated in v11] Please use the `definition` prop instead.
   *
   * Provide the text that will be displayed in the tooltip when it is rendered.
   */
  tooltipText: deprecate(
    PropTypes.node,
    'The tooltipText prop has been deprecated. Please use the `definition` prop instead.'
  ),

  /**
   * The CSS class name of the trigger element
   */
  triggerClassName: PropTypes.string,
};

export { DefinitionTooltip };



File: Tooltip/Tooltip.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import { OverflowMenuVertical } from '@carbon/icons-react';
import React, { useRef, useEffect } from 'react';
import { Tooltip } from './';
import mdx from './Tooltip.mdx';
import Button from '../Button';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    layout: 'centered',
    docs: {
      page: mdx,
    },
  },
  argTypes: {
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
    highContrast: {
      table: {
        disable: true,
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    description: {
      control: {
        type: 'text',
      },
    },
  },
  decorators: [
    (Story, context) => {
      if (context.name.toLowerCase().includes('auto align')) {
        return <Story />;
      }
      return (
        <div className="sb-tooltip-story">
          <Story />
        </div>
      );
    },
  ],
};

// Note: autoAlign is used here only to make tooltips visible in StackBlitz,
// autoAlign is in preview and not part of the actual implementation.
export const Default = (args) => {
  const label = 'Options';
  return (
    <Tooltip autoAlign label={label} closeOnActivation={false} {...args}>
      <button className="sb-tooltip-trigger" type="button">
        <OverflowMenuVertical />
      </button>
    </Tooltip>
  );
};

export const Alignment = (args) => {
  return (
    <Tooltip label="Tooltip alignment" align="bottom-left" {...args}>
      <Button>This button has a tooltip</Button>
    </Tooltip>
  );
};

export const ExperimentalAutoAlign = (args) => {
  const ref = useRef();
  const tooltipLabel =
    'Scroll the container up, down, left or right to observe how the tooltip will automatically change its position in attempt to stay within the viewport. This works on initial render in addition to on scroll.';

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
        <Tooltip label={tooltipLabel} align="top" autoAlign {...args}>
          <Button ref={ref}>This button has a tooltip</Button>
        </Tooltip>
      </div>
    </div>
  );
};

// Note: autoAlign is used here only to make tooltips visible in StackBlitz,
// autoAlign is in preview and not part of the actual implementation.
export const Duration = (args) => {
  return (
    <Tooltip
      autoAlign
      label="Label one"
      enterDelayMs={0}
      leaveDelayMs={300}
      {...args}>
      <Button>This button has a tooltip</Button>
    </Tooltip>
  );
};



File: Tooltip/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-tooltip--default'
    },
    {
      label: 'Alignment',
      variant: 'components-tooltip--alignment'
    },
    {
      label: 'Duration',
      variant: 'components-tooltip--duration'
    }
  ]}
/>


File: Tooltip/docs/definition-tooltip-overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-definitiontooltip--default'
    }
  ]}
/>



File: Tooltip/migrate-to-7.x.md


# Props

`<Tooltip>`

| v9                                             | v10                                                                              |
| ---------------------------------------------- | -------------------------------------------------------------------------------- |
| `icon`, icon name from `carbon-icons`          | `renderIcon`, which takes a React component, e.g. one from `@carbon/icons-react` |
| `iconName`, icon data from `carbon-icons`      | `renderIcon`, which takes a React component, e.g. one from `@carbon/icons-react` |
| `ref` grabs the React class instance reference | `ref` grabs the trigger button                                                   |

## `v10` example

```javascript
import Information16 from '@carbon/icons-react/lib/information/16';

...

<Tooltip renderIcon={Information16}>
  My tooltip content...
</Tooltip>
```



File: Tooltip/DefinitionTooltip.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import React from 'react';
import { DefinitionTooltip } from './';
import mdx from './DefinitionTooltip.mdx';

export default {
  title: 'Components/DefinitionTooltip',
  component: DefinitionTooltip,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
      exclude: ['id', 'tooltipText', 'triggerClassName'],
    },
    docs: {
      page: mdx,
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="sb-tooltip-story sb-definition-tooltip">
        <Story />
      </div>
    ),
  ],
};
export const Default = (args) => {
  const definition =
    'Uniform Resource Locator; the address of a resource (such as a document or website) on the Internet.';
  return (
    <p>
      Custom domains direct requests for your apps in this Cloud Foundry
      organization to a{' '}
      <DefinitionTooltip openOnHover definition={definition} {...args}>
        URL
      </DefinitionTooltip>{' '}
      that you own. A custom domain can be a shared domain, a shared subdomain,
      or a shared domain and host.
    </p>
  );
};

Default.args = {
  align: 'bottom-left',
  defaultOpen: false,
  definition: 'Example definition',
  openOnHover: true,
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
  definition: {
    control: {
      type: 'text',
    },
  },
  openOnHover: {
    control: {
      type: 'boolean',
    },
  },
};

export const WithLargeText = (args) => {
  const definition = 'Example definition';
  return (
    <p>
      Custom domains direct requests for your apps in this Cloud Foundry
      organization to a{' '}
      <DefinitionTooltip openOnHover definition={definition} {...args}>
        URL that you own. A custom domain can be a shared domain,
      </DefinitionTooltip>{' '}
      a shared subdomain, or a shared domain and host.
    </p>
  );
};

WithLargeText.args = {
  align: 'bottom-left',
  defaultOpen: false,
  definition: 'Example definition',
  openOnHover: true,
};

WithLargeText.argTypes = {
  align: {
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
  definition: {
    control: {
      type: 'text',
    },
  },
  id: {
    table: { disable: true },
  },
  openOnHover: {
    control: {
      type: 'boolean',
    },
  },
  tooltipText: {
    table: {
      disable: true,
    },
  },
  triggerClassName: {
    table: {
      disable: true,
    },
  },
};



File: Tooltip/Tooltip.mdx


import { Story, ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as TooltipStories from './Tooltip.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Tooltip

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Tooltip)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/tooltip/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/tooltip/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [Usage](#usage)
  - [Toggletips vs Tooltips](#toggletips-vs-tooltips)
  - [Customizing the content of a tooltip](#customizing-the-content-of-a-tooltip)
  - [Tooltip alignment](#tooltip-alignment)
  - [Customizing the duration of a tooltip](#customizing-the-duration-of-a-tooltip)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

You can use the `Tooltip` component as a wrapper to display a popup for an
interactive element that you provide. If you are trying to place interactive
content inside of the `Tooltip` itself, consider using `Toggletip` instead.

### Usage

`Tooltip` accepts a single child for its `children` prop. It is important that
the child is an interactive element, for example:

```jsx
<Tooltip label="Close">
  <button type="button">X</button>
</Tooltip>
```

When used with a component, props need to be spread on the child component.

```jsx
export default function App() {
  return (
    <Tooltip label="Close">
      <CustomTrigger />
    </Tooltip>
  );
}

function CustomTrigger(props) {
  return (
    <button type="button" {...props}>
      X
    </button>
  );
}
```

You can specify the contents of the popup through the `label` or `description`
prop.

<Canvas
  of={TooltipStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TooltipStories.Default),
    },
  ]}
/>

### Toggletips vs Tooltips

Toggletips and tooltips are similar visually and both contain a popover and
interactive trigger element. The two components differ in the way they are
invoked and dismissed and if the user must interact with the contents. A tooltip
is exposed on hover or focus when you need to expose brief, supplemental
information that is not interactive. A toggletip is used on click or enter when
you need to expose interactive elements, such as button, that a user needs to
interact with.

### Customizing the content of a tooltip

The `Tooltip` component supports tooltip customization through the `label` and
`description` props. Under the hood, `label` will map to `aria-labelledby` and
`description` will map to `aria-describedby`.

It's important to consider the type of content that you provide through the
tooltip in order to know whether to use `label` or `description`. If the
information shown is the only content that describes your component, you should
use a `label`. If the information is secondary or adds additional information,
`description` would be a good pick.

While the `label` and `description` props accept any arbitrary React element,
it's important that the value you pass to either prop has no interactive
content. This will cause a violation in the component as the semantics of this
content will not be accessible to users of screen reader software.

### Tooltip alignment

The `align` prop allows you to specify where your content should be placed
relative to the tooltip. For example, if you provide `align="top"` to the
`Tooltip` component then the tooltip will render above your component.
Similarly, if you provide `align="bottom"` then the tooltip will render below
your component.

<Canvas
  of={TooltipStories.Alignment}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TooltipStories.Alignment),
    },
  ]}
/>

You can also configure the placement of the caret, if it is enabled, by choosing
between `left` and `right` or `bottom` and `top`, depending on where your
tooltip is being rendered.

If you are using `align="top"`, then you can choose between `align="top-left"`
and `align="top-right"`. These options will place the caret closer to the left
or right edges of the tooltip.

If you are using `align="left"` or `align="right"`, you can use `top` or
`bottom` to control this alignment.

### Customizing the duration of a tooltip

You can customize the delay between when a tooltip is invoked and its contents
are shown. You can also customize the delay between when a tooltip is dismissed
and its contents are hidden.

<Canvas
  of={TooltipStories.Duration}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TooltipStories.Duration),
    },
  ]}
/>

The `enterDelayMs` prop allows you to provide a time, in milliseconds, that the
component will wait before showing the tooltip. The `exitDelayMs` prop allows
you to provide a time, in milliseconds, that the component will wait before
hiding the tooltip.

By default, these values are set to 100ms for `enterDelayMs` and 300ms for
`exitDelayMs`.

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Tooltip/Tooltip.mdx).



File: Tooltip/Tooltip.DynamicStyles.featureflag.mdx


import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Components/Tooltip/Feature Flag" name="Flag details" />

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
  <div
    style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    }}>
    <Tooltip label={tooltipLabel} align={args.align}>
      <button className="sb-tooltip-trigger" type="button">
        <OverflowMenuVertical />
      </button>
    </Tooltip>
  </div>
</FeatureFlags>
```



File: Tooltip/story.scss


//
// Copyright IBM Corp. 2016, 2025
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@use '@carbon/styles/scss/spacing';
@use '@carbon/styles/scss/theme';
@use '@carbon/styles/scss/type';
@use '@carbon/styles/scss/utilities/button-reset';
@use '@carbon/styles/scss/utilities/focus-outline';

// This is a utility class to make sure that tooltip stories have a minimum
// height when used in MDX docs
.sb-tooltip-story {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  min-block-size: 250px;
}

.sb-tooltip-trigger {
  @include button-reset.reset();

  display: flex;
  align-items: center;
  justify-content: center;
  block-size: 1rem;
  inline-size: 1rem;
}

.sb-tooltip-trigger:focus {
  @include focus-outline.focus-outline;
}

.sb-tooltip-trigger svg {
  fill: theme.$icon-secondary;
}

// DefinitionTooltip
.sb-definition-tooltip {
  max-inline-size: 60ch;
}

.sb-definition-tooltip p {
  @include type.type-style('body-short-02');
}



