import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

const HeaderGlobalAction = forwardRef(function HeaderGlobalAction(
	{ className, children, isActive = false, tooltipAlignment = 'center', ...rest },
	ref
) {
	const prefix = useClassPrefix()
	const classes = cx(
		`${prefix}--header__action`,
		isActive && `${prefix}--header__action--active`,
		className
	)
	return (
		<button
			ref={ref}
			type="button"
			{...rest}
			className={classes}
			data-tooltip-alignment={tooltipAlignment}
		>
			{children}
		</button>
	)
})

HeaderGlobalAction.displayName = 'HeaderGlobalAction'

HeaderGlobalAction.propTypes = {
	['aria-label']: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
	isActive: PropTypes.bool,
	tooltipAlignment: PropTypes.oneOf(['start', 'center', 'end']),
}

export default HeaderGlobalAction
