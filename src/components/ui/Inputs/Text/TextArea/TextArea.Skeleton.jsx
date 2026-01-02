import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  width: 100%;
`

const Line = styled.div`
  height: 10px;
  width: 40%;
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

const Box = styled.div`
  height: 96px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export default function TextAreaSkeleton({ ...rest }) {
  return (
    <Wrap aria-hidden="true" {...rest}>
      <Line />
      <Box />
    </Wrap>
  )
}

TextAreaSkeleton.displayName = 'TextAreaSkeleton'
