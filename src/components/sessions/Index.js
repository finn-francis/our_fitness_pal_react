import React from 'react'
import {Redirect} from 'react-router-dom'
import IndexStore from '../../stores/sessions/IndexStore'
import IndexListItem from './IndexListItem'
import {fetchSessions} from '../../utils/sessions/SessionAPI'
import FormModal from './FormModal'
import FormStore from '../../stores/sessions/FormStore'
import FormModalButton from '../modals/FormModalButton'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sessions: IndexStore.getAll(),
      sessionForm: FormStore.get()
    }
  }

  componentDidMount() {
    IndexStore.on('change', () => this.setState({sessions: IndexStore.getAll()}))
    FormStore.on('change', () => this.setState({sessionForm: FormStore.get()}))

    fetchSessions()
  }

  componentWillUnmount() {
    IndexStore.removeAllListeners()
    FormStore.removeAllListeners()
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
        No sessions
      </h2>
    )
  }

  render() {
    const formModalId = 'session-form'
    const {sessionForm, sessions} = this.state

    return (
      <div className="container">
        {sessionForm.responseSuccess ? <Redirect to={`sessions/${sessionForm.id}`} /> : null}
        <FormModalButton id='session-modal-button' modalId={formModalId}>
          New Session
        </FormModalButton>
        {sessions.length < 1 ? this.noSessions() : this.renderSessions()}
        <FormModal session={sessionForm} id={formModalId} title='Session' />
      </div>
    )
  }
}

export default Index