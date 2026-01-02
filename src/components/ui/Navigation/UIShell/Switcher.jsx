import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function Switcher({ className, children, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--switcher`, className)
	return (
		<ul {...rest} className={classes} role="menu">
			{children}
		</ul>
	)
}

Switcher.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
