import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ButtonSkeleton } from '../Button'

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`

export default function ButtonSetSkeleton({ size = 'md', ...rest }) {
  return (
    <Row aria-hidden="true" {...rest}>
      <ButtonSkeleton size={size} style={{ minWidth: 120 }} />
      <ButtonSkeleton size={size} style={{ minWidth: 120 }} />
    </Row>
  )
}

ButtonSetSkeleton.displayName = 'ButtonSetSkeleton'

ButtonSetSkeleton.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
}
