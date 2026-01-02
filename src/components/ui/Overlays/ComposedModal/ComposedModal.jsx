import React, {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import ReactDOM from 'react-dom'
import {
  StyledBody,
  StyledCloseButton,
  StyledDecorator,
  StyledDialog,
  StyledFooter,
  StyledFooterButton,
  StyledHeader,
  StyledHeaderText,
  StyledInner,
  StyledLabel,
  StyledOverlay,
  StyledTitle,
} from './ComposedModal.styles'

const ComposedModalContext = createContext(null)

function useComposedModalContext() {
  return useContext(ComposedModalContext)
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

function getFocusableElements(container) {
  if (!container) return []

  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(',')

  const nodes = Array.from(container.querySelectorAll(selector))
  return nodes.filter(node => {
    if (!(node instanceof HTMLElement)) return false
    const style = window.getComputedStyle(node)
    return style.visibility !== 'hidden' && style.display !== 'none'
  })
}

function elementOrParentMatchesAnySelector(target, selectors) {
  if (!target || !selectors || selectors.length === 0) return false
  if (!(target instanceof Element)) return false

  return selectors.some(sel => {
    if (!sel) return false
    try {
      return Boolean(target.closest(sel))
    } catch {
      return false
    }
  })
}

function useComposedModalState(open) {
  const [isOpen, setIsOpen] = useState(Boolean(open))
  const [wasOpen, setWasOpen] = useState(Boolean(open))

  useEffect(() => {
    if (open !== wasOpen) {
      setIsOpen(Boolean(open))
      setWasOpen(Boolean(open))
    }
  }, [open, wasOpen])

  return [isOpen, setIsOpen]
}

/**
 * ComposedModal
 *
 * Enterprise behaviors preserved from Carbon:
 * - Portaled to `document.body`
 * - ESC closes (unless `onClose` returns `false`)
 * - Focus trap (Tab / Shift+Tab wrap)
 * - Primary focus selection:
 *   1) `selectorPrimaryFocus` (default: `[data-modal-primary-focus]`)
 *   2) primary/secondary buttons provided by `ModalFooter` (danger focuses secondary)
 *   3) close button fallback
 * - Restores focus to `launcherButtonRef` (or previously focused element) on close
 * - Outside click close rules (passive vs transactional) via `preventCloseOnClickOutside`
 *
 * @param {object} props
 * @param {boolean} [props.open]
 * @param {(event: MouseEvent|KeyboardEvent) => void|boolean} [props.onClose]
 * @param {(event: KeyboardEvent) => void} [props.onKeyDown]
 * @param {boolean} [props.preventCloseOnClickOutside]
 * @param {string} [props.selectorPrimaryFocus='[data-modal-primary-focus]']
 * @param {string[]} [props.selectorsFloatingMenus]
 * @param {React.RefObject<HTMLElement|null>} [props.launcherButtonRef]
 * @param {'xs'|'sm'|'md'|'lg'} [props.size]
 * @param {boolean} [props.isFullWidth]
 * @param {boolean} [props.danger]
 * @param {string} [props['aria-label']]
 * @param {string} [props['aria-labelledby']]
 * @param {string} [props.className] - applied to overlay (presentation layer)
 * @param {string} [props.containerClassName] - applied to dialog container
 * @param {React.ReactNode} [props.decorator]
 * @param {React.ReactNode} [props.slug] - deprecated alias for decorator
 */
const ComposedModal = forwardRef(function ComposedModal(
  {
    children,
    className,
    containerClassName,
    danger = false,
    decorator,
    slug,
    isFullWidth = false,
    onClose,
    onKeyDown,
    open,
    preventCloseOnClickOutside,
    selectorPrimaryFocus = '[data-modal-primary-focus]',
    selectorsFloatingMenus,
    size = 'md',
    launcherButtonRef,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...rest
  },
  forwardedRef
) {
  const [isOpen, setIsOpen] = useComposedModalState(open)

  const overlayRef = useRef(null)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  const lastActiveRef = useRef(null)
  const onMouseDownTargetRef = useRef(null)

  const normalizedDecorator = slug ?? decorator

  const mergedOverlayRef = useCallback(
    node => {
      overlayRef.current = node
      if (!forwardedRef) return
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else forwardedRef.current = node
    },
    [forwardedRef]
  )

  // Determine whether this is a "passive" modal (no footer) to preserve
  // Carbon's outside-click rules.
  const containsModalFooter = useMemo(() => {
    return Children.toArray(children).some(child =>
      isValidElement(child) && child.type?.displayName === 'ModalFooter'
    )
  }, [children])
  const isPassive = !containsModalFooter

  // Why: Transactional modals should not be dismissable by outside click by default.
  useEffect(() => {
    if (!isPassive && preventCloseOnClickOutside === false) {
      // Keep as a warning (non-fatal) like Carbon.
      console.warn(
        'Warning: `<ComposedModal>` prop `preventCloseOnClickOutside` should not be `false` when `<ModalFooter>` is present. Transactional, non-passive modals should not be dismissable by clicking outside.'
      )
    }
  }, [isPassive, preventCloseOnClickOutside])

  const closeModal = useCallback(
    evt => {
      // Preserve Carbon: returning false from onClose prevents closing.
      if (!onClose || onClose(evt) !== false) {
        setIsOpen(false)
      }
    },
    [onClose, setIsOpen]
  )

  // Scroll lock + remember last active element for focus restore.
  useEffect(() => {
    if (typeof document === 'undefined') return

    if (isOpen) {
      lastActiveRef.current = document.activeElement
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prevOverflow
      }
    }

    return undefined
  }, [isOpen])

  // ESC to close (capture phase, like Carbon).
  useEffect(() => {
    if (!isOpen) return

    const onDocKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        closeModal(event)
      }
    }

    document.addEventListener('keydown', onDocKeyDown, true)
    return () => {
      document.removeEventListener('keydown', onDocKeyDown, true)
    }
  }, [closeModal, isOpen])

  // Focus trap + forward keydown handler.
  const handleKeyDown = useCallback(
    event => {
      if (!isOpen) return

      if (event.key === 'Tab' && dialogRef.current) {
        const focusables = getFocusableElements(dialogRef.current)
        if (focusables.length > 0) {
          const first = focusables[0]
          const last = focusables[focusables.length - 1]
          const active = document.activeElement

          // A11y: wrap focus within the modal.
          if (event.shiftKey) {
            if (active === first || !dialogRef.current.contains(active)) {
              event.preventDefault()
              last.focus()
            }
          } else {
            if (active === last) {
              event.preventDefault()
              first.focus()
            }
          }
        }
      }

      onKeyDown?.(event)
    },
    [isOpen, onKeyDown]
  )

  // Outside click handling (preserve Carbon semantics).
  const handleMouseDown = useCallback(event => {
    onMouseDownTargetRef.current = event.target
  }, [])

  const handleOverlayClick = useCallback(
    event => {
      event.stopPropagation()

      const shouldCloseOnOutsideClick =
        (isPassive && !preventCloseOnClickOutside) ||
        (!isPassive && preventCloseOnClickOutside === false)

      if (!shouldCloseOnOutsideClick) return

      const target = event.target
      const mouseDownTarget = onMouseDownTargetRef.current

      if (
        elementOrParentMatchesAnySelector(target, selectorsFloatingMenus) ||
        elementOrParentMatchesAnySelector(mouseDownTarget, selectorsFloatingMenus)
      ) {
        return
      }

      if (!dialogRef.current) return

      const clickedOutside =
        target instanceof Node &&
        !dialogRef.current.contains(target) &&
        !(mouseDownTarget instanceof Node && dialogRef.current.contains(mouseDownTarget))

      if (clickedOutside) {
        closeModal(event)
      }
    },
    [
      closeModal,
      isPassive,
      preventCloseOnClickOutside,
      selectorsFloatingMenus,
    ]
  )

  // Primary focus selection on open.
  useEffect(() => {
    if (!isOpen) return
    if (!dialogRef.current) return

    // Why: Carbon defaults to `[data-modal-primary-focus]`.
    const primaryCandidate = danger
      ? dialogRef.current.querySelector('[data-modal-secondary-focus]')
      : dialogRef.current.querySelector(selectorPrimaryFocus)

    if (primaryCandidate instanceof HTMLElement) {
      primaryCandidate.focus()
      return
    }

    const footerPrimary = dialogRef.current.querySelector('[data-modal-primary-focus]')
    if (footerPrimary instanceof HTMLElement) {
      footerPrimary.focus()
      return
    }

    if (closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [danger, isOpen, selectorPrimaryFocus])

  // Focus restore on close.
  useEffect(() => {
    if (isOpen) return

    // Restore focus only after close, allow layout to settle.
    const t = setTimeout(() => {
      const launcher = launcherButtonRef?.current
      if (launcher && launcher.focus) {
        launcher.focus()
        return
      }

      const prev = lastActiveRef.current
      if (prev && prev instanceof HTMLElement && prev.focus) {
        prev.focus()
      }
    }, 0)

    return () => clearTimeout(t)
  }, [isOpen, launcherButtonRef])

  const headerClose = useCallback(
    evt => {
      closeModal(evt)
    },
    [closeModal]
  )

  const ctx = useMemo(() => {
    return {
      closeModal: headerClose,
      danger,
      closeButtonRef,
    }
  }, [danger, headerClose])

  const dialogAria = {
    role: 'dialog',
    'aria-modal': true,
    'aria-label': ariaLabel || undefined,
    'aria-labelledby': ariaLabelledBy || undefined,
  }

  const content = (
    <StyledOverlay
      {...rest}
      ref={mergedOverlayRef}
      role="presentation"
      aria-hidden={!isOpen}
      className={className}
      $isOpen={isOpen}
      onMouseDown={handleMouseDown}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
    >
      <StyledDialog
        {...dialogAria}
        ref={dialogRef}
        className={containerClassName}
        tabIndex={-1}
        $size={size}
        $danger={danger}
        $isFullWidth={isFullWidth}
      >
        <StyledInner>
          {normalizedDecorator ? (
            <StyledDecorator>{normalizedDecorator}</StyledDecorator>
          ) : null}
          <ComposedModalContext.Provider value={ctx}>
            {children}
          </ComposedModalContext.Provider>
        </StyledInner>
      </StyledDialog>
    </StyledOverlay>
  )

  if (typeof document === 'undefined') {
    return content
  }

  return ReactDOM.createPortal(content, document.body)
})

ComposedModal.displayName = 'ComposedModal'

/**
 * ModalHeader
 *
 * @param {object} props
 * @param {React.ReactNode} [props.label]
 * @param {React.ReactNode} [props.title]
 * @param {string} [props.iconDescription='Close']
 */
export const ModalHeader = forwardRef(function ModalHeader(
  {
    label,
    title,
    iconDescription = 'Close',
    closeModal,
    children,
    ...rest
  },
  ref
) {
  const ctx = useComposedModalContext()

  const handleClose = useCallback(
    evt => {
      // Why: allow explicit prop override, but default to modal context.
      ;(closeModal ?? ctx?.closeModal)?.(evt)
    },
    [closeModal, ctx]
  )

  return (
    <StyledHeader ref={ref} {...rest}>
      <StyledHeaderText>
        {label ? <StyledLabel>{label}</StyledLabel> : null}
        {title ? <StyledTitle>{title}</StyledTitle> : null}
        {children}
      </StyledHeaderText>

      <StyledCloseButton
        ref={ctx?.closeButtonRef}
        type="button"
        aria-label={iconDescription}
        onClick={handleClose}
      >
        <CloseIcon />
      </StyledCloseButton>
    </StyledHeader>
  )
})

ModalHeader.displayName = 'ModalHeader'

/**
 * ModalBody
 *
 * Preserves Carbon behavior:
 * - When scrolling content is present, provide `tabIndex=0` and `role=region`.
 */
export const ModalBody = forwardRef(function ModalBody(
  { children, hasForm = false, hasScrollingContent = false, className, ...rest },
  ref
) {
  const bodyRef = useRef(null)
  const [isScrollable, setIsScrollable] = useState(false)

  useEffect(() => {
    const node = bodyRef.current
    if (!node) return

    const compute = () => {
      setIsScrollable(node.scrollHeight > node.clientHeight)
    }

    compute()

    // Why: Carbon uses ResizeObserver to detect scrollability changes.
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => compute())
      ro.observe(node)
      return () => ro.disconnect()
    }

    return undefined
  }, [])

  const scrollable = hasScrollingContent || isScrollable
  const scrollableProps = scrollable ? { tabIndex: 0, role: 'region' } : {}

  return (
    <StyledBody
      ref={node => {
        bodyRef.current = node
        if (!ref) return
        if (typeof ref === 'function') ref(node)
        else ref.current = node
      }}
      className={className}
      $hasScrollingContent={scrollable}
      $hasForm={hasForm}
      {...scrollableProps}
      {...rest}
    >
      {children}
    </StyledBody>
  )
})

