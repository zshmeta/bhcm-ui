File: TextInput/ControlledPasswordInput.tsx


/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type HTMLAttributes } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View, ViewOff, WarningFilled } from '@carbon/icons-react';
import { getTextInputProps } from './util';
import { deprecate } from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import { noopFn } from '../../internal/noopFn';

export interface ControlledPasswordInputProps
  extends HTMLAttributes<HTMLInputElement> {
  /**
   * Provide a custom className that is applied directly to the underlying
   * `<input>` node
   */
  className?: string;

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue?: string | number;

  /**
   * Specify whether the control is disabled
   */
  disabled?: boolean;

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText?: React.ReactNode;

  /**
   * Specify whether or not the underlying label is visually hidden
   */
  hideLabel?: boolean;

  /**
   * "Hide password" tooltip text on password visibility toggle
   */
  hidePasswordLabel?: string;

  /**
   * Provide a unique identifier for the input field
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
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: React.ReactNode;

  /**
   * @deprecated The `light` prop for `ControlledPasswordInput` has been deprecated in favor of the new `Layer` component. It will be removed in the next major release.
   */
  light?: boolean;

  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>`
   * is updated
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<input>` is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder?: string;

  /**
   * "Show password" tooltip text on password visibility toggle
   */
  showPasswordLabel?: string;

  /**
   * Specify the size of the Text Input.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of?: start, center, or end.
   */
  tooltipAlignment?: 'start' | 'center' | 'end';

  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * Provide the current value of the `<input>`
   */
  value?: string | number;
  togglePasswordVisibility?(event: React.MouseEvent<HTMLButtonElement>): void;
  type?: string;
}

