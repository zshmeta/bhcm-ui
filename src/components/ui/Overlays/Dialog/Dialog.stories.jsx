import React, { useMemo, useState } from 'react'

import Dialog, {
  DialogBody,
  DialogCloseButton,
  DialogControls,
  DialogFooter,
  DialogHeader,
  DialogSubtitle,
  DialogTitle,
} from './Dialog'
import Button from '../../Buttons/Button'

export default {
  title: 'Overlays/Dialog',
  component: Dialog,
}

export function OpenModal() {
  return (
    <Dialog open modal onRequestClose={() => {}}>
      <DialogHeader>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogControls>
          <DialogCloseButton onClick={() => {}} />
        </DialogControls>
      </DialogHeader>
      <DialogBody>
        This is a modal dialog. It is controlled via the `open` prop.
      </DialogBody>
      <DialogFooter
        secondaryButtonText="Cancel"
        primaryButtonText="Confirm"
        onRequestClose={() => {}}
        onRequestSubmit={() => {}}
      />
    </Dialog>
  )
}

export function OpenNonModal() {
  return (
    <Dialog open modal={false} onRequestClose={() => {}}>
      <DialogHeader>
        <DialogTitle>Non-modal dialog</DialogTitle>
        <DialogSubtitle>Allows interaction outside</DialogSubtitle>
        <DialogControls>
          <DialogCloseButton onClick={() => {}} />
        </DialogControls>
      </DialogHeader>
      <DialogBody>
        Use this for non-blocking surfaces that still need focus management.
      </DialogBody>
      <DialogFooter
        secondaryButtonText="Close"
        primaryButtonText="Save"
        onRequestClose={() => {}}
        onRequestSubmit={() => {}}
      />
    </Dialog>
  )
}

export function Interactive() {
  const [open, setOpen] = useState(false)
  const close = useMemo(() => () => setOpen(false), [])
  const openDialog = useMemo(() => () => setOpen(true), [])

  return (
    <div>
      <Button onClick={openDialog}>Open dialog</Button>

      <Dialog open={open} modal onRequestClose={close}>
        <DialogHeader>
          <DialogTitle>Interactive dialog</DialogTitle>
          <DialogControls>
            <DialogCloseButton onClick={close} />
          </DialogControls>
        </DialogHeader>
        <DialogBody>
          Click outside (backdrop) or press ESC to request close.
        </DialogBody>
        <DialogFooter
          secondaryButtonText="Cancel"
          primaryButtonText="Confirm"
          onRequestClose={close}
          onRequestSubmit={close}
        />
      </Dialog>
    </div>
  )
}
