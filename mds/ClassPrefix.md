File: ClassPrefix/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-classprefix--default'
    }
  ]}
/>



File: ClassPrefix/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { PropsWithChildren } from 'react';
import { PrefixContext } from '../../internal/usePrefix';

export interface ClassPrefixProps {
  /**
   *   The value used to prefix the CSS selectors
   *   used by Carbon components.
   */
  prefix: string;
}

function ClassPrefix({
  children,
  prefix,
}: PropsWithChildren<ClassPrefixProps>) {
  return (
    <PrefixContext.Provider value={prefix}>{children}</PrefixContext.Provider>
  );
}

ClassPrefix.propTypes = {
  children: PropTypes.node,

  /**
   * The value used to prefix the CSS selectors used by Carbon components
   */
  prefix: PropTypes.string.isRequired,
};

export { ClassPrefix };



File: ClassPrefix/ClassPrefix.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ClassPrefix } from '../ClassPrefix';
import { usePrefix } from '../../internal/usePrefix';
import mdx from './ClassPrefix.mdx';

export default {
  title: 'Components/ClassPrefix',
  component: ClassPrefix,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  function ExampleComponent() {
    const prefix = usePrefix();
    return <p>The current prefix is: {prefix}</p>;
  }
  return (
    <>
      <ExampleComponent />
      <ClassPrefix prefix="custom">
        <ExampleComponent />
      </ClassPrefix>
    </>
  );
};



File: ClassPrefix/ClassPrefix.mdx


import { Story, ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import LinkTo from '@storybook/addon-links/react';
import { ClassPrefix } from '../ClassPrefix';
import * as ClassPrefixStories from './ClassPrefix.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# ClassPrefix

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/ClassPrefix)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

The `ClassPrefix` component is used to change the prefix in the classes used by
components in Carbon.

<Canvas of={ClassPrefixStories.Default} />

By default, the prefix used by components is `cds`. However, you can change this
prefix in Sass and coordinate that change to React using the `ClassPrefix`
component.

In Sass, you can customize this prefix by writing the following:

```scss
@use '@carbon/react' with (
  $prefix: 'custom'
);
```

Similarly, you can configure `scss/config` directly:

```scss
@use '@carbon/react/scss/config' with (
  $prefix: 'custom'
);
```

In React, you use `ClassPrefix` at the top-level of your project and specify the
prefix with the `prefix` prop:

```jsx
import { ClassPrefix } from '@carbon/react';

export default function MyApp() {
  return (
    <ClassPrefix prefix="custom">
      <Page />
    </ClassPrefix>
  );
}
```

To _get_ the prefix, use

<LinkTo title="Hooks/usePrefix" name="Overview">
  usePrefix
</LinkTo>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/ClassPrefix/ClassPrefix.mdx).



