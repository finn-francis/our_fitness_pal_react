import {EventEmitter} from 'events'

class IndexStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.sessions = []
  }

  getAll() {
    return this.sessions
  }
}

const indexStore = new IndexStore()

export default indexStore