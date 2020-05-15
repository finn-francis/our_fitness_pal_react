import {EventEmitter} from 'events'
import dispatcher from '../../dispatcher/AppDispatcher'

class IndexStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.sessions = []
  }

  getAll() {
    return this.sessions
  }

  setSessions(sessions) {
    this.sessions = sessions
    this.emit('change')
  }

  removeSession(id) {
    this.sessions = this.sessions.filter(session => session.id !== id)
    this.emit("change")
  }

  handleActions(action) {
    switch(action.type) {
      case "setSessions":
        this.setSessions(action.sessions)
        break
      case "removeSession":
        this.removeSession(action.id)
        break
      default:
        break
    }
  }
}

const indexStore = new IndexStore()
dispatcher.register(indexStore.handleActions.bind(indexStore))

export default indexStore