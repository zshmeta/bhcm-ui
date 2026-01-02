File: UIShell/HeaderMenuButton.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Close, Menu } from '@carbon/icons-react';

import cx from 'classnames';
import React, { type ComponentProps, type JSX } from 'react';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { usePrefix } from '../../internal/usePrefix';

type HeaderMenuButtonBaseProps = Omit<
  ComponentProps<'button'>,
  'title' | 'type'
>;

export interface HeaderMenuButtonProps extends HeaderMenuButtonBaseProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
  renderMenuIcon?: JSX.Element;
  renderCloseIcon?: JSX.Element;
  isActive?: boolean;
  isCollapsible?: boolean;
}

export default function HeaderMenuButton({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className: customClassName,
  renderMenuIcon,
  renderCloseIcon,
  isActive,
  isCollapsible,
  ...rest
}: HeaderMenuButtonProps) {
  const prefix = usePrefix();
  const className = cx({
    ...(typeof customClassName === 'string' && {
      [customClassName]: !!customClassName,
    }),
    [`${prefix}--header__action`]: true,
    [`${prefix}--header__menu-trigger`]: true,
    [`${prefix}--header__action--active`]: isActive,
    [`${prefix}--header__menu-toggle`]: true,
    [`${prefix}--header__menu-toggle__hidden`]: !isCollapsible,
  });
  const menuIcon = renderMenuIcon ? renderMenuIcon : <Menu size={20} />;
  const closeIcon = renderCloseIcon ? renderCloseIcon : <Close size={20} />;

  return (
    <button
      {...rest}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={className}
      title={ariaLabel}
      type="button">
      {isActive ? closeIcon : menuIcon}
    </button>
  );
}

HeaderMenuButton.propTypes = {
  /**
   * Required props for accessibility label on the underlying menu button
   */
  ...AriaLabelPropType,

  /**
   * Optionally provide a custom class name that is applied to the underlying
   * button
   */
  className: PropTypes.string,

  /**
   * Specify whether the menu button is "active".
   */
  isActive: PropTypes.bool,

  /**
   * Specify whether the menu button is collapsible.
   */
  isCollapsible: PropTypes.bool,

  /**
   * Optionally provide an onClick handler that is called when the underlying
   * button fires it's onclick event
   */
  onClick: PropTypes.func,
};



File: UIShell/HeaderContainer.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { keys, match } from '../../internal/keyboard';
import { useWindowEvent } from '../../internal/useEvent';

export interface HeaderContainerRenderProps {
  isSideNavExpanded: boolean;
  onClickSideNavExpand: () => void;
}

export type HeaderContainerProps<P extends HeaderContainerRenderProps> = {
  isSideNavExpanded?: boolean;
  render: React.ComponentType<P>;
} & { [K in keyof Omit<P, keyof HeaderContainerRenderProps>]: P[K] };

export default function HeaderContainer<P extends HeaderContainerRenderProps>({
  render: Children,
  isSideNavExpanded = false,
  ...rest
}: HeaderContainerProps<P>) {
  //state for expandable sidenav
  const [isSideNavExpandedState, setIsSideNavExpandedState] =
    useState(isSideNavExpanded);

  useWindowEvent('keydown', (event) => {
    if (match(event, keys.Escape)) {
      setIsSideNavExpandedState(false);
    }
  });

  const handleHeaderMenuButtonClick = useCallback(() => {
    setIsSideNavExpandedState(
      (prevIsSideNavExpanded) => !prevIsSideNavExpanded
    );
  }, [setIsSideNavExpandedState]);

  return (
    <Children
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      {...(rest as any)}
      isSideNavExpanded={isSideNavExpandedState}
      onClickSideNavExpand={handleHeaderMenuButtonClick}
    />
  );
}

HeaderContainer.propTypes = {
  /**
   * Optionally provide a custom class name that is applied to the underlying <header>
   */
  isSideNavExpanded: PropTypes.bool,

  /**
   * A function or a component that is invoked with `isSideNavExpanded` and `onClickSideNavExpand`.
   * The function or component can then use those properties to within the components it
   * returns, such as with the HeaderMenuButton and SideNav components. Additional props will also be passed
   * into this component for convenience.
   */
  render: PropTypes.elementType.isRequired,
};



File: UIShell/Link.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { WeakValidationMap } from 'prop-types';
import React, { ForwardedRef, JSX, type ElementType } from 'react';
import { deprecate } from '../../prop-types/deprecate';
import { PolymorphicProps } from '../../types/common';

export interface LinkBaseProps {
  /**
   * @deprecated Use `as` instead
   */
  element?: ElementType | undefined;
  as?: ElementType | undefined;
  isSideNavExpanded?: boolean | undefined;
}

export type LinkProps<E extends ElementType = 'a'> = PolymorphicProps<
  E,
  LinkBaseProps
>;

export interface LinkComponent {
  <E extends ElementType = 'a'>(props: LinkProps<E>): JSX.Element | null;
  displayName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  propTypes?: WeakValidationMap<LinkProps<any>>;
}

// First define the component without generics
type LinkPropsWithoutRef = Omit<LinkProps<'a'>, 'ref'>;

const LinkBase = (
  {
    element,
    as: BaseComponent,
    // Captured here to prevent it from being passed into the created element.
    // See https://github.com/carbon-design-system/carbon/issues/3970
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
    isSideNavExpanded: _isSideNavExpanded,
    ...rest
  }: LinkPropsWithoutRef,
  ref: ForwardedRef<HTMLAnchorElement>
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  const BaseComponentAsAny = (BaseComponent ?? element ?? 'a') as any;
  return <BaseComponentAsAny ref={ref} {...rest} />;
};

// Use forwardRef with the non-generic function
const Link = React.forwardRef(LinkBase) as unknown as LinkComponent;

/**
 * Link is a custom component that allows us to supporting rendering elements
 * other than `a` in our markup. The goal is to allow users to support passing
 * in their own components to support use-cases like `react-router` or
 * `@reach/router`
 */

const LinkPropTypes = {
  /**
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: PropTypes.elementType,

  /**
   * The base element to use to build the link. Defaults to `a`, can also accept
   * alternative tag names or custom components like `Link` from `react-router`.
   * @deprecated Use `as` instead
   *
   */
  element: deprecate(
    PropTypes.elementType,
    'The `element` prop for `Link` has been deprecated. Please use `as` ' +
      'instead. This will be removed in the next major release.'
  ),

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded: PropTypes.bool,
};

Link.displayName = 'Link';
Link.propTypes = LinkPropTypes;

export { LinkPropTypes };
export default Link;



File: UIShell/SideNavDivider.tsx


/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';

interface SideNavDividerProps {
  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;
}
const SideNavDivider: React.FC<SideNavDividerProps> = ({ className }) => {
  const prefix = usePrefix();
  const classNames = cx(`${prefix}--side-nav__divider`, className);
  return (
    <li className={classNames}>
      <hr />
    </li>
  );
};

SideNavDivider.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,
};

export default SideNavDivider;



File: UIShell/Switcher.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useRef,
  type ComponentProps,
  type ReactNode,
} from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { useMergedRefs } from '../../internal/useMergedRefs';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import SwitcherItem from './SwitcherItem';
import SwitcherDivider from './SwitcherDivider';

export interface BaseSwitcherProps {
  /**
   * expects to receive <SwitcherItem />
   */
  children: ReactNode;
  /**
   * Optionally provide a custom class to apply to the underlying `<ul>` node
   */
  className?: string;
  /**
   * Specify whether the panel is expanded
   */
  expanded?: boolean;
}

interface SwitcherWithAriaLabel extends BaseSwitcherProps {
  'aria-label': string;
  'aria-labelledby'?: never;
}

interface SwitcherWithAriaLabelledBy extends BaseSwitcherProps {
  'aria-label'?: never;
  'aria-labelledby': string;
}

type SwitcherProps = SwitcherWithAriaLabel | SwitcherWithAriaLabelledBy;

const Switcher = forwardRef<HTMLUListElement, SwitcherProps>(
  (props, forwardRef) => {
    const switcherRef = useRef<HTMLUListElement>(null);
    const ref = useMergedRefs([switcherRef, forwardRef]);

    const prefix = usePrefix();
    const {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      className: customClassName,
      children,
      expanded,
    } = props;

    const accessibilityLabel = {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    };

    const className = cx(`${prefix}--switcher`, {
      [customClassName || '']: !!customClassName,
    });

    const handleSwitcherItemFocus = ({
      currentIndex,
      direction,
    }: {
      currentIndex: number;
      direction: number;
    }) => {
      const enabledIndices = Children.toArray(children).reduce<number[]>(
        (acc, child, i) => {
          if (
            isValidElement<ComponentProps<typeof SwitcherItem>>(child) &&
            child.type === SwitcherItem &&
            Object.keys(child.props).length
          ) {
            acc.push(i);
          }
          return acc;
        },
        []
      );

      const nextValidIndex = (() => {
        const nextIndex = enabledIndices.indexOf(currentIndex) + direction;

        switch (enabledIndices[nextIndex]) {
          case undefined:
            if (direction === -1) {
              return enabledIndices[enabledIndices.length - 1];
            }
            return enabledIndices[0];
          case 0:
            if (direction === 1) {
              return enabledIndices[1];
            }
          // eslint-disable-next-line   no-fallthrough -- https://github.com/carbon-design-system/carbon/issues/20452
          default:
            return enabledIndices[nextIndex];
        }
      })();

      const switcherItem = switcherRef.current?.children[nextValidIndex]
        ?.children[0] as HTMLElement;
      if (switcherItem) {
        switcherItem.focus();
      }
    };

    const childrenWithProps = Children.toArray(children).map((child, index) => {
      if (
        isValidElement<ComponentProps<typeof SwitcherItem>>(child) &&
        child.type === SwitcherItem
      ) {
        return cloneElement(child, {
          handleSwitcherItemFocus,
          index,
          key: index,
          expanded,
        });
      }

      if (
        isValidElement<ComponentProps<typeof SwitcherDivider>>(child) &&
        child.type === SwitcherDivider
      ) {
        return cloneElement(child, {
          key: index,
        });
      }

      return child;
    });

    return (
      <ul ref={ref} className={className} {...accessibilityLabel}>
        {childrenWithProps}
      </ul>
    );
  }
);

Switcher.displayName = 'Switcher';
Switcher.propTypes = {
  /**
   * Required props for accessibility label on the underlying menu
   */
  ...AriaLabelPropType,

  /**
   * expects to receive <SwitcherItem />
   */
  children: PropTypes.node.isRequired,

  /**
   * Optionally provide a custom class to apply to the underlying `<ul>` node
   */
  className: PropTypes.string,

  /**
   * Specify whether the panel is expanded
   */
  expanded: PropTypes.bool,
};

export default Switcher;



File: UIShell/SideNavSwitcher.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChevronDown } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { type ChangeEventHandler, forwardRef } from 'react';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';

export interface SideNavSwitcherProps {
  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;

  /**
   * Provide the label for the switcher. This will be the first visible option
   * when someone views this control
   */
  labelText: string;

  /**
   * Provide a callback function that is called whenever the switcher value is
   * updated
   */
  onChange?: ChangeEventHandler<HTMLSelectElement>;

  /**
   * Provide an array of options to be rendered in the switcher as an
   * `<option>`. The text value will be what is displayed to the user and is set
   * as the `value` prop for each `<option>`.
   */
  options: string[];
}

