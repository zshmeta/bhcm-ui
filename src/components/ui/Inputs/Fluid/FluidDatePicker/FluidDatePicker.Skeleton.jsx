import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  display: grid;
  gap: 6px;
`

const Line = styled.div`
  height: 10px;
  width: 64px;
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

const Box = styled.div`
  height: 34px;
  border-radius: 8px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
  border: 1px solid ${props => props.theme.colors.border.subtle};
`

export default function FluidDatePickerSkeleton() {
  return (
    <Wrap aria-hidden="true">
      <Line />
      <Box />
    </Wrap>
  )
}

FluidDatePickerSkeleton.displayName = 'FluidDatePickerSkeleton'
