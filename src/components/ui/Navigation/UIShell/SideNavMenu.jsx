import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import { ChevronRightIcon } from './_icons'
import SideNavIcon from './SideNavIcon'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function SideNavMenu({
	className,
	children,
	title,
	defaultExpanded = false,
	isActive = false,
	large = false,
	renderIcon: IconElement,
	isSideNavExpanded,
	isRail = false,
	tabIndex,
	...rest
}) {
	const prefix = useClassPrefix()
	const [expanded, setExpanded] = useState(defaultExpanded)
	const [prevExpanded, setPrevExpanded] = useState(defaultExpanded)
	const buttonRef = useRef(null)

	// A11y/UX: A SideNavMenu should be considered active if any descendant item
	// points at the current page (or is explicitly active), even when collapsed.
	const hasActiveChild = useMemo(() => hasActiveDescendant(children), [children])

	const classes = cx(
		`${prefix}--side-nav__item`,
		(isActive || (hasActiveChild && !expanded)) && `${prefix}--side-nav__item--active`,
		IconElement && `${prefix}--side-nav__item--icon`,
		large && `${prefix}--side-nav__item--large`,
		`${prefix}--side-nav__item--submenu`,
		expanded && `${prefix}--side-nav__item--submenu-expanded`,
		className
	)

	// Keep local expanded state in sync with the SideNav expansion state
	// when using rail mode (mirrors the legacy UIShell behavior).
	useEffect(() => {
		if (!isRail) return
		if (!isSideNavExpanded && expanded) {
			setExpanded(false)
			setPrevExpanded(true)
			return
		}
		if (isSideNavExpanded && prevExpanded) {
			setExpanded(true)
			setPrevExpanded(false)
		}
	}, [isRail, isSideNavExpanded, expanded, prevExpanded])

	return (
		<li
			{...rest}
			className={classes}
			// A11y: allow users to collapse the menu with Escape.
			onKeyDown={event => {
				if (event.key === 'Escape') {
					setExpanded(false)
					buttonRef.current?.focus?.()
				}
			}}
		>
			<button
				ref={buttonRef}
				type="button"
				className={`${prefix}--side-nav__submenu`}
				aria-expanded={expanded}
				onClick={() => setExpanded(s => !s)}
				tabIndex={
					tabIndex === undefined ? (!isSideNavExpanded && !isRail ? -1 : 0) : tabIndex
				}
				aria-label={typeof title === 'string' ? title : undefined}
			>
				{IconElement && (
					<SideNavIcon>
						<IconElement />
					</SideNavIcon>
				)}
				<span className={`${prefix}--side-nav__submenu-title`}>{title}</span>
				<SideNavIcon
					className={`${prefix}--side-nav__submenu-chevron`}
					style={{ display: 'inline-flex', transform: expanded ? 'rotate(90deg)' : undefined }}
				>
					<ChevronRightIcon />
				</SideNavIcon>
			</button>
			<ul className={`${prefix}--side-nav__menu`} hidden={!expanded}>
				{children}
			</ul>
		</li>
	)
}

SideNavMenu.displayName = 'SideNavMenu'

SideNavMenu.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	defaultExpanded: PropTypes.bool,
	isActive: PropTypes.bool,
	large: PropTypes.bool,
	renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	isSideNavExpanded: PropTypes.bool,
	isRail: PropTypes.bool,
	tabIndex: PropTypes.number,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

/**
 * Detects if any descendant SideNav item is active.
 * Supports both `isActive` and `aria-current` conventions.
 */
function hasActiveDescendant(children) {
	const list = React.Children.toArray(children)
	for (const child of list) {
		if (!React.isValidElement(child)) continue
		const props = child.props || {}
		if (props.isActive === true || props['aria-current']) return true
		if (props.children && hasActiveDescendant(props.children)) return true
	}
	return false
}
