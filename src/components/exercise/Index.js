import React from 'react'
import ExerciseIndexStore from '../../stores/exercise/IndexStore'
import ExerciseFormStore from '../../stores/exercise/FormStore'
import IndexListItem from './IndexListItem'
import FormModalButton from './FormModalButton'
import FormModal from './FormModal'
import {fetchExerciseIndex} from '../../utils/exercises/ExerciseAPI'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      exercises: ExerciseIndexStore.getAll(),
      exerciseForm: ExerciseFormStore.getAll()
    }
  }

  static defaultProps = {
    exerciseModalId: "exerciseForm"
  }

  componentDidMount() {
    ExerciseFormStore.on("change", () => this.setState({exerciseForm: ExerciseFormStore.getAll()}))
    ExerciseIndexStore.on("change", () => this.setState({exercises: ExerciseIndexStore.getAll()}))

    fetchExerciseIndex()
  }

  renderExercises() {
    const {exercises} = this.state
    const {exerciseModalId} = this.props

    return (
      <>
        <ul id="exercise-list" className="list-group">
          {exercises.map(exercise => <IndexListItem key={exercise.id} exercise={exercise} modalId={exerciseModalId} />)}
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
    const {exerciseModalId} = this.props

    return (
      <div className="container">
        <FormModalButton modalId={exerciseModalId}>
          New Exercise
        </FormModalButton>

        {this.state.exercises.length === 0 ? this.noExercises() : this.renderExercises()}
        <FormModal id={exerciseModalId} exercise={this.state.exerciseForm} title="Exercise" />
      </div>
    )
  }
}

export default Index
