import React from 'react'
import PropTypes from 'prop-types'
import { NotificationCloseButton } from './Notification.styles'

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 4L12 12M12 4L4 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function NotificationButton({
  'aria-label': ariaLabel,
  ariaLabel: deprecatedAriaLabel,
  onClick,
  ...rest
}) {
  return (
    <NotificationCloseButton
    type="button"
    aria-label={ariaLabel || deprecatedAriaLabel}
    onClick={onClick}
    {...rest}
  >
      <CloseIcon />
    </NotificationCloseButton>
  )
}

NotificationButton.propTypes = {
  ['aria-label']: PropTypes.string,
  ariaLabel: PropTypes.string,
  name: PropTypes.string,
  notificationType: PropTypes.oneOf(['toast', 'inline', 'actionable']),
  onClick: PropTypes.func,
}
