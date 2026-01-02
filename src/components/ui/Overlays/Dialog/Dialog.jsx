import React, {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import {
  StyledBackdrop,
  StyledBody,
  StyledCloseButton,
  StyledContainer,
  StyledControls,
  StyledDialog,
  StyledFooter,
  StyledHeader,
  StyledSubtitle,
  StyledTitle,
} from './Dialog.styles'
import Portal from '../Portal'
import Button from '../../Buttons/Button'

// Button import path compatibility: prefer barrel if available.
// eslint-disable-next-line no-unused-vars
const _Button = Button

let dialogCounter = 0
function getDialogId() {
  dialogCounter += 1
  return dialogCounter
}

const DialogContext = createContext({
  dialogId: undefined,
  titleId: undefined,
  subtitleId: undefined,
  isOpen: false,
})

function useDialogContext() {
  return useContext(DialogContext)
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 4L12 12M12 4L4 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * Dialog
 *
 * Carbon-like API using the native <dialog> element when available.
 * Enterprise behaviors:
 * - ESC requests close via `onRequestClose`
 * - Backdrop click requests close (modal only)
 * - Focus restores to `focusAfterCloseRef` (or previous active element)
 */
const Dialog = forwardRef(function Dialog(
  {
    children,
    className,
    focusAfterCloseRef,
    modal = true,
    onCancel,
    onClick,
    onClose,
    onRequestClose,
    open = false,
    role = 'dialog',
    ariaLabel: ariaLabelProp,
    ariaLabelledBy: ariaLabelledByProp,
    ariaDescribedBy,
    ...rest
  },
  forwardedRef
) {
  const id = useMemo(() => getDialogId(), [])
  const titleId = useMemo(() => `bhcm-dialog-title-${id}`, [id])
  const subtitleId = useMemo(() => `bhcm-dialog-subtitle-${id}`, [id])
  const dialogId = useMemo(() => `bhcm-dialog-${id}`, [id])

  const backupRef = useRef(null)
  const ref = forwardedRef || backupRef
  const lastActiveRef = useRef(null)

  const ariaLabel = rest['aria-label'] ?? ariaLabelProp
  const ariaLabelledBy = rest['aria-labelledby'] ?? ariaLabelledByProp

  const ctx = useMemo(
    () => ({
      dialogId,
      titleId,
      subtitleId,
      isOpen: Boolean(open),
    }),
    [dialogId, open, subtitleId, titleId]
  )

  // Open/close via imperative dialog API when available.
  useEffect(() => {
    const node = ref && typeof ref === 'object' ? ref.current : null
    if (!node) return

    if (typeof document !== 'undefined' && open) {
      lastActiveRef.current = document.activeElement
    }

    if (open) {
      try {
        if (modal && typeof node.showModal === 'function') node.showModal()
        else if (!modal && typeof node.show === 'function') node.show()
        else node.setAttribute('open', '')
      } catch {
        // If showModal fails (e.g. already open), ensure open attribute.
        try {
          node.setAttribute('open', '')
        } catch {
          // ignore
        }
      }
    } else {
      try {
        if (typeof node.close === 'function') node.close()
        else node.removeAttribute('open')
      } catch {
        try {
          node.removeAttribute('open')
        } catch {
          // ignore
        }
      }
    }
  }, [modal, open, ref])

  // Focus restore after close.
  useEffect(() => {
    if (open) return

    const t = setTimeout(() => {
      const focusAfter = focusAfterCloseRef?.current
      if (focusAfter && focusAfter.focus) {
        focusAfter.focus()
        return
      }
      const prev = lastActiveRef.current
      if (prev && prev instanceof HTMLElement && prev.focus) {
        prev.focus()
      }
    }, 0)

    return () => clearTimeout(t)
  }, [focusAfterCloseRef, open])

  const handleModalBackdropClick = useCallback(
    event => {
      const node = ref && typeof ref === 'object' ? ref.current : null
      if (!open || !modal || !node) return
      if (event.target === node) {
        onRequestClose?.(event)
      }
    },
    [modal, onRequestClose, open, ref]
  )

  const handleClick = useCallback(
    event => {
      handleModalBackdropClick(event)
      onClick?.(event)
    },
    [handleModalBackdropClick, onClick]
  )

  const handleCancel = useCallback(
    event => {
      // Prevent native close; keep controlled via `open`.
      event.preventDefault?.()
      onCancel?.(event)
      onRequestClose?.(event)
    },
    [onCancel, onRequestClose]
  )

  const dialogAriaLabelledBy = ariaLabel ? undefined : ariaLabelledBy || titleId

  const content = (
    <DialogContext.Provider value={ctx}>
      {/* Backdrop styling is controlled via ::backdrop on <dialog>, but we also
          include an outer wrapper for non-modal positioning parity. */}
      <StyledBackdrop $open={open}>
        <StyledDialog
          {...rest}
          id={dialogId}
          className={className}
          ref={ref}
          onCancel={handleCancel}
          onClick={handleClick}
          onClose={onClose}
          role={role || 'dialog'}
          aria-label={ariaLabel}
          aria-labelledby={dialogAriaLabelledBy}
          aria-describedby={ariaDescribedBy}
          $modal={modal}
        >
          <StyledContainer>{children}</StyledContainer>
        </StyledDialog>
      </StyledBackdrop>
    </DialogContext.Provider>
  )

  // Native dialogs render in the top layer, but portal keeps stacking consistent.
  if (typeof document === 'undefined') return content
  return <Portal>{content}</Portal>
})

Dialog.displayName = 'Dialog'

/**
 * DialogHeader
 */
export const DialogHeader = forwardRef(function DialogHeader({ children, ...rest }, ref) {
  return (
    <StyledHeader ref={ref} {...rest}>
      {children}
    </StyledHeader>
  )
})

DialogHeader.displayName = 'DialogHeader'

/**
 * DialogTitle
 */
export const DialogTitle = forwardRef(function DialogTitle({ id, children, ...rest }, ref) {
  const ctx = useDialogContext()
  const resolvedId = id || ctx.titleId
  return (
    <StyledTitle id={resolvedId} ref={ref} {...rest}>
      {children}
    </StyledTitle>
  )
})

DialogTitle.displayName = 'DialogTitle'

/**
 * DialogSubtitle
 */
export const DialogSubtitle = forwardRef(function DialogSubtitle(
  { id, children, ...rest },
  ref
) {
  const ctx = useDialogContext()
  const resolvedId = id || ctx.subtitleId
  return (
    <StyledSubtitle id={resolvedId} ref={ref} {...rest}>
      {children}
    </StyledSubtitle>
  )
})

DialogSubtitle.displayName = 'DialogSubtitle'

/**
 * DialogControls
 */
export const DialogControls = forwardRef(function DialogControls({ children, ...rest }, ref) {
  return (
    <StyledControls ref={ref} {...rest}>
      {children}
    </StyledControls>
  )
})

DialogControls.displayName = 'DialogControls'

/**
 * DialogCloseButton
 */
export const DialogCloseButton = forwardRef(function DialogCloseButton(
  { onClick, iconDescription = 'Close', ...rest },
  ref
) {
  return (
    <StyledCloseButton ref={ref} type="button" aria-label={iconDescription} onClick={onClick} {...rest}>
      <CloseIcon />
    </StyledCloseButton>
  )
})

DialogCloseButton.displayName = 'DialogCloseButton'

/**
 * DialogBody
 */
export const DialogBody = forwardRef(function DialogBody(
  { children, hasScrollingContent = false, ...rest },
  ref
) {
  const bodyRef = useRef(null)
  const [scrollable, setScrollable] = React.useState(false)

  useEffect(() => {
    const node = bodyRef.current
    if (!node) return

    const compute = () => {
      setScrollable(node.scrollHeight > node.clientHeight)
    }

    compute()

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => compute())
      ro.observe(node)
      return () => ro.disconnect()
    }

    return undefined
  }, [])

  const isScrollable = hasScrollingContent || scrollable
  const scrollableProps = isScrollable ? { tabIndex: 0, role: 'region' } : {}

  return (
    <StyledBody
      ref={node => {
        bodyRef.current = node
        if (!ref) return
        if (typeof ref === 'function') ref(node)
        else ref.current = node
      }}
      $hasScrollingContent={isScrollable}
      {...scrollableProps}
      {...rest}
    >
      {children}
    </StyledBody>
  )
})

