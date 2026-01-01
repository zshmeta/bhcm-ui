export const BREADCRUMBS_STYLE_ID = 'bhcm-ui-breadcrumbs-styles'

export const breadcrumbsCss = `
.bhcm-breadcrumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: #374151;
}

.bhcm-breadcrumbs__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.bhcm-breadcrumbs__separator {
  color: #9ca3af;
}

.bhcm-breadcrumbs__link {
  color: inherit;
  text-decoration: none;
}

.bhcm-breadcrumbs__link:hover {
  text-decoration: underline;
}

.bhcm-breadcrumbs__current {
  color: #111827;
  font-weight: 600;
}
`

export function ensureBreadcrumbsStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById(BREADCRUMBS_STYLE_ID)) return

  const style = document.createElement('style')
  style.id = BREADCRUMBS_STYLE_ID
  style.textContent = breadcrumbsCss
  document.head.appendChild(style)
}
