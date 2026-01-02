import React from 'react'
import styled from 'styled-components'
import { StyledProgressList, StyledStepItem } from './ProgressIndicator.styles'

const SkeletonBtn = styled.div`
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
  border-radius: 8px;
  padding: 8px 10px;
  width: 100%;

  display: grid;
  grid-template-columns: 16px 1fr;
  column-gap: 8px;
  align-items: center;
`

const SkeletonLine = styled.div`
  height: 10px;
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surface};
  width: ${props => props.$w || '70%'};
`

function Step() {
  return (
    <StyledStepItem>
      <SkeletonBtn aria-hidden="true">
        <SkeletonLine $w="16px" style={{ height: 16, borderRadius: 999 }} />
        <SkeletonLine $w="65%" />
      </SkeletonBtn>
    </StyledStepItem>
  )
}

export default function ProgressIndicatorSkeleton({ className, vertical = false, ...rest }) {
  return (
    <StyledProgressList className={className} $vertical={!!vertical} $spaceEqually={false} {...rest}>
      <Step />
      <Step />
      <Step />
      <Step />
    </StyledProgressList>
  )
}

ProgressIndicatorSkeleton.displayName = 'ProgressIndicatorSkeleton'
