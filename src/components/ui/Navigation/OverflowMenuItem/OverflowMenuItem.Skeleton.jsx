import React from 'react'
import styled from 'styled-components'

const Line = styled.div`
  height: 12px;
  border-radius: 6px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  width: 140px;
`

export default function OverflowMenuItemSkeleton() {
  return <Line aria-hidden="true" />
}

OverflowMenuItemSkeleton.displayName = 'OverflowMenuItemSkeleton'
