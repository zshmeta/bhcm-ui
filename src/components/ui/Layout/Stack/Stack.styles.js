import styled from 'styled-components'

const numberGap = (gap, theme) => {
  if (gap == null) return undefined
  if (typeof gap === 'string') return gap

  // Carbon supports 1..10. Our theme spacing is xs..xl.
  // Map 1..5 to xs..xl and clamp beyond.
  const map = {
    1: theme.spacing.xs,
    2: theme.spacing.sm,
    3: theme.spacing.md,
    4: theme.spacing.lg,
    5: theme.spacing.xl,
  }

  return map[gap] || theme.spacing.xl
}

export const StackRoot = styled.div`
  display: flex;
  flex-direction: ${props => (props.$orientation === 'horizontal' ? 'row' : 'column')};
  gap: ${props => numberGap(props.$gap, props.theme) || props.theme.spacing.md};
`
