File: ChatButton/ChatButton.Skeleton.tsx


/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
export interface ChatButtonSkeletonProps {
  /**
   * Specify an optional className to add.
   */
  className?: string;
  /**
   * Specify the size of the `ChatButtonSkeleton`, from the following list of sizes:
   */
  size?: 'sm' | 'md' | 'lg';
}
const ChatButtonSkeleton = ({
  className,
  size,
  ...rest
}: ChatButtonSkeletonProps) => {
  const prefix = usePrefix();
  const skeletonClasses = cx(
    className,
    `${prefix}--skeleton`,
    `${prefix}--btn`,
    `${prefix}--chat-btn`,
    { [`${prefix}--layout--size-${size}`]: size }
  );

  return <div className={skeletonClasses} {...rest} />;
};

ChatButtonSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify the size of the `ChatButtonSkeleton`, from the following list of sizes:
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default ChatButtonSkeleton;



File: ChatButton/ChatButton.tsx


/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ComponentType, type FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button';
import { usePrefix } from '../../internal/usePrefix';

export type ChatButtonKind =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'ghost'
  | 'tertiary';
export type ChatButtonSize = 'sm' | 'md' | 'lg';

export interface ChatButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Provide the contents of your Select
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be applied to the node containing the label and the select box
   */
  className?: string;
  /**
   * Specify whether the `ChatButton` should be disabled
   */
  disabled?: boolean;
  /**
   * Specify whether the `ChatButton` should be rendered as a quick action button
   */
  isQuickAction?: boolean;
  /**
   * Specify whether the quick action `ChatButton` should be rendered as selected. This disables the input
   */
  isSelected?: boolean;
  /**
   * Specify the kind of `ChatButton` you want to create
   */
  kind?: ChatButtonKind;

  /**
   * A component used to render an icon.
   */
  renderIcon?: ComponentType | FunctionComponent;
  /**
   * Specify the size of the `ChatButton`, from the following list of sizes:
   */
  size?: ChatButtonSize;
}

const ChatButton = React.forwardRef<HTMLButtonElement, ChatButtonProps>(
  function ChatButton(
    {
      className,
      children,
      disabled,
      isQuickAction,
      isSelected,
      kind,
      renderIcon,
      size,
      ...other
    }: ChatButtonProps,
    ref
  ) {
    const prefix = usePrefix();
    const classNames = classnames(className, {
      [`${prefix}--chat-btn`]: true,
      [`${prefix}--chat-btn--with-icon`]: renderIcon,
      [`${prefix}--chat-btn--quick-action`]: isQuickAction,
      [`${prefix}--chat-btn--quick-action--selected`]: isSelected,
    });

    const allowedSizes: ChatButtonSize[] = ['sm', 'md', 'lg'];

    if (isQuickAction) {
      kind = 'ghost';
      size = 'sm';
    } else {
      // Check if size is valid and warn if not
      if (size && !allowedSizes.includes(size as ChatButtonSize)) {
        // eslint-disable-next-line no-console -- https://github.com/carbon-design-system/carbon/issues/20452
        console.error(
          `Invalid size "${size}" provided to ChatButton. Size must be one of: ${allowedSizes.join(
            ', '
          )}. Defaulting to "lg".`
        );
        size = 'lg';
      }
    }

    return (
      <Button
        disabled={disabled}
        className={classNames}
        kind={kind}
        ref={ref}
        size={size as ChatButtonSize}
        renderIcon={renderIcon}
        {...other}>
        {children}
      </Button>
    );
  }
);

