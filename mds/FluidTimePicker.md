File: FluidTimePicker/FluidTimePicker.Skeleton.tsx


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { FluidTextInputSkeleton } from '../FluidTextInput';
import { FluidSelectSkeleton } from '../FluidSelect';

export interface FluidTimePickerSkeletonProps {
  /**
   * Specify an optional className to add.
   */
  className?: string;
  /**
   * Specify if there are only two TimePicker elements
   */
  isOnlyTwo?: boolean;
}

const FluidTimePickerSkeleton = ({ className, isOnlyTwo, ...rest }) => {
  const prefix = usePrefix();
  const wrapperClasses = cx(
    className,
    `${prefix}--time-picker--fluid--skeleton`,
    {
      [`${prefix}--time-picker--equal-width`]: isOnlyTwo,
    }
  );

  return (
    <div className={wrapperClasses} {...rest}>
      <FluidTextInputSkeleton />
      <FluidSelectSkeleton />
      {!isOnlyTwo ? <FluidSelectSkeleton /> : null}
    </div>
  );
};

FluidTimePickerSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify if there are only two TimePicker elements
   */
  isOnlyTwo: PropTypes.bool,
};

export default FluidTimePickerSkeleton;



File: FluidTimePicker/index.tsx


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FluidTimePicker from './FluidTimePicker';
import { type FluidTimePickerProps } from './FluidTimePicker';
import { type FluidTimePickerSkeletonProps } from './FluidTimePicker.Skeleton';
export { default as FluidTimePickerSkeleton } from './FluidTimePicker.Skeleton';
export type { FluidTimePickerProps, FluidTimePickerSkeletonProps };
export default FluidTimePicker;
export { FluidTimePicker };



File: FluidTimePicker/FluidTimePicker.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as FluidTimePickerStories from './FluidTimePicker.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />


# Fluid TimePicker

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/FluidTimePicker)

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
  of={FluidTimePickerStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidTimePickerStories.Default),
    },
  ]}
/>

### Skeleton

<Canvas
  of={FluidTimePickerStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidTimePickerStories.Skeleton),
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
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/FluidTimePicker/FluidTimePicker.mdx).



File: FluidTimePicker/FluidTimePicker.stories.js


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidTimePicker from '../FluidTimePicker';
import FluidTimePickerSelect from '../FluidTimePickerSelect';
import FluidTimePickerSkeleton from './FluidTimePicker.Skeleton';
import SelectItem from '../SelectItem';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { Information } from '@carbon/icons-react';
import mdx from './FluidTimePicker.mdx';

export default {
  title: 'Components/Fluid Components/FluidTimePicker',
  component: FluidTimePicker,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  subcomponents: {
    FluidTimePickerSelect,
    FluidTimePickerSkeleton,
  },
};

