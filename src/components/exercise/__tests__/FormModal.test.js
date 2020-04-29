import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import React from 'react'
import { mount } from 'enzyme'

import FormModal from '../FormModal'

describe('FormModal', () => {
  let container
  let exercise
  const modalId = "myModalId"

  describe("an exercise is passed in", () => {
    beforeEach(() => {
      exercise = {id: 1, name: 'Squat', description: 'Go low!', errors: [], formAction: 'new'}
      container = mount(<FormModal id={modalId} exercise={exercise} />)
    })
    afterEach(() => { container.unmount() })

    it("should render a form for the given exercise", () => {
      expect(container.find('form').length).toEqual(1)
      const {name, description} = exercise

      expect(container.find('#exerciseName').instance().value).toEqual(name)
      expect(container.find('#exerciseDescription').instance().value).toEqual(description)
    })
  })

  describe("no exercise is passed in", () => {
    beforeEach(() => {
      exercise = {id: null, name: '', description: '', errors: [], formAction: 'new'}
      container = mount(<FormModal id={modalId} exercise={exercise} />)
    })
    afterEach(() => { container.unmount() })

    it("should render a new form", () => {
      expect(container.find('form').length).toEqual(1)

      expect(container.find('#exerciseName').instance().value).toEqual('')
      expect(container.find('#exerciseDescription').instance().value).toEqual('')
    })
  })
})
