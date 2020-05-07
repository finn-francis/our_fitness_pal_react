import {BASE_URL} from '../../constants/AppConstants'
import {setExercises, updateExerciseForm} from '../../actions/ExerciseActions'
import { toast } from 'react-toastify';
import {authorisedHeaders} from '../authorised_request.js'
import axios from 'axios'

export const fetchExerciseIndex = () => {
  axios.get(`${BASE_URL}/exercises`)
    .then(response => {
      if (response.statusText === "OK")
        return setExercises(response.data.exercises)
      throw new Error("Network response was not ok.")
    })
    .catch(error => console.log(error.message))
}

const sendExerciseRequest = (exercise, url, method) => {
  const body = {
    exercise: {
      name: exercise.name,
      description: exercise.description
    }
  }

  fetch(url, {
    method: method,
    headers: authorisedHeaders(),
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
        toastNotification(response.message)
      }
    })
    .catch(error => console.log(error.message))
}

const toastNotification = (message) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
}

export const createExercise = (exercise) => {
  sendExerciseRequest(exercise, `${BASE_URL}/exercises`, 'POST')
}

export const updateExercise = (exercise) => {
  sendExerciseRequest(exercise, `${BASE_URL}/exercises/${exercise.id}`, 'PUT')
}

export const deleteExercise = (exerciseId) => {
  fetch(`${BASE_URL}/exercises/${exerciseId}`, {
    method: "DELETE",
    headers: authorisedHeaders()
  })
    .then(response => {
      if (response.ok)
        return response.json()
      throw new Error("Network response not ok.")
    })
    .then(response => {
      if (response.errors) {
        // TODO (Finn): Add toast notifications
        console.log(response.errorss)
      } else {
        setExercises(response.exercises)
        toastNotification(response.message)
      }
    })
}
