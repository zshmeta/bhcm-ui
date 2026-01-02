import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CheckboxSkeleton } from '../Checkbox'

const Wrap = styled.div`
  display: grid;
  gap: 10px;
`

const LegendLine = styled.div`
  height: 10px;
  width: 140px;
  border-radius: 4px;
  background: ${props => props.theme.colors.bg.surfaceRaised};
`

export default function CheckboxGroupSkeleton({ className, orientation = 'vertical', ...rest }) {
  return (
    <Wrap aria-hidden="true" className={className} {...rest}>
      <LegendLine />
      <div
        style={
          orientation === 'horizontal'
            ? { display: 'flex', gap: 16, flexWrap: 'wrap' }
            : { display: 'grid', gap: 10 }
        }
      >
        <CheckboxSkeleton labelWidth="92px" />
        <CheckboxSkeleton labelWidth="76px" />
        <CheckboxSkeleton labelWidth="88px" />
      </div>
    </Wrap>
  )
}

CheckboxGroupSkeleton.displayName = 'CheckboxGroupSkeleton'

CheckboxGroupSkeleton.propTypes = {
  className: PropTypes.string,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
}
