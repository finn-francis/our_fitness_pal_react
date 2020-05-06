import dispatcher from "../dispatcher/AppDispatcher"

// Gives us an action to call for setCurrentUser
// Usage:
// import {setCurrentUser} from '../actions/AuthActions'
// const user = {id: 3, email: "user@email.com"}
// setCurrentUser(user)
export const setCurrentUser = (user) => {
  dispatcher.dispatch({
    type: 'setCurrentUser',
    user: user
  })
}