const SideNavSwitcher = forwardRef<HTMLSelectElement, SideNavSwitcherProps>(
  (props, ref) => {
    const id = useId('side-nav-switcher');
    const prefix = usePrefix();
    const { className: customClassName, labelText, onChange, options } = props;
    const className = cx(`${prefix}--side-nav__switcher`, customClassName);

    // Note for usage around `onBlur`: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-onchange.md
    return (
      <div className={className}>
        <label htmlFor={id} className={`${prefix}--assistive-text`}>
          {labelText}
        </label>
        <select
          id={id}
          className={`${prefix}--side-nav__select`}
          defaultValue=""
          onBlur={onChange}
          onChange={onChange}
          ref={ref}>
          <option
            className={`${prefix}--side-nav__option`}
            disabled
            hidden
            value="">
            {labelText}
          </option>
          {options.map((option) => (
            <option
              key={option}
              className={`${prefix}--side-nav__option`}
              value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className={`${prefix}--side-nav__switcher-chevron`}>
          <ChevronDown size={20} />
        </div>
      </div>
    );
  }
);

SideNavSwitcher.displayName = 'SideNavSwitcher';
SideNavSwitcher.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Provide the label for the switcher. This will be the first visible option
   * when someone views this control
   */
  labelText: PropTypes.string.isRequired,

  /**
   * Provide a callback function that is called whenever the switcher value is
   * updated
   */
  onChange: PropTypes.func,

  /**
   * Provide an array of options to be rendered in the switcher as an
   * `<option>`. The text value will be what is displayed to the user and is set
   * as the `value` prop for each `<option>`.
   */
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SideNavSwitcher;



File: UIShell/SwitcherItem.tsx


/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  ElementType,
  ForwardedRef,
  forwardRef,
  HTMLAttributeAnchorTarget,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Link from './Link';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';

export interface BaseSwitcherItemProps {
  /**
   * Specify the text content for the link
   */
  children: React.ReactNode;
  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className?: string;
  /**
   * event handlers
   */
  handleSwitcherItemFocus?: (event: {
    currentIndex: number;
    direction: number;
  }) => void;
  /**
   * Specify the index of the SwitcherItem
   */
  index?: number;
  /**
   * event handlers
   */
  onKeyDown?: (event: KeyboardEvent) => void;
  /**
   * event handlers
   */
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  /**
   * Specify the tab index of the Link
   */
  tabIndex?: number;
  /**
   * Specify whether the panel is expanded
   */
  expanded?: boolean;
  /**
   * Specify whether the panel is selected
   */
  isSelected?: boolean;
  /**
   * Optionally provide an href for the underlying li`
   */
  href?: string;
  /**
   * Specify where to open the link.
   */
  target?: HTMLAttributeAnchorTarget;
  /**
   * The rel property for the link.
   */
  rel?: string;
}

export interface SwitcherItemWithAriaLabel extends BaseSwitcherItemProps {
  'aria-label': string;
  'aria-labelledby'?: never;
}

export interface SwitcherItemWithAriaLabelledBy extends BaseSwitcherItemProps {
  'aria-label'?: never;
  'aria-labelledby': string;
}

export type SwitcherItemProps =
  | SwitcherItemWithAriaLabel
  | SwitcherItemWithAriaLabelledBy;

const SwitcherItem = forwardRef<ElementType, SwitcherItemProps>(
  (props, forwardRef) => {
    const {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      className: customClassName,
      children,
      isSelected,
      expanded,
      tabIndex = expanded ? 0 : -1,
      index,
      handleSwitcherItemFocus,
      onKeyDown = () => {},
      href,
      target,
      rel,
      ...rest
    } = props;

    const prefix = usePrefix();
    const classNames = cx(`${prefix}--switcher__item`, {
      [customClassName || '']: !!customClassName,
    });

    const accessibilityLabel = {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    };

    const linkClassName = cx(`${prefix}--switcher__item-link`, {
      [`${prefix}--switcher__item-link--selected`]: isSelected,
    });

    function setTabFocus(evt: KeyboardEvent) {
      if (match(evt, keys.ArrowDown)) {
        evt.preventDefault();
        handleSwitcherItemFocus?.({
          currentIndex: index || -1,
          direction: 1,
        });
      }
      if (match(evt, keys.ArrowUp)) {
        evt.preventDefault();
        handleSwitcherItemFocus?.({
          currentIndex: index || -1,
          direction: -1,
        });
      }
    }

    return (
      <li className={classNames}>
        <Link
          onKeyDown={(evt: KeyboardEvent<HTMLAnchorElement>) => {
            setTabFocus(evt);
            onKeyDown(evt);
          }}
          href={href}
          target={target}
          rel={rel}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
          ref={forwardRef as ForwardedRef<HTMLAnchorElement | any>}
          {...rest}
          className={linkClassName}
          tabIndex={tabIndex}
          {...accessibilityLabel}>
          {children}
        </Link>
      </li>
    );
  }
);

SwitcherItem.displayName = 'SwitcherItem';
SwitcherItem.propTypes = {
  ...AriaLabelPropType,
  /**
   * Specify the text content for the link
   */
  children: PropTypes.node.isRequired,
  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,
  /**
   * event handlers
   */
  handleSwitcherItemFocus: PropTypes.func,
  /**
   * Optionally provide an href for the underlying li`
   */
  href: PropTypes.string,
  /**
   * Specify the index of the SwitcherItem
   */
  index: PropTypes.number,
  /**
   * event handlers
   */
  onClick: PropTypes.func,
  /**
   * event handlers
   */
  onKeyDown: PropTypes.func,
  /**
   * Specify the tab index of the Link
   */
  tabIndex: PropTypes.number,
  /**
   * Specify where to open the link.
   */
  target: PropTypes.string,
  /**
   * The rel property for the link.
   */
  rel: PropTypes.string,
};

export default SwitcherItem;



File: UIShell/SideNavFooter.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Close, ChevronRight } from '@carbon/icons-react';

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';

export interface SideNavFooterProps {
  /**
   * Provide text to be read to screen readers and shown as a tooltip when
   * interacting with the toggle button in the footer
   */
  assistiveText: string;

  className?: string;

  /**
   * Specify whether the side navigation is expanded or collapsed
   */
  expanded: boolean;

  /**
   * Provide a function that is called when the toggle button is interacted
   * with. Useful for controlling the expansion state of the side navigation.
   */
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * SideNavFooter is used for rendering the button at the bottom of the side
 * navigation that is a part of the UI Shell. It is responsible for handling the
 * user interaction to expand or collapse the side navigation.
 */
function SideNavFooter({
  assistiveText = 'Toggle opening or closing the side navigation',
  className: customClassName,
  expanded,
  onToggle,
}: SideNavFooterProps) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--side-nav__footer`, customClassName);
  return (
    <footer className={className}>
      <button
        className={`${prefix}--side-nav__toggle`}
        type="button"
        onClick={(evt) => onToggle(evt)}
        title={assistiveText}>
        <div className={`${prefix}--side-nav__icon`}>
          {expanded ? <Close size={20} /> : <ChevronRight size={20} />}
        </div>
        <span className={`${prefix}--assistive-text`}>{assistiveText}</span>
      </button>
    </footer>
  );
}

SideNavFooter.displayName = 'SideNavFooter';
SideNavFooter.propTypes = {
  /**
   * Provide text to be read to screen readers and shown as a tooltip when
   * interacting with the toggle button in the footer
   */
  assistiveText: PropTypes.string,

  className: PropTypes.string,

  /**
   * Specify whether the side navigation is expanded or collapsed
   */
  expanded: PropTypes.bool.isRequired,

  /**
   * Provide a function that is called when the toggle button is interacted
   * with. Useful for controlling the expansion state of the side navigation.
   */
  onToggle: PropTypes.func.isRequired,
};

export default SideNavFooter;



File: UIShell/SwitcherDivider.tsx


/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';

export interface SwitcherDividerProps {
  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className?: string;
}

const SwitcherDivider: React.FC<SwitcherDividerProps> = ({
  className: customClassName,
  ...other
}) => {
  const prefix = usePrefix();
  const classNames = cx(`${prefix}--switcher__item--divider`, {
    [customClassName || '']: !!customClassName,
  });

  return <hr {...other} className={classNames} />;
};

SwitcherDivider.propTypes = {
  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,
};

export default SwitcherDivider;



File: UIShell/SideNavMenu.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChevronDown } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  ForwardedRef,
  ReactNode,
  Ref,
  useContext,
  useState,
} from 'react';
import SideNavIcon from './SideNavIcon';
import { keys, match } from '../../internal/keyboard';
import { usePrefix } from '../../internal/usePrefix';
import { SideNavContext } from './SideNav';

export interface SideNavMenuProps {
  /**
   * An optional CSS class to apply to the component.
   */
  className?: string;

  /**
   * The content to render within the SideNavMenu component.
   */
  children?: React.ReactNode;

  /**
   * Specifies whether the menu should be expanded by default.
   */
  defaultExpanded?: boolean;

  /**
   * Indicates whether the SideNavMenu is active.
   */
  isActive?: boolean;

  /**
   * Specifies whether the SideNavMenu is in a large variation.
   */
  large?: boolean;

  /**
   * A component used to render an icon.
   */
  renderIcon?: React.ComponentType;

  /**
   * Indicates if the side navigation container is expanded or collapsed.
   */
  isSideNavExpanded?: boolean;

  /**
   * The tabIndex for the button element.
   * If not specified, the default validation will be applied.
   */
  tabIndex?: number;

  // The title for the overall menu name.

  title: string;
}

const SideNavMenu = React.forwardRef<HTMLElement, SideNavMenuProps>(
  (
    {
      className: customClassName,
      children,
      defaultExpanded = false,
      isActive = false,
      large = false,
      renderIcon: IconElement,
      isSideNavExpanded,
      tabIndex,
      title,
    },
    ref: ForwardedRef<HTMLElement>
  ) => {
    const { isRail } = useContext(SideNavContext);
    const prefix = usePrefix();
    const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
    const [prevExpanded, setPrevExpanded] = useState<boolean>(defaultExpanded);
    const className = cx({
      [`${prefix}--side-nav__item`]: true,
      [`${prefix}--side-nav__item--active`]:
        isActive || (hasActiveDescendant(children) && !isExpanded),
      [`${prefix}--side-nav__item--icon`]: IconElement,
      [`${prefix}--side-nav__item--large`]: large,
      [customClassName as string]: !!customClassName,
    });

    if (!isSideNavExpanded && isExpanded && isRail) {
      setIsExpanded(false);
      setPrevExpanded(true);
    } else if (isSideNavExpanded && prevExpanded && isRail) {
      setIsExpanded(true);
      setPrevExpanded(false);
    }

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <li
        className={className}
        onKeyDown={(event) => {
          if (match(event, keys.Escape)) {
            setIsExpanded(false);
          }
        }}>
        <button
          aria-expanded={isExpanded}
          className={`${prefix}--side-nav__submenu`}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          ref={ref as Ref<HTMLButtonElement>}
          type="button"
          tabIndex={
            tabIndex === undefined
              ? !isSideNavExpanded && !isRail
                ? -1
                : 0
              : tabIndex
          }>
          {IconElement && (
            <SideNavIcon>
              <IconElement />
            </SideNavIcon>
          )}
          <span className={`${prefix}--side-nav__submenu-title`}>{title}</span>
          <SideNavIcon className={`${prefix}--side-nav__submenu-chevron`} small>
            <ChevronDown size={20} />
          </SideNavIcon>
        </button>
        <ul className={`${prefix}--side-nav__menu`}>{children}</ul>
      </li>
    );
  }
);
SideNavMenu.displayName = 'SideNavMenu';

SideNavMenu.propTypes = {
  /**
   * Provide <SideNavMenuItem>'s inside of the `SideNavMenu`
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify whether the menu should default to expanded. By default, it will
   * be closed.
   */
  defaultExpanded: PropTypes.bool,

  /**
   * Specify whether the `SideNavMenu` is "active". `SideNavMenu` should be
   * considered active if one of its menu items are a link for the current
   * page.
   */
  isActive: PropTypes.bool,

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded: PropTypes.bool,

  /**
   * Specify if this is a large variation of the SideNavMenu
   */
  large: PropTypes.bool,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Optional prop to specify the tabIndex of the button. If undefined, it will be applied default validation
   */
  tabIndex: PropTypes.number,

  /**
   * Provide the text for the overall menu name
   */
  title: PropTypes.string.isRequired,
};

/**
Defining the children parameter with the type ReactNode | ReactNode[]. This allows for various possibilities:
a single element, an array of elements, or null or undefined.
**/
function hasActiveDescendant(children: ReactNode | ReactNode[]): boolean {
  if (Array.isArray(children)) {
    return children.some((child) => {
      if (!React.isValidElement(child)) {
        return false;
      }

      /** Explicitly defining the expected prop types (isActive and 'aria-current) for the children to ensure type
  safety when accessing their props.
  **/
      const props = child.props as {
        isActive?: boolean;
        'aria-current'?: string;
        children: ReactNode | ReactNode[];
      };

      if (
        props.isActive === true ||
        props['aria-current'] ||
        (props.children instanceof Array && hasActiveDescendant(props.children))
      ) {
        return true;
      }

      return false;
    });
  }

  // We use React.isValidElement(child) to check if the child is a valid React element before accessing its props

  if (React.isValidElement(children)) {
    const props = children.props as {
      isActive?: boolean;
      'aria-current'?: string;
    };

    if (props.isActive === true || props['aria-current']) {
      return true;
    }
  }

  return false;
}

export default SideNavMenu;
export { SideNavMenu };



File: UIShell/UIShell.SideNav.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from 'storybook/actions';
import cx from 'classnames';
import {
  Content,
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
  HeaderSideNavItems,
  SkipToContent,
  SideNav,
  SideNavDivider,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  Switcher,
  SwitcherItem,
  SwitcherDivider,
} from '.';
import { HeaderMenu as HeaderMenuNative } from './HeaderMenu';
import Modal from '../Modal';
import Button from '../Button';
import {
  Search,
  Notification,
  Fade,
  Switcher as SwitcherIcon,
} from '@carbon/icons-react';
import mdx from './UIShell.mdx';

/* eslint-disable react/prop-types */
const StoryContent = ({ useResponsiveOffset = true }) => {
  const [open, setOpen] = useState(false);
  const classNameFirstColumn = cx({
    'cds--col-lg-13': true,
    'cds--offset-lg-3': useResponsiveOffset,
  });
  const content = (
    <div className="cds--grid">
      <div className="cds--row">
        <div className={classNameFirstColumn}>
          <h2 style={{ margin: '0 0 30px' }}>Purpose and function</h2>
          <p>
            The shell is perhaps the most crucial piece of any UI built with
            <a href="www.carbondesignsystem.com"> Carbon</a>. It contains the
            shared navigation framework for the entire design system and ties
            the products in IBM’s portfolio together in a cohesive and elegant
            way. The shell is the home of the topmost navigation, where users
            can quickly and dependably gain their bearings and move between
            pages.
            <br />
            <br />
            The shell was designed with maximum flexibility built in, to serve
            the needs of a broad range of products and users. Adopting the shell
            ensures compliance with IBM design standards, simplifies development
            efforts, and provides great user experiences. All IBM products built
            with Carbon are required to use the shell’s header.
            <br />
            <br />
            To better understand the purpose and function of the UI shell,
            consider the “shell” of MacOS, which contains the Apple menu,
            top-level navigation, and universal, OS-level controls at the top of
            the screen, as well as a universal dock along the bottom or side of
            the screen. The Carbon UI shell is roughly analogous in function to
            these parts of the Mac UI. For example, the app switcher portion of
            the shell can be compared to the dock in MacOS.
          </p>
          <h2 style={{ margin: '30px 0' }}>Header responsive behavior</h2>
          <p>
            As a header scales down to fit smaller screen sizes, headers with
            persistent side nav menus should have the side nav collapse into
            “hamburger” menu. See the example to better understand responsive
            behavior of the header.
          </p>
          <h2 style={{ margin: '30px 0' }}>Secondary navigation</h2>
          <p>
            The side-nav contains secondary navigation and fits below the
            header. It can be configured to be either fixed-width or flexible,
            with only one level of nested items allowed. Both links and category
            lists can be used in the side-nav and may be mixed together. There
            are several configurations of the side-nav, but only one
            configuration should be used per product section. If tabs are needed
            on a page when using a side-nav, then the tabs are secondary in
            hierarchy to the side-nav.
          </p>
          <Button onClick={() => setOpen(true)}>Launch modal</Button>
          <Modal
            modalHeading="Add a custom domain"
            modalLabel="Account resources"
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            open={open}
            onRequestClose={() => setOpen(false)}>
            <p style={{ marginBottom: '1rem' }}>
              Custom domains direct requests for your apps in this Cloud Foundry
              organization to a URL that you own. A custom domain can be a
              shared domain, a shared subdomain, or a shared domain and host.
            </p>
          </Modal>
        </div>
      </div>
    </div>
  );
  const style = {
    height: '100%',
  };
  if (useResponsiveOffset) {
    style.margin = '0';
    style.width = '100%';
  }
  return (
    <Content id="main-content" style={style}>
      {content}
    </Content>
  );
};

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/UI Shell/SideNav',
  component: Header,
  subcomponents: {
    Content,
    HeaderMenuButton,
    HeaderName,
    HeaderNavigation,
    HeaderMenu: HeaderMenuNative,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderPanel,
    HeaderSideNavItems,
    SkipToContent,
    SideNav,
    SideNavItems,
    SideNavDivider,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
    Switcher,
    SwitcherItem,
    SwitcherDivider,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      hideNoControlsWarning: true,
    },
  },
};

export const FixedSideNav = () => (
  <>
    <Header aria-label="IBM Platform Name">
      <SkipToContent />
      <HeaderName href="#" prefix="IBM">
        [Platform]
      </HeaderName>
    </Header>
    <SideNav
      isFixedNav
      expanded={true}
      isChildOfHeader={false}
      aria-label="Side navigation">
      <SideNavItems>
        <SideNavMenu title="L0 menu">
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu title="L0 menu" isActive={true}>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem
            aria-current="page"
            href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu title="L0 menu">
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavLink href="https://www.carbondesignsystem.com/">
          L0 link
        </SideNavLink>
        <SideNavLink href="https://www.carbondesignsystem.com/">
          L0 link
        </SideNavLink>
      </SideNavItems>
    </SideNav>
    <StoryContent useResponsiveOffset={false} />
  </>
);

FixedSideNav.storyName = 'Fixed SideNav';

export const FixedSideNavWIcons = () => (
  <>
    <Header aria-label="IBM Platform Name">
      <SkipToContent />
      <HeaderName href="#" prefix="IBM">
        [Platform]
      </HeaderName>
    </Header>
    <SideNav
      isFixedNav
      expanded={true}
      isChildOfHeader={false}
      aria-label="Side navigation">
      <SideNavItems>
        <SideNavMenu renderIcon={Fade} title="Category title">
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Link
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Link
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Link
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu renderIcon={Fade} title="Category title" isActive={true}>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Link
          </SideNavMenuItem>
          <SideNavMenuItem
            aria-current="page"
            href="https://www.carbondesignsystem.com/">
            Link
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Link
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu renderIcon={Fade} title="Category title">
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Link
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Link
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Link
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavLink
          renderIcon={Fade}
          href="https://www.carbondesignsystem.com/">
          Link
        </SideNavLink>
        <SideNavLink
          renderIcon={Fade}
          href="https://www.carbondesignsystem.com/">
          Link
        </SideNavLink>
      </SideNavItems>
    </SideNav>
    <StoryContent useResponsiveOffset={false} />
  </>
);

FixedSideNavWIcons.storyName = 'Fixed SideNav w/ Icons';

export const FixedSideNavWDivider = () => (
  <>
    <Header aria-label="IBM Platform Name">
      <SkipToContent />
      <HeaderName href="#" prefix="IBM">
        [Platform]
      </HeaderName>
    </Header>
    <SideNav
      isFixedNav
      expanded={true}
      isChildOfHeader={false}
      aria-label="Side navigation">
      <SideNavItems>
        <SideNavMenu title="L0 menu">
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu title="L0 menu" isActive={true}>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem
            aria-current="page"
            href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu title="L0 menu">
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            L0 menu item
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavDivider />
        <SideNavLink href="https://www.carbondesignsystem.com/">
          L0 link
        </SideNavLink>
        <SideNavLink href="https://www.carbondesignsystem.com/">
          L0 link
        </SideNavLink>
      </SideNavItems>
    </SideNav>
    <StoryContent useResponsiveOffset={false} />
  </>
);

FixedSideNavWDivider.storyName = 'Fixed SideNav w/ Divider';

export const SideNavRailWHeader = (args) => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
          />
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <HeaderNavigation aria-label="IBM [Platform]">
            <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
            <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
              <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
            </HeaderMenu>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Search"
              onClick={action('search click')}>
              <Search size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Notifications"
              onClick={action('notification click')}>
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="App Switcher"
              onClick={action('app-switcher click')}
              tooltipAlignment="end">
              <SwitcherIcon size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            onOverlayClick={onClickSideNavExpand}
            href="#main-content"
            onSideNavBlur={onClickSideNavExpand}
            isRail
            {...args}>
            <SideNavItems>
              {isSideNavExpanded && (
                <HeaderSideNavItems hasDivider={true}>
                  <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                  <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                  <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                  <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                    <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                    <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                    <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                  </HeaderMenu>
                </HeaderSideNavItems>
              )}
              <SideNavMenu renderIcon={Fade} title="Category title">
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Fade} title="Category title">
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem
                  aria-current="page"
                  href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Fade} title="Category title">
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavLink
                renderIcon={Fade}
                href="https://www.carbondesignsystem.com/">
                Link
              </SideNavLink>
              <SideNavLink
                renderIcon={Fade}
                href="https://www.carbondesignsystem.com/">
                Link
              </SideNavLink>
            </SideNavItems>
          </SideNav>
        </Header>
        <StoryContent />
      </>
    )}
  />
);

SideNavRailWHeader.argTypes = {
  isRail: {
    control: {
      type: 'boolean',
    },
    defaultValue: true,
    table: {
      defaultValue: { summary: true },
    },
    description:
      "Optional prop to display the side nav rail. It doesn't work along side with `isFixedNav` prop.",
  },
  isFixedNav: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
    table: {
      defaultValue: { summary: false },
    },
    description:
      "Optional prop to set a fixed side nav. It doesn't work along side with `isRail` prop.",
  },
  enterDelayMs: {
    control: {
      type: 'number',
    },
    table: {
      defaultValue: { summary: 100 },
    },
    defaultValue: 100,
    description:
      'Specify the duration in milliseconds to delay before displaying the sidenav',
  },
};

SideNavRailWHeader.storyName = 'SideNav Rail w/Header';

export const SideNavWLargeSideNavItems = () => (
  <>
    <Header aria-label="IBM Platform Name">
      <SkipToContent />
      <HeaderName href="#" prefix="IBM">
        [Platform]
      </HeaderName>
    </Header>
    <SideNav
      expanded={true}
      isChildOfHeader={false}
      aria-label="Side navigation">
      <SideNavItems>
        <SideNavMenu title="Large menu" large>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Menu 1
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Menu 2
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Menu 3
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavLink href="https://www.carbondesignsystem.com/" large>
          Large link
        </SideNavLink>
        <SideNavMenu renderIcon={Fade} title="Large menu w/icon" large>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Menu 1
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Menu 2
          </SideNavMenuItem>
          <SideNavMenuItem href="https://www.carbondesignsystem.com/">
            Menu 3
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavLink
          renderIcon={Fade}
          href="https://www.carbondesignsystem.com/"
          large>
          Large link w/icon
        </SideNavLink>
      </SideNavItems>
    </SideNav>
    <StoryContent />
  </>
);

SideNavWLargeSideNavItems.storyName = 'SideNav w/ large side nav items';



File: UIShell/SideNavDetails.tsx


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

export interface SideNavDetailsProps {
  children?: React.ReactNode;
  className?: string;
  title: string;
}

const SideNavDetails = ({
  children,
  className: customClassName,
  title,
  ...rest
}: SideNavDetailsProps) => {
  const prefix = usePrefix();
  const className = cx(`${prefix}--side-nav__details`, customClassName);
  return (
    <div className={className} {...rest}>
      <h2 className={`${prefix}--side-nav__title`} title={title}>
        {title}
      </h2>
      {children}
    </div>
  );
};

SideNavDetails.propTypes = {
  /**
   * Provide optional children to render in `SideNavDetails`. Useful for
   * rendering the `SideNavSwitcher` component.
   */
  children: PropTypes.node,

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,

  /**
   * Provide the text that will be rendered as the title in the component
   */
  title: PropTypes.string.isRequired,
};

export default SideNavDetails;



File: UIShell/HeaderGlobalAction.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import Button from '../Button';
import { usePrefix } from '../../internal/usePrefix';

export interface HeaderGlobalActionProps {
  /**
   * Required props for the accessibility label of the button
   */
  'aria-label'?: string;

  /**
   * Required props for the accessibility label of the button
   */
  'aria-labelledby'?: string;

  /**
   * Provide a custom icon for this global action
   */
  children: ReactNode;

  /**
   * Optionally provide a custom class name that is applied to the underlying
   * button
   */
  className?: string;

  /**
   * Specify whether the action is currently active
   */
  isActive?: boolean;

  /**
   * Optionally provide an onClick handler that is called when the underlying
   * button fires it's onclick event
   */
  onClick?: () => void;

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment?: 'start' | 'center' | 'end';

  /**
   * Enable drop shadow for tooltips for icon-only buttons.
   */
  tooltipDropShadow?: boolean;

  /**
   * Render the tooltip using the high-contrast theme
   * Default is true
   */
  tooltipHighContrast?: boolean;
}

/**
 * HeaderGlobalAction is used as a part of the `HeaderGlobalBar`. It is
 * essentially an Icon Button with an additional state to indicate whether it is
 * "active". The active state comes from when a user clicks on the global action
 * which should trigger a panel to appear.
 *
 * Note: children passed to this component should be an Icon.
 */
const HeaderGlobalAction: React.FC<HeaderGlobalActionProps> = React.forwardRef(
  (
    {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      children,
      className: customClassName,
      onClick,
      tooltipHighContrast = true,
      tooltipDropShadow,
      isActive,
      tooltipAlignment,
      ...rest
    },
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const prefix = usePrefix();
    const className = cx({
      [customClassName as string]: !!customClassName,
      [`${prefix}--header__action`]: true,
      [`${prefix}--header__action--active`]: isActive,
    });
    const accessibilityLabel = {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    };
    return (
      <Button
        {...rest}
        {...accessibilityLabel}
        className={className}
        onClick={onClick}
        type="button"
        hasIconOnly
        size="lg"
        kind="ghost"
        iconDescription={ariaLabel}
        tooltipPosition="bottom"
        tooltipAlignment={tooltipAlignment}
        tooltipDropShadow={tooltipDropShadow}
        tooltipHighContrast={tooltipHighContrast}
        ref={ref}>
        {children}
      </Button>
    );
  }
);

HeaderGlobalAction.propTypes = {
  /**
   * Required props for the accessibility label of the button
   */
  ...AriaLabelPropType,

  /**
   * Provide a custom icon for this global action
   */
  children: PropTypes.node.isRequired,

  /**
   * Optionally provide a custom class name that is applied to the underlying
   * button
   */
  className: PropTypes.string,

  /**
   * Specify whether the action is currently active
   */
  isActive: PropTypes.bool,

  /**
   * Optionally provide an onClick handler that is called when the underlying
   * button fires it's onclick event
   */
  onClick: PropTypes.func,

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * Enable drop shadow for tooltips for icon-only buttons.
   */
  tooltipDropShadow: PropTypes.bool,

  /**
   * Render the tooltip using the high-contrast theme
   * Default is true
   */
  tooltipHighContrast: PropTypes.bool,
};

HeaderGlobalAction.displayName = 'HeaderGlobalAction';

export default HeaderGlobalAction;



File: UIShell/SideNavLinkText.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { ReactNode } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import PropTypes from 'prop-types';

export interface SideNavLinkTextProps {
  children: ReactNode;
  className?: string;
}

function SideNavLinkText({
  className: customClassName,
  children,
  ...rest
}: SideNavLinkTextProps) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--side-nav__link-text`, customClassName);
  return (
    <span {...rest} className={className}>
      {children}
    </span>
  );
}

SideNavLinkText.propTypes = {
  /**
   * Provide the content for the link text
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,
};

export default SideNavLinkText;



File: UIShell/index.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { default as Content } from './Content';

export { default as Header } from './Header';
export {
  default as HeaderContainer,
  type HeaderContainerProps,
} from './HeaderContainer';
export { default as HeaderGlobalAction } from './HeaderGlobalAction';
export { default as HeaderGlobalBar } from './HeaderGlobalBar';
export { default as HeaderMenu } from './HeaderMenu';
export {
  default as HeaderMenuButton,
  type HeaderMenuButtonProps,
} from './HeaderMenuButton';
export {
  default as HeaderMenuItem,
  type HeaderMenuItemProps,
} from './HeaderMenuItem';
export { default as HeaderName, type HeaderNameProps } from './HeaderName';
export {
  default as HeaderNavigation,
  type HeaderNavigationProps,
} from './HeaderNavigation';
export { default as HeaderPanel } from './HeaderPanel';
export {
  default as HeaderSideNavItems,
  type HeaderSideNavItemsProps,
} from './HeaderSideNavItems';
export { default as Switcher } from './Switcher';
export { default as SwitcherItem } from './SwitcherItem';
export { default as SwitcherDivider } from './SwitcherDivider';

export {
  default as SkipToContent,
  type SkipToContentProps,
} from './SkipToContent';

export { default as SideNav, type SideNavProps } from './SideNav';
export { default as SideNavDetails } from './SideNavDetails';
export { default as SideNavDivider } from './SideNavDivider';
export { default as SideNavFooter } from './SideNavFooter';
export { default as SideNavHeader } from './SideNavHeader';
export { default as SideNavIcon } from './SideNavIcon';
export { default as SideNavItem } from './SideNavItem';
export { default as SideNavItems } from './SideNavItems';
export { default as SideNavLink } from './SideNavLink';
export { default as SideNavLinkText } from './SideNavLinkText';
export { default as SideNavMenu } from './SideNavMenu';
export { default as SideNavMenuItem } from './SideNavMenuItem';
export { default as SideNavSwitcher } from './SideNavSwitcher';



File: UIShell/_utils.js


/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const CARBON_SIDENAV_ITEMS = [
  'SideNavFooter',
  'SideNavHeader',
  'SideNavItems',
  'SideNavMenu',
  'SideNavLink',
];



File: UIShell/Header.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
import { usePrefix } from '../../internal/usePrefix';

export interface HeaderProps {
  children?: ReactNode;

  /**
   * Optionally provide aria-label
   */
  'aria-label'?: string;

  /**
   * Optionally provide aria-labelledby
   */
  'aria-labelledby'?: string;

  /**
   * Optionally provide a custom class name that is applied to the underlying header
   */
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  className: customClassName,
  children,
  ...rest
}) => {
  const prefix = usePrefix();
  const className = cx(`${prefix}--header`, customClassName as string);

  return (
    <header {...rest} className={className}>
      {children}
    </header>
  );
};

