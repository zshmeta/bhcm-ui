File: TimePicker/TimePicker.mdx


import { ArgTypes, Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as TimePickerStories from './TimePicker.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# TimePicker

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/TimePicker)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/date-picker/usage#time-picker)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/date-picker/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={TimePickerStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TimePickerStories.Default),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/TimePicker/TimePicker.mdx).



File: TimePicker/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import TimePicker from './TimePicker';

export default TimePicker;
export { TimePicker };



File: TimePicker/TimePicker.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { forwardRef, type HTMLAttributes } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';
import { useNormalizedInputProps } from '../../internal/useNormalizedInputProps';

type ExcludedAttributes = 'id' | 'value';

export interface TimePickerProps
  extends Omit<HTMLAttributes<HTMLInputElement>, ExcludedAttributes> {
  /**
   * Pass in the children that will be rendered next to the form control
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify an optional className to be applied to the `<input>` node
   */
  inputClassName?: string;

  /**
   * Specify an optional className to be applied to the container that wraps the `<input>` and select option
   */
  pickerClassName?: string;

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel?: boolean;

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: string;

  /**
   * Specify whether the control is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: React.ReactNode;

  /**
   * Specify a warning message
   */
  warning?: boolean;

  /**
   * Provide the text that is displayed when the control is in an warning state
   */
  warningText?: React.ReactNode;

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText?: React.ReactNode;

  /**
   * The `light` prop for `TimePicker` has been deprecated. It will be removed in v12. Use the `Layer` component instead.
   *
   * @deprecated The `light` prop for `TimePicker` is no longer needed and has been deprecated. It will be removed in the next major release. Use the `Layer` component instead.
   */
  light?: boolean;

  /**
   * Specify the maximum length of the time string in `<input>`
   */
  maxLength?: number;

  /**
   * Optionally provide an `onBlur` handler that is called whenever the
   * `<input>` loses focus
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>`
   * is updated
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<input>` is clicked
   */
  onClick?: React.MouseEventHandler<HTMLInputElement>;

  /**
   * Specify the regular expression working as the pattern of the time string in `<input>`
   */
  pattern?: string;

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder?: string;

  /**
   * Specify whether the TimePicker should be read-only
   */
  readOnly?: boolean;

  /**
   * Specify the size of the Time Picker.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Specify the type of the `<input>`
   */
  type?: string;

  /**
   * Specify the value of the `<input>`
   */
  value?: string;
}

const frFn = forwardRef<HTMLInputElement, TimePickerProps>;

