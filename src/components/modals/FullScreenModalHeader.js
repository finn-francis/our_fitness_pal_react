import React from 'react'

const FullScreenModalHeader = (props) => {
  return (
    <div className="modal-header-full-width modal-header text-center">
      {props.children}
    </div>
  )
}

export default FullScreenModalHeader
