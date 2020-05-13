import { EventEmitter } from "events"
import dispatcher from '../../dispatcher/AppDispatcher'

class IndexStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.exercises = []
  }

  getAll() {
    return this.exercises
  }

  setExercises(exercises) {
    this.exercises = exercises
    this.emit("change")
  }

  appendExercise(exercise) {
    this.exercises.push(exercise)
    this.emit("change")
  }

  updateEditedExercise(exercise) {
    let oldExercise = this.exercises.find(e => e.id === exercise.id)
    this.exercises[this.exercises.indexOf(oldExercise)] = exercise
    this.emit("change")
  }

  removeExercise(id) {
    this.exercises = this.exercises.filter(exercise => exercise.id !== id)
    this.emit("change")
  }

  handleActions(action) {
    switch(action.type) {
      case "setExercises":
        this.setExercises(action.exercises)
        break
      case "appendExercise":
        this.appendExercise(action.exercise)
        break
      case "updateEditedExercise":
        this.updateEditedExercise(action.exercise)
        break
      default:
        break
    }
  }
}

const indexStore = new IndexStore()
dispatcher.register(indexStore.handleActions.bind(indexStore))

export default indexStore
