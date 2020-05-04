import dispatcher from "../dispatcher/AppDispatcher"

export const setCurrentUser = (user) => {
  dispatcher.dispatch({
    type: 'setCurrentUser',
    user: user
  })
}

export const updateSignUpForm = (user) => {
  dispatcher.dispatch({
    type: 'updateSignUpForm',
    user: user
  })
}
