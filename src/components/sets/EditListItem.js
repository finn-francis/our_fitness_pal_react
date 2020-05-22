import React from 'react'
import PropTypes from 'prop-types'
import Input from '../forms/Input'
import {updateSetForm} from '../../actions/SetActions'
import {createSet} from '../../utils/sets/SetAPI'

const EditListItem = (props) => {
  const {index, set: {name, set_exercises}, exercises} = props

  const handleChange = (event) => {
    updateSetForm(index, {[event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    switch (props.set.formAction) {
      case "new":
        createSet(props.sessionId, props.set)
        props.toggleEditMode()
        break
      default:
        createSet(props.sessionId, props.set)
        props.toggleEditMode()
        break
    }
  }

  const renderExerciseOptions = () => {
    return(
      set_exercises.map((set_exercise, index) =>
        <>
          <Input label="Exercise" labelHtmlFor="exercise">
            <select
            key={`exercise-${index}`}
            name={`set_exercises|${index}|exercise_id`}
            id="setExerciseExercise"
            className="form-control"
            required
            value={set_exercise.exercise_id}
            onChange={handleChange}
            >
              <option disabled selected value=""> -- select an option -- </option>
              {exercises.map((exercise, index) =>
                <option key={index} value={exercise.id}>{exercise.name}</option>
              )}
            </select>
          </Input>
          <Input label="Unit" labelHtmlFor="unit">
            <select
            key={`unit-${index}`}
            name={`set_exercises|${index}|unit`}
            id="setExerciseUnit"
            className="form-control"
            required
            value={set_exercise.unit}
            onChange={handleChange}
            allow
            >
              <option disabled selected value=""> -- select an option -- </option>
              <option value="Reps">Reps</option>
              <option value="Time">Time</option>
              <option value="Distance">Distance</option>
            </select>
          </Input>
        </>
      )
    )
  }

  return (
    <li key={props.set.id} className="list-group-item editable-set-list-item">
      <Input label="Name" labelHtmlFor="name">
        <input
          type="text"
          name="name"
          id="setName"
          className="form-control"
          required
          value={name}
          onChange={handleChange}
          />
      </Input>
      {renderExerciseOptions()}
      <button id={`set-submit-${index}`} className="btn btn-info submit-set" onClick={handleSubmit}>Submit</button>
    </li>
  )
}
EditListItem.propTypes = {set: PropTypes.object.isRequired}

export default EditListItem
