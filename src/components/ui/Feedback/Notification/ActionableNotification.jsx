import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import NotificationIcon from './NotificationIcon'
import NotificationButton from './NotificationButton'
import NotificationActionButton from './NotificationActionButton'
import {
  ActionableButtonWrap,
  NotificationCaption,
  NotificationDetails,
  NotificationRoot,
  NotificationSubtitle,
  NotificationTitle,
} from './Notification.styles'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

function getFocusableElements(container) {
  if (!container) return []

  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(',')

  const nodes = Array.from(container.querySelectorAll(selector))
  return nodes.filter(node => {
    if (!(node instanceof HTMLElement)) return false
    const style = window.getComputedStyle(node)
    return style.visibility !== 'hidden' && style.display !== 'none'
  })
}

export default function ActionableNotification({
  actionButtonLabel,
  ['aria-label']: ariaLabel,
  // deprecated
  ariaLabel: deprecatedAriaLabel,
  caption,
  children,
  role = 'alertdialog',
  onActionButtonClick,
  onClose,
  onCloseButtonClick = () => {},
  statusIconDescription,
  className,
  inline = false,
  kind = 'error',
  lowContrast,
  hideCloseButton = false,
  hasFocus = true,
  closeOnEscape = true,
  title,
  subtitle,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(true)
  const prefix = useClassPrefix()
  const titleId = useMemo(() => `actionable-notification-title-${Math.random().toString(16).slice(2)}`, [])
  const subtitleId = useMemo(() => `actionable-notification-subtitle-${Math.random().toString(16).slice(2)}`, [])

  const ref = useRef(null)
  const actionButtonRef = useRef(null)

  const containerClassName = cx(
    className,
    `${prefix}--actionable-notification`,
    !inline && `${prefix}--actionable-notification--toast`,
    lowContrast && `${prefix}--actionable-notification--low-contrast`,
    `${prefix}--actionable-notification--${kind}`,
    hideCloseButton && `${prefix}--actionable-notification--hide-close-button`
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

  // Initial focus (Carbon: focus action button for alertdialog).
  useEffect(() => {
    if (!isOpen) return
    if (!hasFocus) return
    if (role !== 'alertdialog') return
    actionButtonRef.current?.focus?.()
  })

  // Escape-to-close
  useEffect(() => {
    if (!isOpen) return
    if (!closeOnEscape) return

    const onDocKeyDown = event => {
      if (event.key !== 'Escape') return
      if (!ref.current) return
      if (!(event.target instanceof Node) || !ref.current.contains(event.target)) return

      event.preventDefault()
      event.stopPropagation()
      handleCloseButtonClick(event)
    }

    document.addEventListener('keydown', onDocKeyDown, true)
    return () => document.removeEventListener('keydown', onDocKeyDown, true)
  }, [closeOnEscape, isOpen])

  const onKeyDown = event => {
    if (role !== 'alertdialog') return

    if (event.key === 'Tab' && ref.current) {
      const focusables = getFocusableElements(ref.current)
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement

      if (event.shiftKey) {
        if (active === first || !ref.current.contains(active)) {
          event.preventDefault()
          last.focus()
        }
      } else {
        if (active === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
  }

  if (!isOpen) return null

  return (
    <NotificationRoot
      {...rest}
      ref={ref}
      role={role}
      className={containerClassName}
      aria-labelledby={title ? titleId : subtitleId}
      onKeyDown={onKeyDown}
      $type={inline ? 'inline' : 'toast'}
      $kind={kind}
    >
      <div className={`${prefix}--actionable-notification__details`}>
        <NotificationIcon
          kind={kind}
          iconDescription={statusIconDescription || `${kind} icon`}
        />
        <NotificationDetails className={`${prefix}--actionable-notification__text-wrapper`}>
          <div className={`${prefix}--actionable-notification__content`}>
            {title ? (
              <NotificationTitle id={titleId} className={`${prefix}--actionable-notification__title`}>
                {title}
              </NotificationTitle>
            ) : null}
            {subtitle ? (
              <NotificationSubtitle id={subtitleId} className={`${prefix}--actionable-notification__subtitle`}>
                {subtitle}
              </NotificationSubtitle>
            ) : null}
            {caption ? (
              <NotificationCaption className={`${prefix}--actionable-notification__caption`}>
                {caption}
              </NotificationCaption>
            ) : null}
            {children}
          </div>
        </NotificationDetails>
      </div>

      <ActionableButtonWrap className={`${prefix}--actionable-notification__button-wrapper`}>
        {actionButtonLabel ? (
              <NotificationActionButton
            type="button"
            className={`${prefix}--actionable-notification__action-button`}
            onClick={onActionButtonClick}
            ref={actionButtonRef}
          >
            {actionButtonLabel}
          </NotificationActionButton>
        ) : null}

        {!hideCloseButton ? (
          <NotificationButton
            aria-label={deprecatedAriaLabel || ariaLabel}
            onClick={handleCloseButtonClick}
          />
        ) : null}
      </ActionableButtonWrap>
    </NotificationRoot>
  )
}

ActionableNotification.propTypes = {
  actionButtonLabel: PropTypes.string,
  ['aria-label']: PropTypes.string,
  ariaLabel: PropTypes.string,
  caption: PropTypes.string,
  children: PropTypes.node,
  role: PropTypes.string,
  onActionButtonClick: PropTypes.func,
  onClose: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  statusIconDescription: PropTypes.string,
  className: PropTypes.string,
  inline: PropTypes.bool,
  kind: PropTypes.oneOf([
    'error',
    'info',
    'info-square',
    'success',
    'warning',
    'warning-alt',
  ]),
  lowContrast: PropTypes.bool,
  hideCloseButton: PropTypes.bool,
  hasFocus: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.node,
}
