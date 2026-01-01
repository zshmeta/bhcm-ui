export const TABS_STYLE_ID = 'bhcm-ui-tabs-styles'

export const tabsCss = `
.bhcm-tabs {
  width: 100%;
}

.bhcm-tablist {
  display: inline-flex;
  gap: 0.25rem;
  border-bottom: 1px solid #e5e7eb;
}

.bhcm-tab {
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0.5rem 0.75rem;
  font: inherit;
  color: #374151;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.bhcm-tab:hover {
  color: #111827;
}

.bhcm-tab[data-active='true'] {
  color: #111827;
  border-bottom-color: #111827;
  font-weight: 600;
}

.bhcm-tabpanel {
  padding-top: 0.75rem;
}
`

export function ensureTabsStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById(TABS_STYLE_ID)) return

  const style = document.createElement('style')
  style.id = TABS_STYLE_ID
  style.textContent = tabsCss
  document.head.appendChild(style)
}
