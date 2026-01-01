File: Heading/Heading.mdx


import { Canvas, ArgTypes, Story, Meta } from '@storybook/addon-docs/blocks';
import * as HeadingStories from './Heading.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Heading

[Source code](https://github.com/carbon-design-system/carbon/tree/master/packages/react/src/components/Heading)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
  - [Section as](#section-as)
  - [Custom level](#custom-level)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

For people using screen readers, headings in HTML are one of the most common
ways to navigate a page. Correctly using headings and levels helps with
understanding a page and its hierarchy and can be used to jump between sections
on a page.

Normally, in a component you would have to specify the heading level manually.
This can become problematic if your component is used in various parts of a page
where the heading level needs to be different.

To help address this, the `Heading` component will automatically infer the
appropriate heading level without you having to manually specify it. To do this,
you use the `Section` component for each section of your page. Every `Heading`
component in that `Section` will use the correct heading level.

<Canvas
  of={HeadingStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(HeadingStories.Default),
    },
  ]}
/>

## Component API

<ArgTypes />

### Section as

You can use the `as` prop to support rendering the outermost node in the
component with a specific tag, or custom component, as opposed to the default
`<section>` that is used.

For example, to render an `article` you could use `as="article"`:

```jsx
<Section as="article">
  <Heading>Your heading</Heading>
</Section>
```

### Custom level

You can use the `level` prop to override the level of a section:

```jsx
<Section level={5}>
  <Heading>rendered as h5</Heading>
  <Section>
    <Heading>rendered as h6</Heading>
  </Section>
</Section>
```

<Canvas
  of={HeadingStories.CustomLevel}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(HeadingStories.CustomLevel),
    },
  ]}
/>

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Heading/Heading.mdx).



File: Heading/Heading.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Section, Heading } from '../Heading';
import mdx from './Heading.mdx';

export default {
  title: 'Components/Heading',
  component: Heading,
  subcomponents: {
    Section,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return (
    <>
      <Heading>h1</Heading>
      <Section>
        <Heading>h2</Heading>
        <Section>
          <Heading>h3</Heading>
        </Section>
      </Section>
    </>
  );
};

export const CustomLevel = () => {
  return (
    <>
      <Heading>h1</Heading>
      <Section level={5}>
        <Heading>h5</Heading>
        <Section>
          <Heading>h6</Heading>
        </Section>
      </Section>
    </>
  );
};



File: Heading/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-heading--default'
    }
  ]}
/>



File: Heading/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type ElementType, type JSX } from 'react';
import type { PolymorphicProps } from '../../types/common';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const HeadingContext = React.createContext<HeadingLevel>(1);

type SectionBaseProps = {
  level?: HeadingLevel;
};

export type SectionProps<E extends ElementType> = PolymorphicProps<
  E,
  SectionBaseProps
>;

export const Section = React.forwardRef(function Section<
  E extends ElementType = 'section',
>(
  {
    as: BaseComponent = 'section' as E,
    level: levelOverride,
    ...rest
  }: SectionProps<E>,
  ref: React.Ref<unknown>
) {
  const parentLevel = React.useContext(HeadingContext);
  const level = levelOverride ?? parentLevel + 1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  const BaseComponentAsAny = BaseComponent as any;

  return (
    <HeadingContext.Provider value={Math.min(level, 6) as HeadingLevel}>
      <BaseComponentAsAny ref={ref} {...rest} />
    </HeadingContext.Provider>
  );
});

Section.propTypes = {
  /**
   * Provide an alternative tag or component to use instead of the default
   * <section> element
   */
  as: PropTypes.elementType,

  /**
   * Specify the content that will be placed in the component
   */
  children: PropTypes.node,

  /**
   * Specify a class name for the outermost node of the component
   */
  className: PropTypes.string,

  /**
   * Overrides the level of the section
   */
  level: PropTypes.number,
};

type HeadingProps = JSX.IntrinsicElements[`h${HeadingLevel}`];
// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
export const Heading = React.forwardRef(
  (props: HeadingProps, ref: React.Ref<HTMLHeadingElement>) => {
    const HeadingIntrinsic = `h${React.useContext(HeadingContext)}` as const;
    return <HeadingIntrinsic ref={ref} {...props} />;
  }
);

Heading.propTypes = {
  /**
   * Specify the content that will be placed in the component
   */
  children: PropTypes.node,

  /**
   * Specify a class name for the outermost node of the component
   */
  className: PropTypes.string,
};



