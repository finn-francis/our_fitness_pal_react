import {BASE_URL} from '../../constants/AppConstants'
import {updateSignUpForm, setCurrentUser} from '../../actions/AuthActions'
import Cookies from 'js-cookie'

const sendUserRequest = (user, url, method) => {
  const body = {
    user: {
      email: user.email,
      password: user.password,
      password_confirmation: user.passwordConfirmation
    }
  }

  fetch(url, {
    method: method,
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
        updateSignUpForm({errors: response.errors})
      } else {
        Cookies.set('token', response.jwt)
        setCurrentUser(response.user)
      }
    })
    .catch(error => console.log(error.message))
}

export const createUser = (user) => {
  sendUserRequest(user, `${BASE_URL}/users`, 'POST')
}
