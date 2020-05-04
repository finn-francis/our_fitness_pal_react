import dispatcher from '../dispatcher/AppDispatcher'

export const setSessions = (sessions) => {
  dispatcher.dispatch({
    type: 'setSessions',
    sessions: sessions
  })
}
