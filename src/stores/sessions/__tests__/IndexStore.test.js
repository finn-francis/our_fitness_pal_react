import IndexStore from '../IndexStore'

describe('IndexStore', () => {
  describe('#getAll', () => {
    let sessions = [{id: 1, name: 'Leg Day', description: 'this is the day we do legs'}]

    beforeEach(() => IndexStore.sessions = sessions)
    afterEach(() => IndexStore.sessions = [])

    it('should return a list of sessions', () => {
      expect(IndexStore.getAll()).toEqual(sessions)
    })
  })
})