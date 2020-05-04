import {BASE_URL} from '../../constants/AppConstants'
import {setSessions} from '../../actions/SessionActions'

export const fetchSessions = () => {
  fetch(`${BASE_URL}/sessions`)
    .then(response => {
      if (response.ok)
        return response.json()
      throw new Error("Network response was not ok.")})
    .then(response => setSessions(response.data))
    .catch(error => console.log(error.message))
}