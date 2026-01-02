File: CopyButton/CopyButton.mdx


import { ArgTypes, Story, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as CopyButtonStories from './CopyButton.stories.js';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# CopyButton

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/CopyButton)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/patterns/common-actions/#copy)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

The copy button should be accompanied by a tooltip. Tooltip feedback text should
be concise and describe the action taken when the user clicks the copy button.
By default we display the text “Copied!”.

<Canvas
  of={CopyButtonStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(CopyButtonStories.Default),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback through, asking questions
on Slack, or updating this file on GitHub
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/CopyButton/CopyButton.mdx).



File: CopyButton/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CopyButton from './CopyButton';
export default CopyButton;
export { CopyButton };



File: CopyButton/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-copybutton--default'
    }
  ]}
/>



File: CopyButton/CopyButton.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable no-console */

import React from 'react';
import CopyButton from './CopyButton';
import mdx from './CopyButton.mdx';

export default {
  title: 'Components/CopyButton',
  component: CopyButton,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

// Note: autoAlign is used here only to make tooltips visible in StackBlitz,
// autoAlign is in preview and not part of the actual implementation.
export const Default = (args) => <CopyButton autoAlign {...args} />;

Default.argTypes = {
  onClick: {
    action: 'onClick',
  },
};



File: CopyButton/CopyButton-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import CopyButton from '../CopyButton';

jest.useFakeTimers();
const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
const prefix = 'cds';

describe('CopyButton', () => {
  it('should set tabIndex if one is passed via props', () => {
    render(
      <CopyButton
        //eslint-disable-next-line jsx-a11y/tabindex-no-positive
        tabIndex={2}
        iconDescription="icon description"
        data-testid="copy-btn-1"
      />
    );
    expect(screen.getByTestId('copy-btn-1')).toHaveAttribute('tabindex', '2');
  });

  it('should add extra classes passed via className', () => {
    render(
      <CopyButton
        className="extra-class"
        iconDescription="icon description"
        data-testid="copy-btn-2"
      />
    );

    expect(screen.getByTestId('copy-btn-2')).toHaveClass('extra-class');
  });
});

describe('Button props', () => {
  it('should disable button if disabled prop is passed', () => {
    render(
      <CopyButton
        disabled
        iconDescription="icon description"
        data-testid="copy-btn-3"
      />
    );

    expect(screen.getByTestId('copy-btn-3')).toBeDisabled();
  });

  it('should call the click handler', async () => {
    const onClick = jest.fn();

    render(
      <CopyButton
        iconDescription="icon description"
        data-testid="copy-btn-4"
        onClick={onClick}
      />
    );
    const button = screen.getByTestId('copy-btn-4');
    await user.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('Feedback', () => {
  it('should make the feedback visible for a limited amount of time', async () => {
    render(
      <CopyButton iconDescription="icon description" data-testid="copy-btn-5" />
    );

    const button = screen.getByTestId('copy-btn-5');
    await user.click(button);

    expect(button).toHaveClass(`${prefix}--copy-btn--animating`);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      jest.runAllTimers();
      fireEvent.animationEnd(screen.getByTestId('copy-btn-5'), {
        animationName: `${prefix}--hide-feedback`,
      });
    });
  });

  it('should be able to specify the feedback message', async () => {
    render(
      <CopyButton
        iconDescription="icon description"
        data-testid="copy-btn-6"
        feedback="custom-feedback"
      />
    );

    const button = screen.getByTestId('copy-btn-6');
    await user.click(button);
    expect(screen.getAllByText('custom-feedback').length).toBe(1);
  });

  it('should allow users to override default feedback timeout via prop', async () => {
    render(
      <CopyButton
        iconDescription="icon description"
        data-testid="copy-btn-7"
        feedbackTimeout={5000}
      />
    );

    const button = screen.getByTestId('copy-btn-7');
    await user.click(button);

    expect(button).toHaveClass(`${prefix}--copy-btn--animating`);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      jest.runAllTimers();
      fireEvent.animationEnd(screen.getByTestId('copy-btn-7'), {
        animationName: `${prefix}--hide-feedback`,
      });
    });
  });
});



File: CopyButton/CopyButton.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { MouseEventHandler } from 'react';
import classnames from 'classnames';
import { Copy as CopyIcon } from '@carbon/icons-react';
import { ButtonProps } from '../Button';
import Copy from '../Copy';
import { LayoutConstraint } from '../Layout';
import { usePrefix } from '../../internal/usePrefix';
import { noopFn } from '../../internal/noopFn';
import { deprecateValuesWithin } from '../../prop-types/deprecateValuesWithin';
import { mapPopoverAlign } from '../../tools/mapPopoverAlign';
import type {
  DeprecatedPopoverAlignment,
  NewPopoverAlignment,
  PopoverAlignment,
} from '../Popover';

export type DeprecatedCopyButtonAlignment = DeprecatedPopoverAlignment;

export type NewCopyButtonAlignment = NewPopoverAlignment;

export type CopyButtonAlignment = PopoverAlignment;

export interface CopyButtonProps extends ButtonProps<'button'> {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align?: CopyButtonAlignment;

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
   * Provide a description for the icon representing the copy action that can
   * be read by screen readers
   */
  iconDescription?: string;

  /**
   * Specify an optional `onClick` handler that is called when the underlying
   * `<button>` is clicked
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default function CopyButton({
  align = 'bottom',
  autoAlign = false,
  feedback = 'Copied!',
  feedbackTimeout = 2000,
  iconDescription = 'Copy to clipboard',
  className,
  onClick = noopFn,
  ...other
}: CopyButtonProps) {
  const prefix = usePrefix();
  return (
    <LayoutConstraint size={{ default: 'md', max: 'lg' }}>
      <Copy
        feedback={feedback}
        feedbackTimeout={feedbackTimeout}
        onClick={onClick}
        align={align}
        autoAlign={autoAlign}
        className={classnames(className, `${prefix}--copy-btn`)}
        aria-label={iconDescription}
        {...other}>
        <CopyIcon className={`${prefix}--snippet__icon`} />
      </Copy>
    </LayoutConstraint>
  );
}

CopyButton.propTypes = {
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
   * Provide a description for the icon representing the copy action that can
   * be read by screen readers
   */
  iconDescription: PropTypes.string,

  /**
   * Specify an optional `onClick` handler that is called when the underlying
   * `<button>` is clicked
   */
  onClick: PropTypes.func,
};



