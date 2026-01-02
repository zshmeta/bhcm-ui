import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import { ChevronRightIcon } from './_icons'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

export default function SideNavMenu({
	className,
	children,
	title,
	defaultExpanded = false,
	isActive = false,
	isSideNavExpanded: _isSideNavExpanded,
	...rest
}) {
	const prefix = useClassPrefix()
	const [expanded, setExpanded] = useState(defaultExpanded)
	const buttonRef = useRef(null)

	const classes = cx(
		`${prefix}--side-nav__item`,
		`${prefix}--side-nav__item--submenu`,
		expanded && `${prefix}--side-nav__item--submenu-expanded`,
		isActive && `${prefix}--side-nav__item--active`,
		className
	)

	const close = useCallback(() => setExpanded(false), [])

	useEffect(() => {
		if (!expanded) return
		function onDocKeyDown(e) {
			if (e.key === 'Escape') {
				e.preventDefault()
				close()
				buttonRef.current?.focus?.()
			}
		}
		document.addEventListener('keydown', onDocKeyDown)
		return () => document.removeEventListener('keydown', onDocKeyDown)
	}, [expanded, close])

	return (
		<li {...rest} className={classes}>
			<button
				ref={buttonRef}
				type="button"
				className={`${prefix}--side-nav__submenu`}
				aria-haspopup="true"
				aria-expanded={expanded}
				onClick={() => setExpanded(s => !s)}
				aria-label={typeof title === 'string' ? title : undefined}
			>
				<span className={`${prefix}--side-nav__submenu-title`}>{title}</span>
				<span className={`${prefix}--side-nav__submenu-chevron`}
					style={{ display: 'inline-flex', transform: expanded ? 'rotate(90deg)' : undefined }}
				>
					<ChevronRightIcon />
				</span>
			</button>
			<ul className={`${prefix}--side-nav__menu`} role="group" hidden={!expanded}>
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
	isSideNavExpanded: PropTypes.bool,
	title: PropTypes.node.isRequired,
}
