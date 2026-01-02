File: InlineLoading/InlineLoading.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import InlineLoading from '../InlineLoading';
import * as InlineLoadingStories from './InlineLoading.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# InlineLoading

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/InlineLoading)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/inline-loading/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/inline-loading/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={InlineLoadingStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(InlineLoadingStories.Default),
    },
  ]}
/>

<Canvas
  of={InlineLoadingStories.UxExample}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(InlineLoadingStories.UxExample),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/InlineLoading/InlineLoading.mdx).



File: InlineLoading/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import InlineLoading, { type InlineLoadingProps } from './InlineLoading';
export default InlineLoading;
export { InlineLoading, type InlineLoadingProps };



File: InlineLoading/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-inlineloading--default'
    },
    {
      label: 'Ux Example',
      variant: 'components-inlineloading--ux-example'
    }
  ]}
/>



File: InlineLoading/InlineLoading.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CheckmarkFilled, ErrorFilled } from '@carbon/icons-react';
import Loading from '../Loading';
import { usePrefix } from '../../internal/usePrefix';

export const InlineLoadingStatuses = [
  'inactive',
  'active',
  'finished',
  'error',
] as const;

export type InlineLoadingStatus = (typeof InlineLoadingStatuses)[number];

export interface InlineLoadingProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'children'
  > {
  /**
   * Specify a custom className to be applied to the container node
   */
  className?: string;

  /**
   * Specify the description for the inline loading text
   */
  description?: React.ReactNode;

  /**
   * Specify the description for the inline loading text
   */
  iconDescription?: string;

  /**
   * Provide an optional handler to be invoked when <InlineLoading> is
   * successful
   */
  onSuccess?: () => void;

  /**
   * Specify the loading status
   */
  status?: InlineLoadingStatus;

  /**
   * Provide a delay for the `setTimeout` for success
   */
  successDelay?: number;
}

const InlineLoading = ({
  className,
  status = 'active',
  iconDescription,
  description,
  onSuccess,
  successDelay = 1500,
  ...rest
}: InlineLoadingProps) => {
  const prefix = usePrefix();
  const loadingClasses = classNames(`${prefix}--inline-loading`, className);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (status === 'finished') {
      timerRef.current = setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, successDelay);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [status, onSuccess, successDelay]);

  const getLoading = () => {
    let iconLabel = iconDescription ? iconDescription : status;
    if (status === 'error') {
      return (
        <ErrorFilled className={`${prefix}--inline-loading--error`}>
          <title>{iconLabel}</title>
        </ErrorFilled>
      );
    }
    if (status === 'finished') {
      return (
        <CheckmarkFilled
          className={`${prefix}--inline-loading__checkmark-container`}>
          <title>{iconLabel}</title>
        </CheckmarkFilled>
      );
    }
    if (status === 'active') {
      if (!iconDescription) {
        iconLabel = 'loading';
      }
      return (
        <Loading
          small
          description={iconLabel}
          withOverlay={false}
          active={status === 'active'}
        />
      );
    }
    if (status === 'inactive') {
      if (!iconDescription) {
        iconLabel = 'not loading';
      }
      return (
        <title className={`${prefix}--inline-loading__inactive-status`}>
          {iconLabel}
        </title>
      );
    }
    return undefined;
  };

  const loadingText = description && (
    <div className={`${prefix}--inline-loading__text`}>{description}</div>
  );
  const loading = getLoading();
  const loadingAnimation = loading && (
    <div className={`${prefix}--inline-loading__animation`}>{loading}</div>
  );
  return (
    <div
      className={loadingClasses}
      {...rest}
      aria-live={rest['aria-live'] ?? 'assertive'}>
      {loadingAnimation}
      {loadingText}
    </div>
  );
};

InlineLoading.propTypes = {
  /**
   * Specify a custom className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify the description for the inline loading text
   */
  description: PropTypes.node,

  /**
   * Specify the description for the inline loading text
   */
  iconDescription: PropTypes.string,

  /**
   * Provide an optional handler to be invoked when <InlineLoading> is
   * successful
   */
  onSuccess: PropTypes.func,

  /**
   * Specify the loading status
   */
  status: PropTypes.oneOf(['inactive', 'active', 'finished', 'error']),

  /**
   * Provide a delay for the `setTimeout` for success
   */
  successDelay: PropTypes.number,
};

