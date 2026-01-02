File: FluidDatePicker/FluidDatePicker.tsx


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import classnames from 'classnames';
import DatePicker from '../DatePicker';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';
import React from 'react';

export interface FluidDatePickerProps {
  /**
   * The child node(s)
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className?: string;
  /**
   * Specify whether or not the control is invalid
   */
  invalid?: boolean;
  /**
   * Provide the text that is displayed when the control is in error state
   */
  invalidText?: React.ReactNode;
  /**
   * Whether the input should be read-only
   */
  readOnly?: boolean;
  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;
  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;
}

const FluidDatePicker: React.FC<FluidDatePickerProps> = React.forwardRef<
  HTMLInputElement,
  FluidDatePickerProps
>(function FluidDatePicker(
  {
    className,
    children,
    invalid,
    invalidText,
    readOnly,
    warn,
    warnText,
    ...other
  },
  ref
) {
  const prefix = usePrefix();
  const classNames = classnames(className, {
    [`${prefix}--date-picker--fluid`]: true,
    [`${prefix}--date-picker--fluid--invalid`]: invalid,
    [`${prefix}--date-picker--fluid--readonly`]: readOnly,
    [`${prefix}--date-picker--fluid--warn`]: warn,
  });

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <DatePicker
        invalid={invalid}
        invalidText={invalidText}
        readOnly={readOnly}
        warn={warn}
        warnText={warnText}
        className={classNames}
        ref={ref}
        {...other}>
        {children}
      </DatePicker>
    </FormContext.Provider>
  );
});

FluidDatePicker.propTypes = {
  /**
   * The child node(s)
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className: PropTypes.string,

  /**
   * Specify whether or not the control is invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in error state
   */
  invalidText: PropTypes.node,

  /**
   * Whether the input should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

export default FluidDatePicker;



File: FluidDatePicker/FluidDatePicker.Skeleton.tsx


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
import { Calendar } from '@carbon/icons-react';

export interface FluidDatePickerSkeletonProps {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className?: string;
  /**
   * Specify which variant of the DatePicker the skeleton should mimic
   */
  datePickerType?: 'simple' | 'single' | 'range';
}

const FluidDatePickerSkeleton: React.FC<FluidDatePickerSkeletonProps> = ({
  className,
  datePickerType = 'single',
  ...other
}) => {
  const prefix = usePrefix();

  const classNames = classnames(
    className,
    `${prefix}--form-item ${prefix}--date-picker--fluid__skeleton`,
    {
      [`${prefix}--date-picker--fluid__skeleton--range`]:
        datePickerType === 'range',
    }
  );

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <div className={classNames} {...other}>
        <div className={`${prefix}--date-picker--fluid__skeleton--container`}>
          <span className={`${prefix}--label ${prefix}--skeleton`} />
          <div className={`${prefix}--skeleton ${prefix}--text-input`} />
          {datePickerType !== 'simple' && (
            <Calendar
              className={`${prefix}--date-picker__icon`}
              role="img"
              aria-hidden="true"></Calendar>
          )}
        </div>
        {datePickerType === 'range' && (
          <div className={`${prefix}--date-picker--fluid__skeleton--container`}>
            <span className={`${prefix}--label ${prefix}--skeleton`} />
            <div className={`${prefix}--skeleton ${prefix}--text-input`} />
            <Calendar
              className={`${prefix}--date-picker__icon`}
              role="img"
              aria-hidden="true"></Calendar>
          </div>
        )}
      </div>
    </FormContext.Provider>
  );
};

FluidDatePickerSkeleton.propTypes = {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className: PropTypes.string,

  /**
   * Specify which variant of the DatePicker the skeleton should mimic
   */
  datePickerType: PropTypes.oneOf(['simple', 'single', 'range']),
};

export default FluidDatePickerSkeleton;



File: FluidDatePicker/FluidDatePicker.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as FluidDatePickerStories from './FluidDatePicker.stories.js';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />


# Fluid DatePicker

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/FluidDatePicker)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [Skeleton](#skeleton)
  - [Single](#single)
  - [Range With Calendar](#range-with-calendar)
- [Accessibility Considerations](#accessibility-considerations)
  - [Accessible Name](#accessible-name)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={FluidDatePickerStories.Simple}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidDatePickerStories.Simple),
    },
  ]}
/>

### Skeleton

<Canvas
  of={FluidDatePickerStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidDatePickerStories.Skeleton),
    },
  ]}
