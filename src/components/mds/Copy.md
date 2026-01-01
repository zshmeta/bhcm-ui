File: Copy/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Copy from './Copy';
export default Copy;
export { Copy };



File: Copy/Copy-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Copy from '../Copy';
import { Copy as CopyIcon } from '@carbon/icons-react';

jest.useFakeTimers();

const prefix = 'cds';

const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

describe('Copy', () => {
  it('should set tabIndex if one is passed via props', () => {
    render(
      <Copy
        aria-label="Copy button"
        title="Copy title"
        //eslint-disable-next-line jsx-a11y/tabindex-no-positive
        tabIndex={2}
        data-testid="copy-button-1">
        <CopyIcon />
      </Copy>
    );
    expect(screen.getByTestId('copy-button-1')).toHaveAttribute(
      'tabindex',
      '2'
    );
  });

  it('should add extra classes passed via className', () => {
    render(
      <Copy
        className="extra-class"
        aria-label="Copy button"
        title="Copy title"
        data-testid="copy-button-2">
        <CopyIcon />
      </Copy>
    );

    expect(screen.getByTestId('copy-button-2')).toHaveClass('extra-class');
  });
});

describe('Button props', () => {
  it('should disable button if disabled prop is passed', () => {
    render(
      <Copy
        aria-label="Copy button"
        title="Copy title"
        data-testid="copy-button-3"
        disabled>
        <CopyIcon />
      </Copy>
    );

    expect(screen.getByTestId('copy-button-3')).toBeDisabled();
  });

  it('should call the click handler', async () => {
    const onClick = jest.fn();
    render(
      <Copy
        aria-label="Copy button"
        title="Copy title"
        data-testid="copy-button-4"
        onClick={onClick}>
        <CopyIcon />
      </Copy>
    );

    const button = screen.getByTestId('copy-button-4');
    await user.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('Feedback', () => {
  it('should make the feedback visible for a limited amount of time', async () => {
    render(
      <Copy
        aria-label="Copy button"
        title="Copy title"
        data-testid="copy-button-5">
        <CopyIcon />
      </Copy>
    );

    const button = screen.getByTestId('copy-button-5');
    await user.click(button);

    expect(button).toHaveClass(`${prefix}--copy-btn--animating`);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      jest.runAllTimers();
      fireEvent.animationEnd(screen.getByTestId('copy-button-5'), {
        animationName: `${prefix}--hide-feedback`,
      });
    });
    expect(button).not.toHaveClass(`${prefix}--copy-btn--animating`);
  });

  it('should be able to specify the feedback message', async () => {
    render(
      <Copy
        title="Copy title"
        data-testid="copy-button-6"
        feedback="overriding-default-feedback">
        <CopyIcon />
      </Copy>
    );

    const button = screen.getByTestId('copy-button-6');
    await user.click(button);
    expect(screen.getAllByText('overriding-default-feedback').length).toBe(1);
  });

  it('should allow users to override default feedback timeout via prop', async () => {
    render(
      <Copy
        title="Copy title"
        data-testid="copy-button-7"
        feedbackTimeout={5000}>
        <CopyIcon />
      </Copy>
    );

    const button = screen.getByTestId('copy-button-7');
    await user.click(button);

    expect(button).toHaveClass(`${prefix}--copy-btn--animating`);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      jest.runAllTimers();
      fireEvent.animationEnd(screen.getByTestId('copy-button-7'), {
        animationName: `${prefix}--hide-feedback`,
      });
    });
    expect(button).not.toHaveClass(`${prefix}--copy-btn--animating`);
  });

  it('should display the correct feedback text after mouseleave', async () => {
    render(
      <Copy
        title="Copy title"
        data-testid="copy-button-8"
        aria-label="Copy to clipboard">
        <CopyIcon />
      </Copy>
    );

    const button = screen.getByTestId('copy-button-8');
    expect(screen.getAllByText('Copy to clipboard').length).toBe(1);
    await user.click(button);
    fireEvent.mouseLeave(button);
    expect(screen.getAllByText('Copied!').length).toBe(1);
  });
});



File: Copy/Copy.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  useState,
  useEffect,
  useCallback,
  AnimationEventHandler,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';
import { debounce } from 'es-toolkit/compat';
import classnames from 'classnames';
import { composeEventHandlers } from '../../tools/events';
import { usePrefix } from '../../internal/usePrefix';
import { IconButton } from '../IconButton';
import { noopFn } from '../../internal/noopFn';
import { deprecateValuesWithin } from '../../prop-types/deprecateValuesWithin';
import { mapPopoverAlign } from '../../tools/mapPopoverAlign';
import type {
  DeprecatedPopoverAlignment,
  NewPopoverAlignment,
  PopoverAlignment,
} from '../Popover';

