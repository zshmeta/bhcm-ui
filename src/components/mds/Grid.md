File: Grid/Grid.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './Grid.stories.scss';

import React from 'react';
import { Grid, Column, ColumnHang, GridSettings } from '../Grid';
import mdx from './Grid.mdx';

export default {
  title: 'Elements/Grid',
  component: Grid,
  subcomponents: {
    Column,
  },
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (Story) => {
      return (
        <div className="sb-css-grid-container">
          <Story />
        </div>
      );
    },
  ],
};

export const Default = (args) => {
  return (
    <div className="sb-css-grid-container">
      <Grid {...args}>
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
      </Grid>
    </div>
  );
};

Default.args = {
  as: 'div',
  fullWidth: false,
  narrow: false,
  condensed: false,
};

Default.argTypes = {
  as: {
    control: {
      type: 'text',
    },
  },
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  fullWidth: {
    control: {
      type: 'boolean',
    },
  },
  narrow: {
    control: {
      type: 'boolean',
    },
  },
  condensed: {
    control: {
      type: 'boolean',
    },
  },
};

export const Narrow = () => {
  return (
    <div className="sb-css-grid-container">
      <Grid narrow>
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
      </Grid>
    </div>
  );
};

export const Condensed = () => {
  return (
    <div className="sb-css-grid-container">
      <Grid condensed>
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
      </Grid>
    </div>
  );
};

export const FullWidth = () => {
  return (
    <div className="sb-css-grid-container">
      <Grid fullWidth>
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
        <Column sm={4} />
      </Grid>
    </div>
  );
};

export const Responsive = () => {
  return (
    <div className="sb-css-grid-container">
      <Grid>
        <Column sm={2} md={4} lg={6}>
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 4 of 8</p>
          <p>Large: Span 6 of 16</p>
        </Column>
        <Column sm={2} md={2} lg={3}>
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 2 of 8</p>
          <p>Large: Span 3 of 16</p>
        </Column>
        <Column sm={0} md={2} lg={3}>
          <p>Small: Span 0 of 4</p>
          <p>Medium: Span 2 of 8</p>
          <p>Large: Span 3 of 16</p>
        </Column>
        <Column sm={0} md={0} lg={4}>
          <p>Small: Span 0 of 4</p>
          <p>Medium: Span 0 of 8</p>
          <p>Large: Span 4 of 16</p>
        </Column>
        <Column sm="25%" md="50%" lg="75%">
          <p>Small: Span 25%</p>
          <p>Medium: Span 50%</p>
          <p>Large: Span 75%</p>
        </Column>
      </Grid>
    </div>
  );
};

export const Subgrid = () => {
  return (
    <div className="sb-css-grid-container">
      <Grid>
        <Column sm={2} md={4} lg={3}>
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 4 of 8</p>
          <p>Large: Span 3 of 16</p>
        </Column>
        <Column sm={2} md={4} lg={10}>
          <p>Small: Span 2 of 4</p>
          <p>Medium: Span 4 of 8</p>
          <p>Large: Span 10 of 16</p>
          <Grid className="example">
            <Column sm={1} md={1} lg={2}>
              <p>sm={1}</p> <p>md={1}</p> <p>lg={2}</p>
            </Column>
            <Column sm={1} md={1} lg={2}>
              <p>sm={1}</p> <p>md={1}</p> <p>lg={2}</p>
            </Column>
            <Column sm={0} md={1} lg={1}>
              <p>sm={0}</p> <p>md={1}</p> <p>lg={1}</p>
            </Column>
            <Column sm={0} md={1} lg={1}>
              <p>sm={0}</p> <p>md={1}</p> <p>lg={1}</p>
            </Column>
            <Column sm={0} md={0} lg={1}>
              <p>sm={0}</p> <p>md={0}</p> <p>lg={1}</p>
            </Column>
            <Column sm={0} md={0} lg={1}>
              <p>sm={0}</p> <p>md={0}</p> <p>lg={1}</p>
            </Column>
            <Column sm={0} md={0} lg={1}>
              <p>sm={0}</p> <p>md={0}</p> <p>lg={1}</p>
            </Column>
            <Column sm={0} md={0} lg={1}>
              <p>sm={0}</p> <p>md={0}</p> <p>lg={1}</p>
            </Column>
          </Grid>
        </Column>
        <Column sm={0} md={0} lg={3}>
          <p>Small: Span 0 of 4</p>
          <p>Medium: Span 0 of 8</p>
          <p>Large: Span 3 of 16</p>
        </Column>
      </Grid>

      <h5>Wide</h5>
      <Grid>
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={8} lg={16}>
          <Grid>
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
          </Grid>
        </Column>
      </Grid>
      <h5>Narrow</h5>
      <Grid narrow>
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={8} lg={16}>
          <Grid narrow>
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
          </Grid>
        </Column>
      </Grid>
      <h5>Condensed</h5>
      <Grid condensed>
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={4} lg={4} />
        <Column sm={4} md={8} lg={16}>
          <Grid condensed>
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
            <Column sm={4} md={4} lg={4} />
          </Grid>
        </Column>
      </Grid>
    </div>
  );
};

export const MixedGutterModes = () => {
  return (
    <div className="sb-css-grid-container">
      <Grid>
        <Column span={8}>
          <Grid>
            <Column span={8}>
              <Grid narrow>
                <Column>
                  <ColumnHang>Text</ColumnHang>
                </Column>
                <Column>
                  <ColumnHang>Text</ColumnHang>
                </Column>
                <Column>
                  <ColumnHang>Text</ColumnHang>
                </Column>
                <Column>
                  <ColumnHang>Text</ColumnHang>
                </Column>
                <Column span={4}>
                  <Grid>
                    <Column>Text</Column>
                    <Column>Text</Column>
                    <Column span={2}>
                      <Grid condensed>
                        <Column>
                          <ColumnHang>Text</ColumnHang>
                        </Column>
                        <Column>
                          <ColumnHang>Text</ColumnHang>
                        </Column>
                      </Grid>
                    </Column>
                  </Grid>
                </Column>
              </Grid>
            </Column>
          </Grid>
        </Column>
      </Grid>
      <Grid narrow>
        <Column span={8}>
          <Grid>
            <Column span={4} />
            <Column span={4}>
              <Grid narrow>
                <Column>
                  <ColumnHang>Text</ColumnHang>
                </Column>
                <Column>
                  <ColumnHang>Text</ColumnHang>
                </Column>
                <Column>
                  <ColumnHang>Text</ColumnHang>
                </Column>
                <Column>
                  <ColumnHang>Text</ColumnHang>
                </Column>
              </Grid>
            </Column>
          </Grid>
        </Column>
      </Grid>
    </div>
  );
};

export const GridStartEnd = () => {
  return (
    <div className="sb-css-grid-container">
      <Grid>
        <Column
          sm={{ span: 1, start: 4 }}
          md={{ span: 2, start: 7 }}
          lg={{ span: 4, start: 13 }}>
          span, start
        </Column>
        <Column
          sm={{ span: 2, end: 5 }}
          md={{ span: 4, end: 9 }}
          lg={{ span: 8, end: 17 }}>
          span, end
        </Column>
        <Column
          sm={{ start: 1, end: 4 }}
          md={{ start: 3, end: 9 }}
          lg={{ start: 5, end: 17 }}>
          start, end
        </Column>
      </Grid>
    </div>
  );
};

