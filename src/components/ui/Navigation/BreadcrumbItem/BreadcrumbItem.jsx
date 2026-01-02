import React, { forwardRef, useMemo } from 'react'
import {
  StyledBreadcrumbItem,
  StyledBreadcrumbLink,
  StyledBreadcrumbText,
} from './BreadcrumbItem.styles'

/**
 * BreadcrumbItem
 *
 * Preserved Carbon behaviors:
 * - Supports `href` OR arbitrary children
 * - Supports `isCurrentPage` + `aria-current`
 *
 * Notes:
 * - Carbon had special integration for OverflowMenu (auto icon injection). We intentionally do not
 *   mutate/clone children here; consumers can render any component inside the item.
 *
 * @param {object} props
 * @param {string} [props.href]
 * @param {boolean} [props.isCurrentPage]
 * @param {string|boolean} [props['aria-current']]
 */
const BreadcrumbItem = forwardRef(function BreadcrumbItem(
  { children, className, href, isCurrentPage = false, 'aria-current': ariaCurrent, ...rest },
  ref
) {
  const resolvedAriaCurrent = useMemo(() => {
    if (ariaCurrent !== undefined) return ariaCurrent
    return isCurrentPage ? 'page' : undefined
  }, [ariaCurrent, isCurrentPage])

  const isCurrent = resolvedAriaCurrent === 'page' || isCurrentPage === true

  return (
    <StyledBreadcrumbItem
      ref={ref}
      className={className}
      $isCurrent={isCurrent}
      {...rest}
    >
      {href ? (
        <StyledBreadcrumbLink href={href} aria-current={resolvedAriaCurrent}>
          {children}
        </StyledBreadcrumbLink>
      ) : (
        <StyledBreadcrumbText aria-current={resolvedAriaCurrent}>
          {children}
        </StyledBreadcrumbText>
      )}
    </StyledBreadcrumbItem>
  )
})

BreadcrumbItem.displayName = 'BreadcrumbItem'

export default BreadcrumbItem
