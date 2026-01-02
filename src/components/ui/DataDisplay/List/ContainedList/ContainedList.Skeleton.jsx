import React from 'react'
import styled from 'styled-components'

const Shell = styled.div`
  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 6px;
  overflow: hidden;
  background: ${props => props.theme.colors.bg.surface};
`

const Header = styled.div`
  height: 44px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

const Body = styled.div`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
`

const Row = styled.div`
  height: 12px;
  border-radius: 6px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
  width: ${props => props.$w || '100%'};

  & + & {
    margin-top: ${props => props.theme.spacing.sm};
  }
`

export default function ContainedListSkeleton({ rows = 5, ...rest }) {
  return (
    <Shell {...rest}>
      <Header />
      <Body>
        {Array.from({ length: rows }).map((_, i) => (
          <Row key={i} $w={i % 2 === 0 ? '88%' : '72%'} />
        ))}
      </Body>
    </Shell>
  )
}

ContainedListSkeleton.displayName = 'ContainedListSkeleton'
