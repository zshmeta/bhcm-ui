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

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 90px;
  gap: 10px;
`

const Box = styled.div`
  height: 34px;
  border-radius: 8px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
  border: 1px solid ${props => props.theme.colors.border.subtle};
`

export default function FluidTimePickerSkeleton({ isOnlyTwo = false }) {
  return (
    <Wrap aria-hidden="true">
      <Line />
      <Row>
        <Box />
        <Box />
        {!isOnlyTwo ? <Box /> : null}
      </Row>
    </Wrap>
  )
}

FluidTimePickerSkeleton.displayName = 'FluidTimePickerSkeleton'
