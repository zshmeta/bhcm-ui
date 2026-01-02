import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { StyledLink, StyledLinkIcon } from './Link.styles'

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
  const rel = target === '_blank' ? 'noopener' : undefined

  const Component = BaseComponent ?? 'a'

  const linkProps = {
    rel,
    target,
    className: customClassName,
  }

  // Disabled link semantics: no href, role=link, aria-disabled.
  if (!disabled) {
    linkProps.href = href
  } else {
    linkProps.role = 'link'
    linkProps['aria-disabled'] = true
  }

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
    <StyledLink
      as={Component}
      ref={ref}
      {...linkProps}
      {...rest}
      onClick={handleOnClick}
      $disabled={disabled}
      $inline={inline}
      $visited={visited}
      $size={size}
    >
      {children}
      {!inline && Icon && (
        <StyledLinkIcon aria-hidden="true">
          <Icon aria-hidden="true" focusable="false" />
        </StyledLinkIcon>
      )}
    </StyledLink>
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

