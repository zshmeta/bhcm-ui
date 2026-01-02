import styled, { css } from 'styled-components'

const bp = {
  md: 672,
  lg: 1056,
  xlg: 1312,
  max: 1584,
}

export const FlexGridRoot = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-left: var(--fg-pad, ${props => props.theme.spacing.lg});
  padding-right: var(--fg-pad, ${props => props.theme.spacing.lg});

  &.fg--narrow {
    --fg-pad: ${props => props.theme.spacing.md};
  }

  &.fg--condensed {
    --fg-pad: ${props => props.theme.spacing.sm};
  }

  &.fg--fullWidth {
    max-width: 100%;
  }
`

export const RowRoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: calc(var(--fg-gutter, ${props => props.theme.spacing.lg}) / -2);
  margin-right: calc(var(--fg-gutter, ${props => props.theme.spacing.lg}) / -2);

  &.fg-row--narrow {
    --fg-gutter: ${props => props.theme.spacing.md};
  }

  &.fg-row--condensed {
    --fg-gutter: ${props => props.theme.spacing.sm};
  }
`

const colRule = (prop, cols) => css`
  ${typeof prop === 'string'
    ? css`
        flex: 0 0 auto;
        width: ${prop};
        max-width: ${prop};
      `
    : typeof prop === 'number'
      ? css`
          flex: 0 0 auto;
          width: ${prop <= 0 ? '0%' : `${(prop / cols) * 100}%`};
          max-width: ${prop <= 0 ? '0%' : `${(prop / cols) * 100}%`};
          ${prop <= 0
            ? css`
                display: none;
              `
            : null}
        `
      : prop && typeof prop === 'object'
        ? css`
            flex: 0 0 auto;
            width: ${prop.span <= 0 ? '0%' : `${(prop.span / cols) * 100}%`};
            max-width: ${prop.span <= 0 ? '0%' : `${(prop.span / cols) * 100}%`};
            margin-left: ${prop.offset ? `${(prop.offset / cols) * 100}%` : undefined};
            ${prop.span <= 0
              ? css`
                  display: none;
                `
              : null}
          `
        : null}
`

export const ColumnRoot = styled.div`
  min-width: 0;
  padding-left: calc(var(--fg-gutter, ${props => props.theme.spacing.lg}) / 2);
  padding-right: calc(var(--fg-gutter, ${props => props.theme.spacing.lg}) / 2);

  &.fg-col--narrow {
    --fg-gutter: ${props => props.theme.spacing.md};
  }

  &.fg-col--condensed {
    --fg-gutter: ${props => props.theme.spacing.sm};
  }

  /* Auto columns */
  ${props =>
    props.$auto
      ? css`
          flex: 1 1 0;
        `
      : css`
          flex: 0 0 auto;
        `}

  /* Small: 4 cols */
  ${props => (props.$sm != null ? colRule(props.$sm, 4) : null)}

  /* Medium: 8 cols */
  @media (min-width: ${bp.md}px) {
    ${props => (props.$md != null ? colRule(props.$md, 8) : null)}
  }

  /* Large: 16 cols */
  @media (min-width: ${bp.lg}px) {
    ${props => (props.$lg != null ? colRule(props.$lg, 16) : null)}
  }

  @media (min-width: ${bp.xlg}px) {
    ${props => (props.$xlg != null ? colRule(props.$xlg, 16) : null)}
  }

  @media (min-width: ${bp.max}px) {
    ${props => (props.$max != null ? colRule(props.$max, 16) : null)}
  }
`
