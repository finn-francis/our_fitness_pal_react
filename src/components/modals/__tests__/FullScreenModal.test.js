import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount } from 'enzyme';

import {FullScreenModal, FullScreenModalHeader, FullScreenModalFooter} from '../FullScreenModal'

describe('FullScreenModal', () => {
  describe("render", function() {
    let container
    const id = "myModalId"
    const element1 = "child-element1"
    const element2 = "child-element2"

    beforeEach(() => { container = shallow(
      <FullScreenModal id={id}>
        <div className={element1}></div>
        <div className={element2}></div>
      </FullScreenModal>
      ) })
    afterEach(() => { container.unmount() })

    it("should add an id to the modal", () => {
      let modal = container.find(`#${id}`)
      expect(modal.hasClass('modal')).toEqual(true)
      expect(container.find('.modal-dialog-full-width').length).toEqual(1)
    })

    it("should render the children within the modal", () => {
      expect(container.find(`.${element1}`).length).toEqual(1)
      expect(container.find(`.${element2}`).length).toEqual(1)
    })
  })

  describe('FullScreenModalHeader', () => {
    describe("render", function() {
      let container
      const element1 = "child-element1"
      const element2 = "child-element2"

      beforeEach(() => { container = shallow(
        <FullScreenModalHeader>
          <div className={element1}></div>
          <div className={element2}></div>
        </FullScreenModalHeader>
        ) })
      afterEach(() => { container.unmount() })

      it("should add a modal header", () => {
        expect(container.find(`.modal-header-full-width`).length).toEqual(1)
      })

      it("should render the children within the modal", () => {
        expect(container.find(`.${element1}`).length).toEqual(1)
        expect(container.find(`.${element2}`).length).toEqual(1)
      })
    })
  })

  describe('FullScreenModalFooter', () => {
    describe("render", function() {
      let container
      const element1 = "child-element1"
      const element2 = "child-element2"

      beforeEach(() => { container = shallow(
        <FullScreenModalFooter>
          <div className={element1}></div>
          <div className={element2}></div>
        </FullScreenModalFooter>
        ) })
      afterEach(() => { container.unmount() })

      it("should add a modal footer", () => {
        expect(container.find(`.modal-footer-full-width`).length).toEqual(1)
      })

      it("should render the children within the modal", () => {
        expect(container.find(`.${element1}`).length).toEqual(1)
        expect(container.find(`.${element2}`).length).toEqual(1)
      })
    })
  })
})
