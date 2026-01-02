import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import { HeaderGlobalBar as Bar } from './UIShell.styles'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function HeaderGlobalBar({ className, children, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--header__global`, className)
	return (
		<Bar {...rest} className={classes}>
			{children}
		</Bar>
	)
}

HeaderGlobalBar.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
