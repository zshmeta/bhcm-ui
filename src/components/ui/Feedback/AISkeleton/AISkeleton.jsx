import React, { forwardRef, useMemo } from 'react'
import {
  StyledAISkeletonIcon,
  StyledAISkeletonPlaceholder,
  StyledAISkeletonTextLine,
  StyledAISkeletonTextStack,
} from './AISkeleton.styles'

/**
 * AISkeletonIcon
 *
 * Carbon intent: an AI-flavored skeleton icon style.
 */
export const AISkeletonIcon = forwardRef(function AISkeletonIcon(
  { className, size = '16px', style, ...rest },
  ref
) {
  return (
    <StyledAISkeletonIcon
      ref={ref}
      aria-hidden="true"
      className={className}
      style={style}
      $size={size}
      {...rest}
    />
  )
})

AISkeletonIcon.displayName = 'AISkeletonIcon'

/**
 * AISkeletonPlaceholder
 */
export const AISkeletonPlaceholder = forwardRef(function AISkeletonPlaceholder(
  { className, style, width = '100%', height = '24px', ...rest },
  ref
) {
  return (
    <StyledAISkeletonPlaceholder
      ref={ref}
      aria-hidden="true"
      className={className}
      style={style}
      $width={width}
      $height={height}
      {...rest}
    />
  )
})

AISkeletonPlaceholder.displayName = 'AISkeletonPlaceholder'

/**
 * AISkeletonText
 *
 * Preserved Carbon behaviors:
 * - `heading` increases the line height
 * - `paragraph` renders multiple lines
 * - `lineCount` controls number of lines when paragraph is true
 * - `width` controls single line width / max width
 */
export const AISkeletonText = forwardRef(function AISkeletonText(
  { className, heading = false, paragraph = false, lineCount = 3, width = '100%', ...rest },
  ref
) {
  const lines = useMemo(() => {
    if (!paragraph) return [width]
    const count = Math.max(1, Number(lineCount) || 1)

    return Array.from({ length: count }).map((_, idx) => {
      if (idx === count - 1) return '70%'
      if (idx === count - 2) return '85%'
      return width
    })
  }, [lineCount, paragraph, width])

  return (
    <StyledAISkeletonTextStack ref={ref} className={className} aria-hidden="true" {...rest}>
      {lines.map((w, idx) => (
        <StyledAISkeletonTextLine key={idx} $heading={heading} $width={w} />
      ))}
    </StyledAISkeletonTextStack>
  )
})

AISkeletonText.displayName = 'AISkeletonText'

/**
 * Default export kept for convenience.
 */
export default AISkeletonText
