import React from 'react'
import { StyledHelp, StyledWrap } from './FluidDatePicker.styles'
import FluidDatePickerInput from '../FluidDatePickerInput/FluidDatePickerInput'

export default function FluidDatePicker({
  children,
  className,
  invalid = false,
  invalidText,
  readOnly = false,
  warn = false,
  warnText,
  ...rest
}) {
  const messageId = rest.id ? `${rest.id}__message` : undefined
  const describedBy = (invalid || warn) && messageId ? messageId : rest['aria-describedby']

  return (
    <StyledWrap className={className}>
      {children ? (
        children
      ) : (
        <FluidDatePickerInput
          readOnly={readOnly}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          {...rest}
        />
      )}
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

FluidDatePicker.displayName = 'FluidDatePicker'
