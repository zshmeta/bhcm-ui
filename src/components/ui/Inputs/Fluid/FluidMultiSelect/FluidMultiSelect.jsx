import React, { useMemo } from 'react'
import { StyledHelp, StyledLabel, StyledSelect, StyledWrap } from './FluidMultiSelect.styles'

export default function FluidMultiSelect({
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
  selectedItems,
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

  const selectedSet = new Set(selectedItems || [])

  return (
    <StyledWrap className={className}>
      {titleText ? <StyledLabel htmlFor={id}>{titleText}</StyledLabel> : null}
      <StyledSelect
        id={id}
        multiple
        disabled={disabled}
        aria-label={typeof label === 'string' ? label : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        value={items
          .map((_, idx) => idx)
          .filter(idx => selectedSet.has(items[idx]))
          .map(String)}
        onChange={evt => {
          const next = Array.from(evt.target.selectedOptions)
            .map(opt => Number(opt.value))
            .map(idx => items[idx])
          onChange?.({ selectedItems: next })
        }}
        {...rest}
      >
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

FluidMultiSelect.displayName = 'FluidMultiSelect'
