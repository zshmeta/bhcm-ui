import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function SideNavLinkText({ className, children, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--side-nav__link-text`, className)
	return (
		<span {...rest} className={classes}>
			{children}
		</span>
	)
}

SideNavLinkText.displayName = 'SideNavLinkText'

SideNavLinkText.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
