import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import Link, { LinkPropTypes } from './Link'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function SideNavLink({ className, children, isActive = false, isSideNavExpanded: _expanded, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(
		`${prefix}--side-nav__link`,
		isActive && `${prefix}--side-nav__link--current`,
		className
	)
	return (
		<Link {...rest} className={classes}>
			{children}
		</Link>
	)
}

SideNavLink.displayName = 'SideNavLink'

SideNavLink.propTypes = {
	...LinkPropTypes,
	children: PropTypes.node,
	className: PropTypes.string,
	isActive: PropTypes.bool,
	isSideNavExpanded: PropTypes.bool,
}
