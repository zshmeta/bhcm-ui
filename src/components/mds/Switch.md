File: Switch/IconSwitch.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import classNames from 'classnames';
import { IconButton, type IconButtonProps } from '../IconButton';
import { usePrefix } from '../../internal/usePrefix';
import { noopFn } from '../../internal/noopFn';
import type { SwitchEventHandlersParams } from './Switch';

interface IconSwitchProps
  extends Omit<IconButtonProps, 'onClick' | 'onKeyDown' | 'label' | 'name'> {
  /**
   * The index of the `IconSwitch`.
   *
   * Reserved for usage in `ContentSwitcher`.
   */
  index?: number;

  /**
   * The name of the `IconSwitch`.
   */
  name?: string | number;

  /**
   * A handler that is invoked when a user clicks on the control.
   *
   * Reserved for usage in `ContentSwitcher`.
   */
  onClick?: (params: SwitchEventHandlersParams) => void;

  /**
   * A handler that is invoked on the key down event for the control.
   *
   * Reserved for usage in `ContentSwitcher`.
   */
  onKeyDown?: (params: SwitchEventHandlersParams) => void;

  /**
   * Whether the `IconSwitch` is selected.
   *
   * Reserved for usage in `ContentSwitcher`.
   */
  selected?: boolean;

  // TODO: Why isn't this prop named `label` to match the `IconButton` prop?
  /**
   * `Tooltip` text.
   */
  text?: string;
}

const frFn = forwardRef<HTMLButtonElement, IconSwitchProps>;

const IconSwitch = frFn((props, ref) => {
  const {
    align,
    children,
    className,
    disabled,
    enterDelayMs,
    index,
    leaveDelayMs = 0,
    name,
    onClick = noopFn,
    onKeyDown = noopFn,
    selected = false,
    size,
    text,
    ...other
  } = props;
  const prefix = usePrefix();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClick({ index, name, text });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    // TODO: `which` was deprecated years ago. When can its usage be deleted?
    const key = event.key || event.which;

    onKeyDown({ index, name, text, key });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const classes = classNames(className, `${prefix}--content-switcher-btn`, {
    [`${prefix}--content-switcher--selected`]: selected,
  });

  const iconButtonClasses = classNames(
    `${prefix}--content-switcher-popover__wrapper`,
    {
      [`${prefix}--content-switcher-popover--selected`]: selected,
      [`${prefix}--content-switcher-popover--disabled`]: disabled,
    }
  );

  return (
    <IconButton
      label={text}
      type="button"
      ref={ref}
      role="tab"
      tabIndex={selected || isHovered ? 0 : -1}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      aria-selected={selected}
      aria-label={text}
      wrapperClasses={iconButtonClasses}
      {...other}
      align={align}
      className={classes}
      disabled={disabled}
      enterDelayMs={enterDelayMs}
      leaveDelayMs={leaveDelayMs}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      size={size}>
      {children}
    </IconButton>
  );
});

IconSwitch.displayName = 'IconSwitch';

IconSwitch.propTypes = {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',
    'bottom',
    'bottom-left',
    'bottom-right',
    'left',
    'right',
  ]),

  /**
   * Children to be rendered inside of the `IconSwitch`.
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your `IconSwitch`.
   */
  className: PropTypes.string,

  /**
   * Whether the `IconSwitch` should be disabled.
   */
  disabled: PropTypes.bool,

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  enterDelayMs: PropTypes.number,

  /**
   * The index of the `IconSwitch`.
   *
   * Reserved for usage in `ContentSwitcher`.
   */
  index: PropTypes.number,

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs: PropTypes.number,

  /**
   * The name of the `IconSwitch`.
   */
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * A handler that is invoked when a user clicks on the control.
   *
   * Reserved for usage in `ContentSwitcher`.
   */
  onClick: PropTypes.func,

  /**
   * A handler that is invoked on the key down event for the control.
   *
   * Reserved for usage in `ContentSwitcher`.
   */
  onKeyDown: PropTypes.func,

  /**
   * Whether the `IconSwitch` is selected.
   *
   * Reserved for usage in `ContentSwitcher`.
   */
  selected: PropTypes.bool,

  // TODO: Icon only variant of what? Isn't the `IconSwitch` always icon only?
  /**
   * Passed in from `ContentSwitcher` to render icon-only variant
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * `Tooltip` text.
   */
  text: PropTypes.string,
};

