import React from 'react'
import IndexStore from '../../stores/sets/IndexStore'
import IndexListItem from './IndexListItem'
import {fetchSets} from '../../utils/sets/SetAPI'
import FormStore from '../../stores/sets/FormStore'
import ExerciseIndexStore from '../../stores/exercise/IndexStore'
import {fetchExerciseIndex} from '../../utils/exercises/ExerciseAPI'



class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sets: IndexStore.getAll(),
      setForms: FormStore.getAll(),
      exercises: ExerciseIndexStore.getAll()
    }
  }

  componentDidMount() {
    IndexStore.on('change', () => this.setState({sets: IndexStore.getAll()}))
    FormStore.on('change', () => this.setState({setForms: FormStore.getAll()}))
    ExerciseIndexStore.on('change', () => this.setState({exercises: ExerciseIndexStore.getAll()}))

    fetchSets(this.props.sessionId)
    fetchExerciseIndex()
  }


  componentWillUnmount() {
    IndexStore.removeAllListeners()
    FormStore.removeAllListeners()
  }

  renderSets() {
    const {sets, setForms, exercises} = this.state

    return (
      <div>
        <ul id="set-list" className="list-group">
          {sets.map((set, index) =>
            <IndexListItem
              key={index}
              index={index}
              set={set}
              setForm={setForms[index]}
              sessionId={this.props.sessionId}
              exercises={exercises} />)}
        </ul>
      </div>
    )
  }

  noSets() {
    return (
      <h2 className='no-sets'>
        No sets
      </h2>
    )
  }

  addEmptySet() {
    const {sets} = this.state

    sets.push({id: '', name: "", set_exercises: []})
    this.setState({
      sets: sets
    })
  }

  render() {
    const {sets} = this.state

    return (
      <div className="container">
        <button id="add-set" className="btn btn-info float-right" onClick={this.addEmptySet.bind(this)}>Add a set</button>
        {sets.length > 0 ? this.renderSets() : this.noSets()}
      </div>
    )
  }
}

export default Index