const TimePicker = frFn((props, ref) => {
  const {
    children,
    className,
    inputClassName,
    pickerClassName,
    disabled = false,
    hideLabel,
    id,
    invalidText = 'Invalid time format.',
    invalid = false,
    warningText = 'Warning message.',
    warning = false,
    labelText,
    light = false,
    maxLength = 5,
    onChange = () => {},
    onClick = () => {},
    onBlur = () => {},
    pattern = '(1[012]|[1-9]):[0-5][0-9](\\s)?',
    placeholder = 'hh:mm',
    readOnly,
    size = 'md',
    type = 'text',
    value,
    ...rest
  } = props;
  const prefix = usePrefix();

  const [isValue, setValue] = React.useState(value);
  const [prevValue, setPrevValue] = React.useState(value);

  if (value !== prevValue) {
    setValue(value);
    setPrevValue(value);
  }

  function handleOnClick(evt) {
    if (!disabled) {
      if (!readOnly) {
        setValue(isValue);
      }
      onClick(evt);
    }
  }

  function handleOnChange(evt) {
    if (!disabled && !readOnly) {
      setValue(isValue);
      onChange(evt);
    }
  }

  function handleOnBlur(evt) {
    if (!disabled) {
      if (!readOnly) {
        setValue(isValue);
      }
      onBlur(evt);
    }
  }

  const normalizedProps = useNormalizedInputProps({
    id,
    readOnly,
    disabled,
    invalid,
    invalidText,
    warn: warning,
    warnText: warningText,
  });

  const timePickerInputClasses = cx(
    `${prefix}--time-picker__input-field`,
    `${prefix}--text-input`,
    [inputClassName],
    {
      [`${prefix}--text-input--light`]: light,
      [`${prefix}--time-picker__input-field-error`]:
        normalizedProps.invalid || normalizedProps.warn,
    }
  );

  const timePickerClasses = cx({
    [`${prefix}--time-picker`]: true,
    [`${prefix}--time-picker--light`]: light,
    [`${prefix}--time-picker--invalid`]: normalizedProps.invalid,
    [`${prefix}--time-picker--warning`]: normalizedProps.warn,
    [`${prefix}--time-picker--readonly`]: readOnly,
    [`${prefix}--time-picker--${size}`]: size,
    ...(pickerClassName && { [pickerClassName]: true }),
  });

  const labelClasses = cx(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
    [`${prefix}--label--disabled`]: disabled,
  });

  const label = labelText ? (
    <label htmlFor={id} className={labelClasses}>
      {labelText}
    </label>
  ) : null;

  function getInternalPickerSelects() {
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

    const mappedChildren = React.Children.map(children, (pickerSelect) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      const item = pickerSelect as any;

      if (item) {
        return React.cloneElement(item, {
          ...item.props,
          disabled: item.props.disabled ?? disabled,
          readOnly: readOnly,
          ...readOnlyEventHandlers,
        });
      }
    });

    return mappedChildren;
  }

  const readOnlyProps = {
    readOnly: readOnly,
  };

  return (
    <div className={cx(`${prefix}--form-item`, className)}>
      {label}
      <div className={timePickerClasses}>
        <div className={`${prefix}--time-picker__input`}>
          <input
            className={timePickerInputClasses}
            data-invalid={normalizedProps.invalid ? true : undefined}
            disabled={normalizedProps.disabled}
            id={id}
            maxLength={maxLength}
            onClick={handleOnClick}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            placeholder={placeholder}
            pattern={pattern}
            ref={ref}
            type={type}
            value={value}
            {...rest}
            {...readOnlyProps}
          />
          {(normalizedProps.invalid || normalizedProps.warn) &&
            normalizedProps.icon && (
              <div className={`${prefix}--time-picker__error__icon`}>
                {/* Use the icon from normalizedProps */}
                {React.createElement(normalizedProps.icon, {
                  className: normalizedProps.invalid
                    ? `${prefix}--checkbox__invalid-icon`
                    : `${prefix}--text-input__invalid-icon--warning`,
                  size: 16,
                } as React.ComponentProps<typeof normalizedProps.icon>)}
              </div>
            )}
        </div>
        {getInternalPickerSelects()}
      </div>
      {normalizedProps.validation}
    </div>
  );
});

TimePicker.propTypes = {
  /**
   * Pass in the children that will be rendered next to the form control
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node,

  /**
   * The `light` prop for `TimePicker` has been deprecated. It will be removed in v12. Use the `Layer` component instead.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `TimePicker` is no longer needed and has been deprecated. It will be removed in the next major release. Use the `Layer` component instead.'
  ),

  /**
   * Specify the maximum length of the time string in `<input>`
   */
  maxLength: PropTypes.number,

  /**
   * Optionally provide an `onBlur` handler that is called whenever the
   * `<input>` loses focus
   */
  onBlur: PropTypes.func,

  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>`
   * is updated
   */
  onChange: PropTypes.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<input>` is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the regular expression working as the pattern of the time string in `<input>`
   */
  pattern: PropTypes.string,

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder: PropTypes.string,

  /**
   * Specify whether the TimePicker should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the size of the Time Picker.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Specify the type of the `<input>`
   */
  type: PropTypes.string,

  /**
   * Specify the value of the `<input>`
   */
  value: PropTypes.string,

  /**
   * Specify a warning message
   */
  warning: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an warning state
   */
  warningText: PropTypes.node,
};

export default TimePicker;



File: TimePicker/TimePicker.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import SelectItem from '../SelectItem';
import TimePicker from './TimePicker';
import TimePickerSelect from '../TimePickerSelect';
import mdx from './TimePicker.mdx';

export default {
  title: 'Components/TimePicker',
  component: TimePicker,
  subcomponents: {
    TimePickerSelect,
    SelectItem,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['inputClassName', 'pickerClassName', 'id', 'light', 'pattern'],
    },
  },
};

export const Default = (args) => {
  return (
    <TimePicker id="time-picker" labelText="Select a time" {...args}>
      <TimePickerSelect id="time-picker-select-1" disabled={args.disabled}>
        <SelectItem value="AM" text="AM" />
        <SelectItem value="PM" text="PM" />
      </TimePickerSelect>
      <TimePickerSelect id="time-picker-select-2" disabled={args.disabled}>
        <SelectItem value="Time zone 1" text="Time zone 1" />
        <SelectItem value="Time zone 2" text="Time zone 2" />
      </TimePickerSelect>
    </TimePicker>
  );
};

