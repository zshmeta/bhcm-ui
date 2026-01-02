import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../../Buttons'
import {
  Actions,
  Code,
  Container,
  InlineCode,
  InlineRoot,
  LiveRegion,
  Pre,
  Root,
  Textbox,
  ExpandRow,
} from './CodeSnippet.styles'

const rowHeightInPixels = 16
const defaultMaxCollapsedNumberOfRows = 15
const defaultMaxExpandedNumberOfRows = 0
const defaultMinCollapsedNumberOfRows = 3
const defaultMinExpandedNumberOfRows = 16

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

function ChevronDownIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

async function writeClipboard(text) {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return true
  }

  if (typeof document === 'undefined') return false

  const ta = document.createElement('textarea')
  ta.value = text
  ta.setAttribute('readonly', '')
  ta.style.position = 'fixed'
  ta.style.top = '-1000px'
  ta.style.left = '-1000px'
  document.body.appendChild(ta)
  ta.select()
  const ok = document.execCommand?.('copy')
  document.body.removeChild(ta)
  return Boolean(ok)
}

export default function CodeSnippet({
  align = 'bottom',
  autoAlign = false,
  className,
  type = 'single',
  children,
  disabled,
  feedback = 'Copied to clipboard',
  feedbackTimeout = 2000,
  onClick,
  ['aria-label']: ariaLabel = 'Copy to clipboard',
  ariaLabel: deprecatedAriaLabel,
  copyText,
  copyButtonDescription = 'Copy to clipboard',
  light,
  showMoreText = 'Show more',
  showLessText = 'Show less',
  hideCopyButton,
  wrapText = false,
  maxCollapsedNumberOfRows = defaultMaxCollapsedNumberOfRows,
  maxExpandedNumberOfRows = defaultMaxExpandedNumberOfRows,
  minCollapsedNumberOfRows = defaultMinCollapsedNumberOfRows,
  minExpandedNumberOfRows = defaultMinExpandedNumberOfRows,
  ...rest
}) {
  const uid = useId()
  const [expandedCode, setExpandedCode] = useState(false)
  const [shouldShowMoreLessBtn, setShouldShowMoreLessBtn] = useState(false)
  const [copied, setCopied] = useState(false)

  const codeContentRef = useRef(null)
  const codeContainerRef = useRef(null)
  const innerCodeRef = useRef(null)

  const resolvedAriaLabel = deprecatedAriaLabel || ariaLabel

  const containerStyle = useMemo(() => {
    if (type !== 'multi') return undefined

    const styles = {}

    const maxRows = expandedCode ? maxExpandedNumberOfRows : maxCollapsedNumberOfRows
    const minRows = expandedCode ? minExpandedNumberOfRows : minCollapsedNumberOfRows

    if (maxRows > 0) styles.maxHeight = maxRows * rowHeightInPixels
    if (minRows > 0) styles.minHeight = minRows * rowHeightInPixels

    return Object.keys(styles).length ? styles : undefined
  }, [expandedCode, maxCollapsedNumberOfRows, maxExpandedNumberOfRows, minCollapsedNumberOfRows, minExpandedNumberOfRows, type])

  const measureMulti = useCallback(() => {
    if (type !== 'multi') return
    if (!innerCodeRef.current) return

    const height = innerCodeRef.current.getBoundingClientRect().height

    if (
      maxCollapsedNumberOfRows > 0 &&
      (maxExpandedNumberOfRows <= 0 || maxExpandedNumberOfRows > maxCollapsedNumberOfRows) &&
      height > maxCollapsedNumberOfRows * rowHeightInPixels
    ) {
      setShouldShowMoreLessBtn(true)
    } else {
      setShouldShowMoreLessBtn(false)
    }

    if (expandedCode && minExpandedNumberOfRows > 0 && height <= minExpandedNumberOfRows * rowHeightInPixels) {
      setExpandedCode(false)
    }
  }, [expandedCode, maxCollapsedNumberOfRows, maxExpandedNumberOfRows, minExpandedNumberOfRows, type])

  useEffect(() => {
    if (type !== 'multi') return

    measureMulti()

    if (typeof ResizeObserver === 'undefined') {
      const onResize = () => measureMulti()
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    const ro = new ResizeObserver(() => measureMulti())
    if (innerCodeRef.current) ro.observe(innerCodeRef.current)
    return () => ro.disconnect()
  }, [measureMulti, type])

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), feedbackTimeout)
    return () => window.clearTimeout(t)
  }, [copied, feedbackTimeout])

  const handleCopyClick = useCallback(
    async evt => {
      if (disabled) return

      const text = copyText ?? innerCodeRef.current?.innerText ?? ''
      if (text) {
        try {
          await writeClipboard(text)
          setCopied(true)
        } catch {
          // Ignore
        }
      }

      onClick?.(evt)
    },
    [copyText, disabled, onClick]
  )

  const expandCodeBtnText = expandedCode ? showLessText : showMoreText

  if (type === 'inline') {
    if (hideCopyButton) {
      return (
        <InlineRoot className={className} {...rest}>
          <InlineCode id={uid} ref={innerCodeRef}>
            {children}
          </InlineCode>
        </InlineRoot>
      )
    }

    return (
      <InlineRoot className={className} {...rest}>
        <InlineCode id={uid} ref={innerCodeRef}>
          {children}
        </InlineCode>
        <Button
          kind="ghost"
          size="xs"
          hasIconOnly
          renderIcon={CopyIcon}
          iconDescription={copyButtonDescription}
          aria-describedby={uid}
          disabled={disabled}
          onClick={handleCopyClick}
        />
        {copied ? <LiveRegion aria-live="polite">{feedback}</LiveRegion> : null}
      </InlineRoot>
    )
  }

  return (
    <Root className={className} {...rest}>
      <Container $disabled={!!disabled}>
        <Textbox
          ref={codeContainerRef}
          role={type === 'single' || type === 'multi' ? 'textbox' : undefined}
          tabIndex={(type === 'single' || type === 'multi') && !disabled ? 0 : undefined}
          aria-label={resolvedAriaLabel || 'code-snippet'}
          aria-readonly={type === 'single' || type === 'multi' ? true : undefined}
          aria-multiline={type === 'multi' ? true : undefined}
        >
          <Pre ref={codeContentRef} style={containerStyle} $scroll={type === 'multi'}>
            <Code ref={innerCodeRef} $wrap={wrapText}>
              {children}
            </Code>
          </Pre>
        </Textbox>

        <Actions>
          {!hideCopyButton ? (
            <Button
              kind="ghost"
              size={type === 'multi' ? 'sm' : 'md'}
              hasIconOnly
              renderIcon={CopyIcon}
              iconDescription={copyButtonDescription}
              disabled={disabled}
              onClick={handleCopyClick}
            />
          ) : null}
        </Actions>
      </Container>

      {shouldShowMoreLessBtn ? (
        <ExpandRow>
          <Button
            kind="ghost"
            size="sm"
            disabled={disabled}
            onClick={() => setExpandedCode(v => !v)}
            renderIcon={ChevronDownIcon}
          >
            {expandCodeBtnText}
          </Button>
        </ExpandRow>
      ) : null}

      {copied ? <LiveRegion aria-live="polite">{feedback}</LiveRegion> : null}
    </Root>
  )
}

CodeSnippet.displayName = 'CodeSnippet'

CodeSnippet.propTypes = {
  align: PropTypes.string,
  autoAlign: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  copyButtonDescription: PropTypes.string,
  copyText: PropTypes.string,
  disabled: PropTypes.bool,
  feedback: PropTypes.string,
  feedbackTimeout: PropTypes.number,
  hideCopyButton: PropTypes.bool,
  light: PropTypes.bool,
  maxCollapsedNumberOfRows: PropTypes.number,
  maxExpandedNumberOfRows: PropTypes.number,
  minCollapsedNumberOfRows: PropTypes.number,
  minExpandedNumberOfRows: PropTypes.number,
  onClick: PropTypes.func,
  showLessText: PropTypes.string,
  showMoreText: PropTypes.string,
  type: PropTypes.oneOf(['single', 'inline', 'multi']),
  wrapText: PropTypes.bool,
  ['aria-label']: PropTypes.string,
  ariaLabel: PropTypes.string,
}
