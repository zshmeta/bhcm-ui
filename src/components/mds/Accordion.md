File: Accordion/Accordion.mdx


import Accordion, { AccordionItem, AccordionSkeleton } from '../Accordion';
import { ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as AccordionStories from './Accordion.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Accordion

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Accordion)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/accordion/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/accordion/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Controlled](#controlled)
- [Skeleton state](#skeleton-state)
- [Component API](#component-api)
  - [Accordion align](#accordion-align)
  - [Accordion className](#accordion-classname)
  - [AccordionItem props](#accordionitem-props)
  - [AccordionItem className](#accordionitem-classname)
  - [AccordionItem onHeadingClick](#accordionitem-onheadingclick)
  - [AccordionItem title](#accordionitem-title)
  - [AccordionSkeleton props](#accordionskeleton-props)
  - [AccordionSkeleton className](#accordionskeleton-classname)
- [References](#references)
  - [Why is interactive content in a heading considered an accessibility violation?](#why-is-interactive-content-in-a-heading-considered-an-accessibility-violation)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

You can build an accordion using a combination of the `Accordion` and
`AccordionItem` components. The `Accordion` components accepts a list of
`AccordionItem` components as `children` and each `AccordionItem` is responsible
for displaying the accordion's heading and panel content.

You can configure the accordion item's heading using the `title` prop.
Everything you pass in as a child of `AccordionItem` will be rendered in the
accordion's panel.

<Canvas
  of={AccordionStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(AccordionStories.Default),
    },
  ]}
/>

## Controlled

<Canvas
  of={AccordionStories.Controlled}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(AccordionStories.Controlled),
    },
  ]}
/>

## Skeleton state

You can use the `AccordionSkeleton` component to render a skeleton variant of an
accordion. This is useful to display while content in your accordion is being
fetched from an external resource like an API.

<Canvas
  of={AccordionStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(AccordionStories.Skeleton),
    },
  ]}
/>

## Component API

<ArgTypes />

Additional props passed into `Accordion` will be forwarded along to the
underlying accordion container.

### Accordion align

In rare cases, you may need to specify the alignment of the icon in the
accordion. You can use the `align` prop to specify the side where the icon
should be placed.

_Note: This prop must not be used to create a tree view or set of nested
accordions._

```jsx
<Accordion align="start">
  <AccordionItem title="Panel A">Panel A</AccordionItem>
  <AccordionItem title="Panel B">Panel B</AccordionItem>
  <AccordionItem title="Panel C">Panel C</AccordionItem>
</Accordion>
```

### Accordion className

The `className` prop passed into `Accordion` will be forwarded along to the
underlying accordion container. This is useful for specifying a custom class
name for layout.

```jsx
<Accordion className="custom-class">
  <AccordionItem title="Panel A">Panel A</AccordionItem>
  <AccordionItem title="Panel B">Panel B</AccordionItem>
  <AccordionItem title="Panel C">Panel C</AccordionItem>
</Accordion>
```

### AccordionItem props

Additional props passed into `AccordionItem`, such as `onClick`, will be passed
through to the underlying accordion header.

### AccordionItem className

The `className` prop passed into `AccordionItem` will be forwarded along to the
underlying accordion header. This is useful for specifying a custom class name
for layout. As a reminder, the callback signature will look like
`({ isOpen: boolean, event: Event })` rather than the usual
`(event: Event, state: { isOpen: boolean })` until the next major version.

```jsx
<Accordion>
  <AccordionItem title="Panel A" className="custom-class">
    Panel A
  </AccordionItem>
  <AccordionItem title="Panel B">Panel B</AccordionItem>
  <AccordionItem title="Panel C">Panel C</AccordionItem>
</Accordion>
```

### AccordionItem onHeadingClick

You can use the `onHeadingClick` prop to determine the state of the
`AccordionItem` when it is clicked. it will return

```jsx
<Accordion>
  <AccordionItem onHeadingClick={({ isOpen }) => console.log(isOpen)}>
    Panel A
  </AccordionItem>
</Accordion>
```

### AccordionItem title

You can use the `title` prop to specify the accordion item's heading. The
default behavior is to pass in a `string` as the title, however you can also
pass in a `node`.

_Note: A custom title prop that renders an interactive element is considered an
accessibility violation. For more information, visit our
[reference section](#why-is-interactive-content-in-a-heading-considered-an-accessibility-violation)
below._

```jsx
<Accordion align="start">
  <AccordionItem title={() => <span>Panel A</span>}>Panel A</AccordionItem>
  <AccordionItem title="Panel B">Panel B</AccordionItem>
  <AccordionItem title="Panel C">Panel C</AccordionItem>
</Accordion>
```

### AccordionSkeleton props

Additional props passed into `AccordionSkeleton` will be forwarded along to the
underlying skeleton container.

### AccordionSkeleton className

The `className` prop passed into `AccordionSkeleton` will be forwarded along to
the underlying skeleton container. This is useful for specifying a custom class
name for layout.

```jsx
<AccordionSkeleton className="custom-class" open count={3} />
```

## References

### Why is interactive content in a heading considered an accessibility violation?

When using the `title` prop from `Accordion`, it is possible to render arbitrary
markup within the accordion header. The accordion header itself is rendered as a
`<button>` and is considered an interactive element.

If you render an interactive element inside this header, then it becomes nested
inside the `<button>`. Common examples of this are buttons or links. Rendering
interactive content inside the accordion heading is not reachable via a keyboard
or screen reader.

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Accordion/Accordion.mdx).



File: Accordion/Accordion.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import PropTypes from 'prop-types';
import React, { PropsWithChildren, ReactNode } from 'react';
import { AccordionProvider } from './AccordionProvider';

export interface AccordionProps {
  /**
   * Specify the alignment of the accordion heading
   * title and chevron. Defaults to `end`.
   */
  align?: 'start' | 'end';

  /**
   * Specify an optional className to be applied to
   * the container node.
   */
  className?: string;

  /**
   * Pass in the children that will be rendered within the Accordion
   */
  children?: ReactNode;

  /**
   * Specify whether an individual AccordionItem
   * should be disabled.
   */
  disabled?: boolean;

  /**
   * Specify whether Accordion text should be flush,
   * default is `false`, does not work with `align="start"`.
   */
  isFlush?: boolean;

  /**
   * Specify if the Accordion should be an ordered list,
   * default is `false`
   */
  ordered?: boolean;

  /**
   * Specify the size of the Accordion. Currently
   * supports the following: `sm`, `md`, `lg`
   */
  size?: 'sm' | 'md' | 'lg';
}

function Accordion({
  align = 'end',
  children,
  className: customClassName,
  disabled = false,
  isFlush = false,
  ordered = false,
  size,
  ...rest
}: PropsWithChildren<AccordionProps>) {
  const prefix = usePrefix();

  const className = cx(`${prefix}--accordion`, customClassName, {
    [`${prefix}--accordion--${align}`]: align,
    [`${prefix}--accordion--${size}`]: size, // TODO: V12 - Remove this class
    [`${prefix}--layout--size-${size}`]: size,
    [`${prefix}--accordion--flush`]: isFlush && align !== 'start',
  });
  const ListTag = ordered ? 'ol' : 'ul';

  return (
    <AccordionProvider disabled={disabled}>
      <ListTag className={className} {...rest}>
        {children}
      </ListTag>
    </AccordionProvider>
  );
}

Accordion.propTypes = {
  /**
   * Specify the alignment of the accordion heading title and chevron.
   */
  align: PropTypes.oneOf(['start', 'end']),

  /**
   * Pass in the children that will be rendered within the Accordion
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether an individual AccordionItem should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether Accordion text should be flush, default is false, does not work with align="start"
   */
  isFlush: PropTypes.bool,

  /**
   * Specify if the Accordion should be an ordered list,
   * default is `false`
   */
  ordered: PropTypes.bool,

  /**
   * Specify the size of the Accordion. Currently supports the following:
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Accordion;



File: Accordion/Accordion.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import './story.scss';
import { default as Accordion, AccordionItem, AccordionSkeleton } from '.';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import mdx from './Accordion.mdx';
import { WithLayer } from '../../../.storybook/templates/WithLayer';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  subcomponents: {
    AccordionItem,
    AccordionSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgTypes = {
  align: {
    options: ['start', 'end'],
    control: { type: 'select' },
  },
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  isFlush: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
};

export const Default = (args) => (
  <Accordion {...args}>
    <AccordionItem title="Section 1 title">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </AccordionItem>
    <AccordionItem title="Section 2 title">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </AccordionItem>
    <AccordionItem title="Section 3 title">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </AccordionItem>
    <AccordionItem
      title={
        <span>
          Section 4 title (<em>the title can be a node</em>)
        </span>
      }>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </AccordionItem>
  </Accordion>
);

Default.args = {
  disabled: false,
  isFlush: false,
};

Default.argTypes = { ...sharedArgTypes };

export const Controlled = (args) => {
  const [expandAll, setExpandAll] = React.useState(false);
  return (
    <>
      <ButtonSet className={'controlled-accordion-btnset'}>
        <Button
          className={'controlled-accordion-btn'}
          onClick={() => {
            expandAll === true ? setExpandAll(1) : setExpandAll(true);
          }}>
          Click to expand all
        </Button>
        <Button
          className={'controlled-accordion-btn'}
          onClick={() => {
            expandAll || expandAll === null
              ? setExpandAll(false)
              : setExpandAll(null);
          }}>
          Click to collapse all
        </Button>
      </ButtonSet>

      <Accordion {...args}>
        <AccordionItem title="Section 1 title" open={expandAll}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 2 title" open={expandAll}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 3 title" open={expandAll}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 4 title" open={expandAll}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
      </Accordion>
    </>
  );
};

Controlled.args = {
  disabled: false,
  isFlush: false,
};

Controlled.argTypes = { ...sharedArgTypes };

export const _WithLayer = (args) => {
  return (
    <WithLayer {...args}>
      <Accordion>
        <AccordionItem title="Section 1 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 2 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 3 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 4 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
      </Accordion>
    </WithLayer>
  );
};

WithLayer.args = {
  disabled: false,
  isFlush: false,
};

WithLayer.argTypes = { ...sharedArgTypes };

export const Skeleton = (args) => (
  <AccordionSkeleton open count={4} {...args} />
);

Skeleton.decorators = [
  (story) => <div style={{ width: '500px' }}>{story()}</div>,
];

Skeleton.args = {
  isFlush: false,
};

Skeleton.argTypes = {
  align: {
    options: ['start', 'end'],
    control: { type: 'select' },
  },
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  disabled: {
    control: false,
  },
  isFlush: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    control: false,
  },
};



File: Accordion/Accordion.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { ChevronRight } from '@carbon/icons-react';
import SkeletonText from '../SkeletonText';
import { usePrefix } from '../../internal/usePrefix';

export interface AccordionSkeletonProps {
  /**
   * Specify the alignment of the accordion heading
   * title and chevron.
   */
  align?: 'start' | 'end';

  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * Set number of items to render.
   */
  count?: number;

  /**
   * Specify whether an individual AccordionItem should
   * be flush, default is false.
   */
  isFlush?: boolean;

  /**
   * `false` to not display the first item opened.
   */
  open?: boolean;

  /**
   * Specify if the Accordion should be an ordered list,
   * default is `false`
   */
  ordered?: boolean;
}

function AccordionSkeleton({
  align = 'end',
  className,
  count = 4,
  isFlush,
  open = true,
  ordered = false,
  ...rest
}: AccordionSkeletonProps) {
  const prefix = usePrefix();
  const classes = cx(`${prefix}--accordion`, `${prefix}--skeleton`, className, {
    [`${prefix}--accordion--${align}`]: align,
    [`${prefix}--accordion--flush`]: isFlush && align !== 'start',
  });
  const numSkeletonItems = open ? count - 1 : count;
  const ListTag = ordered ? 'ol' : 'ul';
  return (
    <ListTag className={classes} {...rest}>
      {open && (
        <li
          className={`${prefix}--accordion__item ${prefix}--accordion__item--active`}>
          <span className={`${prefix}--accordion__heading`}>
            <ChevronRight className={`${prefix}--accordion__arrow`} />
            <SkeletonText className={`${prefix}--accordion__title`} />
          </span>
          <div className={`${prefix}--accordion__content`}>
            <SkeletonText width="90%" />
            <SkeletonText width="80%" />
            <SkeletonText width="95%" />
          </div>
        </li>
      )}
      {Array.from({ length: numSkeletonItems }).map((_, i) => (
        <AccordionSkeletonItem key={i} />
      ))}
    </ListTag>
  );
}

AccordionSkeleton.propTypes = {
  /**
   * Specify the alignment of the accordion heading title and chevron.
   */
  align: PropTypes.oneOf(['start', 'end']),

  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Set number of items to render
   */
  count: PropTypes.number,

  /**
   * Specify whether an individual AccordionItem should be flush, default is false
   */
  isFlush: PropTypes.bool,

  /**
   * `false` to not display the first item opened
   */
  open: PropTypes.bool,
};

function AccordionSkeletonItem() {
  const prefix = usePrefix();
  return (
    <li className={`${prefix}--accordion__item`}>
      <span className={`${prefix}--accordion__heading`}>
        <ChevronRight className={`${prefix}--accordion__arrow`} />
        <SkeletonText className={`${prefix}--accordion__title`} />
      </span>
    </li>
  );
}

export default AccordionSkeleton;
export { AccordionSkeleton };



File: Accordion/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-accordion--default'
    }
  ]}
/>



File: Accordion/AccordionProvider.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { PropsWithChildren, createContext } from 'react';

type AccordionProviderProp = {
  /**
   * Global setting to disable all AccordionItems
   * within the Accordion. Individual AccordionItems can be
   * disabled by passing the `disabled` prop to the AccordionItem.
   */
  disabled: boolean;
};

export const AccordionContext = createContext({ disabled: false });

export const AccordionProvider = ({
  disabled,
  children,
}: PropsWithChildren<AccordionProviderProp>) => {
  return (
    <AccordionContext.Provider value={{ disabled }}>
      {children}
    </AccordionContext.Provider>
  );
};



File: Accordion/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Accordion, { type AccordionProps } from './Accordion';

export default Accordion;
export { Accordion, type AccordionProps };
export { default as AccordionItem } from './AccordionItem';
export { default as AccordionSkeleton } from './Accordion.Skeleton';



File: Accordion/story.scss


//
// Copyright IBM Corp. 2016, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

.controlled-accordion-btnset {
  padding-block-end: 0.5rem;
}

.controlled-accordion-btnset .controlled-accordion-btn {
  max-inline-size: 13.25rem;
}



File: Accordion/AccordionItem.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ChevronRight } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  AnimationEventHandler,
  AriaAttributes,
  KeyboardEvent,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { Text } from '../Text';
import { match, keys } from '../../internal/keyboard';
import { useId } from '../../internal/useId';
import { deprecate } from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { AccordionContext } from './AccordionProvider';

export interface AccordionItemProps {
  /**
   * Specify an optional className to be
   * applied to the container node.
   */
  className?: string;

  /**
   * Specify whether an individual `AccordionItem` should
   * be disabled (overrides the parent accordion state). If undefined,
   * this value will be managed by the parent Accordion.
   */
  disabled?: boolean;

  /**
   * Specify a custom label for the accordion button.
   * This is important for accessibility when the accordion has no visible title.
   */
  'aria-label'?: AriaAttributes['aria-label'];

  /**
   * The handler of the massaged `click` event.
   */
  onClick?: MouseEventHandler<HTMLLIElement>;

  /**
   * The handler of the massaged `click` event on
   * the heading.
   */
  onHeadingClick?: ({
    isOpen,
    event,
  }: {
    isOpen: boolean;
    event: Parameters<MouseEventHandler<HTMLButtonElement>>[0];
  }) => void;

  /**
   * `true` to open the expand.
   */
  open?: boolean;

  /**
   * @deprecated This prop has been deprecated and will be
   * removed in the next major release of Carbon. Use the
   * `renderToggle` prop instead.
   */
  renderExpando?: (
    props: PropsWithChildren<AccordionToggleProps>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  ) => ReactElement<any>;

  /**
   * The callback function to render the expand button.
   * Can be a React component class.
   */
  renderToggle?: (
    props: PropsWithChildren<AccordionToggleProps>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  ) => ReactElement<any>;

  /**
   * The accordion title.
   */
  title?: ReactNode;

  /**
   * The callback function to run on the `onAnimationEnd`
   * event for the list item.
   */
  handleAnimationEnd?: AnimationEventHandler<HTMLElement>;
}

export interface AccordionToggleProps {
  'aria-controls'?: AriaAttributes['aria-controls'];
  'aria-expanded'?: AriaAttributes['aria-expanded'];
  'aria-label'?: AriaAttributes['aria-label'];
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  type?: 'button';
}

const defaultRenderToggle = (props: AccordionToggleProps) => (
  <button type="button" {...props} />
);

function AccordionItem({
  children,
  className: customClassName = '',
  open = false,
  onHeadingClick,
  renderExpando = defaultRenderToggle, // remove renderExpando in next major release
  renderToggle,
  title = 'title',
  disabled: controlledDisabled,
  handleAnimationEnd,
  'aria-label': ariaLabel,
  ...rest
}: PropsWithChildren<AccordionItemProps>) {
  const [isOpen, setIsOpen] = useState(open);
  const [prevIsOpen, setPrevIsOpen] = useState(open);
  const accordionState = useContext(AccordionContext);

  const disabledIsControlled = typeof controlledDisabled === 'boolean';
  const disabled = disabledIsControlled
    ? controlledDisabled
    : accordionState.disabled;

  const id = useId('accordion-item');
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--accordion__item`]: true,
    [`${prefix}--accordion__item--active`]: isOpen && !disabled,
    [`${prefix}--accordion__item--disabled`]: disabled,
    [customClassName]: !!customClassName,
  });

  const Toggle = renderToggle || renderExpando; // remove renderExpando in next major release

  const content = React.useCallback(
    (node: HTMLDivElement) => {
      if (!node) {
        return;
      }
      if (isOpen) {
        // accordion closes
        node.style.maxBlockSize = '';
      }
    },
    [isOpen]
  );

  if (open !== prevIsOpen) {
    setIsOpen(open);
    setPrevIsOpen(open);
  }

  // When the AccordionItem heading is clicked, toggle the open state of the
  // panel
  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const nextValue = !isOpen;
    setIsOpen(nextValue);
    if (onHeadingClick) {
      // TODO: normalize signature, potentially:
      // onHeadingClick :: (event: Event, state: { isOpen: Boolean }) => any
      onHeadingClick({ isOpen: nextValue, event });
    }
  }

  // If the AccordionItem is open, and the user hits the ESC key, then close it
  function onKeyDown(event) {
    if (isOpen && match(event, keys.Escape)) {
      setIsOpen(false);
    }
  }

  function onAnimationEnd(event) {
    if (handleAnimationEnd) {
      handleAnimationEnd(event);
    }
  }

  return (
    <li className={className} {...rest}>
      <Toggle
        disabled={disabled}
        aria-controls={id}
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className={`${prefix}--accordion__heading`}
        onClick={onClick}
        onKeyDown={onKeyDown}
        type="button">
        <ChevronRight className={`${prefix}--accordion__arrow`} />
        <Text as="div" className={`${prefix}--accordion__title`}>
          {title}
        </Text>
      </Toggle>
      <div
        ref={content}
        className={`${prefix}--accordion__wrapper`}
        onTransitionEnd={onAnimationEnd}>
        <div id={id} className={`${prefix}--accordion__content`}>
          {children}
        </div>
      </div>
    </li>
  );
}

AccordionItem.propTypes = {
  /**
   * Provide the contents of your AccordionItem
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether an individual AccordionItem should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify a custom label for the accordion button.
   * This is important for accessibility when the accordion has no visible title.
   */
  'aria-label': PropTypes.string,

  /**
   * The handler of the massaged `click` event.
   */
  onClick: PropTypes.func,

  /**
   * The handler of the massaged `click` event on the heading.
   */
  onHeadingClick: PropTypes.func,

  /**
   * `true` to open the expand.
   */
  open: PropTypes.bool,

  /**
   * The callback function to render the expand button.
   * Can be a React component class.
   */
  renderExpando: deprecate(
    PropTypes.func,
    'The `renderExpando` prop has been deprecated and will be removed in the next major release of Carbon. Use the `renderToggle` prop instead.'
  ),

  /**
   * The callback function to render the expand button.
   * Can be a React component class.
   */
  renderToggle: PropTypes.func,

  /**
   * The accordion title.
   */
  title: PropTypes.node,
};

export default AccordionItem;



