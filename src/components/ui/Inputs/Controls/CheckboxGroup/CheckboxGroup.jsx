import React, { Children, cloneElement, isValidElement, useId, useMemo } from 'react'
import PropTypes from 'prop-types'
import { AILabel } from '../../../Feedback/AILabel'
import { Checkbox } from '../Checkbox'
import {
  StyledChildren,
  StyledFieldset,
  StyledHelper,
  StyledIcon,
  StyledLegend,
  StyledLegendDecorator,
  StyledMessage,
  StyledValidation,
  StyledValidationRow,
} from './CheckboxGroup.styles'

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

export default function CheckboxGroup({
  children,
  className,
  decorator,
  helperText,
  invalid,
  invalidText,
  legendId,
  legendText,
  readOnly,
  warn,
  warnText,
  slug,
  orientation = 'vertical',
  ...rest
}) {
  const reactId = useId()

  const showWarning = !readOnly && !invalid && warn
  const showHelper = !invalid && !warn

  const helperId = helperText ? `checkbox-group-helper-text-${safeReactId(reactId)}` : undefined
  const invalidId = invalid && !readOnly ? `checkbox-group-invalid-text-${safeReactId(reactId)}` : undefined
  const warnId = showWarning ? `checkbox-group-warn-text-${safeReactId(reactId)}` : undefined

  const describedBy = useMemo(() => {
    if (!showHelper || !helperId) return undefined
    return helperId
  }, [helperId, showHelper])

  const candidate = slug ?? decorator
  const normalizedDecorator = useMemo(() => {
    if (!candidate) return null
    if (!isAILabelElement(candidate)) return candidate
    return cloneElement(candidate, { size: 'mini', kind: 'default' })
  }, [candidate])

  const clonedChildren = useMemo(() => {
    return Children.map(children, child => {
      if (!isValidElement(child)) return child
      if (child.type !== Checkbox) return child

      const injected = {
        ...(typeof invalid !== 'undefined' && typeof child.props.invalid === 'undefined'
          ? { invalid }
          : {}),
        ...(typeof readOnly !== 'undefined' && typeof child.props.readOnly === 'undefined'
          ? { readOnly }
          : {}),
        ...(typeof warn !== 'undefined' && typeof child.props.warn === 'undefined' ? { warn } : {}),
      }

      return Object.keys(injected).length ? cloneElement(child, injected) : child
    })
  }, [children, invalid, readOnly, warn])

  const legendResolvedId = legendId || rest['aria-labelledby']
  const ariaLabelledBy = rest['aria-labelledby'] || legendId

  return (
    <StyledFieldset
      className={className}
      data-invalid={invalid ? true : undefined}
      aria-labelledby={ariaLabelledBy}
      aria-readonly={readOnly}
      aria-describedby={describedBy}
      $readOnly={!!readOnly}
      {...rest}
    >
      <StyledLegend id={legendResolvedId}>
        <span>{legendText}</span>
        {slug ? (
          <StyledLegendDecorator>{normalizedDecorator}</StyledLegendDecorator>
        ) : decorator ? (
          <StyledLegendDecorator>{normalizedDecorator}</StyledLegendDecorator>
        ) : null}
      </StyledLegend>

      <StyledChildren $orientation={orientation}>{clonedChildren}</StyledChildren>

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
    </StyledFieldset>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'

CheckboxGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  decorator: PropTypes.node,
  helperText: PropTypes.node,
  invalid: PropTypes.bool,
  invalidText: PropTypes.node,
  legendId: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  legendText: PropTypes.node.isRequired,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  readOnly: PropTypes.bool,
  slug: PropTypes.node,
  warn: PropTypes.bool,
  warnText: PropTypes.node,
}
