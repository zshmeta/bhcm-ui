import styled, { css } from 'styled-components'

export const StyledTabsRoot = styled.div`
  width: 100%;
`

export const StyledTabList = styled.div`
  display: inline-flex;
  gap: 4px;
  border-bottom: 1px solid ${props => props.theme.colors.border.subtle};
`

export const StyledTabButton = styled.button`
  appearance: none;
  background: transparent;
  border: 0;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font: inherit;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  color: ${props => props.theme.colors.text.secondary};

  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px ${props => props.theme.colors.action.focus};
  }

  ${props =>
    props.$active &&
    css`
      color: ${props.theme.colors.text.primary};
      border-bottom-color: ${props.theme.colors.text.primary};
      font-weight: 600;
    `}
`

export const StyledTabPanel = styled.div`
  padding-top: ${props => props.theme.spacing.md};
`
