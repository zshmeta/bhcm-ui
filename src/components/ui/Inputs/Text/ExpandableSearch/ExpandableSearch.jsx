import React, { forwardRef, useEffect, useRef, useState } from 'react'
import Search from '../Search'

function composeHandlers(userHandler, internalHandler) {
  return evt => {
    userHandler?.(evt)
    internalHandler?.(evt)
  }
}

function isEscape(evt) {
  return evt.key === 'Escape'
}

const ExpandableSearch = forwardRef(function ExpandableSearch(
  { onBlur, onChange, onExpand, onKeyDown, defaultValue, isExpanded, ...props },
  forwardedRef
) {
  const [expanded, setExpanded] = useState(Boolean(isExpanded))
  const [hasContent, setHasContent] = useState(Boolean(defaultValue))
  const inputRef = useRef(null)

  function handleBlur(evt) {
    const relatedTargetIsAllowed =
      evt.relatedTarget &&
      (evt.relatedTarget.dataset?.searchClose === 'true' ||
        evt.relatedTarget.getAttribute?.('data-search-close') === 'true')

    if (expanded && !relatedTargetIsAllowed && !hasContent && !isExpanded) {
      setExpanded(false)
    }
  }

  useEffect(() => {
    if (isExpanded === undefined) return
    setExpanded(Boolean(isExpanded))
  }, [isExpanded])

  function handleChange(evt) {
    setHasContent(evt.target.value !== '')
  }

  function handleExpand(evt) {
    setExpanded(true)
    // focus input after expansion
    queueMicrotask?.(() => inputRef.current?.focus?.())
    onExpand?.(evt)
  }

  function handleKeyDown(evt) {
    if (expanded && isEscape(evt)) {
      evt.stopPropagation()
      // escape key only collapses if the input is empty
      if (!evt.target?.value && !isExpanded) {
        setExpanded(false)
      }
    }
  }

  return (
    <Search
      {...props}
      defaultValue={defaultValue}
      isExpanded={expanded}
      ref={node => {
        inputRef.current = node
        if (!forwardedRef) return
        if (typeof forwardedRef === 'function') forwardedRef(node)
        else forwardedRef.current = node
      }}
      onBlur={composeHandlers(onBlur, handleBlur)}
      onChange={composeHandlers(onChange, handleChange)}
      onExpand={handleExpand}
      onKeyDown={composeHandlers(onKeyDown, handleKeyDown)}
    />
  )
})

ExpandableSearch.displayName = 'ExpandableSearch'

export default ExpandableSearch
