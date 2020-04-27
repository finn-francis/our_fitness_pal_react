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

  handleActions(action) {
    switch(action.type) {
      case "setExercises":
        this.setExercises(action.exercises)
        break;
      default:
        break;
    }
  }
}

const indexStore = new IndexStore()
dispatcher.register(indexStore.handleActions.bind(indexStore))

export default indexStore
