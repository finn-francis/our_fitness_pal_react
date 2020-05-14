import IndexStore from '../IndexStore'

describe('IndexStore', () => {
  let sessions = [{id: 1, name: 'Leg Day', description: 'this is the day we do legs'}]
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

  describe('#handleActions', () => {
    describe('with setSessions as an argument', () => {
      expect(IndexStore.getAll()).toEqual([])
      IndexStore.handleActions({type: 'setSessions', sessions: sessions})

      expect(IndexStore.getAll()).toEqual(sessions)
    })
  })
})
