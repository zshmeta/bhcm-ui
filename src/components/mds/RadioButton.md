File: RadioButton/RadioButton.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { cloneElement, useRef, type ReactNode } from 'react';
import classNames from 'classnames';
import { Text } from '../Text';
import { deprecate } from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import { mergeRefs } from '../../tools/mergeRefs';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';
import { useNormalizedInputProps } from '../../internal/useNormalizedInputProps';

type ExcludedAttributes = 'onChange';

export interface RadioButtonProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    ExcludedAttributes
  > {
  /**
   * Specify whether the `<RadioButton>` is currently checked
   */
  checked?: boolean;

  /**
   * Provide an optional className to be applied to the containing node
   */
  className?: string;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `RadioButton` component
   */
  decorator?: ReactNode;

  /**
   * Specify whether the `<RadioButton>` should be checked by default
   */
  defaultChecked?: boolean;

  /**
   * Specify whether the control is disabled
   */
  disabled?: boolean;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;

  /**
   * Provide a unique id for the underlying `<input>` node
   */
  id?: string;

  /**
   * Provide where label text should be placed
   * NOTE: `top`/`bottom` are deprecated
   */
  labelPosition?: 'left' | 'right';

  /**
   * Provide label text to be read by screen readers when interacting with the
   * control
   */
  labelText: ReactNode;

  /**
   * Provide a name for the underlying `<input>` node
   */
  name?: string;

  /**
   * Provide an optional `onChange` hook that is called each time the value of
   * the underlying `<input>` changes
   */
  onChange?: (
    value: RadioButtonProps['value'],
    name: RadioButtonProps['name'],
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  /**
   * Provide a handler that is invoked when a user clicks on the control
   */
  onClick?: (evt: React.MouseEvent<HTMLInputElement>) => void;

  /**
   * @deprecated please use decorator instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `RadioButton` component
   */
  slug?: ReactNode;

  /**
   * Specify the value of the `<RadioButton>`
   */
  value?: string | number;

  /**
   * `true` to specify if the input is required.
   */
  required?: boolean;

  /**
   * Specify whether the control is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: ReactNode;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNode;

  /**
   * Specify whether the RadioButton should be read-only
   */
  readOnly?: boolean;
}

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (props, ref) => {
    const {
      className,
      decorator,
      disabled = false,
      hideLabel,
      id,
      labelPosition = 'right',
      labelText = '',
      name,
      onChange = () => {},
      value = '',
      slug,
      required,
      invalid = false,
      invalidText,
      warn = false,
      warnText,
      readOnly,
      ...rest
    } = props;

    const prefix = usePrefix();
    const uid = useId('radio-button');
    const uniqueId = id || uid;

    const normalizedProps = useNormalizedInputProps({
      id: uniqueId,
      readOnly,
      disabled,
      invalid,
      invalidText,
      warn,
      warnText,
    });

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
      onChange(value, name, event);
    }

    const innerLabelClasses = classNames(
      `${prefix}--radio-button__label-text`,
      {
        [`${prefix}--visually-hidden`]: hideLabel,
      }
    );

    const wrapperClasses = classNames(
      className,
      `${prefix}--radio-button-wrapper`,
      {
        [`${prefix}--radio-button-wrapper--label-${labelPosition}`]:
          labelPosition !== 'right',
        [`${prefix}--radio-button-wrapper--slug`]: slug,
        [`${prefix}--radio-button-wrapper--decorator`]: decorator,
        [`${prefix}--radio-button-wrapper--invalid`]: normalizedProps.invalid,
        [`${prefix}--radio-button-wrapper--warning`]: normalizedProps.warn,
      }
    );

    const inputRef = useRef<HTMLInputElement>(null);

    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator = candidateIsAILabel
      ? cloneElement(candidate, {
          size: candidate.props?.['kind'] === 'inline' ? 'md' : 'mini',
        })
      : candidate;

    return (
      <div className={wrapperClasses}>
        <input
          {...rest}
          type="radio"
          className={`${prefix}--radio-button`}
          onChange={handleOnChange}
          id={uniqueId}
          ref={mergeRefs(inputRef, ref)}
          disabled={normalizedProps.disabled}
          value={value}
          name={name}
          required={required}
          readOnly={readOnly}
        />
        <label htmlFor={uniqueId} className={`${prefix}--radio-button__label`}>
          <span className={`${prefix}--radio-button__appearance`} />
          {labelText && (
            <Text className={innerLabelClasses}>
              {labelText}
              {slug ? (
                normalizedDecorator
              ) : decorator ? (
                <div
                  className={`${prefix}--radio-button-wrapper-inner--decorator`}>
                  {normalizedDecorator}
                </div>
              ) : (
                ''
              )}
            </Text>
          )}
        </label>
        {normalizedProps.validation}
      </div>
    );
  }
);

