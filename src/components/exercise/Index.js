import React from 'react'
import ExerciseIndexStore from '../../stores/exercise/IndexStore'
import ExerciseFormStore from '../../stores/exercise/FormStore'
import FormModalButton from './FormModalButton'
import FormModal from './FormModal'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      exercises: ExerciseIndexStore.getAll(),
      exerciseForm: ExerciseFormStore.getAll()
    }
  }

  componentDidMount() {
    ExerciseIndexStore.on("change", () => this.setState({exercises: ExerciseIndexStore.getAll()}))
    ExerciseFormStore.on("change", () => this.setState({exerciseForm: ExerciseFormStore.getAll()}))
  }

  displayExercises() {
    const {exercises} = this.state

    return (
      <>
        <ul id="exercise-list" className="list-group">
          {
            exercises.map(exercise => {
              return (
                <li key={exercise.id} className="list-group-item exercise-list-item">
                  {exercise.name}
                </li>
              )
            })
          }
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
    const modalId = "exerciseForm"
    return (
      <div className="container">
        <FormModalButton modalId={modalId}>
          New Exercise
        </FormModalButton>

        {this.state.exercises.length === 0 ? this.noExercises() : this.displayExercises()}
        <FormModal id={modalId} exercise={this.state.exerciseForm} title="New Exercise" />
      </div>
    )
  }
}

export default Index
