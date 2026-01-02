import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
`

const Label = styled.div`
  height: 12px;
  width: 120px;
  border-radius: 6px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
  margin-bottom: ${props => props.theme.spacing.xs};
`

const Field = styled.div`
  height: ${props => {
    switch (props.$size) {
      case 'sm':
        return '32px'
      case 'lg':
        return '48px'
      case 'md':
      default:
        return '40px'
    }
  }};
  border-radius: 6px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export default function DropdownSkeleton({ hideLabel, size, ...rest }) {
  return (
    <Wrapper {...rest}>
      {!hideLabel ? <Label /> : null}
      <Field $size={size} />
    </Wrapper>
  )
}

DropdownSkeleton.displayName = 'DropdownSkeleton'
