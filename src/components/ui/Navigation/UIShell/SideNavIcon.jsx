import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function SideNavIcon({ className, children, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--side-nav__icon`, className)
	return (
		<span {...rest} className={classes}>
			{children}
		</span>
	)
}

SideNavIcon.displayName = 'SideNavIcon'

SideNavIcon.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
