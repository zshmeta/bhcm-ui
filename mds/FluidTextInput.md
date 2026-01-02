File: FluidTextInput/FluidTextInput.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import TextInput from '../TextInput';
import { PasswordInput } from '../PasswordInput';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';

export interface FluidTextInputProps {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className?: string;

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue?: string | number;

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: string;

  /**
   * Specify whether the control is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: React.ReactNode;

  /**
   * Specify whether the control is a password input
   */
  isPassword?: boolean;

  /**
   * Max character count allowed for the textInput. This is needed in order for enableCounter to display
   */
  maxCount?: number;

  /**
   * Specify whether to display the character counter
   */
  enableCounter?: boolean;

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: React.ReactNode;

  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>`
   * is updated
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<input>` is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder?: string;

  /**
   * Specify the value of the `<input>`
   */
  value?: string | number;

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
const FluidTextInput = React.forwardRef<HTMLInputElement, FluidTextInputProps>(
  ({ className, isPassword, ...other }, ref) => {
    const prefix = usePrefix();
    const classNames = classnames(className, {
      [`${prefix}--text-input--fluid`]: !isPassword,
    });

    return (
      <FormContext.Provider value={{ isFluid: true }}>
        {isPassword ? (
          <PasswordInput className={classNames} ref={ref} {...other} />
        ) : (
          <TextInput className={classNames} ref={ref} {...other} />
        )}
      </FormContext.Provider>
    );
  }
);

FluidTextInput.propTypes = {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className: PropTypes.string,

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Specify whether the control is a password input
   */
  isPassword: PropTypes.bool,

  /**
   * Max character count allowed for the textInput. This is needed in order for enableCounter to display
   */
  maxCount: PropTypes.number,

  /**
   * Specify whether to display the character counter
   */
  enableCounter: PropTypes.bool,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>`
   * is updated
   */
  onChange: PropTypes.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<input>` is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder: PropTypes.string,

  /**
   * Specify the value of the `<input>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

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

export default FluidTextInput;



File: FluidTextInput/FluidTextInput.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as FluidTextInputStories from './FluidTextInput.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />


# Fluid TextInput

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/FluidTextInput)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
  - [Skeleton](#skeleton)
  - [Default With Toggletip](#default-with-toggletip)
- [Accessibility Considerations](#accessibility-considerations)
  - [Accessible Name](#accessible-name)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={FluidTextInputStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidTextInputStories.Default),
    },
  ]}
/>

### Skeleton

<Canvas
  of={FluidTextInputStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidTextInputStories.Skeleton),
    },
  ]}
/>

### Default With Toggletip

<Canvas
  of={FluidTextInputStories.DefaultWithToggletip}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidTextInputStories.DefaultWithToggletip),
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
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/FluidTextInput/FluidTextInput.mdx).



File: FluidTextInput/FluidPasswordInput.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { PasswordInput } from '../PasswordInput';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';

export interface FluidPasswordInputProps {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className?: string;

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue?: string | number;

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;

  /**
   * "Hide password" tooltip text on password visibility toggle
   */
  hidePasswordLabel?: string;

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: string;

  /**
   * Specify whether the control is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: React.ReactNode;

  /**
   * Specify whether the control is a password input
   */
  isPassword?: boolean;

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: React.ReactNode;

  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>`
   * is updated
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<input>` is clicked
   */
  onClick?: React.MouseEventHandler<HTMLInputElement>;

  /**
   * Callback function that is called whenever the toggle password visibility
   * button is clicked
   */
  onTogglePasswordVisibility?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder?: string;

  /**
   * "Show password" tooltip text on password visibility toggle
   */
  showPasswordLabel?: string;

  /**
   * Specify the value of the `<input>`
   */
  value?: string | number;

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

const FluidPasswordInput: React.FC<FluidPasswordInputProps> = ({
  className,
  ...other
}) => {
  const prefix = usePrefix();
  const classNames = classnames(className, `${prefix}--text-input--fluid`);

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <PasswordInput className={classNames} {...other} />
    </FormContext.Provider>
  );
};

FluidPasswordInput.propTypes = {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className: PropTypes.string,

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * "Hide password" tooltip text on password visibility toggle
   */
  hidePasswordLabel: PropTypes.string,

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Specify whether the control is a password input
   */
  isPassword: PropTypes.bool,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>`
   * is updated
   */
  onChange: PropTypes.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<input>` is clicked
   */
  onClick: PropTypes.func,

  /**
   * Callback function that is called whenever the toggle password visibility
   * button is clicked
   */
  onTogglePasswordVisibility: PropTypes.func,

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder: PropTypes.string,

  /**
   * "Show password" tooltip text on password visibility toggle
   */
  showPasswordLabel: PropTypes.string,

  /**
   * Specify the value of the `<input>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

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

export default FluidPasswordInput;



File: FluidTextInput/FluidPasswordInput.mdx


import { ArgTypes, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
import * as FluidPasswordInputStories from './FluidPasswordInput.stories';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />


# Fluid PasswordInput

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/FluidPasswordInput)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Accessibility Considerations](#accessibility-considerations)
  - [Accessible Name](#accessible-name)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={FluidPasswordInputStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(FluidPasswordInputStories.Default),
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
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/FluidPasswordInput/FluidPasswordInput.mdx).



File: FluidTextInput/test.scss


//
// Copyright IBM Corp. 2022, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

.fluid-input-wrapper {
  display: flex;
  justify-content: space-between;
  inline-size: 100%;
  margin-block-end: 2rem;
}

.fluid-input-wrapper > * {
  margin: 0 1rem;
  inline-size: 33%;
}



File: FluidTextInput/FluidPasswordInput.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidPasswordInput from './FluidPasswordInput';
import mdx from './FluidPasswordInput.mdx';

import './test.scss';

export default {
  title: 'Components/Fluid Components/FluidPasswordInput',
  component: FluidPasswordInput,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['isPassword'],
    },
  },
};

export const Default = (args) => (
  <div style={{ width: args.defaultWidth }}>
    <FluidPasswordInput
      {...args}
      id="input-1"
      labelText="Label"
      placeholder="Placeholder text"
    />
  </div>
);

Default.args = {
  defaultWidth: 300,
  placeholder: 'Placeholder text',
  showPasswordLabel: 'Show password label',
  hidePasswordLabel: 'Hide password label',
  onTogglePasswordVisibility: true,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  disabled: false,
  labelText: 'Label',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

Default.argTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  className: {
    control: {
      type: 'text',
    },
  },
  showPasswordLabel: {
    description: 'Show password" tooltip text on password visibility toggle',
  },
  hidePasswordLabel: {
    description: 'Hide password" tooltip text on password visibility toggle',
  },
  defaultValue: {
    control: {
      type: 'text',
    },
  },
  placeholder: {
    control: {
      type: 'text',
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
  onTogglePasswordVisibility: {
    table: {
      disable: false,
    },
    control: false,
    description:
      'Callback function that is called whenever the toggle password visibility button is clicked `(evt) => void`      ',
  },
  disabled: {
    control: {
      type: 'boolean',
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
  value: {
    control: {
      type: 'text',
    },
  },
};



File: FluidTextInput/FluidTextInput.Skeleton.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';

export interface FluidTextInputSkeletonProps {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className?: string;
}

const FluidTextInputSkeleton: React.FC<FluidTextInputSkeletonProps> = ({
  className,
  ...other
}) => {
  const prefix = usePrefix();

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <div
        className={classnames(
          `${prefix}--form-item ${prefix}--text-input--fluid__skeleton`,
          className
        )}
        {...other}>
        <span className={`${prefix}--label ${prefix}--skeleton`} />
        <div className={`${prefix}--skeleton ${prefix}--text-input`} />
      </div>
    </FormContext.Provider>
  );
};

FluidTextInputSkeleton.propTypes = {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className: PropTypes.string,
};

export default FluidTextInputSkeleton;



File: FluidTextInput/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FluidTextInput from './FluidTextInput';
import FluidPasswordInput from './FluidPasswordInput';
import { type FluidTextInputSkeletonProps } from './FluidTextInput.Skeleton';
import { type FluidPasswordInputProps } from './FluidPasswordInput';
import { type FluidTextInputProps } from './FluidTextInput';
export default FluidTextInput;
export {
  FluidTextInput,
  type FluidTextInputProps,
  type FluidTextInputSkeletonProps,
};
export { FluidPasswordInput, type FluidPasswordInputProps };
export { default as FluidTextInputSkeleton } from './FluidTextInput.Skeleton';



File: FluidTextInput/FluidTextInput.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidTextInput from '../FluidTextInput';
import FluidTextInputSkeleton from './FluidTextInput.Skeleton';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { Information } from '@carbon/icons-react';
import './test.scss';
import mdx from './FluidTextInput.mdx';

export default {
  title: 'Components/Fluid Components/FluidTextInput',
  component: FluidTextInput,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['isPassword'],
    },
  },
  subcomponents: {
    FluidTextInputSkeleton,
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

export const Default = (args) => (
  <div style={{ width: args.defaultWidth }}>
    <FluidTextInput {...args} />
  </div>
);

Default.args = {
  defaultWidth: 300,
  placeholder: 'Placeholder text',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  disabled: false,
  labelText: 'Label',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

Default.argTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  className: {
    control: {
      type: 'text',
    },
  },
  defaultValue: {
    control: {
      type: 'text',
    },
  },
  placeholder: {
    control: {
      type: 'text',
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
  disabled: {
    control: {
      type: 'boolean',
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
  value: {
    control: {
      type: 'text',
    },
  },
};

export const DefaultWithToggletip = () => (
  <FluidTextInput labelText={ToggleTip} placeholder="Placeholder text" />
);

export const Skeleton = () => (
  <div style={{ width: '300px' }}>
    <FluidTextInputSkeleton
      labelText="Label"
      placeholder="Placeholder text"
      id="input-1"
    />
  </div>
);



