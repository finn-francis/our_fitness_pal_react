import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

const IndexListItem = (props) => {
  return (
    <li className="list-group-item session-list-item">
      {props.session.name}

      <Link to={`/sessions/${props.session.id}`} className="btn btn-info float-right view-session" >View</Link>
    </li>
  )
}
IndexListItem.propTypes = {session: PropTypes.object.isRequired}

export default IndexListItem
