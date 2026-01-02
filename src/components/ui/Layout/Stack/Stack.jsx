import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { StackRoot } from './Stack.styles'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

const Stack = forwardRef(function Stack(
  { as: As = 'div', className, children, gap, orientation = 'vertical', ...rest },
  ref
) {
  return (
    <StackRoot
      as={As}
      ref={ref}
      className={cx(className, 'bhcm-stack')}
      $gap={gap}
      $orientation={orientation}
      {...rest}
    >
      {children}
    </StackRoot>
  )
})

Stack.displayName = 'Stack'

export const HStack = forwardRef(function HStack(props, ref) {
  return <Stack ref={ref} orientation="horizontal" {...props} />
})

HStack.displayName = 'HStack'

export const VStack = forwardRef(function VStack(props, ref) {
  return <Stack ref={ref} orientation="vertical" {...props} />
})

VStack.displayName = 'VStack'

Stack.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  children: PropTypes.node,
  className: PropTypes.string,
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
}

HStack.propTypes = Stack.propTypes
VStack.propTypes = Stack.propTypes

export default Stack
