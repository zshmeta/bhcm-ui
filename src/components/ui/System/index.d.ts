import type { ComponentType, ReactNode } from 'react'

export const GlobalTheme: ComponentType<{ children?: ReactNode; theme?: string }>

// This folder is authored in JS and re-exports many components.
// Keep the rest permissive for now so TS can compile the gallery.
export const Theme: any
export const ThemeSkeleton: any
export const usePrefersDarkScheme: any
export const useTheme: any
