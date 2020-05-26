import {EventEmitter} from 'events'
import dispatcher from '../../dispatcher/AppDispatcher'

class FormStore extends EventEmitter {
  constructor(props) {
    super(props)
    this.clearSet()
  }

  clearSet() {
    this.setObjects = []
    this.setObjects.push({
      id: null,
      name: "",
      set_exercises: [],
      errors: {},
      formAction: 'new',
      responseSuccess: null
    })
  }

  getAll() {
    return this.setObjects
  }

  setSetForms(sets) {
    this.setObjects = sets
    this.emit('change')
  }

  updateSetForm(index, set) {
    for (const [key, value] of Object.entries(set)) {
      if (key.includes("set_exercises")) {
        const attributes = key.split('|')
        const setExercise = attributes[0]
        const setExerciseIndex = attributes[1]
        const setExerciseAttribute = attributes[2]
        this.setObjects[index][setExercise][setExerciseIndex][setExerciseAttribute] = value
      } else {
        this.setObjects[index][key] = value
      }
    }
    this.emit("change")
  }

  handleActions(action) {
    switch(action.type) {
      case "setSetForms":
        this.setSetForms(action.sets)
        break
      case "clearSetForm":
        this.clearSet()
        this.emit("change")
        break
      case "updateSetForm":
        this.updateSetForm(action.index, action.set)
        break
      default:
        break
    }
  }
}

const formStore = new FormStore()
dispatcher.register(formStore.handleActions.bind(formStore))

export default formStore