Default.args = {
  disabled: false,
  hideLabel: false,
  invalid: false,
  warning: false,
};

Default.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
  },
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    control: { type: 'text' },
  },
  warning: {
    control: {
      type: 'boolean',
    },
  },
  warningText: {
    control: { type: 'text' },
  },
  labelText: {
    control: { type: 'text' },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
};

export const _WithLayer = () => (
  <WithLayer>
    {(layer) => (
      <TimePicker id={`time-picker-${layer}`} labelText="Select a time">
        <TimePickerSelect id={`time-picker-select-${layer}-1`}>
          <SelectItem value="AM" text="AM" />
          <SelectItem value="PM" text="PM" />
        </TimePickerSelect>
        <TimePickerSelect id={`time-picker-select-${layer}-2`}>
          <SelectItem value="Time zone 1" text="Time zone 1" />
          <SelectItem value="Time zone 2" text="Time zone 2" />
        </TimePickerSelect>
      </TimePicker>
    )}
  </WithLayer>
);



File: TimePicker/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-timepicker--default'
    },
    {
      label: 'Fluid (unstable)',
      variant: 'experimental-unstable-fluidtimepicker--default'
    }
  ]}
/>



File: TimePicker/TimePicker-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as TimePicker } from './TimePicker';
import SelectItem from '../SelectItem';
import TimePickerSelect from '../TimePickerSelect/TimePickerSelect.tsx';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TimePicker', () => {
  describe('input', () => {
    it('renders as expected', () => {
      render(<TimePicker id="time-picker" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('passes classNames as expected', () => {
      const { container } = render(
        <TimePicker
          id="time-picker"
          className="timepicker-container"
          inputClassName="tp-input-class"
          pickerClassName="tp-picker-class"
        />
      );
      expect(
        container.querySelector('.timepicker-container')
      ).toBeInTheDocument();
      expect(container.querySelector('.tp-picker-class')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).not.toHaveClass(
        'timepicker-container'
      );
      expect(screen.getByRole('textbox')).toHaveClass('tp-input-class');
    });

    it('should set type as expected', () => {
      render(<TimePicker id="time-picker" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('should set value as expected', () => {
      render(<TimePicker id="time-picker" value="🐶" />);
      expect(screen.getByRole('textbox')).toHaveValue('🐶');
    });

    it('should set disabled as expected', () => {
      const onClick = jest.fn();
      render(<TimePicker id="time-picker" onClick={onClick} disabled />);
      fireEvent.click(screen.getByRole('textbox'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should behave readonly as expected', async () => {
      const onClick = jest.fn();
      const onChange = jest.fn();

      render(
        <TimePicker
          id="time-picker"
          onClick={onClick}
          onChange={onChange}
          readOnly={true}>
          <TimePickerSelect id="time-picker-select-1">
            <SelectItem value="AM" text="AM" />
            <SelectItem value="PM" text="PM" />
          </TimePickerSelect>
          <TimePickerSelect id="time-picker-select-2">
            <SelectItem value="Time zone 1" text="Time zone 1" />
            <SelectItem value="Time zone 2" text="Time zone 2" />
          </TimePickerSelect>
        </TimePicker>
      );

      const input = screen.getByRole('textbox');
      await userEvent.click(input);
      expect(onClick).toHaveBeenCalled();
      expect(input).toHaveAttribute('readonly');

      await userEvent.type(input, '01:50');
      expect(onChange).not.toHaveBeenCalled();

      screen.getByDisplayValue('AM');
      screen.getByDisplayValue('Time zone 1');

      //------------------------------------------------------------------------
      // Testing library - userEvent.type() does not work on <select> elements
      // and using selectOption causes the value to change.
      // Ideally we'd use userEvent.type(theSelect, '{arrowdown}{enter}') to test the readOnly prop
      // or have a way to click on a slotted option.
      // https://github.com/testing-library/user-event/issues/786
      //------------------------------------------------------------------------
      // userEvent.selectOptions(theSelect, 'option-1'); // unfortunately this bypasses the readOnly prop

      // Change events should *not* fire
      // expect(screen.getByText('Option 1').selected).toBe(false);
    });

    it('should set placeholder as expected', () => {
      render(<TimePicker id="time-picker" placeholder="🧸" />);
      expect(screen.getByPlaceholderText('🧸')).toBeInTheDocument();
    });

    it('should call onBlur when not disabled or readOnly', () => {
      const onBlur = jest.fn();
      render(<TimePicker id="time-picker" onBlur={onBlur} />);
      const input = screen.getByRole('textbox');

      fireEvent.blur(input);
      expect(onBlur).toHaveBeenCalled();
    });

    it('should not call onBlur when disabled', () => {
      const onBlur = jest.fn();
      render(<TimePicker id="time-picker" onBlur={onBlur} disabled />);
      const input = screen.getByRole('textbox');

      fireEvent.blur(input);
      expect(onBlur).not.toHaveBeenCalled();
    });

    it('should update value and prevValue when value changes', () => {
      const { rerender } = render(
        <TimePicker id="time-picker" value="10:00" />
      );

      // Initial render
      expect(screen.getByRole('textbox')).toHaveValue('10:00');

      // Rerender with a new value
      rerender(<TimePicker id="time-picker" value="11:00" />);

      // Check if the value is updated
      expect(screen.getByRole('textbox')).toHaveValue('11:00');
    });
  });

  describe('label', () => {
    it('does not render a label by default', () => {
      render(<TimePicker id="time-picker" />);
      expect(screen.queryByLabelText('🐳')).not.toBeInTheDocument();
    });

    it('renders a label as expected', () => {
      render(<TimePicker id="time-picker" labelText="🐳" />);
      expect(screen.getByLabelText('🐳')).toBeInTheDocument();
    });
  });

  describe('events', () => {
    it('should write text inside the textbox', async () => {
      render(<TimePicker id="time-picker" />);
      await userEvent.type(screen.getByRole('textbox'), '🧛');
      expect(screen.getByRole('textbox')).toHaveValue('🧛');
    });
  });
  describe('invalid and warning states', () => {
    it('should show invalid state when invalid is true', () => {
      const { container } = render(
        <TimePicker id="time-picker" invalid invalidText="Invalid time" />
      );
      expect(
        container.querySelector('.cds--time-picker__error__icon')
      ).toBeInTheDocument();
      expect(
        container.querySelector('.cds--form-requirement')
      ).toBeInTheDocument();
      expect(
        container.querySelector('.cds--form-requirement')
      ).toHaveTextContent('Invalid time');
    });

    it('should show warning state when warning is true', () => {
      const { container } = render(
        <TimePicker id="time-picker" warning warningText="Warning message" />
      );
      expect(
        container.querySelector('.cds--time-picker__error__icon')
      ).toBeInTheDocument();
      expect(
        container.querySelector('.cds--form-requirement')
      ).toBeInTheDocument();
      expect(
        container.querySelector('.cds--form-requirement')
      ).toHaveTextContent('Warning message');
    });

    it('should not show invalid state when disabled', () => {
      const { container } = render(
        <TimePicker
          id="time-picker"
          invalid
          invalidText="Invalid time"
          disabled
        />
      );
      expect(
        container.querySelector('.cds--time-picker__error__icon')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.cds--form-requirement')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.cds--time-picker--invalid')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.cds--time-picker__input-field-error')
      ).not.toBeInTheDocument();
      // data-invalid attribute should not be present when disabled
      expect(container.querySelector('[data-invalid]')).not.toBeInTheDocument();
    });

    it('should not show warning state when disabled', () => {
      const { container } = render(
        <TimePicker
          id="time-picker"
          warning
          warningText="Warning message"
          disabled
        />
      );
      expect(
        container.querySelector('.cds--time-picker__error__icon')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.cds--form-requirement')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.cds--time-picker--warning')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.cds--time-picker__input-field-error')
      ).not.toBeInTheDocument();
    });

    it('should not show invalid state when readOnly', () => {
      const { container } = render(
        <TimePicker
          id="time-picker"
          invalid
          invalidText="Invalid time"
          readOnly
        />
      );
      expect(
        container.querySelector('.cds--time-picker__error__icon')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.cds--form-requirement')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.cds--time-picker--invalid')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.cds--time-picker__input-field-error')
      ).not.toBeInTheDocument();
      // data-invalid attribute should not be present when readonly
      expect(container.querySelector('[data-invalid]')).not.toBeInTheDocument();
    });

    it('should not show warning state when readOnly', () => {
      const { container } = render(
        <TimePicker
          id="time-picker"
          warning
          warningText="Warning message"
          readOnly
        />
      );
      expect(
        container.querySelector('.cds--time-picker__error__icon')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.cds--form-requirement')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.cds--time-picker--warning')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('.cds--time-picker__input-field-error')
      ).not.toBeInTheDocument();
    });
  });
});



