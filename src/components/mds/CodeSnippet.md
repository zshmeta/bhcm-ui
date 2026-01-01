File: CodeSnippet/CodeSnippet.mdx


import { Story, ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import CodeSnippet from '../CodeSnippet';
import * as CodeSnippetStories from './CodeSnippet.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# CodeSnippet

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/CodeSnippet)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/code-snippet/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/code-snippet/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Inline](#inline)
- [Multi-line](#multi-line)
- [Single-line](#single-line)
- [Skeleton state](#skeleton-state)
- [Component API](#component-api)
- [Migration notes](#migration-notes)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

Code snippets are strings or small blocks of reusable code that are copyable. We
don't provide the copy functionality and recommend
[clipboard.js](https://clipboardjs.com/).

<Canvas
  of={CodeSnippetStories.Inline}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(CodeSnippetStories.Inline),
    },
  ]}
/>

## Inline

Inline code snippets are used for distinguishing a symbol, variable, function
name or similar small piece of code from its surrounding text.

<Canvas
  of={CodeSnippetStories.Inline}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(CodeSnippetStories.Inline),
    },
  ]}
/>

## Multi-line

Multiple line code snippets are used for displaying code with more than one
line. They're shown in a block and useful for showing classes, functions, blocks
of styles and the like. There is an option to wrap the lines displayed if the
lines are longer than the container.

<Canvas
  of={CodeSnippetStories.Multiline}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(CodeSnippetStories.Multiline),
    },
  ]}
/>

## Single-line

Single line code snippets are used when showing code that fits on one line
without wrapping. Useful for calling out terminal commands, function
invocations, expressions etc.

<Canvas
  of={CodeSnippetStories.Singleline}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(CodeSnippetStories.Singleline),
    },
  ]}
/>

## Skeleton state

You can use the `CodeSnippetSkeleton` component to render a skeleton variant of
an code snippet. This is useful to display while content in your code snippet is
being fetched from an external resource like an API.

<Canvas
  of={CodeSnippetStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(CodeSnippetStories.Skeleton),
    },
  ]}
/>

## Component API

<ArgTypes />

## Migration notes

- `copyLabel` has been deprecated in favor of `ariaLabel`.

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/CodeSnippet/CodeSnippet.mdx)



File: CodeSnippet/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CodeSnippet from './CodeSnippet';

export default CodeSnippet;
export { CodeSnippet };
export { default as CodeSnippetSkeleton } from './CodeSnippet.Skeleton';



File: CodeSnippet/CodeSnippet.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';

export interface CodeSnippetSkeletonProps
  extends React.HTMLAttributes<Omit<HTMLDivElement, 'children'>> {
  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * The type of the code snippet, including single or multi
   */
  type?: 'single' | 'multi' | undefined;
}

function CodeSnippetSkeleton({
  className: containerClassName,
  type = 'single',
  ...rest
}) {
  const prefix = usePrefix();
  const className = cx(containerClassName, {
    [`${prefix}--snippet`]: true,
    [`${prefix}--skeleton`]: true,
    [`${prefix}--snippet--single`]: type === 'single',
    [`${prefix}--snippet--multi`]: type === 'multi',
  });

  if (type === 'single') {
    return (
      <div className={className} {...rest}>
        <div className={`${prefix}--snippet-container`}>
          <span />
        </div>
      </div>
    );
  }

  if (type === 'multi') {
    return (
      <div className={className} {...rest}>
        <div className={`${prefix}--snippet-container`}>
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }
}

CodeSnippetSkeleton.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * The type of the code snippet, including single or multi
   */
  type: PropTypes.oneOf(['single', 'multi']),
};

export default CodeSnippetSkeleton;
export { CodeSnippetSkeleton };



File: CodeSnippet/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Inline',
      variant: 'components-codesnippet--inline'
    },
    {
      label: 'Multiline',
      variant: 'components-codesnippet--multiline'
    },
    {
      label: 'Singleline',
      variant: 'components-codesnippet--singleline'
    }
  ]}
/>



File: CodeSnippet/CodeSnippet.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import { default as CodeSnippet, CodeSnippetSkeleton } from '.';
import mdx from './CodeSnippet.mdx';

export default {
  title: 'Components/CodeSnippet',
  component: CodeSnippet,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
};

