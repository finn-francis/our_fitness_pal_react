import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"
import {updateSelectedSession} from '../../actions/SessionActions'

const IndexListItem = (props) => {
  const handleDelete = (_e) => {
    updateSelectedSession(props.session)
  }

  return (
    <li className="list-group-item session-list-item">
      {props.session.name}

      <button type="button" className="btn btn-danger float-right delete-session" data-toggle="modal" data-target={`#${props.deleteModalId}`} onClick={handleDelete}>Delete</button>
      <Link to={`/sessions/${props.session.id}`} className="btn btn-info float-right view-session" >View</Link>
    </li>
  )
}
IndexListItem.propTypes = {session: PropTypes.object.isRequired}

export default IndexListItem
