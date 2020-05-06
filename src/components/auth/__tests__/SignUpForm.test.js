import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import React from 'react'
import { mount } from 'enzyme'

import SignUpForm from '../SignUpForm'

describe('SignUpForm', () => {
  let container
  let user

  describe("no user is signed in", () => {
    beforeEach(() => {
      user = {email: '', password: '', password_confirmation: ''}
      container = mount(<SignUpForm user={user} />)
    })
    afterEach(() => { container.unmount() })

    it("should render a sign-up form", () => {
      expect(container.find('form').length).toEqual(1)

      expect(container.find('#userEmail').instance().value).toEqual('')
      expect(container.find('#userPassword').instance().value).toEqual('')
      expect(container.find('#userPasswordConfirmation').instance().value).toEqual('')
    })
  })
})