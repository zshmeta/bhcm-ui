import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import IconButton from '../../Buttons/IconButton'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

function classnames(base, obj) {
  const extra = obj
    ? Object.entries(obj)
        .filter(([, v]) => Boolean(v))
        .map(([k]) => k)
    : []
  return cx(base, ...extra)
}

function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max)
}

function useMatchMedia(query) {
  const get = () => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState(get)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const mql = window.matchMedia(query)
    const onChange = e => setMatches(e.matches)

    mql.addEventListener?.('change', onChange)
    mql.addListener?.(onChange)

    // Ensure sync
    setMatches(mql.matches)

    return () => {
      mql.removeEventListener?.('change', onChange)
      mql.removeListener?.(onChange)
    }
  }, [query])

  return matches
}

const defaultTranslations = {
  'carbon.pagination-nav.next': 'Next',
  'carbon.pagination-nav.previous': 'Previous',
  'carbon.pagination-nav.item': 'Page',
  'carbon.pagination-nav.active': 'Active',
  'carbon.pagination-nav.of': 'of',
}

function defaultTranslateWithId(messageId) {
  return defaultTranslations[messageId] || messageId
}

function usePrevious(value) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

function calculateCuts(page, totalItems, itemsDisplayedOnPage, splitPoint = null) {
  if (itemsDisplayedOnPage >= totalItems) {
    return { front: 0, back: 0 }
  }

  const split = splitPoint || Math.ceil(itemsDisplayedOnPage / 2) - 1

  let frontHidden = page + 1 - split
  let backHidden = totalItems - page - (itemsDisplayedOnPage - split) + 1

  if (frontHidden <= 1) {
    backHidden -= frontHidden <= 0 ? Math.abs(frontHidden) + 1 : 0
    frontHidden = 0
  }

  if (backHidden <= 1) {
    frontHidden -= backHidden <= 0 ? Math.abs(backHidden) + 1 : 0
    backHidden = 0
  }

  return { front: frontHidden, back: backHidden }
}

function CaretLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M9.75 12.5 5.25 8l4.5-4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CaretRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6.25 3.5 10.75 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function OverflowMenuHorizontal() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="4" cy="8" r="1.25" fill="currentColor" />
      <circle cx="8" cy="8" r="1.25" fill="currentColor" />
      <circle cx="12" cy="8" r="1.25" fill="currentColor" />
    </svg>
  )
}

function DirectionButton({ direction, label, disabled, onClick }) {
  const prefix = useClassPrefix()

  return (
    <li className={`${prefix}--pagination-nav__list-item`}>
      <IconButton
        disabled={disabled}
        kind="ghost"
        label={label}
        aria-label={label}
        onClick={onClick}
      >
        {direction === 'forward' ? <CaretRight /> : <CaretLeft />}
      </IconButton>
    </li>
  )
}

function PaginationItem({ page, isActive, onClick, translateWithId: t = defaultTranslateWithId }) {
  const prefix = useClassPrefix()
  const itemLabel = t('carbon.pagination-nav.item')

  return (
    <li className={`${prefix}--pagination-nav__list-item`}>
      <button
        type="button"
        className={classnames(`${prefix}--pagination-nav__page`, {
          [`${prefix}--pagination-nav__page--active`]: isActive,
        })}
        onClick={onClick}
        data-page={page}
        aria-current={isActive ? 'page' : undefined}
      >
        <span className={`${prefix}--pagination-nav__accessibility-label`}>
          {isActive ? `${t('carbon.pagination-nav.active')}, ${itemLabel}` : itemLabel}
        </span>
        {page}
      </button>
    </li>
  )
}

