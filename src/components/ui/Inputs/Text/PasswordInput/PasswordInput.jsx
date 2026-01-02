import React, { forwardRef, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from '../../FormWrapper/FormContext'
import { StyledButton, StyledHelp, StyledInput, StyledLabel, StyledRow, StyledWrap } from './PasswordInput.styles'

const PasswordInput = forwardRef(function PasswordInput(
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
    defaultShowPassword = false,
    showPasswordLabel = 'Show password',
    hidePasswordLabel = 'Hide password',
    ...rest
  },
  ref
) {
  const { isFluid } = useFormContext()
  const [show, setShow] = useState(defaultShowPassword)
  const messageId = useMemo(() => (id ? `${id}__message` : undefined), [id])
  const describedBy =
    (invalid || warn || helperText) && messageId ? messageId : rest['aria-describedby']

  return (
    <StyledWrap className={className}>
      {labelText ? (
        <StyledLabel htmlFor={id} $hidden={hideLabel}>
          {labelText}
        </StyledLabel>
      ) : null}

      <StyledRow>
        <StyledInput
          {...rest}
          id={id}
          ref={ref}
          type={show ? 'text' : 'password'}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          $invalid={invalid}
          $warn={warn}
          $fluid={isFluid}
        />
        <StyledButton
          type="button"
          onClick={() => setShow(s => !s)}
          aria-label={show ? hidePasswordLabel : showPasswordLabel}
        >
          {show ? 'Hide' : 'Show'}
        </StyledButton>
      </StyledRow>

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

PasswordInput.displayName = 'PasswordInput'

PasswordInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  labelText: PropTypes.node,
  hideLabel: PropTypes.bool,
  helperText: PropTypes.node,
  invalid: PropTypes.bool,
  invalidText: PropTypes.node,
  warn: PropTypes.bool,
  warnText: PropTypes.node,
  defaultShowPassword: PropTypes.bool,
  showPasswordLabel: PropTypes.string,
  hidePasswordLabel: PropTypes.string,
}

export default PasswordInput
