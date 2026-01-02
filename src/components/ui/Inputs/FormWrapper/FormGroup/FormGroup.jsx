import React, { forwardRef, useMemo } from 'react'
import {
  StyledFieldset,
  StyledLegend,
  StyledMessage,
} from './FormGroup.styles'

const FormGroup = forwardRef(function FormGroup(
  {
    children,
    className,
    disabled = false,
    invalid = false,
    legendId,
    legendText,
    message = false,
    messageText = '',
    ...rest
  },
  ref
) {
  const ariaLabelledBy = useMemo(() => {
    return rest['aria-labelledby'] || legendId
  }, [legendId, rest])

  const resolvedLegendId = legendId || ariaLabelledBy

  return (
    <StyledFieldset
      ref={ref}
      className={className}
      disabled={disabled}
      aria-labelledby={ariaLabelledBy}
      data-invalid={invalid ? '' : undefined}
      {...rest}
    >
      <StyledLegend id={resolvedLegendId}>{legendText}</StyledLegend>
      {children}
      {message ? <StyledMessage>{messageText}</StyledMessage> : null}
    </StyledFieldset>
  )
})

FormGroup.displayName = 'FormGroup'

export default FormGroup
