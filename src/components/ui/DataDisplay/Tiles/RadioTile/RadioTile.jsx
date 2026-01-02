import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Tile from '../Tile'
import { TileGroupContext } from '../TileGroup/TileGroup'

export default function RadioTile({ className, value, children, ...rest }) {
  const ctx = useContext(TileGroupContext)
  const selected = ctx?.selected === value

  return (
    <Tile
      className={className}
      clickable
      role="radio"
      aria-checked={selected}
      onClick={() => ctx?.setValue?.(value)}
      {...rest}
      style={{
        ...(rest.style || {}),
        borderColor: selected ? 'currentColor' : undefined,
      }}
    >
      {children}
    </Tile>
  )
}

RadioTile.displayName = 'RadioTile'

RadioTile.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  children: PropTypes.node,
}
