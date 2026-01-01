import { useEffect } from 'react'
import { ensureBreadcrumbsStyles } from '../Breadcrumb/Breadcrumb.styles'

export default function BreadcrumbItem({
  href,
  current = false,
  separator = '/',
  children,
}) {
  useEffect(() => {
    ensureBreadcrumbsStyles()
  }, [])

  return (
    <li className="bhcm-breadcrumbs">
      {href && !current ? (
        <a className="bhcm-breadcrumbs__link" href={href}>
          {children}
        </a>
      ) : (
        <span
          className={current ? 'bhcm-breadcrumbs__current' : undefined}
          aria-current={current ? 'page' : undefined}
        >
          {children}
        </span>
      )}
      <span className="bhcm-breadcrumbs__separator" aria-hidden="true">
        {separator}
      </span>
    </li>
  )
}
