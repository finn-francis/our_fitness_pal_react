import React from 'react'
import PropTypes from 'prop-types'

const FormModalButton = (props) => {
  return (
    <>
      <button id="exercise-modal-button" type="button" className="btn btn-info" data-toggle="modal" data-target={`#${props.modalId}`}>
        {props.children}
      </button>
    </>
  )
}
FormModalButton.propTypes = {modalId: PropTypes.string.isRequired}

export default FormModalButton
