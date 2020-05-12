import FormStore from '../FormStore'

const emptyExercise = {
  id: null,
  name: "",
  description: "",
  errors: {},
  formAction: 'new',
  responseSuccess: null
}

afterEach(() => {
  FormStore.exerciseObject = emptyExercise
})

describe('getAll', () => {
  describe('initial state', () => {
    it('should return an empty form object', () => {
      expect(FormStore.getAll()).toEqual(emptyExercise)
    })
  })

  describe('when the state has been altered', () => {
    beforeEach(() => {
      FormStore.exerciseObject = 'object'
    })

    it('should return the altered form object', () => {
      expect(FormStore.getAll()).toEqual('object')
    })
  })
})

describe('updateExerciseform', () => {
  it('should update the exercise object with new values', () => {
    FormStore.updateExerciseForm({name: 'My new name', formAction: 'edit'})
    expect(FormStore.exerciseObject.name).toEqual('My new name')
    expect(FormStore.exerciseObject.formAction).toEqual('edit')
  })
})
