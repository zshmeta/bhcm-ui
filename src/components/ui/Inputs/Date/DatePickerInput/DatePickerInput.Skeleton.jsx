import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  display: grid;
  gap: 6px;
  width: 100%;
`

const Label = styled.div`
  height: 10px;
  width: 84px;
  border-radius: 6px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

const Field = styled.div`
  height: 40px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export default function DatePickerInputSkeleton({ hasLabel = true, ...rest }) {
  return (
    <Wrap {...rest}>
      {hasLabel ? <Label /> : null}
      <Field />
    </Wrap>
  )
}

DatePickerInputSkeleton.displayName = 'DatePickerInputSkeleton'
