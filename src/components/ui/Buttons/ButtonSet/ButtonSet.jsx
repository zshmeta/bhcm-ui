import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { FluidInner, Root } from './ButtonSet.styles'

const KIND_ORDER = {
  ghost: 1,
  'danger--ghost': 2,
  tertiary: 3,
  danger: 5,
  primary: 6,
}

function buttonOrder(kind) {
  return KIND_ORDER[kind] ?? 4
}

function getButtonKind(element) {
  if (
    React.isValidElement(element) &&
    element.props &&
    typeof element.props === 'object'
  ) {
    return element.props.kind ?? 'primary'
  }
  return 'primary'
}

function computeWrapped(container) {
  if (!container) return false
  const children = Array.from(container.children)
  if (children.length <= 1) return false
  const firstTop = children[0].offsetTop
  return children.some(node => node.offsetTop > firstTop)
}

const ButtonSet = forwardRef(function ButtonSet(
  { children, className, fluid = false, stacked = false, ...rest },
  ref
) {
  const fluidInnerRef = useRef(null)
  const [isAutoStacked, setIsAutoStacked] = useState(false)

  const isStacked = fluid ? isAutoStacked : Boolean(stacked)

  const sortedChildren = useMemo(() => {
    const asArray = React.Children.toArray(children)
    const directionFactor = isStacked ? -1 : 1

    asArray.sort((a, b) => {
      return (
        (buttonOrder(getButtonKind(a)) - buttonOrder(getButtonKind(b))) *
        directionFactor
      )
    })

    return asArray
  }, [children, isStacked])

  useEffect(() => {
    if (!fluid) return
    if (typeof window === 'undefined') return

    const node = fluidInnerRef.current
    if (!node) return

    const update = () => setIsAutoStacked(computeWrapped(node))
    update()

    let ro
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => update())
      ro.observe(node)
    }

    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('resize', update)
      if (ro) ro.disconnect()
    }
  }, [fluid])

  return (
    <Root
      {...rest}
      className={className}
      ref={ref}
      $isStacked={isStacked}
      data-fluid={fluid ? 'true' : 'false'}
      data-stacked={isStacked ? 'true' : 'false'}>
      {fluid ? (
        <FluidInner ref={fluidInnerRef} $isStacked={isStacked}>
          {sortedChildren}
        </FluidInner>
      ) : (
        children
      )}
    </Root>
  )
})

ButtonSet.displayName = 'ButtonSet'

ButtonSet.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fluid: PropTypes.bool,
  stacked: PropTypes.bool,
}

export default ButtonSet