export const Inline = (args) => {
  return (
    <CodeSnippet type="inline" feedback="Copied to clipboard" {...args}>
      {'node -v'}
    </CodeSnippet>
  );
};

export const Multiline = (args) => {
  return (
    <CodeSnippet type="multi" feedback="Copied to clipboard" {...args}>
      {`  "scripts": {
    "build": "lerna run build --stream --prefix --npm-client yarn",
    "ci-check": "carbon-cli ci-check",
    "clean": "lerna run clean && lerna clean --yes && rimraf node_modules",
    "doctoc": "doctoc --title '## Table of Contents'",
    "format": "prettier --write '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**'",
    "format:diff": "prettier --list-different '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**' '!packages/components/**'",
    "lint": "eslint actions config codemods packages",
    "lint:styles": "stylelint '**/*.{css,scss}' --report-needless-disables --report-invalid-scope-disables",
    "test": "cross-env BABEL_ENV=test jest",
    "test:e2e": "cross-env BABEL_ENV=test jest --testPathPattern=e2e --testPathIgnorePatterns='examples,/packages/components/,/packages/react/'"
  },
  "resolutions": {
    "react": "~16.9.0",
    "react-dom": "~16.9.0",
    "react-is": "~16.9.0",
    "react-test-renderer": "~16.9.0"
  },
  "devDependencies": {
    "@babel/core": "^7.10.0",
    "@babel/plugin-proposal-class-properties": "^7.7.4",
    "@babel/plugin-proposal-export-default-from": "^7.7.4",
    "@babel/plugin-proposal-export-namespace-from": "^7.7.4",
    "@babel/plugin-transform-runtime": "^7.10.0",
    "@babel/preset-env": "^7.10.0",
    "@babel/preset-react": "^7.10.0",
    "@babel/runtime": "^7.10.0",
    "@commitlint/cli": "^8.3.5",`}
    </CodeSnippet>
  );
};

export const Singleline = (args) => {
  return (
    <CodeSnippet type="single" feedback="Copied to clipboard" {...args}>
      yarn add carbon-components@latest carbon-components-react@latest
      @carbon/icons-react@latest carbon-icons@latest
    </CodeSnippet>
  );
};

export const InlineWithLayer = (args) => {
  return (
    <WithLayer>
      <CodeSnippet type="inline" feedback="Copied to clipboard" {...args}>
        {'node -v'}
      </CodeSnippet>
    </WithLayer>
  );
};

export const MultilineWithLayer = (args) => {
  return (
    <WithLayer>
      <CodeSnippet type="multi" feedback="Copied to clipboard" {...args}>
        {`  "scripts": {
      "build": "lerna run build --stream --prefix --npm-client yarn",
      "ci-check": "carbon-cli ci-check",
      "clean": "lerna run clean && lerna clean --yes && rimraf node_modules",
      "doctoc": "doctoc --title '## Table of Contents'",
      "format": "prettier --write '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**'",
      "format:diff": "prettier --list-different '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**' '!packages/components/**'",
      "lint": "eslint actions config codemods packages",
      "lint:styles": "stylelint '**/*.{css,scss}' --report-needless-disables --report-invalid-scope-disables",
      "test": "cross-env BABEL_ENV=test jest",
      "test:e2e": "cross-env BABEL_ENV=test jest --testPathPattern=e2e --testPathIgnorePatterns='examples,/packages/components/,/packages/react/'"
      },
      "resolutions": {
        "react": "~16.9.0",
        "react-dom": "~16.9.0",
        "react-is": "~16.9.0",
        "react-test-renderer": "~16.9.0"
      },
      "devDependencies": {
        "@babel/core": "^7.10.0",
        "@babel/plugin-proposal-class-properties": "^7.7.4",
        "@babel/plugin-proposal-export-default-from": "^7.7.4",
        "@babel/plugin-proposal-export-namespace-from": "^7.7.4",
        "@babel/plugin-transform-runtime": "^7.10.0",
        "@babel/preset-env": "^7.10.0",
        "@babel/preset-react": "^7.10.0",
        "@babel/runtime": "^7.10.0",
        "@commitlint/cli": "^8.3.5",`}
      </CodeSnippet>
    </WithLayer>
  );
};