const ControlledPasswordInput = React.forwardRef(
  (
    {
      labelText,
      className,
      id,
      placeholder,
      onChange = noopFn,
      onClick = noopFn,
      disabled = false,
      hideLabel,
      invalid = false,
      invalidText = '',
      helperText = '',
      light,

      type = 'password',

      togglePasswordVisibility,
      tooltipPosition = 'bottom',
      tooltipAlignment = 'center',
      hidePasswordLabel = 'Hide password',
      showPasswordLabel = 'Show password',
      size = undefined,
      ...other
    }: ControlledPasswordInputProps,
    ref
  ) => {
    const prefix = usePrefix();
    const controlledPasswordInstanceId = useId();

    const errorId = id + '-error-msg';
    const textInputClasses = classNames(
      `${prefix}--text-input`,
      `${prefix}--password-input`,
      className,
      {
        [`${prefix}--text-input--light`]: light,
        [`${prefix}--text-input--invalid`]: invalid,
        [`${prefix}--text-input--${size}`]: size,
      }
    );
    const sharedTextInputProps = {
      id,
      onChange: (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled) {
          onChange?.(evt);
        }
      },
      onClick: (evt: React.MouseEvent<HTMLInputElement>) => {
        if (!disabled) {
          onClick?.(evt);
        }
      },
      placeholder,
      type,
      ref,
      className: textInputClasses,
      ...other,
    };
    const labelClasses = classNames(`${prefix}--label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
      [`${prefix}--label--disabled`]: disabled,
    });
    const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });
    const label = labelText ? (
      <label htmlFor={id} className={labelClasses}>
        {labelText}
      </label>
    ) : null;
    const error = invalid ? (
      <div className={`${prefix}--form-requirement`} id={errorId}>
        {invalidText}
      </div>
    ) : null;
    const passwordIsVisible = type === 'text';
    const passwordVisibilityIcon = passwordIsVisible ? (
      <ViewOff className={`${prefix}--icon-visibility-off`} />
    ) : (
      <View className={`${prefix}--icon-visibility-on`} />
    );
    const passwordVisibilityToggleClasses = classNames(
      `${prefix}--text-input--password__visibility__toggle`,
      `${prefix}--btn`,
      `${prefix}--btn--icon-only`,
      `${prefix}--tooltip__trigger`,
      `${prefix}--tooltip--a11y`,
      {
        [`${prefix}--tooltip--${tooltipPosition}`]: tooltipPosition,
        [`${prefix}--tooltip--align-${tooltipAlignment}`]: tooltipAlignment,
      }
    );

    const helperId = !helperText
      ? undefined
      : `controlled-password-helper-text-${controlledPasswordInstanceId}`;

    const input = (
      <>
        <input
          {...getTextInputProps({
            invalid,
            sharedTextInputProps,
            invalidId: errorId,
            hasHelper: !error && helperText ? true : false,
            helperId,
          })}
          data-toggle-password-visibility={type === 'password'}
        />
        <button
          type="button"
          className={passwordVisibilityToggleClasses}
          onClick={togglePasswordVisibility}>
          <span className={`${prefix}--assistive-text`}>
            {passwordIsVisible ? hidePasswordLabel : showPasswordLabel}
          </span>
          {passwordVisibilityIcon}
        </button>
      </>
    );

    const helper = helperText ? (
      <div id={helperId} className={helperTextClasses}>
        {helperText}
      </div>
    ) : null;

    return (
      <div
        className={`${prefix}--form-item ${prefix}--text-input-wrapper ${prefix}--password-input-wrapper`}>
        {label}
        <div
          className={`${prefix}--text-input__field-wrapper`}
          data-invalid={invalid || null}>
          {invalid && (
            <WarningFilled className={`${prefix}--text-input__invalid-icon`} />
          )}
          {input}
        </div>
        {error ? error : helper}
      </div>
    );
  }
);

ControlledPasswordInput.displayName = 'ControlledPasswordInput';
ControlledPasswordInput.propTypes = {
  /**
   * Provide a custom className that is applied directly to the underlying
   * `<input>` node
   */
  className: PropTypes.string,

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether or not the underlying label is visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * "Hide password" tooltip text on password visibility toggle
   */
  hidePasswordLabel: PropTypes.string,

  /**
   * Provide a unique identifier for the input field
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
  labelText: PropTypes.node.isRequired,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `ControlledPasswordInput` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

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
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder: PropTypes.string,

  /**
   * "Show password" tooltip text on password visibility toggle
   */
  showPasswordLabel: PropTypes.string,

  /**
   * Specify the size of the Text Input.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * Provide the current value of the `<input>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ControlledPasswordInput;



File: TextInput/TextInput.tsx


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
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import classNames from 'classnames';
import { useNormalizedInputProps } from '../../internal/useNormalizedInputProps';
import { deprecate } from '../../prop-types/deprecate';
import { getTextInputProps } from './util';
import { FormContext } from '../FluidForm';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';
import { getAnnouncement } from '../../internal/getAnnouncement';
import { Text } from '../Text';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';

type ExcludedAttributes = 'defaultValue' | 'id' | 'size' | 'value';

export interface TextInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    ExcludedAttributes
  > {
  /**
   * Specify an optional className to be applied to the `<input>` node
   */
  className?: string;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `TextInput` component
   */
  decorator?: ReactNode;

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue?: string | number;

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;

  /**
   * Specify whether to display the character counter
   */
  enableCounter?: boolean;

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText?: ReactNode;

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel?: boolean;

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: string;

  /**
   * `true` to use the inline version.
   */
  inline?: boolean;

  /**
   * Specify whether the control is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: ReactNode;

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: ReactNode;

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   * 'The `light` prop for `TextInput` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
   */
  light?: boolean;

  /**
   * Max character count allowed for the input. This is needed in order for enableCounter to display
   */
  maxCount?: number;

  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>`
   * is updated
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<input>` is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder?: string;

  /**
   * Whether the input should be read-only
   */
  readOnly?: boolean;

  /**
   * Specify the size of the Text Input. Currently supports the following:
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `TextInput` component
   */
  slug?: ReactNode;

  /**
   * Specify the type of the `<input>`
   */
  type?: string;

  /**
   * Specify the value of the `<input>`
   */
  value?: string | number | undefined;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNode;
}

const TextInput = React.forwardRef(
  (
    {
      className,
      decorator,
      disabled = false,
      helperText,
      hideLabel,
      id,
      inline = false,
      invalid = false,
      invalidText,
      labelText,
      light,
      onChange = () => {},
      onClick = () => {},
      placeholder,
      readOnly,
      size,
      type = 'text',
      warn = false,
      warnText,
      enableCounter = false,
      maxCount,
      slug,
      ...rest
    }: TextInputProps,
    ref
  ) => {
    const prefix = usePrefix();

    const { defaultValue, value } = rest;

    const inputRef = useRef<HTMLInputElement>(null);
    const mergedRef = useMergedRefs([ref, inputRef]);

    function getInitialTextCount(): number {
      const targetValue =
        defaultValue || value || inputRef.current?.value || '';
      return targetValue.toString().length;
    }

    const [textCount, setTextCount] = useState(getInitialTextCount());

    useEffect(() => {
      setTextCount(getInitialTextCount());
      // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
    }, [value, defaultValue, enableCounter]);

    const normalizedProps = useNormalizedInputProps({
      id,
      readOnly,
      disabled,
      invalid,
      invalidText,
      warn,
      warnText,
    });

    const textInputClasses = classNames(`${prefix}--text-input`, {
      [`${prefix}--text-input--light`]: light,
      [`${prefix}--text-input--invalid`]: normalizedProps.invalid,
      [`${prefix}--text-input--warning`]: normalizedProps.warn,
      [`${prefix}--text-input--${size}`]: size, // TODO: V12 - Remove this class
      [`${prefix}--layout--size-${size}`]: size,
    });
    const sharedTextInputProps = {
      id,
      onChange: (evt) => {
        if (!normalizedProps.disabled) {
          setTextCount(evt.target.value?.length);
          onChange(evt);
        }
      },
      onClick: (evt) => {
        if (!normalizedProps.disabled) {
          onClick(evt);
        }
      },
      placeholder,
      type,
      ref: mergedRef,
      className: textInputClasses,
      title: placeholder,
      disabled: normalizedProps.disabled,
      readOnly,
      ['aria-describedby']: helperText && normalizedProps.helperId,
      ...rest,
    };

    if (enableCounter) {
      sharedTextInputProps.maxLength = maxCount;
    }

    const inputWrapperClasses = classNames(
      [classNames(`${prefix}--form-item`, className)],
      `${prefix}--text-input-wrapper`,
      {
        [`${prefix}--text-input-wrapper--readonly`]: readOnly,
        [`${prefix}--text-input-wrapper--light`]: light,
        [`${prefix}--text-input-wrapper--inline`]: inline,
        [`${prefix}--text-input-wrapper--inline--invalid`]:
          inline && normalizedProps.invalid,
      }
    );
    const labelClasses = classNames(`${prefix}--label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
      [`${prefix}--label--disabled`]: normalizedProps.disabled,
      [`${prefix}--label--inline`]: inline,
      [`${prefix}--label--inline--${size}`]: inline && !!size,
    });
    const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: normalizedProps.disabled,
      [`${prefix}--form__helper-text--inline`]: inline,
    });
    const fieldOuterWrapperClasses = classNames(
      `${prefix}--text-input__field-outer-wrapper`,
      {
        [`${prefix}--text-input__field-outer-wrapper--inline`]: inline,
      }
    );
    const fieldWrapperClasses = classNames(
      `${prefix}--text-input__field-wrapper`,
      {
        [`${prefix}--text-input__field-wrapper--warning`]: normalizedProps.warn,
        [`${prefix}--text-input__field-wrapper--slug`]: slug,
        [`${prefix}--text-input__field-wrapper--decorator`]: decorator,
      }
    );
    const iconClasses = classNames({
      [`${prefix}--text-input__invalid-icon`]:
        normalizedProps.invalid || normalizedProps.warn,
      [`${prefix}--text-input__invalid-icon--warning`]: normalizedProps.warn,
    });

    const counterClasses = classNames(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: disabled,
      [`${prefix}--text-input__label-counter`]: true,
    });

    const counter =
      enableCounter && maxCount ? (
        <Text
          as="div"
          className={counterClasses}>{`${textCount}/${maxCount}`}</Text>
      ) : null;

    const label = labelText ? (
      <Text as="label" htmlFor={id} className={labelClasses}>
        {labelText}
      </Text>
    ) : null;

    const labelWrapper = (
      <div className={`${prefix}--text-input__label-wrapper`}>
        {label}
        {counter}
      </div>
    );

    const helper = helperText ? (
      <Text
        as="div"
        id={normalizedProps.helperId}
        className={helperTextClasses}>
        {helperText}
      </Text>
    ) : null;

    const input = (
      <input
        {...getTextInputProps({
          sharedTextInputProps,
          invalid: normalizedProps.invalid,
          invalidId: normalizedProps.invalidId,
          warn: normalizedProps.warn,
          warnId: normalizedProps.warnId,
        })}
      />
    );

    const { isFluid } = useContext(FormContext);
    const announcerRef = useRef<HTMLSpanElement>(null);
    const [prevAnnouncement, setPrevAnnouncement] = useState('');
    const ariaAnnouncement = getAnnouncement(textCount, maxCount);
    useEffect(() => {
      if (ariaAnnouncement && ariaAnnouncement !== prevAnnouncement) {
        const announcer = announcerRef.current as HTMLSpanElement | null;
        if (announcer) {
          // Clear the content first
          announcer.textContent = '';
          // Set the new content after a small delay
          const timeoutId = setTimeout(() => {
            if (announcer) {
              announcer.textContent = ariaAnnouncement;
              setPrevAnnouncement(ariaAnnouncement);
            }
          }, 1000);
          // clear the timeout
          return () => {
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
          };
        }
      }
    }, [ariaAnnouncement, prevAnnouncement]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    const Icon = normalizedProps.icon as any;

    // AILabel is always size `mini`
    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator = candidateIsAILabel
      ? cloneElement(candidate, { size: 'mini' })
      : candidate;

    return (
      <div className={inputWrapperClasses}>
        {!inline ? (
          labelWrapper
        ) : (
          <div className={`${prefix}--text-input__label-helper-wrapper`}>
            {labelWrapper}
            {!isFluid && (normalizedProps.validation || helper)}
          </div>
        )}
        <div className={fieldOuterWrapperClasses}>
          <div
            className={fieldWrapperClasses}
            data-invalid={normalizedProps.invalid || null}>
            {Icon && <Icon className={iconClasses} />}
            {input}
            {slug ? (
              normalizedDecorator
            ) : decorator ? (
              <div
                className={`${prefix}--text-input__field-inner-wrapper--decorator`}>
                {normalizedDecorator}
              </div>
            ) : (
              ''
            )}
            <span
              className={`${prefix}--text-input__counter-alert`}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              ref={announcerRef}>
              {ariaAnnouncement}
            </span>
            {isFluid && <hr className={`${prefix}--text-input__divider`} />}
            {isFluid && !inline && normalizedProps.validation}
          </div>
          {!isFluid && !inline && (normalizedProps.validation || helper)}
        </div>
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
TextInput.propTypes = {
  /**
   * Specify an optional className to be applied to the `<input>` node
   */
  className: PropTypes.string,

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `TextInput` component
   */
  decorator: PropTypes.node,

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether to display the character counter
   */
  enableCounter: PropTypes.bool,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: PropTypes.string.isRequired,

  /**
   * `true` to use the inline version.
   */
  inline: PropTypes.bool,

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
  labelText: PropTypes.node.isRequired,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `TextInput` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * Max character count allowed for the input. This is needed in order for enableCounter to display
   */
  maxCount: PropTypes.number,

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
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder: PropTypes.string,

  /**
   * Whether the input should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the size of the Text Input. Currently supports the following:
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `TextInput` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop for `TextInput` has ' +
      'been deprecated in favor of the new `decorator` prop. It will be removed in the next major release.'
  ),

  /**
   * Specify the type of the `<input>`
   */
  type: PropTypes.string,

  /**
   * Specify the value of the `<input>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

export default TextInput;



File: TextInput/TextInput.Skeleton.tsx


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

export interface TextInputSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className?: string;

  /**
   * Specify whether the label should be hidden or not.
   */
  hideLabel?: boolean;
}

const TextInputSkeleton = ({
  hideLabel,
  className,
  ...rest
}: TextInputSkeletonProps) => {
  const prefix = usePrefix();
  return (
    <div className={cx(`${prefix}--form-item`, className)} {...rest}>
      {!hideLabel && (
        <span className={`${prefix}--label ${prefix}--skeleton`} />
      )}
      <div className={`${prefix}--skeleton ${prefix}--text-input`} />
    </div>
  );
};

TextInputSkeleton.propTypes = {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className: PropTypes.string,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,
};

export default TextInputSkeleton;
export { TextInputSkeleton };



File: TextInput/TextInput.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as TextInputStories from './TextInput.stories';
import * as PasswordInputStories from './PasswordInput.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# TextInput

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/TextInput)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/text-input/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/text-input/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [Fluid](#fluid)
  - [Read Only](#read-only)
  - [Skeleton](#skeleton)
  - [AI Label](#ai-label)
  - [With Layer](#with-layer)
  - [Password Input](#password-input)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

Text inputs enable users to enter free-form text data. The type of text field
used should reflect the length of the content you expect the user to enter. The
default text input is for short, one-line content.

<Canvas
  of={TextInputStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TextInputStories.Default),
    },
  ]}
/>

### Fluid

<Canvas
  of={TextInputStories.Fluid}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TextInputStories.Fluid),
    },
  ]}
/>

### Read Only

<Canvas
  of={TextInputStories.ReadOnly}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TextInputStories.ReadOnly),
    },
  ]}
