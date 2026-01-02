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

export const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  width: 100%;
`

export const StyledLabel = styled.label`
  font-size: 12px;
  line-height: 1.2;
  font-weight: 700;
  color: ${props => props.theme.colors.text.secondary};
  ${props => (props.$hidden ? visuallyHidden : '')}
`

export const StyledTrack = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
`

export const StyledInput = styled.input`
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  height: 32px;
  background: transparent;
  &:focus-visible {
    outline: none;
  }
`

export const StyledHelp = styled.div`
  font-size: 12px;
  line-height: 1.3;
  color: ${props => {
    if (props.$variant === 'invalid') return props.theme.colors.text.danger
    if (props.$variant === 'warn') return props.theme.colors.text.warning
    return props.theme.colors.text.secondary
  }};
`
