import styled, { css } from 'styled-components'

export const SkeletonTextLine = styled.p`
  margin: 0;
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
  height: 10px;

  ${props =>
    props.$heading &&
    css`
      height: 12px;
      border-radius: 5px;
    `}
`

export const SkeletonTextStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`

export const VisuallyHidden = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`
