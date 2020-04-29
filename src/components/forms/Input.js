import React from 'react'
import Label from './Label'

const Input = (props) => {
  const errors = props.errors || []

  const renderInput = () => {
    if (errors.length > 0) {
      return (
        <div className="has-error">
          {props.children}
        </div>
      )
    } else {
      return props.children
    }
  }

  return (
    <>
      {props.label ? <Label htmlFor={props.labelHtmlFor} label={props.label} errors={errors} /> : null}
      {renderInput()}
    </>
  )
}

export default Input