Header.propTypes = {
  /**
   * Optionally provide aria-label
   */
  'aria-label': PropTypes.string,

  /**
   * Optionally provide aria-labelledby
   */
  'aria-labelledby': PropTypes.string,

  /**
   * Optionally provide a custom class name that is applied to the underlying header
   */
  className: PropTypes.string,
};

export default Header;



File: UIShell/HeaderNavigation.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { type ComponentProps } from 'react';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { usePrefix } from '../../internal/usePrefix';

export type HeaderNavigationProps = ComponentProps<'nav'>;

export default function HeaderNavigation({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  children,
  className: customClassName,
  ...rest
}: HeaderNavigationProps) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--header__nav`, customClassName);
  return (
    <nav
      {...rest}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={className}>
      <ul className={`${prefix}--header__menu-bar`}>{children}</ul>
    </nav>
  );
}

HeaderNavigation.propTypes = {
  /**
   * Required props for accessibility label on the underlying menu
   */
  ...AriaLabelPropType,

  /**
   * Provide valid children of HeaderNavigation, for example `HeaderMenuItem`
   * or `HeaderMenu`
   */
  children: PropTypes.node,

  /**
   * Optionally provide a custom class to apply to the underlying <nav> node
   */
  className: PropTypes.string,
};



File: UIShell/HeaderPanel.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  isValidElement,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';
import { useWindowEvent } from '../../internal/useEvent';
import { useMergedRefs } from '../../internal/useMergedRefs';
import Switcher from './Switcher';
import { noopFn } from '../../internal/noopFn';

export interface HeaderPanelProps {
  /**
   * Specify whether focus and blur listeners are added. They are by default.
   */
  addFocusListeners?: boolean;

  /**
   * The content that will render inside of the `HeaderPanel`
   */
  children?: ReactNode;

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className?: string;

  /**
   * Specify whether the panel is expanded
   */
  expanded?: boolean;

  /**
   * Provide the `href` to the id of the element on your package that could
   * be target.
   */
  href?: string;

  /**
   * An optional listener that is called a callback to collapse the HeaderPanel
   */
  onHeaderPanelFocus?: () => void;
}

const HeaderPanel = React.forwardRef<HTMLDivElement, HeaderPanelProps>(
  (
    {
      children,
      className: customClassName,
      expanded,
      addFocusListeners = true,
      onHeaderPanelFocus = noopFn,
      href,
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();
    const headerPanelReference = useRef<HTMLDivElement>(null);
    const headerPanelRef = useMergedRefs([headerPanelReference, ref]);

    const controlled = useRef(expanded !== undefined).current;
    const [expandedState, setExpandedState] = useState(expanded);
    const expandedProp = controlled ? expanded : expandedState;

    const [lastClickedElement, setLastClickedElement] =
      useState<HTMLElement | null>(null);

    const className = cx(`${prefix}--header-panel`, {
      [`${prefix}--header-panel--expanded`]: expandedProp,
      [customClassName as string]: !!customClassName,
    });

    const eventHandlers: Partial<
      Pick<ComponentProps<'header'>, 'onBlur' | 'onKeyDown'>
    > = {};

    if (addFocusListeners) {
      eventHandlers.onBlur = (event) => {
        if (
          !event.currentTarget.contains(event.relatedTarget) &&
          !lastClickedElement?.classList?.contains(
            `${prefix}--switcher__item-link`
          )
        ) {
          setExpandedState(false);
          setLastClickedElement(null);
          if (expanded) {
            onHeaderPanelFocus();
          }
        }
      };
      eventHandlers.onKeyDown = (event) => {
        if (match(event, keys.Escape)) {
          setExpandedState(false);
          onHeaderPanelFocus();
          if (href) {
            window.location.href = href;
          }
        }
      };
    }

    useWindowEvent('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!(target instanceof HTMLElement)) return;
      setLastClickedElement(target);

      const isChildASwitcher =
        isValidElement(children) &&
        typeof children.type !== 'string' &&
        children.type === Switcher;

      if (
        isChildASwitcher &&
        !target.closest(`.${prefix}--header-panel--expanded`) &&
        !target.closest(`.${prefix}--header__action`) &&
        !headerPanelReference?.current?.classList.contains(
          `${prefix}--switcher`
        ) &&
        expanded
      ) {
        setExpandedState(false);
        onHeaderPanelFocus();
      }
    });

    return (
      <div
        {...rest}
        className={className}
        ref={headerPanelRef}
        {...eventHandlers}>
        {children}
      </div>
    );
  }
);

HeaderPanel.propTypes = {
  /**
   * Specify whether focus and blur listeners are added. They are by default.
   */
  addFocusListeners: PropTypes.bool,

  /**
   * The content that will render inside of the `HeaderPanel`
   */
  children: PropTypes.node,

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,

  /**
   * Specify whether the panel is expanded
   */
  expanded: PropTypes.bool,

  /**
   * Provide the `href` to the id of the element on your package that could
   * be target.
   */
  href: PropTypes.string,

  /**
   * An optional listener that is called a callback to collapse the HeaderPanel
   */
  onHeaderPanelFocus: PropTypes.func,
};

HeaderPanel.displayName = 'HeaderPanel';

export default HeaderPanel;



File: UIShell/SideNavHeader.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import SideNavIcon from './SideNavIcon';
import { usePrefix } from '../../internal/usePrefix';

export interface SideNavHeaderProps {
  /**
   * The child nodes to be rendered
   */
  children?: React.ReactNode;

  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded?: boolean;

  /**
   * A component used to render an icon.
   */
  renderIcon: React.ComponentType;
}
const SideNavHeader: React.FC<SideNavHeaderProps> = ({
  children,
  className: customClassName,
  renderIcon: IconElement,
}) => {
  const prefix = usePrefix();
  const className = cx(`${prefix}--side-nav__header`, customClassName);
  return (
    <header className={className}>
      <SideNavIcon>
        <IconElement />
      </SideNavIcon>
      {children}
    </header>
  );
};
SideNavHeader.displayName = 'SideNavHeader';
SideNavHeader.propTypes = {
  /**
   * The child nodes to be rendered
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded: PropTypes.bool,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
};

export default SideNavHeader;



File: UIShell/SideNavMenuItem.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { ElementType, ForwardedRef, Ref, ComponentProps } from 'react';
import SideNavLinkText from './SideNavLinkText';
import Link from './Link';
import { usePrefix } from '../../internal/usePrefix';

export type SideNavMenuItemProps = ComponentProps<typeof Link> & {
  /**
   * Specify the children to be rendered inside of the `SideNavMenuItem`
   */
  children?: React.ReactNode;

  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;

  /**
   * Optionally specify whether the link is "active". An active link is one that
   * has an href that is the same as the current page. Can also pass in
   * `aria-current="page"`, as well.
   */
  isActive?: boolean;

  /**
   * Optionally provide an href for the underlying li`
   */
  href?: string;

  /**
   * Optional component to render instead of default Link
   */
  as?: ElementType;
};

