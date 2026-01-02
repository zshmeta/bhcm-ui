import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import { ChevronDownIcon } from './_icons'
import { useMergedRefs } from './_utils'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

function useOutsideClick(open, refs, onClose) {
	useEffect(() => {
		if (!open) return
		function onDocMouseDown(e) {
			const target = e.target
			if (!target) return
			const hit = refs.some(r => r.current && r.current.contains(target))
			if (!hit) onClose?.()
		}
		document.addEventListener('mousedown', onDocMouseDown)
		return () => document.removeEventListener('mousedown', onDocMouseDown)
	}, [open, refs, onClose])
}

const HeaderMenu = forwardRef(function HeaderMenu(
	{ className, children, menuLinkName, isCurrentPage = false, defaultExpanded = false, ...rest },
	ref
) {
	const prefix = useClassPrefix()
	const [expanded, setExpanded] = useState(defaultExpanded)
	const triggerRef = useRef(null)
	const menuRef = useRef(null)
	const mergedRef = useMemo(() => useMergedRefs([ref, menuRef]), [ref])

	const classes = cx(
		`${prefix}--header__menu-item`,
		expanded && `${prefix}--header__menu-item--expanded`,
		isCurrentPage && `${prefix}--header__menu-item--current`,
		className
	)

	const close = useCallback(() => {
		setExpanded(false)
		triggerRef.current?.focus?.()
	}, [])

	useOutsideClick(expanded, [triggerRef, menuRef], close)

	useEffect(() => {
		if (!expanded) return
		function onKeyDown(e) {
			if (e.key === 'Escape') {
				e.preventDefault()
				close()
			}
		}
		document.addEventListener('keydown', onKeyDown)
		return () => document.removeEventListener('keydown', onKeyDown)
	}, [expanded, close])

	return (
		<li {...rest} className={classes} ref={mergedRef}>
			<button
				type="button"
				ref={triggerRef}
				className={`${prefix}--header__menu-title`}
				aria-haspopup="menu"
				aria-expanded={expanded}
				onClick={() => setExpanded(s => !s)}
			>
				<span className={`${prefix}--header__menu-title__text`}>{menuLinkName}</span>
				<ChevronDownIcon />
			</button>
			<ul
				className={`${prefix}--header__menu`}
				role="menu"
				aria-label={menuLinkName}
				hidden={!expanded}
				onKeyDown={e => {
					if (e.key === 'Escape') {
						e.preventDefault()
						close()
					}
				}}
			>
				{children}
			</ul>
		</li>
	)
})

HeaderMenu.displayName = 'HeaderMenu'

HeaderMenu.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	defaultExpanded: PropTypes.bool,
	isCurrentPage: PropTypes.bool,
	menuLinkName: PropTypes.node.isRequired,
}

export default HeaderMenu
