import dispatcher from '../dispatcher/AppDispatcher'

export const setSessions = (sessions) => {
  dispatcher.dispatch({
    type: 'setSessions',
    sessions: sessions
  })
}

export const clearSessionForm = () => {
  dispatcher.dispatch({type: 'clearSessionForm'})
}

export const updateSessionForm = (session) => {
  dispatcher.dispatch({
    type: 'updateSessionForm',
    session: session
  })
}
