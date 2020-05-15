import {EventEmitter} from 'events'
import dispatcher from '../../dispatcher/AppDispatcher'

class SelectedStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.clearSession()
  }

  clearSession() {
    this.session = {
      id: null,
      name: '',
      description: ''
    }
  }

  get() {
    return this.session
  }

  updateSelectedSession(session) {
    for(const [key, value] of Object.entries(session)) {
      this.session[key] = value
    }
    this.emit('change')
  }

  handleActions(action) {
    switch (action.type) {
      case "clearSelectedSession":
        this.clearSession()
        this.emit("change")
        break
      case "updateSelectedSession":
        this.updateSelectedSession(action.session)
        break
      default:
        break
    }
  }
}

const selectedStore = new SelectedStore()
dispatcher.register(selectedStore.handleActions.bind(selectedStore))

export default selectedStore
