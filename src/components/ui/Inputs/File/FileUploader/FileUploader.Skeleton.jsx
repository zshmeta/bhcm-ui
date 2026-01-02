import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrap = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.xs};
`

const Bar = styled.div`
  height: 10px;
  width: ${props => props.$w || '180px'};
  border-radius: 6px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

const Button = styled.div`
  height: 40px;
  width: 160px;
  border-radius: 8px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
  border: 1px solid ${props => props.theme.colors.border.subtle};
`

export default function FileUploaderSkeleton({ className, ...rest }) {
  return (
    <Wrap aria-hidden="true" className={className} {...rest}>
      <Bar $w="120px" />
      <Bar $w="240px" />
      <Button />
    </Wrap>
  )
}

FileUploaderSkeleton.displayName = 'FileUploaderSkeleton'

FileUploaderSkeleton.propTypes = {
  className: PropTypes.string,
}
