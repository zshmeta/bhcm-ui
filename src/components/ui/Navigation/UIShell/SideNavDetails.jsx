import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function SideNavDetails({ className, children, title, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--side-nav__details`, className)
	return (
		<details {...rest} className={classes}>
			{title ? <summary className={`${prefix}--side-nav__details-summary`}>{title}</summary> : null}
			{children}
		</details>
	)
}

SideNavDetails.displayName = 'SideNavDetails'

SideNavDetails.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	title: PropTypes.node,
}
