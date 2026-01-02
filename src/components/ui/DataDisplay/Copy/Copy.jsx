import React, { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Root, Tooltip } from './Copy.styles'

function noop() {}

/**
 * Copy
 *
 * Preserved Carbon behaviors:
 * - Shows tooltip label using `aria-label` as the default message.
 * - On click, temporarily shows `feedback` for `feedbackTimeout`.
 * - Supports `align` and `autoAlign` props for API parity.
 */
const Copy = forwardRef(function Copy(
  {
    align = 'bottom',
    autoAlign = false, // API parity; not used (no auto positioning)
    children,
    className,
    feedback = 'Copied!',
    feedbackTimeout = 2000,
    onAnimationEnd,
    onClick = noop,
    ...rest
  },
  ref
) {
  const tooltipId = useId()
  const [hovered, setHovered] = useState(false)
  const [animating, setAnimating] = useState(false)

  const clearTimer = useRef(null)

  const initialLabel = rest['aria-label'] ?? ''

  const label = animating ? feedback : initialLabel

  const open = Boolean(label) && (hovered || animating)

  const handleStop = useCallback(() => {
    setAnimating(false)
  }, [])

  const startFeedback = useCallback(() => {
    setAnimating(true)

    if (clearTimer.current) {
      clearTimeout(clearTimer.current)
      clearTimer.current = null
    }

    clearTimer.current = setTimeout(() => {
      handleStop()
    }, feedbackTimeout)
  }, [feedbackTimeout, handleStop])

  useEffect(() => {
    return () => {
      if (clearTimer.current) clearTimeout(clearTimer.current)
    }
  }, [])

  const ariaLabel = useMemo(() => {
    if (children) return undefined
    return label || undefined
  }, [children, label])

  return (
    <Root
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <Button
        ref={ref}
        type="button"
        $animating={animating}
        aria-describedby={open ? tooltipId : undefined}
        aria-label={ariaLabel}
        onClick={evt => {
          onClick?.(evt)
          if (evt.defaultPrevented) return
          startFeedback()
        }}
        onAnimationEnd={evt => {
          onAnimationEnd?.(evt)
        }}
        {...rest}
      >
        {children}
      </Button>

      {label ? (
        <Tooltip id={tooltipId} role="tooltip" $open={open} $align={align} data-autoalign={autoAlign ? 'true' : undefined}>
          {label}
        </Tooltip>
      ) : null}
    </Root>
  )
})

Copy.displayName = 'Copy'

Copy.propTypes = {
  align: PropTypes.string,
  autoAlign: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  feedback: PropTypes.string,
  feedbackTimeout: PropTypes.number,
  onAnimationEnd: PropTypes.func,
  onClick: PropTypes.func,
}

export default Copy
