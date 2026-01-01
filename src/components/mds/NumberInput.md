File: NumberInput/NumberInput.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from 'storybook/actions';
import { NumberInput } from './';
import NumberInputSkeleton from './NumberInput.Skeleton';
import { validateNumberSeparators } from './NumberInput';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { useDocumentLang } from '../../internal/useDocumentLang';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import mdx from './NumberInput.mdx';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
  parameters: {
    subcomponents: {
      NumberInputSkeleton,
    },
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['id', 'defaultValue', 'light', 'translateWithId'],
    },
  },
};

const sharedArgTypes = {
  min: { control: { type: 'number' } },
  max: { control: { type: 'number' } },
  step: { control: { type: 'number' } },
  disabled: { control: { type: 'boolean' } },
  invalid: { control: { type: 'boolean' } },
  invalidText: { control: { type: 'text' } },
  warn: { control: { type: 'boolean' } },
  warnText: { control: { type: 'text' } },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  label: { control: { type: 'text' } },
  helperText: { control: { type: 'text' } },
};

const reusableProps = {
  min: -100000000,
  max: 100000000,
};

export const Default = (args) => {
  const [value, setValue] = React.useState(50);

  const handleChange = (event, { value }) => {
    setValue(value);
  };

  return (
    <NumberInput
      id="default-number-input"
      min={-100}
      max={100}
      value={value}
      label="NumberInput label"
      helperText="Optional helper text."
      onChange={handleChange}
      {...args}
    />
  );
};

Default.args = {
  step: 1,
  disabled: false,
  invalid: false,
  invalidText: `Number is not valid. Must be between -100 and 100`,
  helperText: 'Optional helper text.',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  size: 'md',
};

Default.argTypes = { ...sharedArgTypes };

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
    <div style={{ width: 400 }}>
      <NumberInput
        min={reusableProps.min}
        max={reusableProps.max}
        value={50}
        label="NumberInput label"
        helperText="Optional helper text."
        invalidText="Number is not valid"
        decorator={aiLabel}
        {...args}
      />
    </div>
  );
};

withAILabel.argTypes = { ...sharedArgTypes };

export const WithTypeOfText = (args) => {
  const locale = useDocumentLang();

  return (
    <NumberInput
      id="default-number-input"
      min={reusableProps.min}
      max={reusableProps.max}
      inputMode="decimal"
      defaultValue={50}
      label="NumberInput label"
      helperText="Optional helper text."
      {...args}
      locale={locale}
    />
  );
};
WithTypeOfText.args = {
  step: 1,
  disabled: false,
  invalid: false,
  invalidText: `Number is not valid. Must be between ${reusableProps.min} and ${reusableProps.max}`,
  helperText: 'Optional helper text.',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  size: 'md',
  type: 'text',
};
WithTypeOfText.argTypes = {
  locale: { control: { type: 'text' } },
  stepStartValue: { control: { type: 'number' } },
  formatOptions: { control: { type: 'object' } },
  ...sharedArgTypes,
};

export const WithTypeOfTextControlled = (args) => {
  const locale = useDocumentLang();
  const [value, setValue] = useState(NaN);

  return (
    <>
      <NumberInput
        id="default-number-input"
        min={reusableProps.min}
        max={reusableProps.max}
        type="text"
        inputMode="decimal"
        label="NumberInput label"
        helperText="Optional helper text."
        {...args}
        locale={locale}
        value={value}
        onChange={(event, state) => {
          setValue(state.value);
        }}
        onBlur={action('onBlur')}
      />
      <button
        type="button"
        onClick={() => {
          setValue(50);
        }}>
        set to 50
      </button>
    </>
  );
};
WithTypeOfTextControlled.args = {
  step: 1,
  disabled: false,
  invalid: false,
  invalidText: `Number is not valid. Must be between ${reusableProps.min} and ${reusableProps.max}`,
  helperText: 'Optional helper text.',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  size: 'md',
  type: 'text',
};
WithTypeOfTextControlled.argTypes = {
  locale: { control: { type: 'text' } },
  formatOptions: { control: { type: 'object' } },
  ...sharedArgTypes,
};

export const WithTypeOfCustomValidation = (args) => {
  const locale = useDocumentLang();
  const [value, setValue] = useState(NaN);

  return (
    <>
      <NumberInput
        id="default-number-input"
        type="text"
        inputMode="decimal"
        label="NumberInput label"
        helperText="Optional helper text."
        validate={validateNumberSeparators}
        {...args}
        locale={locale}
        value={value}
        allowEmpty
        onChange={(event, state) => {
          setValue(state.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          setValue(1000);
        }}>
        set to 1000
      </button>
    </>
  );
};
WithTypeOfCustomValidation.args = {
  step: 1,
  disabled: false,
  invalid: false,
  invalidText: `Number is not valid. Must be between ${reusableProps.min} and ${reusableProps.max}`,
  helperText: 'Optional helper text.',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  size: 'md',
  type: 'text',
};
WithTypeOfCustomValidation.argTypes = {
  locale: { control: { type: 'text' } },
  formatOptions: { control: { type: 'object' } },
  ...sharedArgTypes,
};

export const Skeleton = () => {
  return <NumberInputSkeleton />;
};



File: NumberInput/NumberInput.Skeleton.tsx


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

export interface NumberInputSkeletonProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className?: string;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;

  /**
   * Specify the size of the Number Input.
   */
  size?: 'sm' | 'md' | 'lg';
}
function NumberInputSkeleton({
  hideLabel,
  className,
  size = 'md',
  ...rest
}: NumberInputSkeletonProps) {
  const prefix = usePrefix();
  return (
    <div className={cx(`${prefix}--form-item`, className)} {...rest}>
      {!hideLabel && (
        <span className={`${prefix}--label ${prefix}--skeleton`} />
      )}
      <div
        className={`${prefix}--number ${prefix}--skeleton ${prefix}--number--${size}`}
      />
    </div>
  );
}

