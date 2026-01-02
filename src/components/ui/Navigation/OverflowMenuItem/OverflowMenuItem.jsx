import React, { forwardRef } from 'react'
import { StyledAction, StyledItem, StyledLink } from './OverflowMenuItem.styles'

const OverflowMenuItem = forwardRef(function OverflowMenuItem(
  {
    className,
    closeMenu,
    disabled = false,
    handleOverflowMenuItemFocus,
    hasDivider = false,
    href,
    isDelete = false,
    index,
    itemText = 'Provide itemText',
    onClick,
    onKeyDown,
    requireTitle,
    title,
    wrapperClassName,
    ...rest
  },
  ref
) {
  function setTabFocus(evt) {
    if (evt.key === 'ArrowDown') {
      handleOverflowMenuItemFocus?.({ currentIndex: index, direction: 1 })
    }
    if (evt.key === 'ArrowUp') {
      handleOverflowMenuItemFocus?.({ currentIndex: index, direction: -1 })
    }
  }

  function handleClick(evt) {
    onClick?.(evt)
    closeMenu?.()
  }

  const computedTitle = requireTitle ? title || (typeof itemText === 'string' ? itemText : undefined) : undefined
  const content = typeof itemText === 'string' ? <span>{itemText}</span> : itemText

  return (
    <StyledItem className={wrapperClassName} $hasDivider={!!hasDivider} role="none">
      {href ? (
        <StyledLink
          ref={ref}
          className={className}
          href={href}
          role="menuitem"
          aria-disabled={disabled}
          tabIndex={-1}
          onKeyDown={evt => {
            setTabFocus(evt)
            onKeyDown?.(evt)
          }}
          onClick={evt => {
            if (disabled) {
              evt.preventDefault()
              return
            }
            handleClick(evt)
          }}
          title={computedTitle}
          $danger={!!isDelete}
          {...rest}
        >
          {content}
        </StyledLink>
      ) : (
        <StyledAction
          type="button"
          ref={ref}
          className={className}
          disabled={disabled}
          role="menuitem"
          tabIndex={-1}
          onClick={handleClick}
          onKeyDown={evt => {
            setTabFocus(evt)
            onKeyDown?.(evt)
          }}
          title={computedTitle}
          $danger={!!isDelete}
          {...rest}
        >
          {content}
        </StyledAction>
      )}
    </StyledItem>
  )
})

OverflowMenuItem.displayName = 'OverflowMenuItem'

export default OverflowMenuItem
