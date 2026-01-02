File: Icons/Icons.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './Icons.stories.scss';
import React from 'react';
import { Bee, Edit } from '../../../icons';
import { IconButton } from '../IconButton';
import mdx from './Icons.mdx';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Elements/Icons',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (Story, { args }) => {
      return (
        <section className="demo-icon-example">
          <h2>
            {args.size} {typeof args.size === 'number' && 'pixel'}{' '}
            {args.size === 16 && '(default)'}
            {typeof args.size === 'string' &&
              args.size.includes('rem') &&
              '(responsive)'}
          </h2>
          <Story />
        </section>
      );
    },
  ],
};

export const Default = (args) => {
  return <Bee {...args} />;
};

Default.args = {
  size: 16,
};

Default.argTypes = {
  size: {
    options: ['16', '20', '32'],
    control: { type: 'select' },
  },
};

export const WithRelativeSize = (args) => {
  return <Edit {...args} />;
};

WithRelativeSize.args = {
  size: '1rem',
};

WithRelativeSize.argTypes = { size: { control: 'text' } };



File: Icons/Icons.stories.scss


//
// Copyright IBM Corp. 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//
.demo-icon-example {
  display: flex;
  justify-content: space-between;
  margin: 2rem;
  inline-size: 15rem;
}

.demo-icon-example:nth-child(1) svg {
  min-inline-size: 1rem;
}

.demo-icon-example:nth-child(2) svg {
  min-inline-size: 1.25rem;
}

.demo-icon-example:nth-child(3) svg {
  min-inline-size: 2rem;
}



File: Icons/Icons.mdx


import { ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as IconsStories from './Icons.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Icons

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Icons)
&nbsp;|&nbsp;
[Usage guidelines](https://carbondesignsystem.com/elements/icons/usage/)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [Customizing icon size with `rem` units](#customizing-icon-size-with-rem-units)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={IconsStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(IconsStories.Default),
    },
  ]}
/>

This guide demonstrates how to make icons scale using `rem` units, without
requiring any changes to the component’s default configuration. In Carbon, icons
accept a `size` prop that can be a number or a string. Numbers are unitless and
interpreted as pixels. This approach is effective for most scenarios, but if
your goal is to improve accessibility or ensure that icons respond to changes in
the browser’s font-size, using a string with `rem` units offers greater
adaptability.

### Customizing icon size with `rem` units

To create scalable, responsive icons, you can pass a `rem` value to the `size`
prop:

```jsx
<Edit size="1rem" />
```

<Canvas
  of={IconsStories.WithRelativeSize}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(IconsStories.WithRelativeSize),
    },
  ]}
/>

Some components use a `renderIcon` prop to display icons internally.

In these cases, you can still pass a responsive size by using an inline function
that returns the icon:

```jsx
<MenuItem renderIcon={(props) => <Edit size="1rem" {...props} />} />
```

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Icons/Icons.mdx).



