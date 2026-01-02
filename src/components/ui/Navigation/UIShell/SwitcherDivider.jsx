import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function SwitcherDivider({ className, ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--switcher__divider`, className)
	return (
		<li role="separator" className={classes} {...rest} />
	)
}

SwitcherDivider.propTypes = {
	className: PropTypes.string,
}
