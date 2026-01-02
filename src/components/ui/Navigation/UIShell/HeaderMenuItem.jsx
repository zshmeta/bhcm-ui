import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import Link, { LinkPropTypes } from './Link'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function HeaderMenuItem({ className, children, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--header__menu-item`, className)
	return (
		<li className={`${prefix}--header__menu-item`}>
			<Link {...rest} className={classes}>
				{children}
			</Link>
		</li>
	)
}

HeaderMenuItem.propTypes = {
	...LinkPropTypes,
	children: PropTypes.node,
	className: PropTypes.string,
}
