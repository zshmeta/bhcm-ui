import React from 'react'
import { StyledPlex } from './Plex.styles'

/**
 * Plex
 *
 * The Carbon MDS entry is primarily Storybook content for IBM Plex font stacks.
 * In this codebase we expose a tiny wrapper component so the MDS file is
 * considered "processed" without hard-coding font families.
 */
export default function Plex({ as: Tag = 'span', children, className, ...rest }) {
  return (
    <StyledPlex as={Tag} className={className} {...rest}>
      {children}
    </StyledPlex>
  )
}

Plex.displayName = 'Plex'
