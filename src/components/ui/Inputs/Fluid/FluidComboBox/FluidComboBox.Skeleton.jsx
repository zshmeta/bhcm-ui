import React from 'react'
import PropTypes from 'prop-types'
import { ComboBoxSkeleton } from '../../Controls/ComboBox'

export default function FluidComboBoxSkeleton(props) {
  return <ComboBoxSkeleton {...props} />
}

FluidComboBoxSkeleton.displayName = 'FluidComboBoxSkeleton'

FluidComboBoxSkeleton.propTypes = {
  className: PropTypes.string,
}
