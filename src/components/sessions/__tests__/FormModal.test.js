import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import FormModal from '../FormModal'
import FormModalButton from '../../modals/FormModalButton'

configure({ adapter: new Adapter() })

describe('FormModal', () => {
  let container
  let session
  const modalId = "myModalId"

  describe("an session is passed in", () => {
    beforeEach(() => {
      session = {id: 1, name: 'Squat', description: 'Go low!', errors: [], formAction: 'new'}
      container = mount(<FormModal id={modalId} session={session} title="Session" />)
    })
    afterEach(() => { container.unmount() })

    it("should render a form for the given session", () => {
      expect(container.find('form').length).toEqual(1)
      const {name, description} = session

      expect(container.find('#sessionName').instance().value).toEqual(name)
      expect(container.find('#sessionDescription').instance().value).toEqual(description)
    })
  })

  describe("no session is passed in", () => {
    beforeEach(() => {
      session = {id: null, name: '', description: '', errors: [], formAction: 'new'}
      container = mount(<FormModal id={modalId} session={session} title="Session" />)
    })
    afterEach(() => { container.unmount() })

    it("should render a new form", () => {
      expect(container.find('form').length).toEqual(1)

      expect(container.find('#sessionName').instance().value).toEqual('')
      expect(container.find('#sessionDescription').instance().value).toEqual('')
    })
  })

  describe("#modalTitle", () => {
    it("should mix the title with the formAction", () => {
      [{formAction: 'new', title: 'Session', expected: 'New Session'},
       {formAction: 'edit', title: 'thing', expected: 'Edit thing'},
       {formAction: 'random', title: 'title', expected: 'Random title'}].forEach(session => {
         let formObject = {id: 1, name: '', description: '', errors: [], formAction: session.formAction}
         container = mount(<FormModal id={modalId} session={formObject} title={session.title} />)

         expect(container.find('.modal-title').text()).toEqual(session.expected)
         container.unmount()
       })
    })
  })
})