export const Offset = () => {
  return (
    <div className="sb-css-grid-container">
      <Grid>
        <Column
          sm={{ span: 1, offset: 3 }}
          md={{ span: 2, offset: 6 }}
          lg={{ span: 4, offset: 12 }}
        />
        <Column
          sm={{ span: 2, offset: 2 }}
          md={{ span: 4, offset: 4 }}
          lg={{ span: 8, offset: 8 }}
        />
        <Column
          sm={{ span: 3, offset: 1 }}
          md={{ span: 6, offset: 2 }}
          lg={{ span: 12, offset: 4 }}
        />
        <Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }} />
        <Column
          sm={{ span: '25%', offset: 1 }}
          md={{ span: '50%', offset: 2 }}
          lg={{ span: '75%', offset: 4 }}
        />
      </Grid>
    </div>
  );
};



File: Grid/FlexGrid.mdx


import { Story, Canvas, ArgTypes, Meta } from '@storybook/addon-docs/blocks';
import * as FlexGridStories from './FlexGrid.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# FlexGrid

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Grid)
&nbsp;|&nbsp;
[Usage guidelines](https://carbondesignsystem.com/elements/2x-grid/overview/)

{/* prettier-ignore-start */}

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Gutter modes](#gutter-modes)
  - [Wide grid](#wide-grid)
  - [Narrow grid](#narrow-grid)
  - [Condensed grid](#condensed-grid)
  - [Mix-and-match](#mix-and-match)
- [Auto columns](#auto-columns)
- [Offset columns](#offset-columns)
- [Component API](#component-api)
  - [Using the `as` prop](#using-the-as-prop)
- [FAQ](#faq)
  - [How can I hide columns at a certain breakpoint?](#how-can-i-hide-columns-at-a-certain-breakpoint)
  - [Can I nest FlexGrid components?](#can-i-nest-flexgrid-components)
  - [Why are the FlexGrid styles not working?](#why-are-the-flexgrid-styles-not-working)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

{/* prettier-ignore-end */}

Carbon's grid components help developers use the
[2x Grid](https://carbondesignsystem.com/elements/2x-grid/overview/). The
project provides `FlexGrid`, `Row`, and `Column` components which can be used to
build a variety of layouts. You can import these components from
`@carbon/react`:

```js
import { FlexGrid, Row, Column } from '@carbon/react';
```

```scss
/* FlexGrid styles are not emitted by default, the feature flag must be turned on */

@use '@carbon/react' with (
  $use-flexbox-grid: true
);
```

<Canvas
  of={FlexGridStories.ResponsiveGrid}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FlexGridStories.ResponsiveGrid),
    },
  ]}
/>

## Overview

Every layout starts with the `FlexGrid` component. You can specify a `FlexGrid`
at the top-level of your project, or at different depths provided that it can
span 100% width of its container.

Next, you will use a combination of `Row` and `Column`. You can have multiple
`Row` components in a `FlexGrid`, and multiple `Column` components in a `Row`.
Each `Row` will contain all the `Column` components provided to it, as long as
they don't span more columns than the total number of columns in the grid.

To specify how many columns the `Column` component should span, you can use the
`sm`, `md`, `lg`, `xlg`, or `max` props. These props are shorthand versions of
the names given to each of the breakpoints defined by the
[2x Grid](https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints).
In the example below, we will use the `lg` prop for the large breakpoint and the
number `4` to specify that each `Column` component should span 4 columns at that
breakpoint.

```js
import { FlexGrid, Row, Column } from '@carbon/react';

function MyComponent() {
  return (
    <FlexGrid>
      <Row>
        <Column lg={4}>Span 4 of 12</Column>
        <Column lg={4}>Span 4 of 12</Column>
        <Column lg={4}>Span 4 of 12</Column>
        <Column lg={4}>Span 4 of 12</Column>
      </Row>
    <FlexGrid>
  );
}
```

You can pair up multiple breakpoint props to specify how many columns the
`Column` component should span at different break points. In the example below,
we will use the `sm`, `md`, and `lg` prop to specify how many columns the
`Column` components should span at the small, medium, and large breakpoints.

<Canvas
  of={FlexGridStories.ResponsiveGrid}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FlexGridStories.ResponsiveGrid),
    },
  ]}
/>

## Gutter modes

There are several
[gutter modes](https://carbondesignsystem.com/elements/2x-grid/overview/#gutters)
that you can use depending on the layout effect you're looking to achieve. By
default, `FlexGrid` uses the wide gutter mode with a 32px gutter. However, you
can use the `narrow` or `condensed` props to enable the narrow and condensed
grid modes, respectively.

The same way that you can pass in `narrow` or `condensed` to the `FlexGrid`
component, you can also pass in `narrow` or `condensed` to a `Row` component to
enable a certain gutter mode but only for a row. This can be useful when you
need to mix-and-match certain gutter modes to achieve a particular layout.

### Wide grid

<Canvas
  of={FlexGridStories.FullWidth}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FlexGridStories.FullWidth),
    },
  ]}
/>

### Narrow grid

<Canvas
  of={FlexGridStories.Narrow}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FlexGridStories.Narrow),
    },
  ]}
/>

### Condensed grid

<Canvas
  of={FlexGridStories.Condensed}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FlexGridStories.Condensed),
    },
  ]}
/>

### Mix-and-match

<Canvas
  of={FlexGridStories.MixedGutterModes}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FlexGridStories.MixedGutterModes),
    },
  ]}
/>

## Auto columns

In some situations, you may want your content to span a specific proportion of
the grid without having to calculate it across every breakpoint. A common
use-case for this is if you have a row of four cards and want each to span 25%
width each.

In these situations, you can make use of the auto columns feature of the
`Column` component. Auto columns is enabled when you do not provide any
breakpoint props, and it will automatically set each column to a percentage of
the total available width.

For example, if you have on `Column` component it would span 100%, two `Column`
components would span 50% each, four `Column` components would span 25% each,
and so on.

<Canvas
  of={FlexGridStories.AutoColumns}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FlexGridStories.AutoColumns),
    },
  ]}
/>

## Offset columns

You can offset your `Column` components by a specific amount of columns using
the object form for each breakpoint prop. This specific prop type allows you to
pass in an object to each breakpoint prop and this object has two keys, `span`
and `offset`, which allow you to specify the total numbers of columns the
`Column` component spans, and how many columns to offset it by.

You can specify either prop in this object form, and can mix-and-match across
breakpoints. For example, the following snippet will have the `Column` component
span two columns at the small breakpoint and then four columns at the medium
breakpoint. At the medium breakpoint, it will be offset by two columns.

```jsx
<Column sm={2} md={{ span: 4, offset: 2 }} />
```

<Canvas
  of={FlexGridStories.Offset}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FlexGridStories.Offset),
    },
  ]}
/>

## Component API

<ArgTypes />

### Using the `as` prop

By default, `FlexGrid`, `Row`, and `Column` will render as a `div`. However, you
can use the `as` prop to change this to another HTML element, or a custom
component from your project.

In the example below, we use the `as` prop on `Row` to change it from a `div` to
a `section`. Similarly, we use the `as` prop on `Column` to change it from a
`div` to an `article`.

```jsx
import { FlexGrid, Row, Column } from '@carbon/react';

function MyComponent() {
  return (
    <FlexGrid>
      <Row as="section">
        <Column as="article">Example content</Column>
        <Column as="article">Example content</Column>
        <Column as="article">Example content</Column>
        <Column as="article">Example content</Column>
      </Row>
    </FlexGrid>
  );
}
```

You can also provide a custom component to the `as` prop. This custom component
should accept all props passed to it, like a class name for the column.

```jsx
import { FlexGrid, Row, Column } from '@carbon/react';

function Article({ children, ...rest }) {
  return <article {...rest}>{children}</article>;
}

function CustomColumn({ children, ...rest }) {
  return <Column as={Article} {...rest}>{children}</Column:
}

function MyComponent() {
  return (
    <FlexGrid>
      <Row>
        <CustomColumn>Example content</Column>
        <CustomColumn>Example content</Column>
        <CustomColumn>Example content</Column>
        <CustomColumn>Example content</Column>
      </Row>
    <FlexGrid>
  );
}
```

