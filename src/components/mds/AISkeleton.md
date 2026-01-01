File: AISkeleton/AISkeletonIcon.tsx


/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { SkeletonIcon } from '../SkeletonIcon';

export interface AISkeletonIconProps {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * The CSS styles.
   */
  style?: React.CSSProperties;
}

const AISkeletonIcon = ({ className, ...rest }: AISkeletonIconProps) => {
  const prefix = usePrefix();
  const AISkeletonIconClasses = classNames(className, {
    [`${prefix}--skeleton__icon--ai`]: true,
  });

  return <SkeletonIcon className={AISkeletonIconClasses} {...rest} />;
};

AISkeletonIcon.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * The CSS styles.
   */
  style: PropTypes.object,
};

export default AISkeletonIcon;



File: AISkeleton/AISkeletonPlaceholder.stories.js


/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import AISkeletonPlaceholder from './AISkeletonPlaceholder';

export default {
  title: 'Components/Skeleton/AISkeleton',
  component: AISkeletonPlaceholder,
};

export const _AISkeletonPlaceholder = () => {
  return <AISkeletonPlaceholder className="test" />;
};



File: AISkeleton/AISkeletonText.stories.js


/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import AISkeletonText from './AISkeletonText';

export default {
  title: 'Components/Skeleton/AISkeleton',
  component: AISkeletonText,
};

export const _AISkeletonText = () => {
  return <AISkeletonText />;
};



File: AISkeleton/AISkeletonIcon.stories.js


/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import AISkeletonIcon from './AISkeletonIcon';
import mdx from './AISkeleton.mdx';

export default {
  title: 'Components/Skeleton/AISkeleton',
  component: AISkeletonIcon,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

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

export const _AISkeletonIcon = () => {
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
      <AISkeletonIcon {...propsSkeleton} />
      <AISkeletonIcon {...propsSkeleton2} />
    </>
  );
};



File: AISkeleton/AISkeletonText.tsx


/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { SkeletonText } from '../SkeletonText';

export interface AISkeletonTextProps {
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

const AISkeletonText = ({ className, ...rest }: AISkeletonTextProps) => {
  const prefix = usePrefix();
  const aiSkeletonTextClasses = classNames(className, {
    [`${prefix}--skeleton__text--ai`]: true,
  });

  return <SkeletonText className={aiSkeletonTextClasses} {...rest} />;
};

AISkeletonText.propTypes = {
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

export default AISkeletonText;



File: AISkeleton/index.tsx


/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import AISkeletonPlaceholder from './AISkeletonPlaceholder';
import AISkeletonIcon from './AISkeletonIcon';
import AISkeletonText from './AISkeletonText';

export { AISkeletonText, AISkeletonIcon, AISkeletonPlaceholder };



File: AISkeleton/AISkeletonPlaceholder.tsx


/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { SkeletonPlaceholder } from '../SkeletonPlaceholder';

export interface AISkeletonPlaceholderProps {
  /**
   * Add a custom class to the component to set the height and width
   */
  className?: string;
}

const AISkeletonPlaceholder = ({
  className,
  ...other
}: AISkeletonPlaceholderProps) => {
  const prefix = usePrefix();
  const AISkeletonPlaceholderClasses = classNames(
    { className, [`${prefix}--skeleton__placeholder--ai`]: true },
    className
  );

  return (
    <SkeletonPlaceholder className={AISkeletonPlaceholderClasses} {...other} />
  );
};

AISkeletonPlaceholder.propTypes = {
  /**
   * Add a custom class to the component
   * to set the height and width
   */
  className: PropTypes.string,
};

export default AISkeletonPlaceholder;



File: AISkeleton/AISkeleton.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as AISkeletonStories from './AISkeletonIcon.stories';
import * as AISkeletonPlaceholderStories from './AISkeletonPlaceholder.stories';
import * as AISkeletonTextStories from './AISkeletonText.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';


<Meta isTemplate />

# AI Skeleton

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/AISkeleton)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
    - [AI Skeleton Icon](#ai-skeleton-icon)
    - [AI Skeleton Placeholder](#ai-skeleton-placeholder)
    - [AI Skeleton Text](#ai-skeleton-text)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

#### AI Skeleton Icon

<Canvas
  of={AISkeletonStories._AISkeletonIcon}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(AISkeletonStories._AISkeletonIcon),
    },
  ]}
/>

#### AI Skeleton Placeholder

<Canvas
  of={AISkeletonPlaceholderStories._AISkeletonPlaceholder}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(AISkeletonPlaceholderStories._AISkeletonPlaceholder),
    },
  ]}
/>

#### AI Skeleton Text

<Canvas
  of={AISkeletonTextStories._AISkeletonText}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(AISkeletonTextStories._AISkeletonText),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/AISkeleton.mdx).


