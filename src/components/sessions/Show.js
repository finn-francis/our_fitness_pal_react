import React from 'react'
import ShowStore from '../../stores/sessions/ShowStore'
import {fetchSession} from '../../utils/sessions/SessionAPI'
import FormModalButton from '../modals/FormModalButton'
import FormModal from './FormModal'
import FormStore from '../../stores/sessions/FormStore'
import { updateSessionForm } from '../../actions/SessionActions'

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

  render() {
    const {session: {name, description}, sessionForm} = this.state
    const formModalId = 'edit-session-modal'
    return (
      <div className="container">
        <FormModalButton id='session-form-button' modalId={formModalId} handleClick={this.setResponseSuccessToNull}>
          edit
        </FormModalButton>

        <h1 className='session-title'>{name}</h1>
        <section className='session-description'>{description}</section>

        <FormModal session={sessionForm} id={formModalId} title='Session' onClose={() => {}} />
      </div>
    )
  }
}

export default Show