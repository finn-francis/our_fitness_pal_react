import {EventEmitter} from "events"
import dispatcher from "../../dispatcher/AppDispatcher"

class FormStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.clearExercise()
  }

  clearExercise() {
    this.exerciseObject = {
      id: null,
      name: "",
      description: "",
      errors: {}
    }
    this.emit("change")
  }

  getAll() {
    return this.exerciseObject
  }

  updateExerciseForm(exercise) {
    for (const [key, value] of Object.entries(exercise)) {
      this.exerciseObject[key] = value
    }
    this.emit("change")
  }

  handleActions(action) {
    switch(action.type) {
      case "updateExerciseForm":
        this.updateExerciseForm(action.exercise)
        break
        case "clearFormExercise":
          this.clearExercise()
          break
      default:
        break
    }
  }
}

const formStore = new FormStore()
dispatcher.register(formStore.handleActions.bind(formStore))

export default formStore
