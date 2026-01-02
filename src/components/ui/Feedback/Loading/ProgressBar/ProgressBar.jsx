import React, { useEffect, useId, useLayoutEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../../System/ClassPrefix'
import {
  Bar,
  HelperText,
  LabelRow,
  LabelText,
  ProgressBarRoot,
  StatusIcon,
  Track,
  VisuallyHidden,
} from './ProgressBar.styles'

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

function CheckIcon({ title, className }) {
  return (
    <StatusIcon viewBox="0 0 32 32" role="img" aria-label={title} className={className}>
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

export default function ProgressBar({
  className,
  helperText,
  hideLabel,
  label,
  max = 100,
  size = 'big',
  status = 'active',
  type = 'default',
  value,
}) {
  const prefix = useClassPrefix()

  const labelId = useId()
  const helperId = useId()
  const helperTextId = useId()

  const isFinished = status === 'finished'
  const isError = status === 'error'

  const indeterminate = !isFinished && !isError && (value === null || value === undefined)

  let cappedValue = value
  if (cappedValue != null && cappedValue > max) cappedValue = max
  if (cappedValue != null && cappedValue < 0) cappedValue = 0
  if (isError) cappedValue = 0
  else if (isFinished) cappedValue = max

  const percentage = (cappedValue ?? NaN) / max

  const rootClassName = cx(
    `${prefix}--progress-bar`,
    `${prefix}--progress-bar--${size}`,
    `${prefix}--progress-bar--${type}`,
    indeterminate && `${prefix}--progress-bar--indeterminate`,
    isFinished && `${prefix}--progress-bar--finished`,
    isError && `${prefix}--progress-bar--error`,
    className
  )

  const barRef = useRef(null)

  useIsoLayoutEffect(() => {
    if (!barRef.current) return
    if (!isFinished && !isError && !indeterminate) {
      barRef.current.style.transform = `scaleX(${percentage})`
    } else {
      barRef.current.style.transform = ''
    }
  }, [percentage, isFinished, isError, indeterminate])

  const Status = useMemo(() => {
    if (isError) return ErrorIcon
    if (isFinished) return CheckIcon
    return null
  }, [isError, isFinished])

  return (
    <ProgressBarRoot
      className={rootClassName}
      data-size={size}
      data-type={type}
    >
      <LabelRow
        data-part="label"
        className={cx(`${prefix}--progress-bar__label`, hideLabel && `${prefix}--visually-hidden`)}
        id={labelId}
      >
        <LabelText className={`${prefix}--progress-bar__label-text`}>{label}</LabelText>
        {Status ? <Status title={status} className={`${prefix}--progress-bar__status-icon`} /> : null}
      </LabelRow>

      <Track
        data-part="track"
        className={`${prefix}--progress-bar__track`}
        role="progressbar"
        aria-busy={!isFinished}
        aria-invalid={isError}
        aria-labelledby={labelId}
        aria-describedby={helperText ? helperTextId : undefined}
        aria-valuemin={!indeterminate ? 0 : undefined}
        aria-valuemax={!indeterminate ? max : undefined}
        aria-valuenow={!indeterminate ? cappedValue : undefined}
      >
        <Bar
          data-part="bar"
          className={`${prefix}--progress-bar__bar`}
          ref={barRef}
          $indeterminate={indeterminate}
        />
      </Track>

      {helperText ? (
        <HelperText
          id={helperTextId}
          className={`${prefix}--progress-bar__helper-text`}
        >
          {helperText}
          <VisuallyHidden aria-live="polite" id={helperId}>
            {isFinished ? 'Done' : 'Loading'}
          </VisuallyHidden>
        </HelperText>
      ) : null}
    </ProgressBarRoot>
  )
}

ProgressBar.propTypes = {
  className: PropTypes.string,
  helperText: PropTypes.string,
  hideLabel: PropTypes.bool,
  label: PropTypes.string.isRequired,
  max: PropTypes.number,
  size: PropTypes.oneOf(['small', 'big']),
  status: PropTypes.oneOf(['active', 'finished', 'error']),
  type: PropTypes.oneOf(['default', 'inline', 'indented']),
  value: PropTypes.number,
}