/>

### Single

<Canvas
  of={FluidDatePickerStories.Single}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidDatePickerStories.Single),
    },
  ]}
/>

### Range With Calendar

<Canvas
  of={FluidDatePickerStories.RangeWithCalendar}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidDatePickerStories.RangeWithCalendar),
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
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/FluidDatePicker/FluidDatePicker.mdx).



File: FluidDatePicker/index.tsx


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FluidDatePicker from './FluidDatePicker';
import type { FluidDatePickerProps } from './FluidDatePicker';
import { FluidDatePickerSkeletonProps } from './FluidDatePicker.Skeleton';
export type { FluidDatePickerProps, FluidDatePickerSkeletonProps };
export { default as FluidDatePickerSkeleton } from './FluidDatePicker.Skeleton';
export default FluidDatePicker;
export { FluidDatePicker };



File: FluidDatePicker/FluidDatePicker.stories.js


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidDatePicker from '../FluidDatePicker';
import FluidDatePickerInput from '../FluidDatePickerInput';
import FluidDatePickerSkeleton from './FluidDatePicker.Skeleton';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { Information } from '@carbon/icons-react';
import mdx from './FluidDatePicker.mdx';

export default {
  title: 'Components/Fluid Components/FluidDatePicker',
  component: FluidDatePicker,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: [
        'appendTo',
        'disable',
        'enable',
        'inline',
        'light',
        'locale',
        'value',
      ],
    },
  },
  subcomponents: {
    FluidDatePickerSkeleton,
  },
};

const sharedArgs = {
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

const sharedArgTypes = {
  onChange: {
    action: 'clicked',
  },
  onClose: {
    action: 'clicked',
  },
  onOpen: {
    action: 'clicked',
  },
  disabled: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  readOnly: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  invalid: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  invalidText: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
  placeholder: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
  warn: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  warnText: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
};

const ToggleTip = (
  <>
    <ToggletipLabel>Label</ToggletipLabel>
    <Toggletip align="top-left">
      <ToggletipButton label="Show information">
        <Information />
      </ToggletipButton>
      <ToggletipContent>
        <p>Additional field information here.</p>
      </ToggletipContent>
    </Toggletip>
  </>
);

export const Simple = (args) => (
  <div style={{ width: '288px' }}>
    <FluidDatePicker datePickerType="simple" {...args}>
      <FluidDatePickerInput
        placeholder="mm/dd/yyyy"
        labelText={ToggleTip}
        id="date-picker-simple"
        {...args}
      />
    </FluidDatePicker>
  </div>
);

Simple.args = { ...sharedArgs };
Simple.argTypes = { ...sharedArgTypes };

export const Single = (args) => (
  <div style={{ width: '288px' }}>
    <FluidDatePicker datePickerType="single" {...args}>
      <FluidDatePickerInput
        style={{ width: '288px' }}
        placeholder="mm/dd/yyyy"
        labelText={ToggleTip}
        id="date-picker-single"
        {...args}
      />
    </FluidDatePicker>
  </div>
);

Single.args = { ...sharedArgs };
Single.argTypes = { ...sharedArgTypes };

export const RangeWithCalendar = (args) => {
  return (
    <div style={{ width: '288px' }}>
      <FluidDatePicker datePickerType="range" {...args}>
        <FluidDatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText={ToggleTip}
          size="md"
          {...args}
        />
        <FluidDatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
          {...args}
        />
      </FluidDatePicker>
    </div>
  );
};

RangeWithCalendar.args = { ...sharedArgs };
RangeWithCalendar.argTypes = { ...sharedArgTypes };

export const Skeleton = () => (
  <div style={{ width: '300px' }}>
    <FluidDatePickerSkeleton
      datePickerType="simple"
      labelText="Label"
      placeholder="Placeholder text"
      id="input-1"
    />
    <br />
    <br />
    <FluidDatePickerSkeleton
      datePickerType="single"
      labelText="Label"
      placeholder="Placeholder text"
      id="input-2"
    />
    <br />
    <br />
    <FluidDatePickerSkeleton
      datePickerType="range"
      labelText="Label"
      placeholder="Placeholder text"
      id="input-3"
    />
  </div>
);