ChatButton.propTypes = {
  /**
   * Provide the contents of your Select
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the node containing the label and the select box
   */
  className: PropTypes.string,

  /**
   * Specify whether the `ChatButton` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether the `ChatButton` should be rendered as a quick action button
   */
  isQuickAction: PropTypes.bool,

  /**
   * Specify whether the quick action `ChatButton` should be rendered as selected. This disables the input
   */
  isSelected: PropTypes.bool,

  /**
   * Specify the kind of `ChatButton` you want to create
   */
  kind: PropTypes.oneOf([
    'primary',
    'secondary',
    'danger',
    'ghost',
    'tertiary',
  ]),

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the `ChatButton`, from the following list of sizes:
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default ChatButton;



File: ChatButton/chat-button-story.scss


//
// Copyright IBM Corp. 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

div[class*='test-button-'] {
  margin-bottom: 4rem;

  & > * {
    margin-right: 2rem;
  }
}



File: ChatButton/index.tsx


/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ChatButton from './ChatButton';
import { type ChatButtonProps } from './ChatButton';
import { type ChatButtonSkeletonProps } from './ChatButton.Skeleton';

export default ChatButton;
export { ChatButton, type ChatButtonProps, type ChatButtonSkeletonProps };
export { default as ChatButtonSkeleton } from './ChatButton.Skeleton';



File: ChatButton/ChatButton.stories.js


/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ChatButton, ChatButtonSkeleton } from './';
import { Add } from '@carbon/icons-react';
import './chat-button-story.scss';

export default {
  title: 'Preview/preview__ChatButton',
  component: ChatButton,
  parameters: {},
};

export const Default = () => (
  <div className="test-button">
    <div className="test-button-sizes">
      <h3>Sizes</h3>
      <br />
      <ChatButton size="sm" renderIcon={Add}>
        Primary
      </ChatButton>
      <ChatButton size="md" renderIcon={Add}>
        Primary
      </ChatButton>
      <ChatButton size="lg" renderIcon={Add}>
        Primary
      </ChatButton>
      <br />
      <br />
      <ChatButton size="sm">Primary</ChatButton>
      <ChatButton size="md">Primary</ChatButton>
      <ChatButton size="lg">Primary</ChatButton>
    </div>
    <div className="test-button-kinds">
      <h3>Kinds</h3>
      <br />
      <ChatButton kind="primary" renderIcon={Add}>
        Primary
      </ChatButton>
      <ChatButton kind="secondary" renderIcon={Add}>
        Secondary
      </ChatButton>
      <ChatButton kind="tertiary" renderIcon={Add}>
        Tertiary
      </ChatButton>
      <ChatButton kind="ghost" renderIcon={Add}>
        Ghost
      </ChatButton>
      <ChatButton kind="danger" renderIcon={Add}>
        Danger
      </ChatButton>
      <br />
      <br />
      <ChatButton kind="primary">Primary</ChatButton>
      <ChatButton kind="secondary">Secondary</ChatButton>
      <ChatButton kind="tertiary">Tertiary</ChatButton>
      <ChatButton kind="ghost">Ghost</ChatButton>
      <ChatButton kind="danger">Danger</ChatButton>
    </div>
    <div className="test-button-quick-action">
      <h3>Quick action</h3>
      <br />
      <ChatButton isQuickAction renderIcon={Add}>
        Quick action
      </ChatButton>
      <ChatButton isSelected isQuickAction renderIcon={Add}>
        Selected and Enabled
      </ChatButton>
      <ChatButton disabled isSelected isQuickAction renderIcon={Add}>
        Selected and Disabled
      </ChatButton>
      <ChatButton disabled isQuickAction renderIcon={Add}>
        Disabled
      </ChatButton>
      <br />
      <br />
      <ChatButton isQuickAction>Quick action</ChatButton>
      <ChatButton isSelected isQuickAction>
        Selected and Enabled
      </ChatButton>
      <ChatButton disabled isSelected isQuickAction>
        Selected and Disabled
      </ChatButton>
      <ChatButton disabled isQuickAction>
        Disabled
      </ChatButton>
    </div>

    <div className="test-button-skeleton">
      <h3>Skeleton</h3>
      <br />
      <ChatButtonSkeleton size="sm" />
      <ChatButtonSkeleton size="md" />
      <ChatButtonSkeleton />
    </div>
  </div>
);



