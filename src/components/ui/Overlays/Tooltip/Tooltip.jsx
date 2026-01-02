import React, { Children, cloneElement, isValidElement, useId, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Popover, { PopoverContent } from '../Popover'

export default function Tooltip({
  children,
  label,
  description,
  align = 'top',
  defaultOpen = false,
  enterDelayMs = 100,
  leaveDelayMs = 300,
  ...rest
}) {
  const id = useId()
  const child = useMemo(() => Children.only(children), [children])
  const hasLabel = Boolean(label)
  const tooltipId = `tooltip-${id}`

  const [open, setOpen] = useState(defaultOpen)
  const [enterTimer, setEnterTimer] = useState(null)
  const [leaveTimer, setLeaveTimer] = useState(null)

  const trigger = isValidElement(child)
    ? cloneElement(child, {
        'aria-labelledby': hasLabel ? tooltipId : child.props['aria-labelledby'],
        'aria-describedby': !hasLabel ? tooltipId : child.props['aria-describedby'],
        onFocus: evt => {
          child.props?.onFocus?.(evt)
          if (leaveTimer) clearTimeout(leaveTimer)
          const t = setTimeout(() => setOpen(true), enterDelayMs)
          setEnterTimer(t)
        },
        onBlur: evt => {
          child.props?.onBlur?.(evt)
          if (enterTimer) clearTimeout(enterTimer)
          const t = setTimeout(() => setOpen(false), leaveDelayMs)
          setLeaveTimer(t)
        },
        onMouseEnter: evt => {
          child.props?.onMouseEnter?.(evt)
          if (leaveTimer) clearTimeout(leaveTimer)
          const t = setTimeout(() => setOpen(true), enterDelayMs)
          setEnterTimer(t)
        },
        onMouseLeave: evt => {
          child.props?.onMouseLeave?.(evt)
          if (enterTimer) clearTimeout(enterTimer)
          const t = setTimeout(() => setOpen(false), leaveDelayMs)
          setLeaveTimer(t)
        },
      })
    : child

  return (
    <Popover open={open} align={align} onRequestClose={() => setOpen(false)} {...rest}>
      {trigger}
      <PopoverContent id={tooltipId} role="tooltip">
        {hasLabel ? label : description}
      </PopoverContent>
    </Popover>
  )
}

Tooltip.displayName = 'Tooltip'

Tooltip.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.node,
  description: PropTypes.node,
  align: PropTypes.string,
  defaultOpen: PropTypes.bool,
  enterDelayMs: PropTypes.number,
  leaveDelayMs: PropTypes.number,
}
