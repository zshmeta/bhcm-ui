import React from 'react'
import { useTheme } from 'styled-components'
import { StyledIcon, StyledLabel, StyledShapeIndicator } from './ShapeIndicator.styles'

export const ShapeIndicatorKinds = [
  'failed',
  'critical',
  'high',
  'medium',
  'low',
  'cautious',
  'undefined',
  'stable',
  'informative',
  'incomplete',
  'draft',
]

function kindToShape(kind) {
  return kind === 'failed' || kind === 'critical' || kind === 'high' ? 'diamond' : 'circle'
}

function kindToColor(kind, theme) {
  const t = theme && theme.colors ? theme : null
  if (!t) return 'currentColor'

  if (kind === 'failed' || kind === 'critical' || kind === 'high') return t.colors.status.error
  if (kind === 'medium' || kind === 'cautious') return t.colors.action.secondary
  return t.colors.border.subtle
}

function kindToFill(kind) {
  return kind !== 'undefined' && kind !== 'incomplete'
}

export default function ShapeIndicator({
  className,
  kind = 'undefined',
  label,
  textSize = 12,
  children,
  ...rest
}) {
  const theme = useTheme()
  const renderedLabel = children ?? label
  const color = kindToColor(kind, theme)

  return (
    <StyledShapeIndicator
      className={className}
      $textSize={textSize}
      $color={color}
      {...rest}
    >
      <StyledIcon
        $shape={kindToShape(kind)}
        $fill={kindToFill(kind)}
        $color={color}
        aria-hidden="true"
      />
      <StyledLabel $textSize={textSize}>{renderedLabel}</StyledLabel>
    </StyledShapeIndicator>
  )
}

ShapeIndicator.displayName = 'ShapeIndicator'
