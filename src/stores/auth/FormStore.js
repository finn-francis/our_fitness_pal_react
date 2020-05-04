import {EventEmitter} from "events"
import dispatcher from "../../dispatcher/AppDispatcher"

class FormStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.clearUser()
  }

  clearUser() {
    this.userObject = {
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: {},
      formAction: 'new',
      responseSuccess: null
    }
  }

  getAll() {
    return this.userObject
  }

  updateSignUpForm(user) {
    for (const [key, value] of Object.entries(user)) {
      this.userObject[key] = value
    }
    this.emit("change")
  }

  handleActions(action) {
    switch(action.type) {
      case "updateSignUpForm":
        this.updateSignUpForm(action.user)
        break
      case "clearFormUser":
        this.clearUser()
        this.emit("change")
        break
      default:
        break
    }
  }
}

const formStore = new FormStore()
dispatcher.register(formStore.handleActions.bind(formStore))

export default formStore
