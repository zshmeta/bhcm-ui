import React from 'react'
import styled from 'styled-components'

const Item = styled.li`
  display: inline-flex;
  align-items: center;
`

const Line = styled.div`
  height: 10px;
  width: ${props => props.$width || '60px'};
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

/**
 * BreadcrumbItemSkeleton
 *
 * Provided for consistency with the library "gold standard" structure.
 */
export default function BreadcrumbItemSkeleton({ width = '60px', ...rest }) {
  return (
    <Item aria-hidden="true" {...rest}>
      <Line $width={width} />
    </Item>
  )
}

BreadcrumbItemSkeleton.displayName = 'BreadcrumbItemSkeleton'