const SideNavMenuItem = React.forwardRef<HTMLElement, SideNavMenuItemProps>(
  (props, ref: ForwardedRef<HTMLElement>) => {
    const prefix = usePrefix();
    const {
      children,
      className: customClassName,
      as: Component = Link,
      isActive,
      ...rest
    } = props;
    const className = cx(`${prefix}--side-nav__menu-item`, customClassName);
    const linkClassName = cx({
      [`${prefix}--side-nav__link`]: true,
      [`${prefix}--side-nav__link--current`]: isActive,
    });

    return (
      <li className={className}>
        <Component
          {...rest}
          className={linkClassName}
          ref={ref as Ref<ElementType>}>
          <SideNavLinkText>{children}</SideNavLinkText>
        </Component>
      </li>
    );
  }
);

SideNavMenuItem.displayName = 'SideNavMenuItem';
SideNavMenuItem.propTypes = {
  /**
   * Optional component to render instead of default Link
   */
  as: PropTypes.elementType as PropTypes.Validator<React.ElementType>,

  /**
   * Specify the children to be rendered inside of the `SideNavMenuItem`
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Optionally provide an href for the underlying li`
   */
  href: PropTypes.string,

  /**
   * Optionally specify whether the link is "active". An active link is one that
   * has an href that is the same as the current page. Can also pass in
   * `aria-current="page"`, as well.
   */
  isActive: PropTypes.bool,
};

