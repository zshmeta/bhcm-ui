import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

export const ClassPrefixContext = createContext('cds')

export function useClassPrefix() {
  return useContext(ClassPrefixContext)
}

export default function ClassPrefix({ children, prefix }) {
  return <ClassPrefixContext.Provider value={prefix}>{children}</ClassPrefixContext.Provider>
}

ClassPrefix.displayName = 'ClassPrefix'

ClassPrefix.propTypes = {
  children: PropTypes.node,
  prefix: PropTypes.string.isRequired,
}
