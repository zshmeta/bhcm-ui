import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { StyledChatButton } from './ChatButton.styles'

const ALLOWED_SIZES = ['sm', 'md', 'lg']

const ChatButton = forwardRef(function ChatButton(
  {
    className,
    children,
    disabled = false,
    isQuickAction = false,
    isSelected = false,
    kind = 'primary',
    renderIcon,
    size = 'lg',
    ...rest
  },
  ref
) {
  let resolvedKind = kind
  let resolvedSize = size
  let resolvedDisabled = disabled

  if (isQuickAction) {
    resolvedKind = 'ghost'
    resolvedSize = 'sm'
  } else {
    if (resolvedSize && !ALLOWED_SIZES.includes(resolvedSize)) {
      // keep parity with Carbon behavior; fails safe to lg
      // eslint-disable-next-line no-console
      console.error(
        `Invalid size "${resolvedSize}" provided to ChatButton. Size must be one of: ${ALLOWED_SIZES.join(
          ', '
        )}. Defaulting to "lg".`
      )
      resolvedSize = 'lg'
    }
  }

  if (isSelected) {
    resolvedDisabled = true
  }

  return (
    <StyledChatButton
      {...rest}
      ref={ref}
      className={className}
      disabled={resolvedDisabled}
      kind={resolvedKind}
      size={resolvedSize}
      renderIcon={renderIcon}
      $isQuickAction={isQuickAction}
      $isSelected={isSelected}
      aria-disabled={resolvedDisabled || undefined}>
      {children}
    </StyledChatButton>
  )
})

ChatButton.displayName = 'ChatButton'

ChatButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isQuickAction: PropTypes.bool,
  isSelected: PropTypes.bool,
  kind: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost', 'tertiary']),
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
}

export default ChatButton
