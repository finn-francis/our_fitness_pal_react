import {BASE_URL} from '../../constants/AppConstants'
import {setExercises, updateExerciseForm, appendExercise, updateEditedExercise, removeExercise, clearSelectedExercise} from '../../actions/ExerciseActions'
import { toast } from 'react-toastify'
import {authorisedHeaders, handleErrors} from '../authorised_request.js'
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

  axios({
    url: url,
    method: method,
    headers: authorisedHeaders(),
    data: JSON.stringify(body)
  })
    .then(({data, statusText}) => {
      if (statusText === "OK") {
        if (data.errors) {
          updateExerciseForm({errors: data.errors})
        } else {
          updateExerciseForm({responseSuccess: true})
          toastNotification(data.message)

          if (method === 'POST') {
            appendExercise(data.exercise)
          } else {
            updateEditedExercise(data.exercise)
          }
        }
      } else {
        throw new Error("Network response was not ok.")
      }
    })
    .catch(error => {
      updateExerciseForm({closeForm: true})
      handleErrors(error)
    })
}

const toastNotification = (message) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT
  })
}

export const createExercise = (exercise) => {
  sendExerciseRequest(exercise, `${BASE_URL}/exercises`, 'POST')
}

export const updateExercise = (exercise) => {
  sendExerciseRequest(exercise, `${BASE_URL}/exercises/${exercise.id}`, 'PUT')
}

export const deleteExercise = (exerciseId) => {
  axios.delete(`${BASE_URL}/exercises/${exerciseId}`, {
    headers: authorisedHeaders()
  })
    .then(({data, statusText}) => {
      if (statusText === 'OK') {
        clearSelectedExercise()
        removeExercise(data.exercise.id)
        toastNotification(data.message)
      } else {
        throw new Error("Network response was not ok.")
      }
    })
    .catch(error => handleErrors(error))
}
