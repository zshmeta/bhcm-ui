File: AILabel/ailabel-story.scss


//
// Copyright IBM Corp. 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@use '@carbon/styles/scss/type';
@use '@carbon/styles/scss/theme';
@use '@carbon/react/scss/components/tile';

.ai-label-container-example {
  display: flex;
  margin-bottom: 6rem;
  align-items: flex-start;

  & > * {
    margin-left: 2rem;
  }
}

.ai-label-container-example.centered {
  margin: 0;
  width: calc(100vw - 84px);
  align-items: center;
  justify-content: center;

  & > * {
    margin: 0;
  }
}

.ai-label-container .cds--toggletip-content p {
  @include type.type-style('body-compact-01');
}

.ai-label-container .cds--toggletip-content .bold {
  font-weight: 600;
}

.ai-label-container .cds--toggletip-content .secondary {
  color: theme.$text-secondary;
}

.ai-label-container .cds--toggletip-content h1 {
  margin-bottom: 1rem;
}

.ai-label-container .cds--toggletip-content hr {
  border: 0;
  height: 1px;
  background: theme.$border-subtle;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.ai-label-tile-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.ai-label-tile-container .cds--tile {
  max-width: 320px;
  margin-right: 3rem;
  margin-bottom: 3rem;
  padding-bottom: 90px;
}

.ai-label-tile-container h4 {
  margin-bottom: 1rem;
}

.ai-label-tile-container .ai-data {
  margin-top: 16px;
  padding: 16px 0;
  display: flex;
}

.ai-label-tile-container .data-container {
  width: 126px;
}

.ai-label-tile-container .data-container:first-of-type {
  margin-right: 16px;
}

.ai-label-tile-container p {
  @include type.type-style('body-01');
}

.ai-label-tile-container .data-container p {
  @include type.type-style('label-02');
}

.ai-label-tile-container .arrow-right {
  position: absolute;
  bottom: 16px;
  right: 16px;
}

.ai-label-tile-container .cds--tile-content__below-the-fold {
  padding-top: 16px;
}

.ai-label-tile-container .cds--tile-content__below-the-fold p {
  @include type.type-style('label-01');
  margin: 8px 0 50px;
}

.form-example {
  display: flex;
  flex-wrap: wrap;
}

.fluid-ai-label-form,
.ai-label-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  max-width: 450px;
  margin-left: 4rem;
}

.fluid-ai-label-form .cds--date-picker-container {
  width: 100%;
}

.fluid-ai-label-form .cds--list-box__wrapper {
  width: 100%;
}

.ai-label-container .cds--toggletip-content p {
  @include type.type-style('body-compact-01');
}

.ai-label-container .cds--toggletip-content .bold {
  font-weight: 600;
}

.ai-label-container .cds--toggletip-content .secondary {
  color: theme.$text-secondary;
}

.ai-label-container .cds--toggletip-content h1 {
  margin-bottom: 1rem;
}

