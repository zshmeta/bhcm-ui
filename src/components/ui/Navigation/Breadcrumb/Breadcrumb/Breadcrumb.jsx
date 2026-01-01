import { useEffect } from 'react'
import { ensureBreadcrumbsStyles } from './Breadcrumb.styles'

export default function Breadcrumbs({ children, className, ...props }) {
  useEffect(() => {
    ensureBreadcrumbsStyles()
  }, [])

  return (
    <nav aria-label="Breadcrumb" className={className} {...props}>
      <ol className="bhcm-breadcrumbs__list">{children}</ol>
    </nav>
  )
}
