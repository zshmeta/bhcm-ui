File: Checkbox/Checkbox.mdx


import { Story, Canvas, ArgTypes, Meta } from '@storybook/addon-docs/blocks';
import Checkbox, { CheckboxSkeleton } from '../Checkbox';
import * as CheckboxStories from './Checkbox.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Checkbox

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Checkbox)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/checkbox/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/checkbox/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [Controlled example](#controlled-example)
- [Horizontal](#horizontal)
- [Single](#single)
- [Skeleton state](#skeleton-state)
- [With AI label](#with-ai-label)
- [Component API](#component-api)
  - [Checkbox id](#checkbox-id)
  - [Checkbox labelText](#checkbox-labeltext)
  - [Checkbox onChange](#checkbox-onchange)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

You can build a checkbox using the `Checkbox` in combination with a `<fieldset>`
element to group controls and `<legend>` element for the label.

<Canvas
  of={CheckboxStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(CheckboxStories.Default),
    },
  ]}
/>

### Controlled example

You can also use a controlled checkbox component driven by state:

```jsx
function ExampleComponent() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Checkbox
      id="checkbox"
      labelText="checkbox"
      checked={isChecked}
      onChange={(_, { checked }) => setIsChecked(checked)}
    />
  );
}
```

## Horizontal

<Canvas
  of={CheckboxStories.Horizontal}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(CheckboxStories.Horizontal),
    },
  ]}
/>

## Single

<Canvas
  of={CheckboxStories.Single}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(CheckboxStories.Single),
    },
  ]}
/>

## Skeleton state

You can use the `CheckboxSkeleton` component to render a skeleton variant of a
checkbox. This is useful to display while content in your checkbox is being
fetched from an external resource like an API.

<Canvas
  of={CheckboxStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(CheckboxStories.Skeleton),
    },
  ]}
/>

## With AI label

<Canvas
  of={CheckboxStories.withAILabel}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(CheckboxStories.withAILabel),
    },
  ]}
/>

## Component API

<ArgTypes />
### Checkbox defaultChecked

You can use the `defaultChecked` prop to specify weather a checkbox is checked
by default or not on page load.

```jsx
<Checkbox defaultChecked labelText={`Checkbox label`} id="checkbox-label-1" />
<Checkbox defaultChecked labelText={`Checkbox label`} id="checkbox-label-2" />
```

### Checkbox id

The `id` should be used to provide each checkbox input with a unique id and is a
required prop.

```jsx
<Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />
<Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
```

### Checkbox labelText

The `labelText` should be used to provide a label that describes the checkbox
input that is being exposed to the user and is a required prop.

```jsx
<Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />
<Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
```

### Checkbox onChange

You can use the `onChange` prop to pass in a custom function for event handling.
This prop receives three arguments: a boolean, the checkbox id, and the dom
event.

```jsx
<Checkbox onChange={()=>{}} labelText={`Checkbox label`} id="checkbox-label-1" />
<Checkbox onChange={()=>{}} labelText={`Checkbox label`} id="checkbox-label-2" />
```

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Checkbox/Checkbox.mdx).



File: Checkbox/Checkbox.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

const CheckboxSkeleton = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => {
  const prefix = usePrefix();
  return (
    <div
      className={cx(
        `${prefix}--form-item`,
        `${prefix}--checkbox-wrapper`,
        `${prefix}--checkbox-skeleton`,
        className
      )}
      {...rest}>
      <div className={`${prefix}--checkbox-label`}>
        <span
          className={`${prefix}--checkbox-label-text ${prefix}--skeleton`}
        />
      </div>
    </div>
  );
};

CheckboxSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default CheckboxSkeleton;
export { CheckboxSkeleton };



File: Checkbox/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Checkbox, { CheckboxProps } from './Checkbox';

export { default as CheckboxSkeleton } from './Checkbox.Skeleton';
export default Checkbox;

export { Checkbox };

export type { CheckboxProps };



File: Checkbox/Checkbox.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { cloneElement, type ReactNode } from 'react';
import classNames from 'classnames';
import { Text } from '../Text';
import { deprecate } from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import { useId } from '../../internal/useId';
import { noopFn } from '../../internal/noopFn';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';

type ExcludedAttributes = 'id' | 'onChange' | 'onClick' | 'type';

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    ExcludedAttributes
  > {
  /**
   * Provide an `id` to uniquely identify the Checkbox input
   */
  id: string;

  /**
   * Provide a label to provide a description of the Checkbox input that you are
   * exposing to the user
   */
  labelText: NonNullable<ReactNode>;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `Checkbox` component
   */
  decorator?: ReactNode;

  /**
   * Specify whether the underlying input should be checked by default
   */
  defaultChecked?: boolean;

  /**
   * Specify whether the Checkbox should be disabled
   */
  disabled?: boolean;

  /**
   * Provide text for the form group for additional help
   */
  helperText?: ReactNode;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;

  /**
   * Specify whether the Checkbox is in an indeterminate state
   */
  indeterminate?: boolean;

  /**
   * Specify whether the Checkbox is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the Checkbox is in an invalid state
   */
  invalidText?: ReactNode;

  /**
   * @deprecated please use decorator instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Checkbox` component
   */
  slug?: ReactNode;

  /**
   * Specify whether the Checkbox is currently invalid
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the Checkbox is in an invalid state
   */
  warnText?: ReactNode;

  /**
   * Provide an optional handler that is called when the internal state of
   * Checkbox changes. This handler is called with event and state info.
   * `(event, { checked, id }) => void`
   */
  onChange?: (
    evt: React.ChangeEvent<HTMLInputElement>,
    data: { checked: boolean; id: string }
  ) => void;

  /**
   * Provide an optional onClick handler that is called on click
   */
  onClick?: (evt: React.MouseEvent<HTMLInputElement>) => void;
}

