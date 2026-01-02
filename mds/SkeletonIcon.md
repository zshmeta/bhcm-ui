File: SkeletonIcon/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import SkeletonIcon from './SkeletonIcon';

export default SkeletonIcon;
export { SkeletonIcon };



File: SkeletonIcon/SkeletonIcon.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SkeletonIcon from '.';
import mdx from './SkeletonIcon.mdx';

export default {
  title: 'Components/Skeleton/SkeletonIcon',
  component: SkeletonIcon,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  const propsSkeleton = {
    style: {
      margin: '50px',
    },
  };

  const propsSkeleton2 = {
    style: {
      margin: '50px',
      width: '24px',
      height: '24px',
    },
  };
  return (
    <>
      <SkeletonIcon {...propsSkeleton} />
      <SkeletonIcon {...propsSkeleton2} />
    </>
  );
};



File: SkeletonIcon/SkeletonIcon-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SkeletonIcon from '../SkeletonIcon';
import { render, screen } from '@testing-library/react';

describe('SkeletonIcon', () => {
  it('should pass in an extra className when one is given', () => {
    render(<SkeletonIcon className="custom-class" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('custom-class');
  });
});



File: SkeletonIcon/SkeletonIcon.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface SkeletonIconProps {
  /**
   * Specify an optional className to add.
   */
  className?: string;
}

const SkeletonIcon: React.FC<SkeletonIconProps> = ({ className, ...other }) => {
  const prefix = usePrefix();

  const skeletonIconClasses = classNames(className, {
    [`${prefix}--icon--skeleton`]: true,
  });

  return <div className={skeletonIconClasses} {...other} />;
};

SkeletonIcon.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default SkeletonIcon;



File: SkeletonIcon/SkeletonIcon.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as SkeletonIconStories from './SkeletonIcon.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# SkeletonIcon

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/SkeletonIcon)
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
  of={SkeletonIconStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(SkeletonIconStories.Default),
    },
  ]}
/>

## Component API
<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/SkeletonIcon/SkeletonIcon.mdx).



