import React, { useMemo, useState } from 'react'

import Search from './Search'

export default {
  title: 'Inputs/Text/Search',
  component: Search,
}

export function Default() {
  return <Search labelText="Search" placeholder="Search" />
}

export function WithDefaultValue() {
  return <Search labelText="Search" defaultValue="Query" />
}

export function Disabled() {
  return <Search labelText="Search" disabled defaultValue="Query" />
}

export function ExpandableCollapsed() {
  return <Search labelText="Search" isExpanded={false} onExpand={() => {}} />
}

export function ExpandableInteractive() {
  const [expanded, setExpanded] = useState(false)
  const onExpand = useMemo(() => () => setExpanded(v => !v), [])

  return (
    <Search
      labelText="Search"
      isExpanded={expanded}
      onExpand={onExpand}
      placeholder="Search"
    />
  )
}
