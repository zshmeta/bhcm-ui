import styled, { css } from 'styled-components'

const sizeStyles = {
  sm: css`
    font-size: 12px;
  `,
  md: css`
    font-size: 13px;
  `,
  lg: css`
    font-size: 14px;
  `,
  xl: css`
    font-size: 15px;
  `,
}

export const StyledRoot = styled.div`
  background: ${props => props.theme.colors.bg.surface};
  color: ${props => props.theme.colors.text.primary};

  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: ${props => (props.$kind === 'disclosed' ? '0px' : '6px')};

  overflow: hidden;

  ${props => (props.$size ? sizeStyles[props.$size] : null)}
`

export const StyledStickyTop = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;

  background: ${props => props.theme.colors.bg.surface};

  border-bottom: 1px solid ${props => props.theme.colors.border.subtle};
`

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};

  min-height: 44px;
`

export const StyledLabel = styled.div`
  flex: 1 1 auto;
  min-width: 0;

  font-weight: 600;
  line-height: 1.2;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const StyledActionSlot = styled.div`
  flex: 0 0 auto;
  min-width: 0;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > * {
    max-width: 100%;
  }
`

export const StyledSearchRow = styled.div`
  padding: 0 ${props => props.theme.spacing.md} ${props => props.theme.spacing.sm};

  & > * {
    width: 100%;
  }
`

export const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const StyledItemShell = styled.li`
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;

  background: ${props => props.theme.colors.bg.surface};

  ${props =>
    props.$clickable &&
    !props.$disabled &&
    css`
      &:hover {
        background: ${props.theme.colors.bg.surfaceRaised};
      }
    `}

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: ${props => (props.$isInset ? props.theme.spacing.md : '0')};
    right: ${props => (props.$isInset ? props.theme.spacing.md : '0')};
    bottom: 0;
    height: 1px;
    background: ${props => props.theme.colors.border.subtle};
  }
`

export const StyledItemRow = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.md};

  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
`

export const StyledItemMain = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  min-width: 0;
  flex: 1 1 auto;
`

export const StyledItemIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${props => props.theme.colors.text.muted};

  & > svg {
    display: block;
  }
`

export const StyledItemText = styled.div`
  min-width: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const StyledItemAction = styled.div`
  flex: 0 0 auto;
  min-width: 0;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > * {
    max-width: 100%;
  }
`

export const StyledItemButton = styled.button`
  flex: 1 1 auto;
  min-width: 0;

  appearance: none;
  border: 0;
  padding: 0;
  margin: 0;

  background: transparent;
  color: inherit;
  text-align: left;

  cursor: pointer;

  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px ${props => props.theme.colors.action.focus};
    position: relative;
    z-index: 1;
  }
`
