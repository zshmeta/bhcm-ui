File: Select/Select.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import { default as Select, SelectSkeleton } from '../Select';
import SelectItem from '../SelectItem';
import SelectItemGroup from '../SelectItemGroup';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import mdx from './Select.mdx';

export default {
  title: 'Components/Select',
  component: Select,
  args: {
    disabled: false,
    inline: false,
    noLabel: false,
    hideLabel: false,
    invalid: false,
    warn: false,
    size: 'md',
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [(story) => <div style={{ width: '400px' }}>{story()}</div>],
  subcomponents: {
    SelectItem,
    SelectItemGroup,
    SelectSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['id', 'defaultValue'],
    },
  },
};

export const Inline = (args) => {
  return (
    <div>
      <Select
        inline
        id="select-1"
        labelText="Select an option"
        helperText="Optional helper text"
        {...args}>
        <SelectItem value="" text="" />
        <SelectItem value="option-1" text="Option 1" />
        <SelectItem value="option-2" text="Option 2" />
        <SelectItem value="option-3" text="Option 3" />
        <SelectItem value="option-4" text="Option 4" />
      </Select>
    </div>
  );
};

Inline.args = {
  inline: true,
};

export const Skeleton = () => {
  return <SelectSkeleton />;
};

export const _WithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <Select
        id={`select-${layer}`}
        labelText=""
        helperText="Optional helper text"
        {...args}>
        <SelectItem value="" text="" />
        <SelectItem
          value="An example option that is really long to show what should be done to handle long text"
          text="An example option that is really long to show what should be done to handle long text"
        />
        <SelectItem value="option-2" text="Option 2" />
      </Select>
    )}
  </WithLayer>
);

_WithLayer.argTypes = {
  inline: {
    control: false,
  },
};

export const withAILabel = (args) => {
  const aiLabel = (
    <AILabel className="ai-label-container">
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
    <div>
      <Select
        id="select-1"
        labelText="Select an option"
        helperText="Optional helper text"
        decorator={aiLabel}
        {...args}>
        <SelectItem value="" text="" />
        <SelectItem
          value="An example option that is really long to show what should be done to handle long text"
          text="An example option that is really long to show what should be done to handle long text"
        />
        <SelectItem value="option-2" text="Option 2" />
        <SelectItem value="option-3" text="Option 3" />
        <SelectItem value="option-4" text="Option 4" />
      </Select>
    </div>
  );
};

withAILabel.argTypes = {
  inline: {
    control: false,
  },
};

export const Default = (args) => {
  return (
    <div>
      <Select
        id="select-1"
        labelText="Select an option"
        helperText="Optional helper text"
        {...args}>
        <SelectItem value="" text="" />
        <SelectItem
          value="An example option that is really long to show what should be done to handle long text"
          text="An example option that is really long to show what should be done to handle long text"
        />
        <SelectItem value="option-2" text="Option 2" />
        <SelectItem value="option-3" text="Option 3" />
        <SelectItem value="option-4" text="Option 4" />
      </Select>
    </div>
  );
};

Default.argTypes = {
  helperText: {
    control: 'text',
  },
  invalidText: { control: 'text' },
  labelText: { control: 'text' },
  warnText: { control: 'text' },
};



File: Select/Select.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  cloneElement,
  useContext,
  useState,
  type ChangeEventHandler,
  type ComponentPropsWithRef,
  type ForwardedRef,
  type ReactNode,
} from 'react';
import classNames from 'classnames';
import {
  ChevronDown,
  WarningFilled,
  WarningAltFilled,
} from '@carbon/icons-react';
import { deprecate } from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import { composeEventHandlers } from '../../tools/events';
import { Text } from '../Text';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';
import { useNormalizedInputProps } from '../../internal/useNormalizedInputProps';

type ExcludedAttributes = 'size';

