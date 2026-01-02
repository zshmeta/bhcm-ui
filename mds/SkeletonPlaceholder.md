File: SkeletonPlaceholder/SkeletonPlaceholder-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SkeletonPlaceholder from '../SkeletonPlaceholder';
import { render, screen } from '@testing-library/react';

describe('SkeletonPlaceholder', () => {
  it('should pass in an extra className when one is given', () => {
    render(
      <SkeletonPlaceholder className="custom-class" data-testid="skeleton" />
    );
    expect(screen.getByTestId('skeleton')).toHaveClass('custom-class');
  });
});



File: SkeletonPlaceholder/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import SkeletonPlaceholder from './SkeletonPlaceholder';

export default SkeletonPlaceholder;
export { SkeletonPlaceholder };



File: SkeletonPlaceholder/SkeletonPlaceholder.mdx


import { Story, ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as SkeletonPlaceholderStories from './SkeletonPlaceholder.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# SkeletonPlaceholder

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/SkeletonPlaceholder)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/patterns/loading-pattern/#skeleton-states)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={SkeletonPlaceholderStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () =>
        stackblitzPrefillConfig(SkeletonPlaceholderStories.Default),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/SkeletonPlaceholder/SkeletonPlaceholder.mdx).



File: SkeletonPlaceholder/SkeletonPlaceholder.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import SkeletonPlaceholder from '.';
import mdx from './SkeletonPlaceholder.mdx';

export default {
  title: 'Components/Skeleton/SkeletonPlaceholder',
  component: SkeletonPlaceholder,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return <SkeletonPlaceholder />;
};



File: SkeletonPlaceholder/SkeletonPlaceholder.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface SkeletonPlaceholderProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Add a custom class to the component to set the height and width
   */
  className?: string;
}

const SkeletonPlaceholder = ({
  className,
  ...other
}: SkeletonPlaceholderProps) => {
  const prefix = usePrefix();
  const skeletonPlaceholderClasses = classNames(
    {
      [`${prefix}--skeleton__placeholder`]: true,
    },
    className
  );

  return <div className={skeletonPlaceholderClasses} {...other} />;
};

SkeletonPlaceholder.propTypes = {
  /**
   * Add a custom class to the component to set the height and width
   */
  className: PropTypes.string,
};

export default SkeletonPlaceholder;



