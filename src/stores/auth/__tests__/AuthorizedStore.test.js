import AuthorizedStore from '../AuthorizedStore'

describe('AuthorizedStore', () => {
  const emptyStore = {
    status: 200,
    redirectToLogin: false
  }

  const unauthorized = {
    status: 401,
    redirectToLogin: true
  }

  afterEach(() => {
    AuthorizedStore.state = emptyStore
  })

  describe('#get', () => {
    it('should return the current state of authorization', () => {
      expect(AuthorizedStore.get()).toEqual(emptyStore)
    })
  })

  describe('#reset', () => {
    beforeEach(() => {
      AuthorizedStore.state = unauthorized
    })

    it('should set the store to the empty state', () => {
      expect(AuthorizedStore.state).toEqual(unauthorized)
      AuthorizedStore.reset()
      expect(AuthorizedStore.state).toEqual(emptyStore)
    })
  })

  describe('unauthorized', () => {
    it('should set the store to the unauthorized state', () => {
      expect(AuthorizedStore.state).toEqual(emptyStore)
      AuthorizedStore.unauthorized()
      expect(AuthorizedStore.state).toEqual(unauthorized)
    })
  })

  describe('handleActions', () => {
    describe('with resetAuthorizedState as an argument', () => {
      beforeEach(() => {
        AuthorizedStore.state = unauthorized
      })

      it('should set the store to the empty state', () => {
        expect(AuthorizedStore.state).toEqual(unauthorized)
        AuthorizedStore.handleActions({type: 'resetAuthorizedState'})
        expect(AuthorizedStore.state).toEqual(emptyStore)
      })
    })

    describe('with setUnauthorizedState as an argument', () => {
      it('should set the store to the unauthorized state', () => {
        expect(AuthorizedStore.state).toEqual(emptyStore)
        AuthorizedStore.handleActions({type: 'setUnauthorizedState'})
        expect(AuthorizedStore.state).toEqual(unauthorized)
      })
    })
  })
})