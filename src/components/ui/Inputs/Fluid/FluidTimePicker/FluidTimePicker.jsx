import React from 'react'
import { StyledHelp, StyledInput, StyledLabel, StyledRow, StyledWrap } from './FluidTimePicker.styles'

export default function FluidTimePicker({
  id,
  labelText,
  placeholder,
  className,
  disabled = false,
  invalid = false,
  invalidText,
  warn = false,
  warnText,
  readOnly = false,
  children,
  ...rest
}) {
  const messageId = id ? `${id}__message` : undefined
  const describedBy = (invalid || warn) && messageId ? messageId : rest['aria-describedby']

  return (
    <StyledWrap className={className}>
      {labelText ? <StyledLabel htmlFor={id}>{labelText}</StyledLabel> : null}
      <StyledRow>
        <StyledInput
          id={id}
          type="time"
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {children}
      </StyledRow>
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
}

FluidTimePicker.displayName = 'FluidTimePicker'
