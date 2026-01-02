import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function SideNavItem({ className, children, isActive = false, large = false, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(
		`${prefix}--side-nav__item`,
		isActive && `${prefix}--side-nav__item--active`,
		large && `${prefix}--side-nav__item--large`,
		className
	)
	return (
		<li {...rest} className={classes}>
			{children}
		</li>
	)
}

SideNavItem.displayName = 'SideNavItem'

SideNavItem.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	isActive: PropTypes.bool,
	large: PropTypes.bool,
}
