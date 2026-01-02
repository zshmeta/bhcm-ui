import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${props => props.theme.spacing.md};
	min-height: 40px;
`

const Group = styled.div`
	display: inline-flex;
	align-items: center;
	gap: ${props => props.theme.spacing.sm};
`

const SkeletonBlock = styled.span`
	display: inline-block;
	height: 14px;
	border-radius: 4px;
	background: ${props => props.theme.colors.bg.surfaceRaised};
	border: 1px solid ${props => props.theme.colors.border.subtle};
	width: ${props => props.$width};
`

export default function PaginationSkeleton({ className, ...rest }) {
	return (
		<Root className={className} aria-hidden="true" {...rest}>
			<Group>
				<SkeletonBlock $width="70px" />
				<SkeletonBlock $width="35px" />
				<SkeletonBlock $width="105px" />
			</Group>
			<Group>
				<SkeletonBlock $width="70px" />
			</Group>
		</Root>
	)
}

PaginationSkeleton.displayName = 'PaginationSkeleton'

PaginationSkeleton.propTypes = {
	className: PropTypes.string,
}
