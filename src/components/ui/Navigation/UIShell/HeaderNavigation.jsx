import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import { HeaderNav } from './UIShell.styles'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function HeaderNavigation({ className, children, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--header__nav`, className)
	return (
		<HeaderNav {...rest} className={classes} aria-label={rest['aria-label'] ?? 'Header navigation'}>
			{children}
		</HeaderNav>
	)
}

HeaderNavigation.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