.ai-label-container .cds--toggletip-content hr {
  border: 0;
  height: 1px;
  background: theme.$border-subtle;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.ai-label-check-radio-container
  .cds--form-item:not(:first-of-type):not(.cds--checkbox-wrapper),
.ai-label-check-radio-container
  fieldset.cds--checkbox-group:not(:first-of-type) {
  margin-top: 2rem;
}

.ai-label-modal .cds--form-item {
  margin-top: 1rem;
}

.sbdocs-ai-label .cds--ai-label__text {
  font-size: 0.75rem;
}

.sbdocs-ai-label .cds--toggletip-content {
  font-size: 0.875rem;
}

.ai-label-selectable-tile-container .cds--tile-group > div {
  display: flex;
}

.ai-label-selectable-tile-container .cds--tile-group > div > div {
  width: 33%;
}

.ai-label-selectable-tile-container .cds--tile-group .ai-label-radio-tile,
.ai-label-selectable-tile-container .cds--tile-group .ai-label-selectable-tile {
  margin-inline-end: 1rem;
  height: 200px;
}

.ai-label-preview-radio-tile-container {
  @include tile.tile(
    $enable-tile-contrast: true,
    $enable-v12-tile-radio-icons: true
  );
}

.ai-label-heading {
  font-size: 2.625rem;
  font-weight: 300;
  margin-bottom: 1rem;
}



File: AILabel/AILabelDataTable.mdx


import { Story, ArgTypes, Canvas, Meta } from '@storybook/addon-docs/blocks';
import { AILabel, AILabelContent, AILabelActions } from '.';

<Meta isTemplate />

# AILabel

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/AILabel)
|
[AILabel release status](https://airtable.com/appCAqlGVN8tRUbAp/shr71ZyLlIGORz3Vh/tblHqPusgkK8hIeHo)
|
[Using AI-enhanced components in V10](https://github.com/carbon-design-system/carbon-for-ai/blob/main/docs/support-for-carbon-v10.md)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [AILabel anatomy](#ailabel-anatomy)
- [Using `AILabel` in `DataTable`](#using-ailabel-in-datatable)
  - [Using as a column header](#using-as-a-column-header)
  - [Using in a row](#using-in-a-row)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

The `DataTable` supports placing a `AI label` in both the column header and row.

<Canvas id="components-datatable-withailabel--column-ai-label-with-selection-and-expansion" />

<Canvas id="components-datatable-withailabel--ai-label-with-selection" />

## AILabel anatomy

The `AILabel` itself is a button that acts as a `Toggletip` trigger. To
construct the contents of the `AILabel` callout, you can place the desired
elements as a child of `AILabel` in `AILabelContent`, like so:

```jsx
<AILabel>
  <AILabelContent>
    {Content Here}
  </AILabelContent>
</AILabel>
```

The `AILabel` also supports the rendering of an action bar at the bottom of the
callout. To achieve this, you can pass in `AILabelActions` as a child of
`AILabel`, placed inside the `AILabelContent`

```jsx
<AILabel>
  <AILabelContent>
    {Content Here}
    {Optional AI label action bar}
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
```

## Using `AILabel` in `DataTable`

### Using as a column header

To use an `AILabel` inside a column header, you'll need to add a `AILabel` to
the appropriate column data.

```jsx
const columnAILabelHeaders = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'attached_groups',
    header: 'Attached groups',
    AILabel: (
      <AILabel
        className="ai-label-container"
        autoAlign={false}
        align="bottom-right">
        <AILabelContent>
          <div>
            <p className="secondary">AI Explained</p>
            <h2 className="ai-label-heading">84%</h2>
            <p className="secondary bold">Confidence score</p>
            <p className="secondary">
              Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut fsil labore et dolore magna
              aliqua.
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
    ),
  },
];
```

To ensure the table cells are styled appropriately, you'll need to use the
`getCellProps` prop getter, like so:

```jsx
<TableCell {...getCellProps({ cell })}>{cell.value}</TableCell>
```

### Using in a row

To use an `AILabel` inside a `DataTable` row, you'll need to pass in your
`AILabel` component to `TableSlugRow`:

```jsx
<TableBody>
  {rows.map((row) => (
    <TableRow {...getRowProps({ row })}>
      <TableSlugRow slug={AILabel} />
      <TableSelectRow {...getSelectionProps({ row })} />
      {row.cells.map((cell) => (
        <TableCell {...getCellProps({ cell })}>{cell.value}</TableCell>
      ))}
    </TableRow>
  ))}
</TableBody>
```

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/AILabel/AILabelDataTable.mdx).



File: AILabel/AILabel.stories.js


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { AILabel, AILabelContent, AILabelActions } from '.';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import Button from '../Button';
import { IconButton } from '../IconButton';
import mdx from './AILabel.mdx';
import './ailabel-story.scss';

export default {
  title: 'Components/AILabel',
  component: AILabel,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  const aiContent = (
    <div>
      <p className="secondary">AI Explained</p>
      <h2 className="ai-label-heading">84%</h2>
      <p className="secondary bold">Confidence score</p>
      <p className="secondary">
        Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
      </p>
      <hr />
      <p className="secondary">Model type</p>
      <p className="bold">Foundation model</p>
    </div>
  );

  return (
    <>
      <div className="ai-label-container ai-label-container-example">
        <AILabel autoAlign size="mini">
          <AILabelContent>{aiContent}</AILabelContent>
        </AILabel>
        <AILabel autoAlign size="2xs">
          <AILabelContent>{aiContent}</AILabelContent>
        </AILabel>
        <AILabel autoAlign size="xs">
          <AILabelContent>
            {aiContent}
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
        <AILabel autoAlign size="sm">
          <AILabelContent>
            {aiContent}
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
        <AILabel autoAlign size="md">
          <AILabelContent>
            {aiContent}
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
        <AILabel autoAlign size="lg">
          <AILabelContent>
            {aiContent}
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
        <AILabel autoAlign size="xl">
          <AILabelContent>
            {aiContent}
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
      </div>
      <div className="ai-label-container ai-label-container-example">
        <AILabel autoAlign kind="inline" size="sm">
          <AILabelContent>
            {aiContent}
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
        <AILabel autoAlign kind="inline" size="md">
          <AILabelContent>
            {aiContent}
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
        <AILabel autoAlign kind="inline" size="lg">
          <AILabelContent>
            {aiContent}
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
      </div>
      <div className="ai-label-container ai-label-container-example">
        <AILabel autoAlign kind="inline" size="sm" textLabel="Text goes here">
          <AILabelContent>
            {aiContent}
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
        <AILabel autoAlign kind="inline" size="md" textLabel="Text goes here">
          <AILabelContent>
            {aiContent}
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
        <AILabel autoAlign kind="inline" size="lg" textLabel="Text goes here">
          <AILabelContent>
            {aiContent}
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
      </div>
    </>
  );
};

export const ExplainabilityPopover = (args) => {
  const { showAILabelActions = true } = args;

  return (
    <div className="ai-label-container-example ai-label-container centered">
      <AILabel autoAlign={false} defaultOpen {...args}>
        <AILabelContent>
          {' '}
          <div>
            <p className="secondary">AI Explained</p>
            <h2 className="ai-label-heading">84%</h2>
            <p className="secondary bold">Confidence score</p>
            <p className="secondary">
              Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut fsil labore et dolore magna
              aliqua.
            </p>
            <hr />
            <p className="secondary">Model type</p>
            <p className="bold">Foundation model</p>
          </div>
          {showAILabelActions && (
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
          )}
        </AILabelContent>
      </AILabel>
    </div>
  );
};

ExplainabilityPopover.argTypes = {
  showAILabelActions: {
    control: {
      type: 'boolean',
    },
    description: 'Playground only - toggle to show the callout toolbar',
  },
  align: {
    options: [
      'top',
      'top-start',
      'top-end',

      'bottom',
      'bottom-start',
      'bottom-end',

      'left',
      'left-end',
      'left-start',

      'right',
      'right-end',
      'right-start',
    ],
    control: { type: 'select' },
  },
};

ExplainabilityPopover.parameters = {
  controls: {
    include: ['align', 'aria-label', 'defaultOpen', 'showAILabelActions'],
  },
};



File: AILabel/index.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { usePrefix } from '../../internal/usePrefix';
import {
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  ToggletipActions,
  ToggletipBaseProps,
} from '../Toggletip';
import { IconButton } from '../IconButton';
import { Undo } from '@carbon/icons-react';
import { useId } from '../../internal/useId';
import { deprecate } from '../../prop-types/deprecate';
import type {
  DeprecatedPopoverAlignment,
  NewPopoverAlignment,
  PopoverAlignment,
} from '../Popover';

export type AILabelContentProps = React.HTMLAttributes<HTMLSpanElement>;

export const AILabelContent = React.forwardRef(function AILabelContent(
  { className, children }: AILabelContentProps,
  ref // eslint-disable-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
) {
  const prefix = usePrefix();

  const hasAILabelActions = React.Children.toArray(children).some((child) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    const item = child as any;
    // TODO: Is there supposed to be a `return` here? If so, this issue would
    // have been caught by ESLint. It's concerning that this code is 7 months
    // old and no one has noticed any issues with it. It also makes me question
    // whether the code is necessary.
    // https://github.com/carbon-design-system/carbon/issues/18991
    // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
    item.type === AILabelActions;
  });

  const aiLabelContentClasses = cx(className, {
    [`${prefix}--ai-label-content`]: true,
    [`${prefix}--ai-label-content--with-actions`]: hasAILabelActions,
  });

  return (
    <ToggletipContent className={aiLabelContentClasses}>
      {children}
    </ToggletipContent>
  );
});

AILabelContent.displayName = 'AILabelContent';
AILabelContent.propTypes = {
  /**
   * Specify the content you want rendered inside the AILabel ToggleTip
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the AILabel callout
   */
  className: PropTypes.string,
};

export type AILabelActionsProps = React.HTMLAttributes<HTMLSpanElement>;

export const AILabelActions = React.forwardRef(function AILabelActions(
  { className, children }: AILabelActionsProps,
  ref // eslint-disable-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
) {
  const prefix = usePrefix();

  const aiLabelActionsClasses = cx(className, {
    [`${prefix}--ai-label-actions`]: true,
  });

  return (
    <ToggletipActions className={aiLabelActionsClasses}>
      {children}
    </ToggletipActions>
  );
});

AILabelActions.displayName = 'AILabelActions';
AILabelActions.propTypes = {
  /**
   * Specify the content you want rendered inside the AILabel callout toolbar
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the AILabel toolbar
   */
  className: PropTypes.string,
};

/**
 * Deprecated popover alignment values.
 * @deprecated Use NewPopoverAlignment instead.
 */
export type DeprecatedAlignment = DeprecatedPopoverAlignment;

export type NewAlignment = NewPopoverAlignment;

export type Alignment = PopoverAlignment;

export interface AILabelProps extends ToggletipBaseProps {
  AILabelContent?: React.ReactNode;
  aiText?: string;
  aiTextLabel?: string;
  textLabel?: string;
  kind?: 'default' | 'inline';
  onRevertClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  revertActive?: boolean;
  revertLabel?: string;
  size?: 'mini' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  'aria-label'?: string;
  slugLabel?: string;
}

export const AILabel = React.forwardRef<HTMLDivElement, AILabelProps>(
  function AILabel(
    {
      aiText = 'AI',
      aiTextLabel,
      textLabel,
      align,
      autoAlign = true,
      children,
      className,
      kind = 'default',
      onRevertClick,
      revertActive,
      revertLabel = 'Revert to AI input',
      slugLabel = 'Show information',
      ['aria-label']: ariaLabel = 'Show information',
      size = 'xs',
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();
    const id = useId('AILabel');

    const aiLabelClasses = cx(className, {
      [`${prefix}--ai-label`]: true,
      [`${prefix}--ai-label--revert`]: revertActive,
    });

    const aiLabelButtonClasses = cx({
      [`${prefix}--ai-label__button`]: true,
      [`${prefix}--ai-label__button--${size}`]: size,
      [`${prefix}--ai-label__button--${kind}`]: kind,
      [`${prefix}--ai-label__button--inline-with-content`]:
        kind === 'inline' && (aiTextLabel || textLabel),
    });

    const handleOnRevertClick = (evt) => {
      if (onRevertClick) {
        onRevertClick(evt);
      }
    };

    const ariaLabelText =
      !aiTextLabel && !textLabel
        ? `${aiText} ${slugLabel || ariaLabel}`
        : `${aiText} ${aiTextLabel || textLabel}`;

    const isSmallIcon = ['xs', '2xs', 'mini'].includes(size);

    return (
      <div className={aiLabelClasses} ref={ref} id={id}>
        {revertActive ? (
          <IconButton
            onClick={handleOnRevertClick}
            kind="ghost"
            size="sm"
            label={revertLabel}
            {...rest}>
            <Undo />
          </IconButton>
        ) : (
          <Toggletip
            align={align}
            autoAlign={autoAlign}
            alignmentAxisOffset={isSmallIcon ? -24 : 0}
            {...rest}>
            <ToggletipButton
              className={aiLabelButtonClasses}
              label={kind === 'inline' ? '' : ariaLabelText}>
              <span className={`${prefix}--ai-label__text`}>{aiText}</span>
              {kind === 'inline' && (aiTextLabel || textLabel) && (
                <span className={`${prefix}--ai-label__additional-text`}>
                  {aiTextLabel || textLabel}
                </span>
              )}
            </ToggletipButton>
            {children}
          </Toggletip>
        )}
      </div>
    );
  }
);

AILabel.displayName = 'AILabel';
AILabel.propTypes = {
  ...Toggletip.propTypes,

  /**
   * Specify the content you want rendered inside the `AILabel` ToggleTip
   */
  AILabelContent: PropTypes.node,

  /**
   * Specify the correct translation of the AI text
   */
  aiText: PropTypes.string,

  /**
   * @deprecated
   * Specify additional text to be rendered next to the AI label in the inline variant
   */
  aiTextLabel: deprecate(
    PropTypes.string,
    '`aiTextLabel` on `AILabel` has been deprecated - Please use the `textLabel` prop instead'
  ),

  /**
   * Specify the text that will be provided to the aria-label of the `AILabel` button
   */
  'aria-label': PropTypes.string,

  /**
   * Specify the type of `AILabel`, from the following list of types:
   */
  kind: PropTypes.oneOf(['default', 'inline']),

  /**
   * Callback function that fires when the revert button is clicked
   */
  onRevertClick: PropTypes.func,

  /**
   * Specify whether the revert button should be visible
   */
  revertActive: PropTypes.bool,

  /**
   * Specify the text that should be shown when the revert button is hovered
   */
  revertLabel: PropTypes.string,

  /**
   * Specify the size of the button, from the following list of sizes:
   */
  size: PropTypes.oneOf(['mini', '2xs', 'xs', 'sm', 'md', 'lg', 'xl']),

  /**
   * @deprecated
   * Specify the text that will be provided to the aria-label of the `AILabel` button
   */
  slugLabel: deprecate(
    PropTypes.string,
    '`slugLabel` on `AILabel` has been deprecated - Please use the `ariaLabel` prop instead'
  ),

  /**
   * Specify additional text to be rendered next to the AI label in the inline variant
   */
  textLabel: PropTypes.string,
};



File: AILabel/AILabel.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import { AILabel, AILabelContent, AILabelActions } from '.';
import * as AILabelStories from './AILabel.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# AILabel

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/AILabel)
|
[AILabel release status](https://airtable.com/appCAqlGVN8tRUbAp/shr71ZyLlIGORz3Vh/tblHqPusgkK8hIeHo)
|
[Using AI-enhanced components in V10](https://github.com/carbon-design-system/carbon-for-ai/blob/main/docs/support-for-carbon-v10.md)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [AILabel anatomy](#ailabel-anatomy)
- [Component API](#component-api)
  - [AILabel `aiText`](#ailabel-aitext)
  - [AILabel `aiTextLabel`](#ailabel-aitextlabel)
  - [AILabel `kind`](#ailabel-kind)
  - [AILabel `revertActive` and `onRevertClick`](#ailabel-revertactive-and-onrevertclick)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

The AI Label is intended for any scenario where something is being generated by
(or with) AI to reinforce AI transparency, accountability, and explainability at
any interface level. This also enables more effective recognition and recall of
AI instances in a way that is identifiable across any IBM product.

<Canvas
  of={AILabelStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(AILabelStories.Default),
    },
  ]}
/>

## AILabel anatomy

The `AILabel` itself is a button that acts as a `Toggletip` trigger. To
construct the contents of the `AILabel` callout, you can place the desired
elements as a child of `AILabel` in `AILabelContent`, like so:

```jsx
<AILabel>
  <AILabelContent>
    {Content Here}
  </AILabelContent>
</AILabel>
```

The `AILabel` also supports the rendering of an action bar at the bottom of the
callout. To achieve this, you can pass in `AILabelActions` as a child of
`AILabel`, placed inside the `AILabelContent`

```jsx
<AILabel>
  <AILabelContent>
    {Content Here}
    {Optional AILabel action bar}
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
```

## Component API

<ArgTypes />

### AILabel `aiText`

If needed, you can change the text inside the `AILabel` when translating to
different languages.

<AILabel aiText="IA" className="sbdocs-ai-label">
  <AILabelContent>Explanation of AI generated content</AILabelContent>
</AILabel>

```jsx
<AILabel aiText="IA">
  <AILabelContent>Explanation of AI-generated content</AILabelContent>
</AILabel>
```

### AILabel `aiTextLabel`

When using the `inline` variant, you can add text adjacent to the AI label with
the `aiTextLabel` prop.

<AILabel kind="inline" textLabel="Text goes here" className="sbdocs-ai-label">
  <AILabelContent>Explanation of AI generated content</AILabelContent>
</AILabel>
<br />
<AILabel kind="inline" className="sbdocs-ai-label">
  <AILabelContent>Explanation of AI generated content</AILabelContent>
</AILabel>

```jsx
<AILabel kind="inline" textLabel="Text goes here">
  <AILabelContent>Explanation of AI generated content</AILabelContent>
</AILabel>

<AILabel kind="inline">
  <AILabelContent>Explanation of AI generated content</AILabelContent>
</AILabel>
```

### AILabel `kind`

The `AILabel` component has two variants, `default` and `inline`.

<AILabel size="xs" className="sbdocs-ai-label">
  <AILabelContent>AI was used to generate this content</AILabelContent>
</AILabel>

```jsx
<AILabel size="xs">
  <AILabelContent>AI was used to generate this content</AILabelContent>
</AILabel>
```

The `inline` `AILabel` with the standard icon can also trigger the AI
explainability callout.

<AILabel kind="inline" textLabel="Text goes here" className="sbdocs-ai-label">
  <AILabelContent>Explanation of AI generated content</AILabelContent>
</AILabel>

```jsx
<AILabel kind="inline" textLabel="Text goes here" size="xs">
  <AILabelContent>Explanation of AI-generated content</AILabelContent>
</AILabel>
```

### AILabel `revertActive` and `onRevertClick`

`revertActive` is a boolean prop that can be set on `AILabel` that transforms
the `AILabel` into a revert action button. This is useful if a user edits an
AI-generated input to show that the element has been modified. This can be used
in conjunction with the `onRevertClick` callback to handle restoring the element
to the AI-generated state. For an example, please take a look at the
[Revert Test story](https://react.carbondesignsystem.com/?path=/story/components-form--with-ai-label&args=revertActive:!true)
or take a look at the example story
[source code](https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Form/Form.stories.js#L272).

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/AILabel/AILabel.mdx).



