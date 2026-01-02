import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import ComposedModal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '../ComposedModal'

/**
 * Modal
 *
 * Preserves Carbon-style API while delegating enterprise behaviors
 * (portal, focus trap, ESC, outside click rules) to `ComposedModal`.
 */
export default function Modal({
  children,
  modalHeading,
  modalLabel,
  open,
  onRequestClose,
  onRequestSubmit,
  primaryButtonText,
  secondaryButtonText,
  preventCloseOnClickOutside,
  selectorPrimaryFocus,
  danger = false,
  ...rest
}) {
  const hasFooter = Boolean(primaryButtonText || secondaryButtonText)

  const header = useMemo(() => {
    if (!modalHeading && !modalLabel) return null
    return <ModalHeader title={modalHeading} label={modalLabel} />
  }, [modalHeading, modalLabel])

  const footer = useMemo(() => {
    if (!hasFooter) return null
    return (
      <ModalFooter
        primaryButtonText={primaryButtonText}
        secondaryButtonText={secondaryButtonText}
        onRequestSubmit={onRequestSubmit}
        danger={danger}
      />
    )
  }, [danger, hasFooter, onRequestSubmit, primaryButtonText, secondaryButtonText])

  return (
    <ComposedModal
      open={open}
      onClose={onRequestClose}
      preventCloseOnClickOutside={preventCloseOnClickOutside}
      selectorPrimaryFocus={selectorPrimaryFocus}
      danger={danger}
      {...rest}
    >
      {header}
      <ModalBody>{children}</ModalBody>
      {footer}
    </ComposedModal>
  )
}

Modal.displayName = 'Modal'

Modal.propTypes = {
  children: PropTypes.node,
  modalHeading: PropTypes.string,
  modalLabel: PropTypes.string,
  open: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onRequestSubmit: PropTypes.func,
  primaryButtonText: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  preventCloseOnClickOutside: PropTypes.bool,
  selectorPrimaryFocus: PropTypes.string,
  danger: PropTypes.bool,
}

export { ModalHeader, ModalBody, ModalFooter }
