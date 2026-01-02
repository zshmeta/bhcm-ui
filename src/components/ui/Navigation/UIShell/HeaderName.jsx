import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import Link, { LinkPropTypes } from './Link'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function HeaderName({
	children,
	className,
	prefix: namePrefix,
	...rest
}) {
	const carbonPrefix = useClassPrefix()
	const classes = cx(`${carbonPrefix}--header__name`, className)
	return (
		<Link {...rest} className={classes}>
			{namePrefix ? (
				<span className={`${carbonPrefix}--header__name--prefix`}>{namePrefix}</span>
			) : null}
			{children}
		</Link>
	)
}

HeaderName.propTypes = {
	...LinkPropTypes,
	children: PropTypes.node,
	className: PropTypes.string,
	prefix: PropTypes.node,
}
