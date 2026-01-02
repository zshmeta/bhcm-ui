import React from 'react'
import styled from 'styled-components'

const SkeletonPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

const SkeletonDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${props => props.theme.colors.bg.surface};
`

const SkeletonLine = styled.span`
  height: 10px;
  width: 70px;
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surface};
`

export default function ShapeIndicatorSkeleton() {
  return (
    <SkeletonPill aria-hidden="true">
      <SkeletonDot />
      <SkeletonLine />
    </SkeletonPill>
  )
}

ShapeIndicatorSkeleton.displayName = 'ShapeIndicatorSkeleton'
