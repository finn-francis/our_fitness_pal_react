import React from 'react'
import PropTypes from 'prop-types'

const IndexListItem = (props) => {
  return (
    <li className="list-group-item exercise-list-item">
      {props.exercise.name}
    </li>
  )
}
IndexListItem.propTypes = {exercise: PropTypes.object.isRequired}

export default IndexListItem
