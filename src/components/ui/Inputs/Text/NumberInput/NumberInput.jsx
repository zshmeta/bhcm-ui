import React, { forwardRef, useMemo, useRef, useState } from 'react'
import {
  StyledButtons,
  StyledHelp,
  StyledInput,
  StyledLabel,
  StyledStepButton,
  StyledWrap,
} from './NumberInput.styles'
import { useFormContext } from '../../FormWrapper/FormContext'

function clamp(num, min, max) {
  if (typeof min === 'number' && num < min) return min
  if (typeof max === 'number' && num > max) return max
  return num
}

const NumberInput = forwardRef(function NumberInput(
  {
    id,
    className,
    label,
    labelText,
    disabled = false,
    invalid = false,
    invalidText,
    warn = false,
    warnText,
    helperText,
    min,
    max,
    step = 1,
    allowEmpty = false,
    value,
    defaultValue,
    onChange,
    onClick,
    ...rest
  },
  ref
) {
  const { isFluid } = useFormContext()
  const inputRef = useRef(null)

  const resolvedLabel = labelText ?? label

  const messageId = useMemo(() => (id ? `${id}__message` : undefined), [id])
  const describedBy =
    (invalid || warn || helperText) && messageId
      ? messageId
      : rest['aria-describedby']

  const isControlled = value !== undefined
  const [uncontrolled, setUncontrolled] = useState(
    defaultValue !== undefined ? String(defaultValue) : ''
  )
  const currentString = isControlled ? String(value ?? '') : uncontrolled

  function emitChange(evt, nextValue, direction) {
    onChange?.(evt, { value: nextValue, direction })
  }

  function setNext(evt, nextString, direction) {
    if (!isControlled) setUncontrolled(nextString)
    const numeric = nextString === '' ? '' : Number(nextString)
    emitChange(evt, numeric, direction)
  }

  function stepBy(evt, direction) {
    const dir = direction === 'up' ? 1 : -1

    const raw = inputRef.current?.value ?? currentString
    const base = raw === '' ? 0 : Number(raw)
    const nextNum = clamp(base + dir * (step || 1), min, max)

    setNext(evt, String(nextNum), direction)
    onClick?.(evt, { value: nextNum, direction })
    inputRef.current?.focus?.()
  }

  return (
    <StyledWrap className={className}>
      {resolvedLabel ? <StyledLabel htmlFor={id}>{resolvedLabel}</StyledLabel> : null}

      <StyledButtons>
        <StyledInput
          id={id}
          ref={node => {
            inputRef.current = node
            if (!ref) return
            if (typeof ref === 'function') ref(node)
            else ref.current = node
          }}
          type="number"
          inputMode="decimal"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          min={min}
          max={max}
          step={step}
          value={isControlled ? value : undefined}
          defaultValue={!isControlled ? defaultValue : undefined}
          $invalid={invalid}
          $warn={warn}
          $fluid={isFluid}
          onChange={evt => {
            const next = evt.target.value
            if (next === '' && allowEmpty) {
              setNext(evt, '', 'none')
              return
            }

            const parsed = Number(next)
            if (Number.isNaN(parsed)) return
            const clamped = clamp(parsed, min, max)
            setNext(evt, String(clamped), 'none')
          }}
          {...rest}
        />
        <StyledStepButton
          type="button"
          aria-label="Increase"
          onClick={evt => stepBy(evt, 'up')}
          disabled={disabled}
        >
          +
        </StyledStepButton>
        <StyledStepButton
          type="button"
          aria-label="Decrease"
          onClick={evt => stepBy(evt, 'down')}
          disabled={disabled}
        >
          −
        </StyledStepButton>
      </StyledButtons>

      {invalid ? (
        <StyledHelp id={messageId} $variant="invalid">
          {invalidText}
        </StyledHelp>
      ) : warn ? (
        <StyledHelp id={messageId} $variant="warn">
          {warnText}
        </StyledHelp>
      ) : helperText ? (
        <StyledHelp id={messageId} $variant="helper">
          {helperText}
        </StyledHelp>
      ) : null}
    </StyledWrap>
  )
})

NumberInput.displayName = 'NumberInput'

export default NumberInput
