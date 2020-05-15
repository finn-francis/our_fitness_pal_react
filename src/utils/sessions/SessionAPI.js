import axios from 'axios'
import {BASE_URL} from '../../constants/AppConstants'
import {setSessions, updateSessionForm, setSession, clearSelectedSession, removeSession} from '../../actions/SessionActions'
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

  axios({
    url: `${BASE_URL}/sessions`,
    method: 'POST',
    headers: authorisedHeaders(),
    data: JSON.stringify(body)
  })
    .then(({data, statusText}) => {
      if (statusText === 'OK') {
        if (data.errors) {
          updateSessionForm({errors: data.errors})
        } else {
          updateSessionForm({responseSuccess: true, id: data.session.id})
        }
      } else {
        throw new Error("Network response was not ok.")
      }
    })
    .catch(error => console.log(error.message))
}

export const fetchSession = (id) => {
  axios.get(`${BASE_URL}/sessions/${id}`, {
    headers: authorisedHeaders()
  })
    .then(({data, statusText}) => {
      if (statusText === 'OK') {
        setSession(data.session)
        updateSessionForm({...data.session, formAction: 'edit'})
      } else {
        throw new Error("Network response was not ok")
      }
    })
    .catch(error => console.log(error.message))
}

export const updateSession = (session) => {
  const body = {
    session: {
      name: session.name,
      description: session.description
    }
  }

  axios({
    url: `${BASE_URL}/sessions/${session.id}`,
    method: 'PUT',
    headers: authorisedHeaders(),
    data: JSON.stringify(body)
  })
    .then(({data, statusText}) => {
      if (statusText === 'OK') {
        if (data.errors) {
          updateSessionForm({errors: data.errors})
        } else {
          updateSessionForm({responseSuccess: true, id: data.session.id})
          setSession(data.session)
        }
      } else {
        throw new Error("Network response was not ok.")
      }
    })
    .catch(error => console.log(error.message))
}

export const deleteSession = (id) => {
  axios.delete(`${BASE_URL}/sessions/${id}`, {
    headers: authorisedHeaders()
  })
    .then(({data, statusText}) => {
      if (statusText === 'OK') {
        clearSelectedSession()
        removeSession(data.session.id)
      } else {
        throw new Error("Network response was not ok.")
      }
    })
    .catch(error => console.log(error.message))
}