const ToggleTip = (
  <>
    <ToggletipLabel>Clock</ToggletipLabel>
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

export const Skeleton = () => (
  <div style={{ width: '300px' }}>
    <FluidTimePickerSkeleton />
    <br />
    <br />
    <FluidTimePickerSkeleton isOnlyTwo />
  </div>
);

export const Default = (args) => {
  return (
    <div style={{ width: '350px' }}>
      <FluidTimePicker id="time-picker-1" {...args}>
        <FluidTimePickerSelect id="select-1" labelText={ToggleTip}>
          <SelectItem value="am" text="AM" />
          <SelectItem value="pm" text="PM" />
        </FluidTimePickerSelect>
        <FluidTimePickerSelect id="select-2" labelText="Timezone">
          <SelectItem value="et" text="Eastern Time (ET)" />
          <SelectItem value="ct" text="Central Time (CT)" />
          <SelectItem value="mt" text="Mountain Time (MT)" />
          <SelectItem value="pt" text="Pacific Time (PT)" />
        </FluidTimePickerSelect>
      </FluidTimePicker>
      <br />
      <br />
      <FluidTimePicker
        id="time-picker-2"
        labelText="Time"
        placeholder="hh:mm"
        {...args}>
        <FluidTimePickerSelect id="select-3" labelText={ToggleTip}>
          <SelectItem value="am" text="AM" />
          <SelectItem value="pm" text="PM" />
        </FluidTimePickerSelect>
      </FluidTimePicker>
    </div>
  );
};

Default.args = {
  labelText: 'Time',
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  placeholder: 'hh:mm',
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

Default.argTypes = {
  disabled: {
    control: { type: 'boolean' },
  },
  labelText: {
    control: { type: 'string' },
  },
  invalid: {
    control: { type: 'boolean' },
  },
  invalidText: {
    control: { type: 'text' },
  },
  placeholder: {
    control: { type: 'text' },
  },
  warn: {
    control: { type: 'boolean' },
  },
  warnText: {
    control: { type: 'text' },
  },
};



File: FluidTimePicker/FluidTimePicker.tsx


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FluidTextInput, { FluidTextInputProps } from '../FluidTextInput';
import { usePrefix } from '../../internal/usePrefix';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';

export interface FluidTimePickerProps extends FluidTextInputProps {
  /**
   * The child node(s)
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the outer FluidTimePicker wrapper
   */
  className?: string;

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;

  /**
   * Specify whether or not the control is invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in error state
   */
  invalidText?: React.ReactNode;

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: React.ReactNode;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;

  /**
   * Specify if the component is readonly
   */
  readOnly?: boolean;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const FluidTimePicker = React.forwardRef<
  HTMLInputElement,
  FluidTimePickerProps
>(
  (
    {
      className,
      children,
      disabled,
      invalid,
      invalidText,
      warn,
      warnText,
      readOnly,
      ...other
    },
    ref
  ) => {
    const prefix = usePrefix();
    const classNames = classnames(className, {
      [`${prefix}--time-picker--fluid`]: true,
      [`${prefix}--time-picker--equal-width`]:
        React.Children.toArray(children).length !== 2,
      [`${prefix}--time-picker--fluid--disabled`]: disabled,
      [`${prefix}--time-picker--fluid--invalid`]: invalid,
      [`${prefix}--time-picker--fluid--warning`]: warn,
    });

    const errorText = () => {
      if (invalid) {
        return invalidText;
      }
      if (warn) {
        return warnText;
      }
    };

    const error = invalid || warn;

    const childrenWithProps = () => {
      if (disabled) {
        return React.Children.toArray(children).map((child) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
          React.cloneElement(child as React.ReactElement<any>, {
            disabled: true,
          })
        );
      }
      if (readOnly) {
        return React.Children.toArray(children).map((child) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
          React.cloneElement(child as React.ReactElement<any>, {
            readOnly: true,
          })
        );
      }
      return children;
    };

    return (
      <div className={classNames}>
        <div className={`${prefix}--time-picker--fluid__wrapper`}>
          <div className={`${prefix}--time-picker__input`}>
            <FluidTextInput
              ref={ref}
              readOnly={readOnly}
              disabled={disabled}
              {...other}
            />
          </div>
          {childrenWithProps()}
        </div>
        {error && <hr className={`${prefix}--time-picker__divider`} />}
        {error && (
          <div className={`${prefix}--form-requirement`}>{errorText()}</div>
        )}
        {error && invalid ? (
          <WarningFilled
            className={`${prefix}--time-picker__icon ${prefix}--time-picker__icon--invalid`}
          />
        ) : (
          <WarningAltFilled
            className={`${prefix}--time-picker__icon ${prefix}--time-picker__icon--warn`}
          />
        )}
      </div>
    );
  }
);

FluidTimePicker.propTypes = {
  /**
   * The child node(s)
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the outer FluidTimePicker wrapper
   */
  className: PropTypes.string,

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether or not the control is invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in error state
   */
  invalidText: PropTypes.node,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,

  /**
   * Whether or not the component is readonly
   */
  readOnly: PropTypes.bool,
};

export default FluidTimePicker;