const Checkbox = React.forwardRef(
  (
    {
      className,
      decorator,
      helperText,
      id,
      labelText,
      onChange = noopFn,
      onClick,
      indeterminate = false,
      invalid,
      invalidText,
      hideLabel,
      readOnly,
      title = '',
      warn,
      warnText,
      slug,
      ...other
    }: CheckboxProps,
    ref
  ) => {
    const prefix = usePrefix();

    const showWarning = !readOnly && !invalid && warn;
    const showHelper = !invalid && !warn;

    const checkboxGroupInstanceId = useId();

    const helperId = !helperText
      ? undefined
      : `checkbox-helper-text-${checkboxGroupInstanceId}`;

    const helper = helperText ? (
      <div id={helperId} className={`${prefix}--form__helper-text`}>
        {helperText}
      </div>
    ) : null;

    const wrapperClasses = classNames(
      `${prefix}--form-item`,
      `${prefix}--checkbox-wrapper`,
      className,
      {
        [`${prefix}--checkbox-wrapper--readonly`]: readOnly,
        [`${prefix}--checkbox-wrapper--invalid`]: !readOnly && invalid,
        [`${prefix}--checkbox-wrapper--warning`]: showWarning,
        [`${prefix}--checkbox-wrapper--slug`]: slug,
        [`${prefix}--checkbox-wrapper--decorator`]: decorator,
      }
    );
    const innerLabelClasses = classNames(`${prefix}--checkbox-label-text`, {
      [`${prefix}--visually-hidden`]: hideLabel,
    });

    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator = candidateIsAILabel
      ? cloneElement(candidate, {
          size: candidate.props.kind === 'inline' ? 'md' : 'mini',
        })
      : candidate;

    return (
      <div className={wrapperClasses}>
        <input
          {...other}
          type="checkbox"
          data-invalid={invalid ? true : undefined}
          onChange={(evt) => {
            if (!readOnly && onChange) {
              onChange(evt, { checked: evt.target.checked, id });
            }
          }}
          className={`${prefix}--checkbox`}
          id={id}
          ref={(el) => {
            if (el) {
              el.indeterminate = indeterminate ?? false;
            }
            if (typeof ref === 'function') {
              ref(el);
            } else if (ref && 'current' in ref) {
              ref.current = el;
            }
          }}
          // readonly attribute not applicable to type="checkbox"
          // see - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
          aria-readonly={readOnly}
          onClick={(evt) => {
            if (readOnly) {
              // prevent default stops the checkbox being updated
              evt.preventDefault();
            }
            // pass onClick event on to the user even if readonly
            if (onClick) {
              onClick(evt);
            }
          }}
        />
        <label
          htmlFor={id}
          className={`${prefix}--checkbox-label`}
          title={title}>
          <Text className={innerLabelClasses}>
            {labelText}
            {slug ? (
              normalizedDecorator
            ) : decorator ? (
              <div className={`${prefix}--checkbox-wrapper-inner--decorator`}>
                {normalizedDecorator}
              </div>
            ) : (
              ''
            )}
          </Text>
        </label>
        <div className={`${prefix}--checkbox__validation-msg`}>
          {!readOnly && invalid && (
            <>
              <WarningFilled className={`${prefix}--checkbox__invalid-icon`} />
              <div className={`${prefix}--form-requirement`}>{invalidText}</div>
            </>
          )}
          {showWarning && (
            <>
              <WarningAltFilled
                className={`${prefix}--checkbox__invalid-icon ${prefix}--checkbox__invalid-icon--warning`}
              />
              <div className={`${prefix}--form-requirement`}>{warnText}</div>
            </>
          )}
        </div>
        {showHelper && helper}
      </div>
    );
  }
);

