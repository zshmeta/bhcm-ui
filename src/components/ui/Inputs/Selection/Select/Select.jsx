import React, { forwardRef, useMemo } from 'react'
import {
  StyledHelp,
  StyledLabel,
  StyledSelect,
  StyledWrap,
} from './Select.styles'
import { useFormContext } from '../../FormWrapper/FormContext'

const Select = forwardRef(function Select(
  {
    id,
    className,
    children,
    labelText,
    hideLabel = false,
    helperText,
    invalid = false,
    invalidText,
    warn = false,
    warnText,
    ...rest
  },
  ref
) {
  const { isFluid } = useFormContext()
  const messageId = useMemo(() => (id ? `${id}__message` : undefined), [id])
  const describedBy =
    (invalid || warn || helperText) && messageId
      ? messageId
      : rest['aria-describedby']

  return (
    <StyledWrap className={className} $fluid={isFluid}>
      {labelText ? (
        <StyledLabel htmlFor={id} $hidden={hideLabel}>
          {labelText}
        </StyledLabel>
      ) : null}

      <StyledSelect
        id={id}
        ref={ref}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        $invalid={invalid}
        $warn={warn}
        $fluid={isFluid}
        {...rest}
      >
        {children}
      </StyledSelect>

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

Select.displayName = 'Select'

export default Select
