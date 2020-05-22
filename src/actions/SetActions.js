import dispatcher from '../dispatcher/AppDispatcher'

export const setSets = (sets) => {
  dispatcher.dispatch({
    type: 'setSets',
    sets: sets
  })
}

export const setSetForms = (sets) => {
  dispatcher.dispatch({
    type: 'setSetForms',
    sets: sets
  })
}

export const updateSetForm = (index, set) => {
  dispatcher.dispatch({
    index: index,
    type: 'updateSetForm',
    set: set
  })
}
