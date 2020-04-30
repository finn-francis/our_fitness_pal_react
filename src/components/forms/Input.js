import React from 'react'
import Label from './Label'

const Input = (props) => {
  const renderInput = () => {
    if (props.errors.length > 0) {
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
      {props.label ? <Label htmlFor={props.labelHtmlFor} label={props.label} errors={props.errors} /> : null}
      {renderInput()}
    </>
  )
}

Input.defaultProps = { errors: [] }

export default Input
