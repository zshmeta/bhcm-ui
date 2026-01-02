import PropTypes from 'prop-types'

export default function SelectItem({ children, text, ...rest }) {
  return <option {...rest}>{children ?? text}</option>
}

SelectItem.displayName = 'SelectItem'

SelectItem.propTypes = {
  children: PropTypes.node,
  text: PropTypes.node,
}