## FAQ

### How can I hide columns at a certain breakpoint?

To hide a column at a specific breakpoint, you should specify 0 for the span of
the column at that particular breakpoint. For example, you can use the following
two forms for specifying column span and pass in 0 to either to hide the column
at the small breakpoint.

```jsx
<Column sm={0} />
<Column sm={{ span: 0 }} />
```

### Can I nest FlexGrid components?

`FlexGrid` does not support nested grids. For nested grids, use the `Grid`
(`CSSGrid`) component.

### Why are the FlexGrid styles not working?

FlexGrid styles are not emitted by default. You must opt in to emitting the
styling via one of the following options:

```scss
/* Option 1: Turn on the feature flag */

@use '@carbon/react' with (
  $use-flexbox-grid: true
);
```

```scss
/* Option 2: Use the flexgrid module */

@use '@carbon/react/scss/grid/flexbox';
```

```scss
/* Option 3: Use the grid module and call the flex-grid mixin */

@use '@carbon/react/scss/grid';
@include grid.flex-grid();
```

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Grid/Grid.mdx).



File: Grid/Row.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';

export interface RowBaseProps {
  /**
   * Pass in content that will be rendered within the `Row`
   */
  children?: React.ReactNode;

  /**
   * Specify a custom className to be applied to the `Row`
   */
  className?: string;

  /**
   * Specify a single row as condensed.Rows that are adjacent
   * and are condensed will have 2px of margin between them to match gutter.
   */
  condensed?: boolean;

  /**
   * Specify a single row as narrow. The container will hang
   * 16px into the gutter.
   */
  narrow?: boolean;
}

export type RowProps<T extends React.ElementType> = PolymorphicProps<
  T,
  RowBaseProps
>;

export interface RowComponent {
  <T extends React.ElementType>(
    props: RowProps<T>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    context?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  ): React.ReactElement<any, any> | null;
}

function Row<T extends React.ElementType>({
  as: BaseComponent = 'div' as T,
  condensed = false,
  narrow = false,
  className: containerClassName,
  children,
  ...rest
}: RowProps<T>) {
  const prefix = usePrefix();
  const className = cx(containerClassName, {
    [`${prefix}--row`]: true,
    [`${prefix}--row--condensed`]: condensed,
    [`${prefix}--row--narrow`]: narrow,
  });
  // TypeScript type validation reports conflicts on different instances of keyof JSX.IntrinsicElements
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  const BaseComponentAsAny: any = BaseComponent;
  return (
    <BaseComponentAsAny className={className} {...rest}>
      {children}
    </BaseComponentAsAny>
  );
}

Row.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Pass in content that will be rendered within the `Row`
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the `Row`
   */
  className: PropTypes.string,

  /**
   * Specify a single row as condensed.Rows that are adjacent
   * and are condensed will have 2px of margin between them to match gutter.
   */
  condensed: PropTypes.bool,

  /**
   * Specify a single row as narrow. The container will hang
   * 16px into the gutter.
   */
  narrow: PropTypes.bool,
};

export default Row as RowComponent;



File: Grid/GridContext.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';

export type GridMode = 'flexbox' | 'css-grid';

export interface GridSettingContext {
  /**
   * The gutter mode for the GridContext
   */
  mode: GridMode;

  /**
   * Specifies whether subgrid should be enabled
   */
  subgrid?: boolean;
}

/**
 * Provides a grid context for communication the grid "mode" (flexbox or
 * css-grid) along with subgrid information.
 */
const GridSettingsContext = React.createContext<GridSettingContext>({
  mode: 'flexbox',
  subgrid: false,
});

export interface GridSettingsProps {
  /**
   * Pass in components which will be rendered within the `GridSettings`
   * component
   */
  children?: React.ReactNode;

  /**
   * Specify the gutter mode for the GridContext
   */
  mode: GridMode;

  /**
   * Specify whether subgrid should be enabled
   */
  subgrid?: boolean;
}

export const GridSettings: React.FC<GridSettingsProps> = ({
  children,
  mode,
  subgrid = false,
}) => {
  const value = React.useMemo(() => {
    return {
      mode,
      subgrid,
    };
  }, [mode, subgrid]);
  return (
    <GridSettingsContext.Provider value={value}>
      {children}
    </GridSettingsContext.Provider>
  );
};

const gridModes: GridMode[] = ['flexbox', 'css-grid'];

GridSettings.propTypes = {
  /**
   * Pass in components which will be rendered within the `GridSettings`
   * component
   */
  children: PropTypes.node,

  /**
   * Specify the gutter mode for the GridContext
   */
  mode: PropTypes.oneOf(gridModes).isRequired,

  /**
   * Specify whether subgrid should be enabled
   */
  subgrid: PropTypes.bool,
};

/**
 * Helper function for accessing the GridContext value
 */
export const useGridSettings = () => {
  return React.useContext(GridSettingsContext);
};



File: Grid/FlexGrid.stories.scss


//
// Copyright IBM Corp. 2022, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@use '@carbon/styles/scss/colors' as *;

// base of project work area
#root > #templates > div:first-child {
  inline-size: 100%;
}

// grid styles
.cds--grid .outside {
  block-size: 100%;
  min-block-size: 80px;
}

.cds--grid .inside {
  block-size: 100%;
  min-block-size: 80px;
}

// hack to enable zoom feature to trigger
.cds--grid--full-width {
  max-inline-size: 100%;
}

.default .cds--col code {
  display: flex;
  justify-content: center;
}

// template hard-coded styles
#templates .inside {
  background-color: $blue-10;
}

#templates .cds--grid [class*='col'] {
  background-color: $blue-20;
  outline: 1px dashed $blue-40;
}

#templates .cds--grid--condensed,
#templates .cds--row--condensed {
  background-color: $warm-gray-100;
  color: $gray-10;
}

#templates .cds--grid--condensed [class*='col'],
#templates .cds--row--condensed [class*='col'] {
  background: none;
  outline: none;
}

#templates .cds--grid--condensed .outside,
#templates .cds--row--condensed .outside {
  background-color: $gray-80;
  outline: none;
}

#templates .cds--grid--condensed .inside,
#templates .cds--row--condensed .inside {
  background: none;
}

#templates .cds--grid--narrow .inside,
#templates .cds--row--narrow .inside {
  background-color: $teal-10;
}

#templates .cds--grid--narrow [class*='col'],
#templates .cds--row--narrow [class*='col'] {
  background-color: $teal-20;
  outline: 1px dashed $teal-40;
}

// css grid
#templates > .cds--css-grid {
  border: 1px dashed black;
}

#templates .cds--css-grid .cds--subgrid [class*='col'] {
  background-color: rgba(#ffe056, 0.25);
  outline: 1px solid #ffe056;
}

#templates .cds--css-grid [class*='col'] {
  background-color: #edf4ff;
  min-block-size: 80px;
  outline: 1px solid #a6c8ff;
}



File: Grid/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type GridProps } from './GridTypes';
export { type GridProps };
export { FlexGrid } from './FlexGrid';
export { Grid } from './Grid';
export { default as Row } from './Row';
export { default as Column, type ColumnProps } from './Column';
export { ColumnHang } from './ColumnHang';
export { GridSettings } from './GridContext';



File: Grid/GridTypes.ts


/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PolymorphicComponentPropWithRef } from '../../internal/PolymorphicProps';
import PropTypes from 'prop-types';

export interface GridBaseProps {
  /**
   * Specify grid alignment. Default is center
   */
  align?: 'start' | 'center' | 'end';

  /**
   * Pass in content that will be rendered within the `Grid`
   */
  children?: React.ReactNode;

  /**
   * Specify a custom className to be applied to the `Grid`
   */
  className?: string;