export default SideNavMenuItem;



File: UIShell/HeaderMenu.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChevronDown } from '@carbon/icons-react';
import cx from 'classnames';
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useContext,
  useRef,
  useState,
  type ComponentProps,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import PropTypes from 'prop-types';
import { keys, matches } from '../../internal/keyboard';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { PrefixContext } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';
import { composeEventHandlers } from '../../tools/events';
import { useMergedRefs } from '../../internal/useMergedRefs';
import type HeaderMenuItem from './HeaderMenuItem';

export interface HeaderMenuProps {
  /**
   * Required props for the accessibility label of the menu
   */
  'aria-label'?: string;
  'aria-labelledby'?: string;

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className?: string;

  /**
   * Provide a custom ref handler for the menu button
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  focusRef?: Ref<any>;

  /**
   * Applies selected styles to the item if a user sets this to true and `aria-current !== 'page'`.
   */
  isActive?: boolean;

  /**
   * Applies selected styles to the item if a user sets this to true and `aria-current !== 'page'`.
   * @deprecated Please use `isActive` instead. This will be removed in the next major release.
   */
  isCurrentPage?: boolean;

  /**
   * Provide a label for the link text
   */
  menuLinkName: string;

  /**
   * Optionally provide an onBlur handler that is called when the underlying
   * button fires it's onblur event
   */
  onBlur?: (event: FocusEvent<HTMLLIElement>) => void;

  /**
   * Optionally provide an onClick handler that is called when the underlying
   * button fires it's onclick event
   */
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;

  /**
   * Optionally provide an onKeyDown handler that is called when the underlying
   * button fires it's onkeydown event
   */
  onKeyDown?: (event: KeyboardEvent<HTMLLIElement>) => void;

  /**
   * Optional component to render instead of string
   */
  renderMenuContent?: () => ReactNode;

  /**
   * Optionally provide a tabIndex for the underlying menu button
   */
  tabIndex?: number;

  /**
   * The children should be a series of `HeaderMenuItem` components.
   */
  children?: ReactNode;
}

const frFn = forwardRef<HTMLLIElement, HeaderMenuProps>;

export const HeaderMenu = frFn((props, ref) => {
  const {
    isActive,
    isCurrentPage,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className: customClassName,
    children,
    renderMenuContent: MenuContent,
    menuLinkName,
    focusRef,
    onBlur,
    onClick,
    onKeyDown,
    ...rest
  } = props;
  const prefix = useContext(PrefixContext);
  const [expanded, setExpanded] = useState(false);

  const menuButtonRef = useRef<HTMLElement | null>(null);
  const subMenusRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const mergedButtonRef = useMergedRefs([ref, focusRef, menuButtonRef]);

  /**
   * Toggle the expanded state of the menu on click.
   */
  const handleOnClick = (e: MouseEvent<HTMLLIElement>) => {
    if (
      !subMenusRef.current ||
      (e.target instanceof Node && !subMenusRef.current.contains(e.target))
    ) {
      e.preventDefault();
    }

    setExpanded((prev) => !prev);
  };

  /**
   * Keyboard event handler for the entire menu.
   */
  const handleOnKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    // Handle enter or space key for toggling the expanded state of the menu.
    if (matches(event, [keys.Enter, keys.Space])) {
      event.stopPropagation();
      event.preventDefault();

      setExpanded((prev) => !prev);

      return;
    }
  };

  /**
   * Handle our blur event from our underlying menuitems. Will mostly be used
   * for closing our menu in response to a user clicking off or tabbing out of
   * the menu or menubar.
   */
  const handleOnBlur = (event: FocusEvent<HTMLLIElement>) => {
    // Close the menu on blur when the related target is not a sibling menu item
    // or a child in a submenu
    const siblingItemBlurredTo = itemRefs.current.find(
      (element) => element === event.relatedTarget
    );
    const childItemBlurredTo = subMenusRef.current?.contains(
      event.relatedTarget
    );

    if (!siblingItemBlurredTo && !childItemBlurredTo) {
      setExpanded(false);
    }
  };

  /**
   * Handles individual menuitem refs. We assign them to a class instance
   * property so that we can properly manage focus of our children.
   */
  const handleItemRef = (index: number) => (node: HTMLElement | null) => {
    itemRefs.current[index] = node;
  };

  const handleMenuClose = (event: KeyboardEvent<HTMLLIElement>) => {
    // Handle ESC keydown for closing the expanded menu.
    if (matches(event, [keys.Escape]) && expanded) {
      event.stopPropagation();
      event.preventDefault();

      setExpanded(false);

      // Return focus to menu button when the user hits ESC.
      if (menuButtonRef.current) {
        menuButtonRef.current.focus();
      }
    }
  };

  const hasActiveDescendant = (childrenArg: ReactNode): boolean =>
    Children.toArray(childrenArg).some((child) => {
      if (!isValidElement<ComponentProps<typeof HeaderMenuItem>>(child)) {
        return false;
      }

      const { isActive, isCurrentPage, children } = child.props;

      return (
        isActive ||
        isCurrentPage ||
        (Array.isArray(children) && hasActiveDescendant(children))
      );
    });

  /**
   * We capture the `ref` for each child inside of `this.items` to properly
   * manage focus. In addition to this focus management, all items receive a
   * `tabIndex: -1` so the user won't hit a large number of items in their tab
   * sequence when they might not want to go through all the items.
   */
  const renderMenuItem = (item: ReactNode, index: number): ReactNode => {
    if (isValidElement(item)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      return cloneElement(item as ReactElement<any>, {
        ref: handleItemRef(index),
      });
    }
    return item;
  };

  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };
  const itemClassName = cx({
    [`${prefix}--header__submenu`]: true,
    [`${customClassName}`]: !!customClassName,
  });
  const isActivePage = isActive ? isActive : isCurrentPage;
  const linkClassName = cx({
    [`${prefix}--header__menu-item`]: true,
    [`${prefix}--header__menu-title`]: true,
    // We set the current class only if `isActive` is passed in and we do
    // not have an `aria-current="page"` set for the breadcrumb item
    [`${prefix}--header__menu-item--current`]:
      isActivePage || (hasActiveDescendant(children) && !expanded),
  });

  // Notes on eslint comments and based on the examples in:
  // https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#
  // - The focus is handled by the <a> menuitem, onMouseOver is for mouse
  // users
  // - aria-haspopup can definitely have the value "menu"
  // - aria-expanded is on their example node with role="menuitem"
  // - href can be set to javascript:void(0), ideally this will be a button
  return (
    <li // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
      {...rest}
      className={itemClassName}
      onKeyDown={composeEventHandlers([onKeyDown, handleMenuClose])}
      onClick={composeEventHandlers([onClick, handleOnClick])}
      onBlur={composeEventHandlers([onBlur, handleOnBlur])}
      ref={ref}>
      <a // eslint-disable-line jsx-a11y/anchor-is-valid
        aria-haspopup="menu"
        aria-expanded={expanded}
        className={linkClassName}
        href="#"
        onKeyDown={handleOnKeyDown}
        ref={mergedButtonRef}
        tabIndex={0}
        {...accessibilityLabel}>
        {menuLinkName}
        {MenuContent ? (
          <MenuContent />
        ) : (
          <ChevronDown className={`${prefix}--header__menu-arrow`} />
        )}
      </a>
      <ul
        {...accessibilityLabel}
        ref={subMenusRef}
        className={`${prefix}--header__menu`}>
        {Children.map(children, renderMenuItem)}
      </ul>
    </li>
  );
});

HeaderMenu.displayName = 'HeaderMenu';
HeaderMenu.propTypes = {
  /**
   * Required props for the accessibility label of the menu
   */
  ...AriaLabelPropType,

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,

  /**
   * Provide a custom ref handler for the menu button
   */
  focusRef: PropTypes.func,

  /**
   * Applies selected styles to the item if a user sets this to true and `aria-current !== 'page'`.
   */
  isActive: PropTypes.bool,

  /**
   * Applies selected styles to the item if a user sets this to true and `aria-current !== 'page'`.
   * @deprecated Please use `isActive` instead. This will be removed in the next major release.
   */
  isCurrentPage: deprecate(
    PropTypes.bool,
    'The `isCurrentPage` prop for `HeaderMenu` has ' +
      'been deprecated. Please use `isActive` instead. This will be removed in the next major release.'
  ),

  /**
   * Provide a label for the link text
   */
  menuLinkName: PropTypes.string.isRequired,

  /**
   * Optionally provide an onBlur handler that is called when the underlying
   * button fires it's onblur event
   */
  onBlur: PropTypes.func,

  /**
   * Optionally provide an onClick handler that is called when the underlying
   * button fires it's onclick event
   */
  onClick: PropTypes.func,

  /**
   * Optionally provide an onKeyDown handler that is called when the underlying
   * button fires it's onkeydown event
   */
  onKeyDown: PropTypes.func,

  /**
   * Optional component to render instead of string
   */
  renderMenuContent: PropTypes.func,

  /**
   * Optionally provide a tabIndex for the underlying menu button
   */
  tabIndex: PropTypes.number,
};

export default HeaderMenu;



File: UIShell/README.md


# UI Shell

> Components for building a product shell when using the Carbon Design System

## Components

- `Header`: used to render the top bar in your application
  - `HeaderMenuButton`: used to display the trigger for a menu
  - `HeaderName`: used to display the name of the product
  - `HeaderGlobalBar`: used to display global actions
    - `HeaderGlobalAction`: used to display a global action
  - `HeaderMenubar`: used to display nav links
    - `HeaderMenu`: used to display a menu in the nav
    - `HeaderMenuItem`: used to display a menu item, often a link
- `SideNav`: used to render the container for the side navigation of a page
  - `SideNavHeader`: used to render the top bar in the side navigation
    - `SideNavDetails`: renders the title for the side nav
      - `SideNavSwitcher`: provides an optional tool to handle switching at the
        top-level
  - `SideNavItems`: used for rendering items in the sub nav
    - `SideNavLink`: renders a link in the side nav
    - `SideNavMenu`: renders a collapsible menu in the side nav
      - `SideNavMenuItem`: renders a link in a side nav menu
  - `RightPanel`: used for render the container for header actions on the right
    - `Switcher`: used to render a list of product links inside the right panel
      - `SwitcherItem`: used to render list item, often a link
      - `SwitcherDivider`: used to render a divider for list items



File: UIShell/SideNav.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {
  useRef,
  type ForwardedRef,
  type ComponentProps,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEventHandler,
  isValidElement,
  createContext,
  type JSX,
} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { CARBON_SIDENAV_ITEMS } from './_utils';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { useWindowEvent } from '../../internal/useEvent';
import { useDelayedState } from '../../internal/useDelayedState';
import { breakpoints } from '@carbon/layout';
import { useMatchMedia } from '../../internal/useMatchMedia';
// TO-DO: comment back in when footer is added for rails
// import SideNavFooter from './SideNavFooter';

