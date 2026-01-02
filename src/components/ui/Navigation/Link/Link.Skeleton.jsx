import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const sizeStyles = {
	sm: css`
		height: 16px;
		min-width: 56px;
	`,
	md: css`
		height: 18px;
		min-width: 72px;
	`,
	lg: css`
		height: 20px;
		min-width: 84px;
	`,
}

const Skeleton = styled.span`
	display: inline-block;
	border-radius: 4px;
	background: ${props => props.theme.colors.bg.surfaceRaised};
	border: 1px solid ${props => props.theme.colors.border.subtle};
	${props => sizeStyles[props.$size] || sizeStyles.md}
`

export default function LinkSkeleton({ size = 'md', className, ...rest }) {
	return <Skeleton aria-hidden="true" className={className} $size={size} {...rest} />
}

LinkSkeleton.displayName = 'LinkSkeleton'

LinkSkeleton.propTypes = {
	className: PropTypes.string,
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
}
