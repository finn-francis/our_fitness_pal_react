import axios from 'axios'
import {BASE_URL} from '../../constants/AppConstants'
import {setSets, setSetForms} from '../../actions/SetActions'
import {authorisedHeaders} from '../authorised_request.js'

export const fetchSets = (session_id) => {
  axios.get(`${BASE_URL}/sessions/${session_id}/sets`, {
    headers: authorisedHeaders()
  })
    .then(({data, statusText}) => {
      if (statusText === 'OK') {
        setSets(data.sets)
        setSetForms(data.sets)
      } else {
        throw new Error("Network response was not ok.")
      }
    })
    .catch(error => console.log(error.message))
}

export const createSet = (session_id, set) => {
  const body = {
    set: {
      name: set.name,
      set_exercises: set.set_exercises
    }
  }

  axios({
    url: `${BASE_URL}/sessions/${session_id}/sets`,
    method: 'POST',
    headers: authorisedHeaders(),
    data: JSON.stringify(body)
  })
    .then(({data, statusText}) => {
      if (statusText === 'OK') {
        if (data.errors) {
          setSetForms({errors: data.errors})
        }
      } else {
        throw new Error("Network response was not ok.")
      }
    })
    .catch(error => console.log(error.message))
}
