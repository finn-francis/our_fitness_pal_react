import { EventEmitter } from "events"
import dispatcher from '../dispatcher/AppDispatcher'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

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

  getAll() {
    return Cookies.getJSON('user')
  }

  setCurrentUser(response) {
    Cookies.set('token', response.jwt)
    Cookies.set('user', response.user)
    this.emit("change")
  }

  clearCurrentUser() {
    Cookies.remove('token')
    Cookies.remove('user')
    toast.success("Signed out succesfully", {
      position: toast.POSITION.BOTTOM_RIGHT
    })
    this.emit("change")
  }

  handleActions(action) {
    switch(action.type) {
      case "setCurrentUser":
        this.setCurrentUser(action.user)
        break
      case "clearCurrentUser":
        this.clearCurrentUser(action.user)
        break
      default:
        break
    }
  }
}

const authStore = new AuthStore()

// This sets up a listener for any actions sent through dispatcher like this:
// dispatcher.dispatch({type: "setCurrentUser", currentUser: {id: 2, email: "person@email.com"}})
dispatcher.register(authStore.handleActions.bind(authStore))

export default authStore
