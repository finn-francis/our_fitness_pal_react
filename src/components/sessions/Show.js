import React from 'react'
import ShowStore from '../../stores/sessions/ShowStore'
import {fetchSession} from '../../utils/sessions/SessionAPI'

class Show extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      session: ShowStore.get()
    }
  }

  componentDidMount() {
    const {match: {params: {id}}} = this.props

    ShowStore.on('change', () => this.setState({session: ShowStore.get()}))

    fetchSession(id)
  }

  render() {
    const {session: {name, description}} = this.state
    return (
      <div className="container">
        <h1 className='session-title'>{name}</h1>
        <section className='session-description'>{description}</section>
      </div>
    )
  }
}

export default Show