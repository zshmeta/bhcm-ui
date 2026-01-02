import React from 'react'
import PropTypes from 'prop-types'
import Callout from './Callout'

let didWarnAboutDeprecation = false

export default function StaticNotification(props) {
  if (process.env.NODE_ENV !== 'production' && !didWarnAboutDeprecation) {
    // eslint-disable-next-line no-console
    console.warn(
      '`StaticNotification` has been renamed to `Callout`. ' +
        'Update usages to `Callout` when possible.'
    )
    didWarnAboutDeprecation = true
  }

  return <Callout {...props} />
}

StaticNotification.propTypes = {
  actionButtonLabel: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  kind: PropTypes.oneOf([
    'error',
    'info',
    'info-square',
    'success',
    'warning',
    'warning-alt',
  ]),
  lowContrast: PropTypes.bool,
  onActionButtonClick: PropTypes.func,
  statusIconDescription: PropTypes.string,
  subtitle: PropTypes.node,
  title: PropTypes.string,
  titleId: PropTypes.string,
}
