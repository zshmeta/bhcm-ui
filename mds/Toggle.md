File: Toggle/Toggle.tsx


/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  type KeyboardEventHandler,
  type MouseEventHandler,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useControllableState } from '../../internal/useControllableState';
import { usePrefix } from '../../internal/usePrefix';
import { Text } from '../Text';

type ExcludedAttributes =
  | 'aria-labelledby'
  | 'aria-checked'
  | 'type'
  | 'role'
  | 'id'
  | 'size'
  | 'onClick'
  | 'onToggle';

export interface ToggleProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    ExcludedAttributes
  > {
  /**
   * Specify another element's id to be used as the label for this toggle
   */
  'aria-labelledby'?: string;

  /**
   * Provide an id that unique represents the underlying `<button>`
   */

  id: string;

  /**
   * Specify the label for the "off" position
   */
  labelA?: string;

  /**
   * Specify the label for the "on" position
   */
  labelB?: string;

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control. This should be provided unless 'aria-labelledby' is set instead
   * or you use an external <label> element with its "for" attribute set to the
   * toggle's id.
   */
  labelText?: string;

  /**
   * If true, the side labels (props.labelA and props.labelB) will be replaced by
   * props.labelText (if passed), so that the toggle doesn't render a top label.
   */
  hideLabel?: boolean;

  /**
   * Provide an event listener that is called when the control is toggled
   */
  onClick?:
    | MouseEventHandler<HTMLDivElement>
    | KeyboardEventHandler<HTMLDivElement>;

  /**
   * Provide an event listener that is called when the control is toggled
   */
  onToggle?(checked: boolean): void;

  /**
   * Specify the size of the Toggle. Currently only supports 'sm' or 'md' (default)
   */
  size?: 'sm' | 'md';

  /**
   * Whether the toggle should be read-only
   */
  readOnly?: boolean;

  /**
   * Specify whether the toggle should be on by default
   */
  defaultToggled?: boolean;

  /**
   * Specify whether the control is toggled
   */
  toggled?: boolean;
}

export function Toggle({
  'aria-labelledby': ariaLabelledby,
  className,
  defaultToggled = false,
  disabled = false,
  hideLabel = false,
  id,
  labelA = 'Off',
  labelB = 'On',
  labelText,
  onClick,
  onToggle,
  readOnly,
  size = 'md',
  toggled,
  ...other
}: ToggleProps) {
  const prefix = usePrefix();
  const buttonElement = useRef<HTMLButtonElement>(null);
  const [checked, setChecked] = useControllableState({
    value: toggled,
    onChange: onToggle,
    defaultValue: defaultToggled,
  });

  function handleClick(e) {
    if (!readOnly) {
      setChecked(!checked);
    }
    if (onClick) {
      onClick(e);
    }
  }

  const isSm = size === 'sm';
  const sideLabel = hideLabel ? labelText : checked ? labelB : labelA;
  const renderSideLabel = !(hideLabel && !labelText);
  const LabelComponent = labelText ? 'label' : 'div';

  const wrapperClasses = classNames(
    `${prefix}--toggle`,
    {
      [`${prefix}--toggle--disabled`]: disabled,
      [`${prefix}--toggle--readonly`]: readOnly,
    },
    className
  );

  const labelTextClasses = classNames(`${prefix}--toggle__label-text`, {
    [`${prefix}--visually-hidden`]: hideLabel,
  });

  const appearanceClasses = classNames(`${prefix}--toggle__appearance`, {
    [`${prefix}--toggle__appearance--sm`]: isSm,
  });

  const switchClasses = classNames(`${prefix}--toggle__switch`, {
    [`${prefix}--toggle__switch--checked`]: checked,
  });

  const labelId = `${id}_label`;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={wrapperClasses}
      onClick={
        !labelText
          ? (e) => {
              // the underlying <button> can only be activated by keyboard as it is visually hidden;
              // therefore, if this event's target is the <button>, it had to be triggered by
              // the keyboard event which already calls handleClick. if we wouldn't catch this, the
              // onClick and onToggle functions would be called twice whenever the user activates the
              // toggle by keyboard and props['aria-labelledby'] is passed.
              if (
                buttonElement.current &&
                e.target !== buttonElement.current &&
                !disabled
              ) {
                handleClick(e);
                buttonElement.current.focus();
              }
            }
          : undefined
      }>
      <button
        {...other}
        ref={buttonElement}
        id={id}
        className={`${prefix}--toggle__button`}
        role="switch"
        type="button"
        aria-checked={checked}
        aria-labelledby={ariaLabelledby ?? (labelText ? labelId : undefined)}
        disabled={disabled}
        onClick={handleClick}
      />
      <LabelComponent
        id={labelId}
        htmlFor={ariaLabelledby ? undefined : id}
        className={`${prefix}--toggle__label`}>
        {labelText && <Text className={labelTextClasses}>{labelText}</Text>}
        <div className={appearanceClasses}>
          <div className={switchClasses}>
            {isSm && !readOnly && (
              <svg
                aria-hidden="true"
                focusable="false"
                className={`${prefix}--toggle__check`}
                width="6px"
                height="5px"
                viewBox="0 0 6 5">
                <path d="M2.2 2.7L5 0 6 1 2.2 5 0 2.7 1 1.5z" />
              </svg>
            )}
          </div>
          {renderSideLabel && (
            <Text className={`${prefix}--toggle__text`} aria-hidden="true">
              {sideLabel}
            </Text>
          )}
        </div>
      </LabelComponent>
    </div>
  );
}

