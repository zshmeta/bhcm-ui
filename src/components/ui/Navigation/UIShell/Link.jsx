import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

const Link = forwardRef(function Link(
	{ element, as: BaseComponent, isSideNavExpanded: _isSideNavExpanded, ...rest },
	ref
) {
	const Component = BaseComponent ?? element ?? 'a'
	return <Component ref={ref} {...rest} />
})

Link.displayName = 'Link'

Link.propTypes = {
	as: PropTypes.elementType,
	element: PropTypes.elementType,
	isSideNavExpanded: PropTypes.bool,
}

export const LinkPropTypes = Link.propTypes

export default Link
