import React from 'react'
import PropTypes from 'prop-types'
import {updateExerciseForm, updateSelectedExercise} from '../../actions/ExerciseActions'

const IndexListItem = (props) => {
  const editExercise = (_event) => {
    const {exercise} = props
    updateExerciseForm({id: exercise.id, name: exercise.name, description: exercise.description, formAction: 'edit'})
  }

  const handleDelete = (_event) => {
    const {exercise} = props
    updateSelectedExercise({id: exercise.id, name: exercise.name, description: exercise.description})
  }

  return (
    <li key={props.exercise.id} className="list-group-item exercise-list-item">
      {props.exercise.name}
      <button type="button" className="btn btn-danger float-right delete-exercise" data-toggle="modal" data-target={`#${props.deleteModalId}`} onClick={handleDelete}>delete</button>
      <button type="button" className="btn btn-info float-right edit-exercise" data-toggle="modal" data-target={`#${props.editModalId}`} onClick={editExercise}>edit</button>
    </li>
  )
}
IndexListItem.propTypes = {exercise: PropTypes.object.isRequired}

export default IndexListItem
