import Cookies from 'js-cookie'
import _ from 'lodash'
import {setUnauthorizedState} from '../actions/AuthActions'

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
  if (_.get(error, ['response', 'status']) === 401) {
    setUnauthorizedState()
  } else {
    console.log(error.message)
  }
}