export interface SideNavProps {
  expanded?: boolean | undefined;
  defaultExpanded?: boolean | undefined;
  isChildOfHeader?: boolean | undefined;
  onToggle?: (
    event: FocusEvent<HTMLElement> | KeyboardEvent<HTMLElement> | boolean,
    value: boolean
    // eslint-disable-next-line   @typescript-eslint/no-invalid-void-type -- https://github.com/carbon-design-system/carbon/issues/20452
  ) => void | undefined;
  href?: string | undefined;
  // TO-DO: comment back in when footer is added for rails
  // translateById?: ((id: TranslationId) => Translation) | undefined;
  isFixedNav?: boolean | undefined;
  isRail?: boolean | undefined;
  isPersistent?: boolean | undefined;
  addFocusListeners?: boolean | undefined;
  addMouseListeners?: boolean | undefined;
  onOverlayClick?: MouseEventHandler<HTMLDivElement> | undefined;
  // eslint-disable-next-line   @typescript-eslint/no-invalid-void-type -- https://github.com/carbon-design-system/carbon/issues/20452
  onSideNavBlur?: () => void | undefined;
  enterDelayMs?: number;
  inert?: boolean;
}

interface SideNavContextData {
  isRail?: boolean | undefined;
}

export const SideNavContext = createContext<SideNavContextData>(
  {} as SideNavContextData
);

function SideNavRenderFunction(
  {
    expanded: expandedProp,
    defaultExpanded = false,
    isChildOfHeader = true,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    children,
    onToggle,
    className: customClassName,
    // TO-DO: comment back in when footer is added for rails
    // translateById: t = (id) => translations[id],
    href,
    isFixedNav = false,
    isRail,
    isPersistent = true,
    addFocusListeners = true,
    addMouseListeners = true,
    onOverlayClick,
    onSideNavBlur,
    enterDelayMs = 100,
    ...other
  }: SideNavProps & ComponentProps<'nav'>,
  ref: ForwardedRef<HTMLElement>
) {
  const prefix = usePrefix();
  const { current: controlled } = useRef(expandedProp !== undefined);
  const [expandedState, setExpandedState] = useDelayedState(defaultExpanded);
  const [expandedViaHoverState, setExpandedViaHoverState] =
    useDelayedState(defaultExpanded);
  const expanded = controlled ? expandedProp : expandedState;
  const sideNavRef = useRef<HTMLDivElement>(null);
  const navRef = useMergedRefs([sideNavRef, ref]);

  const handleToggle: typeof onToggle = (event, value = !expanded) => {
    if (!controlled) {
      setExpandedState(value, enterDelayMs);
    }
    if (onToggle) {
      onToggle(event, value);
    }
    if (controlled || isRail) {
      setExpandedViaHoverState(value, enterDelayMs);
    }
  };

  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };

  // TO-DO: comment back in when footer is added for rails
  // const assistiveText = expanded
  //   ? t('carbon.sidenav.state.open')
  //   : t('carbon.sidenav.state.closed');

  const className = cx(customClassName, {
    [`${prefix}--side-nav`]: true,
    [`${prefix}--side-nav--expanded`]: expanded || expandedViaHoverState,
    [`${prefix}--side-nav--collapsed`]: !expanded && isFixedNav,
    [`${prefix}--side-nav--rail`]: isRail,
    [`${prefix}--side-nav--ux`]: isChildOfHeader,
    [`${prefix}--side-nav--hidden`]: !isPersistent,
  });

  const overlayClassName = cx({
    [`${prefix}--side-nav__overlay`]: true,
    [`${prefix}--side-nav__overlay-active`]: expanded || expandedViaHoverState,
  });

  let childrenToRender = children;

  // Pass the expansion state as a prop, so children can update themselves to match
  childrenToRender = React.Children.map(children, (child) => {
    // if we are controlled, check for if we have hovered over or the expanded state, else just use the expanded state (uncontrolled)
    const currentExpansionState = controlled
      ? expandedViaHoverState || expanded
      : expanded;
    if (isValidElement(child)) {
      const childJsxElement = child as JSX.Element;
      // avoid spreading `isSideNavExpanded` to non-Carbon UI Shell children
      return React.cloneElement(childJsxElement, {
        ...(CARBON_SIDENAV_ITEMS.includes(
          childJsxElement.type?.displayName ?? childJsxElement.type?.name
        )
          ? {
              isSideNavExpanded: currentExpansionState,
            }
          : {}),
      });
    }
    return child;
  });

  const eventHandlers: Partial<
    Pick<
      ComponentProps<'nav'>,
      | 'onFocus'
      | 'onBlur'
      | 'onKeyDown'
      | 'onMouseEnter'
      | 'onMouseLeave'
      | 'onClick'
    >
  > = {};

  if (addFocusListeners) {
    eventHandlers.onFocus = (event) => {
      if (!event.currentTarget.contains(event.relatedTarget) && isRail) {
        handleToggle(event, true);
      }
    };
    eventHandlers.onBlur = (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        handleToggle(event, false);
      }
      if (
        !event.currentTarget.contains(event.relatedTarget) &&
        expanded &&
        !isFixedNav
      ) {
        if (onSideNavBlur) {
          onSideNavBlur();
        }
      }
    };
    eventHandlers.onKeyDown = (event) => {
      if (match(event, keys.Escape)) {
        handleToggle(event, false);
        if (href) {
          window.location.href = href;
        }
      }
    };
  }

  if (addMouseListeners && isRail) {
    eventHandlers.onMouseEnter = () => {
      handleToggle(true, true);
    };
    eventHandlers.onMouseLeave = () => {
      setExpandedState(false);
      setExpandedViaHoverState(false);
      handleToggle(false, false);
    };
    eventHandlers.onClick = () => {
      //if delay is enabled, and user intentionally clicks it to see it expanded immediately
      setExpandedState(true);
      setExpandedViaHoverState(true);
      handleToggle(true, true);
    };
  }

  useWindowEvent('keydown', (event) => {
    const focusedElement = document.activeElement;

    if (
      match(event, keys.Tab) &&
      expanded &&
      !isFixedNav &&
      sideNavRef.current &&
      focusedElement?.classList.contains(`${prefix}--header__menu-toggle`) &&
      !focusedElement.closest('nav')
    ) {
      sideNavRef.current.focus();
    }
  });

  const lgMediaQuery = `(min-width: ${breakpoints.lg.width})`;
  const isLg = useMatchMedia(lgMediaQuery);

  return (
    <SideNavContext.Provider value={{ isRail }}>
      {isFixedNav ? null : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className={overlayClassName} onClick={onOverlayClick} />
      )}
      <nav
        tabIndex={-1}
        ref={navRef}
        className={`${prefix}--side-nav__navigation ${className}`}
        inert={!isRail ? !(expanded || isLg) : undefined}
        {...accessibilityLabel}
        {...eventHandlers}
        {...other}>
        {childrenToRender}
      </nav>
    </SideNavContext.Provider>
  );
}

const SideNav = React.forwardRef(SideNavRenderFunction);

SideNav.displayName = 'SideNav';

SideNav.propTypes = {
  /**
   * Required props for accessibility label on the underlying menu
   */
  ...AriaLabelPropType,

  /**
   * Specify whether focus and blur listeners are added. They are by default.
   */
  addFocusListeners: PropTypes.bool,

  /**
   * Specify whether mouse entry/exit listeners are added. They are by default.
   */
  addMouseListeners: PropTypes.bool,

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,

  /**
   * If `true`, the SideNav will be open on initial render.
   */
  defaultExpanded: PropTypes.bool,

  /**
   * Specify the duration in milliseconds to delay before displaying the side navigation
   */
  enterDelayMs: PropTypes.number,

  /**
   * If `true`, the SideNav will be expanded, otherwise it will be collapsed.
   * Using this prop causes SideNav to become a controlled component.
   */
  expanded: PropTypes.bool,

  /**
   * Provide the `href` to the id of the element on your package that is the
   * main content.
   */
  href: PropTypes.string,

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  isChildOfHeader: PropTypes.bool,

  /**
   * Specify if sideNav is standalone
   */
  isFixedNav: PropTypes.bool,

  /**
   * Specify if the sideNav will be persistent above the lg breakpoint
   */
  isPersistent: PropTypes.bool,

  /**
   * Optional prop to display the side nav rail.
   */
  isRail: PropTypes.bool,

  /**
   * An optional listener that is called when the SideNav overlay is clicked
   *
   * @param {object} event
   */
  onOverlayClick: PropTypes.func,

  /**
   * An optional listener that is called a callback to collapse the SideNav
   */

  onSideNavBlur: PropTypes.func,

  /**
   * An optional listener that is called when an event that would cause
   * toggling the SideNav occurs.
   *
   * @param {object} event
   * @param {boolean} value
   */
  onToggle: PropTypes.func,

  /**
   * Provide a custom function for translating all message ids within this
   * component. This function will take in two arguments: the message Id and the
   * state of the component. From this, you should return a string representing
   * the label you want displayed or read by screen readers.
   */
  // translateById: PropTypes.func,
};

export default SideNav;



File: UIShell/SideNavLink.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes, { WeakValidationMap } from 'prop-types';
import React, {
  ComponentType,
  ElementType,
  ForwardedRef,
  JSX,
  ReactNode,
  forwardRef,
  useContext,
} from 'react';
import Link, { LinkProps, LinkPropTypes } from './Link';
import SideNavIcon from './SideNavIcon';
import SideNavItem from './SideNavItem';
import SideNavLinkText from './SideNavLinkText';
import { usePrefix } from '../../internal/usePrefix';
import { SideNavContext } from './SideNav';

export type SideNavLinkProps<E extends ElementType> = LinkProps<E> & {
  /**
   * Required props for the accessibility label
   */
  'aria-label'?: string;
  /**
   * Required props for the accessibility label
   */
  'aria-labelledby'?: string;
  /**
   * Specify the text content for the link
   */
  children: ReactNode;

  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;

  /**
   * Specify whether the link is the current page
   */
  isActive?: boolean;

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded?: boolean;

  /**
   * Specify if this is a large variation of the SideNavLink
   */
  large?: boolean;

  /**
   * A component used to render an icon.
   */
  renderIcon?: ComponentType;

  /**
   * Optional prop to specify the tabIndex of the button. If undefined, it will be applied default validation
   */
  tabIndex?: number;
};

export interface SideNavLinkComponent {
  <E extends ElementType = 'a'>(props: SideNavLinkProps<E>): JSX.Element | null;
  displayName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  propTypes?: WeakValidationMap<SideNavLinkProps<any>>;
}

// First define a non-generic base component to work with forwardRef
type SideNavLinkPropsWithoutRef = Omit<SideNavLinkProps<'a'>, 'ref'>;