NumberInputSkeleton.propTypes = {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className: PropTypes.string,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify the size of the Number Input.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default NumberInputSkeleton;



File: NumberInput/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { default as NumberInputSkeleton } from './NumberInput.Skeleton';
export {
  NumberInput,
  validateNumberSeparators,
  type NumberInputProps,
} from './NumberInput';



File: NumberInput/NumberInput.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Add, Subtract } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  cloneElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { useNormalizedInputProps as normalize } from '../../internal/useNormalizedInputProps';
import { usePrefix } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';
import { FormContext } from '../FluidForm';
import { Text } from '../Text';
import type { TFunc, TranslateWithId } from '../../types/common';
import { clamp } from '../../internal/clamp';
import { useControllableState } from '../../internal/useControllableState';
import {
  NumberFormatter,
  NumberParser,
  type NumberFormatOptions,
} from '@carbon/utilities';
import { keys, match } from '../../internal/keyboard';
import { NumberFormatOptionsPropType } from './NumberFormatPropTypes';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';

const translationIds = {
  'increment.number': 'increment.number',
  'decrement.number': 'decrement.number',
} as const;

type TranslationKey = keyof typeof translationIds;

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['increment.number']]: 'Increment number',
  [translationIds['decrement.number']]: 'Decrement number',
};

const defaultTranslateWithId: TFunc<TranslationKey> = (messageId) => {
  return defaultTranslations[messageId];
};

type ExcludedAttributes =
  | 'defaultValue'
  | 'id'
  | 'min'
  | 'max'
  | 'onChange'
  | 'onClick'
  | 'size'
  | 'step'
  | 'value';

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, ExcludedAttributes>,
    TranslateWithId<TranslationKey> {
  /**
   * Optional validation function that is called with the input value and locale.
   * This is called before other validations, giving consumers the ability
   * to short-circuit or extend validation without replacing built-in rules
   * @example
   * // Using the built-in separator validation
   * <NumberInput validate={validateNumberSeparators} />
   *
   * // Combining with custom validation
   * <NumberInput
   *   validate={(value, locale) => {
   *     return validateNumberSeparators(value, locale) && customValidation(value)
   *   }}
   * />
   * - Return `false` to immediately fail validation.
   * - Return `true` to pass this validation, but still run other checks (min, max, required, etc.).
   * - Return `undefined` to defer entirely to built-in validation logic.
   *
   */
  validate?: (value: string, locale: string) => boolean | undefined;
  /**
   * `true` to allow empty string.
   */
  allowEmpty?: boolean;

  /**
   * Specify an optional className to be applied to the wrapper node
   */
  className?: string;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the
   * `TextInput` component
   */
  decorator?: ReactNode;

  /**
   * Optional starting value for uncontrolled state
   * Defaults to 0 when type="number"
   * Defaults to NaN when type="text"
   */
  defaultValue?: number | string;

  /**
   * Specify if the wheel functionality for the input should be disabled, or not
   */
  disableWheel?: boolean;

  /**
   * Specify if the control should be disabled, or not
   */
  disabled?: boolean;

  /**
   * **Experimental:** Specify Intl.NumberFormat options applied to internal
   * number parsing and formatting. Use with `type="text"`, has no effect when
   * `type="number"`.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
   */
  formatOptions?: NumberFormatOptions;

  /**
   * Provide the value stepping should begin at when the input is empty
   */
  stepStartValue?: number;

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText?: ReactNode;

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel?: boolean;

  /**
   * Specify whether you want the steppers to be hidden
   */
  hideSteppers?: boolean;

  /**
   * Provide a description for up/down icons that can be read by screen readers
   */
  iconDescription?: string;

  /**
   * Specify a custom `id` for the input
   */
  id: string;

  /**
   * Instruct the browser which keyboard to display on mobile devices. Defaults
   * to `decimal`, but note that standard numeric keyboards vary across devices
   * and operating systems.
   * @see https://css-tricks.com/everything-you-ever-wanted-to-know-about-inputmode/
   */
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];

  /**
   * Specify if the currently value is invalid.
   */
  invalid?: boolean;

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText?: ReactNode;

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label?: ReactNode;

  /**
   * `true` to use the light version.
   *
   * @deprecated The `light` prop for `NumberInput` is no longer needed and has
   * been deprecated in v11 in favor of the new `Layer` component. It will be
   * removed in the next major release.
   */
  light?: boolean;

  /**
   * **Experimental:** Specify a [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt)
   * language code for parsing and formatting. Use with `type="text"`, has no
   * effect when `type="number"`.
   */
  locale?: string;

  /**
   * The maximum value.
   */
  max?: number;

  /**
   * The minimum value.
   */
  min?: number;

  /**
   * Provide an optional handler that is called when the input is blurred.
   */
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement>,
    value?: string | number
  ) => void;

  /**
   * Provide an optional handler that is called when the stepper
   * buttons are blurred.
   */
  onStepperBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;

  /**
   * Provide an optional handler that is called when the internal state of
   * NumberInput changes. This handler is called with event and state info.
   * When type="number", this is called on every change of the input.
   * When type="text", this is only called on blur after the number has been
   * parsed and formatted.
   * `(event, { value, direction }) => void`
   */
  onChange?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
    state: { value: number | string; direction: string }
  ) => void;

  /**
   * Provide an optional function to be called when the up/down button is clicked
   */
  onClick?: (
    event: React.MouseEvent<HTMLElement>,
    state?: { value: number | string; direction: string }
  ) => void;

  /**
   * Provide an optional function to be called when a key is pressed in the number input
   */
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;

  /**
   * When type="text", provide an optional pattern to restrict user input. Has
   * no effect when type="number".
   */
  pattern?: string;

  /**
   * Specify if the component should be read-only
   */
  readOnly?: boolean;

  /**
   * Specify the size of the Number Input.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `TextInput` component
   */
  slug?: ReactNode;

  /**
   * Specify how much the values should increase/decrease upon clicking on up/down button
   */
  step?: number;

  /**
   * **Experimental**: Specify if the input should be of type text or number.
   * Use type="text" with `locale`, `formatOptions`, and guide user input with
   * `pattern` and `inputMode`.
   */
  type?: 'number' | 'text';

  /**
   * Specify the value of the input
   */
  value?: number | string;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNode;
}

