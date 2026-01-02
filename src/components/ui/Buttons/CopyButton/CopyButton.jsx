import React from 'react'
import PropTypes from 'prop-types'
import { Copy } from '../../DataDisplay/Copy'

function CopyIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M5 5.5V3.8c0-.7.6-1.3 1.3-1.3h5.4c.7 0 1.3.6 1.3 1.3v5.4c0 .7-.6 1.3-1.3 1.3H10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M4.3 5.5h5.4c.7 0 1.3.6 1.3 1.3v5.4c0 .7-.6 1.3-1.3 1.3H4.3c-.7 0-1.3-.6-1.3-1.3V6.8c0-.7.6-1.3 1.3-1.3z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CopyButton({
  align = 'bottom',
  autoAlign = false,
  feedback = 'Copied!',
  feedbackTimeout = 2000,
  iconDescription = 'Copy to clipboard',
  className,
  onClick,
  ...rest
}) {
  return (
    <Copy
      className={className}
      align={align}
      autoAlign={autoAlign}
      feedback={feedback}
      feedbackTimeout={feedbackTimeout}
      aria-label={iconDescription}
      onClick={onClick}
      {...rest}
    >
      <CopyIcon />
    </Copy>
  )
}

CopyButton.displayName = 'CopyButton'

CopyButton.propTypes = {
  align: PropTypes.string,
  autoAlign: PropTypes.bool,
  className: PropTypes.string,
  feedback: PropTypes.string,
  feedbackTimeout: PropTypes.number,
  iconDescription: PropTypes.string,
  onClick: PropTypes.func,
}
