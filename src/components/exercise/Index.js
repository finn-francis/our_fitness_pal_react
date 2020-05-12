import React from 'react'
import ExerciseIndexStore from '../../stores/exercise/IndexStore'
import ExerciseFormStore from '../../stores/exercise/FormStore'
import SelectedExerciseStore from '../../stores/exercise/SelectedStore'
import IndexListItem from './IndexListItem'
import FormModalButton from './FormModalButton'
import FormModal from './FormModal'
import ConfirmationModal from '../modals/ConfirmationModal'
import {fetchExerciseIndex, deleteExercise} from '../../utils/exercises/ExerciseAPI'
import {clearSelectedExercise} from '../../actions/ExerciseActions'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      exercises: ExerciseIndexStore.getAll(),
      exerciseForm: ExerciseFormStore.getAll(),
      selectedExercise: SelectedExerciseStore.get()
    }
  }

  static defaultProps = {
    exerciseModalId: "exerciseForm",
    confirmationModalId: "confirmationModal"
  }

  componentDidMount() {
    ExerciseFormStore.on("change", () => this.setState({exerciseForm: ExerciseFormStore.getAll()}))
    ExerciseIndexStore.on("change", () => this.setState({exercises: ExerciseIndexStore.getAll()}))
    SelectedExerciseStore.on("change", () => this.setState({selectedExercise: SelectedExerciseStore.get()}))

    fetchExerciseIndex()
  }

  deleteExercise() {
    deleteExercise(this.state.selectedExercise.id)
  }

  renderExercises() {
    const {exercises} = this.state
    const {exerciseModalId, confirmationModalId} = this.props

    return (
      <>
        <ul id="exercise-list" className="list-group mt-3">
          {exercises.map(exercise => <IndexListItem key={exercise.id} exercise={exercise} editModalId={exerciseModalId} deleteModalId={confirmationModalId} />)}
        </ul>
      </>
    )
  }

  noExercises() {
    return(
      <h2 className='no-exercises'>
        No exercises
      </h2>
    )
  }

  render() {
    const {exerciseModalId, confirmationModalId} = this.props
    const title = `Are you sure you want to delete ${this.state.selectedExercise.name}?`

    return (
      <div className="container mt-3">
        <FormModalButton modalId={exerciseModalId}>
          New Exercise
        </FormModalButton>

        {this.state.exercises.length === 0 ? this.noExercises() : this.renderExercises()}
        <FormModal id={exerciseModalId} exercise={this.state.exerciseForm} title="Exercise" />
        <ConfirmationModal
          title={title}
          modalId={confirmationModalId}
          handleConfirm={this.deleteExercise.bind(this)}
          handleCancel={clearSelectedExercise}
        />
      </div>
    )
  }
}

export default Index
