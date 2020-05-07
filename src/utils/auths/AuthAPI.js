import {BASE_URL} from '../../constants/AppConstants'
import {updateSignUpForm, setCurrentUser} from '../../actions/AuthActions'
import { toast } from 'react-toastify';
import {defaultHeaders} from '../authorised_request.js'

const sendUserRequest = (url, method, body) => {
  fetch(url, {
    method: method,
    headers: defaultHeaders(),
    body: JSON.stringify(body)
  })
    .then(response => {
      if (response.ok)
        return response.json()
      throw new Error("Network response was not ok.")
    })
    .then(response => {
      if (response.errors) {
        updateSignUpForm({errors: response.errors})
      } else {
        setCurrentUser(response)
        toast.success(response.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    })
    .catch(error => console.log(error.message))
}

export const createUser = (user) => {
  const body = {
    user: {
      email: user.email,
      password: user.password,
      password_confirmation: user.passwordConfirmation
    }
  }
  sendUserRequest(`${BASE_URL}/users`, 'POST', body)
}

export const signInUser = (user) => {
  const body = {
    user: {
      email: user.email,
      password: user.password,
    }
  }
  sendUserRequest(`${BASE_URL}/sign_in`, 'POST', body)
}
