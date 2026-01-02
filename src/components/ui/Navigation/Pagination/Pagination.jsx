import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import Select from '../../Inputs/Selection/Select'
import SelectItem from '../../Inputs/Selection/SelectItem'
import IconButton from '../../Buttons/IconButton'

function cx(...xs) {
  return xs
    .flatMap(x => {
      if (!x) return []
      if (typeof x === 'string') return [x]
      if (typeof x === 'object') {
        return Object.entries(x)
          .filter(([, v]) => Boolean(v))
          .map(([k]) => k)
      }
      return []
    })
    .join(' ')
}

function mapPageSizesToObject(sizes) {
  if (!Array.isArray(sizes) || sizes.length === 0) return []
  return typeof sizes[0] === 'object' && sizes[0] !== null
    ? sizes
    : sizes.map(size => ({ text: size, value: size }))
}

function arePageSizesEqual(a, b) {
  if (a === b) return true
  if (!Array.isArray(a) || !Array.isArray(b)) return false
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    const av = a[i]
    const bv = b[i]
    if (typeof av === 'object' && av !== null) {
      if (!bv || typeof bv !== 'object') return false
      if (av.value !== bv.value || av.text !== bv.text) return false
    } else {
      if (av !== bv) return false
    }
  }
  return true
}

function renderSelectItems(total) {
  const itemArr = []
  let counter = 1
  while (counter <= total) {
    itemArr.push(
      <SelectItem key={counter} value={counter} text={String(counter)} />
    )
    counter++
  }
  return itemArr
}

