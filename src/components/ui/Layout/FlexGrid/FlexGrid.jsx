import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { ColumnRoot, FlexGridRoot, RowRoot } from './FlexGrid.styles'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

const FlexGrid = forwardRef(function FlexGrid(
  { as: As = 'div', className, children, condensed = false, fullWidth = false, narrow = false, ...rest },
  ref
) {
  return (
    <FlexGridRoot
      as={As}
      ref={ref}
      className={cx(className, condensed && 'fg--condensed', narrow && 'fg--narrow', fullWidth && 'fg--fullWidth')}
      {...rest}
    >
      {children}
    </FlexGridRoot>
  )
})

FlexGrid.displayName = 'FlexGrid'

export const Row = forwardRef(function Row(
  { as: As = 'div', className, children, condensed = false, narrow = false, ...rest },
  ref
) {
  return (
    <RowRoot
      as={As}
      ref={ref}
      className={cx(className, condensed && 'fg-row--condensed', narrow && 'fg-row--narrow')}
      {...rest}
    >
      {children}
    </RowRoot>
  )
})

Row.displayName = 'Row'

export const Column = forwardRef(function Column(
  { as: As = 'div', className, children, condensed = false, narrow = false, sm, md, lg, xlg, max, ...rest },
  ref
) {
  const hasBreakpointProps =
    sm != null || md != null || lg != null || xlg != null || max != null

  return (
    <ColumnRoot
      as={As}
      ref={ref}
      className={cx(className, condensed && 'fg-col--condensed', narrow && 'fg-col--narrow')}
      $auto={!hasBreakpointProps}
      $sm={sm}
      $md={md}
      $lg={lg}
      $xlg={xlg}
      $max={max}
      {...rest}
    >
      {children}
    </ColumnRoot>
  )
})

Column.displayName = 'Column'

FlexGrid.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  className: PropTypes.string,
  children: PropTypes.node,
  condensed: PropTypes.bool,
  fullWidth: PropTypes.bool,
  narrow: PropTypes.bool,
}

Row.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  className: PropTypes.string,
  children: PropTypes.node,
  condensed: PropTypes.bool,
  narrow: PropTypes.bool,
}

const breakpointShape = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.shape({
    span: PropTypes.number,
    offset: PropTypes.number,
  }),
])

Column.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  className: PropTypes.string,
  children: PropTypes.node,
  condensed: PropTypes.bool,
  narrow: PropTypes.bool,
  sm: breakpointShape,
  md: breakpointShape,
  lg: breakpointShape,
  xlg: breakpointShape,
  max: breakpointShape,
}

export default FlexGrid
