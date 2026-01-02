import React from 'react'
import PropTypes from 'prop-types'
import { NotificationIconWrap } from './Notification.styles'

function InfoIcon({ title }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <path
        fill="currentColor"
        d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"
      />
      <path fill="currentColor" d="M15 14h2v10h-2z" />
      <path fill="currentColor" d="M15 8h2v3h-2z" />
    </svg>
  )
}

function CheckIcon({ title }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <path
        fill="currentColor"
        d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"
      />
      <path
        fill="currentColor"
        d="M14 22.2 8.8 17l-1.4 1.4L14 25l12-12-1.4-1.4z"
      />
    </svg>
  )
}

function WarningIcon({ title }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <path
        fill="currentColor"
        d="M16 4 2 28h28L16 4zm0 6.2L26.6 26H5.4L16 10.2z"
      />
      <path fill="currentColor" d="M15 14h2v7h-2z" />
      <path fill="currentColor" d="M15 23h2v2h-2z" />
    </svg>
  )
}

function ErrorIcon({ title }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <path
        fill="currentColor"
        d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"
      />
      <path fill="currentColor" d="M15 8h2v11h-2z" />
      <path fill="currentColor" d="M15 21h2v3h-2z" />
    </svg>
  )
}

export default function NotificationIcon({ kind, iconDescription }) {
  const title = iconDescription || `${kind} icon`

  let Icon = InfoIcon
  if (kind === 'error') Icon = ErrorIcon
  if (kind === 'success') Icon = CheckIcon
  if (kind === 'warning' || kind === 'warning-alt') Icon = WarningIcon

  return (
    <NotificationIconWrap>
      <Icon title={title} />
    </NotificationIconWrap>
  )
}

NotificationIcon.propTypes = {
  kind: PropTypes.oneOf([
    'error',
    'info',
    'info-square',
    'success',
    'warning',
    'warning-alt',
  ]),
  iconDescription: PropTypes.string,
}
