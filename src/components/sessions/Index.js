import React from 'react'
import IndexStore from '../../stores/sessions/IndexStore'
import IndexListItem from './IndexListItem'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sessions: IndexStore.getAll()
    }
  }

  componentDidMount() {
    IndexStore.on('change', () => this.setState({sessions: IndexStore.getAll()}))
  }

  renderSessions() {
    const {sessions} = this.state

    return (
      <>
        <ul id="session-list" className="list-group">
          {sessions.map(session => <IndexListItem key={session.id} session={session} />)}
        </ul>
      </>
    )
  }

  noSessions() {
    return (
      <h2 className='no-sessions'>
        No exercises
      </h2>
    )
  }

  render() {
    return (
      <div className="container">
        {this.state.sessions.length < 1 ? this.noSessions() : this.renderSessions()}
      </div>
    )
  }
}

export default Index