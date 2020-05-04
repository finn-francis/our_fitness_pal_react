import React from 'react'
import Input from '../forms/Input'
import AuthFormStore from '../../stores/auth/FormStore'
import {updateSignUpForm} from '../../actions/AuthActions'
import {createUser} from "../../utils/auths/AuthAPI"
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: AuthFormStore.getAll(),
    }
  }

  componentDidMount() {
    AuthFormStore.on("change", () => this.setState({user: AuthFormStore.getAll()}))
  }

  handleChange = (event) => {
    updateSignUpForm({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    createUser(this.state.user)
  }

  render() {
    if (Cookies.get('token')) {
      return <Redirect to='/' />
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="form-group">
            <Input label="Email" labelHtmlFor="email" errors={""}>
              <input
                type="text"
                name="email"
                id="userEmail"
                className="form-control"
                required
                value={this.state.user.email}
                onChange={this.handleChange}
                />
            </Input>
          </div>
          <Input label="Password" labelHtmlFor="password" errors={""}>
            <input
              type="password"
              name="password"
              id="userPassword"
              className="form-control"
              required
              value={this.state.user.password}
              onChange={this.handleChange}
            />
          </Input>
          <Input label="Password Confirmation" labelHtmlFor="passwordConfirmation" errors={""}>
            <input
              type="password"
              name="passwordConfirmation"
              id="userPasswordConfirmation"
              className="form-control"
              required
              value={this.state.user.passwordConfirmation}
              onChange={this.handleChange}
            />
          </Input>
          <button type="button" className="btn btn-info confirm-button" onClick={this.handleSubmit.bind(this)}>Sign Up</button>
        </div>
      </form>
    )
  }
}

export default SignUpForm