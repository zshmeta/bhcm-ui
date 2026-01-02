import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

const PrimaryButton = forwardRef(function PrimaryButton(
  { kind = 'primary', ...rest },
  ref
) {
  return <Button ref={ref} kind={kind} {...rest} />
})

PrimaryButton.displayName = 'PrimaryButton'

PrimaryButton.propTypes = {
  kind: PropTypes.string,
}

export default PrimaryButton
