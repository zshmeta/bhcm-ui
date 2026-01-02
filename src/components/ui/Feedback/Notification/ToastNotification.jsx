import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import NotificationIcon from './NotificationIcon'
import NotificationButton from './NotificationButton'
import {
  NotificationCaption,
  NotificationDetails,
  NotificationRoot,
  NotificationSubtitle,
  NotificationTitle,
} from './Notification.styles'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

export default function ToastNotification({
  ['aria-label']: ariaLabel,
  // deprecated
  ariaLabel: deprecatedAriaLabel,
  role = 'status',
  onClose,
  onCloseButtonClick = () => {},
  statusIconDescription,
  className,
  children,
  kind = 'error',
  lowContrast,
  hideCloseButton = false,
  timeout = 0,
  title,
  caption,
  subtitle,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(true)
  const prefix = useClassPrefix()

  const containerClassName = cx(
    className,
    `${prefix}--toast-notification`,
    lowContrast && `${prefix}--toast-notification--low-contrast`,
    `${prefix}--toast-notification--${kind}`
  )

  const savedOnClose = useRef(onClose)
  useEffect(() => {
    savedOnClose.current = onClose
  })

  const handleClose = evt => {
    if (!onClose || onClose(evt) !== false) {
      setIsOpen(false)
    }
  }

  function handleCloseButtonClick(event) {
    onCloseButtonClick(event)
    handleClose(event)
  }

  useEffect(() => {
    if (!timeout) return undefined

    const timeoutId = window.setTimeout(() => {
      setIsOpen(false)
      savedOnClose.current?.(undefined)
    }, timeout)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [timeout])

  if (!isOpen) return null

  return (
    <NotificationRoot
      {...rest}
      role={role}
      className={containerClassName}
      $type="toast"
      $kind={kind}
    >
      <NotificationIcon kind={kind} iconDescription={statusIconDescription || `${kind} icon`} />
      <NotificationDetails className={`${prefix}--toast-notification__details`}>
        {title ? <NotificationTitle className={`${prefix}--toast-notification__title`}>{title}</NotificationTitle> : null}
        {subtitle ? (
          <NotificationSubtitle className={`${prefix}--toast-notification__subtitle`}>{subtitle}</NotificationSubtitle>
        ) : null}
        {caption ? <NotificationCaption className={`${prefix}--toast-notification__caption`}>{caption}</NotificationCaption> : null}
        {children}
      </NotificationDetails>
      {!hideCloseButton ? (
        <NotificationButton
          aria-label={deprecatedAriaLabel || ariaLabel}
          onClick={handleCloseButtonClick}
        />
      ) : null}
    </NotificationRoot>
  )
}

ToastNotification.propTypes = {
  ['aria-label']: PropTypes.string,
  ariaLabel: PropTypes.string,
  caption: PropTypes.string,
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
  timeout: PropTypes.number,
  title: PropTypes.string,
}
