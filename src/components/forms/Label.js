import React from 'react'

const Label = (props) => {
  const errors = props.errors || []

  const inputErrors = () => {
    return (
      <div className="alert alert-danger">
        <strong>{props.label}</strong>
        <ul>
          {errors.map((error, index) => {
            return <li key={index}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  return (
    <label htmlFor={props.htmlFor}>
      {errors.length > 0 ? inputErrors() : props.label}
    </label>
  )
}

export default Label
