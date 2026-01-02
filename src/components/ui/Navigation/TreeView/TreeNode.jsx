import React, { forwardRef, useContext, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import { useFeatureFlag } from '../../System/FeatureFlags'
import { DepthContext, TreeContext } from './TreeContext'
import {
  NodeDetails,
  NodeIcon,
  NodeLabelText,
  ToggleButton,
  TreeNodeButtonLike,
  TreeNodeChildren,
  TreeNodeLink,
  TreeNodeRoot,
} from './TreeView.styles'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

function CaretDown({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const TreeNode = forwardRef(function TreeNode(
  {
    children,
    className,
    disabled,
    id: nodeId,
    isExpanded,
    defaultIsExpanded,
    label,
    onSelect,
    onToggle,
    renderIcon: Icon,
    value,
    href,
    // legacy fallback props
    active: propActive,
    depth: propDepth,
    selected: propSelected,
    onTreeSelect: propOnTreeSelect,
    onNodeFocusEvent: propOnNodeFocusEvent,
    ...rest
  },
  forwardedRef
) {
  const treeContext = useContext(TreeContext)
  const contextDepth = useContext(DepthContext)

  const depth = propDepth ?? (contextDepth !== -1 ? contextDepth : 0)
  const active = propActive ?? treeContext?.active
  const selected = propSelected ?? treeContext?.selected ?? []
  const onTreeSelect = propOnTreeSelect ?? treeContext?.onTreeSelect
  const onNodeFocusEvent = propOnNodeFocusEvent ?? treeContext?.onNodeFocusEvent

  const enableTreeviewControllable = useFeatureFlag('enable-treeview-controllable')
  const prefix = useClassPrefix()

  const autoId = useMemo(() => `tree-node-${Math.random().toString(16).slice(2)}`, [])
  const id = nodeId || autoId

  const controlledExpanded = enableTreeviewControllable && isExpanded !== undefined
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(
    defaultIsExpanded ?? isExpanded ?? false
  )
  const expanded = controlledExpanded ? isExpanded : uncontrolledExpanded

  const currentNodeRef = useRef(null)

  const setRefs = node => {
    currentNodeRef.current = node
    if (typeof forwardedRef === 'function') {
      forwardedRef(node)
    } else if (forwardedRef) {
      forwardedRef.current = node
    }
  }

  useEffect(() => {
    if (!enableTreeviewControllable) {
      setUncontrolledExpanded(isExpanded ?? false)
    }
  }, [enableTreeviewControllable, isExpanded])

  const isActive = active === id
  const isSelected = selected?.includes(id) ?? false

  const treeNodeClasses = cx(
    className,
    `${prefix}--tree-node`,
    isActive && `${prefix}--tree-node--active`,
    disabled && `${prefix}--tree-node--disabled`,
    isSelected && `${prefix}--tree-node--selected`,
    Icon && `${prefix}--tree-node--with-icon`,
    children ? `${prefix}--tree-parent-node` : `${prefix}--tree-leaf-node`
  )

  const toggleClasses = cx(
    `${prefix}--tree-parent-node__toggle-icon`,
    expanded && `${prefix}--tree-parent-node__toggle-icon--expanded`
  )

  function setExpanded(nextExpanded, event) {
    if (!controlledExpanded) {
      setUncontrolledExpanded(nextExpanded)
    }
    onToggle?.(event, { id, isExpanded: nextExpanded, label, value })
  }

  function handleToggleClick(event) {
    if (disabled) return
    event.stopPropagation()
    if (href) event.preventDefault()
    setExpanded(!expanded, event)
  }

  function handleClick(event) {
    event.stopPropagation()
    if (disabled) return

    onTreeSelect?.(event, { id, label, value })
    onSelect?.(event, { id, label, value })
    rest?.onClick?.(event)
  }

  function handleKeyDown(event) {
    if (disabled) return

    const isArrowLeft = event.key === 'ArrowLeft'
    const isArrowRight = event.key === 'ArrowRight'
    const isEnter = event.key === 'Enter'
    const isSpace = event.key === ' '

    if (isArrowLeft || isArrowRight || isEnter) {
      event.stopPropagation()
    }

    const focusSelf = node => {
      if (node instanceof HTMLElement) node.focus()
    }

    const getFocusableNode = node => {
      if (!node) return null
      if (node.classList?.contains?.(`${prefix}--tree-node`)) return node
      return node.firstChild
    }

    if (isArrowLeft) {
      if (children && expanded) {
        setExpanded(false, event)
      } else {
        const parentNode = href
          ? currentNodeRef.current?.parentElement?.parentElement
          : currentNodeRef.current?.parentElement
        // fallback: traverse up until we find a parent node
        let node = parentNode
        while (node && node !== document.body) {
          if (node.classList?.contains?.(`${prefix}--tree-parent-node`)) break
          if (node.classList?.contains?.(`${prefix}--tree`)) {
            node = null
            break
          }
          node = node.parentElement
        }
        if (node) focusSelf(node)
      }
    }

    if (children && isArrowRight) {
      if (expanded) {
        const firstChild = href
          ? currentNodeRef.current?.parentElement?.lastChild?.firstChild
          : currentNodeRef.current?.lastChild?.firstChild
        focusSelf(getFocusableNode(firstChild))
      } else {
        setExpanded(true, event)
      }
    }

    if (isEnter || isSpace) {
      event.preventDefault()
      if (isEnter && children) {
        setExpanded(!expanded, event)
      }
      if (href && forwardedRef?.current?.click) {
        currentNodeRef.current?.click?.()
      }
      handleClick(event)
    }

    rest?.onKeyDown?.(event)
  }

  const tabIndex = disabled ? undefined : rest.tabIndex ?? -1
  const nodeLabelId = `${id}__label`

  const paddingRem = (() => {
    if (children && Icon) return depth + 1 + depth * 0.5
    if (children) return depth + 1
    if (Icon) return depth + 2 + depth * 0.5
    return depth + 2.5
  })()

  const nodeContent = (
    <TreeNodeButtonLike
      className={`${prefix}--tree-node__label`}
      style={{ paddingInlineStart: `${paddingRem}rem`, marginInlineStart: `-${paddingRem}rem` }}
    >
      {children ? (
        <ToggleButton
          className={`${prefix}--tree-parent-node__toggle`}
          onClick={handleToggleClick}
          role="button"
          tabIndex={-1}
          aria-hidden="true"
        >
          <CaretDown
            className={toggleClasses}
            style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 120ms' }}
          />
        </ToggleButton>
      ) : null}

      <NodeDetails className={`${prefix}--tree-node__label__details`}>
        {Icon ? (
          <NodeIcon className={`${prefix}--tree-node__icon`}>
            <Icon />
          </NodeIcon>
        ) : null}
        <NodeLabelText id={nodeLabelId} className={`${prefix}--tree-node__label__text`} title={typeof label === 'string' ? label : undefined}>
          {label}
        </NodeLabelText>
      </NodeDetails>
    </TreeNodeButtonLike>
  )

  const commonProps = {
    ...rest,
    id,
    className: treeNodeClasses,
    role: 'treeitem',
    tabIndex,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onFocus: e => {
      rest?.onFocus?.(e)
      onNodeFocusEvent?.(e)
    },
    onBlur: e => {
      rest?.onBlur?.(e)
      onNodeFocusEvent?.(e)
    },
    ['aria-current']: !href ? (isActive || undefined) : isActive ? 'page' : undefined,
    ['aria-selected']: !href ? (disabled ? undefined : isSelected) : undefined,
    ['aria-disabled']: disabled || undefined,
    ['aria-owns']: children ? `${id}-subtree` : undefined,
  }

  const subtree = children ? (
    <TreeNodeChildren
      id={`${id}-subtree`}
      role="group"
      aria-labelledby={nodeLabelId}
      className={cx(`${prefix}--tree-node__children`, !expanded && `${prefix}--tree-node--hidden`)}
      $hidden={!expanded}
    >
      <DepthContext.Provider value={depth + 1}>{children}</DepthContext.Provider>
    </TreeNodeChildren>
  ) : null

  if (href) {
    return (
      <li role="none" className={children ? `${prefix}--tree-node-link-parent` : ''}>
        <TreeNodeLink
          {...commonProps}
          ref={setRefs}
          href={!disabled ? href : undefined}
          aria-expanded={!!expanded}
        >
          {nodeContent}
        </TreeNodeLink>
        {subtree}
      </li>
    )
  }

  return (
    <TreeNodeRoot
      {...commonProps}
      ref={setRefs}
      aria-expanded={children ? !!expanded : undefined}
    >
      {nodeContent}
      {subtree}
    </TreeNodeRoot>
  )
})

TreeNode.displayName = 'TreeNode'

TreeNode.propTypes = {
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  className: PropTypes.string,
  defaultIsExpanded: PropTypes.bool,
  depth: PropTypes.number,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  isExpanded: PropTypes.bool,
  label: PropTypes.node,
  onNodeFocusEvent: PropTypes.func,
  onSelect: PropTypes.func,
  onToggle: PropTypes.func,
  onTreeSelect: PropTypes.func,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  selected: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  value: PropTypes.string,
  href: PropTypes.string,
}

export default TreeNode
