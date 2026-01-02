File: FluidSelect/FluidSelect.Skeleton.tsx


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
export interface FluidSelectSkeletonProps {
  /**
   * Specify an optional className to add.
   */
  className?: string;
}

const FluidSelectSkeleton: React.FC<FluidSelectSkeletonProps> = ({
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

FluidSelectSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default FluidSelectSkeleton;



File: FluidSelect/FluidSelect.tsx


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Select from '../Select';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';

export interface FluidSelectProps {
  /**
   * Provide the contents of your Select
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the node containing the label and the select box
   */
  className?: string;

  /**
   * Optionally provide the default value of the `<select>`
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  defaultValue?: any;

  /**
   * Specify whether the control is disabled
   */
  disabled?: boolean;

  /**
   * Specify a custom `id` for the `<select>`
   */
  id: string;

  /**
   * Specify if the currently value is invalid.
   */
  invalid?: boolean;

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText?: React.ReactNode;

  /**
   * Provide label text to be read by screen readers when interacting with the
   * control
   */
  labelText?: React.ReactNode;

  /**
   * Provide an optional `onChange` hook that is called each time the value of
   * the underlying `<input>` changes
   */
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;

  /**
   * Whether or not the component is readonly
   */
  readOnly?: boolean;
}

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
const FluidSelect = React.forwardRef<HTMLSelectElement, FluidSelectProps>(
  ({ className, children, ...other }, ref) => {
    const prefix = usePrefix();
    const classNames = classnames(`${prefix}--select--fluid`, className);

    return (
      <FormContext.Provider value={{ isFluid: true }}>
        <Select ref={ref} className={classNames} {...other}>
          {children}
        </Select>
      </FormContext.Provider>
    );
  }
);

FluidSelect.propTypes = {
  /**
   * Provide the contents of your Select
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the node containing the label and the select box
   */
  className: PropTypes.string,

  /**
   * Optionally provide the default value of the `<select>`
   */
  defaultValue: PropTypes.any,

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify a custom `id` for the `<select>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify if the currently value is invalid.
   */
  invalid: PropTypes.bool,

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText: PropTypes.node,

  /**
   * Provide label text to be read by screen readers when interacting with the
   * control
   */
  labelText: PropTypes.node,

  /**
   * Provide an optional `onChange` hook that is called each time the value of
   * the underlying `<input>` changes
   */
  onChange: PropTypes.func,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,

  /**
   * Whether or not the component is readonly
   */
  readOnly: PropTypes.bool,
};

export default FluidSelect;



File: FluidSelect/index.tsx


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FluidSelect from './FluidSelect';
import type FluidSelectSkeletonProps from './FluidSelect.Skeleton';
import type FluidSelectProps from './FluidSelect.Skeleton';
export type { FluidSelectSkeletonProps, FluidSelectProps };
export default FluidSelect;
export { FluidSelect };
export { default as FluidSelectSkeleton } from './FluidSelect.Skeleton';



File: FluidSelect/FluidSelect.stories.js


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FluidSelect, FluidSelectSkeleton } from '.';
import SelectItem from '../SelectItem';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { Information, View, FolderOpen, Folders } from '@carbon/icons-react';
import mdx from './FluidSelect.mdx';

export default {
  title: 'Components/Fluid Components/FluidSelect',
  component: FluidSelect,
  subcomponents: {
    FluidSelectSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['defaultValue', 'id'],
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

const sharedArgTypes = {
  className: {
    control: {
      type: 'text',
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
  labelText: {
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

const ToggleTip = (
  <>
    <ToggletipLabel>Select an option</ToggletipLabel>
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

export const Default = (args) => (
  <div style={{ width: args.defaultWidth }}>
    <FluidSelect {...args} id="select-1">
      <SelectItem value="" text="" />
      <SelectItem value="option-1" text="Option 1" />
      <SelectItem value="option-2" text="Option 2" />
      <SelectItem value="option-3" text="Option 3" />
      <SelectItem value="option-4" text="Option 4" />
    </FluidSelect>
  </div>
);

Default.args = {
  labelText: ToggleTip,
  defaultWidth: 400,
  className: 'test-class',
  disabled: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
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
  <div style={{ width: 400 }}>
    <FluidSelect
      id="select-1"
      labelText="Select an option"
      decorator={aiLabel}
      {...args}>
      <SelectItem value="" text="" />
      <SelectItem
        value="An example option that is really long to show what should be done to handle long text"
        text="An example option that is really long to show what should be done to handle long text"
      />
      <SelectItem value="Option 2" text="Option 2" />
      <SelectItem value="Option 3" text="Option 3" />
      <SelectItem value="Option 4" text="Option 4" />
    </FluidSelect>
  </div>
);

withAILabel.argTypes = { ...sharedArgTypes };

export const Skeleton = () => (
  <div style={{ width: 400 }}>
    <FluidSelectSkeleton />
  </div>
);



File: FluidSelect/FluidSelect.mdx


import { ArgTypes, Meta } from '@storybook/addon-docs/blocks';

import FluidSelect from './';

import SelectItem from '../SelectItem';

<Meta isTemplate />

# FluidSelect

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/FluidSelect)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Default state](#default-state)
  - [Empty default option](#empty-default-option)
  - [First option default](#first-option-default)
  - [Custom option default](#custom-option-default)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Default state

Carbon recommends that a select has an empty option selected by default.
Depending on the use case, this defaulted behavior can be modified to be a
prefilled selection to the first option in the list, which is typically shown in
alphabetical order, or the prefilled selection could be a frequent or commonly
used option that is on the list.

### Empty default option

To get a default empty selection on your select, make the first child in your
`FluidSelect` component a `SelectItem` with empty `text` and `value` props.

<FluidSelect
  id={`select-1`}
  labelText="Select an option"
  helperText="Optional helper text">
  <SelectItem value="" text="" />
  <SelectItem value="option-1" text="Option 1" />
  <SelectItem value="option-2" text="Option 2" />
</FluidSelect>

```jsx
<FluidSelect
  id={`select-1`}
  labelText="Select an option"
  helperText="Optional helper text">
  <SelectItem value="" text="" />
  <SelectItem value="option-1" text="Option 1" />
  <SelectItem value="option-2" text="Option 2" />
</FluidSelect>
```

### First option default

The select will default to the first provided option given that no
`defaultValue` is specified. No further action needed. Keep in mind that
Carbon's design guidance is to present select options in alphabetical order. If
you need an option pre-selected that isn't displayed in first place, see
[Custom option default](#custom-option-default)

<FluidSelect
  id={`select-2`}
  labelText="Select an option"
  helperText="Optional helper text">
  <SelectItem value="option-1" text="Option 1" />
  <SelectItem value="option-2" text="Option 2" />
  <SelectItem value="option-3" text="Option 3" />
</FluidSelect>

```jsx
<FluidSelect
  id={`select-2`}
  labelText="Select an option"
  helperText="Optional helper text">
  <SelectItem value="option-1" text="Option 1" />
  <SelectItem value="option-2" text="Option 2" />
  <SelectItem value="option-3" text="Option 3" />
</FluidSelect>
```

### Custom option default

To have a custom option from the select's option list be selected by default,
simply set a `defaultValue` on the `Select` component equal to the value of the
desired option.

<FluidSelect
  id={`select-3`}
  labelText="Select an option"
  helperText="Optional helper text"
  defaultValue="option-3">
  <SelectItem value="option-1" text="Option 1" />
  <SelectItem value="option-2" text="Option 2" />
  <SelectItem value="option-3" text="Option 3" />
</FluidSelect>

```jsx
<FluidSelect
  id={`select-3`}
  labelText="Select an option"
  helperText="Optional helper text"
  defaultValue="option-3">
  <SelectItem value="option-1" text="Option 1" />
  <SelectItem value="option-2" text="Option 2" />
  <SelectItem value="option-3" text="Option 3" />
</FluidSelect>
```

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/FluidSelect/FluidSelect.mdx).



