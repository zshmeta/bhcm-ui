import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const IdPrefixContext = createContext('bhcm')

export function useIdPrefix() {
  return useContext(IdPrefixContext)
}

export default function IdPrefix({ children, prefix }) {
  return <IdPrefixContext.Provider value={prefix}>{children}</IdPrefixContext.Provider>
}

IdPrefix.displayName = 'IdPrefix'

IdPrefix.propTypes = {
  children: PropTypes.node,
  prefix: PropTypes.string.isRequired,
}
