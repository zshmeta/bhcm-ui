import React, { forwardRef, useId, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  StyledHelp,
  StyledInput,
  StyledLabelText,
  StyledRadio,
  StyledWrapper,
} from './RadioButton.styles'

const RadioButton = forwardRef(function RadioButton(
  {
    checked,
    className,
    decorator,
    defaultChecked,
    disabled = false,
    hideLabel = false,
    id,
    labelPosition = 'right',
    labelText,
    name,
    onChange,
    onClick,
    value = '',
    required,
    invalid = false,
    invalidText,
    warn = false,
    warnText,
    readOnly,
    ...rest
  },
  ref
) {
  const autoId = useId()
  const inputId = id || `radio-${autoId}`

  const messageId = useMemo(() => `${inputId}__message`, [inputId])
  const describedBy = (invalid || warn) ? messageId : rest['aria-describedby']

  return (
    <StyledWrapper className={className} $labelPosition={labelPosition}>
      <StyledRadio>
        <StyledInput
          {...rest}
          ref={ref}
          id={inputId}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onChange={evt => {
            if (readOnly) return
            onChange?.(value, name, evt)
          }}
          onClick={onClick}
        />

        <label htmlFor={inputId}>
          <StyledLabelText $hidden={hideLabel}>{labelText}</StyledLabelText>
        </label>

        {decorator ? <span>{decorator}</span> : null}
      </StyledRadio>

      {invalid ? (
        <StyledHelp id={messageId} $variant="invalid">
          {invalidText}
        </StyledHelp>
      ) : warn ? (
        <StyledHelp id={messageId} $variant="warn">
          {warnText}
        </StyledHelp>
      ) : null}
    </StyledWrapper>
  )
})

RadioButton.displayName = 'RadioButton'

RadioButton.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  decorator: PropTypes.node,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  labelPosition: PropTypes.oneOf(['left', 'right']),
  labelText: PropTypes.node.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
  invalid: PropTypes.bool,
  invalidText: PropTypes.node,
  warn: PropTypes.bool,
  warnText: PropTypes.node,
  readOnly: PropTypes.bool,
}

export default RadioButton