  /**
   * Collapse the gutter to 1px. Useful for fluid layouts.
   * Rows have 1px of margin between them to match gutter.
   */
  condensed?: boolean;

  /**
   * Remove the default max width that the grid has set
   */
  fullWidth?: boolean;

  /**
   * Container hangs 16px into the gutter. Useful for
   * typographic alignment with and without containers.
   */
  narrow?: boolean;
}

export type GridProps<T extends React.ElementType> =
  PolymorphicComponentPropWithRef<T, GridBaseProps>;

export interface GridComponent {
  <T extends React.ElementType = 'div'>(
    props: GridProps<T>
  ): React.ReactElement | null;
  displayName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  propTypes?: PropTypes.WeakValidationMap<GridProps<any>>;
}



File: Grid/ColumnHang.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';

interface ColumnHangBaseProps {
  /**
   * Pass in content that will be rendered within the `ColumnHang`
   */
  children?: React.ReactNode;

  /**
   * Specify a custom className to be applied to the `ColumnHang`
   */
  className?: string;
}

export type ColumnHangProps<T extends React.ElementType> = PolymorphicProps<
  T,
  ColumnHangBaseProps
>;

export interface ColumnHangComponent {
  <T extends React.ElementType>(
    props: ColumnHangProps<T>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    context?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  ): React.ReactElement<any, any> | null;
}

/**
 * Helper component for rendering content that hangs on the column. Useful when
 * trying to align content across different gutter modes
 */
function ColumnHang<T extends React.ElementType>({
  as: BaseComponent = 'div' as T,
  className: customClassName,
  children,
  ...rest
}: ColumnHangProps<T>) {
  const prefix = usePrefix();
  const className = cx(customClassName, `${prefix}--grid-column-hang`);
  // cast as any to let TypeScript allow passing in attributes to base component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  const BaseComponentAsAny: any = BaseComponent;
  return (
    <BaseComponentAsAny {...rest} className={className}>
      {children}
    </BaseComponentAsAny>
  );
}

ColumnHang.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Pass in content that will be rendered within the `Grid`
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the `Grid`
   */
  className: PropTypes.string,
};

const ColumnHangComponent = ColumnHang as ColumnHangComponent;

export { ColumnHangComponent as ColumnHang };



File: Grid/CSSGrid.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { GridSettings, useGridSettings } from './GridContext';
import { GridComponent, GridBaseProps } from './GridTypes';
import { PolymorphicComponentPropWithRef } from '../../internal/PolymorphicProps';

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const CSSGrid = React.forwardRef<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  any,
  GridBaseProps & {
    as?: React.ElementType;
  } & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      align,
      as,
      children,
      className: customClassName,
      condensed = false,
      fullWidth = false,
      narrow = false,
      ...rest
    },
    ref?
  ) => {
    const prefix = usePrefix();
    const { subgrid } = useGridSettings();
    let mode: SubgridMode = 'wide';
    if (narrow) {
      mode = 'narrow';
    } else if (condensed) {
      mode = 'condensed';
    }

    if (subgrid) {
      return (
        <GridSettings mode="css-grid" subgrid>
          <Subgrid
            ref={ref}
            as={as}
            className={customClassName}
            mode={mode}
            {...rest}>
            {children}
          </Subgrid>
        </GridSettings>
      );
    }

    const className = cx(customClassName, {
      [`${prefix}--css-grid`]: true,
      [`${prefix}--css-grid--condensed`]: mode === 'condensed',
      [`${prefix}--css-grid--narrow`]: mode === 'narrow',
      [`${prefix}--css-grid--full-width`]: fullWidth,
      [`${prefix}--css-grid--start`]: align === 'start',
      [`${prefix}--css-grid--end`]: align === 'end',
    });

    // cast as any to let TypeScript allow passing in attributes to base component
    const BaseComponent = as || 'div';
    return (
      <GridSettings mode="css-grid" subgrid>
        <BaseComponent className={className} ref={ref} {...rest}>
          {children}
        </BaseComponent>
      </GridSettings>
    );
  }
) as GridComponent;

CSSGrid.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Specify grid alignment. Default is center
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * Pass in content that will be rendered within the `Grid`
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the `Grid`
   */
  className: PropTypes.string,

  /**
   * Collapse the gutter to 1px. Useful for fluid layouts.
   * Rows have 1px of margin between them to match gutter.
   */
  condensed: PropTypes.bool,

  /**
   * Remove the default max width that the grid has set
   */
  fullWidth: PropTypes.bool,

  /**
   * Container hangs 16px into the gutter. Useful for
   * typographic alignment with and without containers.
   */
  narrow: PropTypes.bool,
};

type SubgridMode = 'wide' | 'narrow' | 'condensed';

interface SubgridBaseProps {
  /**
   * Pass in content that will be rendered within the `Subgrid`
   */
  children?: React.ReactNode;

  /**
   * Specify a custom className to be applied to the `Subgrid`
   */
  className?: string;

  /**
   * Specify the gutter mode for the subgrid
   */
  mode?: SubgridMode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
type SubgridProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentPropWithRef<T, SubgridBaseProps>;
// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const Subgrid = React.forwardRef<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  any,
  SubgridBaseProps & {
    as?: React.ElementType;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ as, className: customClassName, children, mode, ...rest }, ref) => {
  const prefix = usePrefix();
  const className = cx(customClassName, {
    [`${prefix}--subgrid`]: true,
    [`${prefix}--subgrid--condensed`]: mode === 'condensed',
    [`${prefix}--subgrid--narrow`]: mode === 'narrow',
    [`${prefix}--subgrid--wide`]: mode === 'wide',
  });
  const BaseComponent = as || 'div';
  return (
    <BaseComponent {...rest} ref={ref} className={className}>
      {children}
    </BaseComponent>
  );
});

Subgrid.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Pass in content that will be rendered within the `Subgrid`
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the `Subgrid`
   */
  className: PropTypes.string,

  /**
   * Specify the gutter mode for the subgrid
   */
  mode: PropTypes.oneOf(['wide', 'narrow', 'condensed'] as SubgridMode[]),
};

const CSSGridComponent: GridComponent = CSSGrid;

export { CSSGridComponent as CSSGrid };



File: Grid/migrate-to-8.x.md


# Migrate grid to 8.x

To get a sense of what's changed in the grid implementation, read through the
[`@carbon/grid` migration documentation](docs/migration/11.x-grid.md). The most
notable item to mention is that the implementation uses CSS Grid instead of
flexbox.

## `<Grid>`

- The prop interface for `<Grid>` is primarily the same.
- When a `<Grid>` is a child of another `<Grid>`, the child will always be
  automatically defined as a subgrid. More info can be found in the subgrid
  story in the `@carbon/react` storybook.
- The grid now defaults to 16 columns instead of 12.

## `<Row>`

- This has been removed. Columns can now be direct children of a `<Grid>`.

## `<Column>`

- The prop interface for `<Grid>` is primarily the same.
- `<Column>` components without a `sm`, `md`, `lg`, etc. prop no longer
  automatically expand to fill the remaining space of the grid. `<Column>` by
  default spans only 1 column on the grid.



File: Grid/FlexGrid.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { GridSettings } from './GridContext';
import { GridComponent, GridBaseProps } from './GridTypes';

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const FlexGrid = React.forwardRef<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  any,
  GridBaseProps & {
    as?: React.ElementType;
  } & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      as,
      condensed = false,
      narrow = false,
      fullWidth = false,
      className: containerClassName,
      children,
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();
    const className = cx(containerClassName, {
      [`${prefix}--grid`]: true,
      [`${prefix}--grid--condensed`]: condensed,
      [`${prefix}--grid--narrow`]: narrow,
      [`${prefix}--grid--full-width`]: fullWidth,
    });
    // cast as any to let TypeScript allow passing in attributes to base component
    const BaseComponent = as || 'div';
    return (
      <GridSettings mode="flexbox" subgrid={false}>
        <BaseComponent className={className} ref={ref} {...rest}>
          {children}
        </BaseComponent>
      </GridSettings>
    );
  }
);

