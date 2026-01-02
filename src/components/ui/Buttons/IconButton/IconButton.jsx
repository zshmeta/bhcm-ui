import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

const IconButton = forwardRef(function IconButton(
  { children, className, disabled = false, kind = 'primary', label, size = 'md', ...rest },
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
    >
      {children}
    </Button>
  )
})

IconButton.displayName = 'IconButton'

IconButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  kind: PropTypes.string,
  label: PropTypes.string.isRequired,
  size: PropTypes.string,
}

export default IconButton
