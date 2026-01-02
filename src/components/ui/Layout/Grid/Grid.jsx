import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { GridOuter, GridRow } from './Grid.styles'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

const Grid = forwardRef(function Grid(
  {
    as: As = 'div',
    align = 'center',
    className,
    children,
    condensed = false,
    fullWidth = false,
    narrow = false,
    ...rest
  },
  ref
) {
  return (
    <GridOuter
      as={As}
      ref={ref}
      className={cx(
        className,
        'bhcm-grid',
        condensed && 'bhcm-grid--condensed',
        narrow && 'bhcm-grid--narrow',
        fullWidth && 'bhcm-grid--fullWidth'
      )}
      {...rest}
    >
      <GridRow
        className={cx(
          'bhcm-grid__row',
          condensed && 'bhcm-grid-row--condensed',
          narrow && 'bhcm-grid-row--narrow'
        )}
        $align={align}
      >
        {children}
      </GridRow>
    </GridOuter>
  )
})

Grid.displayName = 'Grid'

Grid.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  align: PropTypes.oneOf(['start', 'center', 'end']),
  children: PropTypes.node,
  className: PropTypes.string,
  condensed: PropTypes.bool,
  fullWidth: PropTypes.bool,
  narrow: PropTypes.bool,
}

export default Grid