RadioButton.displayName = 'RadioButton';

RadioButton.propTypes = {
  /**
   * Specify whether the `<RadioButton>` is currently checked
   */
  checked: PropTypes.bool,

  /**
   * Provide an optional className to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * **Experimental**: Provide a decorator component to be rendered inside the `RadioButton` component
   */
  decorator: PropTypes.node,

  /**
   * Specify whether the `<RadioButton>` should be checked by default
   */
  defaultChecked: PropTypes.bool,

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Provide a unique id for the underlying `<input>` node
   */
  id: PropTypes.string,

  /**
   * Provide where label text should be placed
   * NOTE: `top`/`bottom` are deprecated
   */
  labelPosition: PropTypes.oneOf(['right', 'left']),

  /**
   * Provide label text to be read by screen readers when interacting with the
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Provide a name for the underlying `<input>` node
   */
  name: PropTypes.string,

  /**
   * Provide an optional `onChange` hook that is called each time the value of
   * the underlying `<input>` changes
   */
  onChange: PropTypes.func,

  /**
   * Provide a handler that is invoked when a user clicks on the control
   */
  onClick: PropTypes.func,

  /**
   * `true` to specify if the control is required.
   */
  required: PropTypes.bool,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,

  /**
   * Specify whether the RadioButton should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `RadioButton` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),

  /**
   * Specify the value of the `<RadioButton>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default RadioButton;



File: RadioButton/RadioButton.Skeleton.tsx


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

export interface RadioButtonSkeletonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Specify an optional className to add.
   */
  className?: string;
}

function RadioButtonSkeleton(props: RadioButtonSkeletonProps) {
  const { className, ...rest } = props;
  const prefix = usePrefix();
  return (
    <div className={cx(`${prefix}--radio-button-wrapper`, className)} {...rest}>
      <div className={`${prefix}--radio-button ${prefix}--skeleton`} />
      <span className={`${prefix}--radio-button__label ${prefix}--skeleton`} />
    </div>
  );
}

RadioButtonSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default RadioButtonSkeleton;
export { RadioButtonSkeleton };



File: RadioButton/RadioButton.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as RadioButtonStories from './RadioButton.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# RadioButton

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/RadioButton)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/radio-button/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/radio-button/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Vertical](#vertical)
- [Skeleton](#skeleton)
- [AI Label](#ai-label)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

Radio buttons represent a group of mutually exclusive choices, compared to
checkboxes that allow users to make one or more selections from a group. In use
cases where only one selection from a group is allowed, use the radio button
component instead of the checkbox. Though the `RadioButton` components may be
rendered individually, it is recommended they be rendered as children components
of the `RadioButtonGroup` parent component to maintain their proper controlled
states.

<Canvas
  of={RadioButtonStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(RadioButtonStories.Default),
    },
  ]}
/>

## Vertical
<Canvas
  of={RadioButtonStories.Vertical}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(RadioButtonStories.Vertical),
    },
  ]}
/>

## Skeleton
<Canvas
  of={RadioButtonStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(RadioButtonStories.Skeleton),
    },
  ]}
/>

## AI Label
<Canvas
  of={RadioButtonStories.withAILabel}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(RadioButtonStories.withAILabel),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/RadioButton/RadioButton.mdx).



File: RadioButton/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import RadioButton, { RadioButtonProps } from './RadioButton';

export default RadioButton;
export { RadioButton };

export type { RadioButtonProps };



