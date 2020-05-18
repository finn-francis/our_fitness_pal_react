import React from 'react'
import AuthStore from '../../stores/AuthStore'
import {toast} from 'react-toastify'

// This class is a superclass for any stateful component that requires the user to be logged in
//
// Usage:
// 1. Extend from this class
//   import AutheticateUserBase from '../auth/AuthenticateUserBase'
//
//   class MyClass extends AuthenticateUserBase {
//
// 2. Add the superclass state when setting state in the constructor.
//   constructor(props) {
//     super(props)
//
//      this.state = {
//       ...this.state,
//       key: 'value'
//     }
//   }
//
// 3. Call the super componentDidMount in componentDidMount
//   componentDidMount() {
//     super.componentDidMount()
//   }
//
// 4. Call super.componentWillUnmount() in the same way

class AuthenticateUserBase extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: AuthStore.getAll()
    }
  }

  componentDidMount() {
    AuthStore.on('change', this.setCurrentUser.bind(this))
    this.authorizeCurrentUser()
  }

  componentWillUnmount() {
    AuthStore.removeListener('change', this.setCurrentUser)
  }

  setCurrentUser() {
    this.setState({currentUser: AuthStore.getAll()})
    this.authorizeCurrentUser()
  }

  authorizeCurrentUser() {
    if (this.state.currentUser === undefined) {
      this.props.history.push('/sign_in')
      toast.error('You must be logged in to view this page', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }
}

export default AuthenticateUserBase