export interface SelectProps
  extends Omit<ComponentPropsWithRef<'select'>, ExcludedAttributes> {
  /**
   * Provide the contents of your Select
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the node containing the label and the select box
   */
  className?: string;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `Select` component
   */
  decorator?: ReactNode;

  /**
   * Optionally provide the default value of the `<select>`
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  defaultValue?: any;

  /**
   * Specify whether the control is disabled
   */
  disabled?: boolean;

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText?: ReactNode;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;

  /**
   * Specify a custom `id` for the `<select>`
   */
  id: string;

  /**
   * Specify whether you want the inline version of this control
   */
  inline?: boolean;

  /**
   * Specify if the currently value is invalid.
   */
  invalid?: boolean;

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText?: ReactNode;

  /**
   * Provide label text to be read by screen readers when interacting with the control.
   */
  labelText?: ReactNode;

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   *
   * @deprecated The `light` prop for `Select` is no longer needed and has been deprecated in v11 in favor of the new `Layer` component.
   * It will be moved in the next major release.
   */
  light?: boolean;

  /**
   * Reserved for use with Pagination component. Will not render a label for the
   * select since Pagination renders one for us.
   */
  noLabel?: boolean;

  /**
   * Provide an optional `onChange` hook that is called each time the value of the underlying `<input>` changes.
   */
  onChange?: ChangeEventHandler<HTMLSelectElement>;

  /**
   * Whether the select should be read-only
   */
  readOnly?: boolean;

  /**
   * Specify the size of the Select Input.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * @deprecated please use decorator instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Dropdown` component
   */
  slug?: ReactNode;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNode;
}

