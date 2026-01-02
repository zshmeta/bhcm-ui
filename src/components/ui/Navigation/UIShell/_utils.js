import { useEffect, useRef, useState } from 'react'

export const CARBON_SIDENAV_ITEMS = [
	'SideNavFooter',
	'SideNavHeader',
	'SideNavItems',
	'SideNavMenu',
	'SideNavLink',
]

export function useMergedRefs(refs) {
	return value => {
		refs.forEach(ref => {
			if (!ref) return
			if (typeof ref === 'function') {
				ref(value)
				return
			}
			ref.current = value
		})
	}
}

export function useWindowEvent(eventName, handler, options) {
	useEffect(() => {
		window.addEventListener(eventName, handler, options)
		return () => window.removeEventListener(eventName, handler, options)
	}, [eventName, handler, options])
}

export function useDelayedState(initialValue) {
	const [value, setValue] = useState(initialValue)
	const timeoutRef = useRef(null)

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				window.clearTimeout(timeoutRef.current)
			}
		}
	}, [])

	function setDelayed(nextValue, delayMs = 0) {
		if (timeoutRef.current) {
			window.clearTimeout(timeoutRef.current)
			timeoutRef.current = null
		}
		if (!delayMs) {
			setValue(nextValue)
			return
		}
		timeoutRef.current = window.setTimeout(() => {
			setValue(nextValue)
			timeoutRef.current = null
		}, delayMs)
	}

	return [value, setDelayed]
}
