File: SkeletonText/SkeletonText-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SkeletonText from '../SkeletonText';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('SkeletonText', () => {
  it('should pass in an extra className when one is given', () => {
    render(<SkeletonText className="custom-class" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('custom-class');
  });
});

describe('SkeletonText Heading', () => {
  it('should add heading classNames when the heading prop is passed in', () => {
    render(<SkeletonText heading data-testid="skeleton2" />);
    expect(screen.getByTestId('skeleton2')).toHaveClass(
      `${prefix}--skeleton__heading`
    );
  });
});



File: SkeletonText/SkeletonText.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { MutableRefObject, ReactNode, useRef } from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';

const randoms = [0.973051493507435, 0.15334737213558558, 0.5671034553053769];

function getRandomInt(min: number, max: number, n: number) {
  return Math.floor(randoms[n % 3] * (max - min + 1)) + min;
}

export interface SkeletonTextProps {
  /**
   * Specify an optional className to be applied to the container node.
   */
  className?: string;

  /**
   * Generates skeleton text at a larger size.
   */
  heading?: boolean;

  /**
   * The number of lines shown if paragraph is true.
   */
  lineCount?: number;

  /**
   * Set this to true to generate multiple lines of text.
   */
  paragraph?: boolean;

  /**
   * Width (in px or %) of single line of text or max-width of paragraph lines.
   */
  width?: string;
}

const SkeletonText = ({
  paragraph = false,
  lineCount = 3,
  width = '100%',
  heading = false,
  className = '',
  ...rest
}: SkeletonTextProps) => {
  const prefix = usePrefix();
  const skeletonTextClasses = classNames({
    [`${prefix}--skeleton__text`]: true,
    [`${prefix}--skeleton__heading`]: heading,
    [className]: className,
  });

  const widthNum = parseInt(width, 10);
  const widthPx = width.includes('px');
  const widthPercent = width.includes('%');

  let lineCountNumber = 1;

  if (paragraph) {
    lineCountNumber = lineCount;
  }

  const refs: MutableRefObject<(HTMLParagraphElement | null)[]> = useRef([]);

  useIsomorphicEffect(() => {
    refs.current.map((item, j) => {
      const randomPercentWidth = getRandomInt(0, 75, j) + 'px';
      const randomPxWidth =
        getRandomInt(Math.max(widthNum - 75, 0), widthNum, j) + 'px';

      if (item) {
        if (widthPercent && paragraph) {
          item.style.width = `calc(${width} - ${randomPercentWidth})`;
        } else if (widthPx && paragraph) {
          item.style.width = randomPxWidth;
        } else {
          item.style.width = width;
        }
      }
    });
  }, [
    lineCountNumber,
    paragraph,
    refs,
    width,
    widthNum,
    widthPercent,
    widthPx,
  ]);

  const lines: ReactNode[] = [];
  for (let i = 0; i < lineCountNumber; i++) {
    lines.push(
      <p
        className={skeletonTextClasses}
        key={i}
        ref={(el) => {
          refs.current = [...refs.current, el];
        }}
        {...rest}
      />
    );
  }

  if (lineCountNumber !== 1) {
    return <div>{lines}</div>;
  }

  return <>{lines}</>;
};

SkeletonText.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,
  /**
   * generates skeleton text at a larger size
   */
  heading: PropTypes.bool,
  /**
   * the number of lines shown if paragraph is true
   */
  lineCount: PropTypes.number,
  /**
   * will generate multiple lines of text
   */
  paragraph: PropTypes.bool,
  /**
   * width (in px or %) of single line of text or max-width of paragraph lines
   */
  width: PropTypes.string,
};

export default SkeletonText;



File: SkeletonText/SkeletonText.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import SkeletonText from '.';
import mdx from './SkeletonText.mdx';

export default {
  title: 'Components/Skeleton/SkeletonText',
  component: SkeletonText,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return <SkeletonText {...args} />;
};

Default.args = {
  heading: false,
  paragraph: false,
  width: '100%',
  lineCount: 3,
};

Default.argTypes = {
  className: {
    control: false,
  },
  heading: {
    control: {
      type: 'boolean',
    },
  },
  paragraph: {
    control: {
      type: 'boolean',
    },
  },
  width: {
    control: {
      type: 'text',
    },
  },
  lineCount: {
    control: {
      type: 'number',
    },
  },
};



File: SkeletonText/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import SkeletonText from './SkeletonText';
export default SkeletonText;
export { SkeletonText };



File: SkeletonText/SkeletonText.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as SkeletonTextStories from './SkeletonText.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# SkeletonText

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/SkeletonText)
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
  of={SkeletonTextStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(SkeletonTextStories.Default),
    },
  ]}
/>

## Component API
<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/SkeletonText/SkeletonText.mdx).



