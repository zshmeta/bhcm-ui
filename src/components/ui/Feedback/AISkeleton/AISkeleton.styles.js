import styled, { css } from 'styled-components'

export const StyledSkeletonBlock = styled.div`
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export const StyledAISkeletonIcon = styled(StyledSkeletonBlock)`
  width: ${props => props.$size || '16px'};
  height: ${props => props.$size || '16px'};
  border-radius: 3px;
`

export const StyledAISkeletonPlaceholder = styled(StyledSkeletonBlock)`
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || '24px'};
`

export const StyledAISkeletonTextLine = styled(StyledSkeletonBlock)`
  height: ${props => (props.$heading ? '12px' : '10px')};
  width: ${props => props.$width || '100%'};
  ${props =>
    props.$heading &&
    css`
      border-radius: 5px;
    `}
`

export const StyledAISkeletonTextStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`
