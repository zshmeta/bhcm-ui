import React from 'react'
import PropTypes from 'prop-types'
import InlineNotification from './InlineNotification'

/**
 * Notification
 *
 * This repo implements the Notification family as multiple components
 * (InlineNotification, ToastNotification, ActionableNotification, etc.).
 *
 * The legacy Carbon source still has a top-level "Notification" entry, so this
 * file exists as a thin compatibility surface.
 */
export default function Notification(props) {
	return <InlineNotification {...props} />
}

Notification.displayName = 'Notification'

Notification.propTypes = {
	...InlineNotification.propTypes,
}
