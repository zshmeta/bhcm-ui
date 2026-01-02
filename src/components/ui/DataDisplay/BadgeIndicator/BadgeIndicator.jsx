import React, { forwardRef, useMemo } from 'react'
import { StyledBadgeIndicator } from './BadgeIndicator.styles'

/**
 * BadgeIndicator
 *
 * Preserved Carbon behaviors:
 * - `count` displays a number badge when truthy
 * - Counts greater than 999 render as "999+"
 *
 * @param {object} props
 * @param {number} [props.count]
 * @param {string} [props.id]
 * @param {string} [props.className]
 * @param {string} [props['aria-label']]
 */
const BadgeIndicator = forwardRef(function BadgeIndicator(
  { className, count, 'aria-label': ariaLabel, ...rest },
  ref
) {
  const hasCount = Boolean(count)

  const displayCount = useMemo(() => {
    if (!hasCount) return undefined
    return count > 999 ? '999+' : String(count)
  }, [count, hasCount])

  const resolvedAriaLabel = ariaLabel ?? (displayCount ? String(displayCount) : undefined)

  return (
    <StyledBadgeIndicator
      ref={ref}
      className={className}
      $hasCount={hasCount}
      aria-label={resolvedAriaLabel}
      {...rest}
    >
      {displayCount}
    </StyledBadgeIndicator>
  )
})

BadgeIndicator.displayName = 'BadgeIndicator'

export default BadgeIndicator
