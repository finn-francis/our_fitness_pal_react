import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {FullScreenModal, FullScreenModalHeader, FullScreenModalFooter} from '../modals/FullScreenModal'
import {updateSessionForm, clearSessionForm} from '../../actions/SessionActions'
import {createSession, updateSession} from '../../utils/sessions/SessionAPI'
import Input from '../forms/Input'

const FormModal = (props) => {
  const closeButtonRef = React.useRef(null)

  useEffect(() => {
    if (props.session.responseSuccess || props.session.closeForm)
      closeButtonRef.current.click()
  })


  const handleChange = (event) => {
    updateSessionForm({[event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    switch (props.session.formAction) {
      case 'new':
        createSession(props.session)
        break
      case 'edit':
        updateSession(props.session)
        break
      default:
      break
    }
  }

  const modalTitle = () => {
    const {session: {formAction}, title} = props
    let action = formAction[0].toUpperCase() + formAction.slice(1)

    return `${action} ${title}`
  }

  return (
    <FullScreenModal id={props.id}>
      <form onSubmit={handleSubmit}>
        <FullScreenModalHeader>
          <h5 className="modal-title w-100">{modalTitle()}</h5>
        </FullScreenModalHeader>

        <div className="modal-body">
          <div className="form-group">
            <Input label="Name" labelHtmlFor="name" errors={props.session.errors.name}>
              <input
                type="text"
                name="name"
                id="sessionName"
                className="form-control"
                required
                value={props.session.name}
                onChange={handleChange}
                />
            </Input>
          </div>
          <Input label="Description" labelHtmlFor="description" errors={props.session.errors.description}>
            <textarea
              className="form-control"
              id="sessionDescription"
              name="description"
              rows="5"
              required
              value={props.session.description}
              onChange={handleChange}
            />
          </Input>
        </div>

        <FullScreenModalFooter>
          <button ref={closeButtonRef} onClick={props.onClose || clearSessionForm} type="button" className="btn btn-secondary btn-md" data-dismiss="modal">Close</button>
          <button type="submit" className="btn btn-info btn-md">Save changes</button>
        </FullScreenModalFooter>
      </form>
    </FullScreenModal>
  )
}
FormModal.propTypes = {session: PropTypes.object.isRequired, title: PropTypes.string.isRequired}

export default FormModal