/>

### Skeleton

<Canvas
  of={TextInputStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TextInputStories.Skeleton),
    },
  ]}
/>

### AI Label

<Canvas
  of={TextInputStories.withAILabel}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TextInputStories.withAILabel),
    },
  ]}
/>

### With Layer

<Canvas of={TextInputStories._WithLayer} />

### Password Input

Password input is a variant of text input in it's on story called
[PasswordInput](https://react.carbondesignsystem.com/?path=/story/components-passwordinput--default).
It is used to collect private data and will hide the characters as a user enters
them. A user can choose to toggle on the character visibility by clicking the
view icon on the far right of the input field. When using a password input be
sure to provide detailed helper text listing any requirements related to the
data format, such as types of characters allowed or date structure.

`TextInput.Password` is deprecated, use
[PasswordInput](https://react.carbondesignsystem.com/?path=/story/components-passwordinput--default)
component instead.

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/TextInput/TextInput.mdx).TextInputStories,



File: TextInput/PasswordInput.tsx


/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  InputHTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View, ViewOff } from '@carbon/icons-react';
import { useNormalizedInputProps } from '../../internal/useNormalizedInputProps';
import { getTextInputProps } from './util';
import { FormContext } from '../FluidForm';
import { Tooltip } from '../Tooltip';
import { PopoverAlignment } from '../Popover';
import { deprecate } from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';

