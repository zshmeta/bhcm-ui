File: Layout/Layout.stories.js


/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { Accordion, AccordionItem } from '../Accordion';
import Button from '../Button';
import Tag from '../Tag';
import { HStack, VStack } from '../Stack';
import { TextInput } from '../TextInput';

import { Layout, LayoutConstraint } from './';
import mdx from './Layout.mdx';

export default {
  title: 'Preview/preview__Layout',
  component: Layout,
  subcomponents: {
    LayoutConstraint,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const Demo = () => (
  <VStack gap={6}>
    <HStack>
      <TextInput labelText="<TextInput />" placeholder="Placeholder" />
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Button>&lt;Button /&gt;</Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Tag>&lt;Tag /&gt;</Tag>
      </div>
      <TextInput
        labelText='<TextInput size="sm" />'
        size="sm"
        placeholder="Placeholder"
      />
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Button size="sm">&lt;Button size=&quot;sm&quot; /&gt;</Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Tag size="sm">&lt;Tag size&quot;sm&quot; /&gt;</Tag>
      </div>
    </HStack>
    <Accordion>
      <AccordionItem title="<AccordionItem />">Content</AccordionItem>
    </Accordion>
  </VStack>
);

export const Default = (args) => {
  return (
    <VStack gap={10}>
      <h1>Layout demo</h1>
      <div>
        <h2>Outside of &lt;Layout&gt;</h2>
        <br />
        <Demo />
      </div>
      <div>
        <h2>Inside of &lt;Layout&gt;</h2>
        <br />
        <Layout {...args}>
          <Demo />
        </Layout>
      </div>
    </VStack>
  );
};



File: Layout/index.tsx


/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { ElementType, HTMLAttributes, ReactNode } from 'react';

import { usePrefix } from '../../internal/usePrefix';

const sizes: Size[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const densities: Density[] = ['condensed', 'normal'];

/**
 * Density of components within this layout
 */
type Density = 'condensed' | 'normal';

/**
 * Size of components within this layout
 */
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface LayoutProps extends HTMLAttributes<HTMLElement> {
  /**
   * Specify a custom component or element to be rendered as the top-level
   * element in the component
   */
  as?: (() => ReactNode) | string | ElementType;

  /**
   * Provide child elements to be rendered inside of `Layout`
   */
  children?: ReactNode;

  /**
   * Provide a custom class name to be used on the outermost element rendered by
   * the component
   */
  className?: string;

  /**
   * Specify the desired density of components within this layout
   */
  density?: Density;

  /**
   * Specify the desired size of components within this layout
   */
  size?: Size;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const Layout = React.forwardRef<ReactNode, LayoutProps>(
  (
    { as: BaseComponent = 'div', children, className, density, size, ...rest },
    forwardRef
  ) => {
    const prefix = usePrefix();

    const classes = cx(className, `${prefix}--layout`, {
      [`${prefix}--layout--size-${size}`]: size && sizes.includes(size),
      [`${prefix}--layout--density-${density}`]:
        density && densities.includes(density),
    });

    return (
      <BaseComponent {...rest} ref={forwardRef} className={classes}>
        {children}
      </BaseComponent>
    );
  }
);

Layout.propTypes = {
  /**
   * Specify a custom component or element to be rendered as the top-level
   * element in the component
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /**
   * Provide child elements to be rendered inside of `Layout`
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be used on the outermost element rendered by
   * the component
   */
  className: PropTypes.string,

  /**
   * Specify the desired density of components within this layout
   */
  density: PropTypes.oneOf<Density>(densities),

  /**
   * Specify the desired size of components within this layout
   */
  size: PropTypes.oneOf<Size>(sizes),
};

export interface LayoutConstraintProps extends HTMLAttributes<HTMLElement> {
  /**
   * Specify a custom component or element to be rendered as the top-level
   * element in the component
   */
  as?: (() => ReactNode) | string | ElementType;

  /**
   * Provide child elements to be rendered inside of `LayoutConstraint`
   */
  children?: ReactNode;

  /**
   * Provide a custom class name to be used on the outermost element rendered by
   * the component
   */
  className?: string;

  /**
   * Specify the desired layout density constraints of this element's children
   */
  density?: {
    min?: Density | null;
    default?: Density | null;
    max?: Density | null;
  } | null;

  /**
   * Specify the desired layout size constraints of this element's children
   */
  size?: {
    min?: Size | null;
    default?: Size | null;
    max?: Size | null;
  } | null;
}
// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const LayoutConstraint = React.forwardRef<ReactNode, LayoutConstraintProps>(
  (
    { as: BaseComponent = 'div', children, className, density, size, ...rest },
    forwardRef
  ) => {
    const prefix = usePrefix();

    const classes = cx(
      className,
      Object.entries({
        size,
        density,
      }).map(([group, constraints]) => ({
        [`${prefix}--layout-constraint--${group}__default-${constraints?.default}`]:
          constraints?.default,
        [`${prefix}--layout-constraint--${group}__min-${constraints?.min}`]:
          constraints?.min,
        [`${prefix}--layout-constraint--${group}__max-${constraints?.max}`]:
          constraints?.max,
      }))
    );

    return (
      <BaseComponent {...rest} ref={forwardRef} className={classes}>
        {children}
      </BaseComponent>
    );
  }
);

LayoutConstraint.propTypes = {
  /**
   * Specify a custom component or element to be rendered as the top-level
   * element in the component
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /**
   * Provide child elements to be rendered inside of `LayoutConstraint`
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be used on the outermost element rendered by
   * the component
   */
  className: PropTypes.string,

  /**
   * Specify the desired layout density constraints of this element's children
   */
  density: PropTypes.shape({
    min: PropTypes.oneOf<Density>(densities),
    default: PropTypes.oneOf<Density>(densities),
    max: PropTypes.oneOf<Density>(densities),
  }),

  /**
   * Specify the desired layout size constraints of this element's children
   */
  size: PropTypes.shape({
    min: PropTypes.oneOf<Size>(sizes),
    default: PropTypes.oneOf<Size>(sizes),
    max: PropTypes.oneOf<Size>(sizes),
  }),
};

export { Layout, LayoutConstraint };



File: Layout/Layout.mdx


import { ArgTypes, Meta, Canvas} from '@storybook/addon-docs/blocks';
import * as LayoutStories from './Layout.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Layout

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Layout)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [LayoutConstraint](#layoutconstraint)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

The `Layout` component provides a way to set layout contexts for specific parts
of a web application. It uses Carbon's experimental `layout` sass module
(exported from `@carbon/styles`) to control layout-related settings like size
and density of all components within a layout context.

All children components that support it will react to the `size` and `density`
you pass in the `Layout` props. Note that not all components support the entire
spectrum of options available. In these cases, a component will typically cap
out at the maximum or minimum size it supports in order to still best suit the
layout context's intent.

If a component is outside a layout context or `props.size` / `props.density`
isn't set, it will fall back to its default rendering.

Components that are explicitly passed a `size` to are unaffected by the layout
context. Example:

```jsx
<div>
  {/* This text input is always lg */}
  <TextInput size="lg" />

  {/* This text input will render with its default size (md) */}
  <TextInput />

  <Layout size="sm">
    {/* This text input will still be lg */}
    <TextInput size="lg" />

    {/* This text input will be sm */}
    <TextInput />
  </Layout>
</div>
```

<Canvas
  of={LayoutStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(LayoutStories.Default),
    },
  ]}
/>

### LayoutConstraint

In order to apply specific constraints to children components that might differ
from their own preference, the `<LayoutConstraint>` utility component can be
used.

An example of this use case is the icon-only content switcher. It uses
`IconButton` under the hood which supports all sizes and defaults to `lg`. The
`ContentSwitcher` though only supports `sm`->`lg` and defaults to `md`.

```jsx
<div>
  <LayoutConstraint size={{ default: 'md', min: 'sm', max: 'lg' }}>
    {/* IconButton is now locked to the sizes sm->lg and defaults to md */}
    <IconButton … />
  </LayoutConstraint>
</div>
```

The constraints for a group (`size` and `density`) must be passed as an object
with any of these keys:

- `min`
- `default`
- `max`

Example: `size={{ min: 'sm', max: 'lg }}`<br /> Example:
`density={{ default: 'condensed' }}`

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Layout/Layout.mdx).



