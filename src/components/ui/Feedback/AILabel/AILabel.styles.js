import styled, { css } from 'styled-components'

export const StyledAILabelWrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`

const sizeStyles = {
  mini: css`
    height: 16px;
    padding: 0 6px;
    font-size: 10px;
  `,
  '2xs': css`
    height: 18px;
    padding: 0 7px;
    font-size: 10px;
  `,
  xs: css`
    height: 20px;
    padding: 0 8px;
    font-size: 11px;
  `,
  sm: css`
    height: 22px;
    padding: 0 10px;
    font-size: 12px;
  `,
  md: css`
    height: 24px;
    padding: 0 10px;
    font-size: 12px;
  `,
  lg: css`
    height: 26px;
    padding: 0 12px;
    font-size: 12px;
  `,
  xl: css`
    height: 28px;
    padding: 0 12px;
    font-size: 12px;
  `,
}

export const StyledTrigger = styled.button`
  appearance: none;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
  color: ${props => props.theme.colors.text.primary};
  border-radius: 999px;

  display: inline-flex;
  align-items: center;
  gap: 6px;

  cursor: pointer;

  ${props => (props.$size ? sizeStyles[props.$size] : sizeStyles.xs)}

  ${props =>
    props.$kind === 'inline' &&
    css`
      border-radius: 6px;
      padding-left: 8px;
      padding-right: 8px;
    `}

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
  }

  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

export const StyledAIText = styled.span`
  font-weight: 800;
  letter-spacing: 0.02em;
`

export const StyledAdditionalText = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.text.secondary};
`

export const StyledRevertButton = styled.button`
  appearance: none;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: transparent;
  color: ${props => props.theme.colors.text.primary};

  border-radius: 6px;
  height: 28px;
  width: 28px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.action.hoverGeneric};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
  }
`

export const StyledPopover = styled.div`
  position: fixed;
  z-index: 1000;

  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surface};
  color: ${props => props.theme.colors.text.primary};

  border-radius: 8px;
  overflow: hidden;
  max-width: min(420px, calc(100vw - 16px));
`

export const StyledPopoverInner = styled.div`
  padding: ${props => props.theme.spacing.sm};
`

export const StyledAILabelContent = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.xs};

  ${props =>
    props.$withActions &&
    css`
      padding-bottom: 0;
    `}
`

export const StyledAILabelActions = styled.div`
  margin-top: ${props => props.theme.spacing.sm};
  padding-top: ${props => props.theme.spacing.sm};
  border-top: 1px solid ${props => props.theme.colors.border.subtle};

  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  flex-wrap: wrap;
`
