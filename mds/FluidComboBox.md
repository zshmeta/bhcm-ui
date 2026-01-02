File: FluidComboBox/FluidComboBox.tsx


/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ComponentType, ForwardedRef, type ComponentProps } from 'react';
import classnames from 'classnames';
import ComboBox from '../ComboBox';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';
import { ComboBoxProps } from '../ComboBox/ComboBox';

type ItemToStringHandler<ItemType> = (item: ItemType | null) => string;

interface OnChangeData<ItemType> {
  selectedItem: ItemType | null | undefined;
  inputValue?: string | null;
}

export interface FluidComboBoxProps<ItemType>
  extends ComboBoxProps<ItemType>,
    Pick<ComponentProps<typeof ComboBox>, 'translateWithId'> {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className?: string;

  /**
   * Specify the direction of the dropdown. Can be either top or bottom.
   */
  direction?: 'top' | 'bottom';

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: string;

  /**
   * Allow users to pass in an arbitrary item or a string (in case their items are an array of strings)
   * from their collection that are pre-selected
   */
  initialSelectedItem?: ItemType;

  /**
   * Specify if the currently selected value is invalid.
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: React.ReactNode;

  /**
   * Specify if the `FluidComboBox` should render its menu items in condensed mode
   */
  isCondensed?: boolean;

  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement?: ComponentType<ItemType> | null;

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list.
   */
  itemToString?: ItemToStringHandler<ItemType>;
  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: ItemType[];

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: React.ReactNode;

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange: (data: OnChangeData<ItemType>) => void;

  /**
   * In the case you want to control the dropdown selection entirely.
   * */
  selectedItem?: ItemType | null;

  /**
   * Provide the title text that will be read by a screen reader when
   * visiting this control
   */
  titleText?: React.ReactNode;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;
}

const FluidComboBox = React.forwardRef(function FluidComboBox<ItemType>(
  { className, isCondensed, ...other }: FluidComboBoxProps<ItemType>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const prefix = usePrefix();
  const classNames = classnames(
    `${prefix}--list-box__wrapper--fluid`,
    className,
    { [`${prefix}--list-box__wrapper--fluid--condensed`]: isCondensed }
  );

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <ComboBox ref={ref} className={classNames} {...other} />
    </FormContext.Provider>
  );
});

FluidComboBox.propTypes = {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className: PropTypes.string,

  /**
   * Specify the direction of the dropdown. Can be either top or bottom.
   */
  direction: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Allow users to pass in an arbitrary item or a string (in case their items are an array of strings)
   * from their collection that are pre-selected
   */
  initialSelectedItem: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Specify if the currently selected value is invalid.
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Specify if the `FluidComboBox` should render its menu items in condensed mode
   */
  isCondensed: PropTypes.bool,

  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement: PropTypes.func,

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list.
   */
  itemToString: PropTypes.func,

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: PropTypes.array.isRequired,

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: PropTypes.node.isRequired,

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occurring.
   */
  onChange: PropTypes.func.isRequired,

  /**
   * In the case you want to control the dropdown selection entirely.
   */
  selectedItem: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Provide the title text that will be read by a screen reader when
   * visiting this control
   */
  titleText: PropTypes.node,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

export default FluidComboBox;



File: FluidComboBox/FluidComboBox.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as FluidComboBoxStories from './FluidComboBox.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />


# Fluid ComboBox

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/FluidComboBox)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/ComboBox/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/ComboBox/accessibility)


{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [Skeleton](#skeleton)
  - [With AI Label](#wth-ai-label)
  - [Condensed](#condensed)
- [Accessibility Considerations](#accessibility-considerations)
  - [Accessible Name](#accessible-name)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={FluidComboBoxStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidComboBoxStories.Default),
    },
  ]}
/>

### Skeleton

<Canvas
  of={FluidComboBoxStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidComboBoxStories.Skeleton),
    },
  ]}
/>

### With AI Label

<Canvas
  of={FluidComboBoxStories.withAILabel}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidComboBoxStories.withAILabel),
    },
  ]}
/>

### Condensed

<Canvas
  of={FluidComboBoxStories.Condensed}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidComboBoxStories.Condensed),
    },
  ]}
