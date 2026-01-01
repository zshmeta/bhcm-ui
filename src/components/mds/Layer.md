File: Layer/LayerContext.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { LayerLevel } from './LayerLevel';

export const LayerContext = React.createContext<LayerLevel>(1);



File: Layer/LayerLevel.ts


/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const levels = ['one', 'two', 'three'] as const;

export const LayerLevels = [0, 1, 2] as const;

export const MIN_LEVEL = LayerLevels[0];
export const MAX_LEVEL = LayerLevels[LayerLevels.length - 1];

export type LayerLevel = (typeof LayerLevels)[number];



File: Layer/Layer-story.scss


//
// Copyright IBM Corp. 2018, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@use '@carbon/styles/scss/theme';

.example-layer-test-component {
  padding: 1rem;
  background: theme.$layer;
  color: theme.$text-primary;
}

.example-layer-test-component-no-background {
  padding: 1rem;
  color: theme.$text-primary;
}



File: Layer/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-layer--default'
    },
    {
      label: 'Custom Level',
      variant: 'components-layer--custom-level'
    }
  ]}
/>



File: Layer/docs/use-layer-overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-layer--use-layer'
    }
  ]}
/>



File: Layer/index.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { LayerContext } from './LayerContext';
import { LayerLevel, MAX_LEVEL, MIN_LEVEL, levels } from './LayerLevel';
import { PolymorphicComponentPropWithRef } from '../../internal/PolymorphicProps';
import { clamp } from '../../internal/clamp';

/**
 * A custom hook that will return information about the current layer. A common
 * field to pull from this is the `level` for the layer that the component that
 * calls this hook is currently in
 */
export function useLayer() {
  const level = React.useContext(LayerContext);
  return {
    level,
  };
}

export interface LayerBaseProps {
  /**
   * Provide child elements to be rendered inside of `Theme`
   */
  children?: React.ReactNode;

  /**
   * Provide a custom class name to be used on the outermost element rendered by
   * the component
   */
  className?: string;

  /**
   * Specify the layer level and override any existing levels based on hierarchy
   */
  level?: LayerLevel;

  /**
   * Applies a css background-color set to $layer-background
   */
  withBackground?: boolean;
}

export type LayerProps<T extends React.ElementType> =
  PolymorphicComponentPropWithRef<T, LayerBaseProps>;

const Layer = React.forwardRef(
  <T extends React.ElementType = 'div'>(props: LayerProps<T>, ref) => {
    const {
      as,
      className: customClassName,
      children,
      level: overrideLevel,
      withBackground = false,
      ...rest
    } = props;

    const contextLevel = React.useContext(LayerContext);
    const level = overrideLevel ?? contextLevel;
    const prefix = usePrefix();
    const className = cx(
      `${prefix}--layer-${levels[level]}`,
      {
        [`${prefix}--layer__with-background`]: withBackground,
      },
      customClassName
    );
    // The level should be between MIN_LEVEL and MAX_LEVEL
    const value = clamp(level + 1, MIN_LEVEL, MAX_LEVEL);

    const BaseComponent = as || 'div';

    return (
      <LayerContext.Provider value={value}>
        <BaseComponent ref={ref} {...rest} className={className}>
          {children}
        </BaseComponent>
      </LayerContext.Provider>
    );
  }
);

Layer.displayName = 'Layer';

Layer.propTypes = {
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
   * Provide child elements to be rendered inside of `Theme`
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be used on the outermost element rendered by
   * the component
   */
  className: PropTypes.string,

  /**
   * Specify the layer level and override any existing levels based on hierarchy
   */
  level: PropTypes.oneOf([0, 1, 2]),

  /**
   * Applies a css background-color set to $layer-background
   */
  withBackground: PropTypes.bool,
};

export { Layer };



