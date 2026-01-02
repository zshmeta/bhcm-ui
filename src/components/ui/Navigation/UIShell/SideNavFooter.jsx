import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function SideNavFooter({ className, children, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--side-nav__footer`, className)
	return (
		<div {...rest} className={classes}>
			{children}
		</div>
	)
}

SideNavFooter.displayName = 'SideNavFooter'

SideNavFooter.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
