import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'
import { useFeatureFlag } from '../../System/FeatureFlags'
import TreeNode from './TreeNode'
import { DepthContext, TreeContext } from './TreeContext'
import { TreeRoot } from './TreeView.styles'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

function isHome(event) {
  return event.key === 'Home'
}

function isEnd(event) {
  return event.key === 'End'
}

function isArrowUp(event) {
  return event.key === 'ArrowUp'
}

function isArrowDown(event) {
  return event.key === 'ArrowDown'
}

export default function TreeView({
  active: prespecifiedActive,
  children,
  className,
  hideLabel = false,
  label,
  multiselect = false,
  onActivate,
  onSelect,
  selected: preselected,
  size = 'sm',
  ...rest
}) {
  const enableTreeviewControllable = useFeatureFlag('enable-treeview-controllable')
  const prefix = useClassPrefix()

  const treeIdRef = useRef(rest.id || `tree-${Math.random().toString(16).slice(2)}`)
  const treeId = treeIdRef.current

  const treeRootRef = useRef(null)
  const treeWalker = useRef(null)

  const [uncontrolledSelected, setUncontrolledSelected] = useState(preselected ?? [])
  const selected = enableTreeviewControllable ? (preselected ?? uncontrolledSelected) : uncontrolledSelected

  const activeControlled = enableTreeviewControllable && prespecifiedActive !== undefined
  const [uncontrolledActive, setUncontrolledActive] = useState(prespecifiedActive)
  const active = activeControlled ? prespecifiedActive : uncontrolledActive

  function setSelected(nextSelected, event, payload) {
    if (enableTreeviewControllable) {
      if (preselected === undefined) {
        setUncontrolledSelected(nextSelected)
      }
      onSelect?.(nextSelected)
      return
    }

    setUncontrolledSelected(nextSelected)
    onSelect?.(event, payload)
  }

  function setActive(nextActive) {
    if (activeControlled) {
      onActivate?.(nextActive)
    } else {
      setUncontrolledActive(nextActive)
      if (enableTreeviewControllable) {
        onActivate?.(nextActive)
      }
    }
  }

  function resetNodeTabIndices() {
    const nodes = treeRootRef.current?.querySelectorAll('[tabindex="0"]') || []
    Array.prototype.forEach.call(nodes, item => {
      item.tabIndex = -1
    })
  }

  function handleFocusEvent(event) {
    if (event.type === 'blur') {
      const { relatedTarget: currentFocusedNode, target: prevFocusedNode } = event
      if (treeRootRef?.current?.contains(currentFocusedNode)) {
        prevFocusedNode.tabIndex = -1
      }
    }

    if (event.type === 'focus') {
      resetNodeTabIndices()
      const { relatedTarget: prevFocusedNode, target: currentFocusedNode } = event
      if (treeRootRef?.current?.contains(prevFocusedNode)) {
        prevFocusedNode.tabIndex = -1
      }
      currentFocusedNode.tabIndex = 0
    }
  }

  function handleTreeSelect(event, node) {
    const nodeId = node?.id
    if (!nodeId) return

    if (multiselect && (event.metaKey || event.ctrlKey)) {
      if (!selected.includes(nodeId)) {
        setSelected(selected.concat(nodeId), event, node)
      } else {
        setSelected(
          selected.filter(selectedId => selectedId !== nodeId),
          event,
          node
        )
      }
      return
    }

    setSelected([nodeId], event, { activeNodeId: nodeId, ...node })
    setActive(nodeId)
  }

  useEffect(() => {
    const firstNode = treeRootRef.current?.querySelector(
      `.${prefix}--tree-node:not(.${prefix}--tree-node--disabled)`
    )
    if (firstNode instanceof HTMLElement) {
      firstNode.tabIndex = 0
    }
  }, [children, prefix])

  useEffect(() => {
    if (treeRootRef.current && !treeWalker.current) {
      treeWalker.current = document.createTreeWalker(
        treeRootRef.current,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: node => {
            if (!(node instanceof Element)) return NodeFilter.FILTER_SKIP
            if (
              node.classList.contains(`${prefix}--tree-node--disabled`) ||
              node.classList.contains(`${prefix}--tree-node--hidden`)
            ) {
              return NodeFilter.FILTER_REJECT
            }
            if (node.matches(`.${prefix}--tree-node`)) return NodeFilter.FILTER_ACCEPT
            return NodeFilter.FILTER_SKIP
          },
        }
      )
    }
  }, [prefix])

  function handleKeyDown(event) {
    event.stopPropagation()

    if (isArrowUp(event) || isArrowDown(event) || isHome(event) || isEnd(event)) {
      event.preventDefault()
    }

    if (!treeWalker.current) return

    treeWalker.current.currentNode = event.target
    let nextFocusNode = null

    if (isArrowUp(event)) {
      nextFocusNode = treeWalker.current.previousNode()
    }

    if (isArrowDown(event)) {
      nextFocusNode = treeWalker.current.nextNode()
    }

    const isCtrlA = event.code === 'KeyA' && event.ctrlKey

    if (isHome(event) || isEnd(event) || isCtrlA) {
      const nodeIds = []

      if (isHome(event) || isEnd(event)) {
        if (
          multiselect &&
          event.shiftKey &&
          event.ctrlKey &&
          treeWalker.current.currentNode instanceof Element &&
          !treeWalker.current.currentNode.getAttribute('aria-disabled') &&
          !treeWalker.current.currentNode.classList.contains(`${prefix}--tree-node--hidden`)
        ) {
          nodeIds.push(treeWalker.current.currentNode.id)
        }

        while (isHome(event) ? treeWalker.current.previousNode() : treeWalker.current.nextNode()) {
          nextFocusNode = treeWalker.current.currentNode
          if (
            multiselect &&
            event.shiftKey &&
            event.ctrlKey &&
            nextFocusNode instanceof Element &&
            !nextFocusNode.getAttribute('aria-disabled') &&
            !nextFocusNode.classList.contains(`${prefix}--tree-node--hidden`)
          ) {
            nodeIds.push(nextFocusNode.id)
          }
        }
      }

      if (isCtrlA) {
        treeWalker.current.currentNode = treeWalker.current.root
        while (treeWalker.current.nextNode()) {
          if (
            treeWalker.current.currentNode instanceof Element &&
            !treeWalker.current.currentNode.getAttribute('aria-disabled') &&
            !treeWalker.current.currentNode.classList.contains(`${prefix}--tree-node--hidden`)
          ) {
            nodeIds.push(treeWalker.current.currentNode.id)
          }
        }
      }

      if (nodeIds.length) {
        setSelected(selected.concat(nodeIds))
      }
    }

    if (nextFocusNode && nextFocusNode !== event.target) {
      resetNodeTabIndices()
      if (nextFocusNode instanceof HTMLElement) {
        nextFocusNode.tabIndex = 0
        nextFocusNode.focus()
      }
    }

    rest?.onKeyDown?.(event)
  }

  const labelId = `${treeId}__label`

  const treeClasses = cx(
    className,
    `${prefix}--tree`,
    size && size !== 'default' && `${prefix}--tree--${size}`
  )

  const treeContextValue = useMemo(
    () => ({
      active,
      multiselect,
      onActivate: setActive,
      onNodeFocusEvent: handleFocusEvent,
      onTreeSelect: handleTreeSelect,
      selected,
      size,
    }),
    [active, multiselect, selected, size]
  )

  return (
    <>
      {!hideLabel ? (
        <label id={labelId} className={`${prefix}--label`}>
          {label}
        </label>
      ) : null}

      <TreeContext.Provider value={treeContextValue}>
        <DepthContext.Provider value={0}>
          <TreeRoot
            {...rest}
            $size={size}
            aria-label={hideLabel ? label : undefined}
            aria-labelledby={!hideLabel ? labelId : undefined}
            aria-multiselectable={multiselect || undefined}
            className={treeClasses}
            onKeyDown={handleKeyDown}
            ref={treeRootRef}
            role="tree"
          >
            {children}
          </TreeRoot>
        </DepthContext.Provider>
      </TreeContext.Provider>
    </>
  )
}

TreeView.propTypes = {
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  className: PropTypes.string,
  hideLabel: PropTypes.bool,
  label: PropTypes.string.isRequired,
  multiselect: PropTypes.bool,
  onActivate: PropTypes.func,
  onSelect: PropTypes.func,
  selected: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  size: PropTypes.oneOf(['xs', 'sm']),
}

TreeView.TreeNode = TreeNode
