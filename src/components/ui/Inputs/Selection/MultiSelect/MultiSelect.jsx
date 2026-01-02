import React, { forwardRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { StyledHelp, StyledLabel, StyledSelect, StyledWrap } from './MultiSelect.styles'
import { useFormContext } from '../../FormWrapper/FormContext'

const MultiSelect = forwardRef(function MultiSelect(
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
    (invalid || warn || helperText) && messageId ? messageId : rest['aria-describedby']

  return (
    <StyledWrap className={className} $fluid={isFluid}>
      {labelText ? (
        <StyledLabel htmlFor={id} $hidden={hideLabel}>
          {labelText}
        </StyledLabel>
      ) : null}

      <StyledSelect
        {...rest}
        id={id}
        ref={ref}
        multiple
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        $invalid={invalid}
        $warn={warn}
        $fluid={isFluid}
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

MultiSelect.displayName = 'MultiSelect'

MultiSelect.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  labelText: PropTypes.node,
  hideLabel: PropTypes.bool,
  helperText: PropTypes.node,
  invalid: PropTypes.bool,
  invalidText: PropTypes.node,
  warn: PropTypes.bool,
  warnText: PropTypes.node,
}

export default MultiSelect
