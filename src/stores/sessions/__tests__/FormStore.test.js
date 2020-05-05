import FormStore from '../FormStore'

describe('FormStore', () => {
  const emptySession = {
    id: null,
    name: "",
    description: "",
    errors: {},
    formAction: 'new',
    responseSuccess: null
  }

  const fullSession = {
    id: null,
    name: "Leg Day",
    description: "this is the day we do legs",
    errors: {},
    formAction: 'new',
    responseSuccess: null
  }

  afterEach(() => FormStore.clearSession())

  describe('#get', () => {
    describe('when it is empty', () => {
      expect(FormStore.get()).toEqual(emptySession)
    })

    describe('when there is a session object', () => {
      beforeEach(() => FormStore.sessionObject = fullSession)

      it('should return the current form object', () => {
        expect(FormStore.get()).toEqual(fullSession)
      })
    })
  })

  describe('#updateSessionForm', () => {
    it('should update attributes on the session object', () => {
      let values = ["a", "b", "c", "d"]
      values.forEach(value => {
        FormStore.updateSessionForm({name: value, description: value})
        expect(FormStore.get().name).toEqual(value)
        expect(FormStore.get().description).toEqual(value)
      })
    })
  })

  describe('#handleActions', () => {
    describe('with setSession as an argument', () => {
      expect(FormStore.get()).toEqual(emptySession)
      FormStore.handleActions({type: 'setSession', session: fullSession})

      let newSession = FormStore.get()
      expect(newSession.id).toEqual(fullSession.id)
      expect(newSession.name).toEqual(fullSession.name)
      expect(newSession.description).toEqual(fullSession.description)
    })

    describe('with clearSessionForm as an argument', () => {
      FormStore.sessionObject = fullSession

      FormStore.handleActions({type: "clearSessionForm"})
      expect(FormStore.get()).toEqual(emptySession)
    })
  })
})
