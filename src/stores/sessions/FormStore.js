import {EventEmitter} from 'events'
import dispatcher from '../../dispatcher/AppDispatcher'

class FormStore extends EventEmitter {
  constructor(props) {
    super(props)
    this.clearSession()
  }

  clearSession() {
    this.sessionObject = {
      id: null,
      name: "",
      description: "",
      errors: {},
      formAction: 'new',
      responseSuccess: null
    }
  }

  get() {
    return this.sessionObject
  }

  updateSessionForm(session) {
    for (const [key, value] of Object.entries(session)) {
      this.sessionObject[key] = value
    }
    this.emit("change")
  }

  handleActions(action) {
    switch(action.type) {
      case "setSession":
        this.updateSessionForm(action.session)
        break
      case "clearSessionForm":
        this.clearSession()
        this.emit("change")
        break
      case "updateSessionForm":
        this.updateSessionForm(action.session)
        break
      default:
        break
    }
  }
}

const formStore = new FormStore()
dispatcher.register(formStore.handleActions.bind(formStore))

export default formStore
