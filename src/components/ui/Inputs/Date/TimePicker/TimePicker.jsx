import React, { forwardRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { StyledHelp, StyledInput, StyledLabel, StyledRow, StyledWrap } from './TimePicker.styles'
import { useFormContext } from '../../FormWrapper/FormContext'

const TimePicker = forwardRef(function TimePicker(
  {
    children,
    className,
    inputClassName,
    pickerClassName,
    disabled = false,
    hideLabel = false,
    id,
    invalid = false,
    invalidText,
    warning = false,
    warningText,
    labelText,
    maxLength,
    onBlur,
    onChange,
    onClick,
    ...rest
  },
  ref
) {
  const { isFluid } = useFormContext()
  const messageId = useMemo(() => (id ? `${id}__message` : undefined), [id])
  const describedBy = (invalid || warning) && messageId ? messageId : rest['aria-describedby']

  return (
    <StyledWrap className={className}>
      {labelText ? (
        <StyledLabel htmlFor={id} $hidden={hideLabel}>
          {labelText}
        </StyledLabel>
      ) : null}

      <StyledRow className={pickerClassName}>
        <StyledInput
          {...rest}
          ref={ref}
          id={id}
          type="time"
          className={inputClassName}
          disabled={disabled}
          maxLength={maxLength}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          $invalid={invalid}
          $warn={warning}
          $fluid={isFluid}
          onBlur={onBlur}
          onChange={onChange}
          onClick={onClick}
        />
        {children}
      </StyledRow>

      {invalid ? (
        <StyledHelp id={messageId} $variant="invalid">
          {invalidText}
        </StyledHelp>
      ) : warning ? (
        <StyledHelp id={messageId} $variant="warn">
          {warningText}
        </StyledHelp>
      ) : null}
    </StyledWrap>
  )
})

TimePicker.displayName = 'TimePicker'

TimePicker.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  pickerClassName: PropTypes.string,
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  invalid: PropTypes.bool,
  invalidText: PropTypes.node,
  warning: PropTypes.bool,
  warningText: PropTypes.node,
  labelText: PropTypes.node,
  maxLength: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
}

export default TimePicker
