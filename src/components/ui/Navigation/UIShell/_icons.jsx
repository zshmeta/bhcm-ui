import React from 'react'

function iconProps(props) {
	return {
		viewBox: '0 0 32 32',
		width: 16,
		height: 16,
		fill: 'currentColor',
		focusable: 'false',
		'aria-hidden': 'true',
		...props,
	}
}

export function MenuIcon(props) {
	return (
		<svg {...iconProps(props)}>
			<path d="M4 8h24v2H4zm0 7h24v2H4zm0 7h24v2H4z" />
		</svg>
	)
}

export function CloseIcon(props) {
	return (
		<svg {...iconProps(props)}>
			<path d="M8.7 7.3 7.3 8.7 14.6 16l-7.3 7.3 1.4 1.4L16 17.4l7.3 7.3 1.4-1.4L17.4 16l7.3-7.3-1.4-1.4L16 14.6z" />
		</svg>
	)
}

export function ChevronDownIcon(props) {
	return (
		<svg {...iconProps(props)}>
			<path d="M16 22 6 12l1.4-1.4L16 19.2l8.6-8.6L26 12z" />
		</svg>
	)
}

export function ChevronRightIcon(props) {
	return (
		<svg {...iconProps(props)}>
			<path d="M12 26 10.6 24.6 19.2 16 10.6 7.4 12 6l10 10z" />
		</svg>
	)
}