function getPageSize(pageSizes, pageSize) {
  if (pageSize) {
    const hasSize = pageSizes.find(size => pageSize === size.value)
    if (hasSize) return pageSize
  }
  return pageSizes[0]?.value
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

const Pagination = forwardRef(function Pagination(
  {
    backwardText = 'Previous page',
    className: customClassName = '',
    disabled = false,
    forwardText = 'Next page',
    id,
    isLastPage = false,
    itemText = (min, max) => `${min}–${max} items`,
    itemRangeText = (min, max, total) => `${min}–${max} of ${total} items`,
    itemsPerPageText = 'Items per page:',
    onChange,
    // eslint-disable-next-line no-unused-vars
    pageNumberText: _pageNumberText = 'Page Number',
    pageRangeText = (_current, total) =>
      `of ${total} ${total === 1 ? 'page' : 'pages'}`,
    page: controlledPage = 1,
    pageInputDisabled,
    pageSize: controlledPageSize,
    pageSizeInputDisabled,
    pageSizes: controlledPageSizes,
    pageText = page => `page ${page}`,
    pagesUnknown = false,
    size = 'md',
    totalItems,
    ...rest
  },
  ref
) {
  const prefix = useClassPrefix()

  const inputId = useMemo(() => {
    // Carbon uses a fallback id util; we keep it stable.
    if (id != null && String(id).length > 0) return String(id)
    // React 18 useId produces colon-containing IDs; fine for DOM.
    // Use a small stable fallback for multi-instance support.
    return undefined
  }, [id])

  const backBtnRef = useRef(null)
  const forwardBtnRef = useRef(null)

  const [pageSizes, setPageSizes] = useState(() => {
    return mapPageSizesToObject(controlledPageSizes)
  })

  const [page, setPage] = useState(controlledPage)
  const [pageSize, setPageSize] = useState(() => {
    return getPageSize(mapPageSizesToObject(controlledPageSizes), controlledPageSize)
  })

  const [focusTarget, setFocusTarget] = useState(null)

  const totalPages = totalItems ? Math.max(Math.ceil(totalItems / pageSize), 1) : 1

  const backButtonDisabled = disabled || page === 1
  const forwardButtonDisabled = disabled || (page === totalPages && !pagesUnknown)

  const backButtonClasses = cx({
    [`${prefix}--pagination__button`]: true,
    [`${prefix}--pagination__button--backward`]: true,
    [`${prefix}--pagination__button--no-index`]: backButtonDisabled,
  })

  const forwardButtonClasses = cx({
    [`${prefix}--pagination__button`]: true,
    [`${prefix}--pagination__button--forward`]: true,
    [`${prefix}--pagination__button--no-index`]: forwardButtonDisabled,
  })

  useEffect(() => {
    if (!focusTarget) return
    const node = focusTarget === 'backward' ? backBtnRef.current : forwardBtnRef.current
    if (node && !node.disabled) {
      node.focus()
    }
    setFocusTarget(null)
  }, [focusTarget])

  // Sync controlled props -> state
  useEffect(() => {
    setPage(controlledPage)
  }, [controlledPage])

  useEffect(() => {
    if (controlledPageSize == null) return
    const next = getPageSize(pageSizes, controlledPageSize)
    if (next != null) setPageSize(next)
  }, [controlledPageSize, pageSizes])

  useEffect(() => {
    if (!controlledPageSizes) return
    if (arePageSizesEqual(controlledPageSizes, pageSizes)) return

    const nextSizes = mapPageSizesToObject(controlledPageSizes)
    const hasPageSize = nextSizes.find(size => size.value === pageSize)

    if (!hasPageSize) {
      setPage(1)
    }

    setPageSizes(nextSizes)
  }, [controlledPageSizes, pageSize, pageSizes])

  function handleSizeChange(event) {
    const nextPageSize = Number(event.target.value)
    const changes = { pageSize: nextPageSize, page: 1 }

    setPage(changes.page)
    setPageSize(changes.pageSize)

    onChange?.(changes)
  }

  function handlePageInputChange(event) {
    const nextPage = Number(event.target.value)
    if (
      nextPage > 0 &&
      totalItems &&
      nextPage <= Math.max(Math.ceil(totalItems / pageSize), 1)
    ) {
      setPage(nextPage)
      onChange?.({ page: nextPage, pageSize })
    }
  }

  function incrementPage() {
    const nextPage = page + 1
    setPage(nextPage)

    if (nextPage === totalPages) {
      setFocusTarget('backward')
    }

    onChange?.({ page: nextPage, pageSize, ref: backBtnRef })
  }

  function decrementPage() {
    const nextPage = page - 1
    setPage(nextPage)

    if (nextPage === 1) {
      setFocusTarget('forward')
    }

    onChange?.({ page: nextPage, pageSize, ref: forwardBtnRef })
  }

  const className = cx({
    [`${prefix}--pagination`]: true,
    [`${prefix}--pagination--${size}`]: size,
    [customClassName]: Boolean(customClassName),
  })

  const selectItems = renderSelectItems(totalPages)

  // Keep ids stable/unique even without `id` prop.
  const countSelectId = `${prefix}-pagination-select-${inputId ?? 'auto'}-count`
  const countLabelId = `${prefix}-pagination-select-${inputId ?? 'auto'}-count-label`
  const pageSelectId = `${prefix}-pagination-select-${inputId ?? 'auto'}-right`

  return (
    <div className={className} ref={ref} {...rest}>
      <div className={`${prefix}--pagination__left`}>
        <label
          id={countLabelId}
          className={`${prefix}--pagination__text`}
          htmlFor={countSelectId}
        >
          {itemsPerPageText}
        </label>

        <Select
          id={countSelectId}
          className={`${prefix}--select__item-count`}
          labelText=""
          hideLabel
          onChange={handleSizeChange}
          disabled={Boolean(pageSizeInputDisabled) || disabled}
          value={pageSize}
        >
          {pageSizes.map(sizeObj => (
            <SelectItem
              key={sizeObj.value}
              value={sizeObj.value}
              text={String(sizeObj.text)}
            />
          ))}
        </Select>

        <span className={`${prefix}--pagination__text ${prefix}--pagination__items-count`}>
          {pagesUnknown || !totalItems
            ? totalItems === 0
              ? itemRangeText(0, 0, 0)
              : itemText(pageSize * (page - 1) + 1, page * pageSize)
            : itemRangeText(
                Math.min(pageSize * (page - 1) + 1, totalItems),
                Math.min(page * pageSize, totalItems),
                totalItems
              )}
        </span>
      </div>

      <div className={`${prefix}--pagination__right`}>
        {pagesUnknown ? (
          <span
            className={cx(
              `${prefix}--pagination__text`,
              `${prefix}--pagination__page-text`,
              `${prefix}--pagination__unknown-pages-text`
            )}
          >
            {pageText(page, pagesUnknown)}
          </span>
        ) : (
          <>
            <Select
              id={pageSelectId}
              className={`${prefix}--select__page-number`}
              labelText={`Page of ${totalPages} pages`}
              hideLabel
              onChange={handlePageInputChange}
              value={page}
              key={page}
              disabled={Boolean(pageInputDisabled) || disabled}
            >
              {selectItems}
            </Select>

            <span className={`${prefix}--pagination__text`}>
              {pageRangeText(page, totalPages)}
            </span>
          </>
        )}

        <div className={`${prefix}--pagination__control-buttons`}>
          <IconButton
            disabled={backButtonDisabled}
            kind="ghost"
            className={backButtonClasses}
            label={backwardText}
            aria-label={backwardText}
            onClick={decrementPage}
            ref={backBtnRef}
          >
            <CaretLeft />
          </IconButton>

          <IconButton
            disabled={forwardButtonDisabled || isLastPage}
            kind="ghost"
            className={forwardButtonClasses}
            label={forwardText}
            aria-label={forwardText}
            onClick={incrementPage}
            ref={forwardBtnRef}
          >
            <CaretRight />
          </IconButton>
        </div>
      </div>
    </div>
  )
})

Pagination.displayName = 'Pagination'

Pagination.propTypes = {
  backwardText: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  forwardText: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLastPage: PropTypes.bool,
  itemText: PropTypes.func,
  itemRangeText: PropTypes.func,
  itemsPerPageText: PropTypes.string,
  onChange: PropTypes.func,
  pageNumberText: PropTypes.string,
  pageRangeText: PropTypes.func,
  page: PropTypes.number,
  pageInputDisabled: PropTypes.bool,
  pageSize: PropTypes.number,
  pageSizeInputDisabled: PropTypes.bool,
  pageSizes: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number.isRequired),
    PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        value: PropTypes.number.isRequired,
      }).isRequired
    ),
  ]).isRequired,
  pageText: PropTypes.func,
  pagesUnknown: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  totalItems: PropTypes.number,
}

export default Pagination
