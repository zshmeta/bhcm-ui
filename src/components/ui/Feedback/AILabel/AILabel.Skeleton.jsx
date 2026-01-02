import React from 'react'
import styled from 'styled-components'

const Skeleton = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${props => props.theme.colors.bg.surface};
`

const Line = styled.span`
  width: 22px;
  height: 8px;
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surface};
`

export default function AILabelSkeleton() {
  return (
    <Skeleton aria-hidden="true">
      <Dot />
      <Line />
    </Skeleton>
  )
}

AILabelSkeleton.displayName = 'AILabelSkeleton'
