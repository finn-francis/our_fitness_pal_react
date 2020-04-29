import {BASE_URL} from '../../constants/AppConstants'
import {setExercises} from '../../actions/ExerciseActions'

export const fetchExerciseIndex = () => {
  fetch(`${BASE_URL}/exercises`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(response => setExercises(response.exercises))
    .catch(error => console.log(error.message))
}
