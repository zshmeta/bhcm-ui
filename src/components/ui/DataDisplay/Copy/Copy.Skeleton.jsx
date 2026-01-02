import React from 'react'
import styled from 'styled-components'

const Shell = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export default function CopySkeleton(props) {
  return <Shell aria-hidden="true" {...props} />
}

CopySkeleton.displayName = 'CopySkeleton'
