import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
`

const Field = styled.div`
  height: 40px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export default function DatePickerSkeleton({ range = false, ...rest }) {
  return (
    <Wrap {...rest}>
      <Field />
      {range ? <Field /> : null}
    </Wrap>
  )
}

DatePickerSkeleton.displayName = 'DatePickerSkeleton'
