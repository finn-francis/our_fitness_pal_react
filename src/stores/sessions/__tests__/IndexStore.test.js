import IndexStore from '../IndexStore'
import sessions from '../../../../cypress/fixtures/sessions/all.json'

describe('IndexStore', () => {
  afterEach(() => IndexStore.sessions = [])

  describe('#getAll', () => {
    beforeEach(() => IndexStore.sessions = sessions)

    it('should return a list of sessions', () => {
      expect(IndexStore.getAll()).toEqual(sessions)
    })
  })

  describe('#setSessions', () => {
    it('should update the list of sessions', () => {
      expect(IndexStore.getAll()).toEqual([])
      IndexStore.setSessions(sessions)

      expect(IndexStore.getAll()).toEqual(sessions)
    })
  })

  describe('#removeSession', () => {
    beforeEach(() => {
      IndexStore.sessions = sessions
    })

    it('should remove the given session from the list', () => {
      IndexStore.removeSession(sessions[0].id)
      expect(IndexStore.sessions).toEqual(sessions.slice(1))
    })
  })

  describe('#handleActions', () => {
    describe('with setSessions as an argument', () => {
      expect(IndexStore.getAll()).toEqual([])
      IndexStore.handleActions({type: 'setSessions', sessions: sessions})

      expect(IndexStore.getAll()).toEqual(sessions)
    })

    describe('with removeSession as an argument', () => {
      beforeEach(() => {
        IndexStore.sessions = sessions
      })

      it('should remove the given session from the list', () => {
        IndexStore.handleActions({type: "removeSession", id: sessions[0].id})
        expect(IndexStore.sessions).toEqual(sessions.slice(1))
      })
    })
  })
})
