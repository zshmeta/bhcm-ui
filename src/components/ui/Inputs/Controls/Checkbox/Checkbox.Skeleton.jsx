import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Box = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 3px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
  border: 1px solid ${props => props.theme.colors.border.subtle};
`

const Line = styled.span`
  height: 10px;
  width: ${props => props.$width || '84px'};
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export default function CheckboxSkeleton({ className, labelWidth, ...rest }) {
  return (
    <Wrap aria-hidden="true" className={className} {...rest}>
      <Box />
      <Line $width={labelWidth} />
    </Wrap>
  )
}

CheckboxSkeleton.displayName = 'CheckboxSkeleton'

CheckboxSkeleton.propTypes = {
  className: PropTypes.string,
  labelWidth: PropTypes.string,
}