DialogBody.displayName = 'DialogBody'

/**
 * DialogFooter
 *
 * Supports either custom children OR a button set API.
 */
export const DialogFooter = forwardRef(function DialogFooter(
  {
    children,
    danger = false,
    primaryButtonText,
    secondaryButtonText,
    onRequestClose,
    onRequestSubmit,
    ...rest
  },
  ref
) {
  const hasChildren = Children.count(children) > 0

  if (hasChildren) {
    return (
      <StyledFooter ref={ref} {...rest}>
        {children}
      </StyledFooter>
    )
  }

  const PrimaryButton = useMemo(() => {
    return _Button || null
  }, [])

  const SecondaryButton = useMemo(() => {
    return _Button || null
  }, [])

  return (
    <StyledFooter ref={ref} {...rest}>
      {secondaryButtonText && SecondaryButton ? (
        <SecondaryButton type="button" kind="secondary" onClick={onRequestClose}>
          {secondaryButtonText}
        </SecondaryButton>
      ) : null}
      {primaryButtonText && PrimaryButton ? (
        <PrimaryButton type="button" kind={danger ? 'danger' : 'primary'} onClick={onRequestSubmit}>
          {primaryButtonText}
        </PrimaryButton>
      ) : null}
    </StyledFooter>
  )
})

DialogFooter.displayName = 'DialogFooter'

export default Dialog
