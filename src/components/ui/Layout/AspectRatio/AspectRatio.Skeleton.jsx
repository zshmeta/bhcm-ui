import React from 'react'
import { StyledAspectRatioSkeleton } from './AspectRatio.styles'

/**
 * AspectRatioSkeleton
 */
export default function AspectRatioSkeleton({ className, ratio = '1x1', ...rest }) {
  return (
    <StyledAspectRatioSkeleton
      aria-hidden="true"
      className={className}
      $ratio={ratio}
      {...rest}
    />
  )
}

AspectRatioSkeleton.displayName = 'AspectRatioSkeleton'
