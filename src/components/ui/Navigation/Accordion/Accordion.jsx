import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  StyledAccordionHeading,
  StyledAccordionItem,
  StyledAccordionList,
  StyledChevron,
  StyledPanelInner,
  StyledPanelOuter,
  StyledTitle,
} from './Accordion.styles'

const AccordionContext = createContext({
  disabled: false,
  align: 'end',
  isFlush: false,
  size: undefined,
})

function useAccordionContext() {
  return useContext(AccordionContext)
}

function DefaultToggle({ children, ...buttonProps }) {
  return <StyledAccordionHeading {...buttonProps}>{children}</StyledAccordionHeading>
}

function ChevronIcon(props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M6 3.5L10.5 8L6 12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Accordion (Trading UI variant)
 *
 * Architecture goals:
 * - Preserve legacy Carbon behavior (open/close logic, a11y wiring, Escape-to-close)
 * - Remove Carbon implementation details (classnames, prefix hooks, SCSS)
 * - Use context (no React.Children cloning) for shared state like `disabled`
 *
 * @param {object} props
 * @param {'start'|'end'} [props.align='end'] - Chevron alignment.
 * @param {boolean} [props.disabled=false] - Disables all accordion items.
 * @param {boolean} [props.isFlush=false] - Flush density (ignored when align is 'start', same as Carbon).
 * @param {boolean} [props.ordered=false] - Render as `ol` instead of `ul`.
 * @param {'sm'|'md'|'lg'} [props.size] - Density/typography size.
 * @param {React.ReactNode} [props.children]
 */
function Accordion({
  align = 'end',
  children,
  className,
  disabled = false,
  isFlush = false,
  ordered = false,
  size,
  ...rest
}) {
  const contextValue = useMemo(
    () => ({
      disabled,
      align,
      isFlush: isFlush && align !== 'start',
      size,
    }),
    [align, disabled, isFlush, size]
  )

  return (
    <AccordionContext.Provider value={contextValue}>
      <StyledAccordionList
        as={ordered ? 'ol' : 'ul'}
        className={className}
        $isFlush={contextValue.isFlush}
        $size={size}
        {...rest}
      >
        {children}
      </StyledAccordionList>
    </AccordionContext.Provider>
  )
}

/**
 * AccordionItem
 *
 * Preserved legacy behaviors:
 * - `open` prop can drive external control; internal state syncs when it changes.
 * - ESC closes an open item.
 * - `aria-controls` and `aria-expanded` are kept.
 * - Item-level `disabled` overrides accordion-level `disabled`.
 * - `onHeadingClick({ isOpen, event })` signature preserved.
 * - `handleAnimationEnd` called on panel transition end.
 * - Custom heading renderer via `renderToggle`.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.title]
 * @param {React.ReactNode} [props.children]
 * @param {boolean} [props.open=false]
 * @param {boolean} [props.disabled]
 * @param {string} [props['aria-label']] - Important when no visible title exists.
 * @param {(args: {isOpen: boolean, event: React.MouseEvent<HTMLButtonElement>}) => void} [props.onHeadingClick]
 * @param {(event: React.TransitionEvent<HTMLDivElement>) => void} [props.handleAnimationEnd]
 * @param {(props: any) => React.ReactElement} [props.renderToggle]
 */
export function AccordionItem({
  children,
  className,
  open = false,
  onHeadingClick,
  renderToggle,
  title,
  disabled: controlledDisabled,
  handleAnimationEnd,
  'aria-label': ariaLabel,
  ...rest
}) {
  const { disabled: accordionDisabled, align, isFlush, size } = useAccordionContext()

  const isDisabled =
    typeof controlledDisabled === 'boolean' ? controlledDisabled : accordionDisabled

  const [isOpen, setIsOpen] = useState(open)
  const prevOpenPropRef = useRef(open)

  // Sync internal state when the `open` prop changes.
  // Why: Carbon supported externally driving an item open/closed ("controlled" story).
  useEffect(() => {
    if (open !== prevOpenPropRef.current) {
      prevOpenPropRef.current = open
      setIsOpen(open)
    }
  }, [open])

  const reactId = useId()
  const safeId = useMemo(() => String(reactId).replace(/:/g, ''), [reactId])

  const headingId = `bhcm-accordion-heading-${safeId}`
  const panelId = `bhcm-accordion-panel-${safeId}`

  const panelOuterRef = useRef(null)

  const setPanelMaxHeightForOpen = useCallback(() => {
    const node = panelOuterRef.current
    if (!node) return
    node.style.maxHeight = `${node.scrollHeight}px`
  }, [])

  const setPanelMaxHeightForClose = useCallback(() => {
    const node = panelOuterRef.current
    if (!node) return

    // If we're currently fully open (max-height: none), lock it to px first.
    if (!node.style.maxHeight || node.style.maxHeight === 'none') {
      node.style.maxHeight = `${node.scrollHeight}px`
    }

    // Force a transition to 0px.
    requestAnimationFrame(() => {
      node.style.maxHeight = '0px'
    })
  }, [])

  // Drive height animation via inline max-height to keep smooth transitions
  // without relying on SCSS measurements.
  useEffect(() => {
    const node = panelOuterRef.current
    if (!node) return

    if (isOpen) {
      setPanelMaxHeightForOpen()
    } else {
      setPanelMaxHeightForClose()
    }
  }, [isOpen, children, setPanelMaxHeightForClose, setPanelMaxHeightForOpen])

  const handleHeadingClick = useCallback(
    event => {
      if (isDisabled) return

      const nextValue = !isOpen
      setIsOpen(nextValue)

      // Why: Preserve Carbon's callback signature for migration compatibility.
      onHeadingClick?.({ isOpen: nextValue, event })
    },
    [isDisabled, isOpen, onHeadingClick]
  )

  const handleHeadingKeyDown = useCallback(
    event => {
      // A11y: ESC should collapse an open item.
      if (isOpen && event.key === 'Escape') {
        event.stopPropagation()
        setIsOpen(false)
      }
    },
    [isOpen]
  )

  const Toggle = renderToggle || DefaultToggle

  const toggleProps = useMemo(
    () => ({
      id: headingId,
      disabled: isDisabled,
      'aria-controls': panelId,
      'aria-expanded': isOpen,
      'aria-label': ariaLabel,
      onClick: handleHeadingClick,
      onKeyDown: handleHeadingKeyDown,
      type: 'button',
      $align: align,
      $isFlush: isFlush,
    }),
    [
      align,
      ariaLabel,
      handleHeadingClick,
      handleHeadingKeyDown,
      headingId,
      isDisabled,
      isFlush,
      isOpen,
      panelId,
    ]
  )

  const onPanelTransitionEnd = useCallback(
    event => {
      if (event.target !== event.currentTarget) return

      // Why: When fully opened, allow content to grow without being clipped.
      if (isOpen && panelOuterRef.current) {
        panelOuterRef.current.style.maxHeight = 'none'
      }

      handleAnimationEnd?.(event)
    },
    [handleAnimationEnd, isOpen]
  )

  return (
    <StyledAccordionItem
      className={className}
      $isOpen={isOpen}
      $disabled={isDisabled}
      $size={size}
      {...rest}
    >
      <Toggle {...toggleProps}>
        {align === 'start' ? (
          <>
            <StyledChevron $isOpen={isOpen}>
              <ChevronIcon />
            </StyledChevron>
            <StyledTitle>{title}</StyledTitle>
          </>
        ) : (
          <>
            <StyledTitle>{title}</StyledTitle>
            <StyledChevron $isOpen={isOpen}>
              <ChevronIcon />
            </StyledChevron>
          </>
        )}
      </Toggle>

      <StyledPanelOuter
        ref={panelOuterRef}
        $isOpen={isOpen}
        onTransitionEnd={onPanelTransitionEnd}
        aria-hidden={!isOpen}
      >
        <StyledPanelInner
          id={panelId}
          role="region"
          aria-labelledby={headingId}
          $isFlush={isFlush}
        >
          {children}
        </StyledPanelInner>
      </StyledPanelOuter>
    </StyledAccordionItem>
  )
}

AccordionItem.displayName = 'AccordionItem'

export default Accordion