/>

## Accessibility Considerations

### Accessible Name

To comply with accessibility requirements, make sure to supply the component
with an accessible name by providing either the `aria-label`, `aria-labelledby`
or `title` attribute. Read more on the accessible naming rule
[here](https://able.ibm.com/rules/archives/latest/doc/en-US/aria_accessiblename_exists.html).

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/FluidComboBox/FluidComboBox.mdx).



File: FluidComboBox/index.tsx


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FluidComboBox from './FluidComboBox';
import type { FluidComboBoxProps } from './FluidComboBox';
import type { FluidComboBoxSkeletonProps } from './FluidComboBox.Skeleton';
export type { FluidComboBoxProps, FluidComboBoxSkeletonProps };
export default FluidComboBox;
export { FluidComboBox };
export { default as FluidComboBoxSkeleton } from './FluidComboBox.Skeleton';



File: FluidComboBox/FluidComboBox.stories.js


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FluidComboBox, FluidComboBoxSkeleton } from '../FluidComboBox';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { Button } from '../Button';
import { Information, View, FolderOpen, Folders } from '@carbon/icons-react';
import mdx from './FluidComboBox.mdx';

export default {
  title: 'Components/Fluid Components/FluidComboBox',
  component: FluidComboBox,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  subcomponents: {
    FluidComboBoxSkeleton,
  },
};

const items = [
  {
    id: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    id: 'option-4',
    text: 'Option 4',
  },
  {
    id: 'option-5',
    text: 'Option 5',
  },
];

const sharedArgTypes = {
  className: {
    control: {
      type: 'text',
    },
  },
  isCondensed: {
    control: {
      type: 'boolean',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
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
  label: {
    control: {
      type: 'text',
    },
  },
  titleText: {
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
};

export const Default = (args) => (
  <div style={{ width: args.defaultWidth }}>
    <FluidComboBox
      onChange={() => {}}
      id="default"
      titleText="Label"
      label="Choose an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      {...args}
    />
  </div>
);

Default.args = {
  defaultWidth: 400,
  className: 'test-class',
  isCondensed: false,
  disabled: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  label: 'Choose an option',
  titleText: 'Label',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

Default.argTypes = {
  ...sharedArgTypes,
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
};

const ToggleTip = (
  <>
    <ToggletipLabel>Label</ToggletipLabel>
    <Toggletip align="top-left">
      <ToggletipButton label="Show information">
        <Information />
      </ToggletipButton>
      <ToggletipContent>
        <p>Additional field information here.</p>
      </ToggletipContent>
    </Toggletip>
  </>
);

export const Condensed = () => (
  <div style={{ width: '400px' }}>
    <FluidComboBox
      onChange={() => {}}
      id="default"
      isCondensed
      titleText="Label"
      label="Choose an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
    />
  </div>
);

const aiLabel = (
  <AILabel className="ai-label-container">
    <AILabelContent>
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

export const withAILabel = (args) => (
  <div style={{ width: '400px' }}>
    <FluidComboBox
      onChange={() => {}}
      id="default"
      titleText="Label"
      label="Choose an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      decorator={aiLabel}
      {...args}
    />
  </div>
);

withAILabel.argTypes = {
  ...sharedArgTypes,
};

export const Skeleton = () => (
  <div style={{ width: 400 }}>
    <FluidComboBoxSkeleton />
  </div>
);



File: FluidComboBox/FluidComboBox.Skeleton.tsx


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

export interface FluidComboBoxSkeletonProps {
  /**
   * Specify an optional className to add.
   */
  className?: string;
}

const FluidComboBoxSkeleton: React.FC<FluidComboBoxSkeletonProps> = ({
  className,
  ...rest
}) => {
  const prefix = usePrefix();
  const wrapperClasses = cx(className, `${prefix}--list-box__wrapper--fluid`);

  return (
    <div className={wrapperClasses} {...rest}>
      <div className={`${prefix}--skeleton ${prefix}--list-box`}>
        <span className={`${prefix}--list-box__label`} />
        <div className={`${prefix}--list-box__field`} />
      </div>
    </div>
  );
};

FluidComboBoxSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default FluidComboBoxSkeleton;



