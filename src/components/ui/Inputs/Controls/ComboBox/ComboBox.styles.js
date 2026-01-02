import styled, { css } from 'styled-components'

export const Root = styled.div`
  display: grid;
  gap: 6px;
  min-width: 0;
`

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export const Label = styled.label`
  font-size: 12px;
  line-height: 1.2;
  font-weight: 700;
  color: ${props => props.theme.colors.text.secondary};

  ${props =>
    props.$hide &&
    css`
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `}
`

export const DecoratorSlot = styled.div`
  display: inline-flex;
  align-items: center;
`

export const Control = styled.div`
  position: relative;
  min-width: 0;
`

const sizeStyles = {
  sm: css`
    height: 32px;
    padding: 0 10px;
    font-size: 13px;
  `,
  md: css`
    height: 40px;
    padding: 0 12px;
    font-size: 14px;
  `,
  lg: css`
    height: 48px;
    padding: 0 14px;
    font-size: 15px;
  `,
}

export const Field = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 8px;
  min-width: 0;

  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surface};

  ${props => sizeStyles[props.$size || 'md']}

  ${props =>
    props.$invalid &&
    css`
      border-color: ${props.theme.colors.status.error};
    `}

  ${props =>
    props.$warn &&
    !props.$invalid &&
    css`
      border-color: ${props.theme.colors.border.strong};
    `}

  ${props =>
    props.$disabled &&
    css`
      opacity: 0.65;
      background: ${props.theme.colors.bg.surfaceRaised};
    `}

  &:focus-within {
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
  }
`

export const Input = styled.input`
  width: 100%;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: ${props => props.theme.colors.text.primary};

  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
  }

  &[disabled] {
    cursor: not-allowed;
  }
`

export const ToggleButton = styled.button`
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: ${props => props.theme.colors.text.secondary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.action.hoverGeneric};
    color: ${props => props.theme.colors.text.primary};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

export const Menu = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 6px);
  z-index: 30;

  margin: 0;
  padding: 6px;
  list-style: none;

  border-radius: 10px;
  background: ${props => props.theme.colors.bg.surface};
  border: 1px solid ${props => props.theme.colors.border.subtle};

  max-height: 260px;
  overflow: auto;
`

export const Item = styled.li`
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;

  color: ${props => props.theme.colors.text.primary};

  ${props =>
    props.$disabled &&
    css`
      opacity: 0.55;
      cursor: not-allowed;
    `}

  ${props =>
    props.$highlighted &&
    css`
      background: ${props.theme.colors.action.hoverGeneric};
    `}
`

export const ItemText = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ItemMarker = styled.span`
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  color: ${props => props.theme.colors.action.primary};
`

export const Helper = styled.div`
  font-size: 11px;
  line-height: 1.25;
  color: ${props => props.theme.colors.text.secondary};
`

export const Validation = styled.div`
  display: grid;
  gap: 6px;
`

export const ValidationRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  color: ${props => (props.$variant === 'invalid' ? props.theme.colors.status.error : props.theme.colors.text.secondary)};
`

export const Icon = styled.span`
  width: 14px;
  height: 14px;
  margin-top: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`

export const Message = styled.div`
  font-size: 11px;
  line-height: 1.25;
  color: inherit;
`
