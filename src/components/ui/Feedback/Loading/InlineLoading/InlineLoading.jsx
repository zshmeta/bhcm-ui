import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../../System/ClassPrefix'
import Loading from '../Loading/Loading'
import {
  InactiveStatus,
  InlineLoadingAnimation,
  InlineLoadingRoot,
  InlineLoadingText,
  StatusIcon,
  VisuallyHidden,
} from './InlineLoading.styles'

const STATUSES = ['inactive', 'active', 'finished', 'error']

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

function CheckIcon({ title, className }) {
  return (
    <StatusIcon
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <path
        fill="currentColor"
        d="M13 22.2 6.8 16l-1.4 1.4L13 25 27 11l-1.4-1.4z"
      />
    </StatusIcon>
  )
}

function ErrorIcon({ title, className }) {
  return (
    <StatusIcon
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
      className={className}
      $kind="error"
    >
      <title>{title}</title>
      <path
        fill="currentColor"
        d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"
      />
      <path fill="currentColor" d="M15 8h2v11h-2z" />
      <path fill="currentColor" d="M15 21h2v3h-2z" />
    </StatusIcon>
  )
}

export default function InlineLoading({
  className,
  status = 'active',
  iconDescription,
  description,
  onSuccess,
  successDelay = 1500,
  ...rest
}) {
  const prefix = useClassPrefix()
  const loadingClasses = cx(`${prefix}--inline-loading`, className)
  const timerRef = useRef(null)

  useEffect(() => {
    if (status === 'finished') {
      timerRef.current = setTimeout(() => {
        if (onSuccess) onSuccess()
      }, successDelay)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [status, onSuccess, successDelay])

  const getLoading = () => {
    let iconLabel = iconDescription || status

    if (status === 'error') {
      return <ErrorIcon title={iconLabel} className={`${prefix}--inline-loading--error`} />
    }

    if (status === 'finished') {
      return (
        <CheckIcon
          title={iconLabel}
          className={`${prefix}--inline-loading__checkmark-container`}
        />
      )
    }

    if (status === 'active') {
      if (!iconDescription) iconLabel = 'loading'
      return (
        <Loading
          small
          description={iconLabel}
          withOverlay={false}
          active={status === 'active'}
        />
      )
    }

    if (status === 'inactive') {
      if (!iconDescription) iconLabel = 'not loading'
      return (
        <InactiveStatus
          className={`${prefix}--inline-loading__inactive-status`}
          title={iconLabel}
        >
          <VisuallyHidden>{iconLabel}</VisuallyHidden>
        </InactiveStatus>
      )
    }

    return null
  }

  const loadingText = description ? (
    <InlineLoadingText className={`${prefix}--inline-loading__text`}>{description}</InlineLoadingText>
  ) : null

  const loading = getLoading()
  const loadingAnimation = loading ? (
    <InlineLoadingAnimation className={`${prefix}--inline-loading__animation`}>{loading}</InlineLoadingAnimation>
  ) : null

  return (
    <InlineLoadingRoot
      className={loadingClasses}
      {...rest}
      aria-live={rest['aria-live'] ?? 'assertive'}
    >
      {loadingAnimation}
      {loadingText}
    </InlineLoadingRoot>
  )
}

InlineLoading.propTypes = {
  className: PropTypes.string,
  description: PropTypes.node,
  iconDescription: PropTypes.string,
  onSuccess: PropTypes.func,
  status: PropTypes.oneOf(STATUSES),
  successDelay: PropTypes.number,
}
