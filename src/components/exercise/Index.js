import React from 'react'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      exercises: []
    }
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
    return this.state.exercises.length === 0 ? this.noExercises() : this.displayExercises()
  }
}

export default Index
