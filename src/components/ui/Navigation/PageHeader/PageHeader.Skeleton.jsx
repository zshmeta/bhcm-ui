import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  width: 100%;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

const Line = styled.div`
  height: 10px;
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surface};
  width: ${props => props.$w || '60%'};
`

export default function PageHeaderSkeleton() {
  return (
    <Wrap aria-hidden="true">
      <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(0,0,0,0)' }}>
        <Line $w="40%" />
      </div>
      <div style={{ padding: '14px 16px' }}>
        <Line $w="80%" style={{ height: 14 }} />
        <div style={{ height: 8 }} />
        <Line $w="90%" />
        <div style={{ height: 6 }} />
        <Line $w="70%" />
      </div>
    </Wrap>
  )
}

PageHeaderSkeleton.displayName = 'PageHeaderSkeleton'
