import React, { useMemo } from 'react'
import { StyledHelp, StyledLabel, StyledSelect, StyledWrap } from './FluidDropdown.styles'

export default function FluidDropdown({
  id,
  className,
  titleText,
  label,
  items = [],
  itemToString,
  disabled = false,
  invalid = false,
  invalidText,
  warn = false,
  warnText,
  selectedItem,
  onChange,
  ...rest
}) {
  const messageId = id ? `${id}__message` : undefined
  const describedBy = (invalid || warn) && messageId ? messageId : rest['aria-describedby']

  const getText = useMemo(() => {
    return itemToString
      ? itemToString
      : item => {
          if (item == null) return ''
          if (typeof item === 'string') return item
          if (typeof item === 'number') return String(item)
          if (typeof item === 'object' && 'text' in item) return String(item.text)
          return String(item)
        }
  }, [itemToString])

  const selectedIndex = selectedItem ? items.indexOf(selectedItem) : -1

  return (
    <StyledWrap className={className}>
      {titleText ? <StyledLabel htmlFor={id}>{titleText}</StyledLabel> : null}
      <StyledSelect
        id={id}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        value={selectedIndex >= 0 ? String(selectedIndex) : ''}
        onChange={evt => {
          const idx = evt.target.value === '' ? -1 : Number(evt.target.value)
          const next = idx >= 0 ? items[idx] : null
          onChange?.({ selectedItem: next })
        }}
        {...rest}
      >
        <option value="" disabled>
          {label}
        </option>
        {items.map((item, index) => (
          <option key={index} value={String(index)} disabled={!!(item && item.disabled)}>
            {getText(item)}
          </option>
        ))}
      </StyledSelect>
      {invalid ? (
        <StyledHelp id={messageId} $variant="invalid">
          {invalidText}
        </StyledHelp>
      ) : warn ? (
        <StyledHelp id={messageId} $variant="warn">
          {warnText}
        </StyledHelp>
      ) : null}
    </StyledWrap>
  )
}

FluidDropdown.displayName = 'FluidDropdown'
