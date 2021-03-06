import sessionsFixture from '../../../../cypress/fixtures/sessions/all.json'
import ShowStore from '../ShowStore'

describe('ShowStore', () => {
  const session = sessionsFixture[0]

  describe('#get', () => {
    beforeEach(() => {
      ShowStore.session = session
    })

    it('should return the current store object', () => {
      let storedSession = ShowStore.get('session')
      expect(session.id).toEqual(storedSession.id)
      expect(session.name).toEqual(storedSession.name)
      expect(session.description).toEqual(storedSession.description)
    })
  })

  describe('#setSession', () => {
    beforeEach(() => {
      ShowStore.session = {}
    })

    it('should set the session object', () => {
      expect(ShowStore.session).toEqual({})
      ShowStore.setSession(session)
      expect(ShowStore.session).toEqual(session)
    })
  })

  describe('#removeSession', () => {
    it('should set isDeleted to true', () => {
      expect(ShowStore.session.isDeleted).toEqual(undefined)
      ShowStore.removeSession()
      expect(ShowStore.session.isDeleted).toEqual(true)
    })
  })

  describe('#handleActions', () => {
    describe('with setSession as an action', () => {
      beforeEach(() => {
        ShowStore.session = {}
      })

      it('should set the session object', () => {
        expect(ShowStore.session).toEqual({})
        ShowStore.handleActions({type: 'setSession', session: session})
        expect(ShowStore.session).toEqual(session)
      })
    })

    describe('with removeSession as an argument', () => {
      beforeEach(() => {
        ShowStore.session = {}
      })
      it('should set isDeleted to true', () => {
        expect(ShowStore.session.isDeleted).toEqual(undefined)
        ShowStore.handleActions({type: "removeSession"})
        expect(ShowStore.session.isDeleted).toEqual(true)
      })
    })
  })
})