import React from 'react'
import PropTypes from 'prop-types'
import OverflowMenu from '../OverflowMenu'

let warned = false

export default function OverflowMenuV2(props) {
  if (!warned) {
    warned = true
    // Carbon marks V2 as deprecated; keep as a soft warning.
    console.warn('Warning: `OverflowMenuV2` is deprecated. Use `OverflowMenu` instead.')
  }

  return <OverflowMenu {...props} />
}

OverflowMenuV2.displayName = 'OverflowMenuV2'

OverflowMenuV2.propTypes = {
  ...OverflowMenu.propTypes,
}
