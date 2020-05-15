import {EventEmitter} from "events"
import dispatcher from '../../dispatcher/AppDispatcher'

class ShowStore extends EventEmitter {
  constructor(props) {
    super(props)
    this.session = {
      id: null,
      name: '',
      description: ''
    }
  }

  get() {
    return this.session
  }

  setSession(session) {
    this.session = session
    this.emit('change')
  }

  removeSession() {
    this.session.isDeleted = true
    this.emit('change')
  }

  handleActions(action) {
    switch (action.type) {
      case 'setSession':
        this.setSession(action.session)
        break
      case 'removeSession':
        this.removeSession()
        break
      default:
        break
    }
  }
}

const showStore = new ShowStore()
dispatcher.register(showStore.handleActions.bind(showStore))

export default showStore
