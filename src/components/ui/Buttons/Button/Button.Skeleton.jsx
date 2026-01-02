import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const sizeStyles = {
  xs: css`
    height: 24px;
    padding: 0 8px;
    border-radius: 4px;
  `,
  sm: css`
    height: 32px;
    padding: 0 12px;
    border-radius: 4px;
  `,
  md: css`
    height: 40px;
    padding: 0 16px;
    border-radius: 4px;
  `,
  lg: css`
    height: 48px;
    padding: 0 24px;
    border-radius: 4px;
  `,
  xl: css`
    height: 64px;
    padding: 0 32px;
    border-radius: 6px;
  `,
  '2xl': css`
    height: 80px;
    padding: 0 40px;
    border-radius: 6px;
  `,
}

const Skeleton = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  min-width: 92px;

  background: ${props => props.theme.colors.bg.surfaceRaised};
  border: 1px solid ${props => props.theme.colors.border.subtle};

  ${props => sizeStyles[props.$size] || sizeStyles.md}
`

export default function ButtonSkeleton({ size = 'md', className, ...rest }) {
  return (
    <Skeleton
      aria-hidden="true"
      className={className}
      $size={size}
      {...rest}
    />
  )
}

ButtonSkeleton.displayName = 'ButtonSkeleton'

ButtonSkeleton.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
}
