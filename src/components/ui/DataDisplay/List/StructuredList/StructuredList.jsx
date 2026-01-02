import React from 'react'
import PropTypes from 'prop-types'
import {
  StyledStructuredList,
  StyledStructuredListBody,
  StyledStructuredListCell,
  StyledStructuredListHead,
  StyledStructuredListRow,
} from './StructuredList.styles'

export function StructuredListHead({ children, ...rest }) {
  return (
    <StyledStructuredListHead role="rowgroup" {...rest}>
      {children}
    </StyledStructuredListHead>
  )
}

export function StructuredListBody({ children, ...rest }) {
  return (
    <StyledStructuredListBody role="rowgroup" {...rest}>
      {children}
    </StyledStructuredListBody>
  )
}

export function StructuredListRow({ children, ...rest }) {
  return (
    <StyledStructuredListRow role="row" {...rest}>
      {children}
    </StyledStructuredListRow>
  )
}

export function StructuredListCell({ children, ...rest }) {
  return (
    <StyledStructuredListCell role="cell" {...rest}>
      {children}
    </StyledStructuredListCell>
  )
}

export default function StructuredList({ className, children, ...rest }) {
  return (
    <StyledStructuredList className={className} role="table" {...rest}>
      {children}
    </StyledStructuredList>
  )
}

StructuredList.displayName = 'StructuredList'

StructuredList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

StructuredListHead.propTypes = { children: PropTypes.node }
StructuredListBody.propTypes = { children: PropTypes.node }
StructuredListRow.propTypes = { children: PropTypes.node }
StructuredListCell.propTypes = { children: PropTypes.node }
