File: AspectRatio/AspectRatio-story.scss


//
// Copyright IBM Corp. 2016, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//
.aspect-ratio-story .cds--aspect-ratio {
  padding: 1rem;
  background: #f7f1ff;
}



File: AspectRatio/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-aspectratio--default'
    }
  ]}
/>



File: AspectRatio/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { default as AspectRatio } from './AspectRatio';



File: AspectRatio/AspectRatio.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './AspectRatio-story.scss';

import React from 'react';
import { Grid, Column } from '../Grid';
import { AspectRatio } from './';
import mdx from './AspectRatio.mdx';

export default {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  decorators: [
    (Story) => (
      <div className="aspect-ratio-story">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return (
    <Grid {...args}>
      <Column sm={1} md={2} lg={4}>
        <AspectRatio {...args}>Content</AspectRatio>
      </Column>
      <Column sm={1} md={2} lg={4}>
        <AspectRatio {...args}>Content</AspectRatio>
      </Column>
      <Column sm={1} md={2} lg={4}>
        <AspectRatio {...args}>Content</AspectRatio>
      </Column>
      <Column sm={1} md={2} lg={4}>
        <AspectRatio {...args}>Content</AspectRatio>
      </Column>
    </Grid>
  );
};

Default.argTypes = {
  as: {
    control: false,
  },
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  ratio: {
    control: {
      type: 'select',
    },
    options: ['16x9', '9x16', '2x1', '1x2', '4x3', '3x4', '1x1'],
    table: {
      category: 'AspectRatio',
    },
  },
};



File: AspectRatio/AspectRatio.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { PropsWithChildren, HTMLElementType } from 'react';
import { usePrefix } from '../../internal/usePrefix';

export interface AspectRatioProps {
  /**
   * Provide a custom component or string to be rendered as
   * the outermost node of the component. This is useful if you want
   * to deviate from the default `div` tag, where you could specify
   * `section` or `article` instead.
   *
   * ```jsx
   * <AspectRatio as="article">My content</AspectRatio>
   * ```
   */
  as?: HTMLElementType;

  /**
   * Specify a class name for the outermost node
   * of the component.
   */
  className?: string;

  /**
   * Specify the ratio to be used by the aspect ratio
   * container. This will  determine what aspect ratio your content
   * will be displayed in.
   */
  ratio?:
    | '1x1'
    | '2x3'
    | '3x2'
    | '3x4'
    | '4x3'
    | '1x2'
    | '2x1'
    | '9x16'
    | '16x9';
}

/**
 * The AspectRatio component provides a `ratio` prop that will be used to
 * specify the aspect ratio that the children you provide will be displayed in.
 * This is often useful alongside our grid components, or for media assets like
 * images or videos.
 */
const AspectRatio = ({
  as: BaseComponent = 'div',
  className: containerClassName,
  children,
  ratio = '1x1',
  ...rest
}: PropsWithChildren<AspectRatioProps>) => {
  const prefix = usePrefix();
  const className = cx(
    containerClassName,
    `${prefix}--aspect-ratio`,
    `${prefix}--aspect-ratio--${ratio}`
  );
  return (
    <BaseComponent className={className} {...rest}>
      {children}
    </BaseComponent>
  );
};

AspectRatio.propTypes = {
  /**
   * Provide a custom component or string to be rendered as the outermost node
   * of the component. This is useful if you want to deviate from the default
   * `div` tag, where you could specify `section` or `article` instead.
   *
   * ```jsx
   * <AspectRatio as="article">My content</AspectRatio>
   * ```
   */
  as: PropTypes.elementType,

  /**
   * Specify the content that will be placed in the aspect ratio
   */
  children: PropTypes.node,

  /**
   * Specify a class name for the outermost node of the component
   */
  className: PropTypes.string,

  /**
   * Specify the ratio to be used by the aspect ratio container. This will
   * determine what aspect ratio your content will be displayed in.
   */
  ratio: PropTypes.oneOf([
    '16x9',
    '9x16',
    '2x1',
    '1x2',
    '4x3',
    '3x4',
    '3x2',
    '2x3',
    '1x1',
  ]),
};

export default AspectRatio;



File: AspectRatio/AspectRatio.mdx


import { Story, ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as AspectRatioStories from './AspectRatio.stories';
import { Grid, Row, Column } from '../Grid';
import { AspectRatio } from '.';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# AspectRatio

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/AspectRatio)
&nbsp;|&nbsp;
[Usage guidelines](https://carbondesignsystem.com/elements/2x-grid/overview/#aspect-ratio)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
  - [AspectRatio as](#aspectratio-as)
  - [AspectRatio className](#aspectratio-classname)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

The `AspectRatio` component supports rendering your content in a specific aspect
ratio through the `ratio` prop. This prop will specify the proportion between
the width and the height of your content. The width will be determined by
spanning 100% of the space available in your layout, and the height will be
determined by the ratio that you specified.

<Canvas
  of={AspectRatioStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(AspectRatioStories.Default),
    },
  ]}
/>

To see the full list of ratios supported by the `ratio` prop, check out the prop
table in the [Component API](#component-api) section below.

## Component API

<ArgTypes />

### AspectRatio as

You can use the `as` prop to support rendering the outermost node in the
component with a specific tag, or custom component, as opposed to the default
`<div>` that is used.

For example, to render an `article` you could use `as="article"`:

```jsx
<AspectRatio as="article" ratio="4x3">
  Your content
</AspectRatio>
```

You can also provide custom components, for example:

```jsx
function Article({ children, ...rest }) {
  return <article {...rest}>{children}</article>;
}

<AspectRatio as={Article} ratio="4x3">
  Your content
</AspectRatio>;
```

### AspectRatio className

The `className` prop passed into `AspectRatio` will be forwarded to the
outermost node in the component.

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/AspectRatio/AspectRatio.mdx).



