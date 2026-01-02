File: IconIndicator/IconIndicator.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import IconIndicator from '.';
import { IconIndicatorKinds } from './index';
import mdx from './IconIndicator.mdx';

export default {
  title: 'Preview/StatusIndicators/preview__IconIndicator',
  component: IconIndicator,
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
  size: {
    control: {
      type: 'select',
    },
    options: [16, 20],
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
      <IconIndicator kind="failed" label="Failed" {...props} />
      <IconIndicator kind="caution-major" label="Caution major" {...props} />
      <IconIndicator kind="caution-minor" label="Caution minor" {...props} />
      <IconIndicator kind="undefined" label="Undefined" {...props} />
      <IconIndicator kind="succeeded" label="Succeeded" {...props} />
      <IconIndicator kind="normal" label="Normal" {...props} />
      <IconIndicator kind="in-progress" label="In progress" {...props} />
      <IconIndicator kind="incomplete" label="Incomplete" {...props} />
      <IconIndicator kind="not-started" label="Not started" {...props} />
      <IconIndicator kind="pending" label="Pending" {...props} />
      <IconIndicator kind="unknown" label="Unknown" {...props} />
      <IconIndicator kind="informative" label="Informative" {...props} />
    </div>
  );
};

Default.args = {
  size: 16,
};
Default.argTypes = sharedArgTypes;

export const DefaultWithSize20 = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        rowGap: '.5rem',
      }}>
      <IconIndicator kind="failed" label="Failed" {...props} />
      <IconIndicator kind="caution-major" label="Caution major" {...props} />
      <IconIndicator kind="caution-minor" label="Caution minor" {...props} />
      <IconIndicator kind="undefined" label="Undefined" {...props} />
      <IconIndicator kind="succeeded" label="Succeeded" {...props} />
      <IconIndicator kind="normal" label="Normal" {...props} />
      <IconIndicator kind="in-progress" label="In progress" {...props} />
      <IconIndicator kind="incomplete" label="Incomplete" {...props} />
      <IconIndicator kind="not-started" label="Not started" {...props} />
      <IconIndicator kind="pending" label="Pending" {...props} />
      <IconIndicator kind="unknown" label="Unknown" {...props} />
      <IconIndicator kind="informative" label="Informative" {...props} />
    </div>
  );
};

DefaultWithSize20.args = {
  size: 20,
};

/*
 * This story will:
 * - Be excluded from the docs page
 * - Removed from the sidebar navigation
 * - Still be a tested variant
 */
DefaultWithSize20.tags = ['!dev', '!autodocs'];
DefaultWithSize20.argTypes = sharedArgTypes;



File: IconIndicator/IconIndicator.mdx


import { ArgTypes, Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as IconIndicatorStories from './IconIndicator.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# IconIndicator

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/IconIndicator)
&nbsp;

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Kind](#kind)
- [Size](#size)
- [Customizing the label](#customizing-the-label)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

The `IconIndicator` component is useful for communicating severity level
information to users. The shapes and colors, communicate severity that enables
users to quickly assess and identify status and respond accordingly.

```jsx
import { preview__IconIndicator as IconIndicator } from '@carbon/react';

function ExampleComponent() {
  return (
    <IconIndicator kind="failed" label="Failed">
  );
}
```

<Canvas
  of={IconIndicatorStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(IconIndicatorStories.Default),
    },
  ]}
/>

## Kind

Icon indicators can take the form of failed, caution major, caution minor,
undefined, succeeded, normal, in-progress incomplete, not started, pending,
unknown, and informative.

## Size

Icon indicators have two size options 16 and 20. The default is 16.

## Customizing the label

You can set a string to customize the label of the Icon indicator.

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/IconIndicator/IconIndicator.mdx).



File: IconIndicator/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-statusindicator-iconindicator--playground'
    }
  ]}
/>



File: IconIndicator/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import {
  ErrorFilled,
  CheckmarkFilled,
  WarningAltFilled,
  WarningAltInvertedFilled,
  UndefinedFilled,
  InProgress,
  Incomplete,
  CircleDash,
  UnknownFilled,
  WarningSquareFilled,
  CheckmarkOutline,
  PendingFilled,
} from '@carbon/icons-react';

export const IconIndicatorKinds = [
  'failed',
  'caution-major',
  'caution-minor',
  'undefined',
  'succeeded',
  'normal',
  'in-progress',
  'incomplete',
  'not-started',
  'pending',
  'unknown',
  'informative',
];

const iconTypes = {
  failed: ErrorFilled,
  ['caution-major']: WarningAltInvertedFilled,
  ['caution-minor']: WarningAltFilled,
  undefined: UndefinedFilled,
  succeeded: CheckmarkFilled,
  normal: CheckmarkOutline,
  ['in-progress']: InProgress,
  incomplete: Incomplete,
  ['not-started']: CircleDash,
  pending: PendingFilled,
  unknown: UnknownFilled,
  informative: WarningSquareFilled,
};

export type IconIndicatorKind = (typeof IconIndicatorKinds)[number];

export interface IconIndicatorProps {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * Specify the kind of icon to be used
   */
  kind: IconIndicatorKind;

  /**
   * Label next to the icon
   */
  label: string;

  /**
   * Specify the size of the Icon Indicator. Defaults to 16.
   */
  size?: 16 | 20;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
export const IconIndicator = React.forwardRef(
  (
    {
      className: customClassName,
      kind,
      label,
      size = 16,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
      ...rest
    }: IconIndicatorProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const prefix = usePrefix();
    const classNames = cx(`${prefix}--icon-indicator`, customClassName, {
      [`${prefix}--icon-indicator--20`]: size == 20,
    });

    const IconForKind = iconTypes[kind];
    if (!IconForKind) {
      return null;
    }
    return (
      <div className={classNames} ref={ref}>
        <IconForKind
          size={size}
          className={`${prefix}--icon-indicator--${kind}`}
        />
        {label}
      </div>
    );
  }
);

IconIndicator.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify the kind of the Icon Indicator
   */
  kind: PropTypes.oneOf(IconIndicatorKinds).isRequired,

  /**
   * Label next to the icon.
   */
  label: PropTypes.string.isRequired,

  /**
   * Specify the size of the Icon Indicator. Defaults to 16.
   */
  size: PropTypes.oneOf([16, 20]),
};

export default IconIndicator;



