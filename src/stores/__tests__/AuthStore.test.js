import Cookies from 'js-cookie'
import AuthStore from '../AuthStore'

describe('AuthStore', () => {
  const admin = {id: 1, email: 'admin@email.com'}
  const token = 'token123'

  afterEach(() => {
    Cookies.remove('user')
    Cookies.remove('token')
  })

  describe('#getAll', () => {
    it('should return the current user', () => {
      Cookies.set('user', admin)
      expect(AuthStore.getAll()).toEqual(admin)
    })
  })

  describe('#setCurrentUser', () => {
    beforeEach(() => {
      expect(Cookies.get('user')).toEqual(undefined)
      expect(Cookies.get('token')).toEqual(undefined)
    })

    it('should set the user and token cookies', () => {
      AuthStore.setCurrentUser({user: admin, jwt: token})

      expect(JSON.parse(Cookies.get('user'))).toEqual(admin)
      expect(Cookies.get('token')).toEqual(token)
    })
  })

  describe('#clearCurrentUser', () => {
    beforeEach(() => {
      AuthStore.setCurrentUser({user: admin, jwt: token})

      expect(JSON.parse(Cookies.get('user'))).toEqual(admin)
      expect(Cookies.get('token')).toEqual(token)
    })

    it('should remove the user and token cookies', () => {
      AuthStore.clearCurrentUser()

      expect(Cookies.get('user')).toEqual(undefined)
      expect(Cookies.get('token')).toEqual(undefined)
    })
  })

  describe('#handleActions', () => {
    describe('with setCurrentUser as an argument', () => {
      beforeEach(() => {
        expect(Cookies.get('user')).toEqual(undefined)
        expect(Cookies.get('token')).toEqual(undefined)
      })

      it('should set the user and token cookies', () => {
        AuthStore.handleActions({type: 'setCurrentUser', user: {user: admin, jwt: token}})

        expect(JSON.parse(Cookies.get('user'))).toEqual(admin)
        expect(Cookies.get('token')).toEqual(token)
      })
    })

    describe('with clearCurrentUser as an argument', () => {
      beforeEach(() => {
        AuthStore.setCurrentUser({user: admin, jwt: token})

        expect(JSON.parse(Cookies.get('user'))).toEqual(admin)
        expect(Cookies.get('token')).toEqual(token)
      })

      it('should remove the user and token cookies', () => {
        AuthStore.handleActions({type: 'clearCurrentUser'})

        expect(Cookies.get('user')).toEqual(undefined)
        expect(Cookies.get('token')).toEqual(undefined)
      })
    })
  })
})
