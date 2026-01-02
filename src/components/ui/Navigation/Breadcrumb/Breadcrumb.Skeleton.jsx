import React from 'react'
import styled from 'styled-components'

const SkeletonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  gap: ${props => props.theme.spacing.xs};
`

const SkeletonCrumb = styled.div`
  height: 10px;
  width: ${props => props.$width || '64px'};
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

const SkeletonSeparator = styled.span`
  color: ${props => props.theme.colors.text.muted};
  user-select: none;
`

/**
 * BreadcrumbSkeleton
 *
 * Mirrors Carbon API:
 * - `items` count
 * - optional `noTrailingSlash`
 * - optional `size` (sm/md)
 */
export default function BreadcrumbSkeleton({
  className,
  items = 3,
  noTrailingSlash = false,
  size = 'md',
  ...rest
}) {
  const fontSize = size === 'sm' ? '12px' : '13px'

  return (
    <SkeletonContainer className={className} style={{ fontSize }} {...rest}>
      {Array.from({ length: items }).map((_, index) => {
        const isLast = index === items - 1
        const showSeparator = !(noTrailingSlash && isLast)

        return (
          <React.Fragment key={index}>
            <SkeletonCrumb $width={index === 0 ? '72px' : '60px'} />
            {showSeparator && <SkeletonSeparator aria-hidden="true">/</SkeletonSeparator>}
          </React.Fragment>
        )
      })}
    </SkeletonContainer>
  )
}

BreadcrumbSkeleton.displayName = 'BreadcrumbSkeleton'
