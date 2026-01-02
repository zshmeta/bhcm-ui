import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../../System/ClassPrefix'
import { SkeletonPlaceholderRoot } from './SkeletonPlaceholder.styles'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

export default function SkeletonPlaceholder({ className, ...other }) {
  const prefix = useClassPrefix()

  return (
    <SkeletonPlaceholderRoot
      className={cx(className, `${prefix}--skeleton__placeholder`)}
      {...other}
    />
  )
}

SkeletonPlaceholder.propTypes = {
  className: PropTypes.string,
}
