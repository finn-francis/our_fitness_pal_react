import React from 'react'
import PropTypes from 'prop-types'

const FormModalButton = (props) => {
  return (
    <>
      <button id={props.id} type="button" className="btn btn-info" data-toggle="modal" data-target={`#${props.modalId}`} onClick={props.handleClick}>
        {props.children}
      </button>
    </>
  )
}
FormModalButton.propTypes = {id: PropTypes.string.isRequired, modalId: PropTypes.string.isRequired}

export default FormModalButton
