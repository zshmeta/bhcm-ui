File: ErrorBoundary/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { default as ErrorBoundary } from './ErrorBoundary';
export { ErrorBoundaryContext } from './ErrorBoundaryContext';



File: ErrorBoundary/ErrorBoundaryContext.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ErrorInfo, createContext } from 'react';

export interface ErrorBoundaryContextType {
  log: (error: Error, errorInfo: ErrorInfo) => void;
}

export const ErrorBoundaryContext = createContext<ErrorBoundaryContextType>({
  log(error, info) {
    // eslint-disable-next-line no-console -- https://github.com/carbon-design-system/carbon/issues/20452
    console.log(info.componentStack);
  },
});



File: ErrorBoundary/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-errorboundary--default'
    },
    {
      label: 'With Custom Context',
      variant: 'components-errorboundary--with-custom-context'
    }
  ]}
/>



File: ErrorBoundary/ErrorBoundary.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ErrorInfo, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundaryContext } from './ErrorBoundaryContext';

/**
 * React introduced additional lifecycle methods in v16 for capturing errors
 * that occur in a specific sub-tree of components. This component helps to
 * consolidate some of the duplication that occurs when using these lifecycle
 * methods across a codebase. In addition, it allows you to specify the fallback
 * UI to display when an error occurs in the sub-tree through the `fallback`
 * prop.
 *
 * This component roughly follows the React.js docs example code for these
 * methods. In addition, it takes advantage of an `ErrorBoundaryContext` so that
 * consumers can specify their own logic for logging errors. For example,
 * reporting an error in the UI to an external service for every `ErrorBoundary`
 * used.
 *
 * Reference:
 * https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries
 */
export interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  static propTypes = {
    children: PropTypes.node,
    fallback: PropTypes.node,
  };

  static contextType = ErrorBoundaryContext;
  context!: React.ContextType<typeof ErrorBoundaryContext>;

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  state: ErrorBoundaryState = {
    hasError: false,
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.context.log(error, info);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.children !== this.props.children) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}



File: ErrorBoundary/ErrorBoundary.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as ErrorBoundaryStories from './ErrorBoundary.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Error Boundary

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/ErrorBoundary)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={ErrorBoundaryStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ErrorBoundaryStories.Default),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/ErrorBoundary/ErrorBoundary.mdx).




File: ErrorBoundary/ErrorBoundary.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from 'storybook/actions';
import { ErrorBoundary, ErrorBoundaryContext } from './';
import Button from '../Button';
import mdx from './ErrorBoundary.mdx';

export default {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  function DemoComponent() {
    const [shouldThrowError, setShouldThrowError] = React.useState(false);

    function onClick() {
      setShouldThrowError(!shouldThrowError);
    }

    return (
      <>
        <Button onClick={onClick}>Toggle throwing error</Button>
        <div>
          <ErrorBoundary fallback={<Fallback />}>
            <ThrowError shouldThrowError={shouldThrowError} />
          </ErrorBoundary>
        </div>
      </>
    );
  }

  function Fallback() {
    return 'Whoops';
  }

  function ThrowError({ shouldThrowError }) {
    if (shouldThrowError) {
      throw new Error('Component threw error');
    }

    return 'Successfully rendered';
  }

  return <DemoComponent />;
};

export const WithCustomContext = () => {
  function DemoComponent() {
    const [shouldThrowError, setShouldThrowError] = useState(false);

    function onClick() {
      setShouldThrowError(!shouldThrowError);
    }

    return (
      <ErrorBoundaryContext.Provider value={{ log: action('log') }}>
        <Button onClick={onClick}>Toggle throwing error</Button>
        <div>
          <ErrorBoundary fallback={<Fallback />}>
            <ThrowError shouldThrowError={shouldThrowError} />
          </ErrorBoundary>
        </div>
      </ErrorBoundaryContext.Provider>
    );
  }

  function Fallback() {
    return 'Whoops';
  }

  function ThrowError({ shouldThrowError }) {
    if (shouldThrowError) {
      throw new Error('Component threw error');
    }

    return 'Successfully rendered';
  }

  return <DemoComponent />;
};

WithCustomContext.storyName = 'with custom context';



