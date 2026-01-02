import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function SideNavHeader({ className, children, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--side-nav__header`, className)
	return (
		<div {...rest} className={classes}>
			{children}
		</div>
	)
}

SideNavHeader.displayName = 'SideNavHeader'

SideNavHeader.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
