import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../Button'

/**
 * DangerButton
 *
 * Preserved Carbon behavior:
 * - Always forces `kind="danger"`.
 */
const DangerButton = forwardRef(function DangerButton({ kind: _kind, ...rest }, ref) {
  return <Button ref={ref} kind="danger" {...rest} />
})

DangerButton.displayName = 'DangerButton'

DangerButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  iconDescription: PropTypes.string,
}

export default DangerButton
