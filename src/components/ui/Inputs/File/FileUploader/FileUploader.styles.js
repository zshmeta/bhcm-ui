import styled from 'styled-components'

export const Root = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.xs};
`

export const LabelTitle = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`

export const LabelDescription = styled.div`
  color: ${props => props.theme.colors.text.secondary};
`

export const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`

export const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

export const TriggerButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};
  padding: 0 ${props => props.theme.spacing.md};
  height: 40px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surface};
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.focusRing};
    outline-offset: 2px;
  }
`

export const Files = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.xs};
`

export const FileRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 8px;
  background: ${props => props.theme.colors.bg.surface};
`

export const FileName = styled.div`
  min-width: 0;
  flex: 1;
  color: ${props => props.theme.colors.text.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const FileActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surface};
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.focusRing};
    outline-offset: 2px;
  }
`

export const StatusPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text.secondary};
`
