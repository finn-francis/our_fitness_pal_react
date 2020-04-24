import { EventEmitter } from "events"
import dispatcher from '../dispatcher/AppDispatcher'
import { Dispatcher } from "flux"

class AppStore extends EventEmitter {
  constructor() {
    super()
    this.state = {
      currentUser: {
        id: 1,
        email: "finnfrancis@gmail.com"
      }
    }
  }

  // In order to use this store the following code can be used:
  // import AppStore from '../stores/AppStore'
  // constructor(props) {
  //   super(props)
  //   this.state = AppStore.getAll()
  // }

  getAll() {
    return this.state
  }

  setCurrentUser(user) {
    this.state.currentUser = user
    // This means that on change someone else can get this event like this:
    // componentWillMount() {
    //   AppStore.on("change", () => {
    //     this.setState(AppStore.getAll())
    //   })
    // }
    this.emit("change")
  }

  handleActions(action) {
    switch(action.type) {
      case "setCurrentUser": {
        this.setCurrentUser(action.currentUser)
      }
    }
  }
}

const appStore = new AppStore

// This sets up a listener for any actions sent through dispatcher like this:
// dispatcher.dispatch({type: "setCurrentUser", currentUser: {id: 2, email: "person@email.com"}})
dispatcher.register(appStore.handleActions.bind(appStore))

export default appStore