function PaginationOverflow({ fromIndex = Number.NaN, count = Number.NaN, onSelect, disableOverflow, translateWithId: t = defaultTranslateWithId }) {
  const prefix = useClassPrefix()

  if (disableOverflow === true && count > 1) {
    return (
      <li className={`${prefix}--pagination-nav__list-item`}>
        <div className={`${prefix}--pagination-nav__select`}>
          <select
            className={`${prefix}--pagination-nav__page ${prefix}--pagination-nav__page--select`}
            aria-label={`Select ${t('carbon.pagination-nav.item')} number`}
            disabled
          />
          <div className={`${prefix}--pagination-nav__select-icon-wrapper`}>
            <OverflowMenuHorizontal className={`${prefix}--pagination-nav__select-icon`} />
          </div>
        </div>
      </li>
    )
  }

  if (count > 1) {
    return (
      <li className={`${prefix}--pagination-nav__list-item`}>
        <div className={`${prefix}--pagination-nav__select`}>
          <select
            className={`${prefix}--pagination-nav__page ${prefix}--pagination-nav__page--select`}
            aria-label={`Select ${t('carbon.pagination-nav.item')} number`}
            onChange={e => {
              const index = Number(e.target.value)
              if (!Number.isNaN(index)) onSelect?.(index)
            }}
          >
            <option value="" hidden />
            {[...Array(count)].map((_, i) => (
              <option
                value={(fromIndex + i).toString()}
                data-page={fromIndex + i + 1}
                key={`overflow-${fromIndex + i}`}
              >
                {fromIndex + i + 1}
              </option>
            ))}
          </select>
          <div className={`${prefix}--pagination-nav__select-icon-wrapper`}>
            <OverflowMenuHorizontal className={`${prefix}--pagination-nav__select-icon`} />
          </div>
        </div>
      </li>
    )
  }

  if (count === 1) {
    return (
      <PaginationItem
        page={fromIndex + 1}
        translateWithId={t}
        onClick={() => {
          onSelect?.(fromIndex)
        }}
      />
    )
  }

  return null
}

