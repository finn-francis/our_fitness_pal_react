import dispatcher from "../dispatcher/AppDispatcher"

export const setExercises = (exercises) => {
  dispatcher.dispatch({
    type: 'setExercises',
    exercises: exercises
  })
}
