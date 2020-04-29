import React from 'react'

const FormModalButton = (props) => {
  return (
    <>
      <button id="exercise-modal-button" type="button" className="btn btn-info" data-toggle="modal" data-target={`#${props.modalId}`}>
        {props.children}
      </button>
    </>
  )
}

export default FormModalButton
