import React from 'react'
import PropTypes from 'prop-types'
import { StyledTile } from './Tile.styles'

export default function Tile({ className, children, as = 'div', clickable = false, ...rest }) {
  const Tag = clickable ? 'button' : as

  return (
    <StyledTile
      as={Tag}
      type={clickable ? 'button' : undefined}
      className={className}
      $clickable={clickable}
      {...rest}
    >
      {children}
    </StyledTile>
  )
}

Tile.displayName = 'Tile'

Tile.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.elementType,
  clickable: PropTypes.bool,
}
