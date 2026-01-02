import React, { forwardRef, useId, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { StyledHelp, StyledInput, StyledLabel, StyledTrack, StyledWrap } from './Slider.styles'

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

const Slider = forwardRef(function Slider(
  {
    className,
    disabled = false,
    hideLabel = false,
    id,
    labelText,
    min = 0,
    max = 100,
    step = 1,
    twoHandles = false,
    value,
    valueUpper,
    defaultValue,
    defaultValueUpper,
    ariaLabel = 'slider handle',
    unstable_ariaLabelHandleUpper = 'upper slider handle',
    invalid = false,
    invalidText,
    warn = false,
    warnText,
    onChange,
    onRelease,
    ...rest
  },
  ref
) {
  const uid = useId()
  const inputId = id || `slider-${uid}`

  const isControlled = value !== undefined
  const isUpperControlled = valueUpper !== undefined

  const [lowerState, setLowerState] = useState(
    defaultValue !== undefined ? Number(defaultValue) : Number(min)
  )
  const [upperState, setUpperState] = useState(
    defaultValueUpper !== undefined ? Number(defaultValueUpper) : Number(max)
  )

  const lower = clamp(Number(isControlled ? value : lowerState), Number(min), Number(max))
  const upperRaw = clamp(
    Number(isUpperControlled ? valueUpper : upperState),
    Number(min),
    Number(max)
  )
  const upper = twoHandles ? Math.max(lower, upperRaw) : upperRaw

  const messageId = useMemo(() => `${inputId}__message`, [inputId])
  const describedBy = (invalid || warn) ? messageId : rest['aria-describedby']

  const emit = (evt, nextLower, nextUpper) => {
    onChange?.(evt, { value: nextLower, valueUpper: nextUpper })
  }
  const emitRelease = (evt, nextLower, nextUpper) => {
    onRelease?.(evt, { value: nextLower, valueUpper: nextUpper })
  }

  return (
    <StyledWrap className={className}>
      {labelText ? (
        <StyledLabel htmlFor={inputId} $hidden={hideLabel}>
          {labelText}
        </StyledLabel>
      ) : null}

      <StyledTrack>
        <StyledInput
          {...rest}
          ref={ref}
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-describedby={describedBy}
          value={lower}
          onChange={evt => {
            const next = clamp(Number(evt.target.value), Number(min), Number(max))
            const nextLower = twoHandles ? Math.min(next, upper) : next
            if (!isControlled) setLowerState(nextLower)
            emit(evt, nextLower, twoHandles ? upper : undefined)
          }}
          onMouseUp={evt => emitRelease(evt, lower, twoHandles ? upper : undefined)}
          onTouchEnd={evt => emitRelease(evt, lower, twoHandles ? upper : undefined)}
        />

        {twoHandles ? (
          <StyledInput
            type="range"
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            aria-label={unstable_ariaLabelHandleUpper}
            aria-describedby={describedBy}
            value={upper}
            onChange={evt => {
              const next = clamp(Number(evt.target.value), Number(min), Number(max))
              const nextUpper = Math.max(next, lower)
              if (!isUpperControlled) setUpperState(nextUpper)
              emit(evt, lower, nextUpper)
            }}
            onMouseUp={evt => emitRelease(evt, lower, upper)}
            onTouchEnd={evt => emitRelease(evt, lower, upper)}
          />
        ) : null}
      </StyledTrack>

      {invalid ? (
        <StyledHelp id={messageId} $variant="invalid">
          {invalidText}
        </StyledHelp>
      ) : warn ? (
        <StyledHelp id={messageId} $variant="warn">
          {warnText}
        </StyledHelp>
      ) : null}
    </StyledWrap>
  )
})

Slider.displayName = 'Slider'

Slider.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  labelText: PropTypes.node,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  twoHandles: PropTypes.bool,
  value: PropTypes.number,
  valueUpper: PropTypes.number,
  defaultValue: PropTypes.number,
  defaultValueUpper: PropTypes.number,
  ariaLabel: PropTypes.string,
  unstable_ariaLabelHandleUpper: PropTypes.string,
  invalid: PropTypes.bool,
  invalidText: PropTypes.node,
  warn: PropTypes.bool,
  warnText: PropTypes.node,
  onChange: PropTypes.func,
  onRelease: PropTypes.func,
}

export default Slider
