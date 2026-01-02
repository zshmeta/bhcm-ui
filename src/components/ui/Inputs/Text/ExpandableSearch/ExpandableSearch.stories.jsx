import React from 'react'
import ExpandableSearch from './ExpandableSearch'

export default {
  title: 'Inputs/Text/ExpandableSearch',
  component: ExpandableSearch,
}

export function Default() {
  return <ExpandableSearch
  id="expandablesearch-demo" />
}

export function ExpandableCollapsed() {
  return <ExpandableSearch
  id="expandablesearch-demo"
  isExpanded={false}
  onExpand={() => {}} />
}
