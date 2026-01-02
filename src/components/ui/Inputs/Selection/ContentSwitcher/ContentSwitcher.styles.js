import styled, { css } from 'styled-components'

const sizeStyles = {
  sm: css`
    min-height: 28px;

    & [role='tab'] {
      padding: 0 ${props => props.theme.spacing.sm};
      min-height: 28px;
      font-size: 12px;
    }
  `,
  md: css`
    min-height: 32px;

    & [role='tab'] {
      padding: 0 ${props => props.theme.spacing.md};
      min-height: 32px;
      font-size: 13px;
    }
  `,
  lg: css`
    min-height: 40px;

    & [role='tab'] {
      padding: 0 ${props => props.theme.spacing.md};
      min-height: 40px;
      font-size: 14px;
    }
  `,
}

export const StyledTabList = styled.div`
  display: inline-flex;
  align-items: stretch;

  background: ${props =>
    props.$lowContrast ? props.theme.colors.bg.surface : props.theme.colors.bg.surfaceRaised};
  color: ${props => props.theme.colors.text.primary};

  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 6px;

  overflow: hidden;

  & [role='tab'] {
    appearance: none;
    border: 0;

    background: transparent;
    color: inherit;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    gap: ${props => props.theme.spacing.xs};

    white-space: nowrap;

    cursor: pointer;

    &:disabled,
    &[aria-disabled='true'] {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 2px ${props => props.theme.colors.bg.canvas},
        inset 0 0 0 4px ${props => props.theme.colors.action.focus};
      position: relative;
      z-index: 1;
    }
  }

  & [role='tab'][aria-selected='true'] {
    background: ${props => props.theme.colors.bg.surface};
    font-weight: 600;
  }

  & [role='tab']:not([aria-selected='true']):hover:not(:disabled):not([aria-disabled='true']) {
    background: ${props => props.theme.colors.bg.surface};
  }

  & [role='tab'] + [role='tab'] {
    border-left: 1px solid ${props => props.theme.colors.border.subtle};
  }

  ${props => (props.$size ? sizeStyles[props.$size] : null)}

  ${props =>
    props.$iconOnly &&
    css`
      & [role='tab'] {
        padding-left: ${props.theme.spacing.sm};
        padding-right: ${props.theme.spacing.sm};
      }
    `}

  ${props =>
    props.$light &&
    css`
      background: ${props.theme.colors.bg.surface};
    `}
`
