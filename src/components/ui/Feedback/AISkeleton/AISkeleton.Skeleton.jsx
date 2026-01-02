import React from 'react'
import { AISkeletonPlaceholder } from './AISkeleton'

/**
 * AISkeletonSkeleton
 *
 * Provided to satisfy the gold-standard structure; defaults to a generic block.
 */
export default function AISkeletonSkeleton(props) {
  return <AISkeletonPlaceholder {...props} />
}

AISkeletonSkeleton.displayName = 'AISkeletonSkeleton'
