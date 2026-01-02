import styled, { css } from 'styled-components'

const alignStyles = {
  top: css`
    bottom: calc(100% + ${props => props.theme.spacing.xs});
    left: 50%;
    transform: translateX(-50%);
  `,
  bottom: css`
    top: calc(100% + ${props => props.theme.spacing.xs});
    left: 50%;
    transform: translateX(-50%);
  `,
  left: css`
    right: calc(100% + ${props => props.theme.spacing.xs});
    top: 50%;
    transform: translateY(-50%);
  `,
  right: css`
    left: calc(100% + ${props => props.theme.spacing.xs});
    top: 50%;
    transform: translateY(-50%);
  `,
  'top-start': css`
    bottom: calc(100% + ${props => props.theme.spacing.xs});
    left: 0;
  `,
  'top-end': css`
    bottom: calc(100% + ${props => props.theme.spacing.xs});
    right: 0;
  `,
  'bottom-start': css`
    top: calc(100% + ${props => props.theme.spacing.xs});
    left: 0;
  `,
  'bottom-end': css`
    top: calc(100% + ${props => props.theme.spacing.xs});
    right: 0;
  `,
  'left-start': css`
    right: calc(100% + ${props => props.theme.spacing.xs});
    top: 0;
  `,
  'left-end': css`
    right: calc(100% + ${props => props.theme.spacing.xs});
    bottom: 0;
  `,
  'right-start': css`
    left: calc(100% + ${props => props.theme.spacing.xs});
    top: 0;
  `,
  'right-end': css`
    left: calc(100% + ${props => props.theme.spacing.xs});
    bottom: 0;
  `,
}

export const Root = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
`

export const Button = styled.button`
  appearance: none;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surface};
  color: ${props => props.theme.colors.text.primary};

  border-radius: 6px;

  width: 32px;
  height: 32px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.bg.surfaceRaised};
  }

  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px ${props => props.theme.colors.action.focus};
    z-index: 1;
  }

  & > svg {
    display: block;
  }

  ${props =>
    props.$animating &&
    css`
      border-color: ${props.theme.colors.border.subtle};
    `}
`

export const Tooltip = styled.div`
  position: absolute;
  z-index: 10;

  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: 6px;

  background: ${props => props.theme.colors.text.primary};
  color: ${props => props.theme.colors.bg.canvas};

  font-size: 12px;
  line-height: 1.2;
  white-space: nowrap;

  opacity: 0;
  pointer-events: none;
  transform-origin: center;

  ${props => (props.$align && alignStyles[props.$align] ? alignStyles[props.$align] : alignStyles.bottom)}

  ${props =>
    props.$open &&
    css`
      opacity: 1;
    `}
`
