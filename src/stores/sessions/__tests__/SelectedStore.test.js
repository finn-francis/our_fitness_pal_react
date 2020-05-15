import SelectedStore from '../SelectedStore'

const emptySession = {
  id: null,
  name: '',
  description: ''
}
let session = {id: 1, name: 'Leg day', description: 'Lots of squats'}

describe('SelectedStore', () => {
  afterEach(() => SelectedStore.session = {...emptySession})
  describe('get', () => {
    describe('by default', () => {
      it('should return an empty store', () => {
        expect(SelectedStore.get()).toEqual(emptySession)
      })
    })

    describe('when a session has been set', () => {
      it('should return the selected session', () => {
        expect(SelectedStore.get()).toEqual(emptySession)
        SelectedStore.session = session
        expect(SelectedStore.get()).toEqual(session)
      })
    })
  })

  describe('updateSelectedSession', () => {
    it('should update the session object with the sent in session', () => {
      expect(SelectedStore.session).toEqual(emptySession)
      SelectedStore.updateSelectedSession(session)
      expect(SelectedStore.session).toEqual(session)
    })
  })

  describe('clearSession', () => {
    beforeEach(() => {
      SelectedStore.session = session
      expect(SelectedStore.session).toEqual(session)
    })

    it('should change the session back to an empty session', () => {
      SelectedStore.clearSession()
      expect(SelectedStore.session).toEqual(emptySession)
    })
  })

  describe('handleActions', () => {
    describe('with updateSelectedSession as an argument', () => {
      it('should update the session object with the sent in session', () => {
        expect(SelectedStore.session).toEqual(emptySession)
        SelectedStore.handleActions({type: "updateSelectedSession", session: session})
        expect(SelectedStore.session).toEqual(session)
      })
    })
  })

  describe('with clearSelectedSession as an argument', () => {
    beforeEach(() => {
      SelectedStore.session = session
      expect(SelectedStore.session).toEqual(session)
    })

    it('should change the session back to an empty session', () => {
      SelectedStore.handleActions({type: "clearSelectedSession"})
      expect(SelectedStore.session).toEqual(emptySession)
    })
  })
})