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

export const clearSelectedSession = () => {
  dispatcher.dispatch({type: 'clearSelectedSession'})
}

export const updateSelectedSession = (session) => {
  dispatcher.dispatch({
    type: 'updateSelectedSession',
    session: session
  })
}

export const removeSession = (id) => {
  dispatcher.dispatch({
    type: 'removeSession',
    id: id
  })
}
