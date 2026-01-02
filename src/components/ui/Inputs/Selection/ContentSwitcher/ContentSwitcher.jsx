import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { StyledTabList } from './ContentSwitcher.styles'

const sizes = ['sm', 'md', 'lg']

function getNextIndex(key, current, total) {
  if (!total) return null
  if (key === 'ArrowRight') return (current + 1) % total
  if (key === 'ArrowLeft') return (current - 1 + total) % total
  return null
}

function isIconOnlyChild(child) {
  if (!isValidElement(child)) return false
  const t = child.type
  const name = typeof t === 'string' ? t : t?.displayName || t?.name
  return name === 'IconSwitch'
}

export default forwardRef(function ContentSwitcher(
  {
    children,
    className,
    light,
    lowContrast,
    selectedIndex: selectedIndexProp = 0,
    selectionMode = 'automatic',
    size = 'md',
    onChange,
    ...rest
  },
  ref
) {
  const [selectedIndex, setSelectedIndex] = useState(selectedIndexProp)
  const prevSelectedIndexRef = useRef(selectedIndexProp)

  const tabRefs = useRef([])

  const childrenArray = useMemo(() => Children.toArray(children).filter(Boolean), [children])

  useEffect(() => {
    if (prevSelectedIndexRef.current !== selectedIndexProp) {
      setSelectedIndex(selectedIndexProp)
      prevSelectedIndexRef.current = selectedIndexProp
    }
  }, [selectedIndexProp])

  const isIconOnly = useMemo(() => {
    if (!childrenArray.length) return false
    return childrenArray.every(isIconOnlyChild)
  }, [childrenArray])

  const focusTab = idx => {
    const el = tabRefs.current[idx]
    if (el && typeof el.focus === 'function') el.focus()
  }

  const fireOnChange = (evt, idx, extra = {}) => {
    const child = childrenArray[idx]
    if (!isValidElement(child)) return

    const payload = {
      ...extra,
      index: idx,
      name: child.props?.name,
      text: child.props?.text,
    }

    onChange?.(payload)
  }

  const handleKeyDown = (evt, idx) => {
    const key = evt.key

    if (key === 'ArrowRight' || key === 'ArrowLeft') {
      evt.preventDefault()
      const next = getNextIndex(key, idx, childrenArray.length)
      if (typeof next !== 'number') return

      focusTab(next)

      if (selectionMode !== 'manual') {
        setSelectedIndex(next)
        fireOnChange(evt, next, { key })
      }

      return
    }

    if (key === 'Enter' || key === ' ') {
      evt.preventDefault()
      if (selectedIndex !== idx) {
        setSelectedIndex(idx)
        focusTab(idx)
        fireOnChange(evt, idx, { key })
      }
    }
  }

  const handleClick = (evt, idx) => {
    if (selectedIndex === idx) return
    setSelectedIndex(idx)
    focusTab(idx)
    fireOnChange(evt, idx)
  }

  return (
    <StyledTabList
      ref={ref}
      className={className}
      role="tablist"
      $size={size}
      $lowContrast={!!lowContrast}
      $iconOnly={isIconOnly}
      $light={!!light}
      {...rest}
    >
      {childrenArray.map((child, idx) => {
        if (!isValidElement(child)) return null

        const selected = idx === selectedIndex

        return cloneElement(child, {
          index: idx,
          selected,
          size,
          ref: node => {
            if (node) tabRefs.current[idx] = node
            const childRef = child.ref
            if (typeof childRef === 'function') childRef(node)
          },
          role: child.props.role ?? 'tab',
          tabIndex: child.props.tabIndex ?? (selected ? 0 : -1),
          'aria-selected': child.props['aria-selected'] ?? (selected ? 'true' : 'false'),
          onClick: evt => {
            child.props.onClick?.(evt)
            handleClick(evt, idx)
          },
          onKeyDown: evt => {
            child.props.onKeyDown?.(evt)
            handleKeyDown(evt, idx)
          },
        })
      })}
    </StyledTabList>
  )
})

ContentSwitcher.displayName = 'ContentSwitcher'

ContentSwitcher.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  light: PropTypes.bool,
  lowContrast: PropTypes.bool,
  onChange: PropTypes.func,
  selectedIndex: PropTypes.number,
  selectionMode: PropTypes.oneOf(['automatic', 'manual']),
  size: PropTypes.oneOf(sizes),
}
