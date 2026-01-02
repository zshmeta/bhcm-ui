import PropTypes from 'prop-types'

export default function SelectItemGroup({ children, label, ...rest }) {
  return (
    <optgroup label={label} {...rest}>
      {children}
    </optgroup>
  )
}

SelectItemGroup.displayName = 'SelectItemGroup'

SelectItemGroup.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
}
