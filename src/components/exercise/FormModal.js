import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {FullScreenModal, FullScreenModalHeader, FullScreenModalFooter} from '../modals/FullScreenModal'
import {updateExerciseForm, clearFormExercise} from '../../actions/ExerciseActions'
import {createExercise} from '../../utils/exercises/ExerciseAPI'
import Input from '../forms/Input'

const FormModal = (props) => {
  const {exercise: {name, description}} = props
  const closeButtonRef = React.useRef(null)

  useEffect(() => {
    if (props.exercise.responseSuccess)
      closeButtonRef.current.click()
  })

  const handleChange = (event) => {
    updateExerciseForm({[event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createExercise(props.exercise)
  }

  return (
    <FullScreenModal id={props.id}>
      <form onSubmit={handleSubmit}>
        <FullScreenModalHeader>
          <h5 className="modal-title w-100">{props.title}</h5>
        </FullScreenModalHeader>

        <div className="modal-body">
          <div className="form-group">
            <Input label="Name" labelHtmlFor="name" errors={props.exercise.errors.name}>
              <input
                type="text"
                name="name"
                id="exerciseName"
                className="form-control"
                required
                value={name}
                onChange={handleChange}
                />
            </Input>
          </div>
          <Input label="Description" labelHtmlFor="description" errors={props.exercise.errors.description}>
            <textarea
              className="form-control"
              id="exerciseDescription"
              name="description"
              rows="5"
              required
              value={description}
              onChange={handleChange}
            />
          </Input>
        </div>

        <FullScreenModalFooter>
          <button ref={closeButtonRef} onClick={clearFormExercise} type="button" className="btn btn-secondary btn-md" data-dismiss="modal">Close</button>
          <button type="submit" className="btn btn-info btn-md">Save changes</button>
        </FullScreenModalFooter>
      </form>
    </FullScreenModal>
  )
}
FormModal.propTypes = {exercise: PropTypes.object.isRequired}

export default FormModal
