import React, { forwardRef, useMemo } from 'react'
import {
  StyledField,
  StyledHelp,
  StyledInput,
  StyledLabel,
  StyledMessage,
  StyledRow,
} from './DatePickerInput.styles'

let didWarnAboutValue = false

/**
 * DatePickerInput
 */
const DatePickerInput = forwardRef(function DatePickerInput(
  {
    id,
    labelText,
    hideLabel = false,
    helperText,
    invalid = false,
    invalidText,
    warn = false,
    warnText,
    disabled = false,
    readOnly = false,
    placeholder,
    type = 'date',
    size = 'md',
    decorator,
    slug,
    datePickerType,
    className,
    value: valueProp,
    ...rest
  },
  ref
) {
  const effectiveWarn = warn && !invalid
  const effectiveDecorator = decorator || slug

  if (process.env.NODE_ENV !== 'production' && valueProp !== undefined && !didWarnAboutValue) {
    // Carbon doesn't support `value` on DatePickerInput directly; we accept it because
    // our DatePicker wrapper may inject it.
    // eslint-disable-next-line no-console
    console.warn(
      "DatePickerInput: the 'value' prop is expected to be controlled by the parent DatePicker."
    )
    didWarnAboutValue = true
  }

  const messageId = useMemo(() => (id ? `${id}__message` : undefined), [id])
  const describedBy =
    (invalid || effectiveWarn) && messageId
      ? messageId
      : rest['aria-describedby']

  const value = valueProp === undefined || valueProp === null ? '' : valueProp

  return (
    <StyledField className={className}>
      {labelText ? (
        <StyledLabel htmlFor={id} $hidden={hideLabel} $disabled={disabled} $readOnly={readOnly}>
          {labelText}
        </StyledLabel>
      ) : null}

      <StyledRow $size={size} $invalid={invalid} $warn={effectiveWarn} $disabled={disabled} $readOnly={readOnly}>
        <StyledInput
          id={id}
          ref={ref}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          data-date-picker-type={datePickerType}
          {...rest}
        />

        {effectiveDecorator ? <span>{effectiveDecorator}</span> : null}
      </StyledRow>

      {helperText ? <StyledHelp $disabled={disabled}>{helperText}</StyledHelp> : null}

      {invalid ? (
        <StyledMessage id={messageId} $variant="invalid">
          {invalidText}
        </StyledMessage>
      ) : effectiveWarn ? (
        <StyledMessage id={messageId} $variant="warn">
          {warnText}
        </StyledMessage>
      ) : null}
    </StyledField>
  )
})

DatePickerInput.displayName = 'DatePickerInput'

export default DatePickerInput
