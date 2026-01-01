File: Loading/Loading.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { type HTMLAttributes } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify whether you want the loading indicator to be spinning or not
   */
  active?: boolean;

  /**
   * Provide an optional className to be applied to the containing node
   */
  className?: string;

  /**
   * Specify a description that would be used to best describe the loading state
   */
  description?: string;

  /**
   * @deprecated The prop `id` is no longer needed
   */
  id?: string;

  /**
   * Specify whether you would like the small variant of <Loading>
   */
  small?: boolean;

  /**
   * Specify whether you want the loader to be applied with an overlay
   */
  withOverlay?: boolean;
}

function Loading({
  active = true,
  className: customClassName,
  withOverlay = true,
  small = false,
  description = 'loading',
  ...rest
}: LoadingProps) {
  const prefix = usePrefix();
  const loadingClassName = cx(customClassName, {
    [`${prefix}--loading`]: true,
    [`${prefix}--loading--small`]: small,
    [`${prefix}--loading--stop`]: !active,
  });
  const overlayClassName = cx({
    [`${prefix}--loading-overlay`]: true,
    [`${prefix}--loading-overlay--stop`]: !active,
  });

  const loading = (
    <div
      {...rest}
      aria-atomic="true"
      aria-live={active ? 'assertive' : 'off'}
      className={loadingClassName}>
      <svg className={`${prefix}--loading__svg`} viewBox="0 0 100 100">
        <title>{description}</title>
        {small ? (
          <circle
            className={`${prefix}--loading__background`}
            cx="50%"
            cy="50%"
            r="42"
          />
        ) : null}
        <circle
          className={`${prefix}--loading__stroke`}
          cx="50%"
          cy="50%"
          r={small ? '42' : '44'}
        />
      </svg>
    </div>
  );

  return withOverlay ? (
    <div className={overlayClassName}>{loading}</div>
  ) : (
    loading
  );
}

Loading.propTypes = {
  /**
   * Specify whether you want the loading indicator to be spinning or not
   */
  active: PropTypes.bool,

  /**
   * Provide an optional className to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify a description that would be used to best describe the loading state
   */
  description: PropTypes.string,

  /**
   * Provide an `id` to uniquely identify the label
   */
  id: deprecate(PropTypes.string, `\nThe prop \`id\` is no longer needed.`),

  /**
   * Specify whether you would like the small variant of <Loading>
   */
  small: PropTypes.bool,

  /**
   * Specify whether you want the loader to be applied with an overlay
   */
  withOverlay: PropTypes.bool,
};

export default Loading;



File: Loading/Loading.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Loading from '.';
import mdx from './Loading.mdx';

export default {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    docs: {
      page: mdx,
    },
    // The id prop is deprecated and should be remove in the next major release
    controls: {
      exclude: ['id'],
    },
  },
};

export const Default = (args) => {
  return <Loading className={'some-class'} {...args} />;
};

Default.args = {
  active: true,
  withOverlay: false,
  small: false,
  description: 'Loading',
};

Default.argTypes = {
  active: {
    control: {
      type: 'boolean',
    },
  },
  withOverlay: {
    control: {
      type: 'boolean',
    },
  },
  small: {
    control: {
      type: 'boolean',
    },
  },
  description: {
    control: {
      type: 'text',
    },
  },
};



File: Loading/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Loading, { type LoadingProps } from './Loading';

export default Loading;
export { Loading, type LoadingProps };



File: Loading/Loading-test.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Loading from './Loading';
import { render, screen } from '@testing-library/react';

describe('Loading', () => {
  describe('renders as expected - Component API', () => {
    it('should change classes based on active', () => {
      const { container, rerender } = render(<Loading active />);

      expect(container.firstChild).not.toHaveClass(
        'cds--loading-overlay--stop'
      );

      rerender(<Loading active={false} />);

      expect(container.firstChild).toHaveClass('cds--loading-overlay--stop');
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <Loading className="custom-class" withOverlay={false} />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should spread extra props on the outermost element', () => {
      const { container } = render(
        <Loading withOverlay={false} data-testid="test" />
      );

      expect(container.firstChild).toHaveAttribute('data-testid', 'test');
    });

    it('should specify a description based on prop', () => {
      render(<Loading description="Loading description" />);

      expect(screen.getByTitle('Loading description')).toBeInTheDocument();
    });

    it('should respect small prop', () => {
      const { container } = render(<Loading small withOverlay={false} />);

      expect(container.firstChild).toHaveClass('cds--loading--small');
    });

    it('should respect withOverlay prop', () => {
      const { container, rerender } = render(<Loading withOverlay />);

      expect(container.firstChild).toHaveClass('cds--loading-overlay');

      rerender(<Loading withOverlay={false} />);

      expect(container.firstChild).not.toHaveClass('cds--loading-overlay');
    });
  });

  describe('with a screenreader', () => {
    // https://www.w3.org/TR/WCAG21/#headings-and-labels
    it('should have a label on the live region', () => {
      const { container } = render(<Loading />);
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const liveRegion = container.querySelector('[aria-live]');
      expect(liveRegion).toBeInstanceOf(HTMLElement);
    });

    // https://www.w3.org/TR/WCAG21/#status-messages
    it('should announce a loading status', () => {
      const { container } = render(<Loading />);
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const liveRegion = container.querySelector('[aria-live]');
      expect(liveRegion).toBeInstanceOf(HTMLElement);

      const atomicBoolean = liveRegion.getAttribute('aria-atomic');
      expect(atomicBoolean).toBe('true');

      const ariaLiveValue = liveRegion.getAttribute('aria-live');
      expect(ariaLiveValue).toEqual('assertive');
    });
  });
});



File: Loading/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-loading--default'
    }
  ]}
/>



File: Loading/Loading.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import Loading from '../Loading';
import * as LoadingStories from './Loading.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Loading

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Loading)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/loading/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/loading/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={LoadingStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(LoadingStories.Default),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Loading/Loading.mdx).



