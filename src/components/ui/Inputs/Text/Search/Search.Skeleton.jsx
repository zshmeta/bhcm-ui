import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  width: 100%;
`

const Box = styled.div`
  height: ${props => {
    switch (props.$size) {
      case 'sm':
        return '32px'
      case 'lg':
        return '48px'
      case 'md':
      default:
        return '40px'
    }
  }};
  border-radius: 6px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export default function SearchSkeleton({ size = 'md', ...rest }) {
  return (
    <Wrapper {...rest}>
      <Box $size={size} style={{ width: '40px' }} />
      <Box $size={size} style={{ flex: 1 }} />
    </Wrapper>
  )
}

SearchSkeleton.displayName = 'SearchSkeleton'
