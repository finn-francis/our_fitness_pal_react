import React from 'react'
import {Redirect} from 'react-router-dom'
import ShowStore from '../../stores/sessions/ShowStore'
import {fetchSession, deleteSession} from '../../utils/sessions/SessionAPI'
import Index from '../sets/Index'
import FormModalButton from '../modals/FormModalButton'
import FormModal from './FormModal'
import FormStore from '../../stores/sessions/FormStore'
import { updateSessionForm } from '../../actions/SessionActions'
import ConfirmationModal from '../modals/ConfirmationModal'

class Show extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      session: ShowStore.get(),
      sessionForm: FormStore.get()
    }
  }

  componentDidMount() {
    const {match: {params: {id}}} = this.props

    ShowStore.on('change', () => this.setState({session: ShowStore.get()}))
    FormStore.on('change', () => this.setState({sessionForm: FormStore.get()}))

    fetchSession(id)
  }

  componentWillUnmount() {
    ShowStore.removeAllListeners()
    FormStore.removeAllListeners()
  }

  setResponseSuccessToNull() {
    updateSessionForm({responseSuccess: null})
  }

  deleteSession() {
    deleteSession(this.state.session.id)
  }

  render() {
    if (this.state.session.isDeleted) {
      return <Redirect to='/sessions' />
    }
    const {session: {name, description}, sessionForm} = this.state
    const formModalId = 'edit-session-modal'
    const confirmationModalId = 'delete-session-modal'

    return (
      <div className="container">
        <FormModalButton id='session-form-button' modalId={formModalId} handleClick={this.setResponseSuccessToNull}>
          edit
        </FormModalButton>
        <button className="btn btn-danger delete-session" data-toggle="modal" data-target={`#${confirmationModalId}`}>delete</button>

        <h1 className='session-title'>{name}</h1>
        <section className='session-description'>{description}</section>

        <Index sessionId={this.props.match.params.id}/>

        <FormModal session={sessionForm} id={formModalId} title='Session' onClose={() => {}} />
        <ConfirmationModal
          title={`Are you sure you want to delete ${name}`}
          modalId={confirmationModalId}
          handleConfirm={this.deleteSession.bind(this)}
        />
      </div>
    )
  }
}

export default Show