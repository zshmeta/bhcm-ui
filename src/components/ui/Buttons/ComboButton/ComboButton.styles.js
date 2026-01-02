import styled, { css } from 'styled-components'
import { Button } from '../Button'

export const Container = styled.div`
  display: inline-flex;
  align-items: stretch;
  min-width: 0;
`

export const PrimaryAction = styled(Button)`
  && {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    min-width: 0;
  }

  && > span,
  && {
    min-width: 0;
  }
`

export const TriggerAction = styled(Button)`
  && {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding: 0;
    width: ${props => (props.$size === 'xs' ? '28px' : props.$size === 'sm' ? '32px' : props.$size === 'lg' ? '48px' : '40px')};
    border-left: 1px solid ${props => props.theme.colors.border.subtle};
  }
`

export const MenuPanel = styled.ul`
  position: fixed;
  z-index: 1000;

  margin: 0;
  padding: 6px;
  list-style: none;

  border-radius: 10px;
  background: ${props => props.theme.colors.bg.surface};
  border: 1px solid ${props => props.theme.colors.border.subtle};

  min-width: ${props => (props.$minWidth ? `${props.$minWidth}px` : '180px')};
  max-width: 360px;
  max-height: 320px;
  overflow: auto;

  box-shadow: ${props => props.theme.shadows?.popover || 'none'};
`

export const MenuItemShell = styled.li`
  display: block;

  ${props =>
    props.$divider &&
    css`
      height: 1px;
      margin: 6px 4px;
      background: ${props.theme.colors.border.subtle};
    `}
`

export const MenuItemButton = styled.button`
  width: 100%;
  border: 0;
  background: transparent;
  color: ${props => props.theme.colors.text.primary};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.action.hoverGeneric};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
  }

  &[aria-disabled='true'],
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`

export const MenuItemLabel = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const MenuItemIconSlot = styled.span`
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`
