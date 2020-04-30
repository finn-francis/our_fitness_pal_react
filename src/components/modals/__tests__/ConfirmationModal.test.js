import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';

import ConfirmationModal from '../ConfirmationModal'

describe('ConfirmationModal', () => {
  describe("render", function() {
    let container
    const modalId = "myModalId"
    const title = "My Title"
    let body

    afterEach(() => { container.unmount() })

    describe("with a body", () => {
      beforeEach(() => {
        body = "My Body"
        container = shallow(<ConfirmationModal title={title} modalId={modalId} body={body} />)
      })

      it("should render a modal with a body", () => {
        let modal = container.find(`#${modalId}`)
        expect(modal.hasClass('modal')).toEqual(true)
        expect(modal.text().includes(body)).toEqual(true)
      })
    })

    describe("without a body", () => {
      beforeEach(() => {
        container = shallow(<ConfirmationModal title={title} modalId={modalId} />)
      })

      it("should rendera modal with no body", () => {
        let modal = container.find(`#${modalId}`)
        expect(modal.hasClass('modal')).toEqual(true)
        expect(modal.find('.modal-body').length).toEqual(0)
      })
    })

    describe("button test", () => {
      it("should default to cancel and continue", () => {
        container = shallow(<ConfirmationModal title={title} modalId={modalId} />)
        expect(container.find('.cancel-button').text()).toEqual("cancel")
        expect(container.find('.confirm-button').text()).toEqual("confirm")
      })

      it("should set to the given values passed in as props", () => {
        let cancelText = "stop"
        let confirmText = "yes"
        container = shallow(<ConfirmationModal title={title} modalId={modalId} cancelText={cancelText} confirmText={confirmText} />)

        expect(container.find('.cancel-button').text()).toEqual(cancelText)
        expect(container.find('.confirm-button').text()).toEqual(confirmText)
      })
    })
  })
})
