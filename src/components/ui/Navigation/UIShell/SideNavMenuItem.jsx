import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import SideNavLink from './SideNavLink'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function SideNavMenuItem({ className, children, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--side-nav__menu-item`, className)
	return (
		<li className={classes}>
			<SideNavLink {...rest}>{children}</SideNavLink>
		</li>
	)
}

SideNavMenuItem.displayName = 'SideNavMenuItem'

SideNavMenuItem.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
