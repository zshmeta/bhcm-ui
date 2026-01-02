import React, { useEffect, useRef } from 'react'
import { StyledInlineCheckbox, StyledInput, StyledLabel } from './InlineCheckbox.styles'

/**
 * InlineCheckbox
 *
 * Preserved enterprise behaviors from Carbon:
 * - Uses an aria-label for the accessible name
 * - Supports `indeterminate` visual state via the DOM property
 * - If indeterminate, clicking does not immediately set checked=true
 * - `onChange(checked, id, event)` signature
 */
export default function InlineCheckbox(props) {
  const {
    ['aria-label']: ariaLabel,
    ariaLabel: deprecatedAriaLabel,
    checked,
    defaultChecked,
    disabled = false,
    id,
    indeterminate = false,
    name,
    onChange,
    onClick,
    onKeyDown,
    title,
    className,
    ...rest
  } = props

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate
    }
  }, [indeterminate])

  return (
    <StyledInlineCheckbox className={className} {...rest}>
      <StyledInput
        ref={inputRef}
        type="checkbox"
        id={id}
        name={name}
        aria-label={deprecatedAriaLabel || ariaLabel}
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        onClick={evt => {
          if (indeterminate) {
            evt.currentTarget.checked = false
          }
          onClick?.(evt)
        }}
        onChange={evt => {
          onChange?.(evt.target.checked, id, evt)
        }}
        onKeyDown={onKeyDown}
        title={title}
      />
      {/* Hidden label to preserve Carbon's click/propagation behavior. */}
      <StyledLabel
        htmlFor={id}
        title={title}
        onClick={evt => {
          evt.stopPropagation()
        }}
      >
        {deprecatedAriaLabel || ariaLabel}
      </StyledLabel>
    </StyledInlineCheckbox>
  )
}

InlineCheckbox.displayName = 'InlineCheckbox'
