import { EventEmitter } from "events"
import dispatcher from '../dispatcher/AppDispatcher'

class AuthStore extends EventEmitter {
  constructor() {
    super()
    this.auth = {
      currentUser: {
        id: 1,
        email: "finnfrancis@gmail.com"
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

  setCurrentUser(user) {
    this.auth.currentUser = user
    // This means that on change someone else can get this event like this:
    // componentWillMount() {
    //   AuthStore.on("change", () => {
    //     this.setState(AuthStore.getAll())
    //   })
    // }
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
