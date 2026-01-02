import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

const MenuButton = forwardRef(function MenuButton(
  { children, className, disabled = false, label, kind = 'ghost', size = 'md', ...rest },
  ref
) {
  return (
    <Button
      {...rest}
      ref={ref}
      className={className}
      disabled={disabled}
      kind={kind}
      size={size}
      hasIconOnly
      iconDescription={label}
      aria-haspopup="menu"
    >
      {children}
    </Button>
  )
})

MenuButton.displayName = 'MenuButton'

MenuButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  kind: PropTypes.string,
  label: PropTypes.string.isRequired,
  size: PropTypes.string,
}

export default MenuButton