const SideNavLinkBase = (
  {
    children,
    className: customClassName,
    renderIcon: IconElement,
    isActive,
    isSideNavExpanded,
    large = false,
    tabIndex,
    ...rest
  }: SideNavLinkPropsWithoutRef,
  ref: ForwardedRef<HTMLAnchorElement>
) => {
  const isRail = useContext(SideNavContext);

  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--side-nav__link`]: true,
    [`${prefix}--side-nav__link--current`]: isActive,
    [customClassName as string]: !!customClassName,
  });

  return (
    <SideNavItem large={large}>
      <Link
        {...(rest as LinkProps<'a'>)}
        className={className}
        ref={ref}
        tabIndex={
          tabIndex === undefined
            ? !isSideNavExpanded && !isRail
              ? -1
              : 0
            : tabIndex
        }>
        {IconElement && (
          <SideNavIcon small>
            <IconElement />
          </SideNavIcon>
        )}
        <SideNavLinkText>{children}</SideNavLinkText>
      </Link>
    </SideNavItem>
  );
};

// Use forwardRef with the non-generic function and cast to the generic component type
const SideNavLink = forwardRef(
  SideNavLinkBase
) as unknown as SideNavLinkComponent;

SideNavLink.displayName = 'SideNavLink';
SideNavLink.propTypes = {
  ...LinkPropTypes,

  /**
   * Specify the text content for the link
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify whether the link is the current page
   */
  isActive: PropTypes.bool,

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded: PropTypes.bool,

  /**
   * Specify if this is a large variation of the SideNavLink
   */
  large: PropTypes.bool,

  /**
   * A component used to render an icon.
   */
  // @ts-expect-error - PropTypes are unable to cover this case.
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Optional prop to specify the tabIndex of the button. If undefined, it will be applied default validation
   */
  tabIndex: PropTypes.number,
};

// eslint-disable-next-line react/display-name -- https://github.com/carbon-design-system/carbon/issues/20452
export const createCustomSideNavLink = (element) => (props) => {
  return <SideNavLink element={element} {...props} />;
};

export default SideNavLink;



File: UIShell/UIShell.HeaderBase.stories.js


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from 'storybook/actions';
import cx from 'classnames';
import {
  Content,
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderPanel,
  HeaderSideNavItems,
  SkipToContent,
  SideNav,
  SideNavDivider,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  Switcher,
  SwitcherItem,
  SwitcherDivider,
} from '.';
import { HeaderMenu as HeaderMenuNative } from './HeaderMenu';
import Modal from '../Modal';
import Button from '../Button';
import {
  Search,
  Notification,
  Fade,
  Switcher as SwitcherIcon,
} from '@carbon/icons-react';
import mdx from './UIShell.mdx';

/* eslint-disable react/prop-types */
const StoryContent = ({ useResponsiveOffset = true }) => {
  const [open, setOpen] = useState(false);
  const classNameFirstColumn = cx({
    'cds--col-lg-13': true,
    'cds--offset-lg-3': useResponsiveOffset,
  });
  const content = (
    <div className="cds--grid">
      <div className="cds--row">
        <div className={classNameFirstColumn}>
          <h2 style={{ margin: '0 0 30px' }}>Purpose and function</h2>
          <p>
            The shell is perhaps the most crucial piece of any UI built with
            <a href="www.carbondesignsystem.com"> Carbon</a>. It contains the
            shared navigation framework for the entire design system and ties
            the products in IBM’s portfolio together in a cohesive and elegant
            way. The shell is the home of the topmost navigation, where users
            can quickly and dependably gain their bearings and move between
            pages.
            <br />
            <br />
            The shell was designed with maximum flexibility built in, to serve
            the needs of a broad range of products and users. Adopting the shell
            ensures compliance with IBM design standards, simplifies development
            efforts, and provides great user experiences. All IBM products built
            with Carbon are required to use the shell’s header.
            <br />
            <br />
            To better understand the purpose and function of the UI shell,
            consider the “shell” of MacOS, which contains the Apple menu,
            top-level navigation, and universal, OS-level controls at the top of
            the screen, as well as a universal dock along the bottom or side of
            the screen. The Carbon UI shell is roughly analogous in function to
            these parts of the Mac UI. For example, the app switcher portion of
            the shell can be compared to the dock in MacOS.
          </p>
          <h2 style={{ margin: '30px 0' }}>Header responsive behavior</h2>
          <p>
            As a header scales down to fit smaller screen sizes, headers with
            persistent side nav menus should have the side nav collapse into
            “hamburger” menu. See the example to better understand responsive
            behavior of the header.
          </p>
          <h2 style={{ margin: '30px 0' }}>Secondary navigation</h2>
          <p>
            The side-nav contains secondary navigation and fits below the
            header. It can be configured to be either fixed-width or flexible,
            with only one level of nested items allowed. Both links and category
            lists can be used in the side-nav and may be mixed together. There
            are several configurations of the side-nav, but only one
            configuration should be used per product section. If tabs are needed
            on a page when using a side-nav, then the tabs are secondary in
            hierarchy to the side-nav.
          </p>
          <Button onClick={() => setOpen(true)}>Launch modal</Button>
          <Modal
            modalHeading="Add a custom domain"
            modalLabel="Account resources"
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            open={open}
            onRequestClose={() => setOpen(false)}>
            <p style={{ marginBottom: '1rem' }}>
              Custom domains direct requests for your apps in this Cloud Foundry
              organization to a URL that you own. A custom domain can be a
              shared domain, a shared subdomain, or a shared domain and host.
            </p>
          </Modal>
        </div>
      </div>
    </div>
  );
  const style = {
    height: '100%',
  };
  if (useResponsiveOffset) {
    style.margin = '0';
    style.width = '100%';
  }
  return (
    <Content id="main-content" style={style}>
      {content}
    </Content>
  );
};

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/UI Shell/Header',
  component: Header,
  subcomponents: {
    Content,
    HeaderMenuButton,
    HeaderName,
    HeaderNavigation,
    HeaderMenu: HeaderMenuNative,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderPanel,
    HeaderSideNavItems,
    SkipToContent,
    SideNav,
    SideNavItems,
    SideNavDivider,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
    Switcher,
    SwitcherItem,
    SwitcherDivider,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      hideNoControlsWarning: true,
    },
  },
};

export const HeaderWNavigation = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
          />
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <HeaderNavigation aria-label="IBM [Platform]">
            <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
            <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
              <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
              <HeaderMenuItem isActive href="#">
                Sub-link 2
              </HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
            </HeaderMenu>
          </HeaderNavigation>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            isPersistent={false}
            onSideNavBlur={onClickSideNavExpand}>
            <SideNavItems>
              <HeaderSideNavItems>
                <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                  <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                  <HeaderMenuItem isActive href="#">
                    Sub-link 2
                  </HeaderMenuItem>
                  <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                </HeaderMenu>
              </HeaderSideNavItems>
            </SideNavItems>
          </SideNav>
        </Header>
        <StoryContent />
      </>
    )}
  />
);

HeaderWNavigation.storyName = 'Header w/ Navigation';

export const HeaderWNavigationAndActions = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
          />
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <HeaderNavigation aria-label="IBM [Platform]">
            <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
            <HeaderMenu isActive aria-label="Link 4" menuLinkName="Link 4">
              <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
              <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
            </HeaderMenu>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Search"
              onClick={action('search click')}>
              <Search size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Notifications"
              onClick={action('notification click')}>
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="App Switcher"
              onClick={action('app-switcher click')}
              tooltipAlignment="end">
              <SwitcherIcon size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            isPersistent={false}
            onSideNavBlur={onClickSideNavExpand}>
            <SideNavItems>
              <HeaderSideNavItems>
                <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                  <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                  <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                  <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                </HeaderMenu>
              </HeaderSideNavItems>
            </SideNavItems>
          </SideNav>
        </Header>
        <StoryContent />
      </>
    )}
  />
);

HeaderWNavigationAndActions.storyName = 'Header w/ Navigation and Actions';

export const HeaderWNavigationActionsAndSideNav = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
          />
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <HeaderNavigation aria-label="IBM [Platform]">
            <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
            <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
              <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
              <HeaderMenuItem href="#two">Sub-link 2</HeaderMenuItem>
              <HeaderMenuItem href="#three">Sub-link 3</HeaderMenuItem>
            </HeaderMenu>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Search"
              onClick={action('search click')}
              tooltipAlignment="start">
              <Search size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Notifications"
              onClick={action('notification click')}>
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="App Switcher"
              onClick={action('app-switcher click')}
              tooltipAlignment="end">
              <SwitcherIcon size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            onSideNavBlur={onClickSideNavExpand}
            href="#main-content">
            <SideNavItems>
              <HeaderSideNavItems hasDivider={true}>
                <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                  <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                  <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                  <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                </HeaderMenu>
              </HeaderSideNavItems>
              <SideNavMenu
                renderIcon={Fade}
                title="Category title"
                tabIndex={0}>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 5
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 6
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 7
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu
                renderIcon={Fade}
                title="Category title"
                tabIndex={0}>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 8
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 9
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 10
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu
                renderIcon={Fade}
                title="Category title"
                isActive={true}
                tabIndex={0}>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 11
                </SideNavMenuItem>
                <SideNavMenuItem
                  aria-current="page"
                  href="https://www.carbondesignsystem.com/">
                  Link 12
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link 13
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavLink
                renderIcon={Fade}
                href="https://www.carbondesignsystem.com/">
                Link
              </SideNavLink>
              <SideNavLink
                renderIcon={Fade}
                href="https://www.carbondesignsystem.com/">
                Link
              </SideNavLink>
            </SideNavItems>
          </SideNav>
        </Header>
        <StoryContent />
      </>
    )}
  />
);

HeaderWNavigationActionsAndSideNav.storyName =
  'Header w/ Navigation, Actions and SideNav';

export const HeaderWSideNav = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
          />
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            onSideNavBlur={onClickSideNavExpand}
            href="#main-content">
            <SideNavItems>
              <SideNavMenu renderIcon={Fade} title="Category title">
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu
                renderIcon={Fade}
                title="Category title"
                isActive={true}>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem
                  aria-current="page"
                  href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavMenu renderIcon={Fade} title="Category title">
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
                <SideNavMenuItem href="https://www.carbondesignsystem.com/">
                  Link
                </SideNavMenuItem>
              </SideNavMenu>
              <SideNavLink
                renderIcon={Fade}
                href="https://www.carbondesignsystem.com/">
                Link
              </SideNavLink>
              <SideNavLink
                renderIcon={Fade}
                href="https://www.carbondesignsystem.com/">
                Link
              </SideNavLink>
            </SideNavItems>
          </SideNav>
        </Header>
        <StoryContent />
      </>
    )}
  />
);

HeaderWSideNav.storyName = 'Header w/ SideNav';

export const HeaderWActionsAndRightPanel = (args) => {
  // Add state to control panel expansion
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  // Toggle the notification panel when the icon is clicked
  const togglePanel = () => {
    setIsPanelExpanded((prev) => !prev);
  };

  // Function to close panel specifically
  const closePanel = () => {
    setIsPanelExpanded(false);
  };

  // Close the panel when Escape key is pressed
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closePanel();
    }
  };

  return (
    <>
      <Header aria-label="IBM Platform Name">
        <HeaderName href="#" prefix="IBM">
          [Platform]
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Search"
            onClick={action('search click')}>
            <Search size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="Notifications"
            badgeCount={args.badgeCount}
            isActive={isPanelExpanded}
            onClick={togglePanel}
            onBlur={closePanel}
            onKeyDown={handleKeyDown}
            tooltipAlignment="center"
            id="notification-button">
            <Notification size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="App Switcher"
            onClick={action('app-switcher click')}
            tooltipAlignment="end">
            <SwitcherIcon size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
        <HeaderPanel expanded={isPanelExpanded} href="#notification-button">
          {/* Notification panel content here */}
        </HeaderPanel>
      </Header>
      <StoryContent />
    </>
  );
};

HeaderWActionsAndRightPanel.storyName = 'Header w/ Actions and Right Panel';

HeaderWActionsAndRightPanel.argTypes = {
  badgeCount: {
    description:
      ' **Experimental**: Display a badge on the button. An empty/dot badge if 0, a numbered badge if > 0. Must be used with size="lg" and kind="ghost"',
    control: {
      type: 'number',
    },
  },
};

HeaderWActionsAndRightPanel.args = {
  badgeCount: 4,
};

export const HeaderWActionsAndSwitcher = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="IBM Platform Name">
          <HeaderName href="#" prefix="IBM">
            [Platform]
          </HeaderName>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Search"
              onClick={action('search click')}>
              <Search size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Notifications"
              onClick={action('notification click')}>
              <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label={
                isSideNavExpanded ? 'Close switcher' : 'Open switcher'
              }
              aria-expanded={isSideNavExpanded}
              isActive={isSideNavExpanded}
              onClick={onClickSideNavExpand}
              tooltipAlignment="end"
              id="switcher-button">
              <SwitcherIcon size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <HeaderPanel
            expanded={isSideNavExpanded}
            onHeaderPanelFocus={onClickSideNavExpand}
            href="#switcher-button">
            <Switcher
              aria-label="Switcher Container"
              expanded={isSideNavExpanded}>
              <SwitcherItem aria-label="Link 1" href="#">
                Link 1
              </SwitcherItem>
              <SwitcherDivider />
              <SwitcherItem href="#" aria-label="Link 2">
                Link 2
              </SwitcherItem>
              <SwitcherItem href="#" aria-label="Link 3">
                Link 3
              </SwitcherItem>
              <SwitcherItem href="#" aria-label="Link 4">
                Link 4
              </SwitcherItem>
              <SwitcherItem href="#" aria-label="Link 5">
                Link 5
              </SwitcherItem>
              <SwitcherDivider />
              <SwitcherItem href="#" aria-label="Link 6">
                Link 6
              </SwitcherItem>
            </Switcher>
          </HeaderPanel>
        </Header>
        <StoryContent />
      </>
    )}
  />
);

HeaderWActionsAndSwitcher.storyName = 'Header w/ Actions and Switcher';



File: UIShell/HeaderMenuItem.tsx


/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { WeakValidationMap } from 'prop-types';
import React, {
  type ComponentProps,
  type ForwardedRef,
  forwardRef,
  type ReactNode,
  ElementType,
  JSX,
} from 'react';
import cx from 'classnames';
import Link, { LinkProps, LinkPropTypes } from './Link';
import { usePrefix } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';
import { PolymorphicComponentPropWithRef } from '../../internal/PolymorphicProps';

export interface HeaderMenuItemBaseProps {
  className?: string | undefined;
  isActive?: boolean | undefined;
  isCurrentPage?: boolean | undefined;
  'aria-current'?: string | undefined;
  children: ReactNode;
  role?: ComponentProps<'li'>['role'];
  tabIndex?: number | undefined;
}

export type HeaderMenuItemProps<E extends ElementType = 'a'> =
  PolymorphicComponentPropWithRef<E, HeaderMenuItemBaseProps>;

export interface HeaderMenuItemComponent {
  <E extends ElementType = 'a'>(
    props: HeaderMenuItemProps<E>
  ): JSX.Element | null;
  displayName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  propTypes?: WeakValidationMap<HeaderMenuItemProps<any>>;
}

const HeaderMenuItem = forwardRef(function HeaderMenuItem<
  E extends ElementType = 'a',
>(
  {
    className,
    isActive,
    isCurrentPage,
    'aria-current': ariaCurrent,
    children,
    role,
    tabIndex,
    ...rest
  }: Omit<HeaderMenuItemProps<E>, 'ref'>,
  ref: ForwardedRef<E>
) {
  const prefix = usePrefix();
  const resolvedTabIndex = tabIndex ?? 0;
  if (isCurrentPage) {
    isActive = isCurrentPage;
  }
  // We set the current class only if `isActive` is passed in and we do
  // not have an `aria-current="page"` set for the breadcrumb item. When this
  // class is added we also set `aria-current` as `true`
  const hasCurrentClass = isActive && ariaCurrent !== 'page';
  const linkClassName = cx({
    [`${prefix}--header__menu-item`]: true,
    [`${prefix}--header__menu-item--current`]: hasCurrentClass,
  });
  return (
    <li className={className} role={role}>
      <Link
        {...(rest as LinkProps<E>)}
        aria-current={hasCurrentClass ? true : ariaCurrent}
        className={linkClassName}
        ref={ref}
        tabIndex={resolvedTabIndex}>
        <span className={`${prefix}--text-truncate--end`}>{children}</span>
      </Link>
    </li>
  );
}) as HeaderMenuItemComponent;

HeaderMenuItem.displayName = 'HeaderMenuItem';
HeaderMenuItem.propTypes = {
  /**
   * Pass in a valid `element` to replace the underlying `<a>` tag with a
   * custom `Link` element
   */
  ...LinkPropTypes,

  /**
   * Pass in children that are either a string or can be read as a string by
   * screen readers
   */
  children: PropTypes.node.isRequired,

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,

  /**
   * If `true` and `aria-current !== 'page'`, applies selected styles to the item and sets `aria-current="true"`.
   */
  isActive: PropTypes.bool,

  /**
   * Applies selected styles to the item if a user sets this to true and `aria-current !== 'page'`.
   * @deprecated Please use `isActive` instead. This will be removed in the next major release.
   */
  isCurrentPage: deprecate(
    PropTypes.bool,
    'The `isCurrentPage` prop for `HeaderMenuItem` has ' +
      'been deprecated. Please use `isActive` instead. This will be removed in the next major release.'
  ),

  /**
   * Optionally supply a role for the underlying `<li>` node. Useful for resetting
   * `<ul>` semantics for menus.
   */
  role: PropTypes.string,

  /**
   * Specify the tab index of the Link
   */
  tabIndex: PropTypes.number,
};

export default HeaderMenuItem;



File: UIShell/HeaderSideNavItems.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { type ReactNode } from 'react';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';

export interface HeaderSideNavItemsProps {
  className?: string | undefined;
  children?: ReactNode;
  hasDivider?: boolean | undefined;
}

export default function HeaderSideNavItems({
  className: customClassName,
  children,
  hasDivider = false,
}: HeaderSideNavItemsProps) {
  const prefix = usePrefix();
  const className = cx(
    {
      [`${prefix}--side-nav__header-navigation`]: true,
      [`${prefix}--side-nav__header-divider`]: hasDivider,
    },
    customClassName
  );
  return <ul className={className}>{children}</ul>;
}

HeaderSideNavItems.propTypes = {
  /**
   * The child nodes to be rendered
   */
  children: PropTypes.node,

  /**
   * Optionally provide a custom class name that is applied to the underlying
   * button
   */
  className: PropTypes.string,

  /**
   * Optionally specify if container will have a bottom divider to differentiate
   * between original sidenav items and header menu items. False by default.
   */
  hasDivider: PropTypes.bool,
};



File: UIShell/UIShell.mdx


import { ArgTypes, Meta } from '@storybook/addon-docs/blocks';

<Meta isTemplate />

# UIShell

[Source code](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/UIShell)
&nbsp;|&nbsp;
[Usage guidelines](https://www.carbondesignsystem.com/components/UI-shell-header/usage)
&nbsp;|&nbsp;
[Accessibility](https://www.carbondesignsystem.com/components/UI-shell-header/accessibility)

{/* <!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE --> */}

## Table of Contents

- [Overview](#overview)
- [Component API](#component-api)
- [Feedback](#feedback)

{/* <!-- END doctoc generated TOC please keep comment here to allow auto update --> */}

## Overview

## Component API

<ArgTypes />

## Feedback

Help us improve this component by providing feedback, asking questions on Slack,
or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon/edit/main/packages/react/src/components/UIShell/UIShell.mdx).



File: UIShell/SideNavItems.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { CARBON_SIDENAV_ITEMS } from './_utils';
import { usePrefix } from '../../internal/usePrefix';

export interface SideNavItemsProps {
  /**
   * Provide a single icon as the child to `SideNavIcon` to render in the
   * container
   */
  children: React.ReactNode;

  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded?: boolean;
}

const SideNavItems: React.FC<SideNavItemsProps> = ({
  className: customClassName,
  children,
  isSideNavExpanded,
}) => {
  const prefix = usePrefix();
  const className = cx([`${prefix}--side-nav__items`], customClassName);
  const childrenWithExpandedState = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // avoid spreading `isSideNavExpanded` to non-Carbon UI Shell children
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      const childDisplayName = (child.type as any)?.displayName;
      return React.cloneElement(child, {
        ...(CARBON_SIDENAV_ITEMS.includes(childDisplayName)
          ? {
              isSideNavExpanded,
            }
          : {}),
      });
    }
  });
  return <ul className={className}>{childrenWithExpandedState}</ul>;
};

SideNavItems.displayName = 'SideNavItems';
SideNavItems.propTypes = {
  /**
   * Provide a single icon as the child to `SideNavIcon` to render in the
   * container
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded: PropTypes.bool,
};

export default SideNavItems;



File: UIShell/HeaderGlobalBar.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import wrapComponent from '../../tools/wrapComponent';

/**
 * Generic container for `HeaderGlobalAction` components
 */

const HeaderGlobalBar = wrapComponent({
  name: 'HeaderGlobalBar',
  className: (prefix) => `${prefix}--header__global`,
  type: 'div',
});

export default HeaderGlobalBar;



File: UIShell/SkipToContent.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { ComponentProps } from 'react';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';

export type SkipToContentProps = Omit<ComponentProps<'a'>, 'children'> & {
  children?: string | undefined;
};

export default function SkipToContent({
  children = 'Skip to main content',
  className: customClassName,
  href = '#main-content',
  tabIndex = 0,
  ...rest
}: SkipToContentProps) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--skip-to-content`, customClassName);
  return (
    <a {...rest} className={className} href={href} tabIndex={tabIndex}>
      {children}
    </a>
  );
}

