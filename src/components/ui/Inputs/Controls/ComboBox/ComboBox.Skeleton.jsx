import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrap = styled.div`
  display: grid;
  gap: 6px;
`

const Label = styled.div`
  height: 10px;
  width: 84px;
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

const Field = styled.div`
  height: 40px;
  border-radius: 8px;
  background: ${props => props.theme.colors.bg.surface};
  border: 1px solid ${props => props.theme.colors.border.subtle};
`

export default function ComboBoxSkeleton({ className, ...rest }) {
  return (
    <Wrap aria-hidden="true" className={className} {...rest}>
      <Label />
      <Field />
    </Wrap>
  )
}

ComboBoxSkeleton.displayName = 'ComboBoxSkeleton'

ComboBoxSkeleton.propTypes = {
  className: PropTypes.string,
}
