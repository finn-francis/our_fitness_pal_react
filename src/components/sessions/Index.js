import React from 'react'
import {Redirect} from 'react-router-dom'
import IndexStore from '../../stores/sessions/IndexStore'
import IndexListItem from './IndexListItem'
import {fetchSessions, deleteSession} from '../../utils/sessions/SessionAPI'
import FormModal from './FormModal'
import FormStore from '../../stores/sessions/FormStore'
import SelectedStore from '../../stores/sessions/SelectedStore'
import FormModalButton from '../modals/FormModalButton'
import ConfirmationModal from '../modals/ConfirmationModal'
import {clearSelectedSession} from "../../actions/SessionActions"

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sessions: IndexStore.getAll(),
      sessionForm: FormStore.get(),
      selectedSession: SelectedStore.get()
    }
  }

  static defaultProps = {
    formModalId: "session-form",
    confirmationModalId: "delete-session-modal"
  }

  componentDidMount() {
    IndexStore.on('change', () => this.setState({sessions: IndexStore.getAll()}))
    FormStore.on('change', () => this.setState({sessionForm: FormStore.get()}))
    SelectedStore.on('change', () => this.setState({selectedSession: SelectedStore.get()}))

    fetchSessions()
  }

  componentWillUnmount() {
    IndexStore.removeAllListeners()
    FormStore.removeAllListeners()
    SelectedStore.removeAllListeners()
  }

  deleteSession() {
    deleteSession(this.state.selectedSession.id)
  }

  renderSessions() {
    const {sessions} = this.state
    const {confirmationModalId} = this.props

    return (
      <>
        <ul id="session-list" className="list-group">
          {sessions.map(session => <IndexListItem key={session.id} session={session} deleteModalId={confirmationModalId} />)}
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
    const {sessionForm, sessions, selectedSession} = this.state
    const {formModalId, confirmationModalId} = this.props

    return (
      <div className="container">
        {sessionForm.responseSuccess ? <Redirect to={`sessions/${sessionForm.id}`} /> : null}
        <FormModalButton id='session-modal-button' modalId={formModalId}>
          New Session
        </FormModalButton>
        {sessions.length < 1 ? this.noSessions() : this.renderSessions()}
        <FormModal session={sessionForm} id={formModalId} title='Session' />
        <ConfirmationModal
          title={`Are you sure you want to delete ${selectedSession.name}`}
          modalId={confirmationModalId}
          handleConfirm={this.deleteSession.bind(this)}
          handleCancel={clearSelectedSession}
        />
      </div>
    )
  }
}

export default Index