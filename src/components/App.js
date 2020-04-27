import React from 'react'
import '../assets/stylesheets/App.css'
import AuthStore from '../stores/AuthStore'

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
      <div className="App">
        <header className="App-header">
          Our Fitness Pal
        </header>
      </div>
    )
  }
}
export default App;
