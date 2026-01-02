import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../System/ClassPrefix'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

const Link = forwardRef(function Link(
  {
    as: BaseComponent,
    children,
    className: customClassName,
    href,
    disabled = false,
    inline = false,
    visited = false,
    renderIcon: Icon,
    size,
    target,
    ...rest
  },
  ref
) {
  const prefix = useClassPrefix()

  const className = cx(`${prefix}--link`, customClassName, disabled && `${prefix}--link--disabled`, inline && `${prefix}--link--inline`, visited && `${prefix}--link--visited`, size && `${prefix}--link--${size}`)

  const rel = target === '_blank' ? 'noopener' : undefined

  const linkProps = {
    className,
    rel,
    target,
  }

  // Disabled link semantics: no href, role=link, aria-disabled.
  if (!disabled) {
    linkProps.href = href
  } else {
    linkProps.role = 'link'
    linkProps['aria-disabled'] = true
  }

  const Component = BaseComponent ?? 'a'

  const handleOnClick = event => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    // Carbon behavior: allow bubbling + call user handler
    if (rest.onClick) {
      rest.onClick(event)
    }
  }

  return (
    <Component ref={ref} {...linkProps} {...rest} onClick={handleOnClick}>
      {children}
      {!inline && Icon && (
        <div className={`${prefix}--link__icon`}>
          <Icon />
        </div>
      )}
    </Component>
  )
})

Link.displayName = 'Link'

Link.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  inline: PropTypes.bool,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  target: PropTypes.string,
  visited: PropTypes.bool,
}

export default Link
