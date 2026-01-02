import React from 'react'
import PropTypes from 'prop-types'
import { LayerRoot, getLayerName } from './Layer.styles'

const LayerContext = React.createContext(1)

const MIN_LEVEL = 0
const MAX_LEVEL = 2

const clamp = (n, min, max) => Math.min(Math.max(n, min), max)

export function useLayer() {
  const level = React.useContext(LayerContext)
  return { level }
}

export const Layer = React.forwardRef(function Layer(
  { as: As = 'div', children, className, level: overrideLevel, withBackground = false, ...rest },
  ref
) {
  const contextLevel = React.useContext(LayerContext)
  const level = overrideLevel ?? contextLevel
  const next = clamp(level + 1, MIN_LEVEL, MAX_LEVEL)
  const layerName = getLayerName(level)

  return (
    <LayerContext.Provider value={next}>
      <LayerRoot
        as={As}
        ref={ref}
        className={className}
        data-layer={layerName}
        $withBackground={withBackground}
        {...rest}
      >
        {children}
      </LayerRoot>
    </LayerContext.Provider>
  )
})

Layer.displayName = 'Layer'

Layer.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  children: PropTypes.node,
  className: PropTypes.string,
  level: PropTypes.oneOf([0, 1, 2]),
  withBackground: PropTypes.bool,
}