FlexGrid.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Pass in content that will be rendered within the `FlexGrid`
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the `FlexGrid`
   */
  className: PropTypes.string,

  /**
   * Collapse the gutter to 1px. Useful for fluid layouts.
   * Rows have 1px of margin between them to match gutter.
   */
  condensed: PropTypes.bool,

  /**
   * Remove the default max width that the grid has set
   */
  fullWidth: PropTypes.bool,

  /**
   * Container hangs 16px into the gutter. Useful for
   * typographic alignment with and without containers.
   */
  narrow: PropTypes.bool,
};

const FlexGridComponent = FlexGrid as GridComponent;

export { FlexGridComponent as FlexGrid };



File: Grid/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  tall
  wide
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'elements-grid--default'
    },
    {
      label: 'Condensed',
      variant: 'elements-grid--condensed'
    },
    {
      label: 'Full Width',
      variant: 'elements-grid--full-width'
    },
    {
      label: 'Grid Start End',
      variant: 'elements-grid--grid-start-end'
    },
    {
      label: 'Mixed Gutter Modes',
      variant: 'elements-grid--mixed-gutter-modes'
    },
    {
      label: 'Narrow',
      variant: 'elements-grid--narrow'
    },
    {
      label: 'Offset',
      variant: 'elements-grid--offset'
    },
    {
      label: 'Responsive',
      variant: 'elements-grid--responsive'
    },
    {
      label: 'Subgrid',
      variant: 'elements-grid--subgrid'
    }
  ]}
/>



File: Grid/Grid.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { useFeatureFlag } from '../FeatureFlags';
import { CSSGrid } from './CSSGrid';
import { FlexGrid } from './FlexGrid';
import { GridComponent, GridProps } from './GridTypes';

function Grid<T extends React.ElementType>(props: GridProps<T>) {
  const enableCSSGrid = useFeatureFlag('enable-css-grid');
  if (enableCSSGrid) {
    return <CSSGrid {...props} />;
  }
  return <FlexGrid {...props} />;
}

Grid.propTypes = {
  /**
   * Specify grid alignment. Default is center
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Pass in content that will be rendered within the `Grid`
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the `Grid`
   */
  className: PropTypes.string,

  /**
   * Collapse the gutter to 1px. Useful for fluid layouts.
   * Rows have 1px of margin between them to match gutter.
   */
  condensed: PropTypes.bool,

  /**
   * Remove the default max width that the grid has set
   */
  fullWidth: PropTypes.bool,

  /**
   * Container hangs 16px into the gutter. Useful for
   * typographic alignment with and without containers.
   */
  narrow: PropTypes.bool,
};

const GridAsGridComponent = Grid as GridComponent;

export { GridAsGridComponent as Grid };



File: Grid/FlexGrid.stories.js


/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './FlexGrid.stories.scss';
import React from 'react';
import { FlexGrid, Row, Column } from './';
import mdx from './FlexGrid.mdx';

export default {
  title: 'Elements/FlexGrid',
  component: FlexGrid,
  subcomponents: {
    Row,
    Column,
  },
  decorators: [(storyFn) => <div id="templates">{storyFn()}</div>],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const AutoColumns = () => {
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <div id="templates">
      <FlexGrid>
        <Row>
          <Column>
            <DemoContent>Span 25%</DemoContent>
          </Column>
          <Column>
            <DemoContent>Span 25%</DemoContent>
          </Column>
          <Column>
            <DemoContent>Span 25%</DemoContent>
          </Column>
          <Column>
            <DemoContent>Span 25%</DemoContent>
          </Column>
        </Row>
      </FlexGrid>
    </div>
  );
};

export const ResponsiveGrid = () => {
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <div id="templates">
      <FlexGrid>
        <Row>
          <Column sm={2} md={4} lg={6}>
            <DemoContent>
              <p>Small: Span 2 of 4</p>
              <p>Medium: Span 4 of 8</p>
              <p>Large: Span 6 of 16</p>
            </DemoContent>
          </Column>
          <Column sm={2} md={2} lg={3}>
            <DemoContent>
              <p>Small: Span 2 of 4</p>
              <p>Medium: Span 2 of 8</p>
              <p>Large: Span 3 of 16</p>
            </DemoContent>
          </Column>
          <Column sm={0} md={2} lg={3}>
            <DemoContent>
              <p>Small: Span 0 of 4</p>
              <p>Medium: Span 2 of 8</p>
              <p>Large: Span 3 of 16</p>
            </DemoContent>
          </Column>
        </Row>
      </FlexGrid>
    </div>
  );
};

export const Offset = () => {
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <div id="templates">
      <FlexGrid>
        <Row>
          <Column sm={{ span: 1, offset: 3 }}>
            <DemoContent>Small: offset 3</DemoContent>
          </Column>
          <Column sm={{ span: 2, offset: 2 }}>
            <DemoContent>Small: offset 2</DemoContent>
          </Column>
          <Column sm={{ span: 3, offset: 1 }}>
            <DemoContent>Small: offset 1</DemoContent>
          </Column>
          <Column sm={{ span: 4, offset: 0 }}>
            <DemoContent>Small: offset 0</DemoContent>
          </Column>
        </Row>
      </FlexGrid>
    </div>
  );
};

export const Condensed = () => {
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <div id="templates">
      <FlexGrid condensed>
        <Row>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
        </Row>
      </FlexGrid>
    </div>
  );
};

export const CondensedColumns = () => {
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <div id="templates">
      <FlexGrid>
        <Row>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
        </Row>
        <Row condensed>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
        </Row>
        <Row>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
        </Row>
      </FlexGrid>
    </div>
  );
};

export const Narrow = () => {
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <div id="templates">
      <FlexGrid narrow>
        <Row>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
        </Row>
      </FlexGrid>
    </div>
  );
};

export const NarrowColumns = () => {
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <div id="templates">
      <FlexGrid>
        <Row>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
        </Row>
        <Row narrow>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
        </Row>
        <Row>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
        </Row>
      </FlexGrid>
    </div>
  );
};

export const FullWidth = () => {
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <div id="templates">
      <FlexGrid fullWidth>
        <Row>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
        </Row>
      </FlexGrid>
    </div>
  );
};

export const MixedGutterModes = () => {
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <div id="templates">
      <FlexGrid>
        <Row>
          <Column>
            <DemoContent>Wide</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
        </Row>
        <Row narrow>
          <Column>
            <DemoContent>Narrow</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
        </Row>
        <Row condensed>
          <Column>
            <DemoContent>Condensed</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
        </Row>
      </FlexGrid>
    </div>
  );
};

export const Default = (args) => {
  function DemoContent({ children }) {
    return (
      <div className="outside">
        <div className="inside">{children}</div>
      </div>
    );
  }
  return (
    <div id="templates">
      <FlexGrid {...args}>
        <Row>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
          <Column>
            <DemoContent>1/4</DemoContent>
          </Column>
        </Row>
      </FlexGrid>
    </div>
  );
};

Default.args = {
  as: 'div',
  fullWidth: false,
  narrow: false,
  condensed: false,
};

Default.argTypes = {
  as: {
    control: {
      type: 'text',
    },
  },
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  fullWidth: {
    control: {
      type: 'boolean',
    },
  },
  narrow: {
    control: {
      type: 'boolean',
    },
  },
  condensed: {
    control: {
      type: 'boolean',
    },
  },
};



File: Grid/Grid.stories.scss


//
// Copyright IBM Corp. 2018, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@use '@carbon/styles/scss/colors' as *;
@use '@carbon/styles/scss/type' as *;

