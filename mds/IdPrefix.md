File: IdPrefix/IdPrefix.mdx


import { Story, ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import { IdPrefix } from '../IdPrefix';
import * as IdPrefixStories from './IdPrefix.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';


<Meta isTemplate />

# Prefix

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/ClassPrefix)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

The `IdPrefix` component is used to change the prefix applied to the
automatically generated `id` attributes placed on certain DOM elements.

<Canvas of={IdPrefixStories.Default} />

This component is intended to be used in limited cases, primarily only if you
have id conflicts when using v10 and v11 packages at the same time during
migration.

In React, you can use `IdPrefix` anywhere in your component tree and specify the
prefix with the `prefix` prop. Most often it's used in the project root wrapping
the entire project:

```jsx
import { IdPrefix } from '@carbon/react';

export default function MyApp() {
  return (
    <IdPrefix prefix="custom">
      <Page />
    </IdPrefix>
  );
}
```

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/ClassPrefix/ClassPrefix.mdx).



File: IdPrefix/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-idprefix--default'
    }
  ]}
/>



File: IdPrefix/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { PropsWithChildren, ReactNode } from 'react';
import { IdPrefixContext } from '../../internal/useIdPrefix';

export type IdPrefixProps = {
  children?: ReactNode;

  /**
   * The value used to prefix the auto-generated id placed on some DOM elements
   */
  prefix?: string;
};

function IdPrefix({ children, prefix }: PropsWithChildren<IdPrefixProps>) {
  return (
    <IdPrefixContext.Provider value={prefix}>
      {children}
    </IdPrefixContext.Provider>
  );
}

IdPrefix.propTypes = {
  children: PropTypes.node,

  /**
   * The value used to prefix the auto-generated id placed on some DOM elements
   */
  prefix: PropTypes.string,
};

export { IdPrefix };



File: IdPrefix/IdPrefix.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { IdPrefix } from '.';
import { useIdPrefix } from '../../internal/useIdPrefix';
import mdx from './IdPrefix.mdx';

export default {
  title: 'Components/IdPrefix',
  component: IdPrefix,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  function ExampleComponent() {
    const idPrefix = useIdPrefix();
    return <p>The current id prefix is: {idPrefix}</p>;
  }

  return (
    <>
      <ExampleComponent />
      <IdPrefix prefix="custom">
        <ExampleComponent />
      </IdPrefix>
    </>
  );
};



