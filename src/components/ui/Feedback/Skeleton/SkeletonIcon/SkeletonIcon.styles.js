import styled from 'styled-components'

export const SkeletonIconRoot = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`
