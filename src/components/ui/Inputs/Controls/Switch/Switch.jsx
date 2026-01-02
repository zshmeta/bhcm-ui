import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { StyledSwitchButton, StyledSwitchText, VisuallyHidden } from './Switch.styles'

const Switch = forwardRef(function Switch(
  { className, disabled = false, selected = false, text, children, ...rest },
  ref
) {
  return (
    <StyledSwitchButton
      {...rest}
      ref={ref}
      type="button"
      className={className}
      disabled={disabled}
      aria-selected={selected}
      $selected={selected}
    >
      <StyledSwitchText>{children ?? text}</StyledSwitchText>
    </StyledSwitchButton>
  )
})

Switch.displayName = 'Switch'

export const IconSwitch = forwardRef(function IconSwitch(
  { className, disabled = false, selected = false, text, children, ...rest },
  ref
) {
  return (
    <StyledSwitchButton
      {...rest}
      ref={ref}
      type="button"
      className={className}
      disabled={disabled}
      aria-selected={selected}
      $selected={selected}
    >
      {children}
      <VisuallyHidden>{text}</VisuallyHidden>
    </StyledSwitchButton>
  )
})

IconSwitch.displayName = 'IconSwitch'

Switch.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  text: PropTypes.node,
  children: PropTypes.node,
}

IconSwitch.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  text: PropTypes.node,
  children: PropTypes.node,
}

export default Switch
