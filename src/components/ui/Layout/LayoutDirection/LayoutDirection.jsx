import React from 'react'
import PropTypes from 'prop-types'
import { LayoutDirectionRoot } from './LayoutDirection.styles'

const LayoutDirectionContext = React.createContext({ direction: 'ltr' })

export function useLayoutDirection() {
  return React.useContext(LayoutDirectionContext)
}

export function LayoutDirection({ as: As = 'div', dir, children, ...rest }) {
  const value = React.useMemo(() => ({ direction: dir }), [dir])

  return (
    <LayoutDirectionContext.Provider value={value}>
      <LayoutDirectionRoot as={As} dir={dir} {...rest}>
        {children}
      </LayoutDirectionRoot>
    </LayoutDirectionContext.Provider>
  )
}

LayoutDirection.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  children: PropTypes.node,
  dir: PropTypes.oneOf(['ltr', 'rtl']).isRequired,
}

LayoutDirection.displayName = 'LayoutDirection'
