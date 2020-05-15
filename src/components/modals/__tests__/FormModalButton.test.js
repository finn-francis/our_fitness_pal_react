import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FormModalButton from '../FormModalButton'

configure({ adapter: new Adapter() })

describe('FormModalButton', () => {
  let container


  afterEach(() => {
    container.unmount()
  })

  describe('display', () => {
    const id = 'my-button'
    const modalId = 'my-modal'
    const content = "This is my content"

    beforeEach(() => {
      container = shallow(<FormModalButton id={id} modalId={modalId}>{content}</FormModalButton>)
    })

    it('should display the given children', () => {
      expect(container.text().includes(content)).toEqual(true)
    })

    it('should set the id based on the given parameter', () => {
      expect(container.find('button').prop('id')).toEqual(id)
    })
  })

  describe('handleClick', () => {
    const id = 'my-button'
    const modalId = 'my-modal'
    const content = "This is my content"
    let clicked = false

    const handleClick = () => {
      clicked = true
    }

    beforeEach(() => {
      container = shallow(<FormModalButton id={id} modalId={modalId} handleClick={handleClick}>{content}</FormModalButton>)
    })

    it('should accept an optional click handler', () => {
      expect(clicked).toEqual(false)
      container.find('button').simulate('click')
      expect(clicked).toEqual(true)
    })
  })
})