const PaginationNav = forwardRef(function PaginationNav(
  {
    className,
    onChange = () => {},
    totalItems = Number.NaN,
    disableOverflow,
    itemsShown = 10,
    page = 0,
    loop = false,
    size = 'lg',
    translateWithId: t = defaultTranslateWithId,
    ...rest
  },
  ref
) {
  // Carbon sm breakpoint: 672px.
  const isSm = useMatchMedia('(max-width: 672px)')

  let numberOfPages
  switch (size) {
    case 'md':
      numberOfPages = itemsShown === 4 ? itemsShown : 5
      break
    case 'sm':
      numberOfPages = clamp(itemsShown, 4, 7)
      break
    default:
      numberOfPages = 4
      break
  }

  const [currentPage, setCurrentPage] = useState(page)
  const [itemsDisplayedOnPage, setItemsDisplayedOnPage] = useState(
    itemsShown >= 4 && !isSm ? itemsShown : numberOfPages
  )

  const [cuts, setCuts] = useState(() =>
    calculateCuts(currentPage, totalItems, itemsDisplayedOnPage)
  )

  const prevPage = usePrevious(currentPage)
  const prefix = useClassPrefix()
  const [isOverflowDisabled, setIsOverFlowDisabled] = useState(disableOverflow)

  function jumpToItem(index) {
    if (index >= 0 && index < totalItems) {
      setCurrentPage(index)
      onChange(index)
    }
  }

  function jumpToNext() {
    const nextIndex = currentPage + 1
    if (nextIndex >= totalItems) {
      if (loop) jumpToItem(0)
    } else {
      jumpToItem(nextIndex)
    }
  }

  function jumpToPrevious() {
    const previousIndex = currentPage - 1
    if (previousIndex < 0) {
      if (loop) jumpToItem(totalItems - 1)
    } else {
      jumpToItem(previousIndex)
    }
  }

  function pageWouldBeHidden(p) {
    const startOffset = itemsDisplayedOnPage <= 4 && p > 1 ? 0 : 1

    const wouldBeHiddenInFront =
      (p >= startOffset && p <= cuts.front) || p === 0
    const wouldBeHiddenInBack =
      p >= totalItems - cuts.back - 1 && p <= totalItems - 2

    return wouldBeHiddenInFront || wouldBeHiddenInBack
  }

  useEffect(() => {
    setCurrentPage(page)
  }, [page])

  useEffect(() => {
    const itemsToBeShown = itemsShown >= 4 && !isSm ? itemsShown : numberOfPages
    setItemsDisplayedOnPage(Math.max(itemsToBeShown, 4))
    setCuts(calculateCuts(currentPage, totalItems, Math.max(itemsToBeShown, 4)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemsShown, isSm, size])

  useEffect(() => {
    if (pageWouldBeHidden(currentPage)) {
      const delta = currentPage - (prevPage || 0)

      if (delta > 0) {
        const splitPoint = itemsDisplayedOnPage - 3
        setCuts(
          calculateCuts(currentPage, totalItems, itemsDisplayedOnPage, splitPoint)
        )
      } else {
        const splitPoint = itemsDisplayedOnPage > 4 ? 2 : 1
        setCuts(
          calculateCuts(currentPage, totalItems, itemsDisplayedOnPage, splitPoint)
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  useEffect(() => {
    setIsOverFlowDisabled(disableOverflow)
  }, [disableOverflow])

  const classNames = classnames(`${prefix}--pagination-nav`, {
    [className]: Boolean(className),
    [`${prefix}--layout--size-${size}`]: size,
  })

  const backwardButtonDisabled = !loop && currentPage === 0
  const forwardButtonDisabled = !loop && currentPage === totalItems - 1

  const startOffset = itemsDisplayedOnPage <= 4 && currentPage > 1 ? 0 : 1

  // Render pages between overflows
  const middlePages = useMemo(() => {
    const pages = []
    const start = cuts.front + startOffset
    const end = totalItems - cuts.back - 1

    for (let i = start; i < end; i++) {
      // Skip first and last, those are handled separately
      if (i <= 0 || i >= totalItems - 1) continue
      pages.push(i)
    }

    return pages
  }, [cuts.back, cuts.front, startOffset, totalItems])

  return (
    <nav className={classNames} ref={ref} {...rest}>
      <ul className={`${prefix}--pagination-nav__list`}>
        <DirectionButton
          direction="backward"
          label={t('carbon.pagination-nav.previous')}
          disabled={backwardButtonDisabled}
          onClick={jumpToPrevious}
        />

        {(itemsDisplayedOnPage >= 5 || (itemsDisplayedOnPage <= 4 && currentPage <= 1)) && (
          <PaginationItem
            page={1}
            translateWithId={t}
            isActive={currentPage === 0}
            onClick={() => jumpToItem(0)}
          />
        )}

        <PaginationOverflow
          fromIndex={startOffset}
          count={cuts.front}
          onSelect={jumpToItem}
          disableOverflow={isOverflowDisabled}
          translateWithId={t}
        />

        {middlePages
          .filter(item => item >= 0 && item < totalItems)
          .map(item => (
            <PaginationItem
              key={item}
              page={item + 1}
              translateWithId={t}
              isActive={currentPage === item}
              onClick={() => jumpToItem(item)}
            />
          ))}

        <PaginationOverflow
          fromIndex={totalItems - cuts.back - 1}
          count={cuts.back}
          onSelect={jumpToItem}
          disableOverflow={isOverflowDisabled}
          translateWithId={t}
        />

        {totalItems > 1 && (
          <PaginationItem
            page={totalItems}
            translateWithId={t}
            isActive={currentPage === totalItems - 1}
            onClick={() => jumpToItem(totalItems - 1)}
          />
        )}

        <DirectionButton
          direction="forward"
          label={t('carbon.pagination-nav.next')}
          disabled={forwardButtonDisabled}
          onClick={jumpToNext}
        />
      </ul>
    </nav>
  )
})

PaginationNav.displayName = 'PaginationNav'

PaginationNav.propTypes = {
  className: PropTypes.string,
  disableOverflow: PropTypes.bool,
  itemsShown: PropTypes.number,
  loop: PropTypes.bool,
  onChange: PropTypes.func,
  page: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  totalItems: PropTypes.number,
  translateWithId: PropTypes.func,
}

export default PaginationNav
