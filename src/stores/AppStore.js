import { EventEmitter } from "events"

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
}

const appStore = new AppStore

export default appStore
