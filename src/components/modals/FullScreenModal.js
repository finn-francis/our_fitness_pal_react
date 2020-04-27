import React from 'react'

const FullScreenModal = (props) => {
  return (
    <div className="modal fade right" id={props.id} tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog-full-width modal-dialog momodel modal-fluid" role="document">
        <div className="modal-content-full-width modal-content">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default FullScreenModal
