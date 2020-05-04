import { EventEmitter } from "events"
import dispatcher from '../dispatcher/AppDispatcher'
import Cookies from 'js-cookie'

class AuthStore extends EventEmitter {
  constructor() {
    super()
    this.auth = {
      currentUser: {
        id: '',
        email: ''
      }
    }
  }

  // In order to use this store the following code can be used:
  // import AuthStore from '../stores/AuthStore'
  // constructor(props) {
  //   super(props)
  //   this.state = AuthStore.getAll()
  // }

  getAll() {
    return this.auth
  }

  setCurrentUser(response) {
    Cookies.set('token', response.jwt)
    Cookies.set('user', response.user)
    this.emit("change")
  }

  handleActions(action) {
    switch(action.type) {
      case "setCurrentUser":
        this.setCurrentUser(action.user)
        break;
      default:
        break;
    }
  }
}

const authStore = new AuthStore()

// This sets up a listener for any actions sent through dispatcher like this:
// dispatcher.dispatch({type: "setCurrentUser", currentUser: {id: 2, email: "person@email.com"}})
dispatcher.register(authStore.handleActions.bind(authStore))

export default authStore
