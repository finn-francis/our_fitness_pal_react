import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import React from 'react'
import { shallow } from 'enzyme'

import Label from '../Label'

describe('Label', () => {
  let container
  let labelText = "my_label"
  let forHtml = "my-label"
  let errors

  describe("with errors", function() {
    beforeEach(() => {
      errors = ['required', 'already in use']
      container = shallow(<Label label={labelText} forHtml={forHtml} errors={errors} />)
    })
    afterEach(() => { container.unmount() })

    it("should render a label with errors", () => {
      expect(container.find('.alert-danger').length).toEqual(1)
      errors.forEach(errorMessage => {
        expect(container.text().includes(errorMessage)).toEqual(true)
      })
    })
  })

  describe("without errors", () => {
    beforeEach(() => {
      errors = []
      container = shallow(<Label label={labelText} forHtml={forHtml} errors={errors} />)
    })
    afterEach(() => { container.unmount() })

    it("should render a label without any errors", () => {
      expect(container.find('.alert-danger').length).toEqual(0)
    })
  })
})