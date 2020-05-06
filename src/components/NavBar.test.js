import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import React from 'react'
import { mount } from 'enzyme'

import NavBar from './NavBar'
import { MemoryRouter } from "react-router-dom";

describe('./NavBar', () => {
  let container
  let user

  describe("no user is signed in", () => {
    beforeEach(() => {
      user = {email: '', password: '', password_confirmation: ''}
      container = mount(
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      )
    })
    afterEach(() => { container.unmount() })

    it("should render a nav bar with sign-in and sign-up links", () => {
      expect(container.find('nav').length).toEqual(1)

      expect(container.find('a#sign-up-link').length).toEqual(1)
      expect(container.find('a#sign-in-link').length).toEqual(1)
      expect(container.find('button#sign-out-button').length).toEqual(0)
    })
  })

  describe("a user is signed in", () => {
    beforeEach(() => {
      container = mount(
        <MemoryRouter>
          <NavBar auth={{email: "ben@ben.com"}}/>
        </MemoryRouter>
      )
    })
    afterEach(() => { container.unmount() })

    it("should render a nav bar with sign-out links and no sign-in and sign-up links", () => {
      expect(container.find('nav').length).toEqual(1)

      expect(container.find('a#sign-up-link').length).toEqual(0)
      expect(container.find('a#sign-in-link').length).toEqual(0)
      expect(container.find('button#sign-out-button').length).toEqual(1)
    })
  })
})