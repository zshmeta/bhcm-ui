import React, { useId, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  StyledLabel,
  StyledSideLabel,
  StyledToggleButton,
  StyledToggleRoot,
  StyledToggleSwitch,
} from './Toggle.styles'

export default function Toggle({
  'aria-labelledby': ariaLabelledby,
  className,
  defaultToggled = false,
  disabled = false,
  hideLabel = false,
  id,
  labelA = 'Off',
  labelB = 'On',
  labelText,
  onClick,
  onToggle,
  readOnly,
  size = 'md',
  toggled,
  ...other
}) {
  const uid = useId()
  const buttonId = id || `toggle-${uid}`
  const labelId = useMemo(() => `${buttonId}_label`, [buttonId])

  const isControlled = toggled !== undefined
  const [uncontrolled, setUncontrolled] = useState(defaultToggled)
  const checked = isControlled ? toggled : uncontrolled

  const buttonElement = useRef(null)

  const sideLabel = hideLabel ? labelText : checked ? labelB : labelA
  const renderSideLabel = !(hideLabel && !labelText)

  function handleActivate(evt) {
    if (!readOnly && !disabled) {
      const next = !checked
      if (!isControlled) setUncontrolled(next)
      onToggle?.(next)
    }
    onClick?.(evt)
  }

  return (
    <StyledToggleRoot className={className} $disabled={disabled} $readOnly={readOnly}>
      {labelText && !hideLabel ? <StyledLabel htmlFor={buttonId}>{labelText}</StyledLabel> : null}

      <div
        onClick={
          !labelText
            ? evt => {
                if (buttonElement.current && evt.target !== buttonElement.current && !disabled) {
                  handleActivate(evt)
                  buttonElement.current?.focus?.()
                }
              }
            : undefined
        }
      >
        <StyledToggleButton
          {...other}
          ref={buttonElement}
          id={buttonId}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={ariaLabelledby ?? (labelText ? labelId : undefined)}
          disabled={disabled}
          onClick={handleActivate}
          $size={size}
        >
          <StyledToggleSwitch $checked={checked} $size={size} />
          {renderSideLabel ? (
            <StyledSideLabel id={labelId} $hidden={hideLabel}>
              {sideLabel}
            </StyledSideLabel>
          ) : null}
        </StyledToggleButton>
      </div>
    </StyledToggleRoot>
  )
}

Toggle.displayName = 'Toggle'

Toggle.propTypes = {
  'aria-labelledby': PropTypes.string,
  className: PropTypes.string,
  defaultToggled: PropTypes.bool,
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  labelA: PropTypes.string,
  labelB: PropTypes.string,
  labelText: PropTypes.string,
  onClick: PropTypes.func,
  onToggle: PropTypes.func,
  readOnly: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md']),
  toggled: PropTypes.bool,
}
