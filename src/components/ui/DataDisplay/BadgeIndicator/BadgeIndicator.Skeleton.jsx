import React from 'react'
import { StyledBadgeIndicatorSkeleton } from './BadgeIndicator.styles'

/**
 * BadgeIndicatorSkeleton
 */
export default function BadgeIndicatorSkeleton({ className, hasCount = false, ...rest }) {
  return (
    <StyledBadgeIndicatorSkeleton
      aria-hidden="true"
      className={className}
      $hasCount={Boolean(hasCount)}
      {...rest}
    />
  )
}

BadgeIndicatorSkeleton.displayName = 'BadgeIndicatorSkeleton'
