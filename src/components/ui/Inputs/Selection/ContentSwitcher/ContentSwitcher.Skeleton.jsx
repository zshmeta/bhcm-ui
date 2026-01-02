import React from 'react'
import styled from 'styled-components'

const Shell = styled.div`
  display: inline-flex;
  align-items: stretch;

  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 6px;
  overflow: hidden;

  background: ${props => props.theme.colors.bg.surfaceRaised};
`

const Seg = styled.div`
  height: ${props => (props.$size === 'lg' ? '40px' : props.$size === 'sm' ? '28px' : '32px')};
  width: ${props => props.$w || '84px'};
  background: ${props => props.theme.colors.bg.surfaceRaised};

  & + & {
    border-left: 1px solid ${props => props.theme.colors.border.subtle};
  }
`

export default function ContentSwitcherSkeleton({ size = 'md', segments = 3, ...rest }) {
  return (
    <Shell aria-hidden="true" {...rest}>
      {Array.from({ length: segments }).map((_, i) => (
        <Seg key={i} $size={size} $w={i === 0 ? '92px' : i === 1 ? '104px' : '88px'} />
      ))}
    </Shell>
  )
}

ContentSwitcherSkeleton.displayName = 'ContentSwitcherSkeleton'