File: Layer/Layer.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as LayerStories from './Layer.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Layer

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Layer)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [With Background](#with-background)
- [Setting a custom level](#setting-a-custom-level)
- [Get the current layer](#get-the-current-layer)
- [Component API](#component-api)
  - [Layer as](#layer-as)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

The `Layer` component is used to render components on different layers. Each
layer has a specific set of token values associated with it. You can use these
tokens directly, or use contextual tokens from our styles package like `$layer`
or `$field`.

<Canvas
  of={LayerStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(LayerStories.Default),
    },
  ]}
/>

The `Layer` component accepts `children` as a prop. Each child of a `Layer`
component is rendered using the layer tokens at that layer. `Layer` components
can be nested indefinitely, but the token sets typically end after 3 layers.

```jsx
<ChildComponent />
<Layer>
  <ChildComponent />
  <Layer>
    <ChildComponent />
  </Layer>
</Layer>
```

## With Background

The `Layer` component updates layer tokens at each level and theme. When you add the
`withBackground` prop, it automatically sets a background color using the
`$layer-background` token. Without it, you can manually set the background with
`background-color: $layer-background`.

<Canvas
  of={LayerStories.withBackground}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(LayerStories.withBackground),
    },
  ]}
/>

## Setting a custom level

You can override the `level` of a `Layer` if you would like to change the
presentation of a layer in your application. This is particularly helpful if you
would like to reset the `Layer` level back to `0` or if you want to make sure a
part of a page always renders in a certain level.

To do this, you can use the `level` prop:

```jsx
<Layer>
  <ChildComponent />
  <Layer level={0}>
    <ChildComponent />
  </Layer>
</Layer>
```

<Canvas
  of={LayerStories.CustomLevel}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(LayerStories.CustomLevel),
    },
  ]}
/>

## Get the current layer

If you are building a component and would like to know what layer the component
resides within, you can use the `useLayer` hook.

This hook returns an object with the current `level` of the layer:

```jsx
function ExampleComponent() {
  const { level } = useLayer();

  // ...
}
```

If the structure of `Layer` components in your app change, the hook will
automatically update with the new `level`.

The `level` value can be one of: `0`, `1`, or `2` and will correspond to the
level of the current layer. This value mirrors the `level` prop on the `Layer`
component.

## Component API

<ArgTypes />

### Layer as

You can configure the base element rendered by `Layer` using the `as` prop. For
example, if you would like the `Layer` component to render as a `section` you
could write the following:

```jsx
<Layer as="section">
  <ChildComponent />
</Layer>
```

Similarly, you can provide any custom component to the `as` prop which the
`Layer` component will use.

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Layer/Layer.mdx).



File: Layer/Layer.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './Layer-story.scss';
import React from 'react';
import { Layer, useLayer } from '../Layer';
import mdx from './Layer.mdx';

export default {
  title: 'Components/Layer',
  component: Layer,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      page: mdx,
    },
  },
  args: {
    level: 0,
  },
};

export const Default = () => {
  function TestComponent() {
    return <div className="example-layer-test-component">Test component</div>;
  }

  return (
    <>
      <TestComponent />
      <Layer>
        <TestComponent />
        <Layer>
          <TestComponent />
        </Layer>
      </Layer>
    </>
  );
};

export const withBackground = () => {
  function TestComponent() {
    return (
      <div className="example-layer-test-component-no-background">
        Test component
      </div>
    );
  }

  return (
    <>
      <TestComponent />
      <Layer withBackground>
        <TestComponent />
        <Layer withBackground>
          <TestComponent />
        </Layer>
      </Layer>
    </>
  );
};

export const CustomLevel = (args) => {
  function TestComponent() {
    return <div className="example-layer-test-component">Test component</div>;
  }

  return (
    <Layer level={2} {...args}>
      <TestComponent />
    </Layer>
  );
};

CustomLevel.args = {
  level: 2,
};

export const UseLayer = () => {
  function ExampleComponent() {
    const { level } = useLayer();
    return (
      <div style={{ padding: '1rem', background: 'var(--cds-layer)' }}>
        The current layer level is: {level}
      </div>
    );
  }

  return (
    <>
      <ExampleComponent />
      <Layer>
        <ExampleComponent />
      </Layer>
    </>
  );
};

UseLayer.story = {
  name: 'useLayer',
};



