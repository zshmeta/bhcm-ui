import React, { cloneElement, forwardRef, useEffect, useId, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { AILabel } from '../../../Feedback/AILabel'
import {
  StyledDecoratorSlot,
  StyledDecoratorWrap,
  StyledHelper,
  StyledIcon,
  StyledInput,
  StyledLabel,
  StyledLabelText,
  StyledMessage,
  StyledRow,
  StyledValidation,
  StyledValidationRow,
  StyledWrapper,
} from './Checkbox.styles'

function safeReactId(id) {
  return String(id || '').replace(/:/g, '')
}

function isAILabelElement(node) {
  if (!React.isValidElement(node)) return false
  if (node.type === AILabel) return true
  return node.type?.displayName === 'AILabel'
}

function WarningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M8 1.5l6 11H2l6-11z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M8 5v3.8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 11.9h.01" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 4.5v4.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 11.9h.01" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  )
}

const Checkbox = forwardRef(function Checkbox(
  {
    className,
    decorator,
    helperText,
    id,
    labelText,
    onChange,
    onClick,
    indeterminate = false,
    invalid = false,
    invalidText,
    hideLabel = false,
    readOnly,
    title = '',
    warn = false,
    warnText,
    slug,
    disabled = false,
    ...rest
  },
  ref
) {
  const inputRef = useRef(null)
  const reactId = useId()

  const showWarning = !readOnly && !invalid && warn
  const showHelper = !invalid && !warn

  const helperId = helperText ? `checkbox-helper-text-${safeReactId(reactId)}` : undefined
  const invalidId = invalid && !readOnly ? `checkbox-invalid-text-${safeReactId(reactId)}` : undefined
  const warnId = showWarning ? `checkbox-warn-text-${safeReactId(reactId)}` : undefined

  const describedBy = useMemo(() => {
    const ids = []
    if (showHelper && helperId) ids.push(helperId)
    if (invalidId) ids.push(invalidId)
    if (warnId) ids.push(warnId)
    return ids.length ? ids.join(' ') : undefined
  }, [helperId, invalidId, showHelper, warnId])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate)
    }
  }, [indeterminate])

  const mergedRef = node => {
    inputRef.current = node
    if (!ref) return
    if (typeof ref === 'function') ref(node)
    else ref.current = node
  }

  const candidate = slug ?? decorator
  const normalizedDecorator = useMemo(() => {
    if (!candidate) return null
    if (!isAILabelElement(candidate)) return candidate

    const nextSize = candidate.props?.kind === 'inline' ? 'md' : 'mini'
    return cloneElement(candidate, { size: nextSize })
  }, [candidate])

  return (
    <StyledWrapper className={className} $readOnly={!!readOnly}>
      <StyledRow>
        <StyledInput
          {...rest}
          id={id}
          ref={mergedRef}
          type="checkbox"
          disabled={disabled}
          data-invalid={invalid ? true : undefined}
          aria-readonly={readOnly}
          aria-describedby={describedBy}
          onChange={evt => {
            if (!readOnly) {
              onChange?.(evt, { checked: evt.target.checked, id })
            }
          }}
          onClick={evt => {
            if (readOnly) {
              evt.preventDefault()
            }
            onClick?.(evt)
          }}
        />

        <StyledLabel htmlFor={id} $disabled={disabled} title={title}>
          <StyledLabelText $hide={!!hideLabel}>{labelText}</StyledLabelText>
          {slug ? (
            <StyledDecoratorWrap>{normalizedDecorator}</StyledDecoratorWrap>
          ) : decorator ? (
            <StyledDecoratorSlot>{normalizedDecorator}</StyledDecoratorSlot>
          ) : null}
        </StyledLabel>
      </StyledRow>

      <StyledValidation>
        {!readOnly && invalid ? (
          <StyledValidationRow $variant="invalid">
            <StyledIcon aria-hidden="true">
              <ErrorIcon />
            </StyledIcon>
            <StyledMessage id={invalidId}>{invalidText}</StyledMessage>
          </StyledValidationRow>
        ) : null}

        {showWarning ? (
          <StyledValidationRow $variant="warn">
            <StyledIcon aria-hidden="true">
              <WarningIcon />
            </StyledIcon>
            <StyledMessage id={warnId}>{warnText}</StyledMessage>
          </StyledValidationRow>
        ) : null}

        {showHelper && helperText ? <StyledHelper id={helperId}>{helperText}</StyledHelper> : null}
      </StyledValidation>
    </StyledWrapper>
  )
})

Checkbox.displayName = 'Checkbox'

Checkbox.propTypes = {
  className: PropTypes.string,
  decorator: PropTypes.node,
  helperText: PropTypes.node,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.node.isRequired,
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool,
  indeterminate: PropTypes.bool,
  invalid: PropTypes.bool,
  invalidText: PropTypes.node,
  readOnly: PropTypes.bool,
  warn: PropTypes.bool,
  warnText: PropTypes.node,
  slug: PropTypes.node,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  title: PropTypes.string,
}

export default Checkbox
