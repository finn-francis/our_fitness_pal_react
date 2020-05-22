import React from 'react'
import PropTypes from 'prop-types'

const ReadOnlyListItem = (props) => {
  return (
    <li key={props.set.id} className="list-group-item set-list-item">
      <button className="btn btn-info submit-set float-right" onClick={props.toggleEditMode}>Edit</button>
      {props.set.name}
      <ul>
        {props.set.set_exercises.map(set_exercise => <li>{`${set_exercise.exercise_name} for ${set_exercise.unit}`}</li>)}
      </ul>
    </li>
  )
}
ReadOnlyListItem.propTypes = {set: PropTypes.object.isRequired}

export default ReadOnlyListItem