.sb-css-grid-container {
  // Gutter modes
  .cds--css-grid {
    background-color: $blue-20;
    outline: 1px dashed $blue-40;
  }

  .cds--css-grid p {
    @include type-style('code-02');
  }

  .cds--css-grid p:first-of-type {
    margin-block-start: 0;
  }

  // Narrow
  .cds--css-grid.cds--css-grid--narrow {
    background-color: #d6f9f9;
    outline: 1px dashed $green-40;
  }

  // Condensed
  .cds--css-grid.cds--css-grid--condensed {
    background-color: $purple-10;
    outline: 1px dashed $purple-40;
  }

  .cds--subgrid {
    position: relative;
    background: #eef4ff;
    outline: 1px solid black;
    padding-block: 2rem;
  }

  .cds--css-grid,
  .cds--subgrid--wide {
    --grid-mode-color: #97c1ff;
  }

  .cds--css-grid--narrow,
  .cds--subgrid--narrow {
    --grid-mode-color: #20d5d2;

    background: $green-10;
  }

  .cds--css-grid--condensed,
  .cds--subgrid--condensed {
    --grid-mode-color: #bb8eff;

    background: $purple-10;
  }

  .cds--subgrid--narrow {
    background: #d6f9f9;
  }

  .cds--subgrid--condensed {
    background: #f7f2ff;
  }

  .cds--subgrid::before {
    @include type-style('code-01');

    position: absolute;
    display: block;
    padding: 0.125rem 0.25rem;
    background: var(--grid-mode-color, #97c1ff);
    color: $black;
    content: 'subgrid';
    inset-block-start: 0;
    inset-inline-start: 0;
  }

  // Column
  .cds--css-grid-column {
    --border-color: #97c1ff;

    background: $white;
    box-shadow: 0 0 0 1px var(--border-color);

    min-block-size: 80px;
  }

  .cds--css-grid--narrow .cds--css-grid-column,
  .cds--subgrid--narrow .cds--css-grid-column {
    --border-color: #20d5d2;
  }

  .cds--css-grid--condensed .cds--css-grid-column,
  .cds--subgrid--condensed .cds--css-grid-column {
    --border-color: #bb8eff;
  }
}



File: Grid/Grid.mdx


import { Story, Canvas, ArgTypes, Meta } from '@storybook/addon-docs/blocks';
import * as GridStories from './Grid.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Grid

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Grid)
&nbsp;|&nbsp;
[Usage guidelines](https://carbondesignsystem.com/elements/2x-grid/overview/)

{/* prettier-ignore-start */}

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [Debugging](#debugging)
- [Gutter modes](#gutter-modes)
  - [Full width grid](#full-width-grid)
  - [Condensed grid](#condensed-grid)
  - [Narrow grid](#narrow-grid)
- [Subgrid](#subgrid)
- [Mixed gutter modes](#mixed-gutter-modes)
- [Auto columns](#auto-columns)
- [Offset columns](#offset-columns)
- [Component API](#component-api)
  - [Using the `as` prop](#using-the-as-prop)
- [FAQ](#faq)
  - [How can I hide columns at a certain breakpoint?](#how-can-i-hide-columns-at-a-certain-breakpoint)
  - [Can I nest grid components?](#can-i-nest-grid-components)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

{/* prettier-ignore-end */}

Carbon's grid components help developers use the
[2x Grid](https://carbondesignsystem.com/elements/2x-grid/overview/). The
project provides `Grid` and `Column` components which can be used to build a
variety of layouts. You can import these components from `@carbon/react`:

```js
import { Grid, Column } from '@carbon/react';
```

<Canvas
  of={GridStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(GridStories.Default),
    },
  ]}
/>

## Overview

Every layout starts with the `Grid` component. You can specify a `Grid` at the
top-level of your project, or at different depths provided that it can span 100%
width of its container.

Next, you will use a combination of `Column` and `Grid`. You can have multiple
`Column` components in a `Grid`, and nest `Grid` components in a `Column`. Each
`Grid` will contain all the `Column` components provided to it, as long as they
don't span more columns than the total number of columns in the grid.

To specify how many columns the `Column` component should span, you can use the
`sm`, `md`, `lg`, `xlg`, or `max` props. These props are shorthand versions of
the names given to each of the breakpoints defined by the
[2x Grid](https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints).
In the example below, we will use the `lg` prop for the large breakpoint and the
number `4` to specify that each `Column` component should span 4 columns at that
breakpoint.

```js
import { Grid, Column } from '@carbon/react';

function MyComponent() {
  return (
    <Grid>
      <Column lg={4}>Span 4 of 16</Column>
      <Column lg={4}>Span 4 of 16</Column>
      <Column lg={4}>Span 4 of 16</Column>
      <Column lg={4}>Span 4 of 16</Column>
    </Grid>
  );
}
```

_Note: by default, `@carbon/styles` ships with a 16 column grid._

You can pair up multiple breakpoint props to specify how many columns the
`Column` component should span at different break points. In the example below,
we will use the `sm`, `md`, and `lg` prop to specify how many columns the
`Column` components should span at the small, medium, and large breakpoints.

<Canvas
  of={GridStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(GridStories.Default),
    },
  ]}
/>

### Debugging

It is incredibly helpful when debugging CSS Grid to use the browser developer
tools' css gutter mode to view the grid definition. Depending on the browser,
these typically provide a toggle for overlaying a schematic showing the column
and grid gap definition. With this overlay, it's much easier to visually
understand if gutter modes are configured and set properly on the grid.

Documentation on these features is available for
[Chrome](https://developer.chrome.com/docs/devtools/css/grid/),
[Firefox](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Examine_grid_layouts),
and
[Safari](https://webkit.org/blog/11588/introducing-css-grid-inspector/#:~:text=If%20you're%20using%20Safari,%23css%2Dgrid%2Ddemo%20.),
among others.

## Gutter modes

There are several
[gutter modes](https://carbondesignsystem.com/elements/2x-grid/overview/#gutters)
that you can use depending on the layout effect you're looking to achieve. By
default, `Grid` uses the wide gutter mode with a 32px gutter. However, you can
use the `condensed` prop to enable the condensed gutter mode with a 1px gutter
or the `narrow` prop to enable the narrow grid with a 16px gutter.

### Full width grid

<Canvas
  of={GridStories.FullWidth}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(GridStories.FullWidth),
    },
  ]}
/>

### Condensed grid

<Canvas
  of={GridStories.Condensed}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(GridStories.Condensed),
    },
  ]}
/>

### Narrow grid

<Canvas
  of={GridStories.Narrow}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(GridStories.Narrow),
    },
  ]}
/>

## Subgrid

`Grid` components can be nested within one another to achieve more advanced
layout configurations. When a `Grid` is a child of another `Grid`, the child
will always be automatically defined as a subgrid. Subgrids should always be
contained within a `Column` to ensure that the column amount/definition is
properly configured for the subgrid to inherit. Additionally, wrapping subgrids
in a `Column` enables you to define responsive parameters for the column (`sm`,
`md`, etc) that the subgrid will inherit and be bound to.

<Canvas
  of={GridStories.Subgrid}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(GridStories.Subgrid),
    },
  ]}
/>

For more specialized grid implementations you may want to disable the automatic
subgrid definition. To achieve this you can wrap your nested `Grid` in
`GridSettings` and set `subgrid={false}`.

```jsx
<Grid>
  <Column>
    <GridSettings subgrid={false}>
      <Grid>
        <Column />
      </Grid>
    </GridSettings>
  </Column>
</Grid>
```

## Mixed gutter modes

The same way that you can pass in `condensed` to a root `Grid`, you can also
pass in `condensed` to a nested `Grid` (subgrid) to enable a certain gutter mode
for only that subgrid. This can be useful when you need to mix-and-match certain
gutter modes to achieve a particular layout.

<Canvas
  of={GridStories.MixedGutterModes}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(GridStories.MixedGutterModes),
    },
  ]}
