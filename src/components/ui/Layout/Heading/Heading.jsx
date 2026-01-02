import React from 'react'
import PropTypes from 'prop-types'

const HeadingContext = React.createContext(1)

export const Section = React.forwardRef(function Section(
  { as: BaseComponent = 'section', level: levelOverride, ...rest },
  ref
) {
  const parentLevel = React.useContext(HeadingContext)
  const level = levelOverride ?? parentLevel + 1
  const nextLevel = Math.min(level, 6)
  const Component = BaseComponent

  return (
    <HeadingContext.Provider value={nextLevel}>
      <Component ref={ref} {...rest} />
    </HeadingContext.Provider>
  )
})

Section.displayName = 'Section'

Section.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  children: PropTypes.node,
  className: PropTypes.string,
  level: PropTypes.number,
}

export const Heading = React.forwardRef(function Heading(props, ref) {
  const level = React.useContext(HeadingContext)
  const HeadingIntrinsic = `h${level}`

  return React.createElement(HeadingIntrinsic, { ref, ...props })
})

Heading.displayName = 'Heading'

Heading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}