Toggle.propTypes = {
  /**
   * Specify another element's id to be used as the label for this toggle
   */
  'aria-labelledby': PropTypes.string,

  /**
   * Specify a custom className to apply to the form-item node
   */
  className: PropTypes.string,

  /**
   * Specify whether the toggle should be on by default
   */
  defaultToggled: PropTypes.bool,

  /**
   * Whether this control should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * If true, the side labels (props.labelA and props.labelB) will be replaced by
   * props.labelText (if passed), so that the toggle doesn't render a top label.
   */
  hideLabel: PropTypes.bool,

  /**
   * Provide an id that unique represents the underlying `<button>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify the label for the "off" position
   */
  labelA: PropTypes.node,

  /**
   * Specify the label for the "on" position
   */
  labelB: PropTypes.node,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control. This should be provided unless 'aria-labelledby' is set instead
   * or you use an external <label> element with its "for" attribute set to the
   * toggle's id.
   */
  labelText: PropTypes.string,

  /**
   * Provide an event listener that is called when the control is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an event listener that is called when the control is toggled
   */
  onToggle: PropTypes.func,

  /**
   * Whether the toggle should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the size of the Toggle. Currently only supports 'sm' or 'md' (default)
   */
  size: PropTypes.oneOf(['sm', 'md']),

  /**
   * Specify whether the control is toggled
   */
  toggled: PropTypes.bool,
};

export default Toggle;



File: Toggle/Toggle.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { VStack } from '../Stack';
import Toggle, { ToggleSkeleton } from '../Toggle';
import mdx from './Toggle.mdx';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return (
    <Toggle
      labelText="Label"
      labelA="Off"
      labelB="On"
      defaultToggled
      id="toggle-3"
      {...args}
    />
  );
};

Default.argTypes = {
  className: {
    control: false,
  },
  defaultToggled: {
    control: false,
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
  },
  id: {
    control: false,
  },
  labelA: {
    control: false,
  },
  labelB: {
    control: false,
  },
  labelText: {
    control: false,
  },
  onClick: {
    control: false,
  },
  onToggle: {
    control: false,
  },
  size: {
    size: {
      options: ['sm', 'md'],
      control: { type: 'select' },
    },
  },
};

export const SmallToggle = (args) => {
  return (
    <Toggle
      size="sm"
      labelText="Label"
      labelA="Off"
      labelB="On"
      defaultToggled
      id="toggle-2"
      {...args}
    />
  );
};

export const WithAccessibleLabels = () => {
  return (
    <VStack gap={7}>
      <Toggle id="toggle-4" labelText="Label" />

      <Toggle id="toggle-5" labelText="Label" hideLabel />

      <div>
        <div id="toggle-6-label" style={{ marginBlockEnd: '0.5rem' }}>
          Internal aria-label toggle
        </div>
        <Toggle aria-labelledby="toggle-6-label" id="toggle-6" />
      </div>

      <div>
        <label
          id="toggle-7-label"
          htmlFor="toggle-7"
          style={{ display: 'block', marginBlockEnd: '0.5rem' }}>
          External toggle label
        </label>
        <Toggle aria-labelledby="toggle-7-label" id="toggle-7" />
      </div>
    </VStack>
  );
};