export const SinglelineWithLayer = (args) => {
  return (
    <WithLayer>
      <CodeSnippet type="single" feedback="Copied to clipboard" {...args}>
        yarn add carbon-components@latest carbon-components-react@latest
        @carbon/icons-react@latest carbon-icons@latest
      </CodeSnippet>
    </WithLayer>
  );
};

export const Skeleton = () => {
  return (
    <div>
      <CodeSnippetSkeleton type="single" style={{ marginBottom: 8 }} />
      <CodeSnippetSkeleton type="multi" />
    </div>
  );
};



File: CodeSnippet/CodeSnippet.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { PropsWithChildren, useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import { useResizeObserver } from '../../internal/useResizeObserver';
import { ChevronDown } from '@carbon/icons-react';
import Copy from '../Copy';
import Button from '../Button';
import CopyButton from '../CopyButton';
import { useId } from '../../internal/useId';
import copy from 'copy-to-clipboard';
import { deprecate } from '../../prop-types/deprecate';
import { usePrefix } from '../../internal/usePrefix';
import { deprecateValuesWithin } from '../../prop-types/deprecateValuesWithin';
import type {
  DeprecatedPopoverAlignment,
  NewPopoverAlignment,
  PopoverAlignment,
} from '../Popover';
import { mapPopoverAlign } from '../../tools/mapPopoverAlign';

const rowHeightInPixels = 16;
const defaultMaxCollapsedNumberOfRows = 15;
const defaultMaxExpandedNumberOfRows = 0;
const defaultMinCollapsedNumberOfRows = 3;
const defaultMinExpandedNumberOfRows = 16;

export type DeprecatedCodeSnippetAlignment = DeprecatedPopoverAlignment;

export type NewCodeSnippetAlignment = NewPopoverAlignment;

export type CodeSnippetAlignment = PopoverAlignment;

export interface CodeSnippetProps {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align?: CodeSnippetAlignment;

  /**
   * **Experimental**: Will attempt to automatically align the tooltip. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign?: boolean;

  /**
   * Specify a label to be read by screen readers on the containing textbox
   * node
   */
  ['aria-label']?: string;

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify a label to be read by screen readers on the containing textbox
   * node
   */
  ariaLabel?: string;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify the description for the Copy Button
   */
  copyButtonDescription?: string;

  /**
   * Optional text to copy. If not specified, the `children` node's `innerText`
   * will be used as the copy value.
   */
  copyText?: string;

  /**
   * Specify whether or not the CodeSnippet should be disabled
   */
  disabled?: boolean;

  /**
   * Specify the string displayed when the snippet is copied
   */
  feedback?: string;

  /**
   * Specify the time it takes for the feedback message to timeout
   */
  feedbackTimeout?: number;

  /**
   * Specify whether or not a copy button should be used/rendered.
   */
  hideCopyButton?: boolean;

  /**
   * Specify whether you are using the light variant of the Code Snippet,
   * typically used for inline snippet to display an alternate color
   */

  light?: boolean;

  /**
   * Specify the maximum number of rows to be shown when in collapsed view
   */
  maxCollapsedNumberOfRows?: number;

  /**
   * Specify the maximum number of rows to be shown when in expanded view
   */
  maxExpandedNumberOfRows?: number;

  /**
   * Specify the minimum number of rows to be shown when in collapsed view
   */
  minCollapsedNumberOfRows?: number;

  /**
   * Specify the minimum number of rows to be shown when in expanded view
   */
  minExpandedNumberOfRows?: number;
  /**
   * An optional handler to listen to the `onClick` even fired by the Copy
   * Button
   */
  onClick?: (e: MouseEvent) => void;

  /**
   * Specify a string that is displayed when the Code Snippet has been
   * interacted with to show more lines
   */
  showLessText?: string;

  /**
   * Specify a string that is displayed when the Code Snippet text is more
   * than 15 lines
   */
  showMoreText?: string;

  /**
   * Provide the type of Code Snippet
   */
  type?: 'single' | 'inline' | 'multi';

  /**
   * Specify whether or not to wrap the text.
   */
  wrapText?: boolean;
}

function CodeSnippet({
  align = 'bottom',
  autoAlign = false,
  className,
  type = 'single',
  children,
  disabled,
  feedback,
  feedbackTimeout,
  onClick,
  ['aria-label']: ariaLabel = 'Copy to clipboard',
  ariaLabel: deprecatedAriaLabel,
  copyText,
  copyButtonDescription,
  light,
  showMoreText = 'Show more',
  showLessText = 'Show less',
  hideCopyButton,
  wrapText = false,
  maxCollapsedNumberOfRows = defaultMaxCollapsedNumberOfRows,
  maxExpandedNumberOfRows = defaultMaxExpandedNumberOfRows,
  minCollapsedNumberOfRows = defaultMinCollapsedNumberOfRows,
  minExpandedNumberOfRows = defaultMinExpandedNumberOfRows,
  ...rest
}: PropsWithChildren<CodeSnippetProps>) {
  const [expandedCode, setExpandedCode] = useState(false);
  const [shouldShowMoreLessBtn, setShouldShowMoreLessBtn] = useState(false);
  const { current: uid } = useRef(useId());
  const codeContentRef = useRef<HTMLPreElement>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const innerCodeRef = useRef<HTMLElement>(null);
  const getCodeRef = useCallback(() => {
    if (type === 'single') {
      return codeContainerRef;
    }
    if (type === 'multi') {
      return codeContentRef;
    } else {
      return innerCodeRef;
    }
  }, [type]);
  const prefix = usePrefix();

  useResizeObserver({
    ref: getCodeRef(),
    onResize: () => {
      if (innerCodeRef?.current && type === 'multi') {
        const { height } = innerCodeRef.current.getBoundingClientRect();

        if (
          maxCollapsedNumberOfRows > 0 &&
          (maxExpandedNumberOfRows <= 0 ||
            maxExpandedNumberOfRows > maxCollapsedNumberOfRows) &&
          height > maxCollapsedNumberOfRows * rowHeightInPixels
        ) {
          setShouldShowMoreLessBtn(true);
        } else {
          setShouldShowMoreLessBtn(false);
        }
        if (
          expandedCode &&
          minExpandedNumberOfRows > 0 &&
          height <= minExpandedNumberOfRows * rowHeightInPixels
        ) {
          setExpandedCode(false);
        }
      }
    },
  });

  const handleCopyClick = (evt) => {
    if (copyText || innerCodeRef?.current) {
      copy(copyText ?? innerCodeRef?.current?.innerText ?? '');
    }

    if (onClick) {
      onClick(evt);
    }
  };

  const codeSnippetClasses = classNames(className, `${prefix}--snippet`, {
    [`${prefix}--snippet--${type}`]: type,
    [`${prefix}--snippet--disabled`]: type !== 'inline' && disabled,
    [`${prefix}--snippet--expand`]: expandedCode,
    [`${prefix}--snippet--light`]: light,
    [`${prefix}--snippet--no-copy`]: hideCopyButton,
    [`${prefix}--snippet--wraptext`]: wrapText,
  });

  const expandCodeBtnText = expandedCode ? showLessText : showMoreText;

  if (type === 'inline') {
    if (hideCopyButton) {
      return (
        <span className={codeSnippetClasses}>
          <code id={uid} ref={innerCodeRef}>
            {children}
          </code>
        </span>
      );
    }

    return (
      <Copy
        {...rest}
        align={align}
        autoAlign={autoAlign}
        onClick={handleCopyClick}
        aria-label={deprecatedAriaLabel || ariaLabel}
        aria-describedby={uid}
        className={codeSnippetClasses}
        disabled={disabled}
        feedback={feedback}
        feedbackTimeout={feedbackTimeout}>
        <code id={uid} ref={innerCodeRef}>
          {children}
        </code>
      </Copy>
    );
  }

  type stylesType = { maxHeight?: number; minHeight?: number };
  type containerStyleType = { style?: stylesType };
  const containerStyle: containerStyleType = {};
  if (type === 'multi') {
    const styles: stylesType = {};

    if (expandedCode) {
      if (maxExpandedNumberOfRows > 0) {
        styles.maxHeight = maxExpandedNumberOfRows * rowHeightInPixels;
      }
      if (minExpandedNumberOfRows > 0) {
        styles.minHeight = minExpandedNumberOfRows * rowHeightInPixels;
      }
    } else {
      if (maxCollapsedNumberOfRows > 0) {
        styles.maxHeight = maxCollapsedNumberOfRows * rowHeightInPixels;
      }
      if (minCollapsedNumberOfRows > 0) {
        styles.minHeight = minCollapsedNumberOfRows * rowHeightInPixels;
      }
    }

    if (Object.keys(styles).length) {
      containerStyle.style = styles;
    }
  }

  return (
    <div {...rest} className={codeSnippetClasses}>
      <div
        ref={codeContainerRef}
        role={type === 'single' || type === 'multi' ? 'textbox' : undefined}
        tabIndex={
          (type === 'single' || type === 'multi') && !disabled ? 0 : undefined
        }
        className={`${prefix}--snippet-container`}
        aria-label={deprecatedAriaLabel || ariaLabel || 'code-snippet'}
        aria-readonly={type === 'single' || type === 'multi' ? true : undefined}
        aria-multiline={type === 'multi' ? true : undefined}
        {...containerStyle}>
        <pre ref={codeContentRef} {...containerStyle}>
          <code ref={innerCodeRef}>{children}</code>
        </pre>
      </div>
      {!hideCopyButton && (
        <CopyButton
          align={align}
          autoAlign={autoAlign}
          size={type === 'multi' ? 'sm' : 'md'}
          disabled={disabled}
          onClick={handleCopyClick}
          feedback={feedback}
          feedbackTimeout={feedbackTimeout}
          iconDescription={copyButtonDescription}
        />
      )}
      {shouldShowMoreLessBtn && (
        <Button
          kind="ghost"
          size="sm"
          className={`${prefix}--snippet-btn--expand`}
          disabled={disabled}
          onClick={() => setExpandedCode(!expandedCode)}>
          <span className={`${prefix}--snippet-btn--text`}>
            {expandCodeBtnText}
          </span>
          <ChevronDown
            className={`${prefix}--icon-chevron--down ${prefix}--snippet__icon`}
            name="chevron--down"
            role="img"
          />
        </Button>
      )}
    </div>
  );
}

CodeSnippet.propTypes = {
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
   * Specify a label to be read by screen readers on the containing textbox
   * node
   */
  ['aria-label']: PropTypes.string,

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify a label to be read by screen readers on the containing textbox
   * node
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'This prop syntax has been deprecated. Please use the new `aria-label`.'
  ),

  /**
   * **Experimental**: Will attempt to automatically align the tooltip. Requires
   * React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: PropTypes.bool,

  /**
   * Provide the content of your CodeSnippet as a node or string
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify the description for the Copy Button
   */
  copyButtonDescription: PropTypes.string,

  /**
   * Optional text to copy. If not specified, the `children` node's `innerText`
   * will be used as the copy value.
   */
  copyText: PropTypes.string,

  /**
   * Specify whether or not the CodeSnippet should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify the string displayed when the snippet is copied
   */
  feedback: PropTypes.string,

  /**
   * Specify the time it takes for the feedback message to timeout
   */
  feedbackTimeout: PropTypes.number,

  /**
   * Specify whether or not a copy button should be used/rendered.
   */
  hideCopyButton: PropTypes.bool,

  /**
   * Specify whether you are using the light variant of the Code Snippet,
   * typically used for inline snippet to display an alternate color
   */

  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `CodeSnippet` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * Specify the maximum number of rows to be shown when in collapsed view
   */
  maxCollapsedNumberOfRows: PropTypes.number,

  /**
   * Specify the maximum number of rows to be shown when in expanded view
   */
  maxExpandedNumberOfRows: PropTypes.number,

  /**
   * Specify the minimum number of rows to be shown when in collapsed view
   */
  minCollapsedNumberOfRows: PropTypes.number,

  /**
   * Specify the minimum number of rows to be shown when in expanded view
   */
  minExpandedNumberOfRows: PropTypes.number,

  /**
   * An optional handler to listen to the `onClick` even fired by the Copy
   * Button
   */
  onClick: PropTypes.func,

  /**
   * Specify a string that is displayed when the Code Snippet has been
   * interacted with to show more lines
   */
  showLessText: PropTypes.string,

  /**
   * Specify a string that is displayed when the Code Snippet text is more
   * than 15 lines
   */
  showMoreText: PropTypes.string,

  /**
   * Provide the type of Code Snippet
   */
  type: PropTypes.oneOf(['single', 'inline', 'multi']),

  /**
   * Specify whether or not to wrap the text.
   */
  wrapText: PropTypes.bool,
};

export default CodeSnippet;