Checkbox.propTypes = {
  /**
   * Specify whether the underlying input should be checked
   */
  checked: PropTypes.bool,

  /**
   * Specify an optional className to be applied to the <label> node
   */
  className: PropTypes.string,

  /**
   * **Experimental**: Provide a decorator component to be rendered inside the `Checkbox` component
   */
  decorator: PropTypes.node,

  /**
   * Specify whether the underlying input should be checked by default
   */
  defaultChecked: PropTypes.bool,

  /**
   * Specify whether the Checkbox should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide text for the form group for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Provide an `id` to uniquely identify the Checkbox input
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether the Checkbox is in an indeterminate state
   */
  indeterminate: PropTypes.bool,

  /**
   * Specify whether the Checkbox is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the Checkbox is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Provide a label to provide a description of the Checkbox input that you are
   * exposing to the user
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Provide an optional handler that is called when the internal state of
   * Checkbox changes. This handler is called with event and state info.
   * `(event, { checked, id }) => void`
   */
  onChange: PropTypes.func,

  /**
   * Specify whether the Checkbox is read-only
   */
  readOnly: PropTypes.bool,

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Checkbox` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),

  /**
   * Specify a title for the <label> node for the Checkbox
   */
  title: PropTypes.string,

  /**
   * Specify whether the Checkbox is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the Checkbox is in warning state
   */
  warnText: PropTypes.node,
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;



File: Checkbox/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-checkbox--default'
    }
  ]}
/>



File: Checkbox/Checkbox.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import '../AILabel/ailabel-story.scss';
import { default as Checkbox, CheckboxSkeleton } from './';
import mdx from './Checkbox.mdx';
import CheckboxGroup from '../CheckboxGroup';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  subcomponents: {
    CheckboxGroup,
    CheckboxSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: [
        'checked',
        'defaultChecked',
        'hideLabel',
        'id',
        'indeterminate',
        'labelText',
        'title',
      ],
    },
  },
};

const sharedArgs = {
  helperText: 'Helper text goes here',
  invalid: false,
  invalidText: 'Invalid message goes here',
  warn: false,
  warnText: 'Warning message goes here',
};

const sharedArgTypes = {
  helperText: {
    description: 'Provide text for the form group for additional help',
    control: {
      type: 'text',
    },
  },
  invalid: {
    description: 'Specify whether the form group is currently invalid',
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    description:
      'Provide the text that is displayed when the form group is in an invalid state',
    control: {
      type: 'text',
    },
  },
  legendText: {
    description:
      'Provide the text to be rendered inside of the fieldset <legend>',
    control: {
      type: 'text',
    },
  },
  readOnly: {
    description: 'Specify whether the CheckboxGroup is read-only',
    control: {
      type: 'boolean',
    },
  },
  warn: {
    description: 'Specify whether the form group is currently in warning state',
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    description:
      'Provide the text that is displayed when the form group is in warning state',
    control: {
      type: 'text',
    },
  },
  orientation: {
    description: 'Provide how checkbox should be displayed',
    control: 'select',
    options: ['horizontal', 'vertical'],
  },
};

export const Default = (args) => (
  <CheckboxGroup className="some-class" legendText="Group label" {...args}>
    <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />
    <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
  </CheckboxGroup>
);

Default.args = {
  ...sharedArgs,
};

Default.argTypes = { ...sharedArgTypes };

export const Horizontal = (args) => {
  return (
    <CheckboxGroup
      orientation="horizontal"
      className="some-class"
      legendText="Group label"
      helperText="Helper text goes here"
      {...args}>
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-3" />
    </CheckboxGroup>
  );
};

Horizontal.args = { ...sharedArgs };

Horizontal.argTypes = { ...sharedArgTypes };

export const Single = () => {
  const checkboxEvents = {
    className: 'some-class',
    labelText: 'Checkbox label',
  };
  return (
    <>
      <Checkbox
        {...checkboxEvents}
        id="checkbox-3"
        helperText="Helper text goes here"
      />
      <br /> <br />
      <Checkbox
        {...checkboxEvents}
        id="checkbox-4"
        invalid
        invalidText="Invalid text goes here"
      />
      <br /> <br />
      <Checkbox
        {...checkboxEvents}
        id="checkbox-5"
        warn
        warnText="Warning text goes here"
      />
      <br /> <br />
      <Checkbox {...checkboxEvents} id="checkbox-6" readOnly />
    </>
  );
};

export const Skeleton = () => {
  return <CheckboxSkeleton />;
};

export const withAILabel = (args) => {
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
      <CheckboxGroup
        legendText="Group Label"
        decorator={AILabelFunc()}
        {...args}>
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-3" />
      </CheckboxGroup>

      <CheckboxGroup legendText="Group Label" {...args}>
        <Checkbox
          labelText={`Checkbox label`}
          id="checkbox-label-4"
          decorator={AILabelFunc()}
        />
        <Checkbox
          labelText={`Checkbox label`}
          id="checkbox-label-5"
          decorator={AILabelFunc()}
        />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-6" />
      </CheckboxGroup>

      <CheckboxGroup legendText="Group Label" {...args}>
        <Checkbox
          labelText={`Checkbox label`}
          id="checkbox-label-7"
          decorator={AILabelFunc('inline')}
        />
        <Checkbox
          labelText={`Checkbox label`}
          id="checkbox-label-8"
          decorator={AILabelFunc('inline')}
        />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-9" />
      </CheckboxGroup>
    </div>
  );
};

withAILabel.args = {
  invalid: false,
  invalidText: 'Invalid message goes here',
  readOnly: false,
  warn: false,
  warnText: 'Warning message goes here',
};

withAILabel.argTypes = { ...sharedArgTypes };



