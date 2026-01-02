import React, { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react'
import Portal from '../../Overlays/Portal/Portal'
import {
  StyledAdditionalText,
  StyledAILabelActions,
  StyledAILabelContent,
  StyledAILabelWrap,
  StyledAIText,
  StyledPopover,
  StyledPopoverInner,
  StyledRevertButton,
  StyledTrigger,
} from './AILabel.styles'

const ALIGN_OPTIONS = new Set([
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
  // deprecated aliases seen in MDS stories
  'bottom-right',
  'bottom-left',
  'top-right',
  'top-left',
])

function normalizeAlign(align) {
  if (!align) return 'bottom'
  if (!ALIGN_OPTIONS.has(align)) return 'bottom'

  if (align === 'bottom-right') return 'bottom-end'
  if (align === 'bottom-left') return 'bottom-start'
  if (align === 'top-right') return 'top-end'
  if (align === 'top-left') return 'top-start'

  return align
}

function computePosition({
  align,
  triggerRect,
  popoverRect,
  gap,
  axisOffset,
  viewportWidth,
  viewportHeight,
}) {
  const a = normalizeAlign(align)

  const cx = triggerRect.left + triggerRect.width / 2
  const cy = triggerRect.top + triggerRect.height / 2

  let left = cx - popoverRect.width / 2
  let top = triggerRect.bottom + gap

  if (a.startsWith('top')) {
    top = triggerRect.top - popoverRect.height - gap
  }

  if (a.startsWith('bottom')) {
    top = triggerRect.bottom + gap
  }

  if (a.startsWith('left')) {
    left = triggerRect.left - popoverRect.width - gap
    top = cy - popoverRect.height / 2
  }

  if (a.startsWith('right')) {
    left = triggerRect.right + gap
    top = cy - popoverRect.height / 2
  }

  if (a.endsWith('start')) {
    if (a.startsWith('top') || a.startsWith('bottom')) {
      left = triggerRect.left
    }
    if (a.startsWith('left') || a.startsWith('right')) {
      top = triggerRect.top
    }
  }

  if (a.endsWith('end')) {
    if (a.startsWith('top') || a.startsWith('bottom')) {
      left = triggerRect.right - popoverRect.width
    }
    if (a.startsWith('left') || a.startsWith('right')) {
      top = triggerRect.bottom - popoverRect.height
    }
  }

  // Carbon offsets the "alignment axis" for very small icons.
  if (axisOffset) {
    if (a.startsWith('top') || a.startsWith('bottom')) {
      left += axisOffset
    } else {
      top += axisOffset
    }
  }

  // Clamp into viewport with a small margin.
  const margin = 8
  const clampedLeft = Math.min(
    Math.max(margin, left),
    Math.max(margin, viewportWidth - popoverRect.width - margin)
  )
  const clampedTop = Math.min(
    Math.max(margin, top),
    Math.max(margin, viewportHeight - popoverRect.height - margin)
  )

  const fits =
    left >= margin &&
    top >= margin &&
    left + popoverRect.width <= viewportWidth - margin &&
    top + popoverRect.height <= viewportHeight - margin

  return { left: clampedLeft, top: clampedTop, fits }
}

function getAutoAlignCandidates(align) {
  const a = normalizeAlign(align)
  if (a.startsWith('bottom')) return [a, 'top', 'bottom', 'right', 'left']
  if (a.startsWith('top')) return [a, 'bottom', 'top', 'right', 'left']
  if (a.startsWith('left')) return [a, 'right', 'left', 'top', 'bottom']
  if (a.startsWith('right')) return [a, 'left', 'right', 'top', 'bottom']
  return [a, 'bottom', 'top', 'right', 'left']
}

export const AILabelActions = forwardRef(function AILabelActions(
  { className, children, ...rest },
  ref
) {
  return (
    <StyledAILabelActions ref={ref} className={className} {...rest}>
      {children}
    </StyledAILabelActions>
  )
})

AILabelActions.displayName = 'AILabelActions'

export const AILabelContent = forwardRef(function AILabelContent(
  { className, children, ...rest },
  ref
) {
  const withActions = useMemo(() => {
    return React.Children.toArray(children).some(child => {
      return React.isValidElement(child) && child.type?.displayName === 'AILabelActions'
    })
  }, [children])

  return (
    <StyledAILabelContent
      ref={ref}
      className={className}
      $withActions={withActions}
      {...rest}
    >
      {children}
    </StyledAILabelContent>
  )
})

AILabelContent.displayName = 'AILabelContent'

function UndoIcon() {
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
        d="M6 4H2v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.2 7.2c1.1-2.4 3.5-4 6.2-4 3.8 0 6.9 3.1 6.9 6.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

const AILabel = forwardRef(function AILabel(
  {
    aiText = 'AI',
    aiTextLabel,
    textLabel,
    align,
    autoAlign = true,
    children,
    className,
    kind = 'default',
    onRevertClick,
    revertActive,
    revertLabel = 'Revert to AI input',
    slugLabel = 'Show information',
    'aria-label': ariaLabel = 'Show information',
    size = 'xs',
    defaultOpen = false,
    open: controlledOpen,
    onOpen,
    onClose,
    id: idProp,
    ...rest
  },
  ref
) {
  const reactId = useId()
  const id = idProp || `bhcm-ailabel-${String(reactId).replace(/:/g, '')}`

  const triggerRef = useRef(null)
  const popoverRef = useRef(null)

  const [uncontrolledOpen, setUncontrolledOpen] = useState(!!defaultOpen)
  const isControlled = typeof controlledOpen === 'boolean'
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen

  const [pos, setPos] = useState({ left: 0, top: 0 })

  const ariaLabelText = useMemo(() => {
    const extra = aiTextLabel || textLabel
    if (!extra) return `${aiText} ${slugLabel || ariaLabel}`
    return `${aiText} ${extra}`
  }, [aiText, aiTextLabel, ariaLabel, slugLabel, textLabel])

  const axisOffset = useMemo(() => {
    const isSmall = ['xs', '2xs', 'mini'].includes(size)
    return isSmall ? -24 : 0
  }, [size])

  const contentNode = useMemo(() => {
    const fromChildren = React.Children.toArray(children).find(
      child => React.isValidElement(child) && child.type?.displayName === 'AILabelContent'
    )
    return fromChildren || children
  }, [children])

  function close(nextEvent) {
    if (!isOpen) return
    if (!isControlled) setUncontrolledOpen(false)
    onClose?.(nextEvent)
    // Restore focus to trigger.
    triggerRef.current?.focus?.()
  }

  function open(nextEvent) {
    if (isOpen) return
    if (!isControlled) setUncontrolledOpen(true)
    onOpen?.(nextEvent)
  }

  function toggle(evt) {
    if (isOpen) close(evt)
    else open(evt)
  }

  useEffect(() => {
    if (!isOpen) return

    function onKeyDown(evt) {
      if (evt.key === 'Escape') {
        evt.stopPropagation()
        evt.preventDefault()
        close(evt)
      }
    }

    function onPointerDown(evt) {
      const t = evt.target
      if (!(t instanceof Node)) return

      const triggerEl = triggerRef.current
      const popEl = popoverRef.current
      const isInsideTrigger = triggerEl ? triggerEl.contains(t) : false
      const isInsidePopover = popEl ? popEl.contains(t) : false
      if (!isInsideTrigger && !isInsidePopover) {
        close(evt)
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    document.addEventListener('pointerdown', onPointerDown, true)

    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      document.removeEventListener('pointerdown', onPointerDown, true)
    }
  }, [isControlled, isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return
    if (!triggerRef.current || !popoverRef.current) return

    const gap = 8

    function update() {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      const triggerRect = triggerRef.current.getBoundingClientRect()
      const popoverRect = popoverRef.current.getBoundingClientRect()

      const desired = normalizeAlign(align)
      const candidates = autoAlign ? getAutoAlignCandidates(desired) : [desired]

      for (const candidate of candidates) {
        const next = computePosition({
          align: candidate,
          triggerRect,
          popoverRect,
          gap,
          axisOffset,
          viewportWidth,
          viewportHeight,
        })
        setPos({ left: next.left, top: next.top })
        if (!autoAlign || next.fits) break
      }
    }

    update()

    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [align, autoAlign, axisOffset, isOpen])

  return (
    <StyledAILabelWrap ref={ref} className={className} id={id} {...rest}>
      {revertActive ? (
        <StyledRevertButton
          type="button"
          onClick={onRevertClick}
          aria-label={revertLabel}
          title={revertLabel}
        >
          <UndoIcon />
        </StyledRevertButton>
      ) : (
        <StyledTrigger
          ref={triggerRef}
          type="button"
          aria-label={ariaLabelText}
          aria-expanded={isOpen}
          aria-controls={`${id}__popover`}
          onClick={toggle}
          $kind={kind}
          $size={size}
        >
          <StyledAIText>{aiText}</StyledAIText>
          {kind === 'inline' && (aiTextLabel || textLabel) ? (
            <StyledAdditionalText>{aiTextLabel || textLabel}</StyledAdditionalText>
          ) : null}
        </StyledTrigger>
      )}

      {revertActive ? null : isOpen ? (
        <Portal>
          <StyledPopover
            id={`${id}__popover`}
            ref={popoverRef}
            role="dialog"
            aria-label={ariaLabelText}
            style={{ left: pos.left, top: pos.top }}
          >
            <StyledPopoverInner>{contentNode}</StyledPopoverInner>
          </StyledPopover>
        </Portal>
      ) : null}
    </StyledAILabelWrap>
  )
})

AILabel.displayName = 'AILabel'

export default AILabel