export type DeprecatedCopyAlignment = DeprecatedPopoverAlignment;

export type NewCopyAlignment = NewPopoverAlignment;

export type CopyAlignment = PopoverAlignment;

export interface CopyProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align?: CopyAlignment;

  /**
   * **Experimental**: Will attempt to automatically align the tooltip. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign?: boolean;

  /**
   * Specify an optional className to be applied to the underlying `<button>`
   */
  className?: string;

  /**
   * Specify the string that is displayed when the button is clicked and the
   * content is copied
   */
  feedback?: string;

  /**
   * Specify the time it takes for the feedback message to timeout
   */
  feedbackTimeout?: number;

  /**
   * Specify an optional `onAnimationEnd` handler that is called when the underlying
   * animation ends
   */
  onAnimationEnd?: AnimationEventHandler<HTMLButtonElement>;

  /**
   * Specify an optional `onClick` handler that is called when the underlying
   * `<button>` is clicked
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Copy({
  align = 'bottom',
  autoAlign = false,
  children,
  className,
  feedback = 'Copied!',
  feedbackTimeout = 2000,
  onAnimationEnd,
  onClick = noopFn,
  ...other
}: PropsWithChildren<CopyProps>) {
  const [animation, setAnimation] = useState('');
  const prefix = usePrefix();
  const classNames = classnames(className, `${prefix}--copy`, {
    [`${prefix}--copy-btn--animating`]: animation,
    [`${prefix}--copy-btn--${animation}`]: animation,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFadeOut = useCallback(
    debounce(() => {
      setAnimation('fade-out');
    }, feedbackTimeout),
    [feedbackTimeout]
  );

  const handleClick = useCallback(() => {
    setAnimation('fade-in');
    handleFadeOut();
  }, [handleFadeOut]);

  const handleAnimationEnd = (event) => {
    if (event.animationName === `${prefix}--hide-feedback`) {
      setAnimation('');
    }
  };

  useEffect(
    () => () => {
      handleFadeOut.cancel();
    },
    [handleFadeOut]
  );

  const initialLabel = other['aria-label'] ?? '';

  return (
    <IconButton
      closeOnActivation={false}
      align={align}
      autoAlign={autoAlign}
      className={classNames}
      label={animation ? feedback : initialLabel}
      leaveDelayMs={animation ? feedbackTimeout : undefined}
      onClick={composeEventHandlers([onClick, handleClick])}
      onAnimationEnd={composeEventHandlers([
        onAnimationEnd,
        handleAnimationEnd,
      ])}
      {...other}
      aria-label={
        (!children && (animation ? feedback : other['aria-label'])) || undefined
      }>
      {children}
    </IconButton>
  );
}

Copy.propTypes = {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align: deprecateValuesWithin(
    PropTypes.oneOf([
      'top',
      'top-left', // deprecated use top-start instead
      'top-right', // deprecated use top-end instead

      'bottom',
      'bottom-left', // deprecated use bottom-start instead
      'bottom-right', // deprecated use bottom-end instead

      'left',
      'left-bottom', // deprecated use left-end instead
      'left-top', // deprecated use left-start instead

      'right',
      'right-bottom', // deprecated use right-end instead
      'right-top', // deprecated use right-start instead

      // new values to match floating-ui
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'left-end',
      'left-start',
      'right-end',
      'right-start',
    ]),
    [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ],
    mapPopoverAlign
  ),

  /**
   * **Experimental**: Will attempt to automatically align the tooltip. Requires
   * React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: PropTypes.bool,

  /**
   * Pass in content to be rendered in the underlying `<button>`
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the underlying `<button>`
   */
  className: PropTypes.string,

  /**
   * Specify the string that is displayed when the button is clicked and the
   * content is copied
   */
  feedback: PropTypes.string,

  /**
   * Specify the time it takes for the feedback message to timeout
   */
  feedbackTimeout: PropTypes.number,

  /**
   * Specify an optional `onAnimationEnd` handler that is called when the underlying
   * animation ends
   */
  onAnimationEnd: PropTypes.func,

  /**
   * Specify an optional `onClick` handler that is called when the underlying
   * `<button>` is clicked
   */
  onClick: PropTypes.func,
};



