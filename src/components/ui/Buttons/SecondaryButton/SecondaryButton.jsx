import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

const SecondaryButton = forwardRef(function SecondaryButton(
  { kind = 'secondary', ...rest },
  ref
) {
  return <Button ref={ref} kind={kind} {...rest} />
})

SecondaryButton.displayName = 'SecondaryButton'

SecondaryButton.propTypes = {
  kind: PropTypes.string,
}

export default SecondaryButton
