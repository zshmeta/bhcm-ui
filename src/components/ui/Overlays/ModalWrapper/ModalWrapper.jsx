import React, { useCallback, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal'
import Button from '../../Buttons/Button'

/**
 * ModalWrapper (deprecated in Carbon)
 *
 * Minimal stateful wrapper preserved for compatibility.
 */
export default function ModalWrapper({
  buttonTriggerText = 'Launch modal',
  disabled = false,
  handleOpen,
  handleSubmit,
  modalHeading,
  modalLabel,
  primaryButtonText = 'Submit',
  secondaryButtonText = 'Cancel',
  onRequestClose,
  ...rest
}) {
  const [open, setOpen] = useState(false)
  const launcherButtonRef = useRef(null)

  const openModal = useCallback(() => {
    if (disabled) return
    handleOpen?.()
    setOpen(true)
  }, [disabled, handleOpen])

  const closeModal = useCallback(
    evt => {
      onRequestClose?.(evt)
      setOpen(false)
    },
    [onRequestClose]
  )

  const onRequestSubmit = useCallback(
    evt => {
      handleSubmit?.(evt)
      setOpen(false)
    },
    [handleSubmit]
  )

  const trigger = useMemo(
    () => (
      <Button ref={launcherButtonRef} onClick={openModal} disabled={disabled}>
        {buttonTriggerText}
      </Button>
    ),
    [buttonTriggerText, disabled, openModal]
  )

  return (
    <>
      {trigger}
      <Modal
        {...rest}
        launcherButtonRef={launcherButtonRef}
        open={open}
        onRequestClose={closeModal}
        onRequestSubmit={onRequestSubmit}
        modalHeading={modalHeading}
        modalLabel={modalLabel}
        primaryButtonText={primaryButtonText}
        secondaryButtonText={secondaryButtonText}
      />
    </>
  )
}

ModalWrapper.displayName = 'ModalWrapper'

ModalWrapper.propTypes = {
  buttonTriggerText: PropTypes.string,
  disabled: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleSubmit: PropTypes.func,
  modalHeading: PropTypes.string,
  modalLabel: PropTypes.string,
  primaryButtonText: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  onRequestClose: PropTypes.func,
}
