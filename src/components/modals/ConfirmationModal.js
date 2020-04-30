import React from "react"
import PropTypes from "prop-types"

const ConfirmationModal = (props) => {
  const renderBody = () => {
    if (props.body) {
      return (
        <div className="modal-body">{props.body}</div>
      )
    } else {
      return ""
    }
  }

  return (
    <div className="modal" tabIndex="-1" role="dialog" id={props.modalId}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {renderBody()}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary cancel-button" data-dismiss="modal" onClick={props.handleCancel}>{props.cancelText}</button>
            <button type="button" className="btn btn-info confirm-button" data-dismiss="modal" onClick={props.handleConfirm}>{props.confirmText}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
ConfirmationModal.propTypes = {
  title: PropTypes.string.isRequired,
  modalId: PropTypes.string.isRequired
}
ConfirmationModal.defaultProps = {
  cancelText: "cancel",
  confirmText: "confirm"
}

export default ConfirmationModal
