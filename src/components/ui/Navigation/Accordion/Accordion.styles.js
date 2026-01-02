import styled, { css } from 'styled-components'

const sizeStyles = {
  sm: css`
    font-size: 12px;
  `,
  md: css`
    font-size: 13px;
  `,
  lg: css`
    font-size: 14px;
  `,
}

export const StyledAccordionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  ${props =>
    props.$isFlush &&
    css`
      border-top: 1px solid ${props.theme.colors.border.subtle};
      border-bottom: 1px solid ${props.theme.colors.border.subtle};
    `}

  ${props => (props.$size ? sizeStyles[props.$size] : null)}
`

export const StyledAccordionItem = styled.li`
  background: ${props => props.theme.colors.bg.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border.subtle};

  ${props =>
    props.$isOpen &&
    !props.$disabled &&
    css`
      background: ${props.theme.colors.bg.surfaceRaised};
    `}

  ${props =>
    props.$disabled &&
    css`
      opacity: 0.6;
    `}
`

export const StyledAccordionHeading = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.xs};

  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};

  background: transparent;
  border: 0;
  color: ${props => props.theme.colors.text.primary};
  text-align: left;

  cursor: pointer;

  ${props =>
    props.$isFlush &&
    css`
      padding-left: ${props.theme.spacing.xs};
      padding-right: ${props.theme.spacing.xs};
    `}

  ${props =>
    props.$align === 'start' &&
    css`
      justify-content: flex-start;
    `}

  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px
      ${props => props.theme.colors.action.focus};
    position: relative;
    z-index: 1;
  }
`

export const StyledTitle = styled.div`
  flex: 1;
  min-width: 0;
  font-weight: 600;
  color: inherit;
`

export const StyledChevron = styled.span`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: ${props => props.theme.colors.text.muted};

  transition: transform 160ms cubic-bezier(0.2, 0, 0.38, 0.9);

  ${props =>
    props.$isOpen &&
    css`
      transform: rotate(90deg);
    `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const StyledPanelOuter = styled.div`
  overflow: hidden;
  max-height: ${props => (props.$isOpen ? 'none' : '0px')};
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  visibility: ${props => (props.$isOpen ? 'visible' : 'hidden')};

  transition: max-height 160ms cubic-bezier(0.2, 0, 0.38, 0.9), opacity 160ms;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const StyledPanelInner = styled.div`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm}
    ${props => props.theme.spacing.sm};

  ${props =>
    props.$isFlush &&
    css`
      padding-left: ${props.theme.spacing.xs};
      padding-right: ${props.theme.spacing.xs};
    `}

  color: ${props => props.theme.colors.text.secondary};
`;
