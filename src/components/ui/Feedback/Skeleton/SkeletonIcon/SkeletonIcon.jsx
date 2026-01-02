import React from 'react'
import PropTypes from 'prop-types'
import { useClassPrefix } from '../../../System/ClassPrefix'
import { SkeletonIconRoot } from './SkeletonIcon.styles'

function cx(...xs) {
  return xs.filter(Boolean).join(' ')
}

export default function SkeletonIcon({ className, ...other }) {
  const prefix = useClassPrefix()

  return (
    <SkeletonIconRoot
      className={cx(className, `${prefix}--icon--skeleton`)}
      {...other}
    />
  )
}

SkeletonIcon.propTypes = {
  className: PropTypes.string,
}
