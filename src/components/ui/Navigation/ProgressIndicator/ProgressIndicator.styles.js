import styled, { css } from 'styled-components'

export const StyledProgressList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: flex;
  gap: 8px;

  ${props =>
    props.$vertical &&
    css`
      flex-direction: column;
      gap: 6px;
    `}
`

export const StyledStepItem = styled.li`
  display: flex;
  min-width: 0;
`

export const StyledStepButton = styled.button`
  appearance: none;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
  color: ${props => props.theme.colors.text.primary};

  display: grid;
  grid-template-columns: 16px 1fr;
  align-items: center;
  column-gap: 8px;

  padding: 8px 10px;
  border-radius: 8px;
  width: 100%;
  text-align: left;

  ${props =>
    props.$spaceEqually &&
    css`
      flex: 1 1 0;
    `}

  ${props =>
    props.$current &&
    css`
      border-color: ${props.theme.colors.action.primary};
    `}

  ${props =>
    props.$complete &&
    css`
      border-color: ${props.theme.colors.action.secondary};
    `}

  ${props =>
    props.$invalid &&
    css`
      border-color: ${props.theme.colors.status.error};
    `}

  ${props =>
    props.$disabled &&
    css`
      opacity: 0.55;
      cursor: not-allowed;
    `}
`

export const StyledTextWrap = styled.div`
  min-width: 0;
`

export const StyledLabel = styled.div`
  font-size: 12px;
  line-height: 1.1;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const StyledSecondary = styled.div`
  margin-top: 2px;
  font-size: 11px;
  line-height: 1.1;
  color: ${props => props.theme.colors.text.secondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const StyledAssistive = styled.span`
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

export const StyledIconWrap = styled.span`
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
`
