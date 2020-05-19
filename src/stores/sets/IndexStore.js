import {EventEmitter} from 'events'
import dispatcher from '../../dispatcher/AppDispatcher'

class IndexStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.sets = []
  }

  getAll() {
    return this.sets
  }

  setSets(sets) {
    this.sets = sets
    this.emit('change')
  }

  removeSet(id) {
    this.sets = this.sets.filter(sets => sets.id !== id)
    this.emit("change")
  }

  handleActions(action) {
    switch(action.type) {
      case "setSets":
        this.setSets(action.sets)
        break
      case "removeSet":
        this.removeSet(action.id)
        break
      default:
        break
    }
  }
}

const indexStore = new IndexStore()
dispatcher.register(indexStore.handleActions.bind(indexStore))

export default indexStore