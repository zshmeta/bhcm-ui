import React, { Children, cloneElement, isValidElement } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import { SideNavNav, SideNavOverlay } from './UIShell.styles'
import { CARBON_SIDENAV_ITEMS } from './_utils'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

function withExpanded(children, isSideNavExpanded) {
	return Children.map(children, child => {
		if (!isValidElement(child)) return child
		const typeName = child.type?.displayName || child.type?.name
		if (typeName && CARBON_SIDENAV_ITEMS.includes(typeName)) {
			return cloneElement(child, { isSideNavExpanded })
		}
		return child
	})
}

export default function SideNav({
	className,
	children,
	expanded = false,
	isRail = false,
	isFixedNav = false,
	onOverlayClick,
	...rest
}) {
	const prefix = useClassPrefix()
	const classes = cx(
		`${prefix}--side-nav`,
		expanded && `${prefix}--side-nav--expanded`,
		isRail && `${prefix}--side-nav--rail`,
		isFixedNav && `${prefix}--side-nav--fixed`,
		className
	)

	return (
		<>
			<SideNavOverlay
				$active={expanded && !isFixedNav && !isRail}
				onClick={onOverlayClick}
				aria-hidden="true"
			/>
			<SideNavNav
				{...rest}
				className={classes}
				$expanded={expanded}
				$rail={isRail}
				$fixed={isFixedNav}
			>
				{withExpanded(children, expanded)}
			</SideNavNav>
		</>
	)
}

SideNav.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	expanded: PropTypes.bool,
	isFixedNav: PropTypes.bool,
	isRail: PropTypes.bool,
	onOverlayClick: PropTypes.func,
}
