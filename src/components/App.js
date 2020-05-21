import React from 'react'
import '../assets/stylesheets/App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import AuthStore from '../stores/AuthStore'
import AuthorizedStore from '../stores/auth/AuthorizedStore'
import Home from './Home'
import NavBar from './NavBar'
import ExerciseIndex from './exercise/Index'
import SessionIndex from './sessions/Index'
import SessionShow from './sessions/Show'
import SignUpForm from './auth/SignUpForm'
import SignInForm from './auth/SignInForm'
import {clearCurrentUser} from '../actions/AuthActions'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      auth: AuthStore.getAll(),
      authorization: AuthorizedStore.get()
    }
  }

  componentDidMount() {
    AuthStore.on("change", () => this.setState({auth: AuthStore.getAll()}))
    AuthorizedStore.on("change", () => this.setState({authorization: AuthorizedStore.get()}))

    this.handleAuthorization()
  }

  logout() {
    clearCurrentUser()
  }

  handleAuthorization() {
    switch (this.state.authorization.status) {
      case 401:
        toast.error('You must be logged in to view this page', {
          toastId: 'unauthorized',
          position: toast.POSITION.BOTTOM_RIGHT
        })

        return <Redirect to='/sign_in' />
      case 403:
        toast.error('You do not have permission to view this page', {
          toastId: 'forbidden',
          position: toast.POSITION.BOTTOM_RIGHT
        })
        return <Redirect to='/' />
      default:
    }
  }

  render() {
    return (
      <Router>
        {this.handleAuthorization()}
        <ToastContainer />
        <NavBar {...this.state}/>
        <Switch>
          <Route path="/sign_up" render={(props) => <SignUpForm {...props} {...this.state} />} />
          <Route path="/sign_in" render={(props) => <SignInForm {...props} {...this.state} />} />
          <Route path="/exercises" render={(props) => <ExerciseIndex {...props} {...this.state} />} />
          <Route path="/sessions/:id" render={(props) => <SessionShow {...props} {...this.state} />} />
          <Route path="/sessions" render={(props) => <SessionIndex {...props} {...this.state} />} />
          <Route path="/" render={(props) => <Home {...props} {...this.state} />} />
        </Switch>
      </Router>
    )
  }
}
export default App
