import styled, { css } from 'styled-components'

const visuallyHidden = css`
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

function heightForSize(size) {
  switch (size) {
    case 'sm':
      return 32
    case 'lg':
      return 48
    case 'md':
    default:
      return 40
  }
}

export const StyledRoot = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  width: 100%;
`

export const StyledMagnifierButton = styled.button`
  width: ${props => heightForSize(props.theme?.sizes?.search || 'md')}px;
  height: ${props => heightForSize(props.theme?.sizes?.search || 'md')}px;

  width: ${props => heightForSize(props.$size)}px;
  height: ${props => heightForSize(props.$size)}px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 6px;
  background: ${props => props.theme.colors.bg.surface};
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
  }
`

export const StyledSearchIcon = styled.span`
  width: 16px;
  height: 16px;
  background: currentColor;
  border-radius: 999px;
  display: inline-block;
  mask: radial-gradient(circle at 35% 35%, transparent 6px, #000 6px) 0 0/100% 100% no-repeat;
`

export const StyledLabel = styled.label`
  font-size: 12px;
  line-height: 1.2;
  font-weight: 700;
  color: ${props => props.theme.colors.text.secondary};

  ${props => (props.$expanded ? visuallyHidden : visuallyHidden)}
`

export const StyledSearchInput = styled.input`
  height: ${props => heightForSize(props.$size || 'md')}px;
  min-width: 0;
  flex: 1;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 6px;
  padding: 0 ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.bg.surface};
  color: ${props => props.theme.colors.text.primary};

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
  }

  ${props =>
    props.$expanded === false &&
    css`
      width: 0;
      padding: 0;
      border-color: transparent;
      opacity: 0;
      pointer-events: none;
    `}
`

export const StyledClearButton = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 6px;
  background: ${props => props.theme.colors.bg.surface};
  cursor: pointer;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 14px;
    height: 2px;
    background: ${props => props.theme.colors.text.secondary};
    transform-origin: center;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  ${props =>
    !props.$visible &&
    css`
      visibility: hidden;
      pointer-events: none;
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`
