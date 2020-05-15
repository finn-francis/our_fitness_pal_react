import dispatcher from '../dispatcher/AppDispatcher'

export const setSessions = (sessions) => {
  dispatcher.dispatch({
    type: 'setSessions',
    sessions: sessions
  })
}

export const clearSessionForm = () => {
  setTimeout(() => {
    dispatcher.dispatch({type: 'clearSessionForm'})
  }, 1)
}

export const updateSessionForm = (session) => {
  dispatcher.dispatch({
    type: 'updateSessionForm',
    session: session
  })
}

export const setSession = (session) => {
  dispatcher.dispatch({
    type: 'setSession',
    session: session
  })
}