const getSeparators = (locale: string) => {
  const numberWithGroupAndDecimal = 1234567.89;

  const formatted = new Intl.NumberFormat(locale).format(
    numberWithGroupAndDecimal
  );

  // Extract separators using regex
  const match = formatted.match(/(\D+)\d{3}(\D+)\d{2}$/);

  if (match) {
    const groupSeparator = match[1];
    const decimalSeparator = match[2];
    return { groupSeparator, decimalSeparator };
  } else {
    return { groupSeparator: null, decimalSeparator: null };
  }
};

export const validateNumberSeparators = (
  input: string,
  locale: string
): boolean => {
  // allow empty string
  if (input === '' || Number.isNaN(input)) {
    return true;
  }
  const { groupSeparator, decimalSeparator } = getSeparators(locale);

  if (!decimalSeparator) {
    return !isNaN(Number(input));
  }

  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  let group = '';
  if (groupSeparator) {
    if (groupSeparator.trim() === '') {
      group = '[\\u00A0\\u202F\\s]'; // handle NBSP, narrow NBSP, space
    } else {
      group = esc(groupSeparator);
    }
  }

  const decimal = esc(decimalSeparator);

  // Regex for:
  // - integers (with/without grouping)
  // - optional decimal with 0+ digits after separator
  const regex = new RegExp(
    `^-?\\d{1,3}(${group}\\d{3})*(${decimal}\\d*)?$|^-?\\d+(${decimal}\\d*)?$`
  );

  if (!regex.test(input)) {
    return false;
  }

  // Normalize
  let normalized = input;
  if (groupSeparator) {
    if (groupSeparator.trim() === '') {
      normalized = normalized?.replace(/[\u00A0\u202F\s]/g, '');
    } else {
      normalized = normalized?.split(groupSeparator).join('');
    }
  }

  normalized = normalized?.replace(decimalSeparator, '.');

  return !isNaN(Number(normalized));
};

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (props: NumberInputProps, forwardRef) => {
    const {
      allowEmpty = false,
      className: customClassName,
      decorator,
      disabled = false,
      disableWheel: disableWheelProp = false,
      formatOptions,
      helperText = '',
      hideLabel = false,
      hideSteppers,
      iconDescription,
      id,
      inputMode = 'decimal',
      invalid = false,
      invalidText,
      label,
      light,
      locale = 'en-US',
      max,
      min,
      onBlur,
      onStepperBlur,
      onChange,
      onClick,
      onKeyUp,
      pattern = '[0-9]*',
      readOnly,
      size = 'md',
      slug,
      step = 1,
      translateWithId: t = defaultTranslateWithId,
      type = 'number',
      defaultValue = type === 'number' ? 0 : NaN,
      validate,
      warn = false,
      warnText = '',
      stepStartValue = 0,
      value: controlledValue,
      ...rest
    } = props;
    const prefix = usePrefix();
    const { isFluid } = useContext(FormContext);
    const [isFocused, setIsFocused] = useState(false);

    /**
     * The input value, only used when type=number
     */
    const [value, setValue] = useState(() => {
      if (controlledValue !== undefined) {
        return controlledValue;
      }
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      if (allowEmpty) {
        return '';
      }
      return 0;
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    const [prevControlledValue, setPrevControlledValue] =
      useState(controlledValue);

    const numberParser = useMemo(
      () => new NumberParser(locale, formatOptions),
      [locale, formatOptions]
    );
    /**
     * The currently parsed number value.
     * Only used when type=text
     * Updated based on the `value` as the user types.
     */
    const [numberValue, setNumberValue, isControlled] = useControllableState({
      name: 'NumberInput',
      defaultValue:
        typeof defaultValue === 'string'
          ? numberParser.parse(defaultValue)
          : defaultValue,
      value:
        typeof controlledValue === 'string'
          ? numberParser.parse(controlledValue)
          : controlledValue,
    });

    /**
     * The number value that was previously "committed" to the input on blur
     * Only used when type="text"
     */
    const [previousNumberValue, setPreviousNumberValue] = useState(numberValue);
    /**
     * The current text value of the input.
     * Only used when type=text
     * Updated as the user types and formatted on blur.
     */
    const [inputValue, setInputValue] = React.useState(() =>
      isNaN(numberValue)
        ? ''
        : new NumberFormatter(locale, formatOptions).format(numberValue)
    );
    const numberingSystem = useMemo(
      () => numberParser.getNumberingSystem(inputValue),
      [numberParser, inputValue]
    );
    const numberFormatter = useMemo(
      () =>
        new NumberFormatter(locale, {
          ...formatOptions,
          numberingSystem,
        }),
      [locale, formatOptions, numberingSystem]
    );
    const format = useCallback(
      (value) =>
        isNaN(value) || value === null ? '' : numberFormatter.format(value),
      [numberFormatter]
    );
    if (
      isControlled &&
      !(isNaN(previousNumberValue) && isNaN(numberValue)) &&
      previousNumberValue !== numberValue
    ) {
      setInputValue(format(numberValue));
      setPreviousNumberValue(numberValue);
    }

    const inputRef = useRef<HTMLInputElement>(null);
    const ref = useMergedRefs([forwardRef, inputRef]);
    const numberInputClasses = cx({
      [`${prefix}--number`]: true,
      [`${prefix}--number--helpertext`]: true,
      [`${prefix}--number--readonly`]: readOnly,
      [`${prefix}--number--light`]: light,
      [`${prefix}--number--nolabel`]: hideLabel,
      [`${prefix}--number--nosteppers`]: hideSteppers,
      [`${prefix}--number--${size}`]: size,
    });
    const isInputValid = getInputValidity({
      allowEmpty,
      invalid,
      value: validate ? inputValue : type === 'number' ? value : numberValue,
      max,
      min,
      validate,
      locale,
    });
    const normalizedProps = normalize({
      id,
      readOnly,
      disabled,
      invalid: !isInputValid,
      invalidText,
      warn,
      warnText,
    });
    const [incrementNumLabel, decrementNumLabel] = [
      t('increment.number'),
      t('decrement.number'),
    ];
    const wrapperClasses = cx(`${prefix}--number__input-wrapper`, {
      [`${prefix}--number__input-wrapper--warning`]: normalizedProps.warn,
      [`${prefix}--number__input-wrapper--slug`]: slug,
      [`${prefix}--number__input-wrapper--decorator`]: decorator,
    });
    const iconClasses = cx({
      [`${prefix}--number__invalid`]:
        normalizedProps.invalid || normalizedProps.warn,
      [`${prefix}--number__invalid--warning`]: normalizedProps.warn,
    });

    useEffect(() => {
      if (type === 'number' && controlledValue !== undefined) {
        if (allowEmpty && controlledValue === '') {
          setValue('');
        } else {
          setValue(controlledValue);
        }
        setPrevControlledValue(controlledValue);
      }
    }, [controlledValue, type, allowEmpty]);
    let ariaDescribedBy: string | undefined = undefined;
    if (normalizedProps.invalid) {
      ariaDescribedBy = normalizedProps.invalidId;
    }
    if (normalizedProps.warn) {
      ariaDescribedBy = normalizedProps.warnId;
    }
    if (!normalizedProps.validation) {
      ariaDescribedBy = helperText ? normalizedProps.helperId : undefined;
    }

    function handleOnChange(event) {
      if (disabled) {
        return;
      }

      if (type === 'number') {
        const state = {
          value:
            allowEmpty && event.target.value === ''
              ? ''
              : Number(event.target.value),
          direction: value < event.target.value ? 'up' : 'down',
        };
        setValue(state.value);

        if (onChange) {
          onChange(event, state);
        }
        return;
      }

      if (type === 'text') {
        const _value =
          allowEmpty && event.target.value === '' ? '' : event.target.value;

        setNumberValue(numberParser.parse(_value));
        setInputValue(_value);
        // The onChange prop isn't called here because it will be called on blur
        // or on click of a stepper, after the number is parsed and formatted
        // according to the locale.
      }
    }

    const handleFocus: React.FocusEventHandler<
      HTMLInputElement | HTMLDivElement
    > = (evt) => {
      if ('type' in evt.target && evt.target.type === 'button') {
        setIsFocused(false);
      } else {
        setIsFocused(evt.type === 'focus' ? true : false);
      }
    };

    const outerElementClasses = cx(`${prefix}--form-item`, {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      [customClassName!]: !!customClassName,
      [`${prefix}--number-input--fluid--invalid`]:
        isFluid && normalizedProps.invalid,
      [`${prefix}--number-input--fluid--focus`]: isFluid && isFocused,
      [`${prefix}--number-input--fluid--disabled`]: isFluid && disabled,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    const Icon = normalizedProps.icon as any;

    const getDecimalPlaces = (num: number) => {
      const parts = num.toString().split('.');

      return parts[1] ? parts[1].length : 0;
    };

    const handleStep = (event, direction) => {
      if (inputRef.current) {
        const currentValue =
          type === 'number' ? Number(inputRef.current.value) : numberValue;

        let rawValue;
        if (Number.isNaN(currentValue) || !currentValue) {
          if (typeof stepStartValue === 'number' && stepStartValue) {
            rawValue = stepStartValue;
          } else if (
            (min && min < 0 && max && max > 0) ||
            (!max && !min) ||
            max
          ) {
            if (direction === `up`) rawValue = 1;
            if (direction === `down`) rawValue = -1;
          } else if ((min && min > 0 && max && max > 0) || min) {
            rawValue = min;
          } else {
            rawValue = 0;
          }
        } else if (direction === 'up') {
          rawValue = currentValue + step;
        } else {
          rawValue = currentValue - step;
        }
        const precision = Math.max(
          getDecimalPlaces(currentValue),
          getDecimalPlaces(step)
        );
        const floatValue = parseFloat(Number(rawValue).toFixed(precision));
        const newValue = clamp(floatValue, min ?? -Infinity, max ?? Infinity);

        const state = {
          value: newValue,
          direction,
        };

        if (type === 'number') {
          setValue(state.value);
        }

        if (type === 'text') {
          // Calling format() can alter the number (such as rounding it) causing
          // the numberValue to mismatch the formatted value in the input.
          // To avoid this, the newValue is re-parsed after formatting.
          const formattedNewValue = format(newValue);
          const parsedFormattedNewValue = numberParser.parse(formattedNewValue);

          // When isControlled, setNumberValue will not actually update
          // numberValue in useControllableState.
          setNumberValue(parsedFormattedNewValue);

          setInputValue(formattedNewValue);
          setPreviousNumberValue(parsedFormattedNewValue);
        }

        if (onChange) {
          onChange(event, state);
        }

        return state;
      }
    };

    const handleStepperClick = (
      event: MouseEvent<HTMLButtonElement>,
      direction: 'up' | 'down'
    ) => {
      if (inputRef.current) {
        const state = handleStep(event, direction);

        if (onClick) {
          onClick(event, state);
        }
      }
    };

    // AILabel always size `mini`
    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator = candidateIsAILabel
      ? cloneElement(candidate, { size: 'mini' })
      : candidate;

    // Need to update the internal value when the revert button is clicked
    const isRevertActive = isComponentElement(normalizedDecorator, AILabel)
      ? normalizedDecorator.props.revertActive
      : undefined;

    useEffect(() => {
      if (!isRevertActive && slug && defaultValue) {
        setValue(defaultValue);
      }
    }, [defaultValue, isRevertActive, slug]);

    return (
      <div
        className={outerElementClasses}
        onFocus={isFluid ? handleFocus : undefined}
        onBlur={isFluid ? handleFocus : undefined}>
        <div
          className={numberInputClasses}
          data-invalid={normalizedProps.invalid ? true : undefined}>
          <Label
            disabled={normalizedProps.disabled}
            hideLabel={hideLabel}
            id={id}
            label={label}
          />
          <div className={wrapperClasses}>
            <input
              {...rest}
              data-invalid={normalizedProps.invalid ? true : undefined}
              aria-invalid={normalizedProps.invalid}
              aria-describedby={ariaDescribedBy}
              aria-readonly={readOnly}
              disabled={normalizedProps.disabled}
              ref={ref}
              id={id}
              max={max}
              min={min}
              onClick={onClick}
              onChange={handleOnChange}
              onKeyUp={onKeyUp}
              onKeyDown={(e) => {
                if (type === 'text') {
                  // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
                  match(e, keys.ArrowUp) && handleStep(e, 'up');
                  // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
                  match(e, keys.ArrowDown) && handleStep(e, 'down');
                }

                if (rest?.onKeyDown) {
                  rest?.onKeyDown(e);
                }
              }}
              onFocus={(e) => {
                if (disableWheelProp) {
                  e.target.addEventListener('wheel', disableWheel);
                }

                if (rest.onFocus) {
                  rest.onFocus(e);
                }
              }}
              onBlur={(e) => {
                if (disableWheelProp) {
                  e.target.removeEventListener('wheel', disableWheel);
                }

                let parsedValueForBlur: number | undefined;
                if (type === 'text') {
                  // When isControlled, the current inputValue needs re-parsed
                  // because the consumer's onChange hasn't been called yet and
                  // the `numberValue` we have in state is the (stale) value
                  // they've passed in.
                  const _numberValue = isControlled
                    ? numberParser.parse(inputValue)
                    : numberValue;

                  const formattedValue = isNaN(_numberValue)
                    ? ''
                    : format(_numberValue);
                  const rawValue = e.target.value;
                  // Validate raw input
                  const isValid = validate ? validate(rawValue, locale) : true;
                  setInputValue(isValid ? formattedValue : rawValue);
                  // Calling format() can alter the number (such as rounding it)
                  // causing the _numberValue to mismatch the formatted value in
                  // the input. To avoid this, formattedValue is re-parsed.
                  const parsedFormattedNewValue =
                    numberParser.parse(formattedValue);
                  parsedValueForBlur = parsedFormattedNewValue;

                  if (onChange && isValid) {
                    const state = {
                      value: parsedFormattedNewValue,
                      direction:
                        previousNumberValue < parsedFormattedNewValue
                          ? 'up'
                          : 'down',
                    };

                    // If the old and new values are NaN, don't call onChange
                    // to avoid an unecessary re-render and potential infinite
                    // loop when isControlled.
                    if (
                      !(
                        isNaN(previousNumberValue) &&
                        isNaN(parsedFormattedNewValue)
                      )
                    ) {
                      onChange(e, state);
                    }
                  }

                  // If the old and new values are NaN, don't set state to avoid
                  // an unecessary re-render and potential infinite loop when
                  // isControlled.
                  if (!(isNaN(previousNumberValue) && isNaN(numberValue))) {
                    setPreviousNumberValue(numberValue);
                  }
                  if (!(isNaN(numberValue) && isNaN(parsedFormattedNewValue))) {
                    setNumberValue(parsedFormattedNewValue);
                  }
                }

                if (onBlur) {
                  if (type === 'number') {
                    onBlur(e, value);
                    return;
                  }

                  const parsedTextValue =
                    parsedValueForBlur ??
                    (isControlled
                      ? numberParser.parse(inputValue)
                      : numberValue);
                  onBlur(e, parsedTextValue);
                }
              }}
              pattern={pattern}
              inputMode={inputMode}
              readOnly={readOnly}
              step={step}
              type={type}
              value={type === 'number' ? value : inputValue}
            />
            {slug ? (
              normalizedDecorator
            ) : decorator ? (
              <div
                className={`${prefix}--number__input-inner-wrapper--decorator`}>
                {normalizedDecorator}
              </div>
            ) : (
              ''
            )}
            {Icon ? <Icon className={iconClasses} /> : null}
            {!hideSteppers && (
              <div className={`${prefix}--number__controls`}>
                <button
                  aria-label={decrementNumLabel || iconDescription}
                  className={`${prefix}--number__control-btn down-icon`}
                  disabled={disabled || readOnly}
                  onClick={(event) => handleStepperClick(event, 'down')}
                  onBlur={onStepperBlur}
                  tabIndex={-1}
                  title={decrementNumLabel || iconDescription}
                  type="button">
                  <Subtract className="down-icon" />
                </button>
                <div className={`${prefix}--number__rule-divider`} />
                <button
                  aria-label={incrementNumLabel || iconDescription}
                  className={`${prefix}--number__control-btn up-icon`}
                  disabled={disabled || readOnly}
                  onClick={(event) => handleStepperClick(event, 'up')}
                  onBlur={onStepperBlur}
                  tabIndex={-1}
                  title={incrementNumLabel || iconDescription}
                  type="button">
                  <Add className="up-icon" />
                </button>
                <div className={`${prefix}--number__rule-divider`} />
              </div>
            )}
          </div>
          {isFluid && <hr className={`${prefix}--number-input__divider`} />}
          {normalizedProps.validation ? (
            normalizedProps.validation
          ) : (
            <HelperText
              id={normalizedProps.helperId}
              disabled={disabled}
              description={helperText}
            />
          )}
        </div>
      </div>
    );
  }
);

NumberInput.propTypes = {
  /**
   * `true` to allow empty string.
   */
  allowEmpty: PropTypes.bool,

  /**
   * Specify an optional className to be applied to the wrapper node
   */
  className: PropTypes.string,

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `NumberInput` component
   */
  decorator: PropTypes.node,

  /**
   * Optional starting value for uncontrolled state
   */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Specify if the wheel functionality for the input should be disabled, or no t
   */
  disableWheel: PropTypes.bool,

  /**
   * Specify if the control should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * **Experimental:** Specify Intl.NumberFormat options applied to internal
   * number parsing and formatting. Use with `type="text"`, has no effect when
   * `type="number"`.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
   */
  formatOptions: NumberFormatOptionsPropType,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify whether you want the steppers to be hidden
   */
  hideSteppers: PropTypes.bool,

  /**
   * Provide a description for up/down icons that can be read by screen readers
   */
  iconDescription: PropTypes.string,

  /**
   * Specify a custom `id` for the input
   */
  id: PropTypes.string.isRequired,

  /**
   * Instruct the browser which keyboard to display on mobile devices. Defaults
   * to `decimal`, but note that standard numeric keyboards vary across devices
   * and operating systems.
   * @see https://css-tricks.com/everything-you-ever-wanted-to-know-about-inputmode/
   */
  inputMode: PropTypes.oneOf([
    'none',
    'text',
    'tel',
    'url',
    'email',
    'numeric',
    'decimal',
    'search',
  ]),

  /**
   * Specify if the currently value is invalid.
   */
  invalid: PropTypes.bool,

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText: PropTypes.node,

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: PropTypes.node,

  /**
   * `true` to use the light version.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `NumberInput` is no longer needed and has ' +
      'been deprecated in v11 in favor of the new `Layer` component. It will be moved in the next major release.'
  ),

  /**
   * **Experimental:** Specify a [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt)
   * language code for parsing and formatting. Use with `type="text"`, has no
   * effect when `type="number"`.
   */
  locale: PropTypes.string,

  /**
   * The maximum value.
   */
  max: PropTypes.number,

  /**
   * The minimum value.
   */
  min: PropTypes.number,

  /**
   * Provide the value stepping should begin at when the input is empty
   */
  stepStartValue: PropTypes.number,

  /**
   * Provide an optional handler that is called when the input is blurred.
   */
  onBlur: PropTypes.func,

  /**
   * Provide an optional handler that is called when the stepper
   * buttons are blurred.
   */
  onStepperBlur: PropTypes.func,

  /**
   * Provide an optional handler that is called when the internal state of
   * NumberInput changes. This handler is called with event and state info.
   * When type="number", this is called on every change of the input.
   * When type="text", this is only called on blur after the number has been
   * parsed and formatted.
   * `(event, { value, direction }) => void`
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional function to be called when the up/down button is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an optional function to be called when a key is pressed in the number input
   */
  onKeyUp: PropTypes.func,

  /**
   * When type="text", provide an optional pattern to restrict user input. Has
   * no effect when type="number".
   */
  pattern: PropTypes.string,

  /**
   * Specify if the component should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the size of the Number Input.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the
   * `NumberInput` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop for `NumberInput` is no longer needed and has ' +
      'been deprecated in v11 in favor of the new `decorator` prop. It will be moved in the next major release.'
  ),

  /**
   * Specify how much the values should increase/decrease upon clicking on
   * up/down button
   */
  step: PropTypes.number,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,

  /**
   * **Experimental**: Specify if the input should be of type text or number.
   * Use type="text" with `locale`, `formatOptions`, and guide user input with
   * `pattern` and `inputMode`.
   */
  type: PropTypes.oneOf(['number', 'text']),

  /**
   * Specify the value of the input
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,

  /**
   * Optional validation function that is called with the input value and locale.
   *
   * - Return `false` to immediately fail validation.
   * - Return `true` to pass this validation, but still run other checks (min, max, required, etc.).
   * - Return `undefined` to defer entirely to built-in validation logic.
   *
   * This is called before other validations, giving consumers the ability
   * to short-circuit or extend validation without replacing built-in rules.
   */
  validate: PropTypes.func,
};

interface LabelProps {
  disabled?: boolean;
  hideLabel?: boolean;
  id?: string;
  label?: ReactNode;
}

const Label = ({ disabled, id, hideLabel, label }: LabelProps) => {
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--label`]: true,
    [`${prefix}--label--disabled`]: disabled,
    [`${prefix}--visually-hidden`]: hideLabel,
  });

  if (label) {
    return (
      <Text as="label" htmlFor={id} className={className}>
        {label}
      </Text>
    );
  }
  return null;
};

interface HelperTextProps {
  id?: string;
  description?: ReactNode;
  disabled?: boolean;
}

const HelperText = ({ disabled, description, id }: HelperTextProps) => {
  const prefix = usePrefix();
  const className = cx(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });

  if (description) {
    return (
      <Text as="div" id={id} className={className}>
        {description}
      </Text>
    );
  }
  return null;
};

/**
 * Determine if the given value is invalid based on the given max, min and
 * conditions like `allowEmpty`. If `invalid` is passed through, it will default
 * to false.
 *
 * @param {object} config
 * @param {boolean} config.allowEmpty
 * @param {boolean} config.invalid
 * @param {number} config.value
 * @param {number} config.max
 * @param {number} config.min
 * @param {Function} config.validate
 * @param {string} config.locale
 * @returns {boolean}
 */
function getInputValidity({
  allowEmpty,
  invalid,
  value,
  max,
  min,
  validate,
  locale,
}) {
  if (typeof validate === 'function') {
    const result = validate(value, locale);
    if (result === false) {
      return false; // immediate invalid
    }
    // If true or undefined, continue to further validations
  }

  if (invalid) {
    return false;
  }

  if (value === '') {
    return allowEmpty;
  }

  if (value > max || value < min) {
    return false;
  }

  return true;
}

/**
 * It prevents any wheel event from emitting.
 *
 * We want to prevent this input field from changing by the user accidentally
 * when the user scrolling up or down in a long form. So we prevent the default
 * behavior of wheel events when it is focused.
 *
 * Because React uses passive event handler by default, we can't just call
 * `preventDefault` in the `onWheel` event handler. So we have to get the input
 * ref and add our event handler manually.
 *
 * @see https://github.com/facebook/react/pull/19654
 * @param {WheelEvent} e A wheel event.
 */
function disableWheel(e) {
  e.preventDefault();
}

export { NumberInput };



File: NumberInput/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-numberinput--default'
    },
    {
      label: 'Fluid (unstable)',
      variant: 'experimental-unstable-fluidnumberinput--default'
    }
  ]}
/>



File: NumberInput/migrate-to-7.x.md


# Props

`<NumberInput>`

| Prop  | v9                                       | v10                 |
| ----- | ---------------------------------------- | ------------------- |
| `ref` | Grabs the React class instance reference | Grabs the `<input>` |



File: NumberInput/NumberFormatPropTypes.ts


/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';

export const NumberFormatOptionsPropType = PropTypes.shape({
  // Locale Options
  localeMatcher: PropTypes.oneOf(['best fit', 'lookup']),

  // Style Options
  style: PropTypes.oneOf(['decimal', 'currency', 'percent', 'unit']),
  currency: PropTypes.string, // e.g., 'USD'
  currencyDisplay: PropTypes.oneOf(['symbol', 'narrowSymbol', 'code', 'name']),
  currencySign: PropTypes.oneOf(['standard', 'accounting']),
  unit: PropTypes.string, // e.g., 'liter', 'mile-per-hour'
  unitDisplay: PropTypes.oneOf(['short', 'narrow', 'long']),
  notation: PropTypes.oneOf([
    'standard',
    'scientific',
    'engineering',
    'compact',
  ]),
  compactDisplay: PropTypes.oneOf(['short', 'long']),
  signDisplay: PropTypes.oneOf(['auto', 'never', 'always', 'exceptZero']),

  // Digit Options
  minimumIntegerDigits: PropTypes.number,
  minimumFractionDigits: PropTypes.number,
  maximumFractionDigits: PropTypes.number,
  minimumSignificantDigits: PropTypes.number,
  maximumSignificantDigits: PropTypes.number,
  useGrouping: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['always', 'auto', 'min2']),
  ]),

  // Misc/Other Options
  numberingSystem: PropTypes.string, // e.g., 'latn', 'arab'
  roundingIncrement: PropTypes.number,
  roundingMode: PropTypes.oneOf([
    'ceil',
    'floor',
    'expand',
    'trunc',
    'halfCeil',
    'halfFloor',
    'halfExpand',
    'halfTrunc',
    'halfEven',
  ]),
  trailingZeroDisplay: PropTypes.oneOf(['auto', 'stripIfInteger']),
});



File: NumberInput/NumberInput.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as NumberInputStories from './NumberInput.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# NumberInput

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/NumberInput)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/number-input/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/number-input/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Skeleton state](#skeleton-state)
- [AI Label](#ai-label)
- [`step` values](#step-values)
- [With type of text](#with-type-of-text)
  - [Formatting with `locale` and `formatOptions`](#formatting-with-locale-and-formatoptions)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={NumberInputStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(NumberInputStories.Default),
    },
  ]}
/>

## Skeleton state

<Canvas
  of={NumberInputStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(NumberInputStories.Skeleton),
    },
  ]}
/>

## AI Label

<Canvas
  of={NumberInputStories.withAILabel}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(NumberInputStories.withAILabel),
    },
  ]}
/>

## `step` values

When stepper buttons increment or decrement an empty input, the following
applies:

- Incrementing always starts at `min`
- Decrementing always starts at `max`
- If no `min` or `max` is provided, the input will be set to 0

## With type of text

The input `type` can be set to `text` to avoid the various limitations and ux
issues that surround `input type="number"`.

Setting `type="text"` changes the NumberInput behavior in the following ways:

- On blur of the input, the entered value is parsed and formatted based on the
  given `locale` (defaults to `en-US`) and `formatOptions` props.
- `onChange` is only called on blur of the input, and the given `event` may be a
  MouseEvent, FocusEvent, or KeyboardEvent.
- The wheel/spinbox functionality is disabled, `disableWheel` has no effect.
- `inputMode` and `pattern` props should be configured to restrict and guide
  user input.

<Canvas
  of={NumberInputStories.WithTypeOfText}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(NumberInputStories.WithTypeOfText),
    },
  ]}
/>

### Formatting with `locale` and `formatOptions`

When `type="text"`, the user input is parsed and formatted to the `locale` on:

- Blur of the input
- Click of stepper buttons
- Keydown of ArrowUp or ArrowDown keys

The formatOptions prop can be used to further customize the formatting. It
matches the signature of the
[Intl.NumberFormat API options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options).
For example, percent style can be used:

```
<NumberInput
  type="text"
  value={0.15} // 15%
  step={0.05} // 5%
  formatOptions={{ style: 'percent' }}
/>
```

### Configurable start value with stepStartValue

A step start value can be configured to provide the user a more beneficial starting point when the input is empty and an increment or decrement button is clicked. This can be used in situations where zero is not within the min/max or there is a more sensible default starting value, such as the current year when asking the user for a year. Since this allows the input to still initially be empty, it ensures on submission of the form that the user has actually interacted with the input and inserted a value.

```
<NumberInput
  type="text"
  value={1000}
  stepStartValue={10}
/>
```

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/NumberInput/NumberInput.mdx).



