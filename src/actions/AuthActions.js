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

export const updateSignInForm = (user) => {
  dispatcher.dispatch({
    type: 'updateSignInForm',
    user: user
  })
}

export const clearFormUser = (user) => {
  setTimeout(() => {
    dispatcher.dispatch({
      type: 'clearFormUser',
      user: user
    })
  })
}

export const clearCurrentUser = () => {
  setTimeout(() => {
    dispatcher.dispatch({
      type: 'clearCurrentUser'
    })
  })
}

export const setUnauthorizedState = () => {
  dispatcher.dispatch({type: 'setUnauthorizedState'})
}
