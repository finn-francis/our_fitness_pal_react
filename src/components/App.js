import React from 'react'
import '../assets/stylesheets/App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import AuthStore from '../stores/AuthStore'
import Home from './Home'
import ExerciseIndex from './exercise/Index'


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

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/exercises" render={(props) => <ExerciseIndex {...props} {...this.state} />} />
          <Route path="/" render={(props) => <Home {...props} {...this.state} />} />
        </Switch>
      </Router>
    )
  }
}
export default App;