ModalBody.displayName = 'ModalBody'

/**
 * ModalFooter
 *
 * Minimal transactional footer preserving primary focus behavior.
 *
 * @param {object} props
 * @param {string} [props.primaryButtonText]
 * @param {string} [props.secondaryButtonText]
 */
export const ModalFooter = forwardRef(function ModalFooter(
  {
    primaryButtonText,
    secondaryButtonText,
    danger: dangerProp,
    closeModal,
    onRequestSubmit,
    ...rest
  },
  ref
) {
  const ctx = useComposedModalContext()
  const danger = dangerProp ?? ctx?.danger ?? false

  const handleSecondary = useCallback(
    evt => {
      ;(closeModal ?? ctx?.closeModal)?.(evt)
    },
    [closeModal, ctx]
  )

  const handlePrimary = useCallback(
    evt => {
      onRequestSubmit?.(evt)
    },
    [onRequestSubmit]
  )

  return (
    <StyledFooter ref={ref} {...rest}>
      {secondaryButtonText ? (
        <StyledFooterButton
          type="button"
          $kind="secondary"
          data-modal-secondary-focus
          onClick={handleSecondary}
        >
          {secondaryButtonText}
        </StyledFooterButton>
      ) : null}

      {primaryButtonText ? (
        <StyledFooterButton
          type="button"
          $kind={danger ? 'danger' : 'primary'}
          data-modal-primary-focus
          onClick={handlePrimary}
        >
          {primaryButtonText}
        </StyledFooterButton>
      ) : null}
    </StyledFooter>
  )
})

ModalFooter.displayName = 'ModalFooter'

export default ComposedModal