/>

## Auto columns

Each column by default spans one single column as defined by the parent grid's
parameters.

The default track sizing functions of the grid columns are defined by the parent
grid's `grid-template-columns` property. This declares that there should be
`--cds-grid-columns` number of columns, and each column should by default span a
`minmax()` of `0` columns minimum, or a maximum of `--cds-grid-column-size`
(`1fr`).

The values of these custom properties can be changed to modify the default
behavior of columns.

<Canvas
  of={GridStories.Responsive}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(GridStories.Responsive),
    },
  ]}
/>

## Offset columns

You can offset your `Column` components by a specific amount of columns using
the object form for each breakpoint prop. This specific prop type allows you to
pass in an object to each breakpoint prop and this object has two keys, `span`
and `offset`, which allow you to specify the total numbers of columns the
`Column` component spans, and how many columns to offset it by.

You can specify either prop in this object form, and can mix-and-match across
breakpoints. For example, the following snippet will have the `Column` component
span two columns at the small breakpoint and then four columns at the medium
breakpoint. At the medium breakpoint, it will be offset by two columns.

```jsx
<Column sm={2} md={{ span: 4, offset: 2 }} />
```

<Canvas
  of={GridStories.Offset}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(GridStories.Offset),
    },
  ]}
/>

## Component API

<ArgTypes />

### Using the `as` prop

By default, `Grid` and `Column` will render as a `div`. However, you can use the
`as` prop to change this to another HTML element, or a custom component from
your project.

In the example below, we use the `as` prop on `Column` to change it from a `div`
to a `section`. Similarly, we use the `as` prop on `Column` to change it from a
`div` to an `article`.

```jsx
import { Grid, Column } from '@carbon/react';

function MyComponent() {
  return (
    <Grid>
      <Column as="article">Example content</Column>
      <Column as="article">Example content</Column>
      <Column as="article">Example content</Column>
      <Column as="article">Example content</Column>
    </Grid>
  );
}
```

You can also provide a custom component to the `as` prop. This custom component
should accept all props passed to it, like a class name for the column.

```jsx
import { Grid, Column } from '@carbon/react';

function Article({ children, ...rest }) {
  return <article {...rest}>{children}</article>;
}

function CustomColumn({ children, ...rest }) {
  return <Column as={Article} {...rest}>{children}</Column:
}

function MyComponent() {
  return (
    <Grid>
      <CustomColumn>Example content</Column>
      <CustomColumn>Example content</Column>
      <CustomColumn>Example content</Column>
      <CustomColumn>Example content</Column>
    </Grid>
  );
}
```

## FAQ

### How can I hide columns at a certain breakpoint?

To hide a column at a specific breakpoint, you should specify 0 for the span of
the column at that particular breakpoint. For example, you can use the following
two forms for specifying column span and pass in 0 to either to hide the column
at the small breakpoint.

```jsx
<Column sm={0} />
<Column sm={{ span: 0 }} />
```

### Can I nest grid components?

Yes! While the CSS Grid `subgrid` property is still
[not well supported](https://caniuse.com/#feat=css-subgrid), css custom
properties are used to enable nested grids with inherited column definitions.
View the subgrid story documentation for more information on how this works and
how to use it.

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Grid/Grid.mdx).



File: Grid/Column.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { useGridSettings } from './GridContext';
import { PolymorphicComponentPropWithRef } from '../../internal/PolymorphicProps';

type ColumnSpanPercent = '25%' | '50%' | '75%' | '100%';

type ColumnSpanSimple = boolean | number | ColumnSpanPercent;

export interface ColumnSpanObject {
  span?: ColumnSpanSimple;

  offset?: number;

  start?: number;

  end?: number;
}

export type ColumnSpan = ColumnSpanSimple | ColumnSpanObject;

export interface ColumnBaseProps {
  /**
   * Pass in content that will be rendered within the `Column`
   */
  children?: React.ReactNode;

  /**
   * Specify a custom className to be applied to the `Column`
   */
  className?: string;

  /**
   * Specify column span for the `lg` breakpoint (Default breakpoint up to 1312px)
   * This breakpoint supports 16 columns by default.
   *
   * @see https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints
   */
  lg?: ColumnSpan;

  /**
   * Specify column span for the `max` breakpoint. This breakpoint supports 16
   * columns by default.
   *
   * @see https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints
   */
  max?: ColumnSpan;

  /**
   * Specify column span for the `md` breakpoint (Default breakpoint up to 1056px)
   * This breakpoint supports 8 columns by default.
   *
   * @see https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints
   */
  md?: ColumnSpan;

  /**
   * Specify column span for the `sm` breakpoint (Default breakpoint up to 672px)
   * This breakpoint supports 4 columns by default.
   *
   * @see https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints
   */
  sm?: ColumnSpan;

  /**
   * Specify column span for the `xlg` breakpoint (Default breakpoint up to
   * 1584px) This breakpoint supports 16 columns by default.
   *
   * @see https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints
   */
  xlg?: ColumnSpan;

  /**
   * Specify constant column span, start, or end values that will not change
   * based on breakpoint
   */
  span?: ColumnSpan;
}

export type ColumnProps<T extends React.ElementType> =
  PolymorphicComponentPropWithRef<T, ColumnBaseProps>;

export interface ColumnComponent {
  <T extends React.ElementType>(
    props: ColumnProps<T>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    context?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  ): React.ReactElement<any, any> | null;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const Column = React.forwardRef<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  any,
  ColumnBaseProps & {
    as?: React.ElementType;
  } & React.HTMLAttributes<HTMLDivElement>
>(
  (
    { as, children, className: customClassName, sm, md, lg, xlg, max, ...rest },
    ref
  ) => {
    const { mode } = useGridSettings();
    const prefix = usePrefix();
    const BaseComponent = as || 'div';

    if (mode === 'css-grid') {
      return (
        <CSSGridColumn
          as={BaseComponent}
          className={customClassName}
          sm={sm}
          md={md}
          ref={ref}
          lg={lg}
          xlg={xlg}
          max={max}
          {...rest}>
          {children}
        </CSSGridColumn>
      );
    }

    const columnClassName = getClassNameForFlexGridBreakpoints(
      [sm, md, lg, xlg, max],
      prefix
    );
    const className = cx(customClassName, columnClassName, {
      [`${prefix}--col`]: columnClassName.length === 0,
    });

    return (
      <BaseComponent className={className} ref={ref} {...rest}>
        {children}
      </BaseComponent>
    );
  }
);

const percentSpanType = PropTypes.oneOf(['25%', '50%', '75%', '100%']);

const spanPropType = FeatureFlags.enabled('enable-css-grid')
  ? PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.shape({
        span: PropTypes.oneOfType([PropTypes.number, percentSpanType]),
        offset: PropTypes.number,
        start: PropTypes.number,
        end: PropTypes.number,
      }),
      percentSpanType,
    ])
  : PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.shape({
        span: PropTypes.number,
        offset: PropTypes.number,
      }),
    ]);

