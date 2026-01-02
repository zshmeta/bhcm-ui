import styled, { css } from 'styled-components'

export const MenuList = styled.ul`
  margin: 0;
  padding: 6px;
  list-style: none;
  min-width: 200px;

  background: ${props => props.theme.colors.bg.surfaceRaised};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 10px;
  box-shadow: ${props => props.theme.shadows.popover};

  &:focus {
    outline: none;
  }

  ${props =>
    props.$border &&
    css`
      border-color: ${props.theme.colors.border.strong};
    `}
`

export const MenuItemLi = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const MenuItemButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: ${props => (props.$danger ? props.theme.colors.status.error : props.theme.colors.text.primary)};
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.action.hoverGeneric};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`

export const MenuItemLabel = styled.span`
  flex: 1;
`

export const MenuItemShortcut = styled.span`
  margin-left: auto;
  opacity: 0.8;
`

export const MenuDivider = styled.li`
  list-style: none;
  margin: 6px 0;
  border-top: 1px solid ${props => props.theme.colors.border.subtle};
`

export const MenuGroupLabel = styled.div`
  padding: 6px 10px;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
`

export const MenuCheck = styled.span`
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