export const Skeleton = (args) => {
  return (
    <div>
      <ToggleSkeleton />
    </div>
  );
};

Skeleton.parameters = {
  controls: { include: ['className'] },
};



File: Toggle/docs/overview.mdx


## Live demo

<StorybookDemo
  themeSelector
  url="https://react.carbondesignsystem.com"
  variants={[
    {
      label: 'Default',
      variant: 'components-toggle--default'
    },
    {
      label: 'Small Toggle',
      variant: 'components-toggle--small-toggle'
    }
  ]}
/>



File: Toggle/index.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { default as Toggle, ToggleProps } from './Toggle';

export * from './Toggle.Skeleton';
export default Toggle;

export { Toggle };

export type { ToggleProps };



File: Toggle/toggle-story.scss


//
// Copyright IBM Corp. 2025
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

@use '@carbon/react/scss/components/toggle';

.v12-toggle {
  @include toggle.toggle($enable-v12-toggle-reduced-label-spacing: true);
}



File: Toggle/Toggle.featureflag.stories.js


/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Toggle } from '.';
import './toggle-story.scss';

import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

export default {
  title: 'Components/Toggle/Feature Flag',
  component: Toggle,
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
  tags: ['!autodocs'],
};

const previewClassname = 'v12-toggle';

export const _Toggle = (args) => {
  return (
    <div className={previewClassname}>
      <Toggle
        labelText="Label"
        labelA="Off"
        labelB="On"
        defaultToggled
        id="toggle-3"
        {...args}
      />
    </div>
  );
};

_Toggle.args = {
  disabled: false,
};

_Toggle.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};



File: Toggle/Toggle.Skeleton.tsx


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

export interface ToggleSkeletonProps {
  'aria-label'?: string;
  className?: string;
}

const ToggleSkeleton: React.FC<ToggleSkeletonProps> = ({
  className,
  ...rest
}) => {
  const prefix = usePrefix();

  const skeletonClassNames = cx(
    `${prefix}--toggle ${prefix}--toggle--skeleton`,
    className
  );

  return (
    <div className={skeletonClassNames} {...rest}>
      <div className={`${prefix}--toggle__skeleton-circle`} />
      <div className={`${prefix}--toggle__skeleton-rectangle`} />
    </div>
  );
};

ToggleSkeleton.propTypes = {
  'aria-label': PropTypes.string,
  className: PropTypes.string,
};

export default ToggleSkeleton;
export { ToggleSkeleton };



File: Toggle/Toggle.featureflag.mdx


import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Components/Toggle/Feature Flag" name="Flag details" />

# Reduced toggle label spacing

Reduced spacing between the toggle control and its label to improve visual consistency with other form inputs.

```scss
@use '@carbon/react/scss/feature-flags' with (
  $feature-flags: (
    'enable-v12-toggle-reduced-label-spacing': true,
  )
);
@use '@carbon/react';
```



File: Toggle/Toggle.mdx


import { ArgTypes, Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as ToggleStories from './Toggle.stories';
import Toggle from '../Toggle';
import { stackblitzPrefillConfig } from '../../../previewer/codePreviewer';

<Meta isTemplate />

# Toggle

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Toggle)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/toggle/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/toggle/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Small Toggle](#small-toggle)
- [Skeleton](#skeleton)
- [With Accessible Labels](#with-accessible-labels)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

<Canvas
  of={ToggleStories.Default}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ToggleStories.Default),
    },
  ]}
/>

## Small Toggle

<Canvas
  of={ToggleStories.SmallToggle}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ToggleStories.SmallToggle),
    },
  ]}
/>

## Skeleton

<Canvas
  of={ToggleStories.Skeleton}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ToggleStories.Skeleton),
    },
  ]}
/>

## With Accessible Labels

<Canvas
  of={ToggleStories.WithAccessibleLabels}
  additionalActions={[
    {
      title: 'Open in Stackblitz',
      onClick: () => stackblitzPrefillConfig(ToggleStories.WithAccessibleLabels),
    },
  ]}
/>

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/Toggle/Toggle.mdx).