const Select = React.forwardRef(
  (
    {
      className,
      decorator,
      id,
      inline = false,
      labelText = 'Select',
      disabled = false,
      children,
      // reserved for use with Pagination component
      noLabel = false,
      hideLabel = false,
      invalid = false,
      invalidText = '',
      helperText = '',
      light = false,
      readOnly,
      size,
      warn = false,
      warnText,
      onChange,
      slug,
      ...other
    }: SelectProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    const prefix = usePrefix();
    const { isFluid } = useContext(FormContext);
    const [isFocused, setIsFocused] = useState(false);

    interface SelectItemProps {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      value: any;
      text: string;
    }
    // Convert children to an array of valid elements once using type narrowing
    const validChildren = React.Children.toArray(children).filter(
      (child): child is React.ReactElement<SelectItemProps> =>
        React.isValidElement<SelectItemProps>(child)
    );

    // Find the default option based on the specified defaultValue or value
    const selectedValue = other?.value || other?.defaultValue;
    const selectedOption = validChildren.find(
      (child) => child.props?.value === selectedValue
    );

    // Use the provided title prop, or the selected option's text if available;
    // otherwise, fallback to the first option's text
    const initialTitle =
      other?.title ||
      selectedOption?.props?.text ||
      validChildren[0]?.props?.text ||
      '';

    const [title, setTitle] = useState(initialTitle);
    const normalizedProps = useNormalizedInputProps({
      id,
      disabled,
      readOnly,
      invalid,
      invalidText,
      warn,
      warnText,
    });
    const selectClasses = classNames({
      [`${prefix}--select`]: true,
      [`${prefix}--select--inline`]: inline,
      [`${prefix}--select--light`]: light,
      [`${prefix}--select--invalid`]: normalizedProps.invalid,
      [`${prefix}--select--disabled`]: normalizedProps.disabled,
      [`${prefix}--select--readonly`]: readOnly,
      [`${prefix}--select--warning`]: normalizedProps.warn,
      [`${prefix}--select--fluid--invalid`]: isFluid && normalizedProps.invalid,
      [`${prefix}--select--fluid--focus`]: isFluid && isFocused,
      [`${prefix}--select--slug`]: slug,
      [`${prefix}--select--decorator`]: decorator,
    });
    const labelClasses = classNames(`${prefix}--label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
      [`${prefix}--label--disabled`]: normalizedProps.disabled,
    });
    const inputClasses = classNames({
      [`${prefix}--select-input`]: true,
      [`${prefix}--select-input--${size}`]: size,
    });
    const error = normalizedProps.validation;
    const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: normalizedProps.disabled,
    });

    const helper = helperText ? (
      <Text
        as="div"
        id={normalizedProps.helperId}
        className={helperTextClasses}>
        {helperText}
      </Text>
    ) : null;
    const ariaProps = {};
    if (normalizedProps.invalid) {
      ariaProps['aria-describedby'] = normalizedProps.invalidId;
    } else if (!inline && !isFluid) {
      ariaProps['aria-describedby'] = helper
        ? normalizedProps.helperId
        : undefined;
    }

    const handleFocus = (evt) => {
      setIsFocused(evt.type === 'focus' ? true : false);
    };

    const handleChange = (evt) => {
      const selectedOption = evt?.target?.options[evt.target.selectedIndex];
      setTitle(selectedOption?.text);
    };

    const readOnlyEventHandlers = {
      onMouseDown: (evt) => {
        // NOTE: does not prevent click
        if (readOnly) {
          evt.preventDefault();
          // focus on the element as per readonly input behavior
          evt.target.focus();
        }
      },
      onKeyDown: (evt) => {
        const selectAccessKeys = ['ArrowDown', 'ArrowUp', ' '];
        // This prevents the select from opening for the above keys
        if (readOnly && selectAccessKeys.includes(evt.key)) {
          evt.preventDefault();
        }
      },
    };

    // AILabel always size `mini`
    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator = candidateIsAILabel
      ? cloneElement(candidate, { size: 'mini' })
      : candidate;

    const input = (() => {
      return (
        <>
          <select
            {...other}
            {...ariaProps}
            id={id}
            className={inputClasses}
            disabled={normalizedProps.disabled || undefined}
            aria-invalid={normalizedProps.invalid || undefined}
            aria-readonly={readOnly || undefined}
            title={title}
            onChange={composeEventHandlers([onChange, handleChange])}
            {...readOnlyEventHandlers}
            ref={ref}>
            {children}
          </select>
          <ChevronDown className={`${prefix}--select__arrow`} />
          {normalizedProps.invalid && (
            <WarningFilled className={`${prefix}--select__invalid-icon`} />
          )}
          {!normalizedProps.invalid && normalizedProps.warn && (
            <WarningAltFilled
              className={`${prefix}--select__invalid-icon ${prefix}--select__invalid-icon--warning`}
            />
          )}
        </>
      );
    })();
    return (
      <div className={classNames(`${prefix}--form-item`, className)}>
        <div className={selectClasses}>
          {!noLabel && (
            <Text as="label" htmlFor={id} className={labelClasses}>
              {labelText}
            </Text>
          )}
          {inline && (
            <div className={`${prefix}--select-input--inline__wrapper`}>
              <div
                className={`${prefix}--select-input__wrapper`}
                data-invalid={normalizedProps.invalid || null}>
                {input}
              </div>
              {error}
            </div>
          )}
          {!inline && (
            <div
              className={`${prefix}--select-input__wrapper`}
              data-invalid={normalizedProps.invalid || null}
              onFocus={handleFocus}
              onBlur={handleFocus}>
              {input}
              {slug ? (
                normalizedDecorator
              ) : decorator ? (
                <div className={`${prefix}--select__inner-wrapper--decorator`}>
                  {normalizedDecorator}
                </div>
              ) : (
                ''
              )}
              {isFluid && <hr className={`${prefix}--select__divider`} />}
              {isFluid && error ? error : null}
            </div>
          )}
          {!inline && !isFluid && error ? error : helper}
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';

Select.propTypes = {
  /**
   * Provide the contents of your Select
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the node containing the label and the select box
   */
  className: PropTypes.string,

  /**
   * **Experimental**: Provide a decorator component to be rendered inside the `Select` component
   */
  decorator: PropTypes.node,

  /**
   * Optionally provide the default value of the `<select>`
   */
  defaultValue: PropTypes.any,

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify a custom `id` for the `<select>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether you want the inline version of this control
   */
  inline: PropTypes.bool,

  /**
   * Specify if the currently value is invalid.
   */
  invalid: PropTypes.bool,

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText: PropTypes.node,

  /**
   * Provide label text to be read by screen readers when interacting with the
   * control
   */
  labelText: PropTypes.node,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `Select` is no longer needed and has ' +
      'been deprecated in v11 in favor of the new `Layer` component. It will be moved in the next major release.'
  ),

  /**
   * Reserved for use with Pagination component. Will not render a label for the
   * select since Pagination renders one for us.
   */
  noLabel: PropTypes.bool,

  /**
   * Provide an optional `onChange` hook that is called each time the value of
   * the underlying `<input>` changes
   */
  onChange: PropTypes.func,

  /**
   * Whether the select should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the size of the Select Input.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  slug: deprecate(
    PropTypes.node,
    'The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead.'
  ),
  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

export default Select;



File: Select/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Select from './Select';

export { default as SelectSkeleton } from './Select.Skeleton';
export default Select;
export { Select };



File: Select/Select.mdx


import { ArgTypes, Meta, Canvas } from '@storybook/addon-docs/blocks';
import Select from './';
import SelectItem from '../SelectItem';
import * as SelectStories from './Select.stories'
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Select

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Select)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/select/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/select/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Default state](#default-state)
  - [Empty default option](#empty-default-option)
  - [First option default](#first-option-default)
  - [Custom option default](#custom-option-default)
- [Inline](#inline)
- [Skeleton](#skeleton)
- [AI Label](#ai-label)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Default state

Carbon recommends that a select has an empty option selected by default.
Depending on the use case, this defaulted behavior can be modified to be a
prefilled selection to the first option in the list, which is typically shown in
alphabetical order, or the prefilled selection could be a frequent or commonly
used option that is on the list.

<Canvas
  of={SelectStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(SelectStories.Default),
    },
  ]}
/>

### Empty default option

To get a default empty selection on your select, make the first child in your
`Select` component a `SelectItem` with empty `text` and `value` props.

<Select
  id={`select-1`}
  labelText="Select an option"
  helperText="Optional helper text">
  <SelectItem value="" text="" />
  <SelectItem value="option-1" text="Option 1" />
  <SelectItem value="option-2" text="Option 2" />
</Select>

```jsx
<Select
  id={`select-1`}
  labelText="Select an option"
  helperText="Optional helper text">
  <SelectItem value="" text="" />
  <SelectItem value="option-1" text="Option 1" />
  <SelectItem value="option-2" text="Option 2" />
</Select>
```

### First option default

The select will default to the first provided option given that no
`defaultValue` is specified. No further action needed. Keep in mind that
Carbon's design guidance is to present select options in alphabetical order. If
you need an option pre-selected that isn't displayed in first place, see
[Custom option default](#custom-option-default)

<Select
  id={`select-2`}
  labelText="Select an option"
  helperText="Optional helper text">
  <SelectItem value="option-1" text="Option 1" />
  <SelectItem value="option-2" text="Option 2" />
  <SelectItem value="option-3" text="Option 3" />
</Select>

```jsx
<Select
  id={`select-2`}
  labelText="Select an option"
  helperText="Optional helper text">
  <SelectItem value="option-1" text="Option 1" />
  <SelectItem value="option-2" text="Option 2" />
  <SelectItem value="option-3" text="Option 3" />
</Select>
```

### Custom option default

To have a custom option from the select's option list be selected by default,
simply set a `defaultValue` on the `Select` component equal to the value of the
desired option.

<Select
  id={`select-3`}
  labelText="Select an option"
  helperText="Optional helper text"
  defaultValue="option-3">
  <SelectItem value="option-1" text="Option 1" />
  <SelectItem value="option-2" text="Option 2" />
  <SelectItem value="option-3" text="Option 3" />
</Select>

```jsx
<Select
  id={`select-3`}
  labelText="Select an option"
  helperText="Optional helper text"
  defaultValue="option-3">
  <SelectItem value="option-1" text="Option 1" />
  <SelectItem value="option-2" text="Option 2" />
  <SelectItem value="option-3" text="Option 3" />
</Select>
```

## Inline

<Canvas
  of={SelectStories.Inline}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(SelectStories.Inline),
    },
  ]}
/>

## Skeleton

<Canvas
  of={SelectStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(SelectStories.Skeleton),
    },
  ]}
/>

## AI Label

<Canvas
  of={SelectStories.withAILabel}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(SelectStories.withAILabel),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Select/Select.mdx).



File: Select/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-select--default'
    },
    {
      label: 'Inline',
      variant: 'components-select--inline'
    },
    {
      label: 'Fluid (unstable)',
      variant: 'experimental-unstable-fluidselect--default'
    }
  ]}
/>



File: Select/Select.Skeleton.tsx


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

export interface SelectSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className?: string;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;
}

const SelectSkeleton = ({
  hideLabel,
  className,
  ...rest
}: SelectSkeletonProps) => {
  const prefix = usePrefix();
  return (
    <div className={cx(`${prefix}--form-item`, className)} {...rest}>
      {!hideLabel && (
        <span className={`${prefix}--label ${prefix}--skeleton`} />
      )}
      <div className={`${prefix}--select ${prefix}--skeleton`}>
        <div className={`${prefix}--select-input`} />
      </div>
    </div>
  );
};

SelectSkeleton.propTypes = {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className: PropTypes.string,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,
};

export default SelectSkeleton;
export { SelectSkeleton };



