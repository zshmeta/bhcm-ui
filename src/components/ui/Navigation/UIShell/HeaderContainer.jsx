import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

// Render-prop container for managing header (side nav + panel) state.
export default function HeaderContainer({ render, isSideNavExpanded: controlledExpanded, onClickSideNavExpand, ...rest }) {
	const [uncontrolledExpanded, setUncontrolledExpanded] = useState(false)
	const isControlled = typeof controlledExpanded === 'boolean'
	const isSideNavExpanded = isControlled ? controlledExpanded : uncontrolledExpanded

	const handleClickSideNavExpand = useCallback(
		event => {
			onClickSideNavExpand?.(event)
			if (!isControlled) {
				setUncontrolledExpanded(s => !s)
			}
		},
		[onClickSideNavExpand, isControlled]
	)

	const value = useMemo(
		() => ({
			...rest,
			isSideNavExpanded,
			onClickSideNavExpand: handleClickSideNavExpand,
		}),
		[rest, isSideNavExpanded, handleClickSideNavExpand]
	)

	return render(value)
}

HeaderContainer.propTypes = {
	render: PropTypes.func.isRequired,
	isSideNavExpanded: PropTypes.bool,
	onClickSideNavExpand: PropTypes.func,
}
