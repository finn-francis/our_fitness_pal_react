import {EventEmitter} from 'events'
import dispatcher from '../../dispatcher/AppDispatcher'

class SelectedStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.selectedExercise = {
      id: null,
      name: '',
      description: ''
    }
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

  handleActions(action) {
    switch (action.type) {
      case 'updateSelectedExercise':
        this.updateSelectedExercise(action.exercise)
        break
      default:
        break
    }
  }
}

const selectedStore = new SelectedStore()
dispatcher.register(selectedStore.handleActions.bind(selectedStore))

export default selectedStore
