import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function HeaderSideNavItems({ className, children, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--header__nav`, `${prefix}--header__nav--secondary`, className)
	return (
		<ul {...rest} className={classes}>
			{children}
		</ul>
	)
}

HeaderSideNavItems.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