export default IconSwitch;



File: Switch/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Switch, { type SwitchProps } from './Switch';
import IconSwitch from './IconSwitch';

export default Switch;
export { Switch, IconSwitch, type SwitchProps };



File: Switch/Switch.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  ButtonHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { noopFn } from '../../internal/noopFn';

export interface SwitchEventHandlersParams {
  index?: number;
  name?: string | number;
  text?: string;
  key?: string | number;
}

export interface SwitchProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'name' | 'onClick' | 'onKeyDown'
  > {
  /**
   * Provide child elements to be rendered inside of the Switch
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be added to your Switch
   */
  className?: string;

  /**
   * Specify whether or not the Switch should be disabled
   */
  disabled?: boolean;

  /**
   * The index of your Switch in your ContentSwitcher that is used for event handlers.
   * Reserved for usage in ContentSwitcher
   */
  index?: number;

  /**
   * Provide the name of your Switch that is used for event handlers
   */
  name?: string | number;

  /**
   * A handler that is invoked when a user clicks on the control.
   * Reserved for usage in ContentSwitcher
   */
  onClick?: (params: SwitchEventHandlersParams) => void;

  /**
   * A handler that is invoked on the key down event for the control.
   * Reserved for usage in ContentSwitcher
   */
  onKeyDown?: (params: SwitchEventHandlersParams) => void;

  /**
   * Whether your Switch is selected. Reserved for usage in ContentSwitcher
   */
  selected?: boolean;

  /**
   * Provide the contents of your Switch
   */
  text?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (props: SwitchProps, tabRef) => {
    const {
      children,
      className,
      disabled,
      index,
      name,
      onClick = noopFn,
      onKeyDown = noopFn,
      selected = false,
      text,
      ...other
    } = props;
    const prefix = usePrefix();

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onClick?.({ index, name, text });
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      // TODO: `which` was deprecated years ago. When can its usage be deleted?
      const key = event.key || event.which;

      onKeyDown?.({ index, name, text, key });
    };

    const classes = classNames(className, `${prefix}--content-switcher-btn`, {
      [`${prefix}--content-switcher--selected`]: selected,
    });

    const commonProps = {
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      className: classes,
      disabled,
    };

    return (
      <button
        type="button"
        ref={tabRef}
        role="tab"
        tabIndex={selected ? 0 : -1}
        aria-selected={selected}
        {...other}
        {...commonProps}>
        <span className={`${prefix}--content-switcher__label`} title={text}>
          {text !== undefined ? text : children}
        </span>
      </button>
    );
  }
);

Switch.displayName = 'Switch';

Switch.propTypes = {
  /**
   * Provide child elements to be rendered inside of the Switch
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your Switch
   */
  className: PropTypes.string,

  /**
   * Specify whether or not the Switch should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * The index of your Switch in your ContentSwitcher that is used for event handlers.
   * Reserved for usage in ContentSwitcher
   */
  index: PropTypes.number,

  /**
   * Provide the name of your Switch that is used for event handlers
   */
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * A handler that is invoked when a user clicks on the control.
   * Reserved for usage in ContentSwitcher
   */
  onClick: PropTypes.func,

  /**
   * A handler that is invoked on the key down event for the control.
   * Reserved for usage in ContentSwitcher
   */
  onKeyDown: PropTypes.func,

  /**
   * Whether your Switch is selected. Reserved for usage in ContentSwitcher
   */
  selected: PropTypes.bool,

  /**
   * Provide the contents of your Switch
   */
  text: PropTypes.string,
};

export default Switch;



