import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function SideNavDivider({ className, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--side-nav__divider`, className)
	return (
		<li role="separator" className={classes} {...rest} />
	)
}

SideNavDivider.displayName = 'SideNavDivider'

SideNavDivider.propTypes = {
	className: PropTypes.string,
}
