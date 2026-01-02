import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { ComboBox } from '../../Controls'
import { Wrap } from './FluidComboBox.styles'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

const FluidComboBox = forwardRef(function FluidComboBox({ className, isCondensed = false, ...other }, ref) {
  // Carbon's FluidComboBox mainly:
  // - provides Fluid form context
  // - adds a condensed wrapper class
  // In this UI library, our "fluid" variants are already styled as standalone inputs,
  // so we keep this as a thin wrapper around the gold-standard ComboBox.
  return (
    <Wrap className={cx(className, isCondensed && 'fluid-combobox--condensed')}>
      <ComboBox ref={ref} {...other} />
    </Wrap>
  )
})

FluidComboBox.displayName = 'FluidComboBox'

FluidComboBox.propTypes = {
  className: PropTypes.string,
  isCondensed: PropTypes.bool,
}

export default FluidComboBox
