import React, { forwardRef } from 'react'
import { StyledList, StyledNav } from './Breadcrumb.styles'

/**
 * Breadcrumb
 *
 * Preserved Carbon behaviors:
 * - `aria-label` defaults to "Breadcrumb"
 * - `noTrailingSlash` controls whether the final separator is shown
 * - `size` supports `sm` and `md`
 *
 * @param {object} props
 * @param {string} [props['aria-label']] - Label for the breadcrumb nav.
 * @param {boolean} [props.noTrailingSlash] - Omit trailing separator after last item.
 * @param {'sm'|'md'} [props.size='md'] - Density/typography.
 * @param {React.ReactNode} [props.children]
 */
const Breadcrumb = forwardRef(function Breadcrumb(
  { 'aria-label': ariaLabel, children, className, noTrailingSlash = false, size = 'md', ...rest },
  ref
) {
  return (
    <StyledNav
      className={className}
      aria-label={ariaLabel || 'Breadcrumb'}
      ref={ref}
      {...rest}
    >
      <StyledList $noTrailingSlash={noTrailingSlash} $size={size}>
        {children}
      </StyledList>
    </StyledNav>
  )
})

Breadcrumb.displayName = 'Breadcrumb'

export default Breadcrumb
