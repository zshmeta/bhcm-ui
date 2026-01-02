import React, { cloneElement, forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { AILabel } from '../../../Feedback/AILabel'
import {
  Control,
  DecoratorSlot,
  Field,
  Helper,
  Icon,
  Input,
  Item,
  ItemMarker,
  ItemText,
  Label,
  LabelRow,
  Message,
  Menu,
  Root,
  ToggleButton,
  Validation,
  ValidationRow,
} from './ComboBox.styles'

function safeReactId(id) {
  return String(id || '').replace(/:/g, '')
}

function defaultItemToString(item) {
  if (item == null) return ''
  if (typeof item === 'string') return item
  if (typeof item === 'number') return String(item)
  if (typeof item === 'object') return String(item.text ?? item.label ?? '')
  return String(item)
}

function isItemDisabled(item) {
  return Boolean(item && typeof item === 'object' && 'disabled' in item && item.disabled)
}

function isAILabelElement(node) {
  if (!React.isValidElement(node)) return false
  if (node.type === AILabel) return true
  return node.type?.displayName === 'AILabel'
}

function ErrorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 4.5v4.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 11.9h.01" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M8 1.5l6 11H2l6-11z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M8 5v3.8" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 11.9h.01" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M3.2 8.4l3.0 3.0 6.6-7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

function findNextEnabledIndex(items, startIndex, delta) {
  if (!items.length) return -1
  let idx = startIndex

  for (let step = 0; step < items.length; step++) {
    idx = (idx + delta + items.length) % items.length
    if (!isItemDisabled(items[idx])) return idx
  }

  return -1
}

const ComboBox = forwardRef(function ComboBox(
  {
    id,
    items,
    className,
    titleText,
    hideLabel,
    decorator,
    slug,
    helperText,
    invalid,
    invalidText,
    warn,
    warnText,
    disabled,
    readOnly,
    placeholder,
    size = 'md',
    itemToString = defaultItemToString,
    itemToElement,
    shouldFilterItem,
    allowCustomValue,
    typeahead,
    selectedItem,
    initialSelectedItem,
    onChange,
    onInputChange,
    onToggleClick,
    ['aria-label']: ariaLabel,
    ariaLabel: deprecatedAriaLabel,
    ...rest
  },
  ref
) {
  const reactId = useId()
  const listboxId = `${id}-listbox`
  const rootRef = useRef(null)
  const inputRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [uncontrolledSelectedItem, setUncontrolledSelectedItem] = useState(
    typeof selectedItem === 'undefined' ? initialSelectedItem ?? null : null
  )

  const controlled = typeof selectedItem !== 'undefined'
  const resolvedSelectedItem = controlled ? selectedItem : uncontrolledSelectedItem

  const [inputValue, setInputValue] = useState(() => {
    if (resolvedSelectedItem != null) return itemToString(resolvedSelectedItem)
    if (initialSelectedItem != null) return itemToString(initialSelectedItem)
    return ''
  })

  const prevControlledSelected = useRef(resolvedSelectedItem)

  useEffect(() => {
    if (!controlled) return
    if (prevControlledSelected.current !== resolvedSelectedItem) {
      setInputValue(resolvedSelectedItem ? itemToString(resolvedSelectedItem) : '')
      prevControlledSelected.current = resolvedSelectedItem
    }
  }, [controlled, itemToString, resolvedSelectedItem])

  const showWarning = !readOnly && !invalid && warn
  const showHelper = !invalid && !warn

  const helperId = helperText ? `combobox-helper-text-${safeReactId(reactId)}` : undefined
  const invalidId = invalid && !readOnly ? `combobox-invalid-text-${safeReactId(reactId)}` : undefined
  const warnId = showWarning ? `combobox-warn-text-${safeReactId(reactId)}` : undefined

  const describedBy = useMemo(() => {
    const ids = []
    if (showHelper && helperId) ids.push(helperId)
    if (invalidId) ids.push(invalidId)
    if (warnId) ids.push(warnId)
    return ids.length ? ids.join(' ') : undefined
  }, [helperId, invalidId, showHelper, warnId])

  const filterFn = useMemo(() => {
    if (typeof shouldFilterItem === 'function') return shouldFilterItem

    return ({ item, inputValue: v }) => {
      const s = itemToString(item)
      if (!v) return true
      return s.toLowerCase().includes(String(v).toLowerCase())
    }
  }, [itemToString, shouldFilterItem])

  const filteredItems = useMemo(() => {
    const v = inputValue
    return items.filter(item => filterFn({ item, inputValue: v }))
  }, [filterFn, inputValue, items])

  useEffect(() => {
    if (!typeahead) return
    if (!inputValue) {
      setHighlightedIndex(-1)
      return
    }

    const search = inputValue.toLowerCase()
    const idx = filteredItems.findIndex(it => !isItemDisabled(it) && itemToString(it).toLowerCase().startsWith(search))
    setHighlightedIndex(idx)
  }, [filteredItems, inputValue, itemToString, typeahead])

  const candidate = slug ?? decorator
  const normalizedDecorator = useMemo(() => {
    if (!candidate) return null
    if (!isAILabelElement(candidate)) return candidate

    const nextSize = candidate.props?.kind === 'inline' ? 'md' : 'mini'
    return cloneElement(candidate, { size: nextSize })
  }, [candidate])

  useEffect(() => {
    function onDocMouseDown(e) {
      if (!isOpen) return
      if (!rootRef.current) return
      if (rootRef.current.contains(e.target)) return
      setIsOpen(false)
      setHighlightedIndex(-1)
    }

    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [isOpen])

  const resolvedA11yLabel = deprecatedAriaLabel || ariaLabel
  if (!titleText && !resolvedA11yLabel) {
    // eslint-disable-next-line no-console
    console.error('Warning [ComboBox]: Provide either `titleText` or `aria-label` for accessibility.')
  }

  const selectItem = (item, nextInputValue) => {
    if (!controlled) setUncontrolledSelectedItem(item)

    const nv = nextInputValue ?? (item ? itemToString(item) : '')
    setInputValue(nv)

    onChange?.({ selectedItem: item, inputValue: nv })
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  const mergedRef = node => {
    rootRef.current = node
    if (!ref) return
    if (typeof ref === 'function') ref(node)
    else ref.current = node
  }

  const activeDescendantId =
    isOpen && highlightedIndex >= 0 ? `${id}-option-${highlightedIndex}` : undefined

  return (
    <Root className={className} ref={mergedRef}>
      {titleText || decorator || slug ? (
        <LabelRow>
          {titleText ? (
            <Label htmlFor={id} $hide={!!hideLabel}>
              {titleText}
            </Label>
          ) : (
            <Label as="span" $hide={!!hideLabel}>
              {resolvedA11yLabel || ''}
            </Label>
          )}
          {candidate ? <DecoratorSlot>{normalizedDecorator}</DecoratorSlot> : null}
        </LabelRow>
      ) : null}

      <Control>
        <Field $size={size} $invalid={!!invalid} $warn={!!warn} $disabled={!!disabled}>
          <Input
            {...rest}
            id={id}
            ref={node => {
              inputRef.current = node
            }}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            value={inputValue}
            role="combobox"
            aria-autocomplete={typeahead ? 'both' : 'list'}
            aria-controls={listboxId}
            aria-expanded={isOpen}
            aria-activedescendant={activeDescendantId}
            aria-describedby={describedBy}
            aria-label={resolvedA11yLabel}
            onFocus={() => {
              if (disabled) return
            }}
            onClick={() => {
              if (disabled) return
              setIsOpen(true)
            }}
            onChange={evt => {
              const v = evt.target.value
              setInputValue(v)
              onInputChange?.(v)
              if (!isOpen) setIsOpen(true)
              if (!typeahead) setHighlightedIndex(-1)
            }}
            onKeyDown={evt => {
              if (disabled) return

              if (evt.key === 'ArrowDown') {
                evt.preventDefault()
                if (!isOpen) setIsOpen(true)
                setHighlightedIndex(idx => {
                  const start = idx < 0 ? -1 : idx
                  return findNextEnabledIndex(filteredItems, start, +1)
                })
              }

              if (evt.key === 'ArrowUp') {
                evt.preventDefault()
                if (!isOpen) setIsOpen(true)
                setHighlightedIndex(idx => {
                  const start = idx < 0 ? filteredItems.length : idx
                  return findNextEnabledIndex(filteredItems, start, -1)
                })
              }

              if (evt.key === 'Enter') {
                if (isOpen && highlightedIndex >= 0) {
                  evt.preventDefault()
                  const it = filteredItems[highlightedIndex]
                  if (it && !isItemDisabled(it) && !readOnly) {
                    selectItem(it)
                  }
                } else {
                  setIsOpen(true)
                }
              }

              if (evt.key === 'Escape') {
                if (isOpen) {
                  evt.preventDefault()
                  setIsOpen(false)
                  setHighlightedIndex(-1)
                }
              }

              if (evt.key === 'Tab') {
                setIsOpen(false)
                setHighlightedIndex(-1)
              }
            }}
            onBlur={() => {
              if (!allowCustomValue) return
              if (readOnly || disabled) return

              const v = inputValue
              if (!v) return

              const matches = items.some(it => itemToString(it) === v)
              if (!matches) {
                selectItem(v, v)
              }
            }}
          />

          <ToggleButton
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            disabled={disabled}
            onClick={evt => {
              evt.preventDefault()
              if (disabled) return
              onToggleClick?.(evt)
              setIsOpen(v => !v)
              setHighlightedIndex(-1)
              if (!isOpen) {
                inputRef.current?.focus()
              }
            }}
          >
            <ChevronDownIcon />
          </ToggleButton>
        </Field>

        {isOpen ? (
          <Menu role="listbox" id={listboxId} aria-label={resolvedA11yLabel || titleText || 'ComboBox'}>
            {filteredItems.length ? (
              filteredItems.map((item, index) => {
                const text = itemToString(item)
                const selected = resolvedSelectedItem != null && itemToString(resolvedSelectedItem) === text
                const disabledItem = isItemDisabled(item)
                const highlighted = index === highlightedIndex

                return (
                  <Item
                    key={item?.id ?? `${text}-${index}`}
                    id={`${id}-option-${index}`}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={disabledItem}
                    $disabled={disabledItem}
                    $highlighted={highlighted}
                    onMouseMove={() => {
                      if (disabledItem) return
                      setHighlightedIndex(index)
                    }}
                    onMouseDown={evt => {
                      // keep focus on input
                      evt.preventDefault()
                    }}
                    onClick={() => {
                      if (disabledItem || readOnly) return
                      selectItem(item)
                    }}
                  >
                    <ItemText title={text}>
                      {itemToElement ? itemToElement(item) : text}
                    </ItemText>
                    {selected ? (
                      <ItemMarker aria-hidden="true">
                        <CheckIcon />
                      </ItemMarker>
                    ) : null}
                  </Item>
                )
              })
            ) : (
              <Item role="option" aria-disabled="true" $disabled>
                <ItemText>No results</ItemText>
              </Item>
            )}
          </Menu>
        ) : null}
      </Control>

      <Validation>
        {!readOnly && invalid ? (
          <ValidationRow $variant="invalid">
            <Icon aria-hidden="true">
              <ErrorIcon />
            </Icon>
            <Message id={invalidId}>{invalidText}</Message>
          </ValidationRow>
        ) : null}

        {showWarning ? (
          <ValidationRow $variant="warn">
            <Icon aria-hidden="true">
              <WarningIcon />
            </Icon>
            <Message id={warnId}>{warnText}</Message>
          </ValidationRow>
        ) : null}

        {showHelper && helperText ? <Helper id={helperId}>{helperText}</Helper> : null}
      </Validation>
    </Root>
  )
})

ComboBox.displayName = 'ComboBox'

ComboBox.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  className: PropTypes.string,
  titleText: PropTypes.node,
  hideLabel: PropTypes.bool,
  decorator: PropTypes.node,
  slug: PropTypes.node,
  helperText: PropTypes.node,
  invalid: PropTypes.bool,
  invalidText: PropTypes.node,
  warn: PropTypes.bool,
  warnText: PropTypes.node,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  itemToString: PropTypes.func,
  itemToElement: PropTypes.func,
  shouldFilterItem: PropTypes.func,
  allowCustomValue: PropTypes.bool,
  typeahead: PropTypes.bool,
  selectedItem: PropTypes.any,
  initialSelectedItem: PropTypes.any,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  onToggleClick: PropTypes.func,
  ['aria-label']: PropTypes.string,
  ariaLabel: PropTypes.string,
}

export default ComboBox
