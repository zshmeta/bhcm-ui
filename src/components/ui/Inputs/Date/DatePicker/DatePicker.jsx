import React, { Children, cloneElement, isValidElement, useMemo, useState } from 'react'
import { StyledRoot, StyledInputsRow } from './DatePicker.styles'

const toISODateString = value => {
  if (!value) return ''
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10)
  }
  if (typeof value === 'string') {
    return value
  }
  return String(value)
}

const normalizeValueProp = (datePickerType, value) => {
  if (datePickerType === 'range') {
    if (!Array.isArray(value)) return ['', '']
    return [toISODateString(value[0]), toISODateString(value[1])]
  }
  return toISODateString(value)
}

const buildSelectedDates = (datePickerType, nextValue) => {
  const toDate = v => {
    if (!v) return null
    const d = new Date(v)
    return Number.isNaN(d.valueOf()) ? null : d
  }

  if (datePickerType === 'range') {
    const [a, b] = Array.isArray(nextValue) ? nextValue : ['', '']
    return [toDate(a), toDate(b)].filter(Boolean)
  }

  const d = toDate(nextValue)
  return d ? [d] : []
}

/**
 * DatePicker
 *
 * Simplified Carbon-compatible wrapper around one or two DatePickerInput children.
 * Provides basic controlled/uncontrolled value handling and calls `onChange`
 * with a flatpickr-like signature: (selectedDates, dateStr, instance).
 */
export default function DatePicker({
  children,
  className,
  datePickerType = 'single',
  dateFormat = 'Y-m-d',
  value,
  onChange,
  readOnly = false,
  minDate,
  maxDate,
  light = false,
  short = false,
  invalid,
  warn,
  invalidText,
  warnText,
  ...rest
}) {
  const isControlled = value !== undefined
  const initial = useMemo(() => normalizeValueProp(datePickerType, value), [])
  const [uncontrolledValue, setUncontrolledValue] = useState(initial)
  const resolvedValue = isControlled ? normalizeValueProp(datePickerType, value) : uncontrolledValue

  const inputs = Children.toArray(children).filter(Boolean)
  const isRange = datePickerType === 'range'

  const normalizeReadOnly = idx => {
    if (Array.isArray(readOnly)) return Boolean(readOnly[idx])
    return Boolean(readOnly)
  }

  const typeFor = childProps => {
    if (childProps?.type) return childProps.type
    if (datePickerType === 'simple') return 'text'
    // Prefer native date input when using ISO-like format; otherwise keep text.
    if (typeof dateFormat === 'string' && (dateFormat === 'Y-m-d' || dateFormat === 'Y-m-d\TH:i')) return 'date'
    return 'date'
  }

  const setNextValue = next => {
    if (!isControlled) setUncontrolledValue(next)

    if (typeof onChange === 'function') {
      const selectedDates = buildSelectedDates(datePickerType, next)
      const dateStr = isRange && Array.isArray(next) ? next.filter(Boolean).join(' to ') : String(next || '')
      onChange(selectedDates, dateStr, null)
    }
  }

  const decorateChild = (child, idx) => {
    if (!isValidElement(child)) return child

    const childProps = child.props || {}
    const readOnlyForChild = normalizeReadOnly(idx)
    const nextType = typeFor(childProps)

    const nextValue = isRange ? resolvedValue[idx] : resolvedValue

    const nextOnChange = event => {
      const next = event?.target?.value ?? ''
      if (isRange) {
        const nextRange = Array.isArray(resolvedValue) ? [...resolvedValue] : ['', '']
        nextRange[idx] = next
        setNextValue(nextRange)
      } else {
        setNextValue(next)
      }

      if (typeof childProps.onChange === 'function') {
        childProps.onChange(event)
      }
    }

    // Best-effort min/max for native date input
    const min = nextType === 'date' ? toISODateString(minDate) : undefined
    const max = nextType === 'date' ? toISODateString(maxDate) : undefined

    return cloneElement(child, {
      ...childProps,
      datePickerType,
      type: nextType,
      value: nextValue,
      readOnly: readOnlyForChild,
      min: min || childProps.min,
      max: max || childProps.max,
      light,
      short,
      invalid,
      invalidText,
      warn,
      warnText,
      onChange: nextOnChange,
    })
  }

  const renderedChildren = inputs.map((child, idx) => decorateChild(child, idx)).filter(Boolean)

  return (
    <StyledRoot className={className} $light={light} $short={short} {...rest}>
      <StyledInputsRow $isRange={isRange}>{renderedChildren}</StyledInputsRow>
    </StyledRoot>
  )
}

DatePicker.displayName = 'DatePicker'
