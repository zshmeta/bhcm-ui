import styled from 'styled-components'

const bp = {
  md: 672,
  lg: 1056,
  xlg: 1312,
  max: 1584,
}

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
}

export const GridOuter = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-left: var(--bhcm-grid-pad, ${props => props.theme.spacing.lg});
  padding-right: var(--bhcm-grid-pad, ${props => props.theme.spacing.lg});

  &.bhcm-grid--narrow {
    --bhcm-grid-pad: ${props => props.theme.spacing.md};
  }

  &.bhcm-grid--condensed {
    --bhcm-grid-pad: ${props => props.theme.spacing.sm};
  }

  &.bhcm-grid--fullWidth {
    max-width: 100%;
  }

  /* Carbon Grid defaults to a max-width when not fullWidth; we let the page
     layout control that and keep this as a full-width container */
`

export const GridRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props => alignMap[props.$align] || alignMap.center};
  margin-left: calc(var(--bhcm-grid-gutter, ${props => props.theme.spacing.lg}) / -2);
  margin-right: calc(var(--bhcm-grid-gutter, ${props => props.theme.spacing.lg}) / -2);

  &.bhcm-grid-row--narrow {
    --bhcm-grid-gutter: ${props => props.theme.spacing.md};
  }

  &.bhcm-grid-row--condensed {
    --bhcm-grid-gutter: ${props => props.theme.spacing.sm};
  }
`

// Export breakpoints for consumers that want to align to the same cutoffs
export const gridBreakpoints = bp
