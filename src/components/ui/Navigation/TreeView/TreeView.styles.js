import styled from 'styled-components'

export const TreeRoot = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  font-size: ${props => (props.$size === 'xs' ? '0.875rem' : '1rem')};
`

export const TreeNodeRoot = styled.li`
  margin: 0;
  padding: 0;
`

export const TreeNodeLink = styled.a`
  display: block;
  color: inherit;
  text-decoration: none;

  &:focus {
    outline: 2px solid ${props => props.theme.colors.action.focus};
    outline-offset: 2px;
  }
`

export const TreeNodeButtonLike = styled.div`
  display: flex;
  align-items: center;
  min-height: 32px;
  border-radius: 8px;

  &:hover {
    background: ${props => props.theme.colors.action.hoverGeneric};
  }
`

export const TreeNodeChildren = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: ${props => (props.$hidden ? 'none' : 'block')};
`

export const ToggleButton = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.action.hoverGeneric};
  }
`

export const NodeDetails = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`

export const NodeLabelText = styled.span`
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const NodeIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`
