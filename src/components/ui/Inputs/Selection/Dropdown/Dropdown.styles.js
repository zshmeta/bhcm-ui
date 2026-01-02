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

export const StyledFormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  width: 100%;
`

export const StyledFormLabel = styled.label`
  font-size: 12px;
  line-height: 1.2;
  font-weight: 700;
  color: ${props => props.theme.colors.text.secondary};

  ${props => (props.$hidden ? visuallyHidden : '')}
`

export const StyledDropdownMenu = styled.div`
  position: relative;
  display: inline-flex;
  width: 100%;

  ${props =>
    props.$type === 'inline' &&
    css`
      width: auto;
      min-width: 240px;
    `}
`

function sizeStyles(size, theme) {
  switch (size) {
    case 'sm':
      return css`
        height: 32px;
        padding: 0 ${theme.spacing.sm};
      `
    case 'lg':
      return css`
        height: 48px;
        padding: 0 ${theme.spacing.md};
      `
    case 'md':
    default:
      return css`
        height: 40px;
        padding: 0 ${theme.spacing.md};
      `
  }
}

export const StyledDropdownButton = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.sm};

  border: 1px solid
    ${props =>
      props.$invalid || props.$warn
        ? props.theme.colors.border.strong
        : props.theme.colors.border.subtle};
  border-radius: 6px;
  background: ${props => props.theme.colors.bg.surface};
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;
  text-align: left;

  ${props => sizeStyles(props.$size, props.theme)}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &[aria-disabled='true'] {
    cursor: default;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
  }
`

export const StyledSelectedLabel = styled.span`
  min-width: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const StyledDecoratorSlot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const StyledChevron = styled.span`
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  color: ${props => props.theme.colors.text.secondary};
  display: inline-block;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: currentColor;
    clip-path: polygon(20% 35%, 50% 65%, 80% 35%, 80% 45%, 50% 75%, 20% 45%);
    transform: rotate(${props => (props.$open ? '180deg' : '0deg')});
    transform-origin: 50% 50%;
  }
`

export const StyledDropdownList = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 20;
  margin: 0;
  padding: ${props => props.theme.spacing.xs} 0;
  list-style: none;
  background: ${props => props.theme.colors.bg.surface};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 6px;
  box-shadow: ${props => props.theme.shadows?.popover || 'none'};
  max-height: 260px;
  overflow: auto;

  ${props =>
    props.$direction === 'top'
      ? css`
          bottom: calc(100% + ${props.theme.spacing.xs});
        `
      : css`
          top: calc(100% + ${props.theme.spacing.xs});
        `}
`

export const StyledDropdownItem = styled.li`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
  color: ${props => (props.$disabled ? props.theme.colors.text.secondary : props.theme.colors.text.primary)};
  background: ${props => {
    if (props.$highlighted) return props.theme.colors.action.hoverGeneric
    return 'transparent'
  }};

  ${props =>
    props.$selected &&
    css`
      font-weight: 700;
    `}
`

export const StyledFormHelper = styled.div`
  font-size: 12px;
  line-height: 1.3;
  color: ${props => props.theme.colors.text.secondary};
`

export const StyledStatusText = styled.div`
  font-size: 12px;
  line-height: 1.3;
  color: ${props =>
    props.$kind === 'invalid'
      ? props.theme.colors.text.danger
      : props.theme.colors.text.warning};
`
