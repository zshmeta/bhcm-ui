import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 3px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
  border: 1px solid ${props => props.theme.colors.border.subtle};
`

export default function InlineCheckboxSkeleton() {
  return <Box aria-hidden="true" />
}

InlineCheckboxSkeleton.displayName = 'InlineCheckboxSkeleton'
