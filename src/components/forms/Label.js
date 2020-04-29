import React from 'react'
import PropTypes from 'prop-types'

const Label = (props) => {
  const inputErrors = () => {
    return (
      <div className="alert alert-danger">
        <strong>{props.label}</strong>
        <ul>
          {props.errors.map((error, index) => {
            return <li key={index}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  return (
    <label htmlFor={props.htmlFor}>
      {props.errors.length > 0 ? inputErrors() : props.label}
    </label>
  )
}
Label.defaultProps = {errors: []}
Label.propTypes = {label: PropTypes.string.isRequired}

export default Label
