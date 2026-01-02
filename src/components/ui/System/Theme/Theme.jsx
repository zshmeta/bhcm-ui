import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

const ThemeContext = createContext({ theme: undefined, isDark: false })

function getIsDarkTheme(themeName) {
  return themeName === 'g90' || themeName === 'g100'
}

function getFallbackThemeTokens() {
  // Provide a stable token shape without hard-coding specific colors.
  // Values default to CSS variables (if the app defines them) or safe fallbacks.
  const v = (name, fallback) => `var(${name}, ${fallback})`

  return {
    colors: {
      bg: {
        canvas: v('--bhcm-bg-canvas', 'transparent'),
        surface: v('--bhcm-bg-surface', 'transparent'),
        surfaceRaised: v('--bhcm-bg-surface-raised', 'transparent'),
      },
      text: {
        primary: v('--bhcm-text-primary', 'currentColor'),
        secondary: v('--bhcm-text-secondary', 'currentColor'),
        muted: v('--bhcm-text-muted', 'currentColor'),
        inverse: v('--bhcm-text-inverse', 'currentColor'),
        disabled: v('--bhcm-text-disabled', 'currentColor'),
      },
      border: {
        subtle: v('--bhcm-border-subtle', 'currentColor'),
        strong: v('--bhcm-border-strong', 'currentColor'),
      },
      action: {
        primary: v('--bhcm-action-primary', 'currentColor'),
        primaryHover: v('--bhcm-action-primary-hover', 'currentColor'),
        secondary: v('--bhcm-action-secondary', 'currentColor'),
        secondaryHover: v('--bhcm-action-secondary-hover', 'currentColor'),
        focus: v('--bhcm-action-focus', 'currentColor'),
        hoverGeneric: v('--bhcm-action-hover-generic', 'transparent'),
        disabled: v('--bhcm-action-disabled', 'transparent'),
      },
      status: {
        error: v('--bhcm-status-error', 'currentColor'),
        errorHover: v('--bhcm-status-error-hover', 'currentColor'),
      },
    },
    spacing: {
      xs: v('--bhcm-space-xs', '4px'),
      sm: v('--bhcm-space-sm', '8px'),
      md: v('--bhcm-space-md', '16px'),
      lg: v('--bhcm-space-lg', '24px'),
      xl: v('--bhcm-space-xl', '32px'),
    },
    shadows: {
      popover: v('--bhcm-shadow-popover', 'none'),
      modal: v('--bhcm-shadow-modal', 'none'),
    },
  }
}

export function useTheme() {
  return useContext(ThemeContext)
}

export function usePrefersDarkScheme() {
  const getInitial = () => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const [prefersDark, setPrefersDark] = useState(getInitial)

  useEffect(() => {
    if (!window.matchMedia) return undefined
    const mql = window.matchMedia('(prefers-color-scheme: dark)')

    const onChange = event => setPrefersDark(event.matches)
    mql.addEventListener?.('change', onChange)
    mql.addListener?.(onChange)

    return () => {
      mql.removeEventListener?.('change', onChange)
      mql.removeListener?.(onChange)
    }
  }, [])

  return prefersDark
}

export function GlobalTheme({ children, theme }) {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    if (!theme || typeof theme !== 'string') return undefined

    const root = document.documentElement
    const previous = root.getAttribute('data-theme')
    root.setAttribute('data-theme', theme)
    return () => {
      if (previous == null) root.removeAttribute('data-theme')
      else root.setAttribute('data-theme', previous)
    }
  }, [theme])

  return <Theme theme={theme}>{children}</Theme>
}

export default function Theme({ children, theme }) {
  const themeName = typeof theme === 'string' ? theme : undefined
  const isDark = themeName ? getIsDarkTheme(themeName) : false

  const themeTokens = useMemo(() => {
    if (theme && typeof theme === 'object') return theme
    return getFallbackThemeTokens()
  }, [theme])

  const value = useMemo(() => ({ theme: themeName, isDark }), [themeName, isDark])

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={themeTokens}>
        <span data-theme={themeName}>{children}</span>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

Theme.displayName = 'Theme'

Theme.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

GlobalTheme.displayName = 'GlobalTheme'

GlobalTheme.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.string.isRequired,
}
