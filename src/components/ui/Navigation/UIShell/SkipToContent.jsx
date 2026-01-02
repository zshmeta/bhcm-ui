import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import { SkipLink } from './UIShell.styles'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function SkipToContent({
	children = 'Skip to main content',
	className,
	href = '#main-content',
	tabIndex = 0,
	...rest
}) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--skip-to-content`, className)
	return (
		<SkipLink {...rest} className={classes} href={href} tabIndex={tabIndex}>
			{children}
		</SkipLink>
	)
}

SkipToContent.propTypes = {
	children: PropTypes.string,
	className: PropTypes.string,
	href: PropTypes.string,
	tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
