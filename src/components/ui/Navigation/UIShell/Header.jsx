import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import { HeaderRoot } from './UIShell.styles'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function Header({ className, children, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--header`, className)
	return (
		<HeaderRoot {...rest} className={classes}>
			{children}
		</HeaderRoot>
	)
}

Header.propTypes = {
	['aria-label']: PropTypes.string,
	['aria-labelledby']: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
}
