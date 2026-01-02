import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import NotificationIcon from './NotificationIcon'
import NotificationActionButton from './NotificationActionButton'
import {
  ActionableButtonWrap,
  NotificationDetails,
  NotificationRoot,
  NotificationSubtitle,
  NotificationTitle,
} from './Notification.styles'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

export default function Callout({
  actionButtonLabel,
  children,
  onActionButtonClick,
  title,
  titleId,
  subtitle,
  statusIconDescription,
  className,
  kind = 'info',
  lowContrast,
  ...rest
}) {
  const prefix = useClassPrefix()

  const containerClassName = cx(
    className,
    `${prefix}--actionable-notification`,
    lowContrast && `${prefix}--actionable-notification--low-contrast`,
    `${prefix}--actionable-notification--${kind}`,
    `${prefix}--actionable-notification--hide-close-button`
  )

  return (
    <NotificationRoot
      {...rest}
      role="status"
      className={containerClassName}
      $type="inline"
      $kind={kind}
    >
      <div className={`${prefix}--actionable-notification__details`}>
        <NotificationIcon
          kind={kind}
          iconDescription={statusIconDescription || `${kind} icon`}
        />
        <NotificationDetails className={`${prefix}--actionable-notification__text-wrapper`}>
          {title ? (
            <NotificationTitle id={titleId} className={`${prefix}--actionable-notification__title`}>
              {title}
            </NotificationTitle>
          ) : null}
          {subtitle ? (
            <NotificationSubtitle className={`${prefix}--actionable-notification__subtitle`}>
              {subtitle}
            </NotificationSubtitle>
          ) : null}
          {children}
        </NotificationDetails>
      </div>

      <ActionableButtonWrap className={`${prefix}--actionable-notification__button-wrapper`}>
        {actionButtonLabel ? (
          <NotificationActionButton
            onClick={onActionButtonClick}
            aria-describedby={titleId}
            inline
            className={`${prefix}--actionable-notification__action-button`}
          >
            {actionButtonLabel}
          </NotificationActionButton>
        ) : null}
      </ActionableButtonWrap>
    </NotificationRoot>
  )
}

Callout.propTypes = {
  actionButtonLabel: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  kind: PropTypes.oneOf([
    'error',
    'info',
    'info-square',
    'success',
    'warning',
    'warning-alt',
  ]),
  lowContrast: PropTypes.bool,
  onActionButtonClick: PropTypes.func,
  statusIconDescription: PropTypes.string,
  subtitle: PropTypes.node,
  title: PropTypes.string,
  titleId: PropTypes.string,
}