type ExcludedAttributes = 'size';

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, ExcludedAttributes> {
  /**
   * Provide a custom className that is applied directly to the underlying `<input>` node
   */
  className?: string;

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue?: string | number;

  /**
   * Specify whether the control is disabled
   */
  disabled?: boolean;

  /**
   * Specify whether to display the character counter
   */
  enableCounter?: boolean;

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText?: ReactNode;

  /**
   * Specify whether or not the underlying label is visually hidden
   */
  hideLabel?: boolean;

  /**
   * "Hide password" tooltip text on password visibility toggle
   */
  hidePasswordLabel?: string;

  /**
   * Provide a unique identifier for the input field
   */
  id: string;

  /**
   * `true` to use the inline version
   */
  inline?: boolean;

  /**
   * Specify whether the control is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: ReactNode;

  /**
   * Provide the text that will be read by a screen reader when visiting this control
   */
  labelText: ReactNode;

  /**
   * @deprecated The `light` prop for `PasswordInput` has been deprecated in favor of the new `Layer` component. It will be removed in the next major release.
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light?: boolean;

  /**
   * Max character count allowed for the input. This is needed in order for enableCounter to display
   */
  maxCount?: number;

  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>` is updated
   * @param evt Change event triggered by `<input>`
   * @returns {void}
   */
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Optionally provide an `onClick` handler that is called whenever the `<input>` is returned
   * @param evt Mouse event triggered by `<input>`
   * @returns {void}
   */
  onClick?: (evt: React.MouseEvent<HTMLInputElement>) => void;

  /**
   * Callback function that is called whenever the toggle password visibility button is clicked
   * @param evt Mouse event triggered by the password visibility `<button>`
   * @returns {void}
   */
  onTogglePasswordVisibility?: (
    evt: React.MouseEvent<HTMLButtonElement>
  ) => void;

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder?: string;

  /**
   * Whether the input should be read-only
   */
  readOnly?: boolean;

  /**
   * "Show password" tooltip text on password visibility toggle
   */
  showPasswordLabel?: string;

  /**
   * Specify the size of the Text Input. Supports `sm`, `md`, or `lg`.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: `start`, `center`, or `end`.
   */
  tooltipAlignment?: 'start' | 'center' | 'end';

  /**
   * Specify the direction of the tooltip for the icon-only button.
   * Can be either `top`, `right`, `bottom`, or `left`
   */
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * The input type, either `password` or `text`
   */
  type?: 'password' | 'text';

  /**
   * Provide the current value of the `<input>`
   */
  value?: string | number;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNode;
}

const PasswordInput = React.forwardRef(
  (
    {
      className,
      disabled = false,
      helperText,
      hideLabel,
      hidePasswordLabel = 'Hide password',
      id,
      inline,
      invalid = false,
      invalidText,
      labelText,
      light,
      onChange = () => {},
      onClick = () => {},
      onTogglePasswordVisibility,
      placeholder,
      readOnly,
      size = 'md',
      showPasswordLabel = 'Show password',
      tooltipPosition = 'bottom',
      tooltipAlignment = 'end',
      type = 'password',
      warn = false,
      warnText,
      ...rest
    }: PasswordInputProps,
    ref
  ) => {
    const [inputType, setInputType] = useState(type);
    const prefix = usePrefix();
    const normalizedProps = useNormalizedInputProps({
      id,
      invalid,
      invalidText,
      warn,
      warnText,
      readOnly,
      disabled,
    });

    const { isFluid } = useContext(FormContext);

    const handleTogglePasswordVisibility = (event) => {
      setInputType(inputType === 'password' ? 'text' : 'password');
      // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
      onTogglePasswordVisibility && onTogglePasswordVisibility(event);
    };
    const textInputClasses = classNames(
      `${prefix}--text-input`,
      `${prefix}--password-input`,
      className,
      {
        [`${prefix}--text-input--light`]: light,
        [`${prefix}--text-input--invalid`]: normalizedProps.invalid,
        [`${prefix}--text-input--warning`]: normalizedProps.warn,
        [`${prefix}--text-input--${size}`]: size, // TODO: V12 - Remove this class
        [`${prefix}--layout--size-${size}`]: size,
      }
    );
    const sharedTextInputProps = {
      id,
      onChange: (evt) => {
        if (!disabled) {
          onChange(evt);
        }
      },
      onClick: (evt) => {
        if (!disabled) {
          onClick(evt);
        }
      },
      placeholder,
      type: inputType,
      className: textInputClasses,
      readOnly,
      ref,
      ...rest,
    };
    const inputWrapperClasses = classNames(
      `${prefix}--form-item`,
      `${prefix}--text-input-wrapper`,
      `${prefix}--password-input-wrapper`,
      {
        [`${prefix}--text-input-wrapper--readonly`]: readOnly,
        [`${prefix}--text-input-wrapper--light`]: light,
        [`${prefix}--text-input-wrapper--inline`]: inline,
        [`${prefix}--text-input--fluid`]: isFluid,
      }
    );
    const labelClasses = classNames(`${prefix}--label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
      [`${prefix}--label--disabled`]: disabled,
      [`${prefix}--label--inline`]: inline,
      [`${prefix}--label--inline--${size}`]: inline && !!size,
    });
    const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: disabled,
      [`${prefix}--form__helper-text--inline`]: inline,
    });
    const fieldOuterWrapperClasses = classNames(
      `${prefix}--text-input__field-outer-wrapper`,
      {
        [`${prefix}--text-input__field-outer-wrapper--inline`]: inline,
      }
    );
    const fieldWrapperClasses = classNames(
      `${prefix}--text-input__field-wrapper`,
      {
        [`${prefix}--text-input__field-wrapper--warning`]: normalizedProps.warn,
      }
    );
    const iconClasses = classNames({
      [`${prefix}--text-input__invalid-icon`]:
        normalizedProps.invalid || normalizedProps.warn,
      [`${prefix}--text-input__invalid-icon--warning`]: normalizedProps.warn,
    });

    const label = labelText ? (
      <label htmlFor={id} className={labelClasses}>
        {labelText}
      </label>
    ) : null;
    const helper = helperText ? (
      <div id={normalizedProps.helperId} className={helperTextClasses}>
        {helperText}
      </div>
    ) : null;

    const passwordIsVisible = inputType === 'text';
    const passwordVisibilityIcon = passwordIsVisible ? (
      <ViewOff className={`${prefix}--icon-visibility-off`} />
    ) : (
      <View className={`${prefix}--icon-visibility-on`} />
    );

    const passwordVisibilityToggleClasses = classNames(
      `${prefix}--text-input--password__visibility__toggle`,
      `${prefix}--btn`,
      `${prefix}--tooltip__trigger`,
      `${prefix}--tooltip--a11y`,
      {
        [`${prefix}--tooltip--${tooltipPosition}`]: tooltipPosition,
        [`${prefix}--tooltip--align-${tooltipAlignment}`]: tooltipAlignment,
      }
    );

    let align: PopoverAlignment | undefined = undefined;

    if (tooltipPosition === 'top' || tooltipPosition === 'bottom') {
      if (tooltipAlignment === 'center') {
        align = tooltipPosition;
      }
      if (tooltipAlignment === 'end') {
        align = `${tooltipPosition}-end`;
      }
      if (tooltipAlignment === 'start') {
        align = `${tooltipPosition}-start`;
      }
    }

    if (tooltipPosition === 'right' || tooltipPosition === 'left') {
      align = tooltipPosition;
    }
    if (!hidePasswordLabel || hidePasswordLabel.trim() === '') {
      // eslint-disable-next-line no-console -- https://github.com/carbon-design-system/carbon/issues/20452
      console.warn('Warning: The "hidePasswordLabel" should not be blank.');
    } else if (!showPasswordLabel || showPasswordLabel.trim() === '') {
      // eslint-disable-next-line no-console -- https://github.com/carbon-design-system/carbon/issues/20452
      console.warn('Warning: The "showPasswordLabel" should not be blank.');
    }
    const input = (
      <>
        <input
          {...getTextInputProps({
            sharedTextInputProps,
            invalid: normalizedProps.invalid,
            invalidId: normalizedProps.invalidId,
            warn: normalizedProps.warn,
            warnId: normalizedProps.warnId,
            hasHelper: Boolean(
              helperText &&
                !isFluid &&
                (inline || (!inline && !normalizedProps.validation))
            ),
            helperId: normalizedProps.helperId,
          })}
          disabled={disabled}
          data-toggle-password-visibility={inputType === 'password'}
        />
        {isFluid && <hr className={`${prefix}--text-input__divider`} />}

        <Tooltip
          align={align}
          className={`${prefix}--toggle-password-tooltip`}
          label={passwordIsVisible ? hidePasswordLabel : showPasswordLabel}>
          <button
            type="button"
            className={passwordVisibilityToggleClasses}
            disabled={disabled || readOnly}
            onClick={handleTogglePasswordVisibility}>
            {passwordVisibilityIcon}
          </button>
        </Tooltip>
      </>
    );

    useEffect(() => {
      setInputType(type);
    }, [type]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    const Icon = normalizedProps.icon as any;

    return (
      <div className={inputWrapperClasses}>
        {!inline ? (
          label
        ) : (
          <div className={`${prefix}--text-input__label-helper-wrapper`}>
            {label}
            {!isFluid && helper}
          </div>
        )}
        <div className={fieldOuterWrapperClasses}>
          <div
            className={fieldWrapperClasses}
            data-invalid={normalizedProps.invalid || null}>
            {Icon && <Icon className={iconClasses} />}
            {input}
            {isFluid && !inline && normalizedProps.validation}
          </div>
          {!isFluid && !inline && (normalizedProps.validation || helper)}
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
PasswordInput.propTypes = {
  /**
   * Provide a custom className that is applied directly to the underlying
   * `<input>` node
   */
  className: PropTypes.string,

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether or not the underlying label is visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * "Hide password" tooltip text on password visibility toggle
   */
  hidePasswordLabel: PropTypes.string,

  /**
   * Provide a unique identifier for the input field
   */
  id: PropTypes.string.isRequired,

  /**
   * `true` to use the inline version.
   */
  inline: PropTypes.bool,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Whether the PasswordInput should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `PasswordInput` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

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
   * Callback function that is called whenever the toggle password visibility
   * button is clicked
   */
  onTogglePasswordVisibility: PropTypes.func,

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder: PropTypes.string,

  /**
   * "Show password" tooltip text on password visibility toggle
   */
  showPasswordLabel: PropTypes.string,

  /**
   * Specify the size of the Text Input. Supports `sm`, `md`, or `lg`.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The input type, either password or text
   */
  type: PropTypes.oneOf(['password', 'text']),

  /**
   * Provide the current value of the `<input>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

export default PasswordInput;



File: TextInput/PasswordInput.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { PasswordInput } from '../PasswordInput';

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = (args) => {
  return (
    <div style={{ width: args.defaultWidth }}>
      <PasswordInput
        {...args}
        id="text-input-1"
        labelText="Text input label"
        helperText="Optional help text"
        autoComplete="true"
      />
    </div>
  );
};

Default.args = {
  defaultWidth: 300,
  className: 'input-test-class',
  placeholder: 'Placeholder text',
  invalid: false,
  invalidText: 'Error message goes here',
  disabled: false,
  labelText: 'Label text',
  helperText: 'Helper text',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  size: 'md',
};

Default.argTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  className: {
    control: {
      type: 'text',
    },
  },
  defaultValue: {
    control: {
      type: 'text',
    },
  },
  placeholder: {
    control: {
      type: 'text',
    },
  },
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  labelText: {
    control: {
      type: 'text',
    },
  },
  helperText: {
    control: {
      type: 'text',
    },
  },
  warn: {
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    control: {
      type: 'text',
    },
  },
  value: {
    control: {
      type: 'text',
    },
  },
  onChange: {
    action: 'onChange',
  },
  onClick: {
    action: 'onClick',
  },
  size: {
    options: ['sm', 'md', 'lg', 'xl'],
    control: {
      type: 'select',
    },
  },
};



File: TextInput/index.ts


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import TextInput, { type TextInputProps } from './TextInput';
import { type TextInputSkeletonProps } from './TextInput.Skeleton';

export { default as TextInputSkeleton } from './TextInput.Skeleton';
export default TextInput;
export { type TextInputSkeletonProps };
export { TextInput, type TextInputProps };



File: TextInput/TextInput.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { WithLayer } from '../../../.storybook/templates/WithLayer';
import FluidForm from '../FluidForm';
import { View, FolderOpen, Folders, Information } from '@carbon/icons-react';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import mdx from './TextInput.mdx';

import { default as TextInput, TextInputSkeleton } from '../TextInput';

export default {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  subcomponents: {
    TextInputSkeleton,
  },
  args: {
    className: 'input-test-class',
    id: 'text-input-1',
    placeholder: 'Placeholder text',
    invalid: false,
    invalidText: 'Error message goes here',
    disabled: false,
    labelText: 'Label text',
    helperText: 'Helper text',
    warn: false,
    warnText:
      'Warning message that is really long can wrap to more lines but should not be excessively long.',
    size: 'md',
    readOnly: false,
    inline: false,
    hideLabel: false,
    enableCounter: false,
    maxCount: 10,
    type: 'text',
    defaultWidth: 300,
    defaultValue: '',
  },
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
    },
    defaultValue: {
      control: {
        type: 'text',
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
    },
    invalid: {
      control: {
        type: 'boolean',
      },
    },
    invalidText: {
      control: {
        type: 'text',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    labelText: {
      control: {
        type: 'text',
      },
    },
    helperText: {
      control: {
        type: 'text',
      },
    },
    warn: {
      control: {
        type: 'boolean',
      },
    },
    warnText: {
      control: {
        type: 'text',
      },
    },
    value: {
      control: {
        type: 'text',
      },
    },
    onChange: {
      action: 'onChange',
    },
    onClick: {
      action: 'onClick',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
    type: {
      control: {
        type: 'text',
      },
    },
    id: {
      control: { type: 'text' },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
    },
    inline: {
      control: {
        type: 'boolean',
      },
    },
    hideLabel: {
      control: {
        type: 'boolean',
      },
    },
    enableCounter: {
      control: {
        type: 'boolean',
      },
    },
    maxCount: {
      control: {
        type: 'number',
      },
    },
    light: {
      table: {
        disable: true,
      },
    },
    slug: {
      table: {
        disable: true,
      },
    },
    defaultWidth: {
      control: { type: 'range', min: 300, max: 800, step: 50 },
    },
  },
};

export const Default = (args) => {
  const { defaultWidth, ...textInputArgs } = args;

  return (
    <div style={{ width: defaultWidth }}>
      <TextInput {...textInputArgs} />
    </div>
  );
};

export const Fluid = (args) => {
  const { defaultWidth, ...textInputArgs } = args;

  return (
    <div style={{ width: defaultWidth }}>
      <FluidForm>
        <TextInput {...textInputArgs} />
      </FluidForm>
    </div>
  );
};

Fluid.parameters = {
  controls: {
    exclude: ['helperText'],
  },
};

export const ReadOnly = (args) => {
  const { defaultWidth, ...textInputArgs } = args;

  return (
    <div style={{ width: defaultWidth }}>
      <TextInput {...textInputArgs} />
    </div>
  );
};

ReadOnly.args = {
  defaultValue: "This is read only, you can't type more.",
  readOnly: true,
};

ReadOnly.parameters = {
  controls: {
    exclude: [
      'readOnly',
      'disabled',
      'invalid',
      'invalidText',
      'warn',
      'warnText',
      'enableCounter',
      'maxCount',
      'value',
    ],
  },
};

export const _WithLayer = (args) => {
  const { defaultWidth, ...textInputArgs } = args;

  return (
    <WithLayer>
      {(layer) => (
        <div style={{ width: defaultWidth }}>
          <TextInput {...textInputArgs} id={`text-input-${layer}`} />
        </div>
      )}
    </WithLayer>
  );
};

export const withAILabel = (args) => {
  const { defaultWidth, ...textInputArgs } = args;
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
    <div style={{ width: defaultWidth }}>
      <TextInput
        {...textInputArgs}
        type="text"
        labelText="Text input label"
        helperText="Optional help text"
        id="text-input-ai-label"
        decorator={aiLabel}
      />
    </div>
  );
};

export const Skeleton = (args) => <TextInputSkeleton {...args} />;

Skeleton.args = {
  hideLabel: false,
};

Skeleton.parameters = {
  controls: {
    include: ['hideLabel'],
  },
};

// Hidden Test-Only Story. This story tests for a bug where the invalid-text would overlap with components below it. #19960
export const TestInvalidTextNoOverlap = (args) => {
  return (
    <div style={{ width: args.defaultWidth }}>
      <TextInput
        labelText="test invalid text, the invalid text should not overlap"
        invalid
        invalidText="invalid text, this should not overlap with the component below"
        id="text-input-1"
        type="text"
      />
      <TextInput labelText="test label" id="text-input-2" type="text" />
    </div>
  );
};

/*
 * This story will:
 * - Be excluded from the docs page
 * - Removed from the sidebar navigation
 * - Still be a tested variant
 */
TestInvalidTextNoOverlap.tags = ['!dev', '!autodocs'];



File: TextInput/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-textinput--default',
    },
    {
      label: 'Fluid',
      variant: 'components-textinput--fluid',
    },
    {
      label: 'Read only',
      variant: 'components-textinput--read-only',
    },
    {
      label: 'Password Input',
      variant: 'components-passwordinput--default',
    },
    {
      label: 'Fluid (unstable)',
      variant: 'experimental-unstable-fluidtextinput--default',
    },
    {
      label: 'Fluid with Tooltip (unstable)',
      variant: 'experimental-unstable-fluidtextinput--default-with-tooltip',
    },
    {
      label: 'Fluid with Password Input (unstable)',
      variant:
        'experimental-fluid-components-unstable-fluidpasswordinput--default',
    },
  ]}
/>



File: TextInput/util.ts


/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const invalidProps = (invalidId: string) => ({
  'data-invalid': true,
  'aria-invalid': true,
  'aria-describedby': invalidId,
});

const warnProps = (warnId: string | undefined) => ({
  'aria-describedby': warnId,
});

const helperProps = (helperId: string | undefined) => ({
  'aria-describedby': helperId,
});

interface TextInputPropsConfig {
  sharedTextInputProps: Record<string, unknown>;
  invalid: boolean;
  invalidId: string;
  warn?: boolean;
  warnId?: string;
  hasHelper?: boolean;
  helperId?: string;
}

export const getTextInputProps = ({
  sharedTextInputProps,
  invalid,
  invalidId,
  warn,
  warnId,
  hasHelper,
  helperId,
}: TextInputPropsConfig) => ({
  ...sharedTextInputProps,
  ...(invalid ? invalidProps(invalidId) : {}),
  ...(warn ? warnProps(warnId) : {}),
  ...(hasHelper ? helperProps(helperId) : {}),
});