export default InlineLoading;



File: InlineLoading/InlineLoading-test.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import InlineLoading from '../InlineLoading';
import { render, screen } from '@testing-library/react';

describe('InlineLoading', () => {
  it('should pass in extra classes that are passed via className', () => {
    render(<InlineLoading className="custom-class" data-testid="loading-1" />);

    expect(screen.getByTestId('loading-1')).toHaveClass('custom-class');
  });

  it('should render a loader by default', () => {
    render(<InlineLoading />);

    expect(screen.getByTitle('loading')).toBeInTheDocument();
  });

  it('should render a loader if the status is inactive', () => {
    render(<InlineLoading status="inactive" />);
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector('.cds--inline-loading__inactive-status')
    ).toBeInTheDocument();
  });

  it('should render the success state if status is finished', () => {
    render(<InlineLoading status="finished" />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('svg')).toHaveClass(
      'cds--inline-loading__checkmark-container'
    );
  });

  it('should render the error state if status is error', () => {
    render(<InlineLoading status="error" />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('svg')).toHaveClass(
      'cds--inline-loading--error'
    );
  });

  it('should not render any text by default', () => {
    render(<InlineLoading />);

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector('.cds--inline-loading__text')
    ).not.toBeInTheDocument();
  });

  it('should render text when the description prop is passed', () => {
    render(<InlineLoading description="Loading" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should call the onSuccess prop after a delay', () => {
    jest.useFakeTimers();
    const onSuccess = jest.fn();

    render(<InlineLoading status="finished" onSuccess={onSuccess} />);

    jest.runAllTimers();
    expect(onSuccess).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('should allow users to override the onSuccess timeout', () => {
    jest.useFakeTimers();
    const onSuccess = jest.fn();

    render(
      <InlineLoading
        status="finished"
        onSuccess={onSuccess}
        successDelay={2500}
      />
    );

    jest.runAllTimers();
    expect(onSuccess).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('should cancel the onSuccess timeout if the component unmounts', () => {
    jest.useFakeTimers();
    const onSuccess = jest.fn();
    const { unmount } = render(
      <InlineLoading
        status="finished"
        onSuccess={onSuccess}
        successDelay={2500}
      />
    );

    // Unmount the component before the timeout fires.
    unmount();

    // Run all timers. If the cleanup works, `onSuccess` should not be called.
    jest.runAllTimers();
    expect(onSuccess).not.toHaveBeenCalled();

    jest.useRealTimers();
  });
});



File: InlineLoading/InlineLoading.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import Button from '../Button';
import InlineLoading from '.';
import mdx from './InlineLoading.mdx';

export default {
  title: 'Components/InlineLoading',
  component: InlineLoading,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const UxExample = () => {
  function MockSubmission({ children }) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [description, setDescription] = React.useState('Submitting...');
    const [ariaLive, setAriaLive] = React.useState('off');
    const handleSubmit = () => {
      setIsSubmitting(true);
      setAriaLive('assertive');

      // Instead of making a real request, we mock it with a timer
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(true);
        setDescription('Submitted!');

        // To make submittable again, we reset the state after a bit so the user gets completion feedback
        setTimeout(() => {
          setSuccess(false);
          setDescription('Submitting...');
          setAriaLive('off');
        }, 1500);
      }, 2000);
    };

    return children({
      handleSubmit,
      isSubmitting,
      success,
      description,
      ariaLive,
    });
  }

  return (
    <MockSubmission>
      {({ handleSubmit, isSubmitting, success, description, ariaLive }) => (
        <div style={{ display: 'flex', width: '300px' }}>
          <Button kind="secondary" disabled={isSubmitting || success}>
            Cancel
          </Button>
          {isSubmitting || success ? (
            <InlineLoading
              style={{ marginLeft: '1rem' }}
              description={description}
              status={success ? 'finished' : 'active'}
              aria-live={ariaLive}
            />
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </div>
      )}
    </MockSubmission>
  );
};

export const Default = (args) => <InlineLoading {...args} />;

Default.args = {
  description: 'Loading',
  iconDescription: 'Loading data...',
};

Default.parameters = {
  controls: {
    exclude: ['successDelay'],
  },
};

Default.argTypes = {
  description: {
    control: {
      type: 'text',
    },
  },
  iconDescription: {
    control: {
      type: 'text',
    },
  },
};



