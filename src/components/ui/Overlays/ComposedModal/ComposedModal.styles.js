import styled, { css } from 'styled-components'

export const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Why: avoid hard-coded colors; derive scrim from theme tokens. */
  background: color-mix(
    in srgb,
    ${props => props.theme.colors.text.primary} 42%,
    transparent
  );

  opacity: ${props => (props.$isOpen ? 1 : 0)};
  pointer-events: ${props => (props.$isOpen ? 'auto' : 'none')};
  transition: opacity 160ms cubic-bezier(0.2, 0, 0.38, 0.9);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const sizeStyles = {
  xs: css`
    width: 420px;
  `,
  sm: css`
    width: 520px;
  `,
  md: css`
    width: 680px;
  `,
  lg: css`
    width: 860px;
  `,
}

export const StyledDialog = styled.div`
  width: 680px;
  max-width: calc(100vw - 2 * ${props => props.theme.spacing.md});
  max-height: calc(100vh - 2 * ${props => props.theme.spacing.md});

  display: flex;
  flex-direction: column;

  background: ${props => props.theme.colors.bg.surface};
  color: ${props => props.theme.colors.text.primary};

  border-radius: 6px;
  border: 1px solid ${props => props.theme.colors.border.subtle};

  ${props => (props.$size ? sizeStyles[props.$size] : null)}

  ${props =>
    props.$isFullWidth &&
    css`
      width: min(100vw, 980px);
      padding: 0;
    `}

  ${props =>
    props.$danger &&
    css`
      border-top: 2px solid ${props.theme.colors.status.error};
    `}

  &:focus {
    outline: none;
  }
`

export const StyledInner = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
`

export const StyledDecorator = styled.div`
  padding: ${props => props.theme.spacing.sm};
  border-bottom: 1px solid ${props => props.theme.colors.border.subtle};
`

export const StyledHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.sm};

  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border.subtle};
`

export const StyledHeaderText = styled.div`
  min-width: 0;
`

export const StyledLabel = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.text.muted};
  font-weight: 600;
  line-height: 1.2;
`

export const StyledTitle = styled.div`
  margin-top: 2px;
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.2;
`

export const StyledCloseButton = styled.button`
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.action.hoverGeneric};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
  }
`

export const StyledBody = styled.div`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  min-height: 0;

  ${props =>
    props.$isFullWidth &&
    css`
      padding: 0;
    `}

  ${props =>
    props.$hasScrollingContent &&
    css`
      overflow: auto;
    `}
`

export const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.xs};

  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border.subtle};
`

export const StyledFooterButton = styled.button`
  height: 32px;
  padding: 0 ${props => props.theme.spacing.sm};
  border-radius: 4px;
  border: 1px solid transparent;
  font-weight: 700;
  cursor: pointer;

  ${props =>
    props.$kind === 'secondary' &&
    css`
      background: ${props.theme.colors.action.secondary};
      color: ${props.theme.colors.text.inverse};
    `}

  ${props =>
    props.$kind === 'primary' &&
    css`
      background: ${props.theme.colors.action.primary};
      color: ${props.theme.colors.text.inverse};
    `}

  ${props =>
    props.$kind === 'danger' &&
    css`
      background: ${props.theme.colors.status.error};
      color: ${props.theme.colors.text.inverse};
    `}

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
  }
`
