import React from 'react'
import PropTypes from 'prop-types'

const IndexListItem = (props) => {
  return (
    <li className="list-group-item session-list-item">{props.session.name}</li>
  )
}
IndexListItem.propTypes = {session: PropTypes.object.isRequired}

export default IndexListItem
