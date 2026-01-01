File: TextArea/TextArea.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  cloneElement,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import classNames from 'classnames';
import { deprecate } from '../../prop-types/deprecate';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import { getAnnouncement } from '../../internal/getAnnouncement';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { useId } from '../../internal/useId';
import { noopFn } from '../../internal/noopFn';
import { Text } from '../Text';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Provide a custom className that is applied directly to the underlying
   * `<textarea>` node
   */
  className?: string;

  /**
   * Specify the `cols` attribute for the underlying `<textarea>` node
   */
  cols?: number;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `TextArea` component
   */
  decorator?: ReactNode;

  /**
   * Optionally provide the default value of the `<textarea>`
   */
  defaultValue?: string | number;

  /**
   * Specify whether the control is disabled
   */
  disabled?: boolean;

  /**
   * Specify whether to display the counter
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
   * Provide a unique identifier for the control
   */
  id?: string;

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
   * @deprecated
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light?: boolean;

  /**
   * Max entity count allowed for the textarea. This is needed in order for enableCounter to display
   */
  maxCount?: number;

  /**
   * Optionally provide an `onChange` handler that is called whenever `<textarea>`
   * is updated
   */
  onChange?: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<textarea>` is clicked
   */
  onClick?: (evt: React.MouseEvent<HTMLTextAreaElement>) => void;

  /**
   * Optionally provide an `onKeyDown` handler that is called whenever `<textarea>`
   * is keyed
   */
  onKeyDown?: (evt: React.KeyboardEvent<HTMLTextAreaElement>) => void;

  /**
   * Specify the placeholder attribute for the `<textarea>`
   */
  placeholder?: string;

  /**
   * Whether the textarea should be read-only
   */
  readOnly?: boolean;

  /**
   * Specify the rows attribute for the `<textarea>`
   */
  rows?: number;

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `TextArea` component
   */
  slug?: ReactNode;

  /**
   * Provide the current value of the `<textarea>`
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

  /**
   * Specify the method used for calculating the counter number
   */
  counterMode?: 'character' | 'word';
}

const frFn = forwardRef<HTMLTextAreaElement, TextAreaProps>;

const TextArea = frFn((props, forwardRef) => {
  const {
    className,
    decorator,
    disabled = false,
    id,
    labelText,
    hideLabel,
    onChange = noopFn,
    onClick = noopFn,
    onKeyDown = noopFn,
    invalid = false,
    invalidText = '',
    helperText = '',
    light,
    placeholder = '',
    enableCounter = false,
    maxCount,
    counterMode = 'character',
    warn = false,
    warnText = '',
    rows = 4,
    slug,
    ...other
  } = props;
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const { defaultValue, value } = other;

  const textAreaInstanceId = useId();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const helperTextRef = useRef<HTMLDivElement>(null);
  const errorTextRef = useRef<HTMLDivElement>(null);
  const warnTextRef = useRef<HTMLDivElement>(null);

  const ref = useMergedRefs([forwardRef, textareaRef]);

  function getInitialTextCount(): number {
    const targetValue =
      defaultValue || value || textareaRef.current?.value || '';
    const strValue = targetValue.toString();

    if (counterMode === 'character') {
      return strValue.length;
    } else {
      return strValue.match(/\p{L}+/gu)?.length || 0;
    }
  }

  const [textCount, setTextCount] = useState(getInitialTextCount());

  useEffect(() => {
    setTextCount(getInitialTextCount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, defaultValue, counterMode]);

  useIsomorphicEffect(() => {
    if (other.cols && textareaRef.current) {
      textareaRef.current.style.width = '';
      textareaRef.current.style.resize = 'none';
    } else if (textareaRef.current) {
      textareaRef.current.style.width = `100%`;
    }

    if (!wrapperRef.current) return;
    const applyWidth = (width: number) => {
      [helperTextRef, errorTextRef, warnTextRef].forEach((r) => {
        if (r.current) {
          r.current.style.maxWidth = `${width}px`;
          r.current.style.overflowWrap = 'break-word';
        }
      });
    };

    const resizeObserver = new ResizeObserver(([entry]) => {
      applyWidth(entry.contentRect.width);
    });
    resizeObserver.observe(wrapperRef.current);

    return () => resizeObserver && resizeObserver.disconnect();
  }, [other.cols, invalid, warn]);

  const textareaProps: {
    id: TextAreaProps['id'];
    onKeyDown: TextAreaProps['onKeyDown'];
    onChange: TextAreaProps['onChange'];
    onClick: TextAreaProps['onClick'];
    maxLength?: number;
    onPaste?: React.ClipboardEventHandler<HTMLTextAreaElement>;
  } = {
    id,
    onKeyDown: (evt) => {
      if (!disabled && enableCounter && counterMode === 'word') {
        const key = evt.which;

        if (
          (maxCount && textCount >= maxCount && key === 32) ||
          (maxCount && textCount >= maxCount && key === 13)
        ) {
          evt.preventDefault();
        }
      }

      if (!disabled && onKeyDown) {
        onKeyDown(evt);
      }
    },
    onPaste: (evt) => {
      if (!disabled) {
        if (
          counterMode === 'word' &&
          enableCounter &&
          typeof maxCount !== 'undefined' &&
          textareaRef.current !== null
        ) {
          const existingWords: string[] =
            textareaRef.current.value.match(/\p{L}+/gu) || [];
          const pastedWords: string[] =
            evt.clipboardData.getData('Text').match(/\p{L}+/gu) || [];

          const totalWords = existingWords.length + pastedWords.length;

          if (totalWords > maxCount) {
            evt.preventDefault();

            const allowedWords = existingWords
              .concat(pastedWords)
              .slice(0, maxCount);

            setTimeout(() => {
              setTextCount(maxCount);
            }, 0);

            textareaRef.current.value = allowedWords.join(' ');
          }
        }
      }
    },
    onChange: (evt) => {
      if (!disabled) {
        if (counterMode == 'character') {
          evt?.persist?.();
          // delay textCount assignation to give the textarea element value time to catch up if is a controlled input
          setTimeout(() => {
            setTextCount(evt.target?.value?.length);
          }, 0);
        } else if (counterMode == 'word') {
          if (!evt.target.value) {
            setTimeout(() => {
              setTextCount(0);
            }, 0);

            return;
          }

          if (
            enableCounter &&
            typeof maxCount !== 'undefined' &&
            textareaRef.current !== null
          ) {
            const matchedWords = evt.target?.value?.match(/\p{L}+/gu);
            if (matchedWords && matchedWords.length <= maxCount) {
              textareaRef.current.removeAttribute('maxLength');

              setTimeout(() => {
                setTextCount(matchedWords.length);
              }, 0);
            } else if (matchedWords && matchedWords.length > maxCount) {
              setTimeout(() => {
                setTextCount(matchedWords.length);
              }, 0);
            }
          }
        }
        if (onChange) {
          onChange(evt);
        }
      }
    },
    onClick: (evt) => {
      if (!disabled && onClick) {
        onClick(evt);
      }
    },
  };

  const formItemClasses = classNames(`${prefix}--form-item`, className);

  const textAreaWrapperClasses = classNames(`${prefix}--text-area__wrapper`, {
    [`${prefix}--text-area__wrapper--cols`]: other.cols,
    [`${prefix}--text-area__wrapper--readonly`]: other.readOnly,
    [`${prefix}--text-area__wrapper--warn`]: warn,
    [`${prefix}--text-area__wrapper--slug`]: slug,
    [`${prefix}--text-area__wrapper--decorator`]: decorator,
  });

  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel && !isFluid,
    [`${prefix}--label--disabled`]: disabled,
  });

  const textareaClasses = classNames(`${prefix}--text-area`, {
    [`${prefix}--text-area--light`]: light,
    [`${prefix}--text-area--invalid`]: invalid,
    [`${prefix}--text-area--warn`]: warn,
  });

  const counterClasses = classNames(`${prefix}--label`, {
    [`${prefix}--label--disabled`]: disabled,
    [`${prefix}--text-area__label-counter`]: true,
  });

  const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });

  const label = labelText ? (
    <Text as="label" htmlFor={id} className={labelClasses}>
      {labelText}
    </Text>
  ) : null;

  const counter =
    enableCounter &&
    maxCount &&
    (counterMode === 'character' || counterMode === 'word') ? (
      <Text
        as="div"
        className={counterClasses}
        aria-hidden="true">{`${textCount}/${maxCount}`}</Text>
    ) : null;

  const counterDescriptionId =
    enableCounter && maxCount ? `${id}-counter-desc` : undefined;

  const helperId = !helperText
    ? undefined
    : `text-area-helper-text-${textAreaInstanceId}`;

  const helper = helperText ? (
    <Text
      as="div"
      id={helperId}
      className={helperTextClasses}
      ref={helperTextRef}>
      {helperText}
    </Text>
  ) : null;

  const errorId = id + '-error-msg';

  const error = invalid ? (
    <Text
      as="div"
      role="alert"
      className={`${prefix}--form-requirement`}
      id={errorId}
      ref={errorTextRef}>
      {invalidText}
      {isFluid && (
        <WarningFilled className={`${prefix}--text-area__invalid-icon`} />
      )}
    </Text>
  ) : null;

  const warnId = id + '-warn-msg';

  const warning = warn ? (
    <Text
      as="div"
      role="alert"
      className={`${prefix}--form-requirement`}
      id={warnId}
      ref={warnTextRef}>
      {warnText}
      {isFluid && (
        <WarningAltFilled
          className={`${prefix}--text-area__invalid-icon ${prefix}--text-area__invalid-icon--warning`}
        />
      )}
    </Text>
  ) : null;

  let ariaDescribedBy;
  if (invalid) {
    ariaDescribedBy = errorId;
  } else if (warn && !isFluid) {
    ariaDescribedBy = warnId;
  } else {
    const ids: string[] = [];
    if (!isFluid && helperText && helperId) ids.push(helperId);
    if (counterDescriptionId) ids.push(counterDescriptionId);
    ariaDescribedBy = ids.length > 0 ? ids.join(' ') : undefined;
  }

  if (enableCounter) {
    // handle different counter mode
    if (counterMode == 'character') {
      textareaProps.maxLength = maxCount;
    }
  }

  const announcerRef = useRef<HTMLSpanElement>(null);
  const [prevAnnouncement, setPrevAnnouncement] = useState('');
  const ariaAnnouncement = getAnnouncement(
    textCount,
    maxCount,
    counterMode === 'word' ? 'word' : undefined,
    counterMode === 'word' ? 'words' : undefined
  );
  useEffect(() => {
    if (ariaAnnouncement && ariaAnnouncement !== prevAnnouncement) {
      const announcer = announcerRef.current as HTMLSpanElement | null;
      if (announcer) {
        // Clear the content first
        announcer.textContent = '';

        // Set the new content after a small delay
        const timeoutId = setTimeout(
          () => {
            if (announcer) {
              announcer.textContent = ariaAnnouncement;
              setPrevAnnouncement(ariaAnnouncement);
            }
          },
          counterMode === 'word' ? 2000 : 1000
        );

        //clear the timeout
        return () => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        };
      }
    }
  }, [ariaAnnouncement, prevAnnouncement, counterMode]);

  const input = (
    <textarea
      {...other}
      {...textareaProps}
      placeholder={placeholder}
      aria-readonly={other.readOnly ? true : false}
      className={textareaClasses}
      aria-invalid={invalid}
      aria-describedby={ariaDescribedBy}
      disabled={disabled}
      rows={rows}
      readOnly={other.readOnly}
      ref={ref}
    />
  );

  // AILabel is always size `mini`
  const candidate = slug ?? decorator;
  const candidateIsAILabel = isComponentElement(candidate, AILabel);
  const normalizedDecorator = candidateIsAILabel
    ? cloneElement(candidate, { size: 'mini' })
    : candidate;

  return (
    <div className={formItemClasses}>
      <div className={`${prefix}--text-area__label-wrapper`}>
        {label}
        {counter}
      </div>
      {enableCounter && maxCount && (
        <span
          id={counterDescriptionId}
          className={`${prefix}--visually-hidden`}>
          {counterMode === 'word'
            ? `Word limit ${maxCount}`
            : `Character limit ${maxCount}`}
        </span>
      )}
      <div
        ref={wrapperRef}
        className={textAreaWrapperClasses}
        data-invalid={invalid || null}>
        {invalid && !isFluid && (
          <WarningFilled className={`${prefix}--text-area__invalid-icon`} />
        )}
        {warn && !invalid && !isFluid && (
          <WarningAltFilled
            className={`${prefix}--text-area__invalid-icon ${prefix}--text-area__invalid-icon--warning`}
          />
        )}
        {input}
        {slug ? (
          normalizedDecorator
        ) : decorator ? (
          <div className={`${prefix}--text-area__inner-wrapper--decorator`}>
            {normalizedDecorator}
          </div>
        ) : (
          ''
        )}
        <span
          className={`${prefix}--text-area__counter-alert`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          ref={announcerRef}>
          {ariaAnnouncement}
        </span>
        {isFluid && <hr className={`${prefix}--text-area__divider`} />}
        {isFluid && invalid ? error : null}
        {isFluid && warn && !invalid ? warning : null}
      </div>
      {!invalid && !warn && !isFluid ? helper : null}
      {invalid && !isFluid ? error : null}
      {warn && !invalid && !isFluid ? warning : null}
    </div>
  );
});

TextArea.displayName = 'TextArea';
TextArea.propTypes = {
  /**
   * Provide a custom className that is applied directly to the underlying
   * `<textarea>` node
   */
  className: PropTypes.string,

  /**
   * Specify the `cols` attribute for the underlying `<textarea>` node
   */
  cols: PropTypes.number,

  /**
   * Specify the method used for calculating the counter number
   */
  counterMode: PropTypes.oneOf(['character', 'word']),

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `TextArea` component
   */
  decorator: PropTypes.node,

  /**
   * Optionally provide the default value of the `<textarea>`
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether to display the counter
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
   * Provide a unique identifier for the control
   */
  id: PropTypes.string,

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
    'The `light` prop for `TextArea` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * Max entity count allowed for the textarea. This is needed in order for enableCounter to display
   */
  maxCount: PropTypes.number,

  /**
   * Optionally provide an `onChange` handler that is called whenever `<textarea>`
   * is updated
   */
  onChange: PropTypes.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<textarea>` is clicked
   */
  onClick: PropTypes.func,

  /**
   * Optionally provide an `onKeyDown` handler that is called whenever `<textarea>`
   * is keyed
   */
  onKeyDown: PropTypes.func,

  /**
   * Specify the placeholder attribute for the `<textarea>`
   */
  placeholder: PropTypes.string,

  /**
   * Whether the textarea should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the rows attribute for the `<textarea>`
   */
  rows: PropTypes.number,

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `TextArea` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop for `TextArea` has ' +
      'been deprecated in favor of the new `decorator` prop. It will be removed in the next major release.'
  ),

  /**
   * Provide the current value of the `<textarea>`
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

export default TextArea;



File: TextArea/TextArea.Skeleton.tsx


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

export interface TextAreaSkeletonProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className?: string;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;
}
const TextAreaSkeleton = (props: TextAreaSkeletonProps) => {
  const { className, hideLabel, ...rest } = props;
  const prefix = usePrefix();
  return (
    <div className={cx(`${prefix}--form-item`, className)} {...rest}>
      {!hideLabel && (
        <span className={`${prefix}--label ${prefix}--skeleton`} />
      )}
      <div className={`${prefix}--skeleton ${prefix}--text-area`} />
    </div>
  );
};

TextAreaSkeleton.propTypes = {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className: PropTypes.string,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,
};

export default TextAreaSkeleton;
export { TextAreaSkeleton };



File: TextArea/TextArea.mdx


import { ArgTypes, Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as TextAreaStories from './TextArea.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# TextArea

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/TextArea)
&nbsp;|&nbsp;
[Usage guidelines](https://carbondesignsystem.com/components/text-input/usage/#text-area)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/text-input/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Skeleton](#skeleton)
- [AI Label](#ai-label)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={TextAreaStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TextAreaStories.Default),
    },
  ]}
/>

## Skeleton
<Canvas
  of={TextAreaStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TextAreaStories.Skeleton),
    },
  ]}
/>

## AI Label
<Canvas
  of={TextAreaStories.withAILabel}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(TextAreaStories.withAILabel),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/TextArea/TextArea.mdx).



File: TextArea/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import TextArea, { type TextAreaProps } from './TextArea';

export { default as TextAreaSkeleton } from './TextArea.Skeleton';
export default TextArea;
export { TextArea, type TextAreaProps };



File: TextArea/TextArea-test.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TextArea from '../TextArea';
import userEvent from '@testing-library/user-event';
import { fireEvent, waitFor } from '@testing-library/react';
import { render, screen, createEvent } from '@testing-library/react';
import { AILabel } from '../AILabel';

const prefix = 'cds';

describe('TextArea', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto the text area element', () => {
      render(
        <TextArea
          data-testid="test-id"
          id="area-1"
          labelText="TextArea label"
        />
      );

      expect(screen.getByRole('textbox')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('should support a custom `className`', () => {
      const { container } = render(
        <TextArea
          className="custom-class"
          id="area-1"
          labelText="TextArea label"
        />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should not have cols by default', () => {
      render(<TextArea id="area-1" labelText="TextArea label" />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('cols');
    });

    it('should support custom cols', () => {
      render(<TextArea id="area-1" labelText="TextArea label" cols={200} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('cols', '200');
    });

    it('should respect `defaultValue` prop', () => {
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea label"
          defaultValue="This is default text"
        />
      );

      expect(screen.getByText('This is default text')).toBeInTheDocument();
    });

    it('should respect disabled prop', () => {
      render(<TextArea id="textarea-1" labelText="TextArea label" disabled />);

      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('should respect `helperText` prop', () => {
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea label"
          helperText="This is helper text"
        />
      );

      expect(screen.getByText('This is helper text')).toBeInTheDocument();
      expect(screen.getByText('This is helper text')).toHaveClass(
        `${prefix}--form__helper-text`
      );
    });

    it('should respect hideLabel prop', () => {
      render(<TextArea id="textarea-1" labelText="TextArea label" hideLabel />);

      expect(screen.getByText('TextArea label')).toBeInTheDocument();
      expect(screen.getByText('TextArea label')).toHaveClass(
        `${prefix}--visually-hidden`
      );
    });

    it('should respect id prop', () => {
      render(<TextArea id="textarea-1" labelText="TextArea label" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'textarea-1');
    });

    it('should respect invalid prop', () => {
      const { container } = render(
        <TextArea id="textarea-1" labelText="TextArea" invalid />
      );

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const invalidIcon = container.querySelector(
        `svg.${prefix}--text-area__invalid-icon`
      );

      expect(screen.getByRole('textbox')).toHaveClass(
        `${prefix}--text-area--invalid`
      );
      expect(invalidIcon).toBeInTheDocument();
    });

    it('should apply aria-invalid when invalid', () => {
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea"
          invalid
          invalidText="Some error"
        />
      );
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid');
    });

    it('should respect `invalidText` prop', () => {
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea"
          invalid
          invalidText="This is invalid text"
        />
      );

      expect(screen.getByText('This is invalid text')).toBeInTheDocument();
      expect(screen.getByText('This is invalid text')).toHaveClass(
        `${prefix}--form-requirement`
      );
    });

    it('should respect `labelText` prop', () => {
      render(<TextArea id="textarea-1" labelText="TextArea label" />);

      expect(screen.getByText('TextArea label')).toBeInTheDocument();
      expect(screen.getByText('TextArea label')).toHaveClass(
        `${prefix}--label`
      );
    });

    it('should respect `placeholder` prop', () => {
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea label"
          placeholder="Placeholder text"
        />
      );

      expect(
        screen.getByPlaceholderText('Placeholder text')
      ).toBeInTheDocument();
    });

    it('should respect value prop', () => {
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea label"
          value="This is a test value"
        />
      );

      expect(screen.getByText('This is a test value')).toBeInTheDocument();
    });

    it('should respect warn prop', () => {
      const { container } = render(
        <TextArea id="textarea-1" labelText="TextArea label" warn />
      );

      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const warnIcon = container.querySelector(
        `svg.${prefix}--text-area__invalid-icon--warning`
      );

      expect(screen.getByRole('textbox')).toHaveClass(
        `${prefix}--text-area--warn`
      );
      expect(warnIcon).toBeInTheDocument();
    });

    it('should respect `warnText` prop', () => {
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea label"
          warn
          warnText="This is warning text"
        />
      );

      expect(screen.getByText('This is warning text')).toBeInTheDocument();
      expect(screen.getByText('This is warning text')).toHaveClass(
        `${prefix}--form-requirement`
      );
    });

    it('should respect rows prop', () => {
      render(<TextArea id="textarea-1" labelText="TextArea label" rows={25} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('rows', '25');
    });

    it('should respect `enableCounter` and `maxCount` prop', () => {
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea label"
          enableCounter={true}
          maxCount={500}
        />
      );
      expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '500');
      expect(screen.getByText('0/500')).toBeInTheDocument();
    });

    it('should respect decorator prop', () => {
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea label"
          decorator={<AILabel />}
        />
      );
      expect(
        screen.getByRole('button', { name: 'AI Show information' })
      ).toBeInTheDocument();
    });

    it('should respect deprecated slug prop', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <TextArea
          id="textarea-1"
          labelText="TextArea label"
          slug={<AILabel />}
        />
      );
      expect(
        screen.getByRole('button', { name: 'AI Show information' })
      ).toBeInTheDocument();
      spy.mockRestore();
    });

    describe('behaves as expected - Component API', () => {
      it('should respect onChange prop', async () => {
        const onChange = jest.fn();
        render(
          <TextArea
            id="textarea-1"
            labelText="TextArea label"
            data-testid-="textarea-1"
            onChange={onChange}
          />
        );

        const component = screen.getByRole('textbox');

        await userEvent.type(component, 'x');
        expect(component).toHaveValue('x');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.any(Object),
          })
        );
      });

      it('should respect `onClick` prop', async () => {
        const onClick = jest.fn();
        render(
          <TextArea
            id="textarea-1"
            labelText="TextArea label"
            data-testid-="textarea-1"
            onClick={onClick}
          />
        );

        await userEvent.click(screen.getByRole('textbox'));
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.any(Object),
          })
        );
      });

      it('should not call `onClick` when the `<input>` is clicked but disabled', async () => {
        const onClick = jest.fn();
        render(
          <TextArea
            id="textarea-1"
            labelText="TextArea label"
            onClick={onClick}
            disabled
          />
        );

        await userEvent.click(screen.getByRole('textbox'));
        expect(onClick).not.toHaveBeenCalled();
      });

      it('should respect `readOnly` prop', async () => {
        const onChange = jest.fn();
        const onClick = jest.fn();
        render(
          <TextArea
            id="textarea-1"
            labelText="TextArea label"
            onClick={onClick}
            onChange={onChange}
            readOnly
          />
        );

        await userEvent.click(screen.getByRole('textbox'));
        expect(onClick).toHaveBeenCalledTimes(1);

        await userEvent.type(screen.getByRole('textbox'), 'x');
        expect(screen.getByRole('textbox')).not.toHaveValue('x');
        expect(onChange).toHaveBeenCalledTimes(0);
      });

      it('should not render counter with only `enableCounter` prop passed in', () => {
        render(
          <TextArea id="textarea-1" labelText="TextArea label" enableCounter />
        );

        const counter = screen.queryByText('0/5');

        expect(counter).not.toBeInTheDocument();
      });

      it('should not render counter with only maxCount prop passed in', () => {
        render(
          <TextArea id="textarea-1" labelText="TextArea label" enableCounter />
        );

        const counter = screen.queryByText('0/5');

        expect(counter).not.toBeInTheDocument();
      });

      it('should have the expected classes for counter', () => {
        render(
          <TextArea
            id="textarea-1"
            labelText="TextArea label"
            enableCounter
            maxCount={5}
          />
        );

        const counter = screen.queryByText('0/5');

        expect(counter).toBeInTheDocument();
      });
    });
  });

  describe('word counter behaves as expected', () => {
    it('should correctly increase word count', async () => {
      render(
        <TextArea
          id="input-1"
          labelText="TextArea label"
          enableCounter
          maxCount={10}
          counterMode="word"
        />
      );

      // by default should show 0
      expect(screen.getByText('0/10')).toBeInTheDocument();

      fireEvent.change(screen.getByRole('textbox'), {
        target: {
          value: 'one two three four five six seven eight nine ten',
        },
      });

      await waitFor(() => {
        expect(screen.getByText('10/10')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByRole('textbox')).toHaveValue(
          'one two three four five six seven eight nine ten'
        );
      });
    });

    it('should correctly decrease word count', async () => {
      render(
        <TextArea
          id="input-1"
          labelText="TextArea label"
          enableCounter
          maxCount={10}
          counterMode="word"
          defaultValue="one two three four"
        />
      );

      // by default should show 4
      expect(screen.getByText('4/10')).toBeInTheDocument();

      fireEvent.change(screen.getByRole('textbox'), {
        target: {
          value: 'one two three',
        },
      });

      await waitFor(() => {
        expect(screen.getByText('3/10')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByRole('textbox')).toHaveValue('one two three');
      });
    });

    it('should not trim words when enableCounter is disabled and then enabled', async () => {
      const { rerender } = render(
        <TextArea
          id="input-1"
          labelText="TextArea label"
          enableCounter={false}
          maxCount={5}
          counterMode="word"
          defaultValue="one two three four five"
        />
      );

      fireEvent.change(screen.getByRole('textbox'), {
        target: {
          value: 'one two three four five six seven eight',
        },
      });

      await waitFor(() => {
        expect(screen.getByRole('textbox')).toHaveValue(
          'one two three four five six seven eight'
        );
      });

      rerender(
        <TextArea
          id="input-1"
          labelText="TextArea label"
          enableCounter={true}
          maxCount={5}
          counterMode="word"
        />
      );

      await waitFor(() => {
        expect(screen.getByRole('textbox')).toHaveValue(
          'one two three four five six seven eight'
        );
      });
    });

    it('should trim words when text larger than max limit is pasted', async () => {
      render(
        <TextArea
          id="input-1"
          labelText="TextArea label"
          enableCounter={true}
          maxCount={5}
          counterMode="word"
          defaultValue=""
        />
      );

      const paste = createEvent.paste(screen.getByRole('textbox'), {
        clipboardData: {
          getData: () =>
            'test pasted content that should be trimmed to match max limit',
        },
      });

      fireEvent(screen.getByRole('textbox'), paste);

      await waitFor(() => {
        expect(screen.getByRole('textbox')).toHaveValue(
          'test pasted content that should'
        );
      });
    });

    it('should trim words when text larger than max limit is pasted and there is text already present', async () => {
      render(
        <TextArea
          id="input-1"
          labelText="TextArea label"
          enableCounter={true}
          maxCount={5}
          counterMode="word"
          defaultValue="one"
        />
      );

      const paste = createEvent.paste(screen.getByRole('textbox'), {
        clipboardData: {
          getData: () =>
            'test pasted content that should be trimmed to match max limit',
        },
      });

      fireEvent(screen.getByRole('textbox'), paste);

      await waitFor(() => {
        expect(screen.getByRole('textbox')).toHaveValue(
          'one test pasted content that'
        );
      });
    });
  });
});



File: TextArea/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-textarea--default'
    },
    {
      label: 'Fluid (unstable)',
      variant: 'experimental-unstable-fluidtextarea--default'
    },
    {
      label: 'Fluid with Layers (unstable)',
      variant: 'experimental-unstable-fluidtextarea--default-with-layers'
    },
    {
      label: 'Fluid with Tooltip (unstable)',
      variant: 'experimental-unstable-fluidtextarea--default-with-tooltip'
    }
  ]}
/>



File: TextArea/TextArea.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';
import { View, FolderOpen, Folders, Information } from '@carbon/icons-react';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { default as TextArea, TextAreaSkeleton } from './';
import { Tooltip } from '../Tooltip';
import mdx from './TextArea.mdx';

export default {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  subcomponents: {
    TextAreaSkeleton,
  },
  argTypes: {
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
  },
};

const sharedArgTypes = {
  className: {
    control: false,
  },
  cols: {
    control: {
      type: 'number',
    },
  },
  defaultValue: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  enableCounter: {
    control: {
      type: 'boolean',
    },
  },
  helperText: {
    control: {
      type: 'text',
    },
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
  },
  id: {
    control: false,
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
  labelText: {
    control: {
      type: 'text',
    },
  },
  maxCount: {
    control: {
      type: 'number',
    },
  },
  placeholder: {
    control: {
      type: 'text',
    },
  },
  rows: {
    control: {
      type: 'number',
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
};

export const Default = (args) => {
  return <TextArea {...args} id="text-area-1" />;
};

Default.argTypes = {
  ...sharedArgTypes,
};

Default.args = {
  enableCounter: true,
  helperText: 'TextArea helper text',
  labelText: 'TextArea label',
  maxCount: 500,
  disabled: false,
  hideLabel: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  placeholder: '',
  rows: 4,
  warn: false,
  warnText: 'This is a warning message.',
};

export const _WithLayer = () => (
  <WithLayer>
    {(layer) => (
      <TextArea
        labelText="Text Area label"
        helperText="Optional helper text"
        rows={4}
        id={`text-area-${layer}`}
      />
    )}
  </WithLayer>
);

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
    <TextArea
      labelText="Text Area label"
      helperText="Optional helper text"
      rows={4}
      id="text-area-5"
      decorator={aiLabel}
      {...args}
    />
  );
};

withAILabel.argTypes = {
  ...sharedArgTypes,
};

export const Skeleton = () => {
  return <TextAreaSkeleton />;
};



