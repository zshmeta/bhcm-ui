import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import NotificationIcon from './NotificationIcon'
import NotificationButton from './NotificationButton'
import {
  NotificationDetails,
  NotificationRoot,
  NotificationSubtitle,
  NotificationTitle,
} from './Notification.styles'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

export default function InlineNotification({
  ['aria-label']: ariaLabel,
  children,
  title,
  subtitle,
  role = 'status',
  onClose,
  onCloseButtonClick = () => {},
  statusIconDescription,
  className,
  kind = 'error',
  lowContrast,
  hideCloseButton = false,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(true)
  const prefix = useClassPrefix()

  const containerClassName = cx(
    className,
    `${prefix}--inline-notification`,
    lowContrast && `${prefix}--inline-notification--low-contrast`,
    `${prefix}--inline-notification--${kind}`,
    hideCloseButton && `${prefix}--inline-notification--hide-close-button`
  )

  const handleClose = evt => {
    if (!onClose || onClose(evt) !== false) {
      setIsOpen(false)
    }
  }

  function handleCloseButtonClick(event) {
    onCloseButtonClick(event)
    handleClose(event)
  }

  if (!isOpen) return null

  return (
    <NotificationRoot
      {...rest}
      role={role}
      className={containerClassName}
      $type="inline"
      $kind={kind}
    >
      <div className={`${prefix}--inline-notification__details`}>
        <NotificationIcon kind={kind} iconDescription={statusIconDescription || `${kind} icon`} />
        <NotificationDetails className={`${prefix}--inline-notification__text-wrapper`}>
          {title ? (
            <NotificationTitle className={`${prefix}--inline-notification__title`}>{title}</NotificationTitle>
          ) : null}
          {subtitle ? (
            <NotificationSubtitle className={`${prefix}--inline-notification__subtitle`}>{subtitle}</NotificationSubtitle>
          ) : null}
          {children}
        </NotificationDetails>
      </div>

      {!hideCloseButton ? (
        <NotificationButton aria-label={ariaLabel} onClick={handleCloseButtonClick} />
      ) : null}
    </NotificationRoot>
  )
}

InlineNotification.propTypes = {
  ['aria-label']: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  hideCloseButton: PropTypes.bool,
  kind: PropTypes.oneOf([
    'error',
    'info',
    'info-square',
    'success',
    'warning',
    'warning-alt',
  ]),
  lowContrast: PropTypes.bool,
  onClose: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  role: PropTypes.oneOf(['alert', 'log', 'status']),
  statusIconDescription: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
}
