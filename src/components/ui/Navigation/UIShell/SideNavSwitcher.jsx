import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function SideNavSwitcher({ className, children, labelText = 'Switcher', ...rest }) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--side-nav__switcher`, className)
	return (
		<div className={classes}>
			<label className={`${prefix}--label`}>
				<span style={{ display: 'block', marginBottom: 4 }}>{labelText}</span>
				<select {...rest} className={`${prefix}--select-input`}>
					{children}
				</select>
			</label>
		</div>
	)
}

SideNavSwitcher.displayName = 'SideNavSwitcher'

SideNavSwitcher.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	labelText: PropTypes.node,
}
