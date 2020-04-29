import {BASE_URL} from '../../constants/AppConstants'
import {setExercises, updateExerciseForm} from '../../actions/ExerciseActions'

export const fetchExerciseIndex = () => {
  fetch(`${BASE_URL}/exercises`)
    .then(response => {
      if (response.ok)
        return response.json()
      throw new Error("Network response was not ok.")
    })
    .then(response => setExercises(response.exercises))
    .catch(error => console.log(error.message))
}

export const createExercise = (exercise) => {
  const body = {
    exercise: {
      name: exercise.name,
      description: exercise.description
    }
  }

  fetch(`${BASE_URL}/exercises`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body)
  })
    .then(response => {
      if (response.ok)
        return response.json()
      throw new Error("Network response was not ok.")
    })
    .then(response => {
      if (response.errors) {
        updateExerciseForm({errors: response.errors})
      } else {
        updateExerciseForm({responseSuccess: true})
        setExercises(response.exercises)
      }
    })
    .catch(error => console.log(error.message))
}
