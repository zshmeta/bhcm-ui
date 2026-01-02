import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const sizeStyles = {
  sm: css`
    height: 32px;
    border-radius: 4px;
  `,
  md: css`
    height: 40px;
    border-radius: 4px;
  `,
  lg: css`
    height: 48px;
    border-radius: 4px;
  `,
}

const Skeleton = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  min-width: 120px;
  padding: 0 16px;

  background: ${props => props.theme.colors.bg.surfaceRaised};
  border: 1px solid ${props => props.theme.colors.border.subtle};

  ${props => sizeStyles[props.$size] || sizeStyles.lg}
`

export default function ChatButtonSkeleton({ size = 'lg', className, ...rest }) {
  return (
    <Skeleton
      aria-hidden="true"
      className={className}
      $size={size}
      {...rest}
    />
  )
}

ChatButtonSkeleton.displayName = 'ChatButtonSkeleton'

ChatButtonSkeleton.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
}
