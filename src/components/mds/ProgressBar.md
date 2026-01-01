File: ProgressBar/ProgressBar.tsx


/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactSVGElement, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CheckmarkFilled, ErrorFilled } from '@carbon/icons-react';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';

export interface ProgressBarProps {
  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * The current progress as a textual representation.
   */
  helperText?: string;

  /**
   * Whether the label should be visually hidden.
   */
  hideLabel?: boolean;

  /**
   * A label describing the progress bar.
   */
  label: string;

  /**
   * The maximum value.
   */
  max?: number;

  /**
   * Specify the size of the progress bar.
   */
  size?: 'small' | 'big';

  /**
   * Specify the status.
   */
  status?: 'active' | 'finished' | 'error';

  /**
   * Defines the alignment variant of the progress bar.
   */
  type?: 'default' | 'inline' | 'indented';

  /**
   * The current value.
   */
  value?: number;
}

function ProgressBar({
  className,
  helperText,
  hideLabel,
  label,
  max = 100,
  size = 'big',
  status = 'active',
  type = 'default',
  value,
}: ProgressBarProps) {
  const labelId = useId('progress-bar');
  const helperId = useId('progress-bar-helper');
  const helperTextId = useId('progress-bar-helper-text');
  const prefix = usePrefix();

  const isFinished = status === 'finished';
  const isError = status === 'error';

  const indeterminate =
    !isFinished && !isError && (value === null || value === undefined);

  let cappedValue = value;
  if (cappedValue && cappedValue > max) {
    cappedValue = max;
  }
  if (cappedValue && cappedValue < 0) {
    cappedValue = 0;
  }
  if (isError) {
    cappedValue = 0;
  } else if (isFinished) {
    cappedValue = max;
  }

  const percentage = (cappedValue ?? NaN) / max;

  const wrapperClasses = classNames(
    `${prefix}--progress-bar`,
    `${prefix}--progress-bar--${size}`,
    `${prefix}--progress-bar--${type}`,
    {
      [`${prefix}--progress-bar--indeterminate`]: indeterminate,
      [`${prefix}--progress-bar--finished`]: isFinished,
      [`${prefix}--progress-bar--error`]: isError,
    },
    className
  );

  const labelClasses = classNames(`${prefix}--progress-bar__label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
  });

  let StatusIcon: React.ForwardRefExoticComponent<
    React.RefAttributes<ReactSVGElement> & { className?: string }
  > | null = null;

  if (isError) {
    // eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
    StatusIcon = React.forwardRef((props, ref: React.Ref<ReactSVGElement>) => {
      return <ErrorFilled ref={ref} size={16} {...props} />;
    });
  } else if (isFinished) {
    // eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
    StatusIcon = React.forwardRef((props, ref: React.Ref<ReactSVGElement>) => {
      return <CheckmarkFilled ref={ref} size={16} {...props} />;
    });
  }

  const ref = useRef<HTMLDivElement>(null);
  useIsomorphicEffect(() => {
    if (ref.current) {
      if (!isFinished && !isError) {
        ref.current.style.transform = `scaleX(${percentage})`;
      } else {
        ref.current.style.transform = '';
      }
    }
  }, [percentage, isFinished, isError]);

  return (
    <div className={wrapperClasses}>
      <div className={labelClasses} id={labelId}>
        <span className={`${prefix}--progress-bar__label-text`}>{label}</span>
        {StatusIcon && (
          <StatusIcon className={`${prefix}--progress-bar__status-icon`} />
        )}
      </div>
      {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
      <div
        className={`${prefix}--progress-bar__track`}
        role="progressbar"
        aria-busy={!isFinished}
        aria-invalid={isError}
        aria-labelledby={labelId}
        aria-describedby={helperText ? helperTextId : undefined}
        aria-valuemin={!indeterminate ? 0 : undefined}
        aria-valuemax={!indeterminate ? max : undefined}
        aria-valuenow={!indeterminate ? cappedValue : undefined}>
        <div className={`${prefix}--progress-bar__bar`} ref={ref} />
      </div>
      {helperText && (
        <div
          id={helperTextId}
          className={`${prefix}--progress-bar__helper-text`}>
          {helperText}
          <div
            className={`${prefix}--visually-hidden`}
            aria-live="polite"
            id={helperId}>
            {isFinished ? 'Done' : 'Loading'}
          </div>
        </div>
      )}
    </div>
  );
}

ProgressBar.propTypes = {
  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * The current progress as a textual representation.
   */
  helperText: PropTypes.string,

  /**
   * Whether the label should be visually hidden.
   */
  hideLabel: PropTypes.bool,

  /**
   * A label describing the progress bar.
   */
  label: PropTypes.string.isRequired,

  /**
   * The maximum value.
   */
  max: PropTypes.number,

  /**
   * Specify the size of the ProgressBar.
   */
  size: PropTypes.oneOf(['small', 'big']),

  /**
   * Specify the status.
   */
  status: PropTypes.oneOf(['active', 'finished', 'error']),

  /**
   * Defines the alignment variant of the progress bar.
   */
  type: PropTypes.oneOf(['default', 'inline', 'indented']),

  /**
   * The current value.
   */
  value: PropTypes.number,
};

export default ProgressBar;



File: ProgressBar/ProgressBar.mdx


import { ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as ProgressBarStories from './ProgressBar.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# ProgressBar

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/ProgressBar)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/progress-bar/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/progress-bar/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={ProgressBarStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ProgressBarStories.Default),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/ProgressBar/ProgressBar.mdx).



File: ProgressBar/index.ts


/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ProgressBar, { type ProgressBarProps } from './ProgressBar';

export default ProgressBar;
export { ProgressBar, type ProgressBarProps };



File: ProgressBar/ProgressBar.stories.js


/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';
import mdx from './ProgressBar.mdx';

import ProgressBar from './';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const DefaultStory = (args) => {
  return (
    <ProgressBar
      label="Progress bar label"
      helperText="Optional helper text"
      {...args}
    />
  );
};

export const Default = DefaultStory.bind({});

Default.argTypes = {
  hideLabel: {
    control: { type: 'boolean' },
  },
  status: {
    options: ['active', 'finished', 'error'],
    control: { type: 'select' },
  },
};

export const Indeterminate = () => (
  <ProgressBar label="Progress bar label" helperText="Optional helper text" />
);

export const Determinate = () => {
  const size = 728;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((currentProgress) => {
          const advancement = Math.random() * 8;
          if (currentProgress + advancement < size) {
            return currentProgress + advancement;
          } else {
            clearInterval(interval);
            return size;
          }
        });
      }, 50);
    }, 3000);
  }, []);

  const running = progress > 0;

  let helperText = running
    ? `${progress.toFixed(1)}MB of ${size}MB`
    : 'Fetching assets...';
  if (progress >= size) {
    helperText = 'Done';
  }

  return (
    <ProgressBar
      value={running ? progress : null}
      max={size}
      status={progress === size ? 'finished' : 'active'}
      label="Export data"
      helperText={helperText}
    />
  );
};

export const _WithLayer = () => (
  <WithLayer>
    <ProgressBar
      label="Progress bar label"
      helperText="Optional helper text"
      value={42}
    />
  </WithLayer>
);



File: ProgressBar/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-progressbar--default'
    },
    {
      label: 'Example',
      variant: 'components-progressbar--example'
    },
    {
      label: 'Indeterminate',
      variant: 'components-progressbar--indeterminate'
    }
  ]}
/>



File: ProgressBar/ProgressBar-test.js


/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ProgressBar from './ProgressBar';
import { render } from '@testing-library/react';

const prefix = 'cds';

describe('ProgressBar', () => {
  const props = {
    label: 'ProgressBar label',
  };
  let wrapper;

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-lifecycle
    wrapper = render(<ProgressBar {...props} />);
  });

  describe('renders as expected', () => {
    it('progress bar and label ids match', () => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const bar = wrapper.getByRole('progressbar');
      // eslint-disable-next-line testing-library/no-node-access
      const label = wrapper.container.querySelector(
        `.${prefix}--progress-bar__label`
      );
      expect(bar).toHaveAttribute('aria-labelledby', label.id);
    });

    it('renders helper text when passed', () => {
      const text = 'ProgressBar helper text';
      wrapper.rerender(<ProgressBar {...props} helperText={text} />);
      // eslint-disable-next-line testing-library/no-node-access
      const helperTextNode = wrapper.container.querySelector(
        `.${prefix}--progress-bar__helper-text`
      );
      const helperText = helperTextNode.firstChild.textContent;

      expect(helperText).toBe(text);
    });

    it('still renders accessible label when hideLabel is passed', () => {
      wrapper.rerender(<ProgressBar {...props} hideLabel />);
      // eslint-disable-next-line testing-library/no-node-access
      const label = wrapper.container.querySelector(
        `.${prefix}--progress-bar__label`
      );

      expect(label).toHaveTextContent(props.label);
      expect(label).toHaveClass(`${prefix}--visually-hidden`);
    });

    it('renders as indeterminate when no value is passed', () => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      const bar = wrapper.getByRole('progressbar');

      expect(bar).not.toHaveAttribute('aria-valuenow');
      expect(bar).not.toHaveAttribute('aria-valuemax');
      expect(bar).not.toHaveAttribute('aria-valuemin');
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        wrapper.container.querySelector(`.${prefix}--progress-bar`)
      ).toHaveClass(`${prefix}--progress-bar--indeterminate`);
    });

    it('sets aria-valuenow correctly', () => {
      const value = 42;
      wrapper.rerender(<ProgressBar {...props} value={value} />);

      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(wrapper.getByRole('progressbar')).toHaveAttribute(
        'aria-valuenow',
        value.toString()
      );
    });

    it('sets aria-valuemax correctly', () => {
      const max = 84;
      wrapper.rerender(<ProgressBar {...props} value={0} max={max} />);

      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(wrapper.getByRole('progressbar')).toHaveAttribute(
        'aria-valuemax',
        max.toString()
      );
    });

    it('supports additional css class names', () => {
      const className = 'some-class';
      wrapper.rerender(<ProgressBar {...props} className={className} />);

      expect(
        // eslint-disable-next-line testing-library/no-node-access
        wrapper.container.querySelector(`.${prefix}--progress-bar`)
      ).toHaveClass(className);
    });

    it('supports finished status', () => {
      wrapper.rerender(<ProgressBar {...props} status="finished" />);

      expect(
        // eslint-disable-next-line testing-library/no-node-access
        wrapper.container.querySelector(`.${prefix}--progress-bar`)
      ).toHaveClass(`${prefix}--progress-bar--finished`);

      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(wrapper.getByRole('progressbar')).toHaveAttribute(
        'aria-valuenow',
        '100'
      );
    });

    it('supports error status', () => {
      wrapper.rerender(<ProgressBar {...props} status="error" />);

      expect(
        // eslint-disable-next-line testing-library/no-node-access
        wrapper.container.querySelector(`.${prefix}--progress-bar`)
      ).toHaveClass(`${prefix}--progress-bar--error`);

      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(wrapper.getByRole('progressbar')).toHaveAttribute(
        'aria-valuenow',
        '0'
      );

      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(wrapper.getByRole('progressbar')).toHaveAttribute(
        'aria-invalid',
        'true'
      );
    });
  });

  describe('behaves as expected', () => {
    it('limits value to max', () => {
      const value = 200;
      const max = 50;
      wrapper.rerender(<ProgressBar {...props} value={value} max={max} />);

      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(wrapper.getByRole('progressbar')).toHaveAttribute(
        'aria-valuenow',
        max.toString()
      );
    });

    it('ensures a positive value', () => {
      const value = -10;
      wrapper.rerender(<ProgressBar {...props} value={value} />);

      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(wrapper.getByRole('progressbar')).toHaveAttribute(
        'aria-valuenow',
        '0'
      );
    });
  });
});



