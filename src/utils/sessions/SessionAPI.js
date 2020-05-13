import axios from 'axios'
import {BASE_URL} from '../../constants/AppConstants'
import {setSessions, updateSessionForm} from '../../actions/SessionActions'
import {authorisedHeaders} from '../authorised_request.js'

export const fetchSessions = () => {
  axios.get(`${BASE_URL}/sessions`, {
    headers: authorisedHeaders()
  })
    .then(({data, statusText}) => {
      if (statusText === 'OK') {
        setSessions(data.sessions)
      } else {
        throw new Error("Network response was not ok.")
      }
    })
    .catch(error => console.log(error.message))
}

export const createSession = (session) => {
  const body = {
    session: {
      name: session.name,
      description: session.description
    }
  }

  fetch(`${BASE_URL}/sessions`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  })
    .then(response => {
      if (response.ok)
        return response.json()
      throw new Error("Network response was not ok.")
    })
    .then(response => {
      if (response.errors) {
        updateSessionForm({errors: response.errors})
      } else {
        updateSessionForm({responseSuccess: true, id: response.data.id})
        // TODO: Send the user to a session show/management page and remove fetchSessions from below
        fetchSessions()
      }
    })
    .catch(error => console.log(error.message))
}
