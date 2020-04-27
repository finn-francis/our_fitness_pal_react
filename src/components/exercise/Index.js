import React from 'react'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      exercises: []
    }
  }

  render() {
    const {exercises} = this.state

    return (
      <>
        <ul className="list-group">
          {
            exercises.map(exercise => {
              return (
                <li key={exercise.id} className="list-group-item">
                  {exercise.name}
                </li>
              )
            })
          }
        </ul>
      </>
    )
  }
}

export default Index
