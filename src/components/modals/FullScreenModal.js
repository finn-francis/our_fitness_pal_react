import React from 'react'

export const FullScreenModal = (props) => {
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

export const FullScreenModalFooter = (props) => {
  return (
    <div className="modal-footer-full-width modal-footer text-center">
      {props.children}
    </div>
  )
}

export const FullScreenModalHeader = (props) => {
  return (
    <div className="modal-header-full-width modal-header text-center">
      {props.children}
    </div>
  )
}
