import React, { Children, cloneElement, isValidElement, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { StyledFieldset, StyledHelp, StyledLegend } from './RadioButtonGroup.styles'

export default function RadioButtonGroup({
  children,
  className,
  defaultSelected,
  disabled = false,
  legendText,
  name,
  onChange,
  readOnly = false,
  valueSelected,
  invalid = false,
  invalidText,
  warn = false,
  warnText,
  ...rest
}) {
  const isControlled = valueSelected !== undefined
  const [uncontrolled, setUncontrolled] = useState(defaultSelected)

  useEffect(() => {
    if (!isControlled) setUncontrolled(defaultSelected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultSelected])

  const selectedValue = isControlled ? valueSelected : uncontrolled
  const messageId = useMemo(() => (name ? `${name}__message` : undefined), [name])
  const describedBy = (invalid || warn) && messageId ? messageId : rest['aria-describedby']

  const items = useMemo(() => Children.toArray(children).filter(Boolean), [children])

  return (
    <StyledFieldset className={className} disabled={disabled} aria-describedby={describedBy} {...rest}>
      {legendText ? <StyledLegend>{legendText}</StyledLegend> : null}

      {items.map((child, idx) => {
        if (!isValidElement(child)) return null
        const childValue = child.props?.value
        const checkedFromGroup = selectedValue !== undefined ? childValue === selectedValue : undefined

        return cloneElement(child, {
          key: child.key ?? idx,
          name: child.props?.name ?? name,
          checked: checkedFromGroup ?? child.props?.checked,
          disabled: disabled || child.props?.disabled,
          onChange: (value, childName, evt) => {
            child.props?.onChange?.(value, childName, evt)
            if (disabled || readOnly) return
            if (!isControlled) setUncontrolled(value)
            onChange?.(value, childName, evt)
          },
        })
      })}

      {invalid ? (
        <StyledHelp id={messageId} $variant="invalid">
          {invalidText}
        </StyledHelp>
      ) : warn ? (
        <StyledHelp id={messageId} $variant="warn">
          {warnText}
        </StyledHelp>
      ) : null}
    </StyledFieldset>
  )
}

RadioButtonGroup.displayName = 'RadioButtonGroup'

RadioButtonGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  legendText: PropTypes.node,
  name: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  valueSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  invalid: PropTypes.bool,
  invalidText: PropTypes.node,
  warn: PropTypes.bool,
  warnText: PropTypes.node,
}
