import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ButtonSkeleton } from '../Button'

const Wrap = styled.div`
  display: inline-flex;
  align-items: stretch;
`

export default function ComboButtonSkeleton({ className, size = 'lg', ...rest }) {
  return (
    <Wrap aria-hidden="true" className={className} {...rest}>
      <ButtonSkeleton size={size} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
      <ButtonSkeleton size={size} style={{ width: 44, padding: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} />
    </Wrap>
  )
}

ComboButtonSkeleton.displayName = 'ComboButtonSkeleton'

ComboButtonSkeleton.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
}
