import React from 'react'
import PropTypes from 'prop-types'
import { NotificationActionButton as NotificationActionButtonEl } from './Notification.styles'

export default function NotificationActionButton({ inline, className, onClick, children, ...rest }) {
	return React.createElement(
		NotificationActionButtonEl,
		{
			type: 'button',
			className,
			onClick,
			['data-inline']: inline ? 'true' : undefined,
			...rest,
		},
		children
	)
}

NotificationActionButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  inline: PropTypes.bool,
  onClick: PropTypes.func,
}
