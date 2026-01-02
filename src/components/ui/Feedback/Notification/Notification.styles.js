import styled, { css } from 'styled-components'

export const NotificationRoot = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
  color: ${props => props.theme.colors.text.primary};

  ${props =>
    props.$type === 'inline' &&
    css`
      width: 100%;
    `}

  ${props =>
    props.$kind === 'error' &&
    css`
      border-left: 4px solid ${props.theme.colors.status.error};
    `}
`

export const NotificationDetails = styled.div`
  flex: 1;
  min-width: 0;
`

export const NotificationTitle = styled.div`
  font-weight: 600;
  margin-bottom: 2px;
`

export const NotificationSubtitle = styled.div`
  margin-bottom: 2px;
  color: ${props => props.theme.colors.text.secondary};
`

export const NotificationCaption = styled.div`
  margin-top: 4px;
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.875rem;
`

export const NotificationIconWrap = styled.div`
  margin-top: 2px;
  flex: 0 0 auto;
`

export const NotificationCloseButton = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  color: ${props => props.theme.colors.text.primary};
  padding: 4px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.action.hoverGeneric};
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.action.focus};
    outline-offset: 2px;
  }
`

export const NotificationActionButton = styled.button`
  appearance: none;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surface};
  color: ${props => props.theme.colors.text.primary};
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.action.hoverGeneric};
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.action.focus};
    outline-offset: 2px;
  }
`

export const ActionableButtonWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
