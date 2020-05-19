import IndexStore from '../IndexStore'
import sets from '../../../../cypress/fixtures/sets/all.json'

describe('IndexStore', () => {
  afterEach(() => IndexStore.sets = [])

  describe('#getAll', () => {
    beforeEach(() => IndexStore.sets = sets)

    it('should return a list of sets', () => {
      expect(IndexStore.getAll()).toEqual(sets)
    })
  })

  describe('#setSets', () => {
    it('should update the list of sets', () => {
      expect(IndexStore.getAll()).toEqual([])
      IndexStore.setSets(sets)

      expect(IndexStore.getAll()).toEqual(sets)
    })
  })

  describe('#removeSet', () => {
    beforeEach(() => {
      IndexStore.sets = sets
    })

    it('should remove the given set from the list', () => {
      IndexStore.removeSet(sets[0].id)
      expect(IndexStore.sets).toEqual(sets.slice(1))
    })
  })

  describe('#handleActions', () => {
    describe('with setSets as an argument', () => {
      expect(IndexStore.getAll()).toEqual([])
      IndexStore.handleActions({type: 'setSets', sets: sets})

      expect(IndexStore.getAll()).toEqual(sets)
    })

    describe('with removeSet as an argument', () => {
      beforeEach(() => {
        IndexStore.sets = sets
      })

      it('should remove the given set from the list', () => {
        IndexStore.handleActions({type: "removeSet", id: sets[0].id})
        expect(IndexStore.sets).toEqual(sets.slice(1))
      })
    })
  })
})
