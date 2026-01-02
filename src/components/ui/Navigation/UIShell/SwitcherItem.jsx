import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import Link, { LinkPropTypes } from './Link'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function SwitcherItem({ className, children, isSelected = false, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(
		`${prefix}--switcher__item`,
		isSelected && `${prefix}--switcher__item--selected`,
		className
	)
	return (
		<li className={`${prefix}--switcher__item`} role="none">
			<Link {...rest} className={classes} role="menuitem">
				{children}
			</Link>
		</li>
	)
}

SwitcherItem.propTypes = {
	...LinkPropTypes,
	children: PropTypes.node,
	className: PropTypes.string,
	isSelected: PropTypes.bool,
}
