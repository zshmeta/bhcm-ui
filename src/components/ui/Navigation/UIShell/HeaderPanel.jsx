import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import { HeaderPanelWrap } from './UIShell.styles'

function cx(...xs) {
	return xs.filter(Boolean).join(' ')
}

const HeaderPanel = forwardRef(function HeaderPanel(
	{ className, children, expanded = false, ...rest },
	ref
) {
	const prefix = useClassPrefix()
	const classes = cx(`${prefix}--header-panel`, className)
	return (
		<HeaderPanelWrap
			{...rest}
			ref={ref}
			className={classes}
			$expanded={expanded}
			aria-hidden={!expanded}
		>
			{children}
		</HeaderPanelWrap>
	)
})

HeaderPanel.displayName = 'HeaderPanel'

HeaderPanel.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	expanded: PropTypes.bool,
}

export default HeaderPanel