File: RadioButton/RadioButton.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import RadioButton from './RadioButton';
import RadioButtonGroup from '../RadioButtonGroup';
import RadioButtonSkeleton from './RadioButton.Skeleton';
import React from 'react';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import mdx from './RadioButton.mdx';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  subcomponents: {
    RadioButtonGroup,
    RadioButtonSkeleton,
  },
  argTypes: {
    checked: {
      table: {
        disable: true,
      },
    },
    defaultChecked: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Vertical = () => {
  return (
    <RadioButtonGroup
      legendText="Group label"
      name="radio-button-vertical-group"
      defaultSelected="radio-1"
      orientation="vertical">
      <RadioButton
        labelText="Radio button label"
        value="radio-1"
        id="radio-1"
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-2"
        id="radio-2"
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-3"
        id="radio-3"
        disabled
      />
    </RadioButtonGroup>
  );
};

export const Skeleton = () => {
  return <RadioButtonSkeleton />;
};

export const withAILabel = () => {
  const AILabelFunc = (kind) => (
    <AILabel className="ai-label-container" kind={kind}>
      <AILabelContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h2 className="ai-label-heading">84%</h2>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <hr />
          <p className="secondary">Model type</p>
          <p className="bold">Foundation model</p>
        </div>
        <AILabelActions>
          <IconButton kind="ghost" label="View">
            <View />
          </IconButton>
          <IconButton kind="ghost" label="Open Folder">
            <FolderOpen />
          </IconButton>
          <IconButton kind="ghost" label="Folders">
            <Folders />
          </IconButton>
          <Button>View details</Button>
        </AILabelActions>
      </AILabelContent>
    </AILabel>
  );

  return (
    <div className="ai-label-check-radio-container">
      <RadioButtonGroup
        decorator={AILabelFunc('default')}
        orientation="vertical"
        legendText="Group label"
        name="radio-button-group"
        defaultSelected="radio-1">
        <RadioButton
          labelText="Radio button label"
          value="radio-1"
          id="radio-1"
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-2"
          id="radio-2"
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-3"
          id="radio-3"
        />
      </RadioButtonGroup>

      <RadioButtonGroup
        orientation="vertical"
        legendText="Group label"
        name="radio-button-group-2"
        defaultSelected="radio-4">
        <RadioButton
          labelText="Radio button label"
          value="radio-4"
          id="radio-4"
          decorator={AILabelFunc()}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-5"
          id="radio-5"
          decorator={AILabelFunc()}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-6"
          id="radio-6"
        />
      </RadioButtonGroup>

      <RadioButtonGroup
        orientation="vertical"
        legendText="Group label"
        name="radio-button-group-3"
        defaultSelected="radio-7">
        <RadioButton
          labelText="Radio button label"
          value="radio-7"
          id="radio-7"
          decorator={AILabelFunc('inline')}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-8"
          id="radio-8"
          decorator={AILabelFunc('inline')}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-9"
          id="radio-9"
        />
      </RadioButtonGroup>
    </div>
  );
};

export const Default = (args) => {
  return (
    <RadioButtonGroup
      legendText="Radio Button group"
      name="radio-button-default-group"
      {...args}>
      <RadioButton
        labelText="Radio button label"
        value="radio-1"
        id="radio-1"
        hideLabel={args.hideLabel}
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-2"
        id="radio-2"
        hideLabel={args.hideLabel}
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-3"
        id="radio-3"
        hideLabel={args.hideLabel}
      />
    </RadioButtonGroup>
  );
};

Default.args = {
  defaultSelected: 'radio-2',
  helperText: 'Helper text',
  hideLabel: false,
  invalidText: 'Invalid selection',
  warn: false,
  warnText: 'Please notice the warning',
};

Default.argTypes = {
  defaultSelected: {
    description: 'Specify the `<RadioButton>` to be selected by default',
    options: ['radio-1', 'radio-2', 'radio-3'],
    control: {
      type: 'select',
    },
  },
  readOnly: {
    description: 'Specify whether the RadioButtonGroup is read-only',
    control: {
      type: 'boolean',
    },
  },
  helperText: {
    description:
      'Provide text that is used alongside the control label for additional help',
    control: {
      type: 'text',
    },
  },
  hideLabel: {
    description:
      'Specify whether the label should be visually hidden but still available to screen readers',
    control: {
      type: 'boolean',
    },
  },
  invalid: {
    description: 'Specify whether the RadioButtonGroup is invalid',
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    description:
      'Provide the text that is displayed when the control is in an invalid state',
    control: {
      type: 'text',
    },
  },
  orientation: {
    description: 'Provide how radio buttons should be displayed',
    control: 'select',
    options: ['horizontal', 'vertical'],
  },
  warn: {
    description: 'Specify whether the control is currently in warning state',
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    description:
      'Provide the text that is displayed when the control is in warning state',
    control: {
      type: 'text',
    },
  },
};



File: RadioButton/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-radiobutton--default'
    }
  ]}
/>


File: RadioButton/migrate-to-7.x.md


# Properties

`<RadioButton>`

| Property                                    | v9                                       | v10                 |
| ------------------------------------------- | ---------------------------------------- | ------------------- |
| `ref`                                       | Grabs the React class instance reference | Grabs the `<input>` |
| `top`/`bottom` for `labelPosition` property |                                          | Removed             |

# CSS

`<RadioButtonSkeleton>`

No longer adds `radioButtonWrapper` class to the top-level element. Please use
`cds--radio-button-wrapper` for style overrides.



