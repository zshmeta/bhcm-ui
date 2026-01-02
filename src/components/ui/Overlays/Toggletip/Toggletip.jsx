import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import Popover, { PopoverContent } from '../Popover'

const ToggletipContext = createContext(null)

function useToggletip() {
  return useContext(ToggletipContext)
}

export function ToggletipLabel({ children }) {
  return <span>{children}</span>
}

ToggletipLabel.displayName = 'ToggletipLabel'

export function ToggletipButton({ children, label, ...rest }) {
  const ctx = useToggletip()
  const child = useMemo(() => Children.only(children), [children])

  if (!isValidElement(child)) return child

  return cloneElement(child, {
    ...rest,
    'aria-label': label,
    onClick: evt => {
      child.props?.onClick?.(evt)
      ctx?.toggle?.()
    },
  })
}

ToggletipButton.displayName = 'ToggletipButton'

ToggletipButton.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
}

export function ToggletipContent({ children, ...rest }) {
  return (
    <PopoverContent role="dialog" {...rest}>
      {children}
    </PopoverContent>
  )
}

ToggletipContent.displayName = 'ToggletipContent'

export function ToggletipActions({ children }) {
  return <div>{children}</div>
}

ToggletipActions.displayName = 'ToggletipActions'

export default function Toggletip({ children, align = 'bottom', defaultOpen = false, open, onRequestClose }) {
  const isControlled = typeof open === 'boolean'
  const [uncontrolled, setUncontrolled] = useState(defaultOpen)
  const isOpen = isControlled ? open : uncontrolled

  const toggle = useCallback(() => {
    if (isControlled) return
    setUncontrolled(v => !v)
  }, [isControlled])

  const close = useCallback(
    evt => {
      onRequestClose?.(evt)
      if (!isControlled) setUncontrolled(false)
    },
    [isControlled, onRequestClose]
  )

  const ctx = useMemo(() => ({ toggle, close, open: isOpen }), [close, isOpen, toggle])

  const items = Children.toArray(children)
  const trigger = items[0]
  const content = items[1]

  return (
    <ToggletipContext.Provider value={ctx}>
      <Popover open={isOpen} align={align} onRequestClose={close}>
        {trigger}
        {content}
      </Popover>
    </ToggletipContext.Provider>
  )
}

Toggletip.displayName = 'Toggletip'

Toggletip.propTypes = {
  children: PropTypes.node,
  align: PropTypes.string,
  defaultOpen: PropTypes.bool,
  open: PropTypes.bool,
  onRequestClose: PropTypes.func,
}
