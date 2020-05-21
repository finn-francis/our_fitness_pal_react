import Cookies from 'js-cookie'
import _ from 'lodash'
import {setUnauthorizedState, setForbiddenState} from '../actions/AuthActions'

export const authorisedHeaders = () => {
  let token = Cookies.get('token')

  return (
    {
      'Authorization': 'Bearer ' + token,
      "Content-Type": "application/json"
    }
  )
}

export const defaultHeaders = () => {
  return (
    {
      "Content-Type": "application/json"
    }
  )
}

export const handleErrors = (error) => {
  switch (_.get(error, ['response', 'status'])) {
    case 401:
      setUnauthorizedState()
      break
    case 403:
      setForbiddenState()
      break
    default:
      console.log(error.nessage)
  }
}
