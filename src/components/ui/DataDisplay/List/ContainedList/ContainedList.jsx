import React, { Children, forwardRef, isValidElement, useId, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  StyledActionSlot,
  StyledHeader,
  StyledItemAction,
  StyledItemButton,
  StyledItemIcon,
  StyledItemMain,
  StyledItemRow,
  StyledItemShell,
  StyledItemText,
  StyledLabel,
  StyledList,
  StyledRoot,
  StyledSearchRow,
  StyledStickyTop,
} from './ContainedList.styles'

const kinds = ['on-page', 'disclosed']
const sizes = ['sm', 'md', 'lg', 'xl']
const SEARCH_LIKE = new Set(['Search', 'ExpandableSearch'])

function getDisplayName(type) {
  if (!type) return ''
  if (typeof type === 'string') return type
  return type.displayName || type.name || ''
}

function isSearchLikeElement(node) {
  if (!isValidElement(node)) return false
  const name = getDisplayName(node.type)
  return SEARCH_LIKE.has(name)
}

export function ContainedListItem({
  action,
  children,
  className,
  disabled = false,
  onClick,
  renderIcon: RenderIcon,
  ...rest
}) {
  const isClickable = typeof onClick === 'function'

  const main = (
    <StyledItemMain>
      {RenderIcon ? (
        <StyledItemIcon aria-hidden="true">
          <RenderIcon />
        </StyledItemIcon>
      ) : null}
      <StyledItemText>{children}</StyledItemText>
    </StyledItemMain>
  )

  return (
    <StyledItemShell
      className={className}
      $isInset={rest.$isInset}
      $clickable={isClickable}
      $disabled={disabled}
      {...rest}
    >
      <StyledItemRow>
        {isClickable ? (
          <StyledItemButton
            type="button"
            disabled={disabled}
            aria-disabled={disabled ? 'true' : undefined}
            onClick={evt => {
              if (disabled) return
              onClick?.(evt)
            }}
          >
            {main}
          </StyledItemButton>
        ) : (
          main
        )}

        {action ? <StyledItemAction>{action}</StyledItemAction> : null}
      </StyledItemRow>
    </StyledItemShell>
  )
}

ContainedListItem.displayName = 'ContainedListItem'

ContainedListItem.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
}

const ContainedList = forwardRef(function ContainedList(
  {
    action,
    children,
    className,
    isInset = false,
    kind = 'on-page',
    label,
    size,
    ...rest
  },
  ref
) {
  const labelReactId = useId()
  const labelId = `${labelReactId}__contained-list-label`

  const isActionSearch = isSearchLikeElement(action)

  const { persistentSearch, listChildren } = useMemo(() => {
    const all = Children.toArray(children)

    if (isActionSearch) {
      return {
        persistentSearch: null,
        listChildren: all.filter(child => !isSearchLikeElement(child)),
      }
    }

    if (all.length > 0 && isSearchLikeElement(all[0])) {
      return {
        persistentSearch: all[0],
        listChildren: all.slice(1),
      }
    }

    return { persistentSearch: null, listChildren: all }
  }, [children, isActionSearch])

  const showStickyTop = !!label || !!action || !!persistentSearch

  return (
    <StyledRoot
      ref={ref}
      className={className}
      $kind={kind}
      $size={size}
      data-kind={kind}
      data-size={size}
      {...rest}
    >
      {showStickyTop ? (
        <StyledStickyTop>
          {label || action ? (
            <StyledHeader>
              {label ? <StyledLabel id={labelId}>{label}</StyledLabel> : <div />}
              {action ? <StyledActionSlot>{action}</StyledActionSlot> : null}
            </StyledHeader>
          ) : null}

          {persistentSearch ? <StyledSearchRow>{persistentSearch}</StyledSearchRow> : null}
        </StyledStickyTop>
      ) : null}

      {listChildren.length ? (
        // Webkit can drop implicit list semantics when list-style is removed
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <StyledList role="list" aria-labelledby={label ? labelId : undefined}>
          {listChildren.map((child, idx) => {
            if (!isValidElement(child)) return child

            // If a consumer uses our ContainedListItem, we can inject inset flag
            // without changing their code.
            if (child.type?.displayName === 'ContainedListItem') {
              return React.cloneElement(child, {
                key: child.key ?? idx,
                $isInset: isInset,
              })
            }

            return React.cloneElement(child, { key: child.key ?? idx })
          })}
        </StyledList>
      ) : null}
    </StyledRoot>
  )
})

ContainedList.displayName = 'ContainedList'

ContainedList.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  isInset: PropTypes.bool,
  kind: PropTypes.oneOf(kinds),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  size: PropTypes.oneOf(sizes),
}

ContainedList.ContainedListItem = ContainedListItem

export default ContainedList
