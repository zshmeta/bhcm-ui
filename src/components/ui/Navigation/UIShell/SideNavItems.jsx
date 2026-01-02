import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import { SideNavItemsList } from './UIShell.styles'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function SideNavItems({ className, children, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--side-nav__items`, className)
	return (
		<SideNavItemsList {...rest} className={classes}>
			{children}
		</SideNavItemsList>
	)
}

SideNavItems.displayName = 'SideNavItems'

SideNavItems.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
