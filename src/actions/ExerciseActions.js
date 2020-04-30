import dispatcher from "../dispatcher/AppDispatcher"

export const setExercises = (exercises) => {
  dispatcher.dispatch({
    type: 'setExercises',
    exercises: exercises
  })
}

export const updateExerciseForm = (exercise) => {
  dispatcher.dispatch({
    type: 'updateExerciseForm',
    exercise: exercise
  })
}

export const clearFormExercise = () => {
  setTimeout(() => {
    dispatcher.dispatch({type: 'clearFormExercise'})
  }, 1)
}

export const updateSelectedExercise = (exercise) => {
  dispatcher.dispatch({
    type: "updateSelectedExercise",
    exercise: exercise
  })
}

export const clearSelectedExercise = () => {
  dispatcher.dispatch({type: "clearSelectedExercise"})
}
