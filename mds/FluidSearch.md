File: FluidSearch/FluidSearch.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';

export interface FluidSearchSkeletonProps {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className?: string;
}

const FluidSearchSkeleton: React.FC<FluidSearchSkeletonProps> = ({
  className,
  ...other
}) => {
  const prefix = usePrefix();
  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <div
        className={classnames(
          `${prefix}--form-item ${prefix}--text-input--fluid__skeleton`,
          className
        )}
        {...other}>
        <span className={`${prefix}--label ${prefix}--skeleton`} />
        <div className={`${prefix}--skeleton ${prefix}--text-input`} />
      </div>
    </FormContext.Provider>
  );
};

FluidSearchSkeleton.propTypes = {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className: PropTypes.string,
};

export default FluidSearchSkeleton;



File: FluidSearch/FluidSearch.tsx


/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type ChangeEvent } from 'react';
import classnames from 'classnames';
import Search from '../Search';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';

export interface FluidSearchProps {
  /**
   * Specify an optional value for the `autocomplete` property on the underlying
   * `<input>`, defaults to "off"
   */
  autoComplete?: string;
  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;
  /**
   * Specify a label to be read by screen readers on the "close" button
   */
  closeButtonLabelText?: string;
  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue?: string | number;
  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;
  /**
   * Specify a custom `id` for the input
   */
  id?: string;
  /**
   * Provide the label text for the Search icon
   */
  labelText: React.ReactNode;
  /**
   * Optional callback called when the search value changes.
   */
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
  /**
   * Optional callback called when the search value is cleared.
   */
  onClear?: () => void;
  /**
   * Provide a handler that is invoked on the key down event for the input
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /**
   * Provide an optional placeholder text for the Search.
   * Note: if the label and placeholder differ,
   * VoiceOver on Mac will read both
   */
  placeholder?: string;
  /**
   * Specify the role for the underlying `<input>`, defaults to `searchbox`
   */
  role?: string;
  /**
   * Optional prop to specify the type of the `<input>`
   */
  type?: string;
  /**
   * Specify the value of the `<input>`
   */
  value?: string | number;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const FluidSearch: React.FC<FluidSearchProps> = React.forwardRef<
  HTMLInputElement,
  FluidSearchProps
>(({ className, ...other }, ref) => {
  const prefix = usePrefix();
  const classNames = classnames(`${prefix}--search--fluid`, className);

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <Search ref={ref} className={classNames} {...other} />
    </FormContext.Provider>
  );
});

FluidSearch.propTypes = {
  /**
   * Specify an optional value for the `autocomplete` property on the underlying
   * `<input>`, defaults to "off"
   */
  autoComplete: PropTypes.string,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify a label to be read by screen readers on the "close" button
   */
  closeButtonLabelText: PropTypes.string,

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify a custom `id` for the input
   */
  id: PropTypes.string,

  /**
   * Provide the label text for the Search icon
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Optional callback called when the search value changes.
   */
  onChange: PropTypes.func,

  /**
   * Optional callback called when the search value is cleared.
   */
  onClear: PropTypes.func,

  /**
   * Provide a handler that is invoked on the key down event for the input
   */
  onKeyDown: PropTypes.func,

  /**
   * Provide an optional placeholder text for the Search.
   * Note: if the label and placeholder differ,
   * VoiceOver on Mac will read both
   */
  placeholder: PropTypes.string,

  /**
   * Specify the role for the underlying `<input>`, defaults to `searchbox`
   */
  role: PropTypes.string,

  /**
   * Optional prop to specify the type of the `<input>`
   */
  type: PropTypes.string,

  /**
   * Specify the value of the `<input>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default FluidSearch;



File: FluidSearch/FluidSearch.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FluidSearch, FluidSearchSkeleton } from '.';
import mdx from './FluidSearch.mdx';

export default {
  title: 'Components/Fluid Components/FluidSearch',
  component: FluidSearch,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['id'],
    },
  },
  subcomponents: {
    FluidSearchSkeleton,
  },
};

export const Skeleton = () => (
  <div style={{ width: '400px' }}>
    <FluidSearchSkeleton />
  </div>
);

export const Default = (args) => (
  <div style={{ width: args.defaultWidth }}>
    <FluidSearch {...args} />
  </div>
);

Default.args = {
  defaultWidth: 400,
  closeButtonLabelText: 'Clear search input',
  disabled: false,
  labelText: 'Search',
  placeholder: 'Prompt text',
};

Default.argTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  closeButtonLabelText: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  defaultValue: {
    control: {
      type: 'text',
    },
  },
  labelText: {
    control: {
      type: 'text',
    },
  },
  placeholder: {
    control: {
      type: 'text',
    },
  },
};



File: FluidSearch/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { FluidSearchProps } from './FluidSearch';
import type { FluidSearchSkeletonProps } from './FluidSearch.Skeleton';
export { default, default as FluidSearch } from './FluidSearch';
export { type FluidSearchProps, type FluidSearchSkeletonProps };
export { default as FluidSearchSkeleton } from './FluidSearch.Skeleton';



File: FluidSearch/FluidSearch.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as FluidSearchStories from './FluidSearch.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />


# Fluid Search

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/FluidSearch)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/Search/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/Search/accessibility)


{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [Skeleton](#skeleton)
- [Accessibility Considerations](#accessibility-considerations)
  - [Accessible Name](#accessible-name)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={FluidSearchStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidSearchStories.Default),
    },
  ]}
/>

### Skeleton

<Canvas
  of={FluidSearchStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidSearchStories.Skeleton),
    },
  ]}
/>

## Accessibility Considerations

### Accessible Name

To comply with accessibility requirements, make sure to supply the component
with an accessible name by providing either the `aria-label`, `aria-labelledby`
or `title` attribute. Read more on the accessible naming rule
[here](https://able.ibm.com/rules/archives/latest/doc/en-US/aria_accessiblename_exists.html).

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/FluidSearch/FluidSearch.mdx).



