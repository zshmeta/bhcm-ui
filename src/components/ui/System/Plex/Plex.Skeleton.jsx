import React from 'react'
import styled from 'styled-components'

const SkeletonLine = styled.div`
  height: 10px;
  width: 120px;
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export default function PlexSkeleton() {
  return <SkeletonLine aria-hidden="true" />
}

PlexSkeleton.displayName = 'PlexSkeleton'
