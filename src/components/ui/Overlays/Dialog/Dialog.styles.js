import styled, { css } from 'styled-components'

export const StyledBackdrop = styled.div`
  position: fixed;
  inset: 0;
  display: ${props => (props.$open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.md};
  z-index: 1000;
`

export const StyledDialog = styled.dialog`
  width: 680px;
  max-width: calc(100vw - 2 * ${props => props.theme.spacing.md});
  max-height: calc(100vh - 2 * ${props => props.theme.spacing.md});

  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 6px;
  padding: 0;
  overflow: hidden;

  background: ${props => props.theme.colors.bg.surface};
  color: ${props => props.theme.colors.text.primary};

  box-shadow: ${props => props.theme.shadows?.modal || 'none'};

  &:focus {
    outline: none;
  }

  &::backdrop {
    background: color-mix(in srgb, ${props => props.theme.colors.text.primary} 32%, transparent);
  }

  ${props =>
    props.$modal === false &&
    css`
      &::backdrop {
        background: transparent;
      }
    `}
`

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
`

export const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${props => props.theme.spacing.sm};
  align-items: start;

  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export const StyledTitle = styled.div`
  font-size: 16px;
  line-height: 1.2;
  font-weight: 800;
`

export const StyledSubtitle = styled.div`
  font-size: 12px;
  line-height: 1.2;
  font-weight: 700;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 4px;
`

export const StyledControls = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
`

export const StyledCloseButton = styled.button`
  appearance: none;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: transparent;
  color: ${props => props.theme.colors.text.primary};
  border-radius: 6px;
  height: 32px;
  width: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
  background: ${props => props.theme.colors.bg.surface};
`