Column.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Pass in content that will be rendered within the `Column`
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the `Column`
   */
  className: PropTypes.string,

  /**
   * Specify column span for the `lg` breakpoint (Default breakpoint up to 1312px)
   * This breakpoint supports 16 columns by default.
   *
   * @see https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints
   */
  lg: spanPropType,

  /**
   * Specify column span for the `max` breakpoint. This breakpoint supports 16
   * columns by default.
   *
   * @see https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints
   */
  max: spanPropType,

  /**
   * Specify column span for the `md` breakpoint (Default breakpoint up to 1056px)
   * This breakpoint supports 8 columns by default.
   *
   * @see https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints
   */
  md: spanPropType,

  /**
   * Specify column span for the `sm` breakpoint (Default breakpoint up to 672px)
   * This breakpoint supports 4 columns by default.
   *
   * @see https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints
   */
  sm: spanPropType,

  /**
   * Specify constant column span, start, or end values that will not change
   * based on breakpoint
   */
  span: PropTypes.oneOfType([PropTypes.number, percentSpanType]),

  /**
   * Specify column span for the `xlg` breakpoint (Default breakpoint up to
   * 1584px) This breakpoint supports 16 columns by default.
   *
   * @see https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints
   */
  xlg: spanPropType,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any , react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const CSSGridColumn = React.forwardRef<any, ColumnProps<any>>(
  (
    {
      as: BaseComponent = 'div',
      children,
      className: containerClassName,
      sm,
      md,
      lg,
      xlg,
      max,
      span,
      ...rest
    },
    ref
  ) => {
    // Add ref parameter
    const prefix = usePrefix();
    const breakpointClassName = getClassNameForBreakpoints(
      [sm, md, lg, xlg, max],
      prefix
    );
    const spanClassName = getClassNameForSpan(span, prefix);
    const className = cx(
      containerClassName,
      breakpointClassName,
      spanClassName,
      {
        [`${prefix}--css-grid-column`]: true,
      }
    );

    return (
      <BaseComponent className={className} ref={ref} {...rest}>
        {children}
      </BaseComponent>
    );
  }
);

CSSGridColumn.propTypes = {
  /**
   * Provide a custom element to render instead of the default <div>
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Pass in content that will be rendered within the `Column`
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the `Column`
   */
  className: PropTypes.string,

  /**
   * Specify column span for the `lg` breakpoint (Default breakpoint up to 1312px)
   * This breakpoint supports 16 columns by default.
   *
   * @see https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints
   */
  lg: spanPropType,

  /**
   * Specify column span for the `max` breakpoint. This breakpoint supports 16
   * columns by default.
   *
   * @see https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints
   */
  max: spanPropType,

  /**
   * Specify column span for the `md` breakpoint (Default breakpoint up to 1056px)
   * This breakpoint supports 8 columns by default.
   *
   * @see https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints
   */
  md: spanPropType,

  /**
   * Specify column span for the `sm` breakpoint (Default breakpoint up to 672px)
   * This breakpoint supports 4 columns by default.
   *
   * @see https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints
   */
  sm: spanPropType,

  /**
   * Specify constant column span, start,  or end values that will not change
   * based on breakpoint
   */
  span: PropTypes.oneOfType([
    PropTypes.number,
    percentSpanType,
    PropTypes.shape({
      span: PropTypes.oneOfType([PropTypes.number, percentSpanType]),
      start: PropTypes.number,
      end: PropTypes.number,
    }),
  ]),

  /**
   * Specify column span for the `xlg` breakpoint (Default breakpoint up to
   * 1584px) This breakpoint supports 16 columns by default.
   *
   * @see https://carbondesignsystem.com/elements/2x-grid/overview/#breakpoints
   */
  xlg: spanPropType,
};

const breakpointNames = ['sm', 'md', 'lg', 'xlg', 'max'];

/**
 * @typedef {object} Breakpoint
 * @property {boolean|number} [span]
 * @property {number} [offset]
 */

/**
 * Build the appropriate className for the given set of breakpoints.
 * @param {Array<boolean|number|Breakpoint>} breakpoints
 * @returns {string}
 */
function getClassNameForBreakpoints(
  breakpoints: (ColumnSpan | undefined)[],
  prefix: string
): string {
  const classNames: string[] = [];

  for (let i = 0; i < breakpoints.length; i++) {
    const breakpoint = breakpoints[i];
    if (breakpoint === undefined || breakpoint === null) {
      continue;
    }

    const name = breakpointNames[i];

    // If our breakpoint is a boolean, the user has specified that the column
    // should be "auto" at this size
    if (breakpoint === true) {
      classNames.push(`${prefix}--${name}:col-span-auto`);
      continue;
    }

    // If our breakpoint is a string, the user might have specified a percent
    // they'd like this column to span.
    if (typeof breakpoint === 'string') {
      classNames.push(
        `${prefix}--${name}:col-span-${breakpoint.replace('%', '')}`
      );
      continue;
    }

    // If our breakpoint is a number, the user has specified the number of
    // columns they'd like this column to span
    if (typeof breakpoint === 'number') {
      classNames.push(`${prefix}--${name}:col-span-${breakpoint}`);
      continue;
    }

    if (typeof breakpoint === 'object') {
      const { span, offset, start, end } = breakpoint;

      if (typeof offset === 'number') {
        classNames.push(
          `${prefix}--${name}:col-start-${offset > 0 ? offset + 1 : 'auto'}`
        );
      }

      if (typeof start === 'number') {
        classNames.push(
          `${prefix}--${name}:col-start-${start ? start : 'auto'}`
        );
      }

      if (typeof end === 'number') {
        classNames.push(`${prefix}--${name}:col-end-${end}`);
      }

      if (typeof span === 'number') {
        classNames.push(`${prefix}--${name}:col-span-${span}`);
      } else if (typeof span === 'string') {
        classNames.push(`${prefix}--${name}:col-span-${span.slice(0, -1)}`);
        continue;
      }
    }
  }

  return classNames.join(' ');
}

/**
 * Build the appropriate className for the given set of breakpoints.
 * @param {Array<boolean|number|Breakpoint>} breakpoints
 * @returns {string}
 */
function getClassNameForFlexGridBreakpoints(
  breakpoints: (ColumnSpan | undefined)[],
  prefix: string
): string {
  const classNames: string[] = [];

  for (let i = 0; i < breakpoints.length; i++) {
    const breakpoint = breakpoints[i];
    if (breakpoint === undefined || breakpoint === null) {
      continue;
    }

    const name = breakpointNames[i];

    // If our breakpoint is a boolean, the user has specified that the column
    // should be "auto" at this size
    if (breakpoint === true) {
      classNames.push(`${prefix}--col-${name}`);
      continue;
    }

    // If our breakpoint is a number, the user has specified the number of
    // columns they'd like this column to span
    if (typeof breakpoint === 'number') {
      classNames.push(`${prefix}--col-${name}-${breakpoint}`);
      continue;
    }

    if (typeof breakpoint === 'object') {
      const { span, offset } = breakpoint;
      if (typeof span === 'number') {
        classNames.push(`${prefix}--col-${name}-${span}`);
      }

      if (span === true) {
        classNames.push(`${prefix}--col-${name}`);
      }

      if (typeof offset === 'number') {
        classNames.push(`${prefix}--offset-${name}-${offset}`);
      }
    }
  }

  return classNames.join(' ');
}

/**
 * Build the appropriate className for a span value
 */
function getClassNameForSpan(
  value: ColumnSpan | undefined,
  prefix: string
): string {
  const classNames: string[] = [];

  if (typeof value === 'number') {
    classNames.push(`${prefix}--col-span-${value}`);
  }
  // If value is a string, the user has specified a percent
  // they'd like this column to span.
  else if (typeof value === 'string') {
    classNames.push(`${prefix}--col-span-${value.slice(0, -1)}`);
  } else if (typeof value === 'object') {
    const { span, start, end } = value;

    if (span !== undefined && span !== null) {
      classNames.push(`${prefix}--col-span-${span}`);
    }

    if (start !== undefined && start !== null) {
      classNames.push(`${prefix}--col-start-${start}`);
    }

    if (end !== undefined && end !== null) {
      classNames.push(`${prefix}--col-end-${end}`);
    }
  }

  return classNames.join('');
}

export default Column as ColumnComponent;



