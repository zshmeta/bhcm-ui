import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  StyledClearButton,
  StyledLabel,
  StyledMagnifierButton,
  StyledRoot,
  StyledSearchIcon,
  StyledSearchInput,
} from './Search.styles'

function composeHandlers(userHandler, internalHandler) {
  return evt => {
    userHandler?.(evt)
    internalHandler?.(evt)
  }
}

function useMergedRefs(...refs) {
  return useCallback(
    node => {
      refs.forEach(ref => {
        if (!ref) return
        if (typeof ref === 'function') ref(node)
        else ref.current = node
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  )
}

function isEscape(evt) {
  return evt.key === 'Escape'
}

function isEnter(evt) {
  return evt.key === 'Enter'
}

function isSpace(evt) {
  return evt.key === ' ' || evt.key === 'Spacebar'
}

const Search = forwardRef(function Search(
  {
    autoComplete = 'off',
    className,
    closeButtonLabelText = 'Clear search input',
    defaultValue,
    disabled,
    isExpanded = true,
    id,
    labelText,
    onChange,
    onClear,
    onKeyDown,
    onExpand,
    placeholder = 'Search',
    renderIcon,
    role,
    size = 'md',
    type = 'search',
    value,
    ...rest
  },
  forwardedRef
) {
  const inputRef = useRef(null)
  const expandButtonRef = useRef(null)
  const mergedRef = useMergedRefs(forwardedRef, inputRef)

  const hasPropValue = value !== undefined || defaultValue !== undefined
  const [hasContent, setHasContent] = useState(Boolean(value || defaultValue))
  const [prevValue, setPrevValue] = useState(value)

  const uniqueId = id || useMemo(() => `bhcm-search-${Math.random().toString(36).slice(2)}`, [])
  const labelId = `${uniqueId}-search-label`

  // Keep hasContent in sync with controlled value
  useEffect(() => {
    if (value !== prevValue) {
      setHasContent(Boolean(value))
      setPrevValue(value)
    }
  }, [prevValue, value])

  const clearInput = useCallback(
    evt => {
      if (!value && inputRef.current) {
        inputRef.current.value = ''
      }

      // Call onChange with a minimal synthetic-ish event
      if (inputRef.current) {
        const nextValue = ''
        const syntheticEvent = {
          ...evt,
          target: { ...inputRef.current, value: nextValue },
          currentTarget: inputRef.current,
        }
        onChange?.(syntheticEvent)
      }

      onClear?.()
      setHasContent(false)
      inputRef.current?.focus?.()
    },
    [onChange, onClear, value]
  )

  const handleChange = useCallback(evt => {
    setHasContent(evt.target.value !== '')
  }, [])

  const handleInputKeyDown = useCallback(
    evt => {
      if (!isEscape(evt)) return
      evt.stopPropagation()

      if (inputRef.current?.value) {
        clearInput(evt)
        return
      }

      // ExpandableSearch behavior: if expanded and empty, focus activation button
      if (onExpand && isExpanded) {
        expandButtonRef.current?.focus?.()
      }
    },
    [clearInput, isExpanded, onExpand]
  )

  const handleExpandButtonKeyDown = useCallback(
    evt => {
      if (!(isEnter(evt) || isSpace(evt))) return
      evt.stopPropagation()
      onExpand?.(evt)
    },
    [onExpand]
  )

  const Icon = renderIcon

  return (
    <StyledRoot
      role="search"
      aria-label={placeholder}
      className={className}
      $size={size}
      $expanded={Boolean(isExpanded)}
      $disabled={Boolean(disabled)}
      {...rest}
    >
      <StyledMagnifierButton
        ref={expandButtonRef}
        type="button"
        aria-labelledby={onExpand ? labelId : undefined}
        aria-expanded={onExpand ? Boolean(isExpanded) : undefined}
        aria-controls={onExpand ? uniqueId : undefined}
        tabIndex={onExpand && !isExpanded ? 0 : -1}
        onClick={onExpand}
        onKeyDown={handleExpandButtonKeyDown}
        disabled={disabled}
        $expanded={Boolean(isExpanded)}
      >
        {Icon ? <Icon /> : <StyledSearchIcon aria-hidden="true" />}
      </StyledMagnifierButton>

      <StyledLabel id={labelId} htmlFor={uniqueId} $expanded={Boolean(isExpanded)}>
        {labelText}
      </StyledLabel>

      <StyledSearchInput
        id={uniqueId}
        ref={mergedRef}
        type={type}
        role={role}
        autoComplete={autoComplete}
        disabled={disabled}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        onChange={composeHandlers(onChange, handleChange)}
        onKeyDown={composeHandlers(onKeyDown, handleInputKeyDown)}
        $expanded={Boolean(isExpanded)}
        aria-hidden={onExpand && !isExpanded ? true : undefined}
      />

      <StyledClearButton
        type="button"
        aria-label={closeButtonLabelText}
        onClick={clearInput}
        disabled={disabled}
        $visible={hasContent && isExpanded}
      />
    </StyledRoot>
  )
})

Search.displayName = 'Search'

export default Search
