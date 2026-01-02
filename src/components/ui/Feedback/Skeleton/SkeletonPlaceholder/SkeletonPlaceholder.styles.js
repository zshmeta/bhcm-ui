import styled from 'styled-components'

export const SkeletonPlaceholderRoot = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  min-height: 16px;
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`
