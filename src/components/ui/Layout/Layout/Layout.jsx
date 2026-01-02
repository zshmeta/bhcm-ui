import React from 'react'
import PropTypes from 'prop-types'
import { LayoutConstraintRoot, LayoutRoot } from './Layout.styles'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
const densities = ['condensed', 'normal']

export const Layout = React.forwardRef(function Layout(
  { as: As = 'div', children, className, density, size, ...rest },
  ref
) {
  return (
    <LayoutRoot
      as={As}
      ref={ref}
      className={className}
      data-density={density}
      data-size={size}
      {...rest}
    >
      {children}
    </LayoutRoot>
  )
})

Layout.displayName = 'Layout'

Layout.propTypes = {
  as: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.elementType]),
  children: PropTypes.node,
  className: PropTypes.string,
  density: PropTypes.oneOf(densities),
  size: PropTypes.oneOf(sizes),
}

export const LayoutConstraint = React.forwardRef(function LayoutConstraint(
  { as: As = 'div', children, className, density, size, ...rest },
  ref
) {
  // Keep API parity with Carbon: accepts density/size constraints.
  // We expose them as data attributes for any downstream styling.
  return (
    <LayoutConstraintRoot
      as={As}
      ref={ref}
      className={className}
      data-density={density}
      data-size={size}
      {...rest}
    >
      {children}
    </LayoutConstraintRoot>
  )
})

LayoutConstraint.displayName = 'LayoutConstraint'

LayoutConstraint.propTypes = {
  as: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.elementType]),
  children: PropTypes.node,
  className: PropTypes.string,
  density: PropTypes.shape({
    min: PropTypes.oneOf(densities),
    max: PropTypes.oneOf(densities),
  }),
  size: PropTypes.shape({
    min: PropTypes.oneOf(sizes),
    max: PropTypes.oneOf(sizes),
  }),
}
