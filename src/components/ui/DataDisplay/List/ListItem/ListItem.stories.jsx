import React from 'react'
import ListItem from './ListItem'

export default {
  title: 'DataDisplay/List/ListItem',
  component: ListItem,
}

export function Default() {
  return <ListItem
  children="ListItem" />
}

export function Disabled() {
  return <ListItem
  children="ListItem"
  disabled />
}
