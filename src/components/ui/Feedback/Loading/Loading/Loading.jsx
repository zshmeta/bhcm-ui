import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../../System/ClassPrefix'
import {
  LoadingCircle,
  LoadingCircleBg,
  LoadingOverlay,
  LoadingRoot,
  LoadingSvg,
} from './Loading.styles'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

export default function Loading({
  active = true,
  className,
  withOverlay = true,
  small = false,
  description = 'loading',
  // `id` is deprecated in Carbon; accept and ignore.
  id: _id,
  ...rest
}) {
  const prefix = useClassPrefix()

  const loadingClassName = cx(
    className,
    `${prefix}--loading`,
    small && `${prefix}--loading--small`,
    !active && `${prefix}--loading--stop`,
    !active && 'bhcm-loading--stop'
  )

  const overlayClassName = cx(
    `${prefix}--loading-overlay`,
    !active && `${prefix}--loading-overlay--stop`
  )

  const loading = (
    <LoadingRoot
      {...rest}
      aria-atomic="true"
      aria-live={active ? 'assertive' : 'off'}
      className={loadingClassName}
    >
      <LoadingSvg
        className={`${prefix}--loading__svg`}
        viewBox="0 0 100 100"
        $small={small}
      >
        <title>{description}</title>
        {small ? (
          <LoadingCircleBg
            className={`${prefix}--loading__background`}
            cx="50%"
            cy="50%"
            r="42"
          />
        ) : null}
        <LoadingCircle
          className={`${prefix}--loading__stroke`}
          cx="50%"
          cy="50%"
          r={small ? '42' : '44'}
        />
      </LoadingSvg>
    </LoadingRoot>
  )

  return withOverlay ? (
    <LoadingOverlay className={overlayClassName} $active={active}>
      {loading}
    </LoadingOverlay>
  ) : (
    loading
  )
}

Loading.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  small: PropTypes.bool,
  withOverlay: PropTypes.bool,
}
