import React from 'react'
import PropTypes from 'prop-types'
import {updateExerciseForm} from '../../actions/ExerciseActions'

const IndexListItem = (props) => {
  const handleClick = (_event) => {
    const {exercise} = props
    updateExerciseForm({id: exercise.id, name: exercise.name, description: exercise.description, formAction: 'edit'})
  }

  return (
    <li className="list-group-item exercise-list-item">
      {props.exercise.name}
      <button type="button" className="btn btn-info float-right" data-toggle="modal" data-target={`#${props.modalId}`} onClick={handleClick}>edit</button>
    </li>
  )
}
IndexListItem.propTypes = {exercise: PropTypes.object.isRequired}

export default IndexListItem
