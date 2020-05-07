import React from 'react'
import '../assets/stylesheets/App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import AuthStore from '../stores/AuthStore'
import Home from './Home'
import NavBar from './NavBar'
import ExerciseIndex from './exercise/Index'
import SignUpForm from './auth/SignUpForm'
import SignInForm from './auth/SignInForm'
import {clearCurrentUser} from '../actions/AuthActions'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      auth: AuthStore.getAll()
    }
  }

  componentDidMount() {
    AuthStore.on("change", () => this.setState({auth: AuthStore.getAll()}))
  }

  logout() {
    clearCurrentUser()
  }

  render() {
    return (
      <Router>
        <ToastContainer />
        <NavBar {...this.state}/>
        <Switch>
          <Route path="/sign_up" render={(props) => <SignUpForm {...props} {...this.state} />} />
          <Route path="/sign_in" render={(props) => <SignInForm {...props} {...this.state} />} />
          <Route path="/exercises" render={(props) => <ExerciseIndex {...props} {...this.state} />} />
          <Route path="/" render={(props) => <Home {...props} {...this.state} />} />
        </Switch>
      </Router>
    )
  }
}
export default App;