SkipToContent.propTypes = {
  /**
   * A ReactNode to display in the SkipToContent `a` tag.
   * `'Skip to main content'` by default.
   */
  children: PropTypes.string,

  className: PropTypes.string,

  /**
   * Provide the `href` to the id of the element on your package that is the
   * main content. `#main-content` by default.
   */
  href: PropTypes.string,

  /**
   * Optionally override the default tabindex of 0
   */
  tabIndex: PropTypes.string,
};



File: UIShell/SideNavIcon.tsx


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

export interface SideNavIconProps {
  /**
   * Provide a single icon as the child to `SideNavIcon` to render in the
   * container
   */
  children: React.ReactNode;

  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;

  /**
   * Specify whether the icon should be placed in a smaller bounding box
   * Since the 'small' prop is not provided, we make it optional and set a default value to `false`.
   */
  small?: boolean;
}

const SideNavIcon: React.FC<SideNavIconProps> = ({
  children,
  className: customClassName,
  small = false,
}) => {
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--side-nav__icon`]: true,
    [`${prefix}--side-nav__icon--small`]: small,
    [customClassName as string]: !!customClassName,
  });
  return <div className={className}>{children}</div>;
};

SideNavIcon.propTypes = {
  /**
   * Provide a single icon as the child to `SideNavIcon` to render in the
   * container
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify whether the icon should be placed in a smaller bounding box
   */
  small: PropTypes.bool,
};

export default SideNavIcon;



File: UIShell/HeaderName.tsx


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { type ElementType } from 'react';
import PropTypes from 'prop-types';
import Link, { type LinkProps, LinkPropTypes } from './Link';
import { usePrefix } from '../../internal/usePrefix';

export type HeaderNameProps<E extends ElementType> = LinkProps<E> & {
  prefix?: string | undefined;
};

export default function HeaderName<E extends ElementType = 'a'>({
  children,
  className: customClassName,
  prefix = 'IBM',
  ...rest
}: HeaderNameProps<E>) {
  const selectorPrefix = usePrefix();
  const className = cx(`${selectorPrefix}--header__name`, customClassName);
  return (
    <Link {...(rest as LinkProps<E>)} className={className}>
      {prefix && (
        <>
          <span className={`${selectorPrefix}--header__name--prefix`}>
            {prefix}
          </span>
          &nbsp;
        </>
      )}
      {children}
    </Link>
  );
}

HeaderName.propTypes = {
  /**
   * Pass in a valid `element` to replace the underlying `<a>` tag with a
   * custom `Link` element
   */
  ...LinkPropTypes,

  /**
   * Pass in children that are either a string or can be read as a string by
   * screen readers
   */
  children: PropTypes.node.isRequired,

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,

  /**
   * Provide an href for the name to link to
   */
  href: PropTypes.string,

  /**
   * Optionally specify a prefix to your header name. Useful for companies, for
   * example: IBM [Product Name] versus solely [Product Name]
   */
  prefix: PropTypes.string,
};



File: UIShell/Content.ts


/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { HTMLAttributes, ReactNode } from 'react';
import { usePrefix } from '../../internal/usePrefix';

export type ContentProps = HTMLAttributes<HTMLElement> & {
  /**
   * Provide children nodes to be rendered in the content container
   */
  children?: ReactNode;

  /**
   * Optionally provide a custom class name that is applied to the container
   */
  className?: string;

  /**
   * Optionally specify the tag of the content node. Defaults to `main`
   */
  tagName?: string;
};

const Content = ({
  className: customClassName,
  children,
  tagName = 'main',
  ...rest
}: ContentProps) => {
  const prefix = usePrefix();
  const className = cx(`${prefix}--content`, customClassName);
  return React.createElement(
    tagName,
    {
      ...rest,
      className,
    },
    children
  );
};

Content.propTypes = {
  /**
   * Provide children nodes to be rendered in the content container
   */
  children: PropTypes.node,

  /**
   * Optionally provide a custom class name that is applied to the container
   */
  className: PropTypes.string,

  /**
   * Optionally specify the tag of the content node. Defaults to `main`
   */
  tagName: PropTypes.string,
};

export default Content;



File: UIShell/SideNavItem.tsx


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

export interface SideNavItemProps {
  /**
   * Provide a single icon as the child to `SideNavItem` to render in the
   * container
   */
  children: React.ReactNode;

  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;

  /**
   * Specify if this is a large variation of the SideNavItem
   */
  large?: boolean;
}

const SideNavItem: React.FC<SideNavItemProps> = ({
  className: customClassName,
  children,
  large = false,
}: SideNavItemProps) => {
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--side-nav__item`]: true,
    [`${prefix}--side-nav__item--large`]: large,
    [customClassName as string]: !!customClassName,
  });
  return <li className={className}>{children}</li>;
};

SideNavItem.propTypes = {
  /**
   * Provide a single icon as the child to `SideNavItem` to render in the
   * container
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify if this is a large variation of the SideNavItem
   */
  large: PropTypes.bool,
};

export default SideNavItem;



