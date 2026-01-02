import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  StyledChevron,
  StyledDecoratorSlot,
  StyledDropdownButton,
  StyledDropdownItem,
  StyledDropdownList,
  StyledDropdownMenu,
  StyledFormHelper,
  StyledFormItem,
  StyledFormLabel,
  StyledSelectedLabel,
  StyledStatusText,
} from './Dropdown.styles'

function defaultItemToString(item) {
  if (item == null) return ''
  if (typeof item === 'string' || typeof item === 'number') return String(item)
  if (typeof item === 'object' && 'label' in item && item.label != null) return String(item.label)
  if (typeof item === 'object' && 'text' in item && item.text != null) return String(item.text)
  return ''
}

function isItemDisabled(item) {
  return Boolean(item && typeof item === 'object' && 'disabled' in item && item.disabled === true)
}

function findItemIndex(items, selectedItem) {
  if (!items || !items.length) return -1
  const idx = items.indexOf(selectedItem)
  if (idx !== -1) return idx

  // Shallow match for object items with `id`.
  if (selectedItem && typeof selectedItem === 'object' && 'id' in selectedItem) {
    return items.findIndex(it => it && typeof it === 'object' && 'id' in it && it.id === selectedItem.id)
  }

  return -1
}

const Dropdown = forwardRef(function Dropdown(
  {
    // Core API
    id,
    items,
    label,
    titleText = '',
    hideLabel,
    helperText = '',
    direction = 'bottom',
    disabled = false,
    readOnly,
    size,
    type = 'default',
    onChange,
    initialSelectedItem,
    selectedItem: controlledSelectedItem,
    itemToString = defaultItemToString,
    itemToElement: ItemToElement = null,
    renderSelectedItem,
    decorator,
    slug,
    autoAlign,
    downshiftProps,
    translateWithId,
    light,
    invalid,
    invalidText,
    warn,
    warnText,
    ariaLabel,
    className,
    ['aria-label']: ariaLabelProp,
    ...rest
  },
  forwardedRef
) {
  const buttonRef = useRef(null)
  const menuRef = useRef(null)
  const rootRef = useRef(null)

  const mergedButtonRef = useCallback(
    node => {
      buttonRef.current = node
      if (!forwardedRef) return
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else forwardedRef.current = node
    },
    [forwardedRef]
  )

  const [uncontrolledSelectedItem, setUncontrolledSelectedItem] = useState(
    controlledSelectedItem === undefined ? initialSelectedItem : undefined
  )
  const selectedItem = controlledSelectedItem !== undefined ? controlledSelectedItem : uncontrolledSelectedItem

  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(() => findItemIndex(items, selectedItem))

  const labelId = `${id}-label`
  const helperId = `${id}-helper`
  const invalidId = `${id}-invalid`
  const warnId = `${id}-warn`
  const menuId = `${id}-menu`

  const normalizedAriaLabel = ariaLabelProp || ariaLabel
  const describedBy = useMemo(() => {
    if (type === 'inline') return undefined
    if (invalid) return invalidId
    if (warn) return warnId
    if (helperText) return helperId
    return undefined
  }, [helperText, invalid, invalidId, type, warn, warnId])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  const openMenu = useCallback(() => {
    if (disabled || readOnly) return
    setIsOpen(true)
  }, [disabled, readOnly])

  const toggleMenu = useCallback(() => {
    if (disabled || readOnly) return
    setIsOpen(prev => !prev)
  }, [disabled, readOnly])

  const selectItem = useCallback(
    item => {
      if (isItemDisabled(item)) return
      if (controlledSelectedItem === undefined) {
        setUncontrolledSelectedItem(item)
      }
      onChange?.({ selectedItem: item ?? null })
      closeMenu()
      // return focus to the trigger
      queueMicrotask?.(() => buttonRef.current?.focus())
    },
    [closeMenu, controlledSelectedItem, onChange]
  )

  // Sync highlighted index when open/selection changes.
  useEffect(() => {
    if (!isOpen) return
    const idx = findItemIndex(items, selectedItem)
    setHighlightedIndex(idx >= 0 ? idx : 0)
  }, [isOpen, items, selectedItem])

  // Outside click closes the menu.
  useEffect(() => {
    if (!isOpen) return

    const onDocPointerDown = evt => {
      const root = rootRef.current
      if (!root) return
      if (root.contains(evt.target)) return
      closeMenu()
    }

    document.addEventListener('mousedown', onDocPointerDown)
    document.addEventListener('touchstart', onDocPointerDown)
    return () => {
      document.removeEventListener('mousedown', onDocPointerDown)
      document.removeEventListener('touchstart', onDocPointerDown)
    }
  }, [closeMenu, isOpen])

  const onButtonClick = useCallback(
    evt => {
      if (readOnly) {
        evt.preventDefault()
        buttonRef.current?.focus()
        return
      }
      toggleMenu()
    },
    [readOnly, toggleMenu]
  )

  const moveHighlight = useCallback(
    delta => {
      if (!items?.length) return
      let next = highlightedIndex
      for (let i = 0; i < items.length; i += 1) {
        next = (next + delta + items.length) % items.length
        if (!isItemDisabled(items[next])) break
      }
      setHighlightedIndex(next)
    },
    [highlightedIndex, items]
  )

  const onButtonKeyDown = useCallback(
    evt => {
      const key = evt.key

      if (readOnly) {
        const selectAccessKeys = ['ArrowDown', 'ArrowUp', ' ', 'Enter']
        if (selectAccessKeys.includes(key)) evt.preventDefault()
        return
      }

      if (key === 'Escape') {
        if (isOpen) {
          evt.preventDefault()
          closeMenu()
        }
        return
      }

      if (key === 'ArrowDown') {
        evt.preventDefault()
        if (!isOpen) {
          openMenu()
        } else {
          moveHighlight(1)
        }
        return
      }

      // For Dropdowns the arrow up key is only allowed if the Dropdown is open
      if (key === 'ArrowUp') {
        if (!isOpen) return
        evt.preventDefault()
        moveHighlight(-1)
        return
      }

      if (key === 'Home' && isOpen) {
        evt.preventDefault()
        setHighlightedIndex(0)
        return
      }

      if (key === 'End' && isOpen) {
        evt.preventDefault()
        setHighlightedIndex(items.length - 1)
        return
      }

      if (key === 'Enter' || key === ' ') {
        evt.preventDefault()
        if (!isOpen) {
          openMenu()
          return
        }
        const item = items?.[highlightedIndex]
        if (item !== undefined) selectItem(item)
        return
      }

      if (key === 'Tab') {
        closeMenu()
      }

      // Typeahead (basic)
      if (isOpen && key && key.length === 1 && /\S/.test(key)) {
        const lower = key.toLowerCase()
        const start = highlightedIndex >= 0 ? highlightedIndex + 1 : 0
        const ordered = [...items.slice(start), ...items.slice(0, start)]
        const found = ordered.find(it => {
          if (isItemDisabled(it)) return false
          return itemToString(it).toLowerCase().startsWith(lower)
        })
        if (found) {
          const idx = items.indexOf(found)
          if (idx >= 0) setHighlightedIndex(idx)
        }
      }
    },
    [closeMenu, highlightedIndex, isOpen, itemToString, items, moveHighlight, openMenu, readOnly, selectItem]
  )

  const onItemMouseEnter = useCallback(index => {
    setHighlightedIndex(index)
  }, [])

  const onItemClick = useCallback(
    item => {
      if (disabled || readOnly) return
      selectItem(item)
    },
    [disabled, readOnly, selectItem]
  )

  useEffect(() => {
    if (!isOpen) return
    const itemNode = menuRef.current?.querySelector(`[data-index="${highlightedIndex}"]`)
    if (itemNode && itemNode.scrollIntoView) {
      itemNode.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex, isOpen])

  const candidate = slug ?? decorator

  const selectedLabel = useMemo(() => {
    if (!selectedItem) return label
    if (renderSelectedItem) return renderSelectedItem(selectedItem)
    return itemToString(selectedItem)
  }, [itemToString, label, renderSelectedItem, selectedItem])

  return (
    <StyledFormItem ref={rootRef} className={className} {...rest}>
      {titleText ? (
        <StyledFormLabel htmlFor={id} id={labelId} $hidden={hideLabel}>
          {titleText}
        </StyledFormLabel>
      ) : null}

      <StyledDropdownMenu $type={type}>
        <StyledDropdownButton
          id={id}
          ref={mergedButtonRef}
          type="button"
          disabled={disabled}
          aria-disabled={readOnly ? true : undefined}
          aria-invalid={invalid ? true : undefined}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-labelledby={titleText ? labelId : undefined}
          aria-label={titleText ? normalizedAriaLabel : normalizedAriaLabel || String(titleText || '')}
          aria-describedby={describedBy}
          aria-activedescendant={
            isOpen && highlightedIndex >= 0 ? `${id}-item-${highlightedIndex}` : undefined
          }
          onClick={onButtonClick}
          onKeyDown={onButtonKeyDown}
          $size={size}
          $invalid={invalid}
          $warn={warn}
        >
          <StyledSelectedLabel>{selectedLabel}</StyledSelectedLabel>
          {candidate ? <StyledDecoratorSlot>{candidate}</StyledDecoratorSlot> : null}
          <StyledChevron $open={isOpen} />
        </StyledDropdownButton>

        {isOpen ? (
          <StyledDropdownList
            id={menuId}
            ref={menuRef}
            role="listbox"
            aria-label={normalizedAriaLabel || undefined}
            aria-labelledby={titleText ? labelId : undefined}
            $direction={direction}
          >
            {items?.map((item, index) => {
              const disabledItem = isItemDisabled(item)
              const selected = selectedItem === item
              const highlighted = highlightedIndex === index
              const title = itemToString(item)

              return (
                <StyledDropdownItem
                  key={typeof item === 'object' && item && 'id' in item ? String(item.id) : `${index}`}
                  id={`${id}-item-${index}`}
                  data-index={index}
                  role="option"
                  aria-selected={selected}
                  aria-disabled={disabledItem || undefined}
                  $selected={selected}
                  $highlighted={highlighted}
                  $disabled={disabledItem}
                  onMouseEnter={() => onItemMouseEnter(index)}
                  onMouseDown={evt => evt.preventDefault()}
                  onClick={() => onItemClick(item)}
                  title={title}
                >
                  {typeof item === 'object' && ItemToElement ? (
                    <ItemToElement {...item} />
                  ) : (
                    itemToString(item)
                  )}
                </StyledDropdownItem>
              )
            })}
          </StyledDropdownList>
        ) : null}
      </StyledDropdownMenu>

      {type !== 'inline' && !invalid && !warn && helperText ? (
        <StyledFormHelper id={helperId}>{helperText}</StyledFormHelper>
      ) : null}
      {type !== 'inline' && invalid ? (
        <StyledStatusText id={invalidId} $kind="invalid">
          {invalidText}
        </StyledStatusText>
      ) : null}
      {type !== 'inline' && !invalid && warn ? (
        <StyledStatusText id={warnId} $kind="warn">
          {warnText}
        </StyledStatusText>
      ) : null}
    </StyledFormItem>
  )
})

Dropdown.displayName = 'Dropdown'

export default Dropdown
