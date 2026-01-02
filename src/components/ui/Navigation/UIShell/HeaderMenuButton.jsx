import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import { CloseIcon, MenuIcon } from './_icons'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

const HeaderMenuButton = forwardRef(function HeaderMenuButton(
	{
		className,
		isActive = false,
		isCollapsible = true,
		renderMenuIcon,
		renderCloseIcon,
		...rest
	},
	ref
) {
	const prefix = useClassPrefix()
	const classes = cx(
		`${prefix}--header__action`,
		`${prefix}--header__menu-trigger`,
		`${prefix}--header__menu-toggle`,
		isActive && `${prefix}--header__action--active`,
		!isCollapsible && `${prefix}--header__menu-toggle__hidden`,
		className
	)

	const menuIcon = renderMenuIcon ?? <MenuIcon />
	const closeIcon = renderCloseIcon ?? <CloseIcon />
	const ariaLabel = rest['aria-label']

	return (
		<button
			ref={ref}
			type="button"
			{...rest}
			className={classes}
			title={ariaLabel}
		>
			{isActive ? closeIcon : menuIcon}
		</button>
	)
})

HeaderMenuButton.displayName = 'HeaderMenuButton'

HeaderMenuButton.propTypes = {
	['aria-label']: PropTypes.string,
	['aria-labelledby']: PropTypes.string,
	className: PropTypes.string,
	isActive: PropTypes.bool,
	isCollapsible: PropTypes.bool,
	renderMenuIcon: PropTypes.node,
	renderCloseIcon: PropTypes.node,
}

export default HeaderMenuButton
