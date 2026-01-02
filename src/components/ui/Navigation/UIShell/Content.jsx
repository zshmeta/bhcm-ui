import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function Content({ className, children, tagName = 'main', ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--content`, className)
	return React.createElement(tagName, { ...rest, className: classes }, children)
}

Content.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	tagName: PropTypes.string,
}
