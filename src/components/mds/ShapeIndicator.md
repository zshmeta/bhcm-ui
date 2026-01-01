File: ShapeIndicator/ShapeIndicator.mdx


import { ArgTypes, Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as ShapeIndicatorStories from './ShapeIndicator.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# ShapeIndicator

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/ShapeIndicator)
&nbsp;

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Kind](#kind)
- [Text Size](#text-size)
- [Customizing the label](#customizing-the-label)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

`ShapeIndicator`

```jsx
import { preview__ShapeIndicator as ShapeIndicator } from '@carbon/react';

function ExampleComponent() {
  return (
    <ShapeIndicator kind="failed" label="Failed">
  );
}
```

<Canvas
  of={ShapeIndicatorStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ShapeIndicatorStories.Default),
    },
  ]}
/>

## Kind

Shape indicators can take the form of failed, critical, high, medium, low,
cautious, undefined, stable, informative, incomplete, and draft.

## Text Size

Shape indicators have two text size options 12 and 14. The default is 12.

## Customizing the label

You can set a string to customize the label of the Shape indicator.

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/ShapeIndicator/ShapeIndicator.mdx).



File: ShapeIndicator/ShapeIndicator.stories.js


/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ShapeIndicator from '.';
import mdx from './ShapeIndicator.mdx';

export default {
  title: 'Preview/StatusIndicators/preview__ShapeIndicator',
  component: ShapeIndicator,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgTypes = {
  label: {
    control: {
      type: 'text',
    },
  },
  kind: {
    control: false,
  },
  textSize: {
    control: {
      type: 'select',
    },
    options: [12, 14],
  },
};

export const Default = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        rowGap: '.5rem',
      }}>
      <ShapeIndicator kind="failed" label="Failed" {...props} />
      <ShapeIndicator kind="critical" label="Critical" {...props} />
      <ShapeIndicator kind="high" label="High" {...props} />
      <ShapeIndicator kind="medium" label="Medium" {...props} />
      <ShapeIndicator kind="low" label="Low" {...props} />
      <ShapeIndicator kind="cautious" label="Cautious" {...props} />
      <ShapeIndicator kind="undefined" label="Undefined" {...props} />
      <ShapeIndicator kind="stable" label="Stable" {...props} />
      <ShapeIndicator kind="informative" label="Informative" {...props} />
      <ShapeIndicator kind="incomplete" label="Incomplete" {...props} />
      <ShapeIndicator kind="draft" label="Draft" {...props} />
    </div>
  );
};

Default.args = {
  textSize: 12,
};

Default.argTypes = sharedArgTypes;

export const DefaultWithTextSize14 = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        rowGap: '.5rem',
      }}>
      <ShapeIndicator kind="failed" label="Failed" {...props} />
      <ShapeIndicator kind="critical" label="Critical" {...props} />
      <ShapeIndicator kind="high" label="High" {...props} />
      <ShapeIndicator kind="medium" label="Medium" {...props} />
      <ShapeIndicator kind="low" label="Low" {...props} />
      <ShapeIndicator kind="cautious" label="Cautious" {...props} />
      <ShapeIndicator kind="undefined" label="Undefined" {...props} />
      <ShapeIndicator kind="stable" label="Stable" {...props} />
      <ShapeIndicator kind="informative" label="Informative" {...props} />
      <ShapeIndicator kind="incomplete" label="Incomplete" {...props} />
      <ShapeIndicator kind="draft" label="Draft" {...props} />
    </div>
  );
};

DefaultWithTextSize14.args = {
  textSize: 14,
};

/*
 * This story will:
 * - Be excluded from the docs page
 * - Removed from the sidebar navigation
 * - Still be a tested variant
 */
DefaultWithTextSize14.tags = ['!dev', '!autodocs'];

DefaultWithTextSize14.argTypes = sharedArgTypes;



File: ShapeIndicator/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-statusindicator-shapeindicator--playground'
    }
  ]}
/>



File: ShapeIndicator/index.tsx


/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import {
  Critical,
  CriticalSeverity,
  DiamondFill,
  LowSeverity,
  Caution,
  CircleFill,
  CircleStroke,
} from '@carbon/icons-react';

export const ShapeIndicatorKinds = [
  'failed',
  'critical',
  'high',
  'medium',
  'low',
  'cautious',
  'undefined',
  'stable',
  'informative',
  'incomplete',
  'draft',
];

// TODO: update to import '@carbon/icons-react'
const incompleteIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    aria-hidden="true"
    {...props}>
    <path
      fill="#fff"
      fillOpacity={0.01}
      d="M0 0h16v16H0z"
      style={{
        mixBlendMode: 'multiply',
      }}
    />
    <path
      fill="#161616"
      d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Zm0 2a4.004 4.004 0 0 1 4 4H4a4.004 4.004 0 0 1 4-4Z"
    />
  </svg>
);

const shapeTypes = {
  failed: Critical,
  critical: CriticalSeverity,
  high: Caution,
  medium: DiamondFill,
  low: LowSeverity,
  cautious: Caution,
  undefined: DiamondFill,
  stable: CircleFill,
  informative: LowSeverity,
  incomplete: incompleteIcon,
  draft: CircleStroke,
};

export type ShapeIndicatorKind = (typeof ShapeIndicatorKinds)[number];

export interface ShapeIndicatorProps {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * Specify the kind of shape to be used
   */
  kind: ShapeIndicatorKind;

  /**
   * Label next to the shape
   */
  label: string;

  /**
   * Specify the text size of the Shape Indicator. Defaults to 12.
   */
  textSize?: 12 | 14;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
export const ShapeIndicator = React.forwardRef(
  (
    {
      className: customClassName,
      kind,
      label,
      textSize = 12,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
      ...rest
    }: ShapeIndicatorProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const prefix = usePrefix();
    const classNames = cx(`${prefix}--shape-indicator`, customClassName, {
      [`${prefix}--shape-indicator--14`]: textSize == 14,
    });

    const ShapeForKind = shapeTypes[kind];
    if (!ShapeForKind) {
      return null;
    }
    return (
      <div className={classNames} ref={ref}>
        <ShapeForKind
          size={16}
          className={`${prefix}--shape-indicator--${kind}`}
        />
        {label}
      </div>
    );
  }
);

ShapeIndicator.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify the kind of the Shape Indicator
   */
  kind: PropTypes.oneOf(ShapeIndicatorKinds).isRequired,

  /**
   * Label next to the shape.
   */
  label: PropTypes.string.isRequired,

  /**
   * Specify the text size of the Shape Indicator. Defaults to 12.
   */
  textSize: PropTypes.oneOf([12, 14]),
};

export default ShapeIndicator;



