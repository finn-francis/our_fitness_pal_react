import React from 'react'
import PropTypes from 'prop-types'
import ReadOnlyListItem from './ReadOnlyListItem'
import EditListItem from './EditListItem'

class IndexListItem extends React.Component {
  constructor(props) {
    super(props)

    if (props.set.id === "") {
      var editMode = true
    }
    else {
      var editMode = false
    }

    this.state = {
      editMode: editMode,
      setForm: props.setForm
    }
  }

  addExercise() {
    const {setForm} = this.state
    setForm.set_exercises.push({exercise_id: '', unit: ''})
    this.setState({
      setForm: setForm
    })
  }

  renderEditMode() {
    return(
      <>
        <button className="btn btn-info" onClick={this.addExercise.bind(this)}>Add an Exercise</button>
        <EditListItem
          index={this.props.index}
          set={this.state.setForm}
          toggleEditMode={this.toggleEditMode.bind(this)}
          sessionId={this.props.sessionId}
          exercises={this.props.exercises}
        />
      </>
    )
  }

  renderReadOnlyMode() {
    return(
      <ReadOnlyListItem set={this.props.set} toggleEditMode={this.toggleEditMode.bind(this)}/>
    )
  }

  toggleEditMode() {
    const newMode = !this.state.editMode

    this.setState({
      editMode: newMode
    })
  }


  render() {
    const {editMode} = this.state

    return(
      <div className="container">
        {editMode ? this.renderEditMode() : this.renderReadOnlyMode()}
      </div>
    )
  }
}

IndexListItem.propTypes = {set: PropTypes.object.isRequired}

export default IndexListItem
