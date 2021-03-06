import {EventEmitter} from "events";
import dispatcher from "../../dispatcher/AppDispatcher"

class AuthorizedStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.reset()
  }

  get() {
    return this.state
  }

  reset() {
    this.state = {
      status: 200,
      redirectToLogin: false,
      redirectToHome: false
    }
  }

  unauthorized() {
    this.state = {
      status: 401,
      redirectToLogin: true
    }

    this.emit('change')
  }

  forbidden() {
    this.state = {
      status: 403,
      redirectToHome: true
    }

    this.emit('change')
  }

  handleActions(action) {
    switch (action.type) {
      case 'resetAuthorizedState':
        this.reset()
        this.emit('change')
        break
      case 'setUnauthorizedState':
        this.unauthorized()
        break
      case 'setForbiddenState':
        this.forbidden()
        break
      default:
        break
    }
  }
}

const authorizedStore = new AuthorizedStore()
dispatcher.register(authorizedStore.handleActions.bind(authorizedStore))

export default authorizedStore
