import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import React from 'react'
import { mount } from 'enzyme'

import Input from '../Input'

describe('Input', () => {
  let container
  let labelText = "my_label"
  let forHtml = "my-label"
  let child = "my-child"

  describe("labels", () => {
    describe("with a label", function() {
      beforeEach(() => {
        container = mount(
          <Input label={labelText} labelForHtml={forHtml}>
            <div className={child}>{child}</div>
          </Input>
        )
      })
      afterEach(() => { container.unmount() })

      it("should render an input with a label", () => {
        expect(container.find('label').length).toEqual(1)
        expect(container.find(`.${child}`).length).toEqual(1)
      })
    })

    describe("without a label", () => {
      beforeEach(() => {
        container = mount(<Input><div className={child}>{child}</div></Input>)
      })
      afterEach(() => { container.unmount() })

      it("should render an input without a label", () => {
        expect(container.find('label').length).toEqual(0)
        expect(container.find(`.${child}`).length).toEqual(1)
      })
    })
  })

  describe("with errors", () => {
    let errorMessage

    beforeEach(() => {
      errorMessage = 'My error message'

      container = mount(
        <Input errors={[errorMessage]}>
          <input className="invalid-input"/>
        </Input>
      )
    })
    afterEach(() => { container.unmount() })

    it("should surround the input in a .has-error class", () => {
      let wrapper = container.find('.has-error')
      expect(wrapper.find('.invalid-input').length).toEqual(1)
    })
  })
})