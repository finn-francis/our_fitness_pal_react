import React from 'react'
import {FullScreenModal, FullScreenModalHeader, FullScreenModalFooter} from '../modals/FullScreenModal'
import {updateExerciseForm} from '../../actions/ExerciseActions'

const FormModal = (props) => {
  const {exercise: {name, description}} = props

  const handleChange = (event) => {
    updateExerciseForm({[event.target.name]: event.target.value})
  }

  return (
    <FullScreenModal id={props.id}>
      <FullScreenModalHeader>
        <h5 className="modal-title w-100">{props.title}</h5>
      </FullScreenModalHeader>

      <div className="modal-body">
        <form>
          <div className="form-group">
            <label htmlFor="name">Exercise name</label>
            <input
              type="text"
              name="name"
              id="exerciseName"
              className="form-control"
              required
              value={name}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="exerciseDescription"
            name="description"
            rows="5"
            value={description}
            onChange={handleChange}
          />
          <button type="submit" className="btn submit-button custom-button mt-3">
            Save
          </button>
        </form>
      </div>

      <FullScreenModalFooter>
        <button type="button" className="btn btn-secondary btn-md" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-info btn-md">Save changes</button>
      </FullScreenModalFooter>
    </FullScreenModal>
  )
}

export default FormModal
