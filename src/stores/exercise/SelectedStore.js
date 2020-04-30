import {EventEmitter} from 'events'
import dispatcher from '../../dispatcher/AppDispatcher'

class SelectedStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.clearSelectedExercise()
  }

  get() {
    return this.selectedExercise
  }

  updateSelectedExercise(exercise) {
    for (const [key, value] of Object.entries(exercise)) {
      this.selectedExercise[key] = value
    }
    this.emit("change")
  }

  clearSelectedExercise() {
    this.selectedExercise = {
      id: null,
      name: '',
      description: ''
    }
  }

  handleActions(action) {
    switch (action.type) {
      case 'updateSelectedExercise':
        this.updateSelectedExercise(action.exercise)
        break
      case 'clearSelectedExercise':
        this.clearSelectedExercise()
        this.emit("change")
        break
      default:
        break
    }
  }
}

const selectedStore = new SelectedStore()
dispatcher.register(selectedStore.handleActions.bind(selectedStore))

export default selectedStore
