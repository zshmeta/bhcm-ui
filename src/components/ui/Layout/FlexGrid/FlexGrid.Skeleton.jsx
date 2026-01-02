import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrap = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.sm};
`

const Row = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`

const Box = styled.div`
  flex: 1;
  height: 48px;
  border-radius: 10px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
  border: 1px solid ${props => props.theme.colors.border.subtle};
`

export default function FlexGridSkeleton({ className, ...rest }) {
  return (
    <Wrap aria-hidden="true" className={className} {...rest}>
      <Row>
        <Box />
        <Box />
        <Box />
      </Row>
    </Wrap>
  )
}

FlexGridSkeleton.displayName = 'FlexGridSkeleton'

FlexGridSkeleton.propTypes = {
  className: PropTypes.string,
}
