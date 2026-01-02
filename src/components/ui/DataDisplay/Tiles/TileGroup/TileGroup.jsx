import React, { createContext, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { StyledTileGroup } from './TileGroup.styles'

export const TileGroupContext = createContext(null)

export default function TileGroup({
  className,
  children,
  value,
  defaultValue,
  onChange,
  legend,
  ...rest
}) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const isControlled = value !== undefined
  const selected = isControlled ? value : uncontrolled

  const setValue = useCallback(
    next => {
      if (!isControlled) setUncontrolled(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  const ctx = useMemo(() => ({ selected, setValue }), [selected, setValue])

  return (
    <StyledTileGroup className={className} role="radiogroup" aria-label={legend} {...rest}>
      <TileGroupContext.Provider value={ctx}>{children}</TileGroupContext.Provider>
    </StyledTileGroup>
  )
}

TileGroup.displayName = 'TileGroup'

TileGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  legend: PropTypes.string,
}
