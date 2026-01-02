import React, { forwardRef, useMemo, useState } from 'react'
import {
  StyledCounter,
  StyledHelp,
  StyledInput,
  StyledLabel,
  StyledWrap,
} from './TextInput.styles'
import { useFormContext } from '../../FormWrapper/FormContext'

const TextInput = forwardRef(function TextInput(
  {
    id,
    className,
    labelText,
    hideLabel = false,
    helperText,
    invalid = false,
    invalidText,
    warn = false,
    warnText,
    enableCounter = false,
    maxCount,
    onChange,
    type = 'text',
    value,
    defaultValue,
    ...rest
  },
  ref
) {
  const { isFluid } = useFormContext()

  const messageId = useMemo(() => (id ? `${id}__message` : undefined), [id])
  const describedBy =
    (invalid || warn || helperText || enableCounter) && messageId
      ? messageId
      : rest['aria-describedby']

  const isControlled = value !== undefined
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '')

  const currentValue = isControlled ? value : uncontrolledValue
  const currentLength = String(currentValue ?? '').length

  return (
    <StyledWrap className={className}>
      {labelText ? (
        <StyledLabel htmlFor={id} $hidden={hideLabel}>
          {labelText}
        </StyledLabel>
      ) : null}

      <StyledInput
        id={id}
        ref={ref}
        type={type}
        value={isControlled ? value : undefined}
        defaultValue={!isControlled ? defaultValue : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        $invalid={invalid}
        $warn={warn}
        $fluid={isFluid}
        onChange={evt => {
          if (!isControlled) setUncontrolledValue(evt.target.value)
          onChange?.(evt)
        }}
        {...rest}
      />

      {(invalid || warn || helperText || enableCounter) && (
        <div id={messageId}>
          {invalid ? (
            <StyledHelp $variant="invalid">{invalidText}</StyledHelp>
          ) : warn ? (
            <StyledHelp $variant="warn">{warnText}</StyledHelp>
          ) : helperText ? (
            <StyledHelp $variant="helper">{helperText}</StyledHelp>
          ) : null}

          {enableCounter ? (
            <StyledCounter $variant={invalid ? 'invalid' : warn ? 'warn' : 'helper'}>
              {maxCount ? `${currentLength}/${maxCount}` : String(currentLength)}
            </StyledCounter>
          ) : null}
        </div>
      )}
    </StyledWrap>
  )
})

TextInput.displayName = 'TextInput'

export default TextInput